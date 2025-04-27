// Types
export interface Mission {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  reward: number;
  category: MissionCategory;
  completedBy: string[];
  status: MissionStatus;
  createdAt: Date;
  expiresAt: Date | null;
}

export interface User {
  id: string;
  address: string;
  name: string;
  vibePoints: number;
  completedMissions: string[];
  referralCount: number;
  referralCode: string;
  joinedAt: Date;
  isAdmin: boolean;
}

export enum MissionCategory {
  SOCIAL = "social",
  EVENT = "event",
  CONTENT = "content",
  REFERRAL = "referral",
}

export enum MissionStatus {
  ACTIVE = "active",
  EXPIRED = "expired",
  COMPLETED = "completed",
}

// Mock missions data
export const mockMissions: Mission[] = [
  {
    id: "arsenal-1",
    title: "Arsenal Match Day",
    description: "Attend an Arsenal match at the Emirates Stadium and share your experience",
    imageUrl: "https://images.unsplash.com/photo-1522778119026-d647f0596c20",
    reward: 200,
    category: MissionCategory.EVENT,
    completedBy: [],
    status: MissionStatus.ACTIVE,
    createdAt: new Date("2025-03-15"),
    expiresAt: null,
  },
  {
    id: "arsenal-2",
    title: "Gunners Community",
    description: "Join the Arsenal fan community Discord server and introduce yourself",
    imageUrl: "https://images.unsplash.com/photo-1577223625816-6498e653d57b",
    reward: 50,
    category: MissionCategory.SOCIAL,
    completedBy: [],
    status: MissionStatus.ACTIVE,
    createdAt: new Date("2025-03-15"),
    expiresAt: null,
  },
  {
    id: "arsenal-3",
    title: "Arsenal Fan Art",
    description: "Create and share Arsenal-themed fan art on social media",
    imageUrl: "https://images.unsplash.com/photo-1580880783109-6746c2a12852",
    reward: 150,
    category: MissionCategory.CONTENT,
    completedBy: [],
    status: MissionStatus.ACTIVE,
    createdAt: new Date("2025-03-15"),
    expiresAt: null,
  },
  {
    id: "m1",
    title: "Poster Drop",
    description: "Put up 5 MinnieMissions posters in your local community (with permission!)",
    imageUrl: "https://images.unsplash.com/photo-1588497859490-85d1c17db96d",
    reward: 100,
    category: MissionCategory.CONTENT,
    completedBy: [],
    status: MissionStatus.ACTIVE,
    createdAt: new Date("2025-03-15"),
    expiresAt: new Date("2025-05-15"),
  },
  {
    id: "m2",
    title: "Bring a Friend",
    description: "Bring a friend to sign up at a hackathon or event",
    imageUrl: "https://images.unsplash.com/photo-1539635278303-d4002c07eae3",
    reward: 75,
    category: MissionCategory.REFERRAL,
    completedBy: [],
    status: MissionStatus.ACTIVE,
    createdAt: new Date("2025-03-15"),
    expiresAt: null,
  },
  {
    id: "m3",
    title: "Share on X (Twitter)",
    description: "Share an official post and tag us + 3 friends",
    imageUrl: "https://images.unsplash.com/photo-1611605698335-8b1569810432",
    reward: 50,
    category: MissionCategory.SOCIAL,
    completedBy: [],
    status: MissionStatus.ACTIVE,
    createdAt: new Date("2025-03-15"),
    expiresAt: null,
  },
  {
    id: "m4",
    title: "Attend a Hackathon",
    description: "Check-in at a hackathon event (scan QR on site)",
    imageUrl: "https://images.unsplash.com/photo-1501281668745-f7f57925c3b4",
    reward: 150,
    category: MissionCategory.EVENT,
    completedBy: [],
    status: MissionStatus.ACTIVE,
    createdAt: new Date("2025-03-15"),
    expiresAt: null,
  },
  {
    id: "m5",
    title: "Submit a Hackathon Project",
    description: "Successfully submit a project at a hackathon",
    imageUrl: "https://images.unsplash.com/photo-1552664730-d307ca884978",
    reward: 300,
    category: MissionCategory.EVENT,
    completedBy: [],
    status: MissionStatus.ACTIVE,
    createdAt: new Date("2025-03-15"),
    expiresAt: null,
  },
  {
    id: "m6",
    title: "Create a TikTok Video",
    description: "Create a TikTok video promoting MinnieMissions",
    imageUrl: "https://images.unsplash.com/photo-1611162616475-46b635cb6868",
    reward: 100,
    category: MissionCategory.CONTENT,
    completedBy: [],
    status: MissionStatus.ACTIVE,
    createdAt: new Date("2025-03-15"),
    expiresAt: null,
  },
  {
    id: "m7",
    title: "Instagram Story",
    description: "Post an IG Story tagging @MinnieMissionsOfficial",
    imageUrl: "https://images.unsplash.com/photo-1611162616475-46b635cb6868",
    reward: 50,
    category: MissionCategory.SOCIAL,
    completedBy: [],
    status: MissionStatus.ACTIVE,
    createdAt: new Date("2025-03-15"),
    expiresAt: null,
  },
  {
    id: "m8",
    title: "Superfan Essay",
    description: "Write a short essay on why you love supporting indie artists or web3 brands",
    imageUrl: "https://images.unsplash.com/photo-1455390582262-044cdead277a",
    reward: 200,
    category: MissionCategory.CONTENT,
    completedBy: [],
    status: MissionStatus.ACTIVE,
    createdAt: new Date("2025-03-15"),
    expiresAt: null,
  },
  {
    id: "m9",
    title: "Merch Model",
    description: "Take a photo wearing MinnieMissions merch",
    imageUrl: "https://images.unsplash.com/photo-1503342394128-c104d54dba01",
    reward: 75,
    category: MissionCategory.CONTENT,
    completedBy: [],
    status: MissionStatus.ACTIVE,
    createdAt: new Date("2025-03-15"),
    expiresAt: null,
  },
  {
    id: "m10",
    title: "QR Poster Scan",
    description: "Place a poster with a custom QR and get 5+ people to scan it",
    imageUrl: "https://images.unsplash.com/photo-1588497859490-85d1c17db96d",
    reward: 150,
    category: MissionCategory.REFERRAL,
    completedBy: [],
    status: MissionStatus.ACTIVE,
    createdAt: new Date("2025-03-15"),
    expiresAt: null,
  },
  {
    id: "m11",
    title: "Onboard New User",
    description: "Successfully onboard a new person into MinnieMissions (via referral code)",
    imageUrl: "https://images.unsplash.com/photo-1521791136064-7986c2920216",
    reward: 100,
    category: MissionCategory.REFERRAL,
    completedBy: [],
    status: MissionStatus.ACTIVE,
    createdAt: new Date("2025-03-15"),
    expiresAt: null,
  },
  {
    id: "m12",
    title: "Attend a Concert",
    description: "Check in at a DR ADAKU concert or related event",
    imageUrl: "https://images.unsplash.com/photo-1501281668745-f7f57925c3b4",
    reward: 200,
    category: MissionCategory.EVENT,
    completedBy: [],
    status: MissionStatus.ACTIVE,
    createdAt: new Date("2025-03-15"),
    expiresAt: null,
  },
  {
    id: "m13",
    title: "Record a Vibe Check Video",
    description: "Record a 30-second video explaining why you love MinnieMissions",
    imageUrl: "https://images.unsplash.com/photo-1494253109108-2e30c049369b",
    reward: 100,
    category: MissionCategory.CONTENT,
    completedBy: [],
    status: MissionStatus.ACTIVE,
    createdAt: new Date("2025-03-15"),
    expiresAt: null,
  },
  {
    id: "m14",
    title: "NFT Mint",
    description: "Mint your first MinnieMissions badge or NFT",
    imageUrl: "https://images.unsplash.com/photo-1639762681485-074b7f938ba0",
    reward: 250,
    category: MissionCategory.EVENT,
    completedBy: [],
    status: MissionStatus.ACTIVE,
    createdAt: new Date("2025-03-15"),
    expiresAt: null,
  },
  {
    id: "m15",
    title: "Daily Login Streak",
    description: "Check-in daily for 7 days via the dashboard",
    imageUrl: "https://images.unsplash.com/photo-1584208124888-3a20b9c799e5",
    reward: 70,
    category: MissionCategory.SOCIAL,
    completedBy: [],
    status: MissionStatus.ACTIVE,
    createdAt: new Date("2025-03-15"),
    expiresAt: null,
  },
  {
    id: "m16",
    title: "Volunteer Street Team Lead",
    description: "Help organize a local poster or flyer campaign",
    imageUrl: "https://images.unsplash.com/photo-1582213782179-e0d53f98f2ca",
    reward: 300,
    category: MissionCategory.REFERRAL,
    completedBy: [],
    status: MissionStatus.ACTIVE,
    createdAt: new Date("2025-03-15"),
    expiresAt: null,
  },
  {
    id: "m17",
    title: "Create Fan Art",
    description: "Submit custom MinnieMissions-inspired artwork",
    imageUrl: "https://images.unsplash.com/photo-1513364776144-60967b0f800f",
    reward: 150,
    category: MissionCategory.CONTENT,
    completedBy: [],
    status: MissionStatus.ACTIVE,
    createdAt: new Date("2025-03-15"),
    expiresAt: null,
  },
  {
    id: "m18",
    title: "Ambassador Program",
    description: "Apply to be a squad ambassador",
    imageUrl: "https://images.unsplash.com/photo-1519389950473-47ba0277781c",
    reward: 500,
    category: MissionCategory.REFERRAL,
    completedBy: [],
    status: MissionStatus.ACTIVE,
    createdAt: new Date("2025-03-15"),
    expiresAt: null,
  },
  {
    id: "m19",
    title: "Learn about Polkadot",
    description: "Complete a quiz or mission about Polkadot technology",
    imageUrl: "https://images.unsplash.com/photo-1633356122102-3fe601e05bd2",
    reward: 100,
    category: MissionCategory.CONTENT,
    completedBy: [],
    status: MissionStatus.ACTIVE,
    createdAt: new Date("2025-03-15"),
    expiresAt: null,
  },
  {
    id: "m20",
    title: "Squad Challenge",
    description: "Team up with your MinnieSquad to hit a group QR scan goal",
    imageUrl: "https://images.unsplash.com/photo-1582213782179-e0d53f98f2ca",
    reward: 250,
    category: MissionCategory.REFERRAL,
    completedBy: [],
    status: MissionStatus.ACTIVE,
    createdAt: new Date("2025-03-15"),
    expiresAt: null,
  },
  {
    id: "m1",
    title: "Share on Twitter",
    description: "Share our latest post on Twitter and tag us",
    imageUrl: "https://images.unsplash.com/photo-1611605698335-8b1569810432?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80",
    reward: 50,
    category: MissionCategory.SOCIAL,
    completedBy: ["u1", "u3"],
    status: MissionStatus.ACTIVE,
    createdAt: new Date("2025-03-15"),
    expiresAt: new Date("2025-05-15"),
  },
  {
    id: "m2",
    title: "Attend Virtual Concert",
    description: "Join our virtual concert and check in with your wallet",
    imageUrl: "https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80",
    reward: 100,
    category: MissionCategory.EVENT,
    completedBy: ["u2"],
    status: MissionStatus.ACTIVE,
    createdAt: new Date("2025-03-20"),
    expiresAt: new Date("2025-04-01"),
  },
  {
    id: "m3",
    title: "Create Fan Art",
    description: "Create and share fan art on Instagram with our hashtag",
    imageUrl: "https://images.unsplash.com/photo-1579762715118-a6f1d4b934f1?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80",
    reward: 75,
    category: MissionCategory.CONTENT,
    completedBy: ["u1"],
    status: MissionStatus.ACTIVE,
    createdAt: new Date("2025-03-10"),
    expiresAt: null,
  },
  {
    id: "m4",
    title: "Distribute Posters",
    description: "Print posters and distribute them in your neighborhood",
    imageUrl: "https://images.unsplash.com/photo-1588497859490-85d1c17db96d?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80",
    reward: 150,
    category: MissionCategory.REFERRAL,
    completedBy: [],
    status: MissionStatus.ACTIVE,
    createdAt: new Date("2025-03-18"),
    expiresAt: new Date("2025-06-18"),
  },
  {
    id: "m5",
    title: "Join Discord Community",
    description: "Join our Discord server and introduce yourself",
    imageUrl: "https://images.unsplash.com/photo-1614680376408-81e91ffe3db7?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80",
    reward: 25,
    category: MissionCategory.SOCIAL,
    completedBy: ["u1", "u2", "u3"],
    status: MissionStatus.ACTIVE,
    createdAt: new Date("2025-02-01"),
    expiresAt: null,
  },
];

