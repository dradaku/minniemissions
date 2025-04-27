
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import { Loader2, Calendar, MapPin, Users, Trophy } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { fandoms } from "@/data/fandoms";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { useWallet } from "@/contexts/WalletContext";

interface MeetupStakingProps {
  vibePoints: number;
}

type MeetupStatus = "upcoming" | "active" | "completed";

interface Meetup {
  id: string;
  title: string;
  description: string;
  location: string;
  date: string;
  fandom: string;
  organizer: string;
  stakingGoal: number;
  currentStaked: number;
  participants: number;
  status: MeetupStatus;
}

const mockMeetups: Meetup[] = [
  {
    id: "1",
    title: "BeyHive New Album Listening Party",
    description: "Join fellow BeyHive members for an exclusive listening party of Beyoncé's latest album. Food and drinks provided!",
    location: "Studio 55, Los Angeles",
    date: "2025-05-15",
    fandom: "BeyHive",
    organizer: "bee_queen_324",
    stakingGoal: 500,
    currentStaked: 350,
    participants: 24,
    status: "upcoming"
  },
  {
    id: "2",
    title: "30BG Lagos Meetup",
    description: "Meet other 30BG fans in Lagos for a day of music, games, and community. Special Davido merch giveaways!",
    location: "Landmark Beach, Lagos",
    date: "2025-05-10",
    fandom: "30BG",
    organizer: "davido_stan",
    stakingGoal: 300,
    currentStaked: 300,
    participants: 42,
    status: "active"
  },
  {
    id: "3",
    title: "Swifties Friendship Bracelet Exchange",
    description: "Exchange friendship bracelets with fellow Swifties and discuss theories about Taylor's next album.",
    location: "Central Park, New York",
    date: "2025-06-20",
    fandom: "Swifties",
    organizer: "ts_enchanted",
    stakingGoal: 250,
    currentStaked: 180,
    participants: 35,
    status: "upcoming"
  }
];

