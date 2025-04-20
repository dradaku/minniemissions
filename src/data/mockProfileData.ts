
import { Mission, UserProfile } from '../types/profile';

export const mockAvailableMissions: Mission[] = [
  {
    id: 'mission1',
    title: 'Complete Your Profile',
    description: 'Add your name and profile picture to earn rewards',
    reward: 50,
    imageUrl: 'https://images.unsplash.com/photo-1579762715118-a6f1d4b934f1'
  },
  {
    id: 'mission2',
    title: 'Share & Earn',
    description: 'Share your referral link with friends',
    reward: 25,
    imageUrl: 'https://images.unsplash.com/photo-1611605698335-8b1569810432'
  }
];

export const mockCompletedMissions: Mission[] = [
  {
    id: 'completed1',
    title: 'Welcome Mission',
    description: 'Connected wallet successfully',
    reward: 10,
    isCompleted: true
  }
];

export const mockUserProfile: UserProfile = {
  name: 'Demo User',
  referralCount: 0,
  joinedAt: new Date()
};
