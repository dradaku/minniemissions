
import { createContext, useContext, useState, ReactNode } from "react";

// Types 
interface WalletContextType {
  connected: boolean;
  account: string | null;
  vibePoints: number;
  connect: () => Promise<void>;
  disconnect: () => void;
}

interface WalletProviderProps {
  children: ReactNode;
}

// Create context
const WalletContext = createContext<WalletContextType | undefined>(undefined);

// Provider component
export const WalletProvider = ({ children }: WalletProviderProps) => {
  const [connected, setConnected] = useState(false);
  const [account, setAccount] = useState<string | null>(null);
  const [vibePoints, setVibePoints] = useState(0);

  // Mock connect function (in reality, this would use Polkadot.js)
  const connect = async () => {
    try {
      // This is a mock - in real implementation, you'd use Polkadot.js
      const mockAccount = "5GrwvaEF5zXb26Fz9rcQpDWS57CtERHpNehXCPcNoHGKutQY";
      const mockVP = Math.floor(Math.random() * 1000);
      
      setAccount(mockAccount);
      setVibePoints(mockVP);
      setConnected(true);
    } catch (error) {
      console.error("Failed to connect wallet:", error);
      throw error;
    }
  };

  const disconnect = () => {
    setAccount(null);
    setVibePoints(0);
    setConnected(false);
  };

  return (
    <WalletContext.Provider
      value={{
        connected,
        account,
        vibePoints,
        connect,
        disconnect,
      }}
    >
      {children}
    </WalletContext.Provider>
  );
};

// Hook for using the wallet context
export const useWallet = () => {
  const context = useContext(WalletContext);
  if (context === undefined) {
    throw new Error("useWallet must be used within a WalletProvider");
  }
  return context;
};
