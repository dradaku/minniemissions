
import { toast } from "sonner";

export const handleWalletError = (error: Error) => {
  if (error.message.includes('No Polkadot extension found')) {
    toast.error('Please install the Polkadot{.js} extension to continue', {
      description: 'You can download it from https://polkadot.js.org/extension/',
      duration: 5000,
    });
  } else if (error.message.includes('No accounts found')) {
    toast.error('No accounts found in your Polkadot wallet', {
      description: 'Please create or import an account in your Polkadot wallet.',
      duration: 5000,
    });
  } else {
    toast.error('Failed to connect wallet', {
      description: error.message,
      duration: 5000,
    });
  }
};

// Exchange rates (for demo purposes)
const EXCHANGE_RATES = {
  VP_TO_DOT: 0.001, // 1000 VP = 1 DOT
  VP_TO_USDC: 0.01,  // 100 VP = 1 USDC
};

export const convertVpToDot = (vp: number): number => {
  return vp * EXCHANGE_RATES.VP_TO_DOT;
};

export const convertVpToUsdc = (vp: number): number => {
  return vp * EXCHANGE_RATES.VP_TO_USDC;
};

// Simulates the conversion transaction on Moonbeam
export const convertVpToCurrency = async (
  vp: number, 
  toCurrency: 'DOT' | 'USDC',
  walletAddress: string
): Promise<boolean> => {
  try {
    // In a real app, this would initiate a transaction on Moonbeam
    // For this demo, we'll simulate an API call
    console.log(`Converting ${vp} VP to ${toCurrency} for address ${walletAddress}`);
    
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // Success message
    toast.success(`Successfully converted ${vp} VP to ${toCurrency}`, {
      description: toCurrency === 'DOT' 
        ? `You received ${convertVpToDot(vp).toFixed(3)} DOT`
        : `You received ${convertVpToUsdc(vp).toFixed(2)} USDC`,
      duration: 5000,
    });
    
    return true;
  } catch (error) {
    console.error(`Error converting VP to ${toCurrency}:`, error);
    toast.error(`Failed to convert VP to ${toCurrency}`, {
      description: error instanceof Error ? error.message : 'Unknown error occurred',
      duration: 5000,
    });
    return false;
  }
};
