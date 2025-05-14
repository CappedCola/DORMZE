import {
  SmokingOption,
  SleepScheduleOption,
  PersonalityOption,
  CleanlinessOption
} from '@/constants/profileOptions';

export interface Profile {
  id: string;
  name: string;
  age: number;
  photos: Array<{ url: string; id: string }>;
  
  // Education
  university: string;
  major: string;
  year: string;
  
  // Basic Info
  bio: string;
  interests: string[];
  
  // Detailed Bio
  detailedBio: {
    aboutMe: string;
    lookingFor: string;
    roommatePreferences: string;
  };
  
  // Lifestyle
  lifestyle: {
    cleanliness: CleanlinessOption;
    sleepSchedule: SleepScheduleOption;
    personality: PersonalityOption;
    smoking: SmokingOption;
    pets: boolean;
  };
  
  // Move-in Details
  moveInDate: string;
  budget: {
    preferredRange: string;
  };
  location: {
    preferred: string;
    maxDistance: number;
  };
}