
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
