import { create } from 'zustand';
import { Profile } from '@/types/profile';

interface Store {
  profiles: Profile[];
  matches: Profile[];
  currentIndex: number;
  addMatch: (profile: Profile) => void;
  setProfiles: (profiles: Profile[]) => void;
  nextProfile: () => void;
}

export const useStore = create<Store>((set) => ({
  profiles: [],
  matches: [],
  currentIndex: 0,
  addMatch: (profile) =>
    set((state) => ({
      matches: [...state.matches, profile],
    })),
  setProfiles: (profiles) =>
    set({
      profiles,
      currentIndex: 0,
    }),
  nextProfile: () =>
    set((state) => ({
      currentIndex: Math.min(state.currentIndex + 1, state.profiles.length - 1),
    })),
}));