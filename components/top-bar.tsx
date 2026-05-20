"use client"

import { useSubscription, tierLabels } from '@/lib/subscription-context'
import { useNavigation, NavigationView } from '@/lib/navigation-context'
import { Search, Bell, ChevronRight } from 'lucide-react'
import { cn } from '@/lib/utils'

const viewLabels: Record<NavigationView, string> = {
  home: 'Home',
  vendors: 'Vendors',
  assessments: 'Assessments',
  risks: 'Risks',
  assets: 'Assets',
  policies: 'Policies',
  'ai-governance': 'AI Governance',
  privacy: 'Privacy',
  tprm: 'TPRM',
  grc: 'GRC',
  'data-discovery': 'Data Discovery',
  settings: 'Settings',
  help: 'Help & Support',
}

interface TopBarProps {
  onSubscriptionClick: () => void
}

export function TopBar({ onSubscriptionClick }: TopBarProps) {
  const { tier } = useSubscription()
  const { currentView, aiGovTab, aiGovInventoryItem, selectedRecordId, setCurrentView, setSelectedRecordId } = useNavigation()

  const breadcrumbs: { label: string; onClick?: () => void }[] = [
    { 
      label: 'Home', 
      onClick: () => {
        setCurrentView('home')
        setSelectedRecordId(null)
      }
    }
  ]

  if (currentView !== 'home') {
    breadcrumbs.push({ 
      label: viewLabels[currentView],
      onClick: () => setSelectedRecordId(null)
    })
  }

  if (currentView === 'ai-governance' && aiGovTab === 'inventory') {
    const inventoryLabels: Record<string, string> = {
      'projects': 'Projects',
      'ai-systems': 'AI Systems',
      'models': 'Models',
      'ai-agents': 'AI Agents',
      'datasets': 'Datasets',
      'vendors': 'Vendors'
    }
    breadcrumbs.push({ 
      label: inventoryLabels[aiGovInventoryItem],
      onClick: () => setSelectedRecordId(null)
    })
  }

  if (selectedRecordId) {
    breadcrumbs.push({ label: selectedRecordId })
  }

  return (
    <header className="h-14 border-b border-[#1e2130] bg-[#0f1117] flex items-center justify-between px-4">
      {/* Breadcrumb */}
      <nav className="flex items-center text-sm">
        {breadcrumbs.map((crumb, index) => (
          <div key={index} className="flex items-center">
            {index > 0 && <ChevronRight className="w-4 h-4 mx-2 text-[#4b5563]" />}
            {crumb.onClick && index < breadcrumbs.length - 1 ? (
              <button
                onClick={crumb.onClick}
                className="text-[#9ca3af] hover:text-white transition-colors"
              >
                {crumb.label}
              </button>
            ) : (
              <span className={cn(
                index === breadcrumbs.length - 1 ? "text-white font-medium" : "text-[#9ca3af]"
              )}>
                {crumb.label}
              </span>
            )}
          </div>
        ))}
      </nav>

      {/* Right Actions */}
      <div className="flex items-center gap-3">
        <button className="p-2 text-[#9ca3af] hover:text-white hover:bg-[#1e2130] rounded-md transition-colors">
          <Search className="w-5 h-5" />
        </button>
        <button className="p-2 text-[#9ca3af] hover:text-white hover:bg-[#1e2130] rounded-md transition-colors relative">
          <Bell className="w-5 h-5" />
          <span className="absolute top-1 right-1 w-2 h-2 bg-[#ef4444] rounded-full" />
        </button>
        <button
          onClick={onSubscriptionClick}
          className="py-1.5 px-3 rounded-md bg-[#6CEEAD]/10 border border-[#6CEEAD]/30 text-[#6CEEAD] text-sm font-medium hover:bg-[#6CEEAD]/20 transition-colors"
        >
          {tierLabels[tier]}
        </button>
        <div className="w-8 h-8 rounded-full bg-[#0788F7] flex items-center justify-center text-white text-sm font-medium cursor-pointer">
          JR
        </div>
      </div>
    </header>
  )
}
