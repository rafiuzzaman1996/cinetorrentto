import { Ads } from '@/types/website/Ads'
import { createStore } from 'zustand/vanilla'

// 1. Define State Shape
export type AdsState = {
  ads: Ads[]
}

// 2. Define Initial State (useful for resetting)
const defaultInitState: AdsState = {
  ads: []
}

// 3. Create Store Creator
// This function returns a *new* store instance each time it's called
export const createAdsStore = (initState: Partial<AdsState> = {}) => {
  return createStore<AdsState>()((set) => ({
    ...defaultInitState,
    ...initState,
    // Define actions to modify the state
    updateAds: (newAds: Ads[]) => set(() => ({ ads: newAds })),
  }))
}