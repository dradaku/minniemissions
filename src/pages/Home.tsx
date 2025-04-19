
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
      {/* Hero Section */}
      <section className="py-16 px-4 text-center">
        <div 
          className="max-w-4xl mx-auto p-8 rounded-xl bg-gradient-to-br from-minnie-purple to-minnie-blue text-white shadow-lg"
        >
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

      {/* Featured Missions */}
      {connected && (
        <section className="py-16">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl font-bold">Featured Missions</h2>
            <Link to="/missions" className="text-minnie-purple hover:underline">
              View All
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
        </section>
      )}
    </Layout>
  );
};

export default Home;
