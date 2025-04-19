
import { useWallet } from "@/contexts/WalletContext";
import { MissionCard } from "@/components/MissionCard";
import { getActiveMissions } from "@/data/mockData";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

export const FeaturedMissions = () => {
  const { connected, connect } = useWallet();
  const featuredMissions = getActiveMissions().slice(0, 3);

  const handleCompleteMission = (missionId: string) => {
    if (!connected) {
      connect();
      return;
    }
    // This would trigger a transaction in a real app
    alert(`Mission ${missionId} completed!`);
  };

  return (
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
            onComplete={handleCompleteMission}
            requiresWallet={!connected}
          />
        ))}
      </div>
    </section>
  );
};
