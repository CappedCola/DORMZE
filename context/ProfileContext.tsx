import React, { createContext, useContext, useState } from 'react';
import { Profile } from '@/types/profile';
import { mockProfiles } from '@/data/mockProfiles';

type ProfileContextType = {
  profile: Profile;
  updateProfile: (updatedProfile: Profile) => void;
};

const ProfileContext = createContext<ProfileContextType | undefined>(undefined);

export function ProfileProvider({ children }: { children: React.ReactNode }) {
  const [profile, setProfile] = useState<Profile>(mockProfiles[1]);

  const updateProfile = (updatedProfile: Profile) => {
    setProfile(updatedProfile);
  };

  return (
    <ProfileContext.Provider value={{ profile, updateProfile }}>
      {children}
    </ProfileContext.Provider>
  );
}

export function useProfile() {
  const context = useContext(ProfileContext);
  if (context === undefined) {
    throw new Error('useProfile must be used within a ProfileProvider');
  }
  return context;
}

export { ProfileContext };

export default function EmptyComponent() {
  return null; // This is just to satisfy Expo Router's requirement for a default export
}
