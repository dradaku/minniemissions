
import { useState } from "react";
import { Layout } from "@/components/Layout";
import { getLeaderboard } from "@/data/mockData";
import { Input } from "@/components/ui/input";
import { Search, Trophy, Award, Medal } from "lucide-react";

const Leaderboard = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const leaderboardData = getLeaderboard();
  
  // Filter users based on search query
  const filteredUsers = leaderboardData.filter((user) =>
    user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    user.address.toLowerCase().includes(searchQuery.toLowerCase())
  );
  
  // Render medal icon based on rank
  const getMedalIcon = (rank: number) => {
    switch (rank) {
      case 1:
        return <Trophy className="h-6 w-6 text-yellow-500" />;
      case 2:
        return <Medal className="h-6 w-6 text-gray-400" />;
      case 3:
        return <Medal className="h-6 w-6 text-amber-700" />;
      default:
        return <span className="text-lg font-semibold text-gray-500">{rank}</span>;
    }
  };

  return (
    <Layout>
      <div className="max-w-4xl mx-auto">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold mb-2">Vibe Points Leaderboard</h1>
          <p className="text-gray-600">
            The top fans with the most Vibe Points from completed missions.
          </p>
        </div>

        {/* Search */}
        <div className="relative mb-8 max-w-md mx-auto">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
          <Input
            type="text"
            placeholder="Search users..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>

        {/* Top 3 Podium for larger screens */}
        <div className="hidden md:flex justify-center items-end gap-4 mb-12">
          {filteredUsers.slice(0, 3).map((user, index) => {
            const rank = index + 1;
            const podiumHeight = rank === 1 ? "h-40" : rank === 2 ? "h-32" : "h-24";
            
            return (
              <div key={user.id} className="flex flex-col items-center">
                <div className="mb-2 text-center">
                  <h3 className="font-bold">{user.name}</h3>
                  <div className="text-minnie-purple font-bold">
                    ⚡ {user.vibePoints} VP
                  </div>
                </div>
                <div 
                  className={`${podiumHeight} w-24 rounded-t-lg bg-gradient-to-b ${
                    rank === 1 
                      ? "from-yellow-400 to-yellow-500" 
                      : rank === 2 
                      ? "from-gray-300 to-gray-400" 
                      : "from-amber-600 to-amber-700"
                  } flex items-center justify-center text-white`}
                >
                  <span className="text-2xl font-bold">#{rank}</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Leaderboard Table */}
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <table className="min-w-full">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-200">
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Rank
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  User
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Vibe Points
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Missions
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Referrals
                </th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.map((user, index) => (
                <tr 
                  key={user.id} 
                  className={`border-b border-gray-200 ${
                    index < 3 ? "bg-gradient-to-r from-minnie-purple/5 to-transparent" : ""
                  } hover:bg-gray-50`}
                >
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center justify-center w-8 h-8">
                      {getMedalIcon(index + 1)}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 h-10 w-10 bg-minnie-purple text-white rounded-full flex items-center justify-center font-bold">
                        {user.name.charAt(0)}
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">{user.name}</div>
                        <div className="text-xs text-gray-500">
                          {user.address.substring(0, 6)}...{user.address.substring(user.address.length - 4)}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-bold text-minnie-purple">⚡ {user.vibePoints}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-500">{user.completedMissions.length}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-500">{user.referralCount}</div>
                  </td>
                </tr>
              ))}
              
              {filteredUsers.length === 0 && (
                <tr>
                  <td colSpan={5} className="px-6 py-12 text-center">
                    <div className="flex flex-col items-center">
                      <Search className="h-8 w-8 text-gray-300 mb-2" />
                      <p className="text-gray-500">No users found</p>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </Layout>
  );
};

export default Leaderboard;
