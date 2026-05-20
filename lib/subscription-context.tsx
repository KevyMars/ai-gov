"use client"

import { createContext, useContext, useState, ReactNode } from 'react'

export type SubscriptionTier = 'lite' | 'plus' | 'premium'

export interface SubscriptionContextType {
  tier: SubscriptionTier
  setTier: (tier: SubscriptionTier) => void
  collaboratorView: boolean
  setCollaboratorView: (enabled: boolean) => void
}

const SubscriptionContext = createContext<SubscriptionContextType | undefined>(undefined)

export function SubscriptionProvider({ children }: { children: ReactNode }) {
  const [tier, setTier] = useState<SubscriptionTier>('plus')
  const [collaboratorView, setCollaboratorView] = useState(false)

  return (
    <SubscriptionContext.Provider value={{ tier, setTier, collaboratorView, setCollaboratorView }}>
      {children}
    </SubscriptionContext.Provider>
  )
}

export function useSubscription() {
  const context = useContext(SubscriptionContext)
  if (!context) {
    throw new Error('useSubscription must be used within a SubscriptionProvider')
  }
  return context
}

export const tierLabels: Record<SubscriptionTier, string> = {
  lite: 'OT Lite',
  plus: 'OT Plus',
  premium: 'OT Premium'
}

export const tierDescriptions: Record<SubscriptionTier, string> = {
  lite: 'Unlimited users with access to all universal inventory objects',
  plus: 'Everything in Lite plus AI Governance module',
  premium: 'Full access to all modules and features'
}
