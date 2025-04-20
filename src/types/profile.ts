
export interface Mission {
  id: string;
  title: string;
  description: string;
  reward: number;
  imageUrl: string; // Removed optional '?' to match the mockData.ts definition
  isCompleted?: boolean;
  category: string;
  completedBy?: string;
  status: 'available' | 'completed' | 'expired';
  createdAt: Date;
  expiresAt?: Date;
}

export interface UserProfile {
  name: string;
  referralCount: number;
  joinedAt: Date;
}
