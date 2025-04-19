
import { createContext, useContext, useState, ReactNode, useEffect } from "react";
import { web3Accounts, web3Enable } from '@polkadot/extension-dapp';
import { convertVpToCurrency, handleWalletError } from "@/utils/walletUtils";

interface WalletContextType {
  connected: boolean;
  account: string | null;
  vibePoints: number;
  connect: () => Promise<void>;
  disconnect: () => void;
  convertToToken: (vpAmount: number, toCurrency: 'DOT' | 'USDC') => Promise<boolean>;
  isConverting: boolean;
}

interface WalletProviderProps {
  children: ReactNode;
}

const WalletContext = createContext<WalletContextType | undefined>(undefined);

export const WalletProvider = ({ children }: WalletProviderProps) => {
  const [connected, setConnected] = useState(false);
  const [account, setAccount] = useState<string | null>(null);
  const [vibePoints, setVibePoints] = useState(0);
  const [isConverting, setIsConverting] = useState(false);

  const connect = async () => {
    try {
      // Enable the extension
      const extensions = await web3Enable('Minniemissions');
      
      if (extensions.length === 0) {
        throw new Error('No Polkadot extension found. Please install the extension.');
      }

      // Get all accounts from the extension
      const allAccounts = await web3Accounts();
      
      if (allAccounts.length === 0) {
        throw new Error('No accounts found. Please create an account in the Polkadot wallet.');
      }

      // Use the first account for now - in a real app, you might want to let users choose
      const selectedAccount = allAccounts[0];
      
      // For demo purposes, generate random VP - in real app this would come from chain
      const mockVP = Math.floor(Math.random() * 1000);
      
      setAccount(selectedAccount.address);
      setVibePoints(mockVP);
      setConnected(true);

    } catch (error) {
      console.error("Failed to connect wallet:", error);
      if (error instanceof Error) {
        handleWalletError(error);
      }
      throw error;
    }
  };

  const disconnect = () => {
    setAccount(null);
    setVibePoints(0);
    setConnected(false);
  };

  const convertToToken = async (vpAmount: number, toCurrency: 'DOT' | 'USDC'): Promise<boolean> => {
    if (!account) {
      toast.error('Wallet not connected', { 
        description: 'Please connect your wallet to convert VP.',
        duration: 3000,
      });
      return false;
    }
    
    if (vpAmount <= 0 || vpAmount > vibePoints) {
      toast.error('Invalid conversion amount', { 
        description: 'Please enter a valid amount to convert.',
        duration: 3000,
      });
      return false;
    }
    
    setIsConverting(true);
    
    try {
      const success = await convertVpToCurrency(vpAmount, toCurrency, account);
      
      if (success) {
        // Update VP balance
        setVibePoints(prev => prev - vpAmount);
      }
      
      return success;
    } catch (error) {
      console.error('Conversion error:', error);
      return false;
    } finally {
      setIsConverting(false);
    }
  };

  // Check if wallet was previously connected
  useEffect(() => {
    const checkConnection = async () => {
      try {
        const extensions = await web3Enable('Minniemissions');
        if (extensions.length > 0) {
          const accounts = await web3Accounts();
          if (accounts.length > 0) {
            setAccount(accounts[0].address);
            setVibePoints(Math.floor(Math.random() * 1000)); // Mock VP
            setConnected(true);
          }
        }
      } catch (error) {
        console.error("Error checking wallet connection:", error);
      }
    };

    checkConnection();
  }, []);

  return (
    <WalletContext.Provider
      value={{
        connected,
        account,
        vibePoints,
        connect,
        disconnect,
        convertToToken,
        isConverting,
      }}
    >
      {children}
    </WalletContext.Provider>
  );
};

export const useWallet = () => {
  const context = useContext(WalletContext);
  if (context === undefined) {
    throw new Error("useWallet must be used within a WalletProvider");
  }
  return context;
};
