"use client"

import { createContext, useContext, useState, ReactNode } from 'react'

export type NavigationView = 
  | 'home' 
  | 'dashboard'
  | 'tasks'
  | 'notifications'
  | 'vendors' 
  | 'assessments' 
  | 'risks' 
  | 'assets' 
  | 'policies'
  | 'ai-governance'
  | 'privacy'
  | 'tprm'
  | 'grc'
  | 'data-discovery'
  | 'setup'
  | 'settings'
  | 'help'

export type AIGovTab = 'inventory' | 'objects' | 'ai-policies'
export type AIGovInventoryItem = 'projects' | 'ai-systems' | 'models' | 'ai-agents' | 'datasets' | 'vendors'

export type PrivacyTab = 'overview' | 'records' | 'objects' | 'policies'
export type PrivacyRecordItem = 'pia-dpia' | 'incidents' | 'privacy-rights' | 'data-mapping' | 'privacy-notices' | 'benchmarking' | 'maturity-planning'

export interface NavigationContextType {
  currentView: NavigationView
  setCurrentView: (view: NavigationView) => void
  aiGovTab: AIGovTab
  setAIGovTab: (tab: AIGovTab) => void
  aiGovInventoryItem: AIGovInventoryItem
  setAIGovInventoryItem: (item: AIGovInventoryItem) => void
  privacyTab: PrivacyTab
  setPrivacyTab: (tab: PrivacyTab) => void
  privacyRecordItem: PrivacyRecordItem
  setPrivacyRecordItem: (item: PrivacyRecordItem) => void
  selectedRecordId: string | null
  setSelectedRecordId: (id: string | null) => void
  sidebarCollapsed: boolean
  setSidebarCollapsed: (collapsed: boolean) => void
}

const NavigationContext = createContext<NavigationContextType | undefined>(undefined)

export function NavigationProvider({ children }: { children: ReactNode }) {
  const [currentView, setCurrentView] = useState<NavigationView>('home')
  const [aiGovTab, setAIGovTab] = useState<AIGovTab>('inventory')
  const [aiGovInventoryItem, setAIGovInventoryItem] = useState<AIGovInventoryItem>('ai-systems')
  const [privacyTab, setPrivacyTab] = useState<PrivacyTab>('overview')
  const [privacyRecordItem, setPrivacyRecordItem] = useState<PrivacyRecordItem>('pia-dpia')
  const [selectedRecordId, setSelectedRecordId] = useState<string | null>(null)
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)

  return (
    <NavigationContext.Provider value={{
      currentView,
      setCurrentView,
      aiGovTab,
      setAIGovTab,
      aiGovInventoryItem,
      setAIGovInventoryItem,
      privacyTab,
      setPrivacyTab,
      privacyRecordItem,
      setPrivacyRecordItem,
      selectedRecordId,
      setSelectedRecordId,
      sidebarCollapsed,
      setSidebarCollapsed
    }}>
      {children}
    </NavigationContext.Provider>
  )
}

export function useNavigation() {
  const context = useContext(NavigationContext)
  if (!context) {
    throw new Error('useNavigation must be used within a NavigationProvider')
  }
  return context
}
