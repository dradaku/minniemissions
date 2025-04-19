
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
