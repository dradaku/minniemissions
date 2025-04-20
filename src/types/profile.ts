
import { MissionCategory, MissionStatus } from '../data/mockData';

export interface Mission {
  id: string;
  title: string;
  description: string;
  reward: number;
  imageUrl: string;
  isCompleted?: boolean;
  category: MissionCategory;
  completedBy: string[]; // Required to match mockData.ts definition
  status: MissionStatus;
  createdAt: Date;
  expiresAt: Date | null; // Changed from optional to nullable to match mockData.ts
}

export interface UserProfile {
  name: string;
  referralCount: number;
  joinedAt: Date;
}
