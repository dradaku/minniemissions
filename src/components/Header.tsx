
import { Link } from "react-router-dom";
import { useWallet } from "@/contexts/WalletContext";
import { Button } from "@/components/ui/button";
import { handleWalletError } from "@/utils/walletUtils";
import { 
  Home,
  User,
  Menu,
  X,
  Wallet,
  LayoutList,
  Trophy
} from "lucide-react";
import { useState } from "react";

export const Header = () => {
  const { connected, account, vibePoints, connect, disconnect } = useWallet();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleConnect = async () => {
    try {
      await connect();
    } catch (error) {
      handleWalletError(error as Error);
    }
  };

  const toggleMenu = () => {
    setMenuOpen(prev => !prev);
  };

  return (
    <header className="bg-gradient-to-r from-minnie-purple to-minnie-blue shadow-md">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center space-x-2">
            <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center">
              <span className="text-minnie-purple font-bold text-xl">M</span>
            </div>
            <span className="text-white font-bold text-xl hidden md:inline-block">Minniemissions</span>
          </Link>

          <nav className="hidden md:flex items-center space-x-6">
            <Link to="/" className="text-white hover:text-minnie-light flex items-center gap-1">
              <Home size={18} />
              <span>Home</span>
            </Link>
            <Link to="/missions" className="text-white hover:text-minnie-light flex items-center gap-1">
              <LayoutList size={18} />
              <span>Missions</span>
            </Link>
            <Link to="/leaderboard" className="text-white hover:text-minnie-light flex items-center gap-1">
              <Trophy size={18} />
              <span>Leaderboard</span>
            </Link>
            <Link to="/profile" className="text-white hover:text-minnie-light flex items-center gap-1">
              <User size={18} />
              <span>Profile</span>
            </Link>

            <div className="flex items-center gap-4">
              {connected ? (
                <div className="flex items-center gap-4">
                  <div className="bg-white/20 text-white px-3 py-1 rounded-full flex items-center">
                    <span className="mr-1">⚡</span>
                    <span>{vibePoints} VP</span>
                  </div>
                  <Button 
                    variant="secondary" 
                    size="sm"
                    onClick={disconnect}
                    className="bg-white/10 hover:bg-white/20 text-white border border-white/20 flex items-center gap-2"
                  >
                    <Wallet className="h-4 w-4" />
                    {account?.substring(0, 6)}...{account?.substring(account.length - 4)}
                  </Button>
                </div>
              ) : (
                <Button 
                  variant="secondary" 
                  onClick={handleConnect}
                  className="bg-white/10 hover:bg-white/20 text-white border border-white/20 flex items-center gap-2"
                >
                  <Wallet className="h-4 w-4" />
                  Connect Wallet
                </Button>
              )}
            </div>
          </nav>

          <button 
            onClick={toggleMenu} 
            className="md:hidden text-white p-2"
          >
            {menuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {menuOpen && (
          <div className="md:hidden py-4 space-y-3">
            <Link 
              to="/" 
              className="block text-white py-2 px-4 rounded hover:bg-white/10"
              onClick={() => setMenuOpen(false)}
            >
              Home
            </Link>
            <Link 
              to="/missions" 
              className="block text-white py-2 px-4 rounded hover:bg-white/10"
              onClick={() => setMenuOpen(false)}
            >
              Missions
            </Link>
            <Link 
              to="/leaderboard" 
              className="block text-white py-2 px-4 rounded hover:bg-white/10"
              onClick={() => setMenuOpen(false)}
            >
              Leaderboard
            </Link>
            <Link 
              to="/profile" 
              className="block text-white py-2 px-4 rounded hover:bg-white/10"
              onClick={() => setMenuOpen(false)}
            >
              Profile
            </Link>
            
            {connected ? (
              <div className="py-2 px-4 space-y-2">
                <div className="bg-white/20 text-white px-3 py-1 rounded-full inline-flex items-center">
                  <span className="mr-1">⚡</span>
                  <span>{vibePoints} VP</span>
                </div>
                <Button 
                  variant="secondary" 
                  size="sm"
                  onClick={disconnect}
                  className="w-full bg-white/10 hover:bg-white/20 text-white border border-white/20"
                >
                  Disconnect {account?.substring(0, 6)}...
                </Button>
              </div>
            ) : (
              <div className="py-2 px-4">
                <Button 
                  variant="secondary" 
                  onClick={handleConnect}
                  className="w-full bg-white/10 hover:bg-white/20 text-white border border-white/20"
                >
                  Connect Wallet
                </Button>
              </div>
            )}
          </div>
        )}
      </div>
    </header>
  );
};
