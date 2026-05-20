"use client"

import { useState } from 'react'
import { useSubscription } from '@/lib/subscription-context'
import { useNavigation } from '@/lib/navigation-context'
import { aiSystemDetails, aiSystems } from '@/lib/sample-data'
import { X, Edit2, ExternalLink, Lock } from 'lucide-react'
import { cn } from '@/lib/utils'

type DetailTab = 'overview' | 'risk' | 'assessments' | 'policies' | 'audit-log' | 'settings'

const allTabs: { id: DetailTab; label: string }[] = [
  { id: 'overview', label: 'Overview' },
  { id: 'risk', label: 'Risk' },
  { id: 'assessments', label: 'Assessments' },
  { id: 'policies', label: 'Policies' },
  { id: 'audit-log', label: 'Audit Log' },
  { id: 'settings', label: 'Settings' },
]

const restrictedTabs: DetailTab[] = ['risk', 'audit-log']

export function RecordDetailPanel() {
  const { collaboratorView } = useSubscription()
  const { selectedRecordId, setSelectedRecordId } = useNavigation()
  const [activeTab, setActiveTab] = useState<DetailTab>('overview')

  if (!selectedRecordId) return null

  // Find matching AI system
  const system = aiSystems.find(s => s.name === selectedRecordId)
  const details = system ? aiSystemDetails[system.id] : null

  const visibleTabs = collaboratorView 
    ? allTabs.filter(tab => !restrictedTabs.includes(tab.id))
    : allTabs

  // OneTrust Secondary Palette - Mint used sparingly
  const riskColors = {
    'Low': 'bg-[#00B935]/10 text-[#00B935] border-[#00B935]/30', // Leaf
    'Medium': 'bg-[#FFEF3C]/10 text-[#FFEF3C] border-[#FFEF3C]/30', // Yellow
    'High': 'bg-[#ef4444]/10 text-[#ef4444] border-[#ef4444]/30' // Destructive
  }

  const stageColors = {
    'In Use': 'bg-[#00B935]/10 text-[#00B935]', // Leaf
    'New': 'bg-[#0788F7]/10 text-[#0788F7]', // Sky
    'In Review': 'bg-[#FFEF3C]/10 text-[#FFEF3C]', // Yellow
    'Active': 'bg-[#00B935]/10 text-[#00B935]' // Leaf
  }

  // Reset to overview if current tab is restricted
  if (collaboratorView && restrictedTabs.includes(activeTab)) {
    setActiveTab('overview')
  }

  return (
    <div className="fixed inset-y-0 right-0 w-[600px] bg-[#13151f] border-l border-[#1e2130] shadow-2xl z-40 flex flex-col">
      {/* Header */}
      <div className="p-4 border-b border-[#1e2130] flex items-start justify-between">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <h2 className="text-lg font-medium tracking-[-0.01em] text-white">{selectedRecordId}</h2>
            {system && (
              <span className={cn("text-xs px-2 py-0.5 rounded", stageColors[system.stage])}>
                {system.stage}
              </span>
            )}
          </div>
          {system && (
            <p className="text-sm text-[#9ca3af]">{system.id} | {system.framework}</p>
          )}
        </div>
        <div className="flex items-center gap-2">
          {!collaboratorView && (
            <button className="p-2 text-[#9ca3af] hover:text-white hover:bg-[#1e2130] rounded-md transition-colors">
              <Edit2 className="w-4 h-4" />
            </button>
          )}
          <button 
            onClick={() => setSelectedRecordId(null)}
            className="p-2 text-[#9ca3af] hover:text-white hover:bg-[#1e2130] rounded-md transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="border-b border-[#1e2130] px-4">
        <div className="flex gap-1">
          {visibleTabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={cn(
                "px-3 py-2.5 text-sm font-medium transition-colors relative",
                activeTab === tab.id
                  ? "text-[#6CEEAD]"
                  : "text-[#9ca3af] hover:text-white"
              )}
            >
              {tab.label}
              {activeTab === tab.id && (
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#6CEEAD]" />
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Restricted tabs message - use Yellow per OneTrust brand */}
      {collaboratorView && (
        <div className="mx-4 mt-4 p-3 rounded-md bg-[#1e2130] border border-[#2a2d3a] flex items-center gap-2">
          <Lock className="w-4 h-4 text-[#FFEF3C]" />
          <p className="text-xs text-[#9ca3af]">
            Some tabs are hidden due to access restrictions (Risk, Audit Log)
          </p>
        </div>
      )}

      {/* Tab Content */}
      <div className="flex-1 overflow-auto p-4">
        {activeTab === 'overview' && (
          <div className="space-y-6">
            {/* Risk Score Card */}
            {system && (
              <div className={cn(
                "p-4 rounded-lg border",
                riskColors[system.riskScore]
              )}>
                <p className="text-xs uppercase tracking-wider opacity-70 mb-1">Risk Score</p>
                <p className="text-2xl font-semibold">{system.riskScore}</p>
              </div>
            )}

            {/* Metadata */}
            <div>
              <h3 className="text-sm font-medium text-white mb-3">Details</h3>
              <div className="grid grid-cols-2 gap-4">
                {collaboratorView ? (
                  <>
                    <div>
                      <p className="text-xs text-[#4b5563] mb-1">Name</p>
                      <p className="text-sm text-white">{selectedRecordId}</p>
                    </div>
                    <div>
                      <p className="text-xs text-[#4b5563] mb-1">Framework</p>
                      <p className="text-sm text-white">{system?.framework || '-'}</p>
                    </div>
                    <div>
                      <p className="text-xs text-[#4b5563] mb-1">Owner</p>
                      <p className="text-sm text-white">{system?.owner || '-'}</p>
                    </div>
                    <div>
                      <p className="text-xs text-[#4b5563] mb-1">Status</p>
                      <p className="text-sm text-white">{system?.stage || '-'}</p>
                    </div>
                  </>
                ) : (
                  <>
                    <div>
                      <p className="text-xs text-[#4b5563] mb-1">Name</p>
                      <p className="text-sm text-white">{selectedRecordId}</p>
                    </div>
                    <div>
                      <p className="text-xs text-[#4b5563] mb-1">Framework</p>
                      <p className="text-sm text-white">{system?.framework || '-'}</p>
                    </div>
                    <div>
                      <p className="text-xs text-[#4b5563] mb-1">Owner</p>
                      <p className="text-sm text-white">{system?.owner || '-'}</p>
                    </div>
                    <div>
                      <p className="text-xs text-[#4b5563] mb-1">Stage</p>
                      <p className="text-sm text-white">{system?.stage || '-'}</p>
                    </div>
                    {details && (
                      <>
                        <div>
                          <p className="text-xs text-[#4b5563] mb-1">Department</p>
                          <p className="text-sm text-white">{details.department}</p>
                        </div>
                        <div>
                          <p className="text-xs text-[#4b5563] mb-1">Business Unit</p>
                          <p className="text-sm text-white">{details.businessUnit}</p>
                        </div>
                        <div>
                          <p className="text-xs text-[#4b5563] mb-1">Deployment Date</p>
                          <p className="text-sm text-white">{details.deploymentDate}</p>
                        </div>
                        <div>
                          <p className="text-xs text-[#4b5563] mb-1">Last Review</p>
                          <p className="text-sm text-white">{details.lastReview}</p>
                        </div>
                      </>
                    )}
                  </>
                )}
              </div>
            </div>

            {/* Description */}
            {details && !collaboratorView && (
              <div>
                <h3 className="text-sm font-medium text-white mb-2">Description</h3>
                <p className="text-sm text-[#9ca3af]">{details.description}</p>
              </div>
            )}

            {/* Data Types */}
            {details && !collaboratorView && (
              <div>
                <h3 className="text-sm font-medium text-white mb-2">Data Types</h3>
                <div className="flex flex-wrap gap-2">
                  {details.dataTypes.map((type) => (
                    <span key={type} className="text-xs px-2 py-1 rounded bg-[#1e2130] text-[#9ca3af]">
                      {type}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Related Items */}
            {details && !collaboratorView && (
              <div>
                <h3 className="text-sm font-medium text-white mb-3">Related Items</h3>
                <div className="space-y-3">
                  {details.relatedVendors.length > 0 && (
                    <div>
                      <p className="text-xs text-[#4b5563] mb-2">Vendors</p>
                      <div className="space-y-1">
                        {details.relatedVendors.map((vendor) => (
                          <button 
                            key={vendor}
                            className="w-full flex items-center justify-between p-2 rounded bg-[#1e2130] hover:bg-[#2a2d3a] transition-colors"
                          >
                            <span className="text-sm text-white">{vendor}</span>
                            <ExternalLink className="w-3 h-3 text-[#4b5563]" />
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                  {details.relatedModels.length > 0 && (
                    <div>
                      <p className="text-xs text-[#4b5563] mb-2">Models</p>
                      <div className="space-y-1">
                        {details.relatedModels.map((model) => (
                          <button 
                            key={model}
                            className="w-full flex items-center justify-between p-2 rounded bg-[#1e2130] hover:bg-[#2a2d3a] transition-colors"
                          >
                            <span className="text-sm text-white">{model}</span>
                            <ExternalLink className="w-3 h-3 text-[#4b5563]" />
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                  {details.relatedAgents.length > 0 && (
                    <div>
                      <p className="text-xs text-[#4b5563] mb-2">AI Agents</p>
                      <div className="space-y-1">
                        {details.relatedAgents.map((agent) => (
                          <button 
                            key={agent}
                            className="w-full flex items-center justify-between p-2 rounded bg-[#1e2130] hover:bg-[#2a2d3a] transition-colors"
                          >
                            <span className="text-sm text-white">{agent}</span>
                            <ExternalLink className="w-3 h-3 text-[#4b5563]" />
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        )}

        {activeTab === 'risk' && !collaboratorView && (
          <div className="space-y-4">
            <h3 className="text-sm font-medium text-white">Risk Assessment</h3>
            <div className="p-4 bg-[#1e2130] rounded-lg">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-xs text-[#4b5563] mb-1">Inherent Risk</p>
                  <p className="text-lg font-semibold text-[#ef4444]">High</p>
                </div>
                <div>
                  <p className="text-xs text-[#4b5563] mb-1">Residual Risk</p>
                  <p className="text-lg font-semibold text-[#FFEF3C]">Medium</p>
                </div>
                <div>
                  <p className="text-xs text-[#4b5563] mb-1">Control Effectiveness</p>
                  <p className="text-lg font-semibold text-[#00B935]">72%</p>
                </div>
                <div>
                  <p className="text-xs text-[#4b5563] mb-1">Last Assessment</p>
                  <p className="text-sm text-white">Mar 28, 2026</p>
                </div>
              </div>
            </div>
            <div>
              <h4 className="text-sm font-medium text-white mb-2">Risk Factors</h4>
              <ul className="space-y-2">
                {['Data privacy exposure', 'Model bias potential', 'Regulatory compliance gaps'].map((factor) => (
                  <li key={factor} className="flex items-center gap-2 text-sm text-[#9ca3af]">
                    <div className="w-1.5 h-1.5 rounded-full bg-[#ef4444]" />
                    {factor}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}

        {activeTab === 'assessments' && (
          <div className="space-y-4">
            <h3 className="text-sm font-medium text-white">Linked Assessments</h3>
            <div className="space-y-2">
              {['ISO 42001 Gap Analysis', 'Data Privacy Impact Assessment', 'Bias Testing Report'].map((assessment, i) => (
                <div key={assessment} className="p-3 bg-[#1e2130] rounded-lg flex items-center justify-between">
                  <div>
                    <p className="text-sm text-white">{assessment}</p>
                    <p className="text-xs text-[#4b5563]">Completed Apr {10 + i}, 2026</p>
                  </div>
                  <span className="text-xs px-2 py-1 rounded bg-[#00B935]/10 text-[#00B935]">
                    Completed
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'policies' && (
          <div className="space-y-4">
            <h3 className="text-sm font-medium text-white">Applied Policies</h3>
            <div className="space-y-2">
              {['AI Ethics Policy', 'Data Handling Guidelines', 'Model Deployment Standards'].map((policy) => (
                <div key={policy} className="p-3 bg-[#1e2130] rounded-lg flex items-center justify-between">
                  <p className="text-sm text-white">{policy}</p>
                  <ExternalLink className="w-4 h-4 text-[#4b5563]" />
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'audit-log' && !collaboratorView && (
          <div className="space-y-4">
            <h3 className="text-sm font-medium text-white">Activity Log</h3>
            <div className="space-y-3">
              {[
                { action: 'Risk score updated', user: 'Sarah Chen', time: '2 hours ago' },
                { action: 'Assessment linked', user: 'Mark Rivera', time: '1 day ago' },
                { action: 'Stage changed to In Use', user: 'Sarah Chen', time: '3 days ago' },
                { action: 'Record created', user: 'Priya Nair', time: '2 weeks ago' },
              ].map((log, i) => (
                <div key={i} className="flex items-start gap-3">
                  <div className="w-2 h-2 mt-1.5 rounded-full bg-[#4b5563]" />
                  <div>
                    <p className="text-sm text-white">{log.action}</p>
                    <p className="text-xs text-[#4b5563]">{log.user} - {log.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'settings' && (
          <div className="space-y-4">
            <h3 className="text-sm font-medium text-white">Record Settings</h3>
            <p className="text-sm text-[#9ca3af]">Configure notifications, access controls, and automation rules for this record.</p>
            {collaboratorView && (
              <div className="p-3 rounded-md bg-[#FFEF3C]/10 border border-[#FFEF3C]/30">
                <p className="text-sm text-[#FFEF3C]">You have read-only access to this record</p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
