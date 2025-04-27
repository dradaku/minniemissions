import { Link } from "react-router-dom";
import { useWallet } from "@/contexts/WalletContext";
import { Layout } from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { FeaturedMissions } from "@/components/FeaturedMissions";
import { Trophy, Award, ListChecks, Coins, ArrowRight } from "lucide-react";
import { useState } from "react";
import { convertVpToDot, convertVpToUsdc } from "@/utils/walletUtils";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card";
import { getActiveMissions } from "@/data/mockData";
import { ImageSlideshow } from "@/components/ImageSlideshow";

const Home = () => {
  const { connected, connect, vibePoints, convertToToken, isConverting } = useWallet();
  const featuredMissions = getActiveMissions().slice(0, 3);
  const [convertAmount, setConvertAmount] = useState<number>(100);
  const [selectedCurrency, setSelectedCurrency] = useState<'DOT' | 'USDC'>('DOT');

  const handleConversion = async () => {
    await convertToToken(convertAmount, selectedCurrency);
  };

  return (
    <Layout>
      {/* Hero Section */}
      <section className="py-16 px-4 text-center">
        <div className="max-w-4xl mx-auto p-8 rounded-xl bg-gradient-to-br from-minnie-purple to-minnie-blue text-white shadow-lg">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Complete Missions. Earn Rewards.</h1>
          <p className="text-xl mb-8 opacity-90">
            Connect with your favorite artists and earn Vibe Points by completing missions.
          </p>
          
          {connected ? (
            <div className="flex flex-col items-center gap-4">
              <div className="text-2xl font-bold bg-white/20 px-5 py-2 rounded-full inline-flex items-center">
                <span className="mr-2">⚡</span>
                <span>{vibePoints} Vibe Points</span>
              </div>
              <Link to="/missions">
                <Button 
                  size="lg"
                  className="bg-white hover:bg-white/90 text-minnie-purple"
                >
                  View All Missions
                </Button>
              </Link>
            </div>
          ) : (
            <Button 
              size="lg"
              className="bg-white hover:bg-white/90 text-minnie-purple"
              onClick={connect}
            >
              Connect Wallet to Start
            </Button>
          )}
        </div>
      </section>

      {/* Slideshow Section */}
      <section className="py-12">
        <ImageSlideshow />
      </section>

      {/* Features Section */}
      <section className="py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-2">How It Works</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Minniemissions helps artists and brands engage with their fans through rewarding missions and on-chain tracking.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          <div className="bg-white p-6 rounded-lg shadow-md text-center hover:shadow-lg transition-shadow">
            <div className="w-16 h-16 bg-minnie-purple/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <ListChecks className="h-8 w-8 text-minnie-purple" />
            </div>
            <h3 className="text-xl font-bold mb-2">Complete Missions</h3>
            <p className="text-gray-600">
              Participate in social media challenges, attend events, or create content.
            </p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md text-center hover:shadow-lg transition-shadow">
            <div className="w-16 h-16 bg-minnie-purple/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <Award className="h-8 w-8 text-minnie-purple" />
            </div>
            <h3 className="text-xl font-bold mb-2">Earn Vibe Points</h3>
            <p className="text-gray-600">
              Get rewarded with Vibe Points tracked on-chain for every completed mission.
            </p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md text-center hover:shadow-lg transition-shadow">
            <div className="w-16 h-16 bg-minnie-purple/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <Trophy className="h-8 w-8 text-minnie-purple" />
            </div>
            <h3 className="text-xl font-bold mb-2">Redeem Rewards</h3>
            <p className="text-gray-600">
              Exchange your Vibe Points for exclusive content, merchandise, or cryptocurrency.
            </p>
          </div>
        </div>
      </section>

      {/* Featured Missions Section */}
      <FeaturedMissions />

      {/* VP to Token Conversion Section */}
      {connected && (
        <section className="py-12 bg-gray-50 rounded-lg">
          <div className="max-w-4xl mx-auto px-4">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold mb-2">Convert Your Vibe Points</h2>
              <p className="text-gray-600">
                Exchange your Vibe Points for DOT or USDC through Moonbeam
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="grid md:grid-cols-2 gap-8">
                <div className="space-y-4">
                  <div>
                    <label htmlFor="vp-amount" className="block text-sm font-medium text-gray-700 mb-1">
                      Amount to Convert
                    </label>
                    <div className="relative">
                      <input
                        id="vp-amount"
                        type="number"
                        min="1"
                        max={vibePoints}
                        value={convertAmount}
                        onChange={(e) => setConvertAmount(Math.min(parseInt(e.target.value) || 0, vibePoints))}
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-minnie-purple focus:border-minnie-purple"
                      />
                      <span className="absolute right-3 top-2 text-gray-500">VP</span>
                    </div>
                    <div className="text-sm text-gray-500 mt-1">
                      You have {vibePoints} VP available
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Convert To
                    </label>
                    <div className="grid grid-cols-2 gap-2">
                      <button
                        className={`px-4 py-2 rounded-md ${
                          selectedCurrency === 'DOT' 
                            ? 'bg-minnie-purple text-white' 
                            : 'bg-gray-100 hover:bg-gray-200'
                        }`}
                        onClick={() => setSelectedCurrency('DOT')}
                      >
                        DOT
                      </button>
                      <button
                        className={`px-4 py-2 rounded-md ${
                          selectedCurrency === 'USDC' 
                            ? 'bg-minnie-purple text-white' 
                            : 'bg-gray-100 hover:bg-gray-200'
                        }`}
                        onClick={() => setSelectedCurrency('USDC')}
                      >
                        USDC
                      </button>
                    </div>
                  </div>
                </div>
                
                <div className="flex flex-col justify-between">
                  <div className="bg-gray-50 p-4 rounded-md">
                    <h4 className="text-lg font-medium mb-2">Conversion Preview</h4>
                    <div className="flex justify-between items-center mb-4">
                      <span className="text-gray-600">{convertAmount} VP</span>
                      <ArrowRight className="text-gray-400" />
                      <span className="font-bold">
                        {selectedCurrency === 'DOT' 
                          ? `${convertVpToDot(convertAmount).toFixed(3)} DOT` 
                          : `${convertVpToUsdc(convertAmount).toFixed(2)} USDC`}
                      </span>
                    </div>
                    
                    <div className="text-xs text-gray-500">
                      Current rate: 
                      {selectedCurrency === 'DOT' 
                        ? ' 1000 VP = 1 DOT' 
                        : ' 100 VP = 1 USDC'}
                    </div>
                    
                    <HoverCard>
                      <HoverCardTrigger asChild>
                        <button className="text-xs text-minnie-purple underline mt-1">
                          How does this work?
                        </button>
                      </HoverCardTrigger>
                      <HoverCardContent className="w-80">
                        <div className="text-sm">
                          <p className="font-medium mb-2">Moonbeam Integration</p>
                          <p>
                            Vibe Points are converted to tokens using Moonbeam, a Polkadot parachain 
                            that enables Ethereum-compatible smart contracts. The conversion happens 
                            on-chain and tokens are sent directly to your connected wallet.
                          </p>
                        </div>
                      </HoverCardContent>
                    </HoverCard>
                  </div>
                  
                  <Button 
                    onClick={handleConversion}
                    disabled={convertAmount <= 0 || convertAmount > vibePoints || isConverting}
                    className="mt-4 w-full py-6"
                  >
                    {isConverting ? (
                      <span className="flex items-center gap-2">
                        <span className="animate-spin h-4 w-4 border-2 border-white border-t-transparent rounded-full"></span>
                        Converting...
                      </span>
                    ) : (
                      <span className="flex items-center gap-2">
                        <Coins className="w-5 h-5" />
                        Convert to {selectedCurrency}
                      </span>
                    )}
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}
    </Layout>
  );
};

export default Home;
