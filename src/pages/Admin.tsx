
import { useState } from "react";
import { useWallet } from "@/contexts/WalletContext";
import { Layout } from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import { MissionCategory, getActiveMissions, getLeaderboard } from "@/data/mockData";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Badge } from "@/components/ui/badge";

const Admin = () => {
  const { connected, account, connect } = useWallet();
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    imageUrl: "",
    reward: 50,
    category: MissionCategory.SOCIAL,
    expiresAt: ""
  });

  // Check if user is admin (in a real app, this would be checked server-side)
  const isAdmin = connected && account === "5DAAnrj7VHTznn2AWBemMuyBwZWs6FNFjdyVXUeYum3PTXFy";

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // In a real app, this would call an API endpoint to create a mission
    toast({
      title: "Mission Created",
      description: `Mission "${formData.title}" has been created successfully.`,
    });
    
    // Reset form
    setFormData({
      title: "",
      description: "",
      imageUrl: "",
      reward: 50,
      category: MissionCategory.SOCIAL,
      expiresAt: ""
    });
  };

  // Prepare data for charts
  const missions = getActiveMissions();
  const leaderboard = getLeaderboard();
  
  const categoryData = Object.values(MissionCategory).map(category => ({
    name: category,
    count: missions.filter(m => m.category === category).length
  }));
  
  const engagementData = [
    { name: 'Completed Missions', value: missions.reduce((sum, m) => sum + m.completedBy.length, 0) },
    { name: 'Active Users', value: leaderboard.length },
    { name: 'Total Referrals', value: leaderboard.reduce((sum, u) => sum + u.referralCount, 0) },
  ];

  if (!connected) {
    return (
      <Layout>
        <div className="min-h-[60vh] flex flex-col items-center justify-center text-center">
          <h1 className="text-3xl font-bold mb-4">Admin Access Required</h1>
          <p className="text-gray-600 max-w-md mb-8">
            You need to connect your wallet to access admin features.
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

  if (!isAdmin) {
    return (
      <Layout>
        <div className="min-h-[60vh] flex flex-col items-center justify-center text-center">
          <h1 className="text-3xl font-bold mb-4">Admin Access Denied</h1>
          <p className="text-gray-600 max-w-md mb-8">
            You don't have admin privileges to access this page.
          </p>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="max-w-6xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Admin Dashboard</h1>
          <p className="text-gray-600">
            Manage missions, view analytics, and monitor community engagement.
          </p>
        </div>

        <Tabs defaultValue="dashboard">
          <TabsList className="mb-8">
            <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
            <TabsTrigger value="missions">Create Mission</TabsTrigger>
            <TabsTrigger value="users">Users</TabsTrigger>
          </TabsList>
          
          {/* Dashboard Tab */}
          <TabsContent value="dashboard">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">Total Missions</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-minnie-purple">{missions.length}</div>
                  <p className="text-sm text-gray-500">Active missions in the system</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">Active Users</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-minnie-purple">{leaderboard.length}</div>
                  <p className="text-sm text-gray-500">Users with VP balance</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">Total Completions</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-minnie-purple">
                    {missions.reduce((sum, m) => sum + m.completedBy.length, 0)}
                  </div>
                  <p className="text-sm text-gray-500">Mission completions</p>
                </CardContent>
              </Card>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
              <Card>
                <CardHeader>
                  <CardTitle>Missions by Category</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-80">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={categoryData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip />
                        <Bar dataKey="count" fill="#8B5CF6" />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Engagement Metrics</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-80">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={engagementData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip />
                        <Bar dataKey="value" fill="#3B82F6" />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
            </div>
            
            <Card>
              <CardHeader>
                <CardTitle>Top Performing Users</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full border-collapse">
                    <thead>
                      <tr className="text-left border-b">
                        <th className="pb-2 pl-4">User</th>
                        <th className="pb-2">Vibe Points</th>
                        <th className="pb-2">Missions</th>
                        <th className="pb-2">Referrals</th>
                        <th className="pb-2">Joined</th>
                      </tr>
                    </thead>
                    <tbody>
                      {leaderboard.slice(0, 5).map((user) => (
                        <tr key={user.id} className="border-b">
                          <td className="py-3 pl-4">
                            <div className="flex items-center">
                              <div className="w-8 h-8 bg-minnie-purple text-white rounded-full flex items-center justify-center font-bold mr-2">
                                {user.name.charAt(0)}
                              </div>
                              <div>
                                <div className="font-medium">{user.name}</div>
                                <div className="text-xs text-gray-500">
                                  {user.address.substring(0, 6)}...
                                  {user.address.substring(user.address.length - 4)}
                                </div>
                              </div>
                            </div>
                          </td>
                          <td className="py-3 font-semibold text-minnie-purple">⚡ {user.vibePoints}</td>
                          <td className="py-3">{user.completedMissions.length}</td>
                          <td className="py-3">{user.referralCount}</td>
                          <td className="py-3">{user.joinedAt.toLocaleDateString()}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          {/* Create Mission Tab */}
          <TabsContent value="missions">
            <div className="max-w-3xl mx-auto">
              <Card>
                <CardHeader>
                  <CardTitle>Create New Mission</CardTitle>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="space-y-2">
                      <Label htmlFor="title">Mission Title</Label>
                      <Input 
                        id="title" 
                        name="title" 
                        value={formData.title} 
                        onChange={handleChange} 
                        placeholder="e.g., Share on Twitter" 
                        required 
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="description">Description</Label>
                      <Textarea 
                        id="description" 
                        name="description" 
                        value={formData.description} 
                        onChange={handleChange} 
                        placeholder="Explain what users need to do to complete this mission" 
                        rows={4} 
                        required 
                      />
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="imageUrl">Image URL</Label>
                        <Input 
                          id="imageUrl" 
                          name="imageUrl" 
                          value={formData.imageUrl} 
                          onChange={handleChange} 
                          placeholder="https://example.com/image.jpg" 
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="reward">Reward (VP)</Label>
                        <Input 
                          id="reward" 
                          name="reward" 
                          type="number" 
                          value={formData.reward.toString()}
                          onChange={handleChange} 
                          min="1" 
                          required 
                        />
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="category">Category</Label>
                        <Select 
                          value={formData.category} 
                          onValueChange={(value) => handleSelectChange("category", value)}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select category" />
                          </SelectTrigger>
                          <SelectContent>
                            {Object.values(MissionCategory).map((category) => (
                              <SelectItem key={category} value={category}>
                                {category}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="expiresAt">Expiration Date (Optional)</Label>
                        <Input 
                          id="expiresAt" 
                          name="expiresAt" 
                          type="date" 
                          value={formData.expiresAt} 
                          onChange={handleChange} 
                        />
                      </div>
                    </div>
                    
                    <Button 
                      type="submit" 
                      className="w-full bg-gradient-to-r from-minnie-purple to-minnie-blue text-white"
                    >
                      Create Mission
                    </Button>
                  </form>
                </CardContent>
              </Card>
              
              <Card className="mt-8">
                <CardHeader>
                  <CardTitle>Recent Missions</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {missions.slice(0, 5).map((mission) => (
                      <div key={mission.id} className="flex justify-between items-center p-4 bg-gray-50 rounded-lg">
                        <div>
                          <div className="font-medium">{mission.title}</div>
                          <div className="text-sm text-gray-500">
                            Created {new Date(mission.createdAt).toLocaleDateString()}
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Badge>{mission.category}</Badge>
                          <div className="font-semibold text-minnie-purple">⚡ {mission.reward}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
          
          {/* Users Tab */}
          <TabsContent value="users">
            <Card>
              <CardHeader>
                <CardTitle>All Users</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full border-collapse">
                    <thead>
                      <tr className="text-left border-b">
                        <th className="pb-2 pl-4">User</th>
                        <th className="pb-2">Wallet Address</th>
                        <th className="pb-2">Vibe Points</th>
                        <th className="pb-2">Missions</th>
                        <th className="pb-2">Referrals</th>
                        <th className="pb-2">Joined</th>
                      </tr>
                    </thead>
                    <tbody>
                      {leaderboard.map((user) => (
                        <tr key={user.id} className="border-b">
                          <td className="py-3 pl-4">
                            <div className="flex items-center">
                              <div className="w-8 h-8 bg-minnie-purple text-white rounded-full flex items-center justify-center font-bold mr-2">
                                {user.name.charAt(0)}
                              </div>
                              <div className="font-medium">{user.name}</div>
                            </div>
                          </td>
                          <td className="py-3 font-mono text-xs text-gray-600">
                            {user.address.substring(0, 8)}...{user.address.substring(user.address.length - 8)}
                          </td>
                          <td className="py-3 font-semibold text-minnie-purple">⚡ {user.vibePoints}</td>
                          <td className="py-3">{user.completedMissions.length}</td>
                          <td className="py-3">{user.referralCount}</td>
                          <td className="py-3">{user.joinedAt.toLocaleDateString()}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
};

export default Admin;
