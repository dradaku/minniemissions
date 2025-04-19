
import { useState } from "react";
import { useWallet } from "@/contexts/WalletContext";
import { Layout } from "@/components/Layout";
import { MissionCard } from "@/components/MissionCard";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { getActiveMissions, MissionCategory } from "@/data/mockData";
import { Search, Filter } from "lucide-react";

const Missions = () => {
  const { connected, connect } = useWallet();
  const missions = getActiveMissions();
  
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState<string>("all");
  
  // Filter missions based on search query and active category
  const filteredMissions = missions.filter((mission) => {
    const matchesSearch = mission.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          mission.description.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesCategory = activeCategory === "all" || mission.category === activeCategory;
    
    return matchesSearch && matchesCategory;
  });

  // Handler for mission completion
  const handleCompleteMission = (missionId: string) => {
    // In a real app, this would call a smart contract function
    alert(`Mission ${missionId} completed!`);
  };

  if (!connected) {
    return (
      <Layout>
        <div className="min-h-[60vh] flex flex-col items-center justify-center text-center">
          <div className="w-16 h-16 bg-minnie-purple/10 rounded-full flex items-center justify-center mb-4">
            <Search className="h-8 w-8 text-minnie-purple" />
          </div>
          <h1 className="text-3xl font-bold mb-4">Connect to View Missions</h1>
          <p className="text-gray-600 max-w-md mb-8">
            You need to connect your wallet to view and complete missions.
          </p>
          <Button 
            size="lg"
            className="bg-gradient-to-r from-minnie-purple to-minnie-blue text-white"
            onClick={connect}
          >
            Connect Wallet
          </Button>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Available Missions</h1>
        <p className="text-gray-600">
          Complete missions to earn Vibe Points and exclusive rewards.
        </p>
      </div>

      {/* Search and Filter */}
      <div className="mb-8 flex flex-col md:flex-row gap-4">
        <div className="relative flex-grow">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
          <Input
            type="text"
            placeholder="Search missions..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
        <div className="flex items-center gap-2">
          <Filter size={18} className="text-gray-500" />
          <Tabs defaultValue="all" value={activeCategory} onValueChange={setActiveCategory}>
            <TabsList>
              <TabsTrigger value="all">All</TabsTrigger>
              <TabsTrigger value={MissionCategory.SOCIAL}>Social</TabsTrigger>
              <TabsTrigger value={MissionCategory.EVENT}>Events</TabsTrigger>
              <TabsTrigger value={MissionCategory.CONTENT}>Content</TabsTrigger>
              <TabsTrigger value={MissionCategory.REFERRAL}>Referral</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
      </div>

      {/* Missions Grid */}
      {filteredMissions.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredMissions.map((mission) => (
            <MissionCard
              key={mission.id}
              mission={mission}
              onComplete={handleCompleteMission}
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-16">
          <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Search className="h-8 w-8 text-gray-400" />
          </div>
          <h3 className="text-xl font-medium mb-2">No missions found</h3>
          <p className="text-gray-500">
            Try adjusting your search or filters to find more missions.
          </p>
        </div>
      )}
    </Layout>
  );
};

export default Missions;
