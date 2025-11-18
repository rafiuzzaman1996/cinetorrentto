'use client'

import { type ReactNode, createContext, useRef, useContext } from 'react'
import { useStore } from 'zustand'

import { type AdsState, createAdsStore } from '@/stores/ads-store'

export type AdsStoreApi = ReturnType<typeof createAdsStore>

export const AdsStoreContext = createContext<AdsStoreApi | undefined>(
  undefined,
)

export interface AdsStoreProviderProps {
  children: ReactNode,
  initialAds: AdsState['ads']
}

export const AdsStoreProvider = ({
  children,
  initialAds
}: AdsStoreProviderProps) => {
  const storeRef = useRef<AdsStoreApi>(null) // Changed from undefined to null for strict null checks if needed
  if (!storeRef.current) {
    storeRef.current = createAdsStore({ads: initialAds})
  }

  return (
    <AdsStoreContext.Provider value={storeRef.current}>
      {children}
    </AdsStoreContext.Provider>
  )
}

// Custom hook to consume the store
export const useAdsStore = <T,>(
  selector: (store: AdsState) => T,
): T => {
  const adsStoreContext = useContext(AdsStoreContext)

  if (!adsStoreContext) {
    throw new Error(`useCounterStore must be used within CounterStoreProvider`)
  }

  return useStore(adsStoreContext, selector)
}