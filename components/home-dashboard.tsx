"use client"

import { useSubscription, tierLabels } from '@/lib/subscription-context'
import { useNavigation, NavigationView } from '@/lib/navigation-context'
import {
  Building2,
  ClipboardCheck,
  AlertTriangle,
  Server,
  FileText,
  Brain,
  ChevronRight,
  Clock,
  AlertCircle
} from 'lucide-react'
import { cn } from '@/lib/utils'

interface Action {
  id: string
  type: 'Assessment' | 'Task' | 'Risk' | 'Evidence'
  title: string
  dueDate: string
  status: 'overdue' | 'due-soon' | 'upcoming'
}

const actions: Action[] = [
  { id: '1', type: 'Assessment', title: 'Q2 Vendor Risk Assessment', dueDate: '2 days overdue', status: 'overdue' },
  { id: '2', type: 'Risk', title: 'High risk AI system review', dueDate: 'Due today', status: 'due-soon' },
  { id: '3', type: 'Task', title: 'Update privacy policy', dueDate: 'Due in 3 days', status: 'upcoming' },
  { id: '4', type: 'Evidence', title: 'SOC 2 compliance evidence', dueDate: '1 day overdue', status: 'overdue' },
  { id: '5', type: 'Assessment', title: 'AI Model validation', dueDate: 'Due in 5 days', status: 'upcoming' },
  { id: '6', type: 'Task', title: 'Review vendor contract', dueDate: 'Due tomorrow', status: 'due-soon' },
]

interface RecentActivity {
  id: string
  action: string
  target: string
  user: string
  time: string
}

const recentActivity: RecentActivity[] = [
  { id: '1', action: 'Updated', target: 'GPT-4 Integration', user: 'Sarah Chen', time: '2 hours ago' },
  { id: '2', action: 'Created', target: 'New Vendor Assessment', user: 'Mark Rivera', time: '4 hours ago' },
  { id: '3', action: 'Approved', target: 'AI Policy v2.1', user: 'Priya Nair', time: '5 hours ago' },
  { id: '4', action: 'Flagged', target: 'High Risk Finding', user: 'Tom Walsh', time: '1 day ago' },
  { id: '5', action: 'Completed', target: 'TPRM Assessment', user: 'Sarah Chen', time: '1 day ago' },
]

const quickAccessItems: { id: NavigationView; label: string; icon: React.ReactNode; count: number }[] = [
  { id: 'vendors', label: 'Vendors', icon: <Building2 className="w-5 h-5" />, count: 142 },
  { id: 'assessments', label: 'Assessments', icon: <ClipboardCheck className="w-5 h-5" />, count: 38 },
  { id: 'risks', label: 'Risks', icon: <AlertTriangle className="w-5 h-5" />, count: 24 },
  { id: 'assets', label: 'Assets', icon: <Server className="w-5 h-5" />, count: 89 },
  { id: 'policies', label: 'Policies', icon: <FileText className="w-5 h-5" />, count: 15 },
]

