"use client"

import { useSubscription, tierLabels } from '@/lib/subscription-context'
import { useNavigation, NavigationView } from '@/lib/navigation-context'
import {
  ClipboardCheck,
  AlertTriangle,
  Brain,
  ChevronRight,
  Clock,
  AlertCircle,
  Activity,
  Users,
  Lock,
  Package,
  Database,
  FileSearch,
} from 'lucide-react'
import { cn } from '@/lib/utils'

// ── Combined Stats Data ───────────────────────────────────────────────────────

const aiGovStats = [
  { label: 'AI Systems', value: '47', sub: '+3 this month', accent: '#6CEEAD', icon: Brain },
  { label: 'High Risk', value: '12', sub: '2 need review', accent: '#ef4444', icon: AlertTriangle },
  { label: 'Governance Packs', value: '4', sub: '2 active scanning', accent: '#976FE6', icon: Package },
  { label: 'Pending Assessments', value: '8', sub: '3 overdue', accent: '#f59e0b', icon: ClipboardCheck },
]

const privacyStats = [
  { label: 'Active PIAs', value: '24', sub: '+2 this week', accent: '#0788F7', icon: FileSearch },
  { label: 'Open Incidents', value: '8', sub: '3 critical', accent: '#ef4444', icon: AlertCircle },
  { label: 'DSARs Pending', value: '15', sub: '5 due soon', accent: '#FFEF3C', icon: Users },
  { label: 'Data Records', value: '342', sub: 'Article 30 GDPR', accent: '#00B935', icon: Database },
]

const riskItems = [
  { name: 'Customer Support Chatbot', module: 'AI Governance', risk: 'High', riskColor: '#ef4444', issue: 'Bias detected in responses', daysOpen: 5 },
  { name: 'Unauthorized Access — Marketing DB', module: 'Privacy', risk: 'Critical', riskColor: '#ef4444', issue: 'Active incident investigation', daysOpen: 3 },
  { name: 'Fraud Detection Engine', module: 'AI Governance', risk: 'High', riskColor: '#ef4444', issue: 'Assessment overdue by 14d', daysOpen: 14 },
  { name: 'Vendor API Key Exposed', module: 'Privacy', risk: 'Critical', riskColor: '#ef4444', issue: 'Third party data exposure', daysOpen: 2 },
  { name: 'HR Screening Tool', module: 'AI Governance', risk: 'Medium', riskColor: '#f59e0b', issue: 'Missing transparency docs', daysOpen: 7 },
]

const recentActivity = [
  { id: '1', action: 'Updated', target: 'GPT-4 Integration', user: 'Sarah Chen', time: '2 hours ago', module: 'AI Governance' },
  { id: '2', action: 'Created', target: 'New Vendor Assessment', user: 'Mark Rivera', time: '4 hours ago', module: 'Privacy' },
  { id: '3', action: 'Approved', target: 'EU AI Act Pack', user: 'Priya Nair', time: '5 hours ago', module: 'AI Governance' },
  { id: '4', action: 'Flagged', target: 'Data Breach Incident', user: 'Tom Walsh', time: '1 day ago', module: 'Privacy' },
  { id: '5', action: 'Completed', target: 'DPIA Assessment', user: 'Sarah Chen', time: '1 day ago', module: 'Privacy' },
]

const upcomingDeadlines = [
  { title: 'GDPR Art. 33 Notification', dueDate: '26h remaining', status: 'critical', module: 'Privacy' },
  { title: 'AI System Risk Review', dueDate: 'Due in 2 days', status: 'warning', module: 'AI Governance' },
  { title: 'Vendor Contract Renewal', dueDate: 'Due in 5 days', status: 'normal', module: 'Privacy' },
  { title: 'Governance Pack Update', dueDate: 'Due in 7 days', status: 'normal', module: 'AI Governance' },
]