// Mock users data
export const mockUsers: User[] = [
  {
    id: "u1",
    address: "5GrwvaEF5zXb26Fz9rcQpDWS57CtERHpNehXCPcNoHGKutQY",
    name: "Alice",
    vibePoints: 250,
    completedMissions: ["m1", "m3", "m5"],
    referralCount: 5,
    referralCode: "ALICE2025",
    joinedAt: new Date("2025-01-15"),
    isAdmin: false,
  },
  {
    id: "u2",
    address: "5FHneW46xGXgs5mUiveU4sbTyGBzmstUspZC92UhjJM694ty",
    name: "Bob",
    vibePoints: 125,
    completedMissions: ["m2", "m5"],
    referralCount: 2,
    referralCode: "BOB2025",
    joinedAt: new Date("2025-02-10"),
    isAdmin: false,
  },
  {
    id: "u3",
    address: "5FLSigC9HGRKVhB9FiEo4Y3koPsNmBmLJbpXg2mp1hXcS59Y",
    name: "Charlie",
    vibePoints: 75,
    completedMissions: ["m1", "m5"],
    referralCount: 1,
    referralCode: "CHARLIE2025",
    joinedAt: new Date("2025-03-01"),
    isAdmin: false,
  },
  {
    id: "u4",
    address: "5DAAnrj7VHTznn2AWBemMuyBwZWs6FNFjdyVXUeYum3PTXFy",
    name: "Admin",
    vibePoints: 0,
    completedMissions: [],
    referralCount: 0,
    referralCode: "ADMIN2025",
    joinedAt: new Date("2025-01-01"),
    isAdmin: true,
  },
];

// Function to get all active missions
export const getActiveMissions = () => {
  return mockMissions.filter(mission => mission.status === MissionStatus.ACTIVE);
};

// Function to get a user's missions
export const getUserMissions = (userId: string) => {
  const user = mockUsers.find(u => u.id === userId);
  if (!user) return [];
  
  return mockMissions.filter(mission => 
    user.completedMissions.includes(mission.id) || 
    mission.status === MissionStatus.ACTIVE
  );
};

// Function to get leaderboard
export const getLeaderboard = () => {
  return [...mockUsers]
    .filter(user => !user.isAdmin)
    .sort((a, b) => b.vibePoints - a.vibePoints);
};

// Function to get a user by address
export const getUserByAddress = (address: string) => {
  return mockUsers.find(user => user.address === address);
};

// Function to complete a mission
export const completeMission = (userId: string, missionId: string) => {
  const user = mockUsers.find(u => u.id === userId);
  const mission = mockMissions.find(m => m.id === missionId);
  
  if (!user || !mission) return false;
  if (user.completedMissions.includes(missionId)) return false;
  
  user.completedMissions.push(missionId);
  user.vibePoints += mission.reward;
  mission.completedBy.push(userId);
  
  return true;
};
