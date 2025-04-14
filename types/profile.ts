export interface Profile {
  id: string;
  name: string;
  age: number;
  occupation: string;
  bio: string;
  detailedBio: {
    aboutMe: string;
    lookingFor: string;
    roommatePreferences: string;
  };
  university: string;
  major: string;
  year: string;
  interests: string[];
  lifestyle: {
    cleanliness: number;
    sleepSchedule: 'early_bird' | 'night_owl';
    smoking: boolean;
    pets: boolean;
    visitors: 'often' | 'sometimes' | 'rarely';
    drinking: 'often' | 'sometimes' | 'never';
    cooking: 'often' | 'sometimes' | 'never';
    personality: 'introvert' | 'extrovert' | 'ambivert';
  };
  photos: {
    url: string;
    caption?: string;
  }[];
  budget: {
    min: number;
    max: number;
    preferredRange: string;
  };
  moveInDate: string;
  location: {
    preferred: string;
    maxDistance: number;
  };
}