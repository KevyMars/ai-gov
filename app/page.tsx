"use client"

import { useState } from 'react'
import { SubscriptionProvider, useSubscription } from '@/lib/subscription-context'
import { NavigationProvider, useNavigation } from '@/lib/navigation-context'
import { Sidebar } from '@/components/sidebar'
import { TopBar } from '@/components/top-bar'
import { SubscriptionModal } from '@/components/subscription-modal'
import { HomeDashboard } from '@/components/home-dashboard'
import { AIGovernanceModule } from '@/components/ai-governance-module'
import { PrivacyManagementModule } from '@/components/privacy-management-module'
import { AssessmentsModule } from '@/components/assessments-module'
import { RecordDetailPanel } from '@/components/record-detail-panel'
import { VendorsPage } from '@/components/vendors-page'
import { GenericPage } from '@/components/generic-page'
import { Eye } from 'lucide-react'

function AppContent() {
  const [showSubscriptionModal, setShowSubscriptionModal] = useState(false)
  const { collaboratorView } = useSubscription()
  const { currentView, selectedRecordId } = useNavigation()

  const renderContent = () => {
    switch (currentView) {
      case 'home':
        return <HomeDashboard />
      case 'dashboard':
      case 'tasks':
      case 'notifications':
      case 'setup':
        return <GenericPage />
      case 'ai-governance':
        return <AIGovernanceModule />
      case 'privacy':
        return <PrivacyManagementModule />
      case 'assessments':
        return <AssessmentsModule />
      case 'vendors':
        return <VendorsPage />
      default:
        return <GenericPage />
    }
  }

  return (
    <div className="flex h-screen bg-[#0f1117]">
      <Sidebar onSubscriptionClick={() => setShowSubscriptionModal(true)} />
      
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Collaborator View Banner */}
        {collaboratorView && (
          <div className="bg-[#FFEF3C]/10 border-b border-[#FFEF3C]/30 px-4 py-2 flex items-center gap-2">
            <Eye className="w-4 h-4 text-[#FFEF3C]" />
            <p className="text-sm text-[#FFEF3C]">
              Collaborator View - ABAC restricted. Some tabs and fields are hidden.
            </p>
          </div>
        )}
        
        <TopBar onSubscriptionClick={() => setShowSubscriptionModal(true)} />
        
        <main className="flex-1 overflow-auto">
          {renderContent()}
        </main>
      </div>

      {/* Detail Panel */}
      {selectedRecordId && <RecordDetailPanel />}

      {/* Subscription Modal */}
      <SubscriptionModal 
        isOpen={showSubscriptionModal} 
        onClose={() => setShowSubscriptionModal(false)} 
      />
    </div>
  )
}

export default function OneTrustApp() {
  return (
    <SubscriptionProvider>
      <NavigationProvider>
        <AppContent />
      </NavigationProvider>
    </SubscriptionProvider>
  )
}