export function HomeDashboard() {
  const { tier } = useSubscription()
  const { setCurrentView } = useNavigation()

  // OneTrust Secondary Palette for status/type differentiation
  // Using Sky, Leaf, Destructive, Yellow - avoiding Mint overuse
  const typeColors = {
    Assessment: 'bg-[#0788F7]/10 text-[#0788F7]', // Sky
    Task: 'bg-[#00B935]/10 text-[#00B935]', // Leaf
    Risk: 'bg-[#ef4444]/10 text-[#ef4444]', // Destructive red
    Evidence: 'bg-[#FFEF3C]/10 text-[#FFEF3C]' // Yellow
  }

  const statusColors = {
    overdue: 'text-[#ef4444]',
    'due-soon': 'text-[#FFEF3C]', // OneTrust Yellow
    upcoming: 'text-[#9ca3af]'
  }

  return (
    <div className="p-6 max-w-7xl mx-auto">
      {/* Welcome Header */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-2">
          <h1 className="text-2xl font-medium tracking-[-0.03em] text-white">Welcome back, Jacob</h1>
          <span className="py-1 px-2.5 rounded-md bg-[#6CEEAD]/10 border border-[#6CEEAD]/30 text-[#6CEEAD] text-sm font-medium">
            {tierLabels[tier]}
          </span>
        </div>
        <p className="text-[#9ca3af] leading-[1.2]">Here&apos;s what&apos;s happening across your governance programs</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* My Actions */}
          <div className="bg-[#13151f] border border-[#1e2130] rounded-lg">
            <div className="p-4 border-b border-[#1e2130] flex items-center justify-between">
              <h2 className="text-lg font-medium tracking-[-0.01em] text-white">My Actions</h2>
              <span className="text-sm text-[#9ca3af]">{actions.length} items</span>
            </div>
            <div className="divide-y divide-[#1e2130]">
              {actions.map((action) => (
                <div
                  key={action.id}
                  className="p-4 flex items-center justify-between hover:bg-[#1a1d2a] transition-colors cursor-pointer"
                >
                  <div className="flex items-center gap-3">
                    {action.status === 'overdue' ? (
                      <AlertCircle className="w-5 h-5 text-[#ef4444]" />
                    ) : (
                      <Clock className="w-5 h-5 text-[#9ca3af]" />
                    )}
                    <div>
                      <p className="text-sm text-white">{action.title}</p>
                      <div className="flex items-center gap-2 mt-1">
                        <span className={cn("text-xs px-2 py-0.5 rounded", typeColors[action.type])}>
                          {action.type}
                        </span>
                        <span className={cn("text-xs", statusColors[action.status])}>
                          {action.dueDate}
                        </span>
                      </div>
                    </div>
                  </div>
                  <ChevronRight className="w-4 h-4 text-[#4b5563]" />
                </div>
              ))}
            </div>
          </div>

          {/* Quick Access */}
          <div>
            <h2 className="text-lg font-medium tracking-[-0.01em] text-white mb-4">Quick Access</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
              {quickAccessItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => setCurrentView(item.id)}
                  className="p-4 bg-[#13151f] border border-[#1e2130] rounded-lg hover:border-[#2a2d3a] hover:bg-[#1a1d2a] transition-colors text-left"
                >
                  <div className="text-[#9ca3af] mb-2">{item.icon}</div>
                  <p className="text-sm font-medium text-white">{item.label}</p>
                  <p className="text-xs text-[#9ca3af] mt-1">{item.count} items</p>
                </button>
              ))}
            </div>
          </div>

          {/* Module Cards - Only if subscribed */}
          {tier !== 'lite' && (
            <div>
              <h2 className="text-lg font-medium tracking-[-0.01em] text-white mb-4">Your Modules</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <button
                  onClick={() => setCurrentView('ai-governance')}
                  className="p-4 bg-[#13151f] border border-[#1e2130] rounded-lg hover:border-[#6CEEAD]/50 hover:bg-[#1a1d2a] transition-colors text-left group"
                >
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 rounded-lg bg-[#6CEEAD]/10 flex items-center justify-center">
                      <Brain className="w-5 h-5 text-[#6CEEAD]" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-white">AI Governance</p>
                      <p className="text-xs text-[#9ca3af]">Manage AI systems and compliance</p>
                    </div>
                  </div>
                  <div className="grid grid-cols-3 gap-3 text-center">
                    <div>
                      <p className="text-lg font-semibold text-white">6</p>
                      <p className="text-xs text-[#9ca3af]">AI Systems</p>
                    </div>
                    <div>
                      <p className="text-lg font-semibold text-[#ef4444]">3</p>
                      <p className="text-xs text-[#9ca3af]">High Risk</p>
                    </div>
                    <div>
                      <p className="text-lg font-semibold text-white">4</p>
                      <p className="text-xs text-[#9ca3af]">Models</p>
                    </div>
                  </div>
                </button>

                {tier === 'premium' && (
                  <>
                    <div className="p-4 bg-[#13151f] border border-[#1e2130] rounded-lg">
                      <div className="flex items-center gap-3 mb-3">
                        <div className="w-10 h-10 rounded-lg bg-[#3b82f6]/10 flex items-center justify-center">
                          <ClipboardCheck className="w-5 h-5 text-[#3b82f6]" />
                        </div>
                        <div>
                          <p className="text-sm font-medium text-white">Privacy</p>
                          <p className="text-xs text-[#9ca3af]">Data privacy management</p>
                        </div>
                      </div>
                      <div className="grid grid-cols-3 gap-3 text-center">
                        <div>
                          <p className="text-lg font-semibold text-white">12</p>
                          <p className="text-xs text-[#9ca3af]">DSARs</p>
                        </div>
                        <div>
                          <p className="text-lg font-semibold text-white">8</p>
                          <p className="text-xs text-[#9ca3af]">Consents</p>
                        </div>
                        <div>
                          <p className="text-lg font-semibold text-white">5</p>
                          <p className="text-xs text-[#9ca3af]">PIAs</p>
                        </div>
                      </div>
                    </div>
                  </>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Sidebar - Recent Activity */}
        <div className="space-y-6">
          <div className="bg-[#13151f] border border-[#1e2130] rounded-lg">
            <div className="p-4 border-b border-[#1e2130]">
              <h2 className="text-lg font-medium tracking-[-0.01em] text-white">Recent Activity</h2>
            </div>
            <div className="divide-y divide-[#1e2130]">
              {recentActivity.map((activity) => (
                <div key={activity.id} className="p-4">
                  <p className="text-sm text-white">
                    <span className="text-[#9ca3af]">{activity.user}</span>
                    {' '}{activity.action.toLowerCase()}{' '}
                    <span className="text-[#6CEEAD]">{activity.target}</span>
                  </p>
                  <p className="text-xs text-[#4b5563] mt-1">{activity.time}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
