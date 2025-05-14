import { create } from 'zustand';
import { Profile } from '@/types/profile';
import { mockProfiles } from '@/data/mockProfiles';

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
  matches: [mockProfiles[0], mockProfiles[1]],
  currentIndex: 0,
  addMatch: (profile) =>
    set((state) => {
      const profileAlreadyMatched = state.matches.some(match => match.id === profile.id);
      
      if (!profileAlreadyMatched) {
        return { matches: [...state.matches, profile] };
      }
      
      return { matches: state.matches };
    }),
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