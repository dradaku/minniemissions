import { Mission, UserProfile } from '../types/profile';
import { MissionCategory, MissionStatus } from './mockData';

export const mockAvailableMissions: Mission[] = [
  {
    id: 'mission1',
    title: 'Complete Your Profile',
    description: 'Add your name and profile picture to earn rewards',
    reward: 50,
    imageUrl: 'https://images.unsplash.com/photo-1579762715118-a6f1d4b934f1',
    category: MissionCategory.CONTENT,
    status: MissionStatus.ACTIVE,
    createdAt: new Date(),
    expiresAt: new Date(new Date().setDate(new Date().getDate() + 30)),
    completedBy: []
  },
  {
    id: 'mission2',
    title: 'Share & Earn',
    description: 'Share your referral link with friends',
    reward: 25,
    imageUrl: 'https://images.unsplash.com/photo-1611605698335-8b1569810432',
    category: MissionCategory.REFERRAL,
    status: MissionStatus.ACTIVE,
    createdAt: new Date(),
    expiresAt: new Date(new Date().setDate(new Date().getDate() + 30)),
    completedBy: []
  }
];

export const mockCompletedMissions: Mission[] = [
  {
    id: 'completed1',
    title: 'Welcome Mission',
    description: 'Connected wallet successfully',
    reward: 10,
    imageUrl: 'https://images.unsplash.com/photo-1614680376408-81e91ffe3db7',
    isCompleted: true,
    category: MissionCategory.SOCIAL,
    status: MissionStatus.COMPLETED,
    createdAt: new Date(),
    completedBy: ['Demo User'],
    expiresAt: null
  }
];

export const mockUserProfile: UserProfile = {
  name: 'Demo User',
  referralCount: 0,
  joinedAt: new Date()
};
