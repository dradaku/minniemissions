
export interface Mission {
  id: string;
  title: string;
  description: string;
  reward: number;
  imageUrl?: string;
  isCompleted?: boolean;
}

export interface UserProfile {
  name: string;
  referralCount: number;
  joinedAt: Date;
}