export const MeetupStaking: React.FC<MeetupStakingProps> = ({ vibePoints }) => {
  const { toast } = useToast();
  const { connected } = useWallet();
  const [meetups, setMeetups] = useState<Meetup[]>(mockMeetups);
  const [stakeAmount, setStakeAmount] = useState<number>(50);
  const [selectedMeetup, setSelectedMeetup] = useState<Meetup | null>(null);
  const [isStaking, setIsStaking] = useState(false);
  const [isCreating, setIsCreating] = useState(false);
  const [kycDialogOpen, setKycDialogOpen] = useState(false);
  const [kycVerified, setKycVerified] = useState(false);
  const [kycProcessing, setKycProcessing] = useState(false);

  const [newMeetup, setNewMeetup] = useState({
    title: "",
    description: "",
    location: "",
    date: "",
    fandom: "",
    stakingGoal: 200
  });

  const handleCreateMeetup = () => {
    if (!kycVerified) {
      setKycDialogOpen(true);
      return;
    }
    
    setIsCreating(true);
    
    setTimeout(() => {
      const newMeetupObj: Meetup = {
        id: Date.now().toString(),
        ...newMeetup,
        organizer: "current_user",
        currentStaked: 100,
        participants: 1,
        status: "upcoming"
      };
      
      setMeetups(prev => [newMeetupObj, ...prev]);
      toast({
        title: "Meetup created successfully!",
        description: "Your meetup has been created and is now visible to other fans."
      });
      
      setNewMeetup({
        title: "",
        description: "",
        location: "",
        date: "",
        fandom: "",
        stakingGoal: 200
      });
      
      setIsCreating(false);
    }, 1500);
  };

  const handleStakeMeetup = (meetup: Meetup) => {
    setSelectedMeetup(meetup);
  };

  const confirmStake = () => {
    if (!selectedMeetup) return;
    
    if (!connected) {
      toast({
        title: "Wallet not connected",
        description: "Please connect your wallet to stake vibe points.",
      });
      window.location.href = "/auth";
      return;
    }
    
    if (stakeAmount > vibePoints) {
      toast({
        title: "Insufficient vibe points",
        description: "You don't have enough vibe points to stake this amount.",
        variant: "destructive"
      });
      return;
    }
    
    setIsStaking(true);
    
    setTimeout(() => {
      const updatedMeetups = meetups.map(m => {
        if (m.id === selectedMeetup.id) {
          return {
            ...m,
            currentStaked: m.currentStaked + stakeAmount,
            participants: m.participants + 1
          };
        }
        return m;
      });
      
      setMeetups(updatedMeetups);
      toast({
        title: "Staking successful!",
        description: `You have staked ${stakeAmount} VP for "${selectedMeetup.title}".`
      });
      
      setIsStaking(false);
      setSelectedMeetup(null);
    }, 1500);
  };

  const simulateKycVerification = () => {
    setKycProcessing(true);
    
    setTimeout(() => {
      setKycVerified(true);
      setKycProcessing(false);
      setKycDialogOpen(false);
      toast({
        title: "KYC Verification Complete",
        description: "Your identity has been verified. You can now create meetups."
      });
    }, 2000);
  };

  const getStatusColor = (status: MeetupStatus) => {
    switch (status) {
      case "upcoming": return "bg-blue-100 text-blue-800";
      case "active": return "bg-green-100 text-green-800";
      case "completed": return "bg-gray-100 text-gray-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="space-y-8">
      {connected && (
        <Card className="bg-gradient-to-r from-indigo-50 to-purple-50">
          <CardHeader>
            <CardTitle>Create MinnieSquad Meetup</CardTitle>
            <CardDescription>
              Organize a meetup for your favorite fandom and fund it with vibe points.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-4">
              <div>
                <Label htmlFor="title">Meetup Title</Label>
                <Input
                  id="title"
                  placeholder="Enter meetup title"
                  value={newMeetup.title}
                  onChange={(e) => setNewMeetup({...newMeetup, title: e.target.value})}
                />
              </div>
              
              <div>
                <Label htmlFor="fandom">Select Fandom</Label>
                <Select 
                  value={newMeetup.fandom} 
                  onValueChange={(value) => setNewMeetup({...newMeetup, fandom: value})}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select a fandom" />
                  </SelectTrigger>
                  <SelectContent>
                    {fandoms.filter(f => f.name !== "Other").map((fandom) => (
                      <SelectItem key={fandom.name} value={fandom.name}>
                        {fandom.fanbase} ({fandom.artist})
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="date">Date</Label>
                  <Input
                    id="date"
                    type="date"
                    value={newMeetup.date}
                    onChange={(e) => setNewMeetup({...newMeetup, date: e.target.value})}
                  />
                </div>
                <div>
                  <Label htmlFor="stakingGoal">Staking Goal (VP)</Label>
                  <Input
                    id="stakingGoal"
                    type="number"
                    min="100"
                    value={newMeetup.stakingGoal}
                    onChange={(e) => setNewMeetup({...newMeetup, stakingGoal: parseInt(e.target.value)})}
                  />
                </div>
              </div>
              
              <div>
                <Label htmlFor="location">Location</Label>
                <Input
                  id="location"
                  placeholder="Enter meetup location"
                  value={newMeetup.location}
                  onChange={(e) => setNewMeetup({...newMeetup, location: e.target.value})}
                />
              </div>
              
              <div>
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  placeholder="Describe your meetup..."
                  value={newMeetup.description}
                  onChange={(e) => setNewMeetup({...newMeetup, description: e.target.value})}
                  className="min-h-[100px]"
                />
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Button 
              onClick={handleCreateMeetup} 
              disabled={isCreating || !newMeetup.title || !newMeetup.fandom || !newMeetup.date || !newMeetup.location}
              className="w-full"
            >
              {isCreating ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Creating Meetup...
                </>
              ) : (
                "Create Meetup"
              )}
            </Button>
          </CardFooter>
        </Card>
      )}

      {connected && (
        <Dialog open={kycDialogOpen} onOpenChange={setKycDialogOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>KYC Verification Required</DialogTitle>
              <DialogDescription>
                For safety and accountability, we require identity verification before allowing users to create meetups.
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <p className="text-sm">
                Our KYC process ensures that all meetup organizers are verified, creating a safe environment for all participants.
              </p>
              <Separator />
              <div className="grid gap-2">
                <Label htmlFor="full-name">Full Legal Name</Label>
                <Input id="full-name" placeholder="Enter your full name" />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="id-number">ID Number</Label>
                <Input id="id-number" placeholder="Government ID number" />
              </div>
              <div className="grid gap-2">
                <Label>ID Document</Label>
                <div className="border-2 border-dashed rounded-md p-6 text-center cursor-pointer hover:bg-gray-50">
                  <p className="text-sm text-gray-500">Click to upload your ID document</p>
                </div>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setKycDialogOpen(false)} disabled={kycProcessing}>
                Cancel
              </Button>
              <Button onClick={simulateKycVerification} disabled={kycProcessing}>
                {kycProcessing ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Verifying...
                  </>
                ) : (
                  "Submit for Verification"
                )}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}

      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold">Available Meetups</h2>
          {!connected && (
            <Button 
              variant="outline" 
              onClick={() => window.location.href = "/auth"}
              className="ml-4"
            >
              Connect Wallet to Create & Join Meetups
            </Button>
          )}
        </div>
        
        <p className="text-sm text-muted-foreground">
          Browse upcoming MinnieSquad meetups. Connect your wallet to create new meetups or stake VP to join existing ones.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {meetups.map((meetup) => (
          <Card key={meetup.id} className="overflow-hidden">
            <CardHeader className="pb-2">
              <div className="flex justify-between items-start">
                <CardTitle className="text-lg">{meetup.title}</CardTitle>
                <Badge className={getStatusColor(meetup.status)}>
                  {meetup.status.charAt(0).toUpperCase() + meetup.status.slice(1)}
                </Badge>
              </div>
              <CardDescription>{meetup.fandom}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4 pt-2">
              <p className="text-sm">{meetup.description}</p>
              
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div className="flex items-center">
                  <Calendar className="h-4 w-4 mr-2 opacity-70" />
                  <span>{new Date(meetup.date).toLocaleDateString()}</span>
                </div>
                <div className="flex items-center">
                  <MapPin className="h-4 w-4 mr-2 opacity-70" />
                  <span>{meetup.location}</span>
                </div>
                <div className="flex items-center">
                  <Users className="h-4 w-4 mr-2 opacity-70" />
                  <span>{meetup.participants} participants</span>
                </div>
                <div className="flex items-center">
                  <Trophy className="h-4 w-4 mr-2 opacity-70" />
                  <span>Organizer: {meetup.organizer}</span>
                </div>
              </div>
              
              <div className="space-y-2">
                <div className="w-full bg-gray-200 rounded-full h-2.5">
                  <div 
                    className="bg-primary h-2.5 rounded-full" 
                    style={{ width: `${(meetup.currentStaked / meetup.stakingGoal) * 100}%` }}
                  ></div>
                </div>
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>{meetup.currentStaked} VP staked</span>
                  <span>Goal: {meetup.stakingGoal} VP</span>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Dialog>
                <DialogTrigger asChild>
                  <Button 
                    variant={meetup.currentStaked >= meetup.stakingGoal ? "outline" : "default"} 
                    className="w-full"
                    onClick={() => handleStakeMeetup(meetup)}
                    disabled={meetup.status === "completed"}
                  >
                    {meetup.currentStaked >= meetup.stakingGoal ? "View Meetup Details" : "View Staking Details"}
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Stake Vibe Points for {meetup.title}</DialogTitle>
                    <DialogDescription>
                      Stake your vibe points to fund this meetup and secure your participation.
                    </DialogDescription>
                  </DialogHeader>
                  <div className="py-4">
                    <div className="space-y-4 mb-6">
                      <div className="bg-muted/50 p-4 rounded-lg">
                        <h3 className="font-medium mb-2">Meetup Details</h3>
                        <div className="grid grid-cols-2 gap-3 text-sm">
                          <div>
                            <span className="text-muted-foreground">Date:</span>
                            <p>{new Date(selectedMeetup?.date || meetup.date).toLocaleDateString()}</p>
                          </div>
                          <div>
                            <span className="text-muted-foreground">Location:</span>
                            <p>{selectedMeetup?.location || meetup.location}</p>
                          </div>
                          <div className="col-span-2">
                            <span className="text-muted-foreground">Description:</span>
                            <p>{selectedMeetup?.description || meetup.description}</p>
                          </div>
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <div className="w-full bg-gray-200 rounded-full h-2.5">
                          <div 
                            className="bg-primary h-2.5 rounded-full" 
                            style={{ width: `${(meetup.currentStaked / meetup.stakingGoal) * 100}%` }}
                          ></div>
                        </div>
                        <div className="flex justify-between text-xs text-muted-foreground">
                          <span>{meetup.currentStaked} VP staked</span>
                          <span>Goal: {meetup.stakingGoal} VP</span>
                        </div>
                      </div>
                    </div>
                  
                    {connected ? (
                      <>
                        <p className="text-sm mb-4">
                          You have <span className="font-semibold">{vibePoints} VP</span> available to stake.
                        </p>
                        <div className="space-y-2">
                          <Label htmlFor="stake-amount">Stake Amount (VP)</Label>
                          <Input 
                            id="stake-amount" 
                            type="number" 
                            min="10" 
                            max={vibePoints} 
                            value={stakeAmount} 
                            onChange={(e) => setStakeAmount(parseInt(e.target.value))}
                          />
                        </div>
                        <p className="text-xs text-gray-500 mt-2">
                          Your stake helps fund venue costs, refreshments, and activities for this meetup.
                        </p>
                      </>
                    ) : (
                      <div className="bg-amber-50 p-4 rounded-lg border border-amber-200 text-amber-800">
                        <p className="text-sm font-medium mb-1">Connect your wallet to participate</p>
                        <p className="text-xs">You need to connect your wallet to stake vibe points and join this meetup.</p>
                      </div>
                    )}
                  </div>
                  <DialogFooter>
                    <DialogClose asChild>
                      <Button variant="outline" disabled={isStaking}>Cancel</Button>
                    </DialogClose>
                    {connected ? (
                      <Button onClick={confirmStake} disabled={isStaking}>
                        {isStaking ? (
                          <>
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            Processing...
                          </>
                        ) : (
                          `Stake ${stakeAmount} VP`
                        )}
                      </Button>
                    ) : (
                      <Button onClick={() => window.location.href = "/auth"}>
                        Connect Wallet
                      </Button>
                    )}
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
};
