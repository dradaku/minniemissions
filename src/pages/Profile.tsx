
import { useState } from 'react';
import { useWallet } from '@/contexts/WalletContext';
import { Layout } from '@/components/Layout';
import { ReferralQRCode } from '@/components/ReferralQRCode';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { MissionCard } from '@/components/MissionCard';
import { Award, Star, Users, Share2, User } from 'lucide-react';
import { mockAvailableMissions, mockCompletedMissions, mockUserProfile } from '@/data/mockProfileData';
import type { Mission, UserProfile } from '@/types/profile';

const Profile = () => {
  const { connected, account, vibePoints, connect } = useWallet();
  const [activeTab, setActiveTab] = useState('overview');
  
  // Use mock data
  const availableMissions = mockAvailableMissions;
  const completedMissions = mockCompletedMissions;
  const user: UserProfile = mockUserProfile;

  if (!connected) {
    return (
      <Layout>
        <div className="max-w-6xl mx-auto">
          {/* Demo Profile Header */}
          <div className="mb-8 bg-gradient-to-r from-minnie-purple to-minnie-blue rounded-xl p-6 md:p-8 text-white">
            <div className="flex flex-col md:flex-row items-center gap-6">
              <div className="w-24 h-24 bg-white/20 rounded-full flex items-center justify-center text-4xl font-bold">
                D
              </div>
              <div className="text-center md:text-left">
                <h1 className="text-2xl md:text-3xl font-bold mb-1">Demo Profile</h1>
                <p className="text-white/80 text-sm mb-3">
                  Connect your wallet to personalize your profile
                </p>
                <div className="flex flex-wrap gap-4 justify-center md:justify-start">
                  <div className="bg-white/20 rounded-full px-4 py-1 flex items-center">
                    <span className="mr-1">⚡</span>
                    <span className="font-semibold">0 Vibe Points</span>
                  </div>
                  <div className="bg-white/20 rounded-full px-4 py-1 flex items-center">
                    <Award className="w-4 h-4 mr-1" />
                    <span className="font-semibold">0 Missions</span>
                  </div>
                  <Button 
                    size="sm"
                    className="bg-white text-minnie-purple hover:bg-white/90"
                    onClick={connect}
                  >
                    Connect Wallet
                  </Button>
                </div>
              </div>
            </div>
          </div>

          {/* Demo Content */}
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="mb-8">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="missions">Missions</TabsTrigger>
              <TabsTrigger value="referrals">Referrals</TabsTrigger>
            </TabsList>
            
            <TabsContent value="overview">
              <div className="grid md:grid-cols-2 gap-8">
                <Card>
                  <CardHeader>
                    <CardTitle>Welcome to Minniemissions!</CardTitle>
                    <CardDescription>
                      Connect your wallet to start earning Vibe Points and completing missions.
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg">
                      <div className="w-8 h-8 bg-minnie-purple/10 rounded-full flex items-center justify-center">
                        <Star className="w-4 h-4 text-minnie-purple" />
                      </div>
                      <div>
                        <p className="font-medium">Complete Missions</p>
                        <p className="text-sm text-gray-600">Earn rewards by completing various tasks</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg">
                      <div className="w-8 h-8 bg-minnie-purple/10 rounded-full flex items-center justify-center">
                        <Users className="w-4 h-4 text-minnie-purple" />
                      </div>
                      <div>
                        <p className="font-medium">Refer Friends</p>
                        <p className="text-sm text-gray-600">Earn bonus points through referrals</p>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button 
                      className="w-full bg-gradient-to-r from-minnie-purple to-minnie-blue text-white"
                      onClick={connect}
                    >
                      Get Started
                    </Button>
                  </CardFooter>
                </Card>

                <div>
                  <h2 className="text-xl font-bold mb-4">Available Missions</h2>
                  <div className="space-y-4">
                    {availableMissions.map(mission => (
                      <Card key={mission.id}>
                        <CardHeader className="pb-2">
                          <CardTitle className="flex justify-between items-center">
                            <span>{mission.title}</span>
                            <span className="text-minnie-purple">⚡ {mission.reward}</span>
                          </CardTitle>
                        </CardHeader>
                        <CardContent>
                          <p className="text-gray-600 text-sm">{mission.description}</p>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="missions">
              <div className="text-center py-12">
                <Star className="h-12 w-12 text-gray-300 mb-4 mx-auto" />
                <h3 className="text-xl font-medium mb-2">Connect to View Missions</h3>
                <p className="text-gray-500 mb-6">
                  Connect your wallet to start completing missions and earning rewards.
                </p>
                <Button 
                  onClick={connect}
                  className="bg-gradient-to-r from-minnie-purple to-minnie-blue text-white"
                >
                  Connect Wallet
                </Button>
              </div>
            </TabsContent>
            
            <TabsContent value="referrals">
              <div className="text-center py-12">
                <Users className="h-12 w-12 text-gray-300 mb-4 mx-auto" />
                <h3 className="text-xl font-medium mb-2">Connect to View Referrals</h3>
                <p className="text-gray-500 mb-6">
                  Connect your wallet to get your referral code and start earning bonus points.
                </p>
                <Button 
                  onClick={connect}
                  className="bg-gradient-to-r from-minnie-purple to-minnie-blue text-white"
                >
                  Connect Wallet
                </Button>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="max-w-6xl mx-auto">
        {/* Profile Header */}
        <div className="mb-8 bg-gradient-to-r from-minnie-purple to-minnie-blue rounded-xl p-6 md:p-8 text-white">
          <div className="flex flex-col md:flex-row items-center gap-6">
            <div className="w-24 h-24 bg-white/20 rounded-full flex items-center justify-center text-4xl font-bold">
              {user.name.charAt(0)}
            </div>
            <div className="text-center md:text-left">
              <h1 className="text-2xl md:text-3xl font-bold mb-1">{user.name}</h1>
              <p className="text-white/80 text-sm mb-3">
                {account?.substring(0, 8)}...{account?.substring(account.length - 8)}
              </p>
              <div className="flex flex-wrap gap-4 justify-center md:justify-start">
                <div className="bg-white/20 rounded-full px-4 py-1 flex items-center">
                  <span className="mr-1">⚡</span>
                  <span className="font-semibold">{vibePoints} Vibe Points</span>
                </div>
                <div className="bg-white/20 rounded-full px-4 py-1 flex items-center">
                  <Award className="w-4 h-4 mr-1" />
                  <span className="font-semibold">{completedMissions.length} Missions</span>
                </div>
                <div className="bg-white/20 rounded-full px-4 py-1 flex items-center">
                  <Users className="w-4 h-4 mr-1" />
                  <span className="font-semibold">{user?.referralCount || 0} Referrals</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Profile Content */}
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="mb-8">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="missions">Missions</TabsTrigger>
            <TabsTrigger value="referrals">Referrals</TabsTrigger>
          </TabsList>
          
          <TabsContent value="overview">
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h2 className="text-xl font-bold mb-4">Stats Overview</h2>
                <div className="grid grid-cols-2 gap-4">
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-lg">Vibe Points</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-3xl font-bold text-minnie-purple flex items-center">
                        <span className="mr-2">⚡</span>
                        {vibePoints}
                      </div>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-lg">Missions</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-3xl font-bold text-minnie-purple">
                        {completedMissions.length}
                      </div>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-lg">Referrals</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-3xl font-bold text-minnie-purple">
                        {user?.referralCount || 0}
                      </div>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-lg">Joined</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-xl font-bold text-minnie-purple">
                        {user?.joinedAt.toLocaleDateString() || '-'}
                      </div>
                    </CardContent>
                  </Card>
                </div>

                <h2 className="text-xl font-bold mt-8 mb-4">Recent Missions</h2>
                {completedMissions.length > 0 ? (
                  <div className="space-y-4">
                    {completedMissions.slice(0, 3).map(mission => (
                      <Card key={mission.id}>
                        <CardHeader className="pb-2">
                          <CardTitle className="flex justify-between items-center">
                            <span>{mission.title}</span>
                            <span className="text-minnie-purple">⚡ {mission.reward}</span>
                          </CardTitle>
                        </CardHeader>
                        <CardContent>
                          <p className="text-gray-600 text-sm">{mission.description}</p>
                        </CardContent>
                      </Card>
                    ))}
                    {completedMissions.length > 3 && (
                      <Button 
                        variant="outline" 
                        className="w-full" 
                        onClick={() => setActiveTab('missions')}
                      >
                        View All Missions
                      </Button>
                    )}
                  </div>
                ) : (
                  <Card>
                    <CardContent className="py-6 text-center">
                      <p className="text-gray-500">No missions completed yet</p>
                      <Button 
                        variant="link" 
                        onClick={() => setActiveTab('missions')}
                        className="text-minnie-purple"
                      >
                        Browse Available Missions
                      </Button>
                    </CardContent>
                  </Card>
                )}
              </div>

              <div>
                <h2 className="text-xl font-bold mb-4">Your Referral Code</h2>
                <ReferralQRCode 
                  userId={account || ''}
                  title="Share Your Referral Code"
                  description="When friends scan this QR code and complete missions, you'll earn bonus Vibe Points!"
                />
              </div>
            </div>
          </TabsContent>
        
          <TabsContent value="missions">
            <div className="mb-6">
              <h2 className="text-xl font-bold mb-2">Your Missions</h2>
              <p className="text-gray-600">
                Track your mission progress and find new opportunities to earn Vibe Points.
              </p>
            </div>

            <Tabs defaultValue="available">
              <TabsList>
                <TabsTrigger value="available">Available ({availableMissions.length})</TabsTrigger>
                <TabsTrigger value="completed">Completed ({completedMissions.length})</TabsTrigger>
              </TabsList>
              <TabsContent value="available" className="pt-6">
                {availableMissions.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {availableMissions.map(mission => (
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
                ) : (
                  <div className="text-center py-12">
                    <Star className="h-12 w-12 text-gray-300 mb-4 mx-auto" />
                    <h3 className="text-xl font-medium mb-2">No Available Missions</h3>
                    <p className="text-gray-500 mb-6">
                      You've completed all current missions! Check back later for more.
                    </p>
                  </div>
                )}
              </TabsContent>
              <TabsContent value="completed" className="pt-6">
                {completedMissions.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {completedMissions.map(mission => (
                      <MissionCard
                        key={mission.id}
                        mission={mission}
                        onComplete={() => {}}
                        isCompleted={true}
                      />
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <Star className="h-12 w-12 text-gray-300 mb-4 mx-auto" />
                    <h3 className="text-xl font-medium mb-2">No Completed Missions</h3>
                    <p className="text-gray-500 mb-6">
                      You haven't completed any missions yet. Start with an easy one!
                    </p>
                    <Button 
                      onClick={() => setActiveTab('available')}
                      className="bg-gradient-to-r from-minnie-purple to-minnie-blue text-white"
                    >
                      Browse Available Missions
                    </Button>
                  </div>
                )}
              </TabsContent>
            </Tabs>
          </TabsContent>
          
          <TabsContent value="referrals">
            <div className="max-w-3xl mx-auto">
              <div className="mb-8 text-center">
                <h2 className="text-xl font-bold mb-2">Your Referral Program</h2>
                <p className="text-gray-600">
                  Share your referral code with friends and earn Vibe Points when they complete missions.
                </p>
              </div>
              
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <Card className="mb-6">
                    <CardHeader>
                      <CardTitle>Referral Stats</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="text-center p-4 bg-gray-50 rounded-lg">
                          <p className="text-sm text-gray-500">Total Referrals</p>
                          <p className="text-3xl font-bold text-minnie-purple">{user?.referralCount || 0}</p>
                        </div>
                        <div className="text-center p-4 bg-gray-50 rounded-lg">
                          <p className="text-sm text-gray-500">Points Earned</p>
                          <p className="text-3xl font-bold text-minnie-purple">
                            {(user?.referralCount || 0) * 25} VP
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardHeader>
                      <CardTitle>How Referrals Work</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="flex gap-3">
                        <div className="w-8 h-8 bg-minnie-purple/10 rounded-full flex items-center justify-center flex-shrink-0">
                          <span className="font-bold text-minnie-purple">1</span>
                        </div>
                        <p>Share your unique QR code or referral link with friends</p>
                      </div>
                      <div className="flex gap-3">
                        <div className="w-8 h-8 bg-minnie-purple/10 rounded-full flex items-center justify-center flex-shrink-0">
                          <span className="font-bold text-minnie-purple">2</span>
                        </div>
                        <p>Friends join Minniemissions using your referral</p>
                      </div>
                      <div className="flex gap-3">
                        <div className="w-8 h-8 bg-minnie-purple/10 rounded-full flex items-center justify-center flex-shrink-0">
                          <span className="font-bold text-minnie-purple">3</span>
                        </div>
                        <p>You earn 25 VP for each friend who completes their first mission</p>
                      </div>
                      <div className="flex gap-3">
                        <div className="w-8 h-8 bg-minnie-purple/10 rounded-full flex items-center justify-center flex-shrink-0">
                          <span className="font-bold text-minnie-purple">4</span>
                        </div>
                        <p>Earn bonus VP for high-performing referrals</p>
                      </div>
                    </CardContent>
                  </Card>
                </div>
                
                <div>
                  <ReferralQRCode 
                    userId={account || ''}
                    title="Your Referral QR Code"
                    description="Share this with friends to earn bonus Vibe Points when they join and complete missions."
                  />
                  
                  <Card className="mt-6">
                    <CardHeader>
                      <CardTitle>Share Your Code</CardTitle>
                      <CardDescription>
                        Share your referral code via these channels
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="flex justify-center gap-4">
                        <Button 
                          variant="outline" 
                          className="flex-1 flex items-center justify-center gap-2"
                          onClick={() => {
                            // This would generate a Twitter share link in a real app
                            alert('Share on Twitter');
                          }}
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path>
                          </svg>
                          Twitter
                        </Button>
                        <Button 
                          variant="outline" 
                          className="flex-1 flex items-center justify-center gap-2"
                          onClick={() => {
                            // This would copy the referral link in a real app
                            alert('Referral link copied to clipboard!');
                          }}
                        >
                          <Share2 className="w-5 h-5" />
                          Copy Link
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
};

export default Profile;
