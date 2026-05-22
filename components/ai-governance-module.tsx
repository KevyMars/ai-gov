"use client"

import { useState } from 'react'
import { useNavigation, AIGovTab, AIGovInventoryItem, AIGovAcceptableUseItem } from '@/lib/navigation-context'
import { 
  aiSystems, 
  aiModels, 
  aiAgents, 
  datasets, 
  projects,
  vendors
} from '@/lib/sample-data'
import {
  FolderKanban,
  Brain,
  Cpu,
  Bot,
  Database,
  Building2,
  Plus,
  Search,
  Filter,
  Download,
  FileText,
  Settings,
  AlertTriangle,
  CheckCircle2,
  Clock,
  TrendingUp,
  Shield,
  Activity,
  BarChart3,
  Package,
  Layers,
  ScrollText
} from 'lucide-react'
import { cn } from '@/lib/utils'

// ── Overview Dashboard Data ───────────────────────────────────────────────────

const programHealthStats = [
  { label: 'AI Systems Registered', value: '47',  sub: '+5 this month',    accent: '#0788F7' },
  { label: 'High Risk Systems',     value: '4',   sub: '2 need attention', accent: '#ef4444' },
  { label: 'Pending Assessments',   value: '12',  sub: '3 overdue',        accent: '#FFEF3C' },
  { label: 'Compliance Rate',       value: '89%', sub: '↑ 4% vs Q1',       accent: '#00B935' },
]

const C_AI = 2 * Math.PI * 38
const overallHealth = [
  { label: 'Compliant',   pct: 0.68, color: '#00B935', offset: 0    },
  { label: 'In Progress', pct: 0.21, color: '#f59e0b', offset: 0.68 },
  { label: 'At Risk',     pct: 0.11, color: '#ef4444', offset: 0.89 },
]

const efficiencyStats = [
  { label: 'Avg Assessment Time',   value: '4.2d', sub: '↓ 1.3d vs last quarter', accent: '#00B935', icon: Clock },
  { label: 'Auto-Approved',         value: '62%',  sub: 'low risk systems',       accent: '#0788F7', icon: CheckCircle2 },
  { label: 'Review Bottleneck',     value: '8',    sub: 'awaiting legal review',  accent: '#FFEF3C', icon: AlertTriangle },
  { label: 'Time to Compliance',    value: '12d',  sub: 'avg for new systems',    accent: '#976FE6', icon: TrendingUp },
]

const recentAssessments = [
  { name: 'Customer Support Chatbot',    type: 'High Risk', risk: 'High',   riskAccent: '#ef4444', status: 'In Review',  statusAccent: '#FFEF3C' },
  { name: 'Document Classification ML',  type: 'Limited',   risk: 'Medium', riskAccent: '#f59e0b', status: 'Active',     statusAccent: '#00B935' },
  { name: 'Fraud Detection Engine',      type: 'High Risk', risk: 'High',   riskAccent: '#ef4444', status: 'Overdue',    statusAccent: '#ef4444' },
  { name: 'Marketing Recommendation AI', type: 'Limited',   risk: 'Low',    riskAccent: '#00B935', status: 'Complete',   statusAccent: '#00B935' },
  { name: 'HR Resume Screening Tool',    type: 'High Risk', risk: 'High',   riskAccent: '#ef4444', status: 'In Progress',statusAccent: '#0788F7' },
]

const aiRisks = [
  { category: 'Bias & Fairness',      count: 7,  pct: 28, color: '#ef4444', trend: '↑ 2' },
  { category: 'Data Privacy',         count: 5,  pct: 20, color: '#f59e0b', trend: '↓ 1' },
  { category: 'Transparency',         count: 6,  pct: 24, color: '#976FE6', trend: '—' },
  { category: 'Security',             count: 4,  pct: 16, color: '#0788F7', trend: '↓ 2' },
  { category: 'Accountability',       count: 3,  pct: 12, color: '#00B935', trend: '↑ 1' },
]

const riskTrendBars = [
  { h: 65, c: '#ef4444' }, { h: 58, c: '#ef4444' }, { h: 52, c: '#f59e0b' },
  { h: 48, c: '#f59e0b' }, { h: 45, c: '#f59e0b' }, { h: 50, c: '#f59e0b' },
  { h: 46, c: '#00B935' }, { h: 42, c: '#00B935' }, { h: 38, c: '#00B935' },
  { h: 40, c: '#00B935' }, { h: 36, c: '#00B935' }, { h: 34, c: '#00B935' },
]
const riskXLabels = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun']

const governancePacksData = [
  { name: 'EU AI Act',     desc: 'Full compliance for EU regulations',  status: 'Active',      stColor: '#00B935', coverage: 94 },
  { name: 'NIST AI RMF',   desc: 'Risk management framework controls',  status: 'In Use',      stColor: '#0788F7', coverage: 87 },
  { name: 'ISO 42001',     desc: 'AI management system standards',      status: 'In Progress', stColor: '#f59e0b', coverage: 62 },
  { name: 'State AI Laws', desc: 'US state-level AI requirements',      status: 'Stalled',     stColor: '#ef4444', coverage: 28 },
  { name: 'OECD AI Principles', desc: 'International AI ethics guidelines', status: 'Active',  stColor: '#00B935', coverage: 91 },
  { name: 'IEEE Ethically Aligned', desc: 'Ethics framework for autonomous systems', status: 'In Use', stColor: '#0788F7', coverage: 78 },
]

const governancePacksStats = [
  { label: 'Active',      value: 2, accent: '#00B935' },
  { label: 'In Use',      value: 2, accent: '#0788F7' },
  { label: 'In Progress', value: 1, accent: '#f59e0b' },
  { label: 'Stalled',     value: 1, accent: '#ef4444' },
]

// ── AI Governance Overview Dashboard ─────────────────────────────────────────

function AIGovernanceOverviewDashboard() {
  return (
    <div className="p-6 space-y-4 overflow-y-auto flex-1">
      {/* Header */}
      <div>
        <h2 className="text-lg font-medium text-white">AI Governance Overview</h2>
        <p className="text-xs text-[#9ca3af] mt-0.5">Program Dashboard · Last updated today at 10:24 AM</p>
      </div>

      {/* ── Overall Program Health ─────────────────────────────────────────────── */}
      <div className="space-y-3">
        <h3 className="text-sm font-semibold text-white flex items-center gap-2">
          <Shield className="w-4 h-4 text-[#6CEEAD]" />
          Overall Program Health
        </h3>
        <div className="grid grid-cols-4 gap-3">
          {programHealthStats.map((s) => (
            <div key={s.label} className="bg-[#13151f] border border-[#1e2130] rounded-lg overflow-hidden">
              <div className="h-[3px]" style={{ background: s.accent }} />
              <div className="p-4">
                <p className="text-2xl font-bold text-white">{s.value}</p>
                <p className="text-[11px] font-semibold text-[#9ca3af] mt-2">{s.label}</p>
                <p className="text-[10px] text-[#4b5563] mt-0.5">{s.sub}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-3 gap-3">
          {/* Program Health Donut */}
          <div className="bg-[#13151f] border border-[#1e2130] rounded-lg p-4 flex flex-col">
            <p className="text-sm font-semibold text-white">Program Health</p>
            <p className="text-[10px] text-[#9ca3af] mt-0.5">vs last quarter</p>
            <div className="flex items-center justify-center flex-1 py-4">
              <div className="relative w-28 h-28">
                <svg viewBox="0 0 100 100" className="w-full h-full -rotate-90">
                  <circle cx="50" cy="50" r="38" fill="none" stroke="#1e2130" strokeWidth="10" />
                  {overallHealth.map((seg) => (
                    <circle key={seg.label} cx="50" cy="50" r="38" fill="none"
                      stroke={seg.color} strokeWidth="10"
                      strokeDasharray={`${seg.pct * C_AI} ${C_AI}`}
                      strokeDashoffset={`${-seg.offset * C_AI}`}
                      strokeLinecap="butt" />
                  ))}
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <p className="text-xl font-bold text-white">68%</p>
                  <p className="text-[10px] text-[#9ca3af]">compliant</p>
                </div>
              </div>
            </div>
            <div>
              {overallHealth.map((seg) => (
                <div key={seg.label}>
                  <div className="flex items-center justify-between py-2">
                    <div className="flex items-center gap-2">
                      <div className="w-2.5 h-2.5 rounded-sm" style={{ background: seg.color }} />
                      <p className="text-xs text-white">{seg.label}</p>
                    </div>
                    <p className="text-xs font-semibold" style={{ color: seg.color }}>
                      {Math.round(seg.pct * 100)}%
                    </p>
                  </div>
                  <div className="h-px bg-[#1e2130]" />
                </div>
              ))}
            </div>
          </div>

          {/* Risk by Category */}
          <div className="col-span-2 bg-[#13151f] border border-[#1e2130] rounded-lg overflow-hidden">
            <div className="px-4 py-3 bg-[#0f1117] border-b border-[#1e2130]">
              <p className="text-sm font-semibold text-white">Risk Distribution by Category</p>
            </div>
            <div className="p-4 space-y-3">
              {aiRisks.map((r) => (
                <div key={r.category} className="space-y-1">
                  <div className="flex items-center justify-between">
                    <p className="text-xs text-white">{r.category}</p>
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] text-[#4b5563]">{r.trend}</span>
                      <span className="text-xs font-semibold" style={{ color: r.color }}>{r.count}</span>
                    </div>
                  </div>
                  <div className="h-1.5 bg-[#1e2130] rounded-full overflow-hidden">
                    <div className="h-full rounded-full transition-all" style={{ width: `${r.pct}%`, background: r.color }} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ── Efficiency Insights ────────────────────────────────────────────────── */}
      <div className="space-y-3">
        <h3 className="text-sm font-semibold text-white flex items-center gap-2">
          <Activity className="w-4 h-4 text-[#0788F7]" />
          Efficiency Insights
        </h3>
        <div className="grid grid-cols-4 gap-3">
          {efficiencyStats.map((s) => {
            const Icon = s.icon
            return (
              <div key={s.label} className="bg-[#13151f] border border-[#1e2130] rounded-lg p-4">
                <div className="flex items-start justify-between mb-2">
                  <div className="p-2 rounded-lg" style={{ background: `${s.accent}15` }}>
                    <Icon className="w-4 h-4" style={{ color: s.accent }} />
                  </div>
                </div>
                <p className="text-2xl font-bold text-white">{s.value}</p>
                <p className="text-[11px] font-semibold text-[#9ca3af] mt-1">{s.label}</p>
                <p className="text-[10px] text-[#4b5563] mt-0.5">{s.sub}</p>
              </div>
            )
          })}
        </div>
      </div>

      {/* ── Assessments ────────────────────────────────────────────────────────── */}
      <div className="space-y-3">
        <h3 className="text-sm font-semibold text-white flex items-center gap-2">
          <BarChart3 className="w-4 h-4 text-[#FFEF3C]" />
          Assessments
        </h3>
        <div className="grid grid-cols-3 gap-3">
          <div className="col-span-2 bg-[#13151f] border border-[#1e2130] rounded-lg overflow-hidden">
            <div className="flex items-center justify-between px-4 py-3 bg-[#0f1117] border-b border-[#1e2130]">
              <p className="text-sm font-semibold text-white">Recent AI Assessments</p>
              <button className="text-[11px] text-[#6CEEAD] hover:underline">View all →</button>
            </div>
            <div className="px-4">
              <div className="grid gap-2 py-2.5 border-b border-[#1e2130]"
                style={{ gridTemplateColumns: '1fr 90px 80px 90px' }}>
                {['AI System', 'Risk Category', 'Risk', 'Status'].map((h) => (
                  <p key={h} className="text-[10px] font-semibold text-[#4b5563] uppercase tracking-wider">{h}</p>
                ))}
              </div>
              {recentAssessments.map((row, i) => (
                <div key={i}
                  className="grid gap-2 py-3 border-b border-[#1e2130] last:border-0 hover:bg-[#1a1d2a] cursor-pointer transition-colors -mx-4 px-4 items-center"
                  style={{ gridTemplateColumns: '1fr 90px 80px 90px' }}>
                  <p className="text-xs font-medium text-white truncate">{row.name}</p>
                  <p className="text-[10px] text-[#9ca3af]">{row.type}</p>
                  <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full w-fit"
                    style={{ color: row.riskAccent, background: `${row.riskAccent}1a` }}>{row.risk}</span>
                  <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full w-fit"
                    style={{ color: row.statusAccent, background: `${row.statusAccent}1a` }}>{row.status}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Actions */}
          <div className="bg-[#13151f] border border-[#1e2130] rounded-lg overflow-hidden">
            <div className="px-4 py-3 border-b border-[#1e2130]">
              <p className="text-sm font-semibold text-white">Quick Actions</p>
            </div>
            <div className="p-3 space-y-2">
              <button className="w-full text-left px-3 py-2.5 rounded-md text-xs font-medium bg-[#6CEEAD]/10 text-[#6CEEAD] transition-opacity hover:opacity-80">
                + New AI Assessment
              </button>
              <button className="w-full text-left px-3 py-2.5 rounded-md text-xs font-medium bg-[#1e2130] text-white transition-opacity hover:opacity-80">
                Register AI System
              </button>
              <button className="w-full text-left px-3 py-2.5 rounded-md text-xs font-medium bg-[#f59e0b]/10 text-[#f59e0b] transition-opacity hover:opacity-80">
                Run Risk Scan
              </button>
              <button className="w-full text-left px-3 py-2.5 rounded-md text-xs font-medium bg-[#1e2130] text-[#9ca3af] transition-opacity hover:opacity-80">
                Export Report
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* ── AI Governance Risks ────────────────────────────────────────────────── */}
      <div className="space-y-3">
        <h3 className="text-sm font-semibold text-white flex items-center gap-2">
          <AlertTriangle className="w-4 h-4 text-[#ef4444]" />
          AI Governance Risks
        </h3>
        <div className="grid grid-cols-3 gap-3">
          {/* Risk Trend Chart */}
          <div className="col-span-2 bg-[#13151f] border border-[#1e2130] rounded-lg overflow-hidden">
            <div className="flex items-start justify-between px-4 pt-3 pb-2 border-b border-[#1e2130]">
              <div>
                <p className="text-sm font-semibold text-white">Risk Trend — Last 6 Months</p>
                <p className="text-[10px] text-[#9ca3af]">Aggregate risk score across AI systems</p>
              </div>
              <p className="text-xs font-medium text-[#00B935] whitespace-nowrap">↓ 2.4 pts improving</p>
            </div>
            <div className="px-4 pt-3 pb-4">
              <div className="relative">
                <div className="absolute inset-x-0 flex flex-col justify-between h-28 pointer-events-none">
                  {[10, 8, 6, 4, 2, 0].map((n) => (
                    <div key={n} className="flex items-center gap-1">
                      <span className="text-[9px] text-[#4b5563] w-4 text-right shrink-0">{n}</span>
                      <div className="flex-1 h-px bg-[#1e2130]" />
                    </div>
                  ))}
                </div>
                <div className="ml-6 flex items-end gap-1 h-28">
                  {riskTrendBars.map((bar, i) => (
                    <div key={i} className="flex-1 rounded-sm opacity-80 hover:opacity-100 transition-opacity"
                      style={{ height: `${bar.h}%`, background: bar.c }} />
                  ))}
                </div>
              </div>
              <div className="ml-6 flex justify-between mt-1.5">
                {riskXLabels.map((l) => (
                  <p key={l} className="text-[9px] text-[#4b5563]">{l}</p>
                ))}
              </div>
            </div>
          </div>

          {/* Top Risks */}
          <div className="bg-[#13151f] border border-[#1e2130] rounded-lg overflow-hidden">
            <div className="px-4 py-3 border-b border-[#1e2130]">
              <p className="text-sm font-semibold text-white">Top Risk Items</p>
            </div>
            <div className="p-3 space-y-2">
              <div className="px-3 py-2 rounded-md bg-[#ef4444]/10 border border-[#ef4444]/20">
                <p className="text-xs font-medium text-white">Customer Support Chatbot</p>
                <p className="text-[10px] text-[#ef4444]">Bias detected in responses</p>
              </div>
              <div className="px-3 py-2 rounded-md bg-[#ef4444]/10 border border-[#ef4444]/20">
                <p className="text-xs font-medium text-white">Fraud Detection Engine</p>
                <p className="text-[10px] text-[#ef4444]">Assessment overdue by 14d</p>
              </div>
              <div className="px-3 py-2 rounded-md bg-[#f59e0b]/10 border border-[#f59e0b]/20">
                <p className="text-xs font-medium text-white">HR Screening Tool</p>
                <p className="text-[10px] text-[#f59e0b]">Missing transparency docs</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── Governance Packs ───────────────────────────────────────────────────── */}
      <div className="space-y-3">
        <h3 className="text-sm font-semibold text-white flex items-center gap-2">
          <Package className="w-4 h-4 text-[#976FE6]" />
          Governance Packs
        </h3>
        
        {/* Stats Row */}
        <div className="grid grid-cols-4 gap-3">
          {governancePacksStats.map((s) => (
            <div key={s.label} className="bg-[#13151f] border border-[#1e2130] rounded-lg p-3 flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{ background: `${s.accent}15` }}>
                <span className="text-lg font-bold" style={{ color: s.accent }}>{s.value}</span>
              </div>
              <p className="text-xs font-medium text-[#9ca3af]">{s.label}</p>
            </div>
          ))}
        </div>

        {/* Packs Grid */}
        <div className="grid grid-cols-3 gap-3">
          {governancePacksData.map((pack) => (
            <div key={pack.name} className="bg-[#13151f] border border-[#1e2130] rounded-lg p-4 hover:border-[#2a2d3a] transition-colors cursor-pointer">
              <div className="flex items-start justify-between mb-2">
                <h4 className="text-sm font-medium text-white">{pack.name}</h4>
                <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full"
                  style={{ color: pack.stColor, background: `${pack.stColor}1a` }}>{pack.status}</span>
              </div>
              <p className="text-[10px] text-[#9ca3af] mb-3">{pack.desc}</p>
              <div className="space-y-1">
                <div className="flex items-center justify-between">
                  <p className="text-[10px] text-[#4b5563]">Coverage</p>
                  <p className="text-[10px] font-semibold text-white">{pack.coverage}%</p>
                </div>
                <div className="h-1.5 bg-[#1e2130] rounded-full overflow-hidden">
                  <div className="h-full rounded-full" style={{ width: `${pack.coverage}%`, background: pack.stColor }} />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

const tabs: { id: AIGovTab; label: string }[] = [
  { id: 'overview', label: 'Overview' },
  { id: 'acceptable-use', label: 'Acceptable Use' },
  { id: 'governance-packs', label: 'Governance Packs' },
  { id: 'inventory', label: 'Inventory' },
  { id: 'objects', label: 'Objects' },
  { id: 'ai-policies', label: 'AI Policies' },
]

const inventoryItems: { id: AIGovInventoryItem; label: string; icon: React.ReactNode }[] = [
  { id: 'projects', label: 'Projects', icon: <FolderKanban className="w-4 h-4" /> },
  { id: 'ai-systems', label: 'AI Systems', icon: <Brain className="w-4 h-4" /> },
  { id: 'models', label: 'Models', icon: <Cpu className="w-4 h-4" /> },
  { id: 'ai-agents', label: 'AI Agents', icon: <Bot className="w-4 h-4" /> },
  { id: 'datasets', label: 'Datasets', icon: <Database className="w-4 h-4" /> },
  { id: 'vendors', label: 'Model Providers', icon: <Building2 className="w-4 h-4" /> },
]

const acceptableUseItems: { id: AIGovAcceptableUseItem; label: string; icon: React.ReactNode }[] = [
  { id: 'accepted-inventory', label: 'Inventory', icon: <Layers className="w-4 h-4" /> },
  { id: 'accepted-use-policies', label: 'Policies', icon: <ScrollText className="w-4 h-4" /> },
]

export function AIGovernanceModule() {
  const { 
    aiGovTab, 
    setAIGovTab, 
    aiGovInventoryItem, 
    setAIGovInventoryItem,
    aiGovAcceptableUseItem,
    setAIGovAcceptableUseItem,
    setSelectedRecordId 
  } = useNavigation()

  const [acceptedInventoryFilter, setAcceptedInventoryFilter] = useState<'all' | 'Approved' | 'Needs review' | 'Denied'>('all')

  // OneTrust Brand Color System - use Mint sparingly for key emphasis
  // Secondary palette: Sky (#0788F7), Yellow (#FFEF3C), Leaf (#00B935)
  const stageColors = {
    'In Use': 'bg-[#00B935]/10 text-[#00B935]', // Leaf for active
    'New': 'bg-[#0788F7]/10 text-[#0788F7]', // Sky for new
    'In Review': 'bg-[#FFEF3C]/10 text-[#FFEF3C]', // Yellow for pending
    'Active': 'bg-[#00B935]/10 text-[#00B935]' // Leaf for active
  }

  const riskColors = {
    'Low': 'bg-[#00B935]/10 text-[#00B935]', // Leaf
    'Medium': 'bg-[#FFEF3C]/10 text-[#FFEF3C]', // Yellow
    'High': 'bg-[#ef4444]/10 text-[#ef4444]' // Destructive
  }

  const statusColors = {
    'Active': 'bg-[#00B935]/10 text-[#00B935]', // Leaf
    'Inactive': 'bg-[#4b5563]/10 text-[#9ca3af]',
    'Paused': 'bg-[#FFEF3C]/10 text-[#FFEF3C]', // Yellow
    'Testing': 'bg-[#0788F7]/10 text-[#0788F7]', // Sky
    'Deprecated': 'bg-[#ef4444]/10 text-[#ef4444]', // Destructive
    'Completed': 'bg-[#00B935]/10 text-[#00B935]', // Leaf
    'On Hold': 'bg-[#FFEF3C]/10 text-[#FFEF3C]', // Yellow
    'Under Review': 'bg-[#FFEF3C]/10 text-[#FFEF3C]' // Yellow
  }

  const classificationColors = {
    'Public': 'bg-[#00B935]/10 text-[#00B935]', // Leaf
    'Internal': 'bg-[#0788F7]/10 text-[#0788F7]', // Sky
    'Confidential': 'bg-[#FFEF3C]/10 text-[#FFEF3C]', // Yellow
    'Restricted': 'bg-[#ef4444]/10 text-[#ef4444]' // Destructive
  }

  const riskTierColors = {
    'Critical': 'bg-[#ef4444]/10 text-[#ef4444]', // Destructive
    'High': 'bg-[#FFEF3C]/10 text-[#FFEF3C]', // Yellow
    'Medium': 'bg-[#0788F7]/10 text-[#0788F7]', // Sky
    'Low': 'bg-[#00B935]/10 text-[#00B935]' // Leaf
  }

  const renderInventoryContent = () => {
    switch (aiGovInventoryItem) {
      case 'ai-systems':
        return (
          <table className="w-full">
            <thead>
              <tr className="border-b border-[#1e2130]">
                <th className="text-left py-3 px-4 text-xs font-medium text-[#9ca3af] uppercase tracking-wider">ID</th>
                <th className="text-left py-3 px-4 text-xs font-medium text-[#9ca3af] uppercase tracking-wider">Name</th>
                <th className="text-left py-3 px-4 text-xs font-medium text-[#9ca3af] uppercase tracking-wider">Framework</th>
                <th className="text-left py-3 px-4 text-xs font-medium text-[#9ca3af] uppercase tracking-wider">Owner</th>
                <th className="text-left py-3 px-4 text-xs font-medium text-[#9ca3af] uppercase tracking-wider">Stage</th>
                <th className="text-left py-3 px-4 text-xs font-medium text-[#9ca3af] uppercase tracking-wider">Risk Score</th>
              </tr>
            </thead>
            <tbody>
              {aiSystems.map((system) => (
                <tr 
                  key={system.id} 
                  className="border-b border-[#1e2130] hover:bg-[#1a1d2a] cursor-pointer transition-colors"
                  onClick={() => setSelectedRecordId(system.name)}
                >
                  <td className="py-3 px-4 text-sm text-[#9ca3af]">{system.id}</td>
                  <td className="py-3 px-4 text-sm text-white font-medium">{system.name}</td>
                  <td className="py-3 px-4 text-sm text-[#9ca3af]">{system.framework}</td>
                  <td className="py-3 px-4 text-sm text-[#9ca3af]">{system.owner}</td>
                  <td className="py-3 px-4">
                    <span className={cn("text-xs px-2 py-1 rounded", stageColors[system.stage])}>
                      {system.stage}
                    </span>
                  </td>
                  <td className="py-3 px-4">
                    <span className={cn("text-xs px-2 py-1 rounded", riskColors[system.riskScore])}>
                      {system.riskScore}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )

      case 'models':
        return (
          <table className="w-full">
            <thead>
              <tr className="border-b border-[#1e2130]">
                <th className="text-left py-3 px-4 text-xs font-medium text-[#9ca3af] uppercase tracking-wider">ID</th>
                <th className="text-left py-3 px-4 text-xs font-medium text-[#9ca3af] uppercase tracking-wider">Name</th>
                <th className="text-left py-3 px-4 text-xs font-medium text-[#9ca3af] uppercase tracking-wider">Vendor</th>
                <th className="text-left py-3 px-4 text-xs font-medium text-[#9ca3af] uppercase tracking-wider">Type</th>
                <th className="text-left py-3 px-4 text-xs font-medium text-[#9ca3af] uppercase tracking-wider">Version</th>
                <th className="text-left py-3 px-4 text-xs font-medium text-[#9ca3af] uppercase tracking-wider">Status</th>
              </tr>
            </thead>
            <tbody>
              {aiModels.map((model) => (
                <tr 
                  key={model.id} 
                  className="border-b border-[#1e2130] hover:bg-[#1a1d2a] cursor-pointer transition-colors"
                  onClick={() => setSelectedRecordId(model.name)}
                >
                  <td className="py-3 px-4 text-sm text-[#9ca3af]">{model.id}</td>
                  <td className="py-3 px-4 text-sm text-white font-medium">{model.name}</td>
                  <td className="py-3 px-4 text-sm text-[#9ca3af]">{model.vendor}</td>
                  <td className="py-3 px-4 text-sm text-[#9ca3af]">{model.type}</td>
                  <td className="py-3 px-4 text-sm text-[#9ca3af]">{model.version}</td>
                  <td className="py-3 px-4">
                    <span className={cn("text-xs px-2 py-1 rounded", statusColors[model.status])}>
                      {model.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )

      case 'ai-agents':
        return (
          <table className="w-full">
            <thead>
              <tr className="border-b border-[#1e2130]">
                <th className="text-left py-3 px-4 text-xs font-medium text-[#9ca3af] uppercase tracking-wider">ID</th>
                <th className="text-left py-3 px-4 text-xs font-medium text-[#9ca3af] uppercase tracking-wider">Name</th>
                <th className="text-left py-3 px-4 text-xs font-medium text-[#9ca3af] uppercase tracking-wider">Connected System</th>
                <th className="text-left py-3 px-4 text-xs font-medium text-[#9ca3af] uppercase tracking-wider">Owner</th>
                <th className="text-left py-3 px-4 text-xs font-medium text-[#9ca3af] uppercase tracking-wider">Status</th>
              </tr>
            </thead>
            <tbody>
              {aiAgents.map((agent) => (
                <tr 
                  key={agent.id} 
                  className="border-b border-[#1e2130] hover:bg-[#1a1d2a] cursor-pointer transition-colors"
                  onClick={() => setSelectedRecordId(agent.name)}
                >
                  <td className="py-3 px-4 text-sm text-[#9ca3af]">{agent.id}</td>
                  <td className="py-3 px-4 text-sm text-white font-medium">{agent.name}</td>
                  <td className="py-3 px-4 text-sm text-[#9ca3af]">{agent.connectedSystem}</td>
                  <td className="py-3 px-4 text-sm text-[#9ca3af]">{agent.owner}</td>
                  <td className="py-3 px-4">
                    <span className={cn("text-xs px-2 py-1 rounded", statusColors[agent.status])}>
                      {agent.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )

      case 'datasets':
        return (
          <table className="w-full">
            <thead>
              <tr className="border-b border-[#1e2130]">
                <th className="text-left py-3 px-4 text-xs font-medium text-[#9ca3af] uppercase tracking-wider">ID</th>
                <th className="text-left py-3 px-4 text-xs font-medium text-[#9ca3af] uppercase tracking-wider">Name</th>
                <th className="text-left py-3 px-4 text-xs font-medium text-[#9ca3af] uppercase tracking-wider">Type</th>
                <th className="text-left py-3 px-4 text-xs font-medium text-[#9ca3af] uppercase tracking-wider">Size</th>
                <th className="text-left py-3 px-4 text-xs font-medium text-[#9ca3af] uppercase tracking-wider">Classification</th>
              </tr>
            </thead>
            <tbody>
              {datasets.map((dataset) => (
                <tr 
                  key={dataset.id} 
                  className="border-b border-[#1e2130] hover:bg-[#1a1d2a] cursor-pointer transition-colors"
                  onClick={() => setSelectedRecordId(dataset.name)}
                >
                  <td className="py-3 px-4 text-sm text-[#9ca3af]">{dataset.id}</td>
                  <td className="py-3 px-4 text-sm text-white font-medium">{dataset.name}</td>
                  <td className="py-3 px-4 text-sm text-[#9ca3af]">{dataset.type}</td>
                  <td className="py-3 px-4 text-sm text-[#9ca3af]">{dataset.size}</td>
                  <td className="py-3 px-4">
                    <span className={cn("text-xs px-2 py-1 rounded", classificationColors[dataset.classification])}>
                      {dataset.classification}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )

      case 'projects':
        return (
          <table className="w-full">
            <thead>
              <tr className="border-b border-[#1e2130]">
                <th className="text-left py-3 px-4 text-xs font-medium text-[#9ca3af] uppercase tracking-wider">ID</th>
                <th className="text-left py-3 px-4 text-xs font-medium text-[#9ca3af] uppercase tracking-wider">Name</th>
                <th className="text-left py-3 px-4 text-xs font-medium text-[#9ca3af] uppercase tracking-wider">Status</th>
                <th className="text-left py-3 px-4 text-xs font-medium text-[#9ca3af] uppercase tracking-wider">Owner</th>
                <th className="text-left py-3 px-4 text-xs font-medium text-[#9ca3af] uppercase tracking-wider">Due Date</th>
              </tr>
            </thead>
            <tbody>
              {projects.map((project) => (
                <tr 
                  key={project.id} 
                  className="border-b border-[#1e2130] hover:bg-[#1a1d2a] cursor-pointer transition-colors"
                  onClick={() => setSelectedRecordId(project.name)}
                >
                  <td className="py-3 px-4 text-sm text-[#9ca3af]">{project.id}</td>
                  <td className="py-3 px-4 text-sm text-white font-medium">{project.name}</td>
                  <td className="py-3 px-4">
                    <span className={cn("text-xs px-2 py-1 rounded", statusColors[project.status])}>
                      {project.status}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-sm text-[#9ca3af]">{project.owner}</td>
                  <td className="py-3 px-4 text-sm text-[#9ca3af]">{project.dueDate}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )

      case 'vendors':
        return (
          <table className="w-full">
            <thead>
              <tr className="border-b border-[#1e2130]">
                <th className="text-left py-3 px-4 text-xs font-medium text-[#9ca3af] uppercase tracking-wider">ID</th>
                <th className="text-left py-3 px-4 text-xs font-medium text-[#9ca3af] uppercase tracking-wider">Name</th>
                <th className="text-left py-3 px-4 text-xs font-medium text-[#9ca3af] uppercase tracking-wider">Category</th>
                <th className="text-left py-3 px-4 text-xs font-medium text-[#9ca3af] uppercase tracking-wider">Risk Tier</th>
                <th className="text-left py-3 px-4 text-xs font-medium text-[#9ca3af] uppercase tracking-wider">Status</th>
                <th className="text-left py-3 px-4 text-xs font-medium text-[#9ca3af] uppercase tracking-wider">Last Assessment</th>
              </tr>
            </thead>
            <tbody>
              {vendors.map((vendor) => (
                <tr 
                  key={vendor.id} 
                  className="border-b border-[#1e2130] hover:bg-[#1a1d2a] cursor-pointer transition-colors"
                  onClick={() => setSelectedRecordId(vendor.name)}
                >
                  <td className="py-3 px-4 text-sm text-[#9ca3af]">{vendor.id}</td>
                  <td className="py-3 px-4 text-sm text-white font-medium">{vendor.name}</td>
                  <td className="py-3 px-4 text-sm text-[#9ca3af]">{vendor.category}</td>
                  <td className="py-3 px-4">
                    <span className={cn("text-xs px-2 py-1 rounded", riskTierColors[vendor.riskTier])}>
                      {vendor.riskTier}
                    </span>
                  </td>
                  <td className="py-3 px-4">
                    <span className={cn("text-xs px-2 py-1 rounded", statusColors[vendor.status])}>
                      {vendor.status}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-sm text-[#9ca3af]">{vendor.lastAssessment}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )

      default:
        return null
    }
  }

  const getItemLabel = () => {
    return inventoryItems.find(i => i.id === aiGovInventoryItem)?.label || 'Items'
  }

  const getItemCount = () => {
    switch (aiGovInventoryItem) {
      case 'ai-systems': return aiSystems.length
      case 'models': return aiModels.length
      case 'ai-agents': return aiAgents.length
      case 'datasets': return datasets.length
      case 'projects': return projects.length
      case 'vendors': return vendors.length
      default: return 0
    }
  }

  return (
    <div className="h-full flex flex-col">
      {/* Top Tabs */}
      <div className="border-b border-[#1e2130] px-6">
        <div className="flex gap-1">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setAIGovTab(tab.id)}
              className={cn(
                "px-4 py-3 text-sm font-medium transition-colors relative",
                aiGovTab === tab.id
                  ? "text-[#6CEEAD]"
                  : "text-[#9ca3af] hover:text-white"
              )}
            >
              {tab.label}
              {aiGovTab === tab.id && (
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#6CEEAD]" />
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Tab Content */}
      <div className="flex-1 flex overflow-hidden">
        {aiGovTab === 'overview' && (
          <AIGovernanceOverviewDashboard />
        )}

        {aiGovTab === 'acceptable-use' && (
          <>
            {/* Secondary Rail */}
            <div className="w-48 border-r border-[#1e2130] bg-[#0f1117] py-4">
              <ul className="space-y-1 px-2">
                {acceptableUseItems.map((item) => (
                  <li key={item.id}>
                    <button
                      onClick={() => setAIGovAcceptableUseItem(item.id)}
                      className={cn(
                        "w-full flex items-center gap-2 px-3 py-2 rounded-md text-sm transition-colors",
                        aiGovAcceptableUseItem === item.id
                          ? "bg-[#6CEEAD]/10 text-[#6CEEAD]"
                          : "text-[#9ca3af] hover:bg-[#1e2130] hover:text-white"
                      )}
                    >
                      {item.icon}
                      <span>{item.label}</span>
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            {/* Main Content */}
            <div className="flex-1 overflow-auto p-6">
              {aiGovAcceptableUseItem === 'accepted-inventory' && (
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <h2 className="text-lg font-medium tracking-[-0.01em] text-white mb-1">Inventory</h2>
                      <p className="text-[#9ca3af] text-sm">AI systems and tools that have been approved for use within your organization.</p>
                    </div>
                    <select className="px-3 py-1.5 bg-[#13151f] border border-[#1e2130] rounded-md text-xs text-white">
                      <option>My models</option>
                      <option>All models</option>
                      <option>AI Systems</option>
                      <option>Agents</option>
                    </select>
                  </div>

                  {/* Quick Insight Cards */}
                  <div className="grid grid-cols-3 gap-3 mb-4">
                    {[
                      { label: 'Approved', value: 6, accent: '#00B935', filter: 'Approved' as const },
                      { label: 'Needs review', value: 1, accent: '#f59e0b', filter: 'Needs review' as const },
                      { label: 'Denied', value: 4, accent: '#ef4444', filter: 'Denied' as const },
                    ].map((stat) => (
                      <button
                        key={stat.label}
                        onClick={() => setAcceptedInventoryFilter(acceptedInventoryFilter === stat.filter ? 'all' : stat.filter)}
                        className={cn(
                          "p-3 bg-[#13151f] border rounded-lg text-left transition-all",
                          acceptedInventoryFilter === stat.filter
                            ? "border-[#6CEEAD] ring-1 ring-[#6CEEAD]/20"
                            : "border-[#1e2130] hover:border-[#2a2d3a]"
                        )}
                      >
                        <div className="flex items-center justify-between">
                          <p className="text-xs font-medium text-[#9ca3af]">{stat.label}</p>
                          <div className="w-2 h-2 rounded-full" style={{ background: stat.accent }} />
                        </div>
                        <p className="text-2xl font-bold text-white mt-1">{stat.value}</p>
                      </button>
                    ))}
                  </div>

                  <div className="bg-[#13151f] border border-[#1e2130] rounded-lg overflow-hidden">
                    <div className="px-4">
                      {/* Table Header */}
                      <div className="grid gap-4 py-3 border-b border-[#1e2130]"
                        style={{ gridTemplateColumns: '1fr 110px 100px 1fr 140px 110px' }}>
                        <p className="text-[10px] font-semibold text-[#4b5563] uppercase tracking-wider">Name</p>
                        <p className="text-[10px] font-semibold text-[#4b5563] uppercase tracking-wider">Policy Approval</p>
                        <p className="text-[10px] font-semibold text-[#4b5563] uppercase tracking-wider">Inventory type</p>
                        <p className="text-[10px] font-semibold text-[#4b5563] uppercase tracking-wider">Description</p>
                        <p className="text-[10px] font-semibold text-[#4b5563] uppercase tracking-wider">Approved for use with</p>
                        <p className="text-[10px] font-semibold text-[#4b5563] uppercase tracking-wider">Internal or External</p>
                      </div>
                      {/* Table Rows */}
                      {[
                        { name: 'Record name', approval: 'Needs review', type: 'Model', desc: 'Description', approvedWith: 'DataBricks', scope: 'Internal' },
                        { name: 'Record name', approval: 'Approved', type: 'Model', desc: 'Description', approvedWith: 'All', scope: 'External' },
                        { name: 'Record name', approval: 'Approved', type: 'AI System', desc: 'Description', approvedWith: 'Anthropic, OpenAI', scope: 'Both' },
                        { name: 'Record name', approval: 'Approved', type: 'AI System', desc: 'Description', approvedWith: 'Anthropic, OpenAI', scope: 'Internal' },
                        { name: 'Record name', approval: 'Approved', type: 'AI System', desc: 'Description', approvedWith: 'Anthropic, OpenAI', scope: 'Internal' },
                        { name: 'Record name', approval: 'Denied', type: 'AI System', desc: 'Description', approvedWith: 'Gemini', scope: 'External' },
                        { name: 'Record name', approval: 'Denied', type: 'Model', desc: 'Description', approvedWith: 'AI System', scope: 'Both' },
                        { name: 'Record name', approval: 'Approved', type: 'Project', desc: 'Description', approvedWith: 'Anthropic, OpenAI', scope: 'Internal' },
                        { name: 'Record name', approval: 'Denied', type: 'Agent', desc: 'Description', approvedWith: 'Anthropic, OpenAI', scope: 'Both' },
                        { name: 'Record name', approval: 'Denied', type: 'Agent', desc: 'Description', approvedWith: 'Anthropic, OpenAI', scope: 'Both' },
                        { name: 'Record name', approval: 'Approved', type: 'Model', desc: 'Description', approvedWith: 'AI System', scope: 'External' },
                      ]
                        .filter((row) => acceptedInventoryFilter === 'all' || row.approval === acceptedInventoryFilter)
                        .map((row, i) => (
                        <div key={i} className="grid gap-4 py-3 border-b border-[#1e2130] last:border-0 hover:bg-[#1a1d2a] cursor-pointer transition-colors -mx-4 px-4 items-center"
                          style={{ gridTemplateColumns: '1fr 110px 100px 1fr 140px 110px' }}>
                          <p className="text-sm font-medium text-white">{row.name}</p>
                          <span className={`text-[10px] font-semibold px-2 py-0.5 rounded border w-fit ${
                            row.approval === 'Approved' 
                              ? 'border-[#00B935]/30 text-[#00B935]' 
                              : row.approval === 'Denied'
                              ? 'border-[#ef4444]/30 text-[#ef4444]'
                              : 'border-[#f59e0b]/30 text-[#f59e0b]'
                          }`}>{row.approval}</span>
                          <p className="text-xs text-[#9ca3af]">{row.type}</p>
                          <p className="text-xs text-[#9ca3af]">{row.desc}</p>
                          <p className="text-xs text-[#9ca3af]">{row.approvedWith}</p>
                          <p className="text-xs text-[#9ca3af]">{row.scope}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {aiGovAcceptableUseItem === 'accepted-use-policies' && (
                <div>
                  <h2 className="text-lg font-medium tracking-[-0.01em] text-white mb-2">Accepted Use Policies</h2>
                  <p className="text-[#9ca3af] mb-6">Define and manage acceptable use policies for AI systems across your organization.</p>
                  
                  <div className="grid grid-cols-2 gap-4 mb-6">
                    <div className="p-4 bg-[#13151f] border border-[#1e2130] rounded-lg">
                      <h3 className="text-sm font-medium text-white mb-2">Active Policies</h3>
                      <p className="text-2xl font-semibold text-[#00B935]">8</p>
                      <p className="text-xs text-[#9ca3af]">Currently enforced</p>
                    </div>
                    <div className="p-4 bg-[#13151f] border border-[#1e2130] rounded-lg">
                      <h3 className="text-sm font-medium text-white mb-2">Violations (30d)</h3>
                      <p className="text-2xl font-semibold text-[#ef4444]">12</p>
                      <p className="text-xs text-[#9ca3af]">Requires attention</p>
                    </div>
                  </div>

                  <div className="bg-[#13151f] border border-[#1e2130] rounded-lg overflow-hidden">
                    <div className="flex items-center justify-between px-4 py-3 bg-[#0f1117] border-b border-[#1e2130]">
                      <p className="text-sm font-semibold text-white">Policy Library</p>
                      <button className="flex items-center gap-2 px-3 py-1.5 bg-[#6CEEAD] text-[#0f1117] rounded-md text-xs font-medium hover:bg-[#5dd99c] transition-colors">
                        <Plus className="w-3 h-3" />
                        New Policy
                      </button>
                    </div>
                    <div className="px-4">
                      {[
                        { name: 'Generative AI Usage Policy', scope: 'Organization', status: 'Active' },
                        { name: 'Data Classification for AI', scope: 'Organization', status: 'Active' },
                        { name: 'External AI Tool Approval', scope: 'Organization', status: 'Active' },
                        { name: 'AI Output Review Requirements', scope: 'Dept-specific', status: 'Active' },
                        { name: 'Customer Data AI Usage', scope: 'Organization', status: 'Draft' },
                      ].map((policy, i) => (
                        <div key={i} className="grid gap-4 py-3 border-b border-[#1e2130] last:border-0 hover:bg-[#1a1d2a] cursor-pointer transition-colors -mx-4 px-4 items-center"
                          style={{ gridTemplateColumns: '1fr 120px 80px' }}>
                          <p className="text-sm font-medium text-white">{policy.name}</p>
                          <p className="text-xs text-[#9ca3af]">{policy.scope}</p>
                          <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full w-fit ${
                            policy.status === 'Active' ? 'bg-[#00B935]/10 text-[#00B935]' : 'bg-[#FFEF3C]/10 text-[#FFEF3C]'
                          }`}>{policy.status}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </>
        )}

        {aiGovTab === 'governance-packs' && (
          <div className="flex-1 p-6">
            <h2 className="text-lg font-medium tracking-[-0.01em] text-white mb-4">Governance Packs</h2>
            <p className="text-[#9ca3af] mb-6">Pre-built governance configurations for common AI use cases and regulatory requirements.</p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <div className="p-4 bg-[#13151f] border border-[#1e2130] rounded-lg hover:border-[#2a2d3a] transition-colors cursor-pointer">
                <h3 className="text-sm font-medium text-white mb-1">EU AI Act Compliance</h3>
                <p className="text-xs text-[#9ca3af] mb-3">Full compliance pack for EU AI Act requirements</p>
                <span className="text-xs px-2 py-1 rounded bg-[#00B935]/10 text-[#00B935]">Installed</span>
              </div>
              <div className="p-4 bg-[#13151f] border border-[#1e2130] rounded-lg hover:border-[#2a2d3a] transition-colors cursor-pointer">
                <h3 className="text-sm font-medium text-white mb-1">NIST AI RMF</h3>
                <p className="text-xs text-[#9ca3af] mb-3">NIST AI Risk Management Framework controls</p>
                <span className="text-xs px-2 py-1 rounded bg-[#00B935]/10 text-[#00B935]">Installed</span>
              </div>
              <div className="p-4 bg-[#13151f] border border-[#1e2130] rounded-lg hover:border-[#2a2d3a] transition-colors cursor-pointer">
                <h3 className="text-sm font-medium text-white mb-1">ISO 42001</h3>
                <p className="text-xs text-[#9ca3af] mb-3">AI Management System standard controls</p>
                <span className="text-xs px-2 py-1 rounded bg-[#0788F7]/10 text-[#0788F7]">Available</span>
              </div>
            </div>
          </div>
        )}

        {aiGovTab === 'inventory' && (
          <>
            {/* Secondary Rail */}
            <div className="w-48 border-r border-[#1e2130] bg-[#0f1117] py-4">
              <ul className="space-y-1 px-2">
                {inventoryItems.map((item) => (
                  <li key={item.id}>
                    <button
                      onClick={() => setAIGovInventoryItem(item.id)}
                      className={cn(
                        "w-full flex items-center gap-2 px-3 py-2 rounded-md text-sm transition-colors",
                        aiGovInventoryItem === item.id
                          ? "bg-[#6CEEAD]/10 text-[#6CEEAD]"
                          : "text-[#9ca3af] hover:bg-[#1e2130] hover:text-white"
                      )}
                    >
                      {item.icon}
                      <span>{item.label}</span>
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            {/* Main Content - Data Table */}
            <div className="flex-1 overflow-auto">
              <div className="p-6">
                {/* Table Header */}
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h2 className="text-lg font-medium tracking-[-0.01em] text-white">{getItemLabel()}</h2>
                    <p className="text-sm text-[#9ca3af]">{getItemCount()} items</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#4b5563]" />
                      <input
                        type="text"
                        placeholder="Search..."
                        className="pl-9 pr-4 py-2 bg-[#1e2130] border border-[#2a2d3a] rounded-md text-sm text-white placeholder-[#4b5563] focus:outline-none focus:border-[#6CEEAD]/50 w-64"
                      />
                    </div>
                    <button className="p-2 bg-[#1e2130] border border-[#2a2d3a] rounded-md text-[#9ca3af] hover:text-white hover:border-[#3a3d4a] transition-colors">
                      <Filter className="w-4 h-4" />
                    </button>
                    <button className="p-2 bg-[#1e2130] border border-[#2a2d3a] rounded-md text-[#9ca3af] hover:text-white hover:border-[#3a3d4a] transition-colors">
                      <Download className="w-4 h-4" />
                    </button>
                    <button className="flex items-center gap-2 px-3 py-2 bg-[#6CEEAD] text-[#0f1117] rounded-md text-sm font-medium hover:bg-[#5dd99c] transition-colors">
                      <Plus className="w-4 h-4" />
                      Add new
                    </button>
                  </div>
                </div>

                {/* Table */}
                <div className="bg-[#13151f] border border-[#1e2130] rounded-lg overflow-hidden">
                  {renderInventoryContent()}
                </div>
              </div>
            </div>
          </>
        )}

        {aiGovTab === 'objects' && (
          <div className="flex-1 p-6">
            <h2 className="text-lg font-medium tracking-[-0.01em] text-white mb-4">Objects</h2>
            <p className="text-[#9ca3af] mb-6">Reusable building blocks that can be connected across your AI inventory.</p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <div className="p-4 bg-[#13151f] border border-[#1e2130] rounded-lg hover:border-[#2a2d3a] transition-colors cursor-pointer">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-10 h-10 rounded-lg bg-[#0788F7]/10 flex items-center justify-center">
                    <FileText className="w-5 h-5 text-[#0788F7]" />
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-white">Frameworks</h3>
                    <p className="text-xs text-[#9ca3af]">Compliance and governance frameworks</p>
                  </div>
                </div>
              </div>
              <div className="p-4 bg-[#13151f] border border-[#1e2130] rounded-lg hover:border-[#2a2d3a] transition-colors cursor-pointer">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-10 h-10 rounded-lg bg-[#00B935]/10 flex items-center justify-center">
                    <Settings className="w-5 h-5 text-[#00B935]" />
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-white">Controls</h3>
                    <p className="text-xs text-[#9ca3af]">Security and compliance controls</p>
                  </div>
                </div>
              </div>
              <div className="p-4 bg-[#13151f] border border-[#1e2130] rounded-lg hover:border-[#2a2d3a] transition-colors cursor-pointer">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-10 h-10 rounded-lg bg-[#FFEF3C]/10 flex items-center justify-center">
                    <FileText className="w-5 h-5 text-[#FFEF3C]" />
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-white">Templates</h3>
                    <p className="text-xs text-[#9ca3af]">Reusable assessment templates</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {aiGovTab === 'ai-policies' && (
          <div className="flex-1 p-6">
            <h2 className="text-lg font-medium tracking-[-0.01em] text-white mb-4">AI Policies</h2>
            <p className="text-[#9ca3af] mb-6">Policy engine that enforces guardrails and automated actions across your AI systems.</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 bg-[#13151f] border border-[#1e2130] rounded-lg">
                <h3 className="text-sm font-medium text-white mb-2">Active Policies</h3>
                <p className="text-2xl font-semibold text-[#00B935]">12</p>
                <p className="text-xs text-[#9ca3af]">Enforcing guardrails</p>
              </div>
              <div className="p-4 bg-[#13151f] border border-[#1e2130] rounded-lg">
                <h3 className="text-sm font-medium text-white mb-2">Pending Review</h3>
                <p className="text-2xl font-semibold text-[#FFEF3C]">3</p>
                <p className="text-xs text-[#9ca3af]">Awaiting approval</p>
              </div>
            </div>
            <div className="mt-6">
              <h3 className="text-sm font-medium text-white mb-3">Recent Policies</h3>
              <div className="space-y-2">
                {['Data Retention Policy', 'Model Training Guidelines', 'PII Handling Requirements', 'Bias Detection Protocol'].map((policy, i) => (
                  <div key={policy} className="p-3 bg-[#13151f] border border-[#1e2130] rounded-lg flex items-center justify-between hover:border-[#2a2d3a] cursor-pointer transition-colors">
                    <span className="text-sm text-white">{policy}</span>
                    <span className={`text-xs px-2 py-1 rounded ${i < 3 ? 'bg-[#00B935]/10 text-[#00B935]' : 'bg-[#FFEF3C]/10 text-[#FFEF3C]'}`}>
                      {i < 3 ? 'Active' : 'Draft'}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
