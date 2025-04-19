
import { Link } from "react-router-dom";
import { useWallet } from "@/contexts/WalletContext";
import { Layout } from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { MissionCard } from "@/components/MissionCard";
import { getActiveMissions } from "@/data/mockData";
import { Trophy, Award, ListChecks, User } from "lucide-react";

const Home = () => {
  const { connected, connect, vibePoints } = useWallet();
  const featuredMissions = getActiveMissions().slice(0, 3);

  return (
    <Layout>
      {/* Hero Section with Improved Design */}
      <section className="py-16 px-4 text-center">
        <div 
          className="max-w-4xl mx-auto p-8 rounded-2xl bg-gradient-to-br from-minnie-purple to-minnie-blue 
          text-white shadow-2xl transition-all duration-300 hover:shadow-3xl transform hover:-translate-y-1"
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-4 tracking-tight leading-tight">
            Transform Your Fan Experience
          </h1>
          <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
            Connect, engage, and earn rewards by completing exclusive missions with your favorite artists.
          </p>
          
          {connected ? (
            <div className="flex flex-col items-center gap-4">
              <div className="text-2xl font-bold bg-white/20 px-5 py-2 rounded-full inline-flex items-center 
              animate-pulse hover:animate-none transition-all">
                <span className="mr-2">⚡</span>
                <span>{vibePoints} Vibe Points</span>
              </div>
              <Link to="/missions">
                <Button 
                  size="lg"
                  className="bg-white hover:bg-white/90 text-minnie-purple shadow-lg hover:shadow-xl 
                  transition-all duration-300 transform hover:scale-105"
                >
                  Explore Missions
                </Button>
              </Link>
            </div>
          ) : (
            <Button 
              size="lg"
              className="bg-white hover:bg-white/90 text-minnie-purple shadow-lg hover:shadow-xl 
              transition-all duration-300 transform hover:scale-105"
              onClick={connect}
            >
              Connect Wallet to Start
            </Button>
          )}
        </div>
      </section>

      {/* Features Section with Professional Layout */}
      <section className="py-16 bg-gray-50">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4 text-gray-800">How Minniemissions Works</h2>
          <p className="text-gray-600 max-w-2xl mx-auto text-lg">
            Revolutionize fan engagement through blockchain-powered missions and rewards.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {[
            {
              icon: ListChecks,
              title: "Complete Missions",
              description: "Participate in unique challenges curated by your favorite artists."
            },
            {
              icon: Award,
              title: "Earn Vibe Points",
              description: "Get rewarded with on-chain Vibe Points for every mission."
            },
            {
              icon: Trophy,
              title: "Unlock Rewards",
              description: "Exchange points for exclusive content and experiences."
            }
          ].map(({ icon: Icon, title, description }, index) => (
            <div 
              key={title} 
              className="bg-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 
              transform hover:-translate-y-2 text-center"
            >
              <div className={`w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center 
              ${index === 0 ? 'bg-blue-50' : index === 1 ? 'bg-purple-50' : 'bg-green-50'}`}>
                <Icon className={`h-8 w-8 ${
                  index === 0 ? 'text-blue-500' : 
                  index === 1 ? 'text-purple-500' : 
                  'text-green-500'
                }`} />
              </div>
              <h3 className="text-xl font-bold mb-2 text-gray-800">{title}</h3>
              <p className="text-gray-600">{description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Featured Missions with Improved Design */}
      {connected && (
        <section className="py-16">
          <div className="container mx-auto">
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-2xl font-bold text-gray-800">Featured Missions</h2>
              <Link to="/missions" className="text-minnie-purple hover:underline flex items-center gap-2">
                View All Missions
              </Link>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              {featuredMissions.map((mission) => (
                <MissionCard
                  key={mission.id}
                  mission={mission}
                  onComplete={() => {
                    // This would trigger a transaction in a real app
                    alert(`Mission ${mission.id} completed!`);
                  }}
                />
              ))}
            </div>
          </div>
        </section>
      )}
    </Layout>
  );
};

export default Home;
