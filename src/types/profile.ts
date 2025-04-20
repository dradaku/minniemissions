
import { MissionCategory, MissionStatus } from '../data/mockData';

export interface Mission {
  id: string;
  title: string;
  description: string;
  reward: number;
  imageUrl: string;
  isCompleted?: boolean;
  category: MissionCategory;
  completedBy?: string[];
  status: MissionStatus;
  createdAt: Date;
  expiresAt?: Date;
}

export interface UserProfile {
  name: string;
  referralCount: number;
  joinedAt: Date;
}
