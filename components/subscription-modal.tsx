"use client"

import { useSubscription, SubscriptionTier, tierLabels, tierDescriptions } from '@/lib/subscription-context'
import { X, Check } from 'lucide-react'
import { cn } from '@/lib/utils'
import { OneTrustMark } from './onetrust-logo'

interface SubscriptionModalProps {
  isOpen: boolean
  onClose: () => void
}

const tierFeatures: Record<SubscriptionTier, string[]> = {
  lite: [
    'Unlimited users',
    'Vendors inventory',
    'Assessments inventory',
    'Risks inventory',
    'Assets inventory',
    'Policies inventory'
  ],
  plus: [
    'Everything in Lite',
    'AI Governance module',
    'AI Systems tracking',
    'Model inventory',
    'AI Agents management'
  ],
  premium: [
    'Everything in Plus',
    'Privacy module',
    'TPRM module',
    'GRC module',
    'Data Discovery module',
    'Advanced analytics'
  ]
}

export function SubscriptionModal({ isOpen, onClose }: SubscriptionModalProps) {
  const { tier, setTier, collaboratorView, setCollaboratorView } = useSubscription()

  if (!isOpen) return null

  const tiers: SubscriptionTier[] = ['lite', 'plus', 'premium']

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/70 backdrop-blur-sm"
        onClick={onClose}
      />
      
      {/* Modal */}
      <div className="relative bg-[#13151f] border border-[#1e2130] rounded-xl w-full max-w-3xl mx-4 max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-[#1e2130]">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-[#6CEEAD] flex items-center justify-center">
              <OneTrustMark className="h-5" color="black" />
            </div>
            <div>
              <h2 className="text-xl font-medium tracking-[-0.03em] text-white">Subscription Tiers</h2>
              <p className="text-sm text-[#9ca3af]">Switch tiers to see navigation changes in real-time</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-[#9ca3af] hover:text-white hover:bg-[#1e2130] rounded-md transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tiers Grid */}
        <div className="p-6 grid grid-cols-3 gap-4">
          {tiers.map((t) => (
            <button
              key={t}
              onClick={() => setTier(t)}
              className={cn(
                "p-4 rounded-lg border text-left transition-all",
                tier === t
                  ? "border-[#6CEEAD] bg-[#6CEEAD]/10"
                  : "border-[#1e2130] hover:border-[#2a2d3a] bg-[#0f1117]"
              )}
            >
              <div className="flex items-center justify-between mb-3">
                <span className={cn(
                  "text-lg font-semibold",
                  tier === t ? "text-[#6CEEAD]" : "text-white"
                )}>
                  {tierLabels[t]}
                </span>
                {tier === t && (
                  <div className="w-6 h-6 rounded-full bg-[#6CEEAD] flex items-center justify-center">
                    <Check className="w-4 h-4 text-[#0f1117]" />
                  </div>
                )}
              </div>
              <p className="text-xs text-[#9ca3af] mb-4">{tierDescriptions[t]}</p>
              <ul className="space-y-2">
                {tierFeatures[t].map((feature, i) => (
                  <li key={i} className="flex items-center gap-2 text-sm text-[#e5e7eb]">
                    <Check className="w-4 h-4 text-[#6CEEAD] flex-shrink-0" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </button>
          ))}
        </div>

        {/* ABAC Demo Toggle */}
        <div className="px-6 pb-6">
          <div className="p-4 rounded-lg bg-[#1e2130] border border-[#2a2d3a]">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-sm font-medium text-white">Enable Collaborator View</h3>
                <p className="text-xs text-[#9ca3af] mt-1">
                  Demo ABAC restrictions - limits visible tabs and fields
                </p>
              </div>
              <button
                onClick={() => setCollaboratorView(!collaboratorView)}
                className={cn(
                  "relative w-11 h-6 rounded-full transition-colors",
                  collaboratorView ? "bg-[#6CEEAD]" : "bg-[#2a2d3a]"
                )}
              >
                <span
                  className={cn(
                    "absolute top-0.5 left-0.5 w-5 h-5 rounded-full bg-white transition-transform",
                    collaboratorView && "translate-x-5"
                  )}
                />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