export function HomeDashboard() {
  const { tier } = useSubscription()
  const { setCurrentView } = useNavigation()

  return (
    <div className="p-6 max-w-[1600px] mx-auto overflow-y-auto">
      {/* Welcome Header */}
      <div className="mb-6">
        <div className="flex items-center gap-3 mb-2">
          <h1 className="text-2xl font-semibold tracking-[-0.03em] text-white">Admin Overview</h1>
          <span className="py-1 px-2.5 rounded-md bg-[#6CEEAD]/10 border border-[#6CEEAD]/30 text-[#6CEEAD] text-sm font-medium">
            {tierLabels[tier]}
          </span>
        </div>
        <p className="text-[#9ca3af] leading-[1.2]">Consolidated view across AI Governance and Privacy Management programs</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Content - 2 columns */}
        <div className="lg:col-span-2 space-y-6">
          {/* Module Stats Grid */}
          <div className="space-y-4">
            {/* AI Governance Stats */}
            <div>
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-sm font-semibold text-white flex items-center gap-2">
                  <Brain className="w-4 h-4 text-[#6CEEAD]" />
                  AI Governance
                </h3>
                <button 
                  onClick={() => setCurrentView('ai-governance')}
                  className="text-[10px] text-[#6CEEAD] hover:underline"
                >
                  View module →
                </button>
              </div>
              <div className="grid grid-cols-4 gap-3">
                {aiGovStats.map((stat) => {
                  const Icon = stat.icon
                  return (
                    <div key={stat.label} className="bg-[#13151f] border border-[#1e2130] rounded-lg p-3 hover:border-[#2a2d3a] transition-colors cursor-pointer">
                      <div className="flex items-start justify-between mb-2">
                        <div className="p-1.5 rounded-md" style={{ background: `${stat.accent}15` }}>
                          <Icon className="w-3.5 h-3.5" style={{ color: stat.accent }} />
                        </div>
                      </div>
                      <p className="text-xl font-bold text-white">{stat.value}</p>
                      <p className="text-[10px] font-medium text-[#9ca3af] mt-0.5">{stat.label}</p>
                      <p className="text-[9px] text-[#4b5563] mt-0.5">{stat.sub}</p>
                    </div>
                  )
                })}
              </div>
            </div>

            {/* Privacy Management Stats */}
            <div>
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-sm font-semibold text-white flex items-center gap-2">
                  <Lock className="w-4 h-4 text-[#0788F7]" />
                  Privacy Management
                </h3>
                <button 
                  onClick={() => setCurrentView('privacy-management')}
                  className="text-[10px] text-[#0788F7] hover:underline"
                >
                  View module →
                </button>
              </div>
              <div className="grid grid-cols-4 gap-3">
                {privacyStats.map((stat) => {
                  const Icon = stat.icon
                  return (
                    <div key={stat.label} className="bg-[#13151f] border border-[#1e2130] rounded-lg p-3 hover:border-[#2a2d3a] transition-colors cursor-pointer">
                      <div className="flex items-start justify-between mb-2">
                        <div className="p-1.5 rounded-md" style={{ background: `${stat.accent}15` }}>
                          <Icon className="w-3.5 h-3.5" style={{ color: stat.accent }} />
                        </div>
                      </div>
                      <p className="text-xl font-bold text-white">{stat.value}</p>
                      <p className="text-[10px] font-medium text-[#9ca3af] mt-0.5">{stat.label}</p>
                      <p className="text-[9px] text-[#4b5563] mt-0.5">{stat.sub}</p>
                    </div>
                  )
                })}
              </div>
            </div>
          </div>

          {/* Top Risks Across Programs */}
          <div className="bg-[#13151f] border border-[#1e2130] rounded-lg overflow-hidden">
            <div className="px-4 py-3 bg-[#0f1117] border-b border-[#1e2130] flex items-center justify-between">
              <h3 className="text-sm font-semibold text-white flex items-center gap-2">
                <AlertTriangle className="w-4 h-4 text-[#ef4444]" />
                Top Risks Across Programs
              </h3>
              <span className="text-[10px] text-[#ef4444] font-medium">{riskItems.length} items requiring attention</span>
            </div>
            <div className="divide-y divide-[#1e2130]">
              {riskItems.map((item, i) => (
                <div key={i} className="px-4 py-3 flex items-center justify-between hover:bg-[#1a1d2a] transition-colors cursor-pointer">
                  <div className="flex items-center gap-3 flex-1 min-w-0">
                    <div className={cn(
                      "w-2 h-2 rounded-full shrink-0",
                      item.risk === 'Critical' ? 'bg-[#ef4444] animate-pulse' : 
                      item.risk === 'High' ? 'bg-[#ef4444]' : 'bg-[#f59e0b]'
                    )} />
                    <div className="min-w-0">
                      <p className="text-sm font-medium text-white truncate">{item.name}</p>
                      <p className="text-[10px] text-[#9ca3af] truncate">{item.issue}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 shrink-0">
                    <span className={cn(
                      "text-[10px] px-2 py-0.5 rounded-full font-medium",
                      item.module === 'AI Governance' ? 'bg-[#6CEEAD]/10 text-[#6CEEAD]' : 'bg-[#0788F7]/10 text-[#0788F7]'
                    )}>
                      {item.module}
                    </span>
                    <span className="text-[10px] font-semibold px-2 py-0.5 rounded" style={{ color: item.riskColor, background: `${item.riskColor}1a` }}>
                      {item.risk}
                    </span>
                    <span className="text-[10px] text-[#4b5563]">{item.daysOpen}d open</span>
                    <ChevronRight className="w-4 h-4 text-[#4b5563]" />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Access Modules */}
          <div>
            <h3 className="text-sm font-semibold text-white mb-3">Quick Access</h3>
            <div className="grid grid-cols-2 gap-4">
              <button
                onClick={() => setCurrentView('ai-governance')}
                className="p-4 bg-[#13151f] border border-[#1e2130] rounded-lg hover:border-[#6CEEAD]/50 hover:bg-[#1a1d2a] transition-all text-left group"
              >
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 rounded-lg bg-[#6CEEAD]/10 flex items-center justify-center group-hover:bg-[#6CEEAD]/20 transition-colors">
                    <Brain className="w-5 h-5 text-[#6CEEAD]" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-white">AI Governance</p>
                    <p className="text-[10px] text-[#9ca3af]">Manage AI systems and compliance</p>
                  </div>
                </div>
                <div className="flex items-center gap-4 text-xs">
                  <div className="flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#00B935]" />
                    <span className="text-[#9ca3af]">4 Governance Packs</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#ef4444]" />
                    <span className="text-[#9ca3af]">12 High Risk</span>
                  </div>
                </div>
              </button>

              <button
                onClick={() => setCurrentView('privacy-management')}
                className="p-4 bg-[#13151f] border border-[#1e2130] rounded-lg hover:border-[#0788F7]/50 hover:bg-[#1a1d2a] transition-all text-left group"
              >
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 rounded-lg bg-[#0788F7]/10 flex items-center justify-center group-hover:bg-[#0788F7]/20 transition-colors">
                    <Lock className="w-5 h-5 text-[#0788F7]" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-white">Privacy Management</p>
                    <p className="text-[10px] text-[#9ca3af]">PIAs, incidents, and data mapping</p>
                  </div>
                </div>
                <div className="flex items-center gap-4 text-xs">
                  <div className="flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#ef4444]" />
                    <span className="text-[#9ca3af]">8 Open Incidents</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#0788F7]" />
                    <span className="text-[#9ca3af]">24 Active PIAs</span>
                  </div>
                </div>
              </button>
            </div>
          </div>
        </div>

        {/* Sidebar - Right column */}
        <div className="space-y-6">
          {/* Upcoming Deadlines */}
          <div className="bg-[#13151f] border border-[#1e2130] rounded-lg overflow-hidden">
            <div className="px-4 py-3 border-b border-[#1e2130] flex items-center gap-2">
              <Clock className="w-4 h-4 text-[#f59e0b]" />
              <h3 className="text-sm font-semibold text-white">Upcoming Deadlines</h3>
            </div>
            <div className="divide-y divide-[#1e2130]">
              {upcomingDeadlines.map((item, i) => (
                <div key={i} className="px-4 py-3 hover:bg-[#1a1d2a] transition-colors cursor-pointer">
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-medium text-white truncate">{item.title}</p>
                      <div className="flex items-center gap-2 mt-1">
                        <span className={cn(
                          "text-[10px] px-1.5 py-0.5 rounded",
                          item.module === 'AI Governance' ? 'bg-[#6CEEAD]/10 text-[#6CEEAD]' : 'bg-[#0788F7]/10 text-[#0788F7]'
                        )}>
                          {item.module}
                        </span>
                      </div>
                    </div>
                    <span className={cn(
                      "text-[10px] font-medium whitespace-nowrap",
                      item.status === 'critical' ? 'text-[#ef4444]' :
                      item.status === 'warning' ? 'text-[#f59e0b]' : 'text-[#9ca3af]'
                    )}>
                      {item.dueDate}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Recent Activity */}
          <div className="bg-[#13151f] border border-[#1e2130] rounded-lg overflow-hidden">
            <div className="px-4 py-3 border-b border-[#1e2130] flex items-center gap-2">
              <Activity className="w-4 h-4 text-[#6CEEAD]" />
              <h3 className="text-sm font-semibold text-white">Recent Activity</h3>
            </div>
            <div className="divide-y divide-[#1e2130]">
              {recentActivity.map((activity) => (
                <div key={activity.id} className="px-4 py-3">
                  <p className="text-xs text-white">
                    <span className="text-[#9ca3af]">{activity.user}</span>
                    {' '}{activity.action.toLowerCase()}{' '}
                    <span className="text-[#6CEEAD]">{activity.target}</span>
                  </p>
                  <div className="flex items-center gap-2 mt-1">
                    <span className={cn(
                      "text-[9px] px-1.5 py-0.5 rounded",
                      activity.module === 'AI Governance' ? 'bg-[#6CEEAD]/10 text-[#6CEEAD]' : 'bg-[#0788F7]/10 text-[#0788F7]'
                    )}>
                      {activity.module}
                    </span>
                    <span className="text-[10px] text-[#4b5563]">{activity.time}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Actions */}
          <div className="bg-[#13151f] border border-[#1e2130] rounded-lg overflow-hidden">
            <div className="px-4 py-3 border-b border-[#1e2130]">
              <h3 className="text-sm font-semibold text-white">Quick Actions</h3>
            </div>
            <div className="p-3 space-y-2">
              <button 
                onClick={() => setCurrentView('ai-governance')}
                className="w-full text-left px-3 py-2.5 rounded-md text-xs font-medium bg-[#6CEEAD]/10 text-[#6CEEAD] transition-opacity hover:opacity-80"
              >
                + New AI Assessment
              </button>
              <button 
                onClick={() => setCurrentView('privacy-management')}
                className="w-full text-left px-3 py-2.5 rounded-md text-xs font-medium bg-[#0788F7]/10 text-[#0788F7] transition-opacity hover:opacity-80"
              >
                + New PIA Assessment
              </button>
              <button className="w-full text-left px-3 py-2.5 rounded-md text-xs font-medium bg-[#f59e0b]/10 text-[#f59e0b] transition-opacity hover:opacity-80">
                Run Risk Scan
              </button>
              <button className="w-full text-left px-3 py-2.5 rounded-md text-xs font-medium bg-[#1e2130] text-[#9ca3af] transition-opacity hover:opacity-80">
                Export Reports
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
