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
  ScrollText,
  ChevronDown,
  X,
  MoreHorizontal,
  RefreshCw,
  GripVertical,
  ArrowLeft
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
  const [inventoryTypeFilter, setInventoryTypeFilter] = useState<'all' | 'Model' | 'AI System' | 'Agent' | 'Project'>('all')
  const [policyOutcomeFilter, setPolicyOutcomeFilter] = useState<'all' | 'Auto-approved' | 'Requires review' | 'Denied'>('all')
  const [policyTypeFilter, setPolicyTypeFilter] = useState<'all' | 'model-providers' | 'vendors'>('all')
  const [policySearchQuery, setPolicySearchQuery] = useState('')
  const [showAddAcceptedUseForm, setShowAddAcceptedUseForm] = useState(false)
  const [acceptedUseFormStep, setAcceptedUseFormStep] = useState<1 | 2>(1)
  const [showDiscardModal, setShowDiscardModal] = useState(false)
  
  // Add Accepted Use Form State
  const [formRecordType, setFormRecordType] = useState('')
  const [formName, setFormName] = useState('')
  const [formDescription, setFormDescription] = useState('')
  const [formOutcome, setFormOutcome] = useState<'Approved' | 'Needs additional review' | 'Denied'>('Approved')
  const [formApplyOutcome, setFormApplyOutcome] = useState<'auto-apply' | 'flag-admin'>('auto-apply')
  const [advancedRules, setAdvancedRules] = useState(false)
  const [conditionPairings, setConditionPairings] = useState([
    { id: 1, field: 'Model Provider', value: 'Anthropic', operator: 'AND' as 'AND' | 'OR' },
    { id: 2, field: 'Use type', value: 'Internal Use', operator: 'AND' as 'AND' | 'OR' },
  ])
  
  // Policies State
  const [policies, setPolicies] = useState([
    {
      id: 1,
      title: 'Anthropic models on Databricks',
      activeRecords: 2,
      conditions: 2,
      description: 'Approves use of Anthropic models when deployed on Databricks platform for low-risk use cases',
      outcome: 'Auto-approved',
      useType: 'Model, AI System',
      model: 'Claude Sonnet 3.5',
      modelIcon: '✦',
      modelProvider: 'Anthropic',
      useCondition: "applies when model's risk level is low risk if all linked models' vendor...",
      isActive: true,
      conditionsList: [
        { id: 1, field: 'Risk', operand: 'is equal to', value: 'Low Risk', operator: 'AND' as 'AND' | 'OR' },
        { id: 2, field: 'Vendor', operand: 'is equal to', value: 'Anthropic', operator: 'AND' as 'AND' | 'OR' },
      ],
      linkedRecords: [
        { name: 'Claude Sonnet 3.5', approval: 'Approved', type: 'Model', description: 'Language model for text generation', approvedWith: 'DataBricks', internal: 'Internal' },
        { name: 'AI Assistant System', approval: 'Approved', type: 'AI System', description: 'Internal chatbot system', approvedWith: 'Anthropic, OpenAI', internal: 'Internal' },
      ]
    },
    {
      id: 2,
      title: 'External-facing AI systems require review',
      activeRecords: 2,
      conditions: 1,
      description: 'All AI systems marked as external-facing are not automatically approved and require manual review',
      outcome: 'Requires review',
      useType: 'AI System',
      useCondition: 'applies when AI system is marked external-facing',
      isActive: true,
      conditionsList: [
        { id: 1, field: 'Use type', operand: 'is equal to', value: 'External Use', operator: 'AND' as 'AND' | 'OR' },
      ],
      linkedRecords: [
        { name: 'Customer Support Bot', approval: 'Approved', type: 'AI System', description: 'External customer chatbot', approvedWith: 'Anthropic, OpenAI', internal: 'External' },
        { name: 'Sales Assistant', approval: 'Denied', type: 'AI System', description: 'External sales automation', approvedWith: 'Anthropic, OpenAI', internal: 'External' },
      ]
    },
    {
      id: 3,
      title: 'Google Cloud AI for internal use',
      activeRecords: 4,
      conditions: 3,
      description: 'Approves use of Google Cloud AI services for internal-facing applications',
      outcome: 'Auto-approved',
      useType: 'Model, AI Systems, Vendors',
      model: 'Gemini',
      modelIcon: '✦',
      modelProvider: 'Google',
      vendor: 'All',
      useCondition: "applies when models' vendor name (via model-source) is Google and is marked Internal facing",
      isActive: true,
      conditionsList: [
        { id: 1, field: 'Model Provider', operand: 'is equal to', value: 'Google', operator: 'AND' as 'AND' | 'OR' },
        { id: 2, field: 'Use type', operand: 'is equal to', value: 'Internal Use', operator: 'AND' as 'AND' | 'OR' },
        { id: 3, field: 'Risk level', operand: 'is equal to', value: 'Low', operator: 'AND' as 'AND' | 'OR' },
      ],
      linkedRecords: [
        { name: 'Gemini Pro', approval: 'Approved', type: 'Model', description: 'Multimodal AI model', approvedWith: 'Google Cloud', internal: 'Internal' },
        { name: 'Vertex AI Pipeline', approval: 'Approved', type: 'AI System', description: 'ML pipeline system', approvedWith: 'Google', internal: 'Internal' },
        { name: 'Document AI', approval: 'Approved', type: 'Model', description: 'Document processing', approvedWith: 'Google', internal: 'Internal' },
        { name: 'Translation API', approval: 'Approved', type: 'AI System', description: 'Language translation', approvedWith: 'Google', internal: 'Internal' },
      ]
    },
    {
      id: 4,
      title: 'Restricted data processing',
      activeRecords: 1,
      conditions: 2,
      description: 'AI systems processing restricted-sensitivity data are not automatically approved',
      outcome: 'Requires review',
      useType: 'AI Systems, Datasets',
      useCondition: "applies when data classification is restricted",
      isActive: false,
      conditionsList: [
        { id: 1, field: 'Data classification', operand: 'is equal to', value: 'Restricted', operator: 'AND' as 'AND' | 'OR' },
        { id: 2, field: 'Risk level', operand: 'is equal to', value: 'High', operator: 'AND' as 'AND' | 'OR' },
      ],
      linkedRecords: [
        { name: 'PII Processing System', approval: 'Denied', type: 'AI System', description: 'Handles sensitive PII', approvedWith: 'Internal', internal: 'Internal' },
      ]
    },
    {
      id: 5,
      title: 'OpenAI GPT-4 Enterprise Policy',
      activeRecords: 5,
      conditions: 2,
      description: 'Defines acceptable use for OpenAI GPT-4 models in enterprise applications',
      outcome: 'Auto-approved',
      useType: 'Model, AI System',
      model: 'GPT-4',
      modelIcon: '✦',
      modelProvider: 'OpenAI',
      useCondition: "applies when model provider is OpenAI and use case is approved",
      isActive: true,
      conditionsList: [
        { id: 1, field: 'Model Provider', operand: 'is equal to', value: 'OpenAI', operator: 'AND' as 'AND' | 'OR' },
        { id: 2, field: 'Use type', operand: 'is equal to', value: 'Internal Use', operator: 'AND' as 'AND' | 'OR' },
      ],
      linkedRecords: [
        { name: 'GPT-4 Turbo', approval: 'Approved', type: 'Model', description: 'Advanced language model', approvedWith: 'Azure', internal: 'Internal' },
        { name: 'Code Assistant', approval: 'Approved', type: 'AI System', description: 'Developer tooling', approvedWith: 'OpenAI', internal: 'Internal' },
        { name: 'Content Generator', approval: 'Approved', type: 'AI System', description: 'Marketing content', approvedWith: 'OpenAI', internal: 'Internal' },
        { name: 'Data Analyzer', approval: 'Approved', type: 'Model', description: 'Analytics model', approvedWith: 'OpenAI', internal: 'Internal' },
        { name: 'Summary Bot', approval: 'Approved', type: 'AI System', description: 'Document summarization', approvedWith: 'OpenAI', internal: 'Internal' },
      ]
    },
    {
      id: 6,
      title: 'Microsoft Azure AI Services',
      activeRecords: 3,
      conditions: 1,
      description: 'Governs use of Microsoft Azure AI and Cognitive Services',
      outcome: 'Auto-approved',
      useType: 'Model, Vendors',
      model: 'Azure OpenAI',
      modelIcon: '✦',
      modelProvider: 'Microsoft',
      vendor: 'Microsoft',
      useCondition: "applies when vendor is Microsoft and deployment is Azure",
      isActive: true,
      conditionsList: [
        { id: 1, field: 'Model Provider', operand: 'is equal to', value: 'Microsoft', operator: 'AND' as 'AND' | 'OR' },
      ],
      linkedRecords: [
        { name: 'Azure OpenAI Service', approval: 'Approved', type: 'Model', description: 'Enterprise AI service', approvedWith: 'Microsoft', internal: 'Internal' },
        { name: 'Cognitive Services', approval: 'Approved', type: 'AI System', description: 'Vision and speech APIs', approvedWith: 'Microsoft', internal: 'Internal' },
        { name: 'Bot Framework', approval: 'Approved', type: 'AI System', description: 'Chatbot platform', approvedWith: 'Microsoft', internal: 'External' },
      ]
    },
    {
      id: 7,
      title: 'Figma AI Features Policy',
      activeRecords: 2,
      conditions: 1,
      description: 'Controls use of AI-powered features within Figma design tools',
      outcome: 'Auto-approved',
      useType: 'Vendors',
      vendor: 'Figma',
      useCondition: "applies when using Figma AI features for design work",
      isActive: true,
      conditionsList: [
        { id: 1, field: 'Deployment', operand: 'is equal to', value: 'Production', operator: 'AND' as 'AND' | 'OR' },
      ],
      linkedRecords: [
        { name: 'Figma AI Assist', approval: 'Approved', type: 'Vendors', description: 'Design assistance', approvedWith: 'Figma', internal: 'Internal' },
        { name: 'Auto Layout AI', approval: 'Approved', type: 'Vendors', description: 'Layout generation', approvedWith: 'Figma', internal: 'Internal' },
      ]
    },
    {
      id: 8,
      title: 'Salesforce Einstein Restrictions',
      activeRecords: 1,
      conditions: 3,
      description: 'Restricts Salesforce Einstein AI for customer data processing',
      outcome: 'Denied',
      useType: 'Vendors, Datasets',
      vendor: 'Salesforce',
      useCondition: "applies when processing PII data through Einstein",
      isActive: false,
      conditionsList: [
        { id: 1, field: 'Data classification', operand: 'is equal to', value: 'Restricted', operator: 'AND' as 'AND' | 'OR' },
        { id: 2, field: 'Use type', operand: 'is equal to', value: 'Customer Facing', operator: 'AND' as 'AND' | 'OR' },
        { id: 3, field: 'Risk level', operand: 'is equal to', value: 'High', operator: 'AND' as 'AND' | 'OR' },
      ],
      linkedRecords: [
        { name: 'Einstein Analytics', approval: 'Denied', type: 'Vendors', description: 'CRM AI features', approvedWith: 'Salesforce', internal: 'External' },
      ]
    },
  ])
  
  const [selectedPolicy, setSelectedPolicy] = useState<number | null>(null)
  const [policyDetailExpanded, setPolicyDetailExpanded] = useState(true)
  const [policyMenuOpen, setPolicyMenuOpen] = useState(false)

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
                      onClick={() => {
                        if (showAddAcceptedUseForm && item.id === 'accepted-use-policies') {
                          setShowDiscardModal(true)
                        } else {
                          setAIGovAcceptableUseItem(item.id)
                        }
                      }}
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

            {/* Discard Modal */}
            {showDiscardModal && (
              <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
                <div className="bg-[#13151f] border border-[#1e2130] rounded-lg p-6 max-w-md w-full mx-4">
                  <h3 className="text-lg font-medium text-white mb-2">Discard changes?</h3>
                  <p className="text-sm text-[#9ca3af] mb-6">
                    Do you want to discard this acceptable use policy? Any unsaved changes will be lost.
                  </p>
                  <div className="flex items-center justify-end gap-3">
                    <button
                      onClick={() => setShowDiscardModal(false)}
                      className="px-4 py-2 text-[#9ca3af] hover:text-white rounded-md text-sm font-medium transition-colors"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={() => {
                        setShowDiscardModal(false)
                        setShowAddAcceptedUseForm(false)
                        setAcceptedUseFormStep(1)
                        setFormRecordType('')
                        setFormName('')
                        setFormDescription('')
                        setFormOutcome('Approved')
                        setFormApplyOutcome('auto-apply')
                        setConditionPairings([
                          { id: 1, field: 'Model Provider', value: 'Anthropic', operator: 'AND' as 'AND' | 'OR' },
                          { id: 2, field: 'Use type', value: 'Internal Use', operator: 'AND' as 'AND' | 'OR' },
                        ])
                        setAIGovAcceptableUseItem('accepted-use-policies')
                      }}
                      className="px-4 py-2 bg-[#ef4444] text-white rounded-md text-sm font-medium hover:bg-[#dc2626] transition-colors"
                    >
                      Yes, discard
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Main Content */}
            <div className="flex-1 overflow-auto p-6">
              {aiGovAcceptableUseItem === 'accepted-inventory' && (
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <h2 className="text-lg font-medium tracking-[-0.01em] text-white mb-1">Inventory</h2>
                      <p className="text-[#9ca3af] text-sm">AI systems and tools that have been approved for use within your organization.</p>
                    </div>
                    <select 
                      value={inventoryTypeFilter}
                      onChange={(e) => setInventoryTypeFilter(e.target.value as 'all' | 'Model' | 'AI System' | 'Agent' | 'Project')}
                      className="px-3 py-1.5 bg-[#13151f] border border-[#1e2130] rounded-md text-xs text-white"
                    >
                      <option value="all">All types</option>
                      <option value="Model">Models</option>
                      <option value="AI System">AI Systems</option>
                      <option value="Agent">Agents</option>
                      <option value="Project">Projects</option>
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
                        .filter((row) => inventoryTypeFilter === 'all' || row.type === inventoryTypeFilter)
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
                <div className="flex flex-col flex-1 overflow-hidden">
                  {/* Header */}
                  <div className="px-6 pt-6 pb-4 flex items-start justify-between">
                    <div>
                      {selectedPolicy !== null ? (
                        <div className="flex items-center gap-3">
                          <button
                            onClick={() => setSelectedPolicy(null)}
                            className="p-1 text-[#9ca3af] hover:text-white transition-colors"
                          >
                            <ArrowLeft className="w-5 h-5" />
                          </button>
                          <div>
                            <h2 className="text-lg font-medium tracking-[-0.01em] text-white mb-1">
                              Acceptable Use Policy Details
                            </h2>
                          </div>
                        </div>
                      ) : (
                        <>
                          <h2 className="text-lg font-medium tracking-[-0.01em] text-white mb-1">
                            {showAddAcceptedUseForm ? 'Add Accepted Use Policy' : 'Acceptable Use Policies'}
                          </h2>
                          <p className="text-[#9ca3af] text-sm">Define and manage acceptable use policies for AI systems across your organization.</p>
                        </>
                      )}
                    </div>
                    {!showAddAcceptedUseForm && selectedPolicy === null && (
                      <button 
                        onClick={() => setShowAddAcceptedUseForm(true)}
                        className="flex items-center gap-2 px-3 py-1.5 bg-[#6CEEAD] text-[#0f1117] rounded-md text-xs font-medium hover:bg-[#5dd99c] transition-colors"
                      >
                        <Plus className="w-3 h-3" />
                        Add accepted use
                      </button>
                    )}
                  </div>

                  {showAddAcceptedUseForm && acceptedUseFormStep === 1 ? (
                    /* Add Accepted Use Form - Step 1 */
                    <div className="flex-1 overflow-y-auto p-6">
                      <div className="max-w-2xl">
                        <h3 className="text-lg font-medium text-white mb-6">Define condition details</h3>

                        {/* Record types to evaluate */}
                        <div className="mb-6">
                          <label className="block text-sm font-medium text-[#9ca3af] mb-1">Record types to evaluate</label>
                          <p className="text-xs text-[#4b5563] mb-2">Define which record type this condition evaluates. Logic conditions can reference attributes on the selected record or on any directly linked record type.</p>
                          <select
                            value={formRecordType}
                            onChange={(e) => setFormRecordType(e.target.value)}
                            className="w-64 px-3 py-2 bg-white text-[#0f1117] rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-[#6CEEAD]"
                          >
                            <option value="">Select record types</option>
                            <option value="model">Model</option>
                            <option value="ai-system">AI System</option>
                            <option value="agent">Agent</option>
                            <option value="project">Project</option>
                            <option value="dataset">Dataset</option>
                            <option value="vendor">Vendor</option>
                          </select>
                        </div>

                        {/* Name of accepted use */}
                        <div className="mb-6">
                          <label className="block text-sm font-medium text-[#9ca3af] mb-2">Name of accepted use</label>
                          <input
                            type="text"
                            value={formName}
                            onChange={(e) => setFormName(e.target.value)}
                            placeholder="e.g., Anthropic use for internal use"
                            className="w-full max-w-lg px-3 py-2 bg-white text-[#0f1117] rounded-md text-sm placeholder:text-[#9ca3af] focus:outline-none focus:ring-2 focus:ring-[#6CEEAD]"
                          />
                        </div>

                        {/* Description */}
                        <div className="mb-6">
                          <label className="block text-sm font-medium text-[#9ca3af] mb-2">Description</label>
                          <textarea
                            value={formDescription}
                            onChange={(e) => setFormDescription(e.target.value)}
                            placeholder="e.g, Approved for internal use only"
                            rows={4}
                            className="w-full max-w-lg px-3 py-2 bg-white text-[#0f1117] rounded-md text-sm placeholder:text-[#9ca3af] focus:outline-none focus:ring-2 focus:ring-[#6CEEAD] resize-y"
                          />
                        </div>

                        {/* Outcome when condition is met */}
                        <div className="mb-6">
                          <label className="block text-sm font-medium text-[#9ca3af] mb-1">What is the outcome when the condition is met?</label>
                          <p className="text-xs text-[#4b5563] mb-3">Apply this status when all conditions are met. If all conditions are not met, the intake will continue through normal workflow.</p>
                          <div className="flex items-center gap-2">
                            <button
                              onClick={() => setFormOutcome('Approved')}
                              className={cn(
                                "px-4 py-2 rounded-md text-sm font-medium transition-colors",
                                formOutcome === 'Approved'
                                  ? "bg-[#3a3a3a] text-white"
                                  : "text-[#9ca3af] hover:text-white"
                              )}
                            >
                              Approved
                            </button>
                            <button
                              onClick={() => setFormOutcome('Needs additional review')}
                              className={cn(
                                "px-4 py-2 rounded-md text-sm font-medium transition-colors",
                                formOutcome === 'Needs additional review'
                                  ? "bg-[#3a3a3a] text-white"
                                  : "text-[#9ca3af] hover:text-white"
                              )}
                            >
                              Needs additional review
                            </button>
                            <button
                              onClick={() => setFormOutcome('Denied')}
                              className={cn(
                                "px-4 py-2 rounded-md text-sm font-medium transition-colors",
                                formOutcome === 'Denied'
                                  ? "bg-[#3a3a3a] text-white"
                                  : "text-[#9ca3af] hover:text-white"
                              )}
                            >
                              Denied
                            </button>
                          </div>
                        </div>

                        {/* When to apply the outcome */}
                        <div className="mb-8">
                          <label className="block text-sm font-medium text-[#9ca3af] mb-3">When to apply the outcome</label>
                          <div className="flex items-center gap-2">
                            <button
                              onClick={() => setFormApplyOutcome('auto-apply')}
                              className={cn(
                                "px-4 py-2 rounded-md text-sm font-medium transition-colors",
                                formApplyOutcome === 'auto-apply'
                                  ? "bg-[#3a3a3a] text-white"
                                  : "text-[#9ca3af] hover:text-white"
                              )}
                            >
                              Auto-apply outcome
                            </button>
                            <button
                              onClick={() => setFormApplyOutcome('flag-admin')}
                              className={cn(
                                "px-4 py-2 rounded-md text-sm font-medium transition-colors",
                                formApplyOutcome === 'flag-admin'
                                  ? "bg-[#3a3a3a] text-white"
                                  : "text-[#9ca3af] hover:text-white"
                              )}
                            >
                              Flag for admin confirmation
                            </button>
                          </div>
                        </div>

                        {/* Form Actions */}
                        <div className="flex items-center gap-3">
                          <button
                            onClick={() => setAcceptedUseFormStep(2)}
                            className="px-4 py-2 bg-[#6CEEAD] text-[#0f1117] rounded-md text-sm font-medium hover:bg-[#5dd99c] transition-colors"
                          >
                            Next
                          </button>
                          <button
                            onClick={() => {
                              setShowAddAcceptedUseForm(false)
                              setAcceptedUseFormStep(1)
                              setFormRecordType('')
                              setFormName('')
                              setFormDescription('')
                              setFormOutcome('Approved')
                              setFormApplyOutcome('auto-apply')
                            }}
                            className="px-4 py-2 text-[#9ca3af] hover:text-white rounded-md text-sm font-medium transition-colors"
                          >
                            Cancel
                          </button>
                        </div>
                      </div>
                    </div>
                  ) : showAddAcceptedUseForm && acceptedUseFormStep === 2 ? (
                    /* Step 2: Define Condition */
                    <div className="flex-1 overflow-y-auto p-6">
                      {/* Header */}
                      <div className="flex items-center justify-between mb-6">
                        <h3 className="text-lg font-medium text-white">Define condition</h3>
                        <div className="flex items-center gap-2">
                          <span className="text-sm text-[#9ca3af]">Advanced rules</span>
                          <button
                            onClick={() => setAdvancedRules(!advancedRules)}
                            className={cn(
                              "w-10 h-5 rounded-full transition-colors relative",
                              advancedRules ? "bg-[#6CEEAD]" : "bg-[#3a3a3a]"
                            )}
                          >
                            <span className={cn(
                              "absolute top-0.5 w-4 h-4 rounded-full bg-white transition-transform",
                              advancedRules ? "left-5" : "left-0.5"
                            )} />
                          </button>
                        </div>
                      </div>

                      {advancedRules ? (
                        /* Advanced Rules View */
                        <>
                          {/* Summary Card Header */}
                          <div className="bg-[#13151f] border border-[#1e2130] rounded-lg mb-6">
                            <div className="p-4 border-b border-[#1e2130]">
                              <div className="flex items-start justify-between">
                                <div>
                                  <h4 className="text-base font-semibold text-white">
                                    {formName || 'Anthropic for internal use'}
                                  </h4>
                                  <p className="text-sm text-[#9ca3af] mt-0.5">
                                    {formDescription || 'Approved for internal use only'}
                                  </p>
                                </div>
                                <div className="flex items-center gap-2">
                                  <button className="p-1 text-[#9ca3af] hover:text-white transition-colors">
                                    <MoreHorizontal className="w-5 h-5" />
                                  </button>
                                  <button className="p-1 text-[#9ca3af] hover:text-white transition-colors">
                                    <ChevronDown className="w-5 h-5" />
                                  </button>
                                </div>
                              </div>
                            </div>

                            {/* Metadata Row */}
                            <div className="px-4 py-3 flex items-center gap-6 text-sm border-b border-[#1e2130]">
                              <div className="flex items-center gap-2">
                                <span className="text-[#9ca3af]">Record type:</span>
                                <span className="text-white">{formRecordType || 'Model'}</span>
                              </div>
                              <div className="flex items-center gap-2">
                                <span className="text-[#9ca3af]">Outcome:</span>
                                <span className="px-2 py-0.5 rounded border border-[#1e2130] text-white text-xs">
                                  {formOutcome === 'Approved' ? 'Approved' : formOutcome === 'Denied' ? 'Denied' : 'Needs review'}
                                </span>
                              </div>
                              <div className="flex items-center gap-2">
                                <span className="text-[#9ca3af]">Auto-apply outcome:</span>
                                <span className="text-white">{formApplyOutcome === 'auto-apply' ? 'True' : 'False'}</span>
                              </div>
                            </div>

                            {/* Rule Summary */}
                            <div className="p-4 border-b border-[#1e2130]">
                              <div className="flex items-center justify-between mb-1">
                                <h4 className="text-sm font-medium text-white">Rule summary</h4>
                                <button className="p-1 text-[#9ca3af] hover:text-white transition-colors">
                                  <RefreshCw className="w-4 h-4" />
                                </button>
                              </div>
                              <p className="text-xs text-[#9ca3af] mb-3">Plain language preview</p>
                              <div className="bg-[#0f1117] border border-[#1e2130] rounded-md p-3 flex flex-wrap items-center gap-2">
                                <span className="px-2 py-1 border border-[#1e2130] rounded text-xs text-white font-medium">
                                  {formOutcome === 'Approved' ? 'APPROVE' : formOutcome === 'Denied' ? 'DENY' : 'REVIEW'}
                                </span>
                                <span className="text-sm text-[#9ca3af]">as acceptable use</span>
                                <span className="px-2 py-1 border border-[#1e2130] rounded text-xs text-white font-medium">IF</span>
                                {conditionPairings.map((pairing, index) => (
                                  <span key={pairing.id} className="flex items-center gap-2">
                                    <span className="text-sm text-white">{pairing.field}</span>
                                    <span className="text-sm text-[#9ca3af]">operand</span>
                                    <span className="text-sm text-[#9ca3af]">&quot;{pairing.value || '-'}&quot;</span>
                                    {index < conditionPairings.length - 1 && (
                                      <span className="px-2 py-1 border border-[#1e2130] rounded text-xs text-white font-medium">
                                        {pairing.operator}
                                      </span>
                                    )}
                                  </span>
                                ))}
                              </div>
                            </div>

                            {/* Conditions Section */}
                            <div className="p-4">
                              <div className="flex items-center justify-between mb-1">
                                <div className="flex items-center gap-2">
                                  <h4 className="text-sm font-medium text-white">Conditions</h4>
                                  <div className="w-4 h-4 rounded-full border border-[#4b5563] flex items-center justify-center">
                                    <span className="text-[10px] text-[#4b5563]">?</span>
                                  </div>
                                </div>
                                <button className="p-1 text-[#9ca3af] hover:text-white transition-colors">
                                  <RefreshCw className="w-4 h-4" />
                                </button>
                              </div>
                              <p className="text-xs text-[#9ca3af] mb-4">Define conditions that surround this rule</p>

                              {/* Condition Rows */}
                              <div className="space-y-0">
                                {conditionPairings.map((pairing, index) => (
                                  <div key={pairing.id}>
                                    <div className="flex items-center gap-3 py-2">
                                      {/* Row Number */}
                                      <div className="w-6 h-6 rounded-full border border-[#1e2130] flex items-center justify-center text-xs text-[#9ca3af]">
                                        {index + 1}
                                      </div>
                                      
                                      {/* Drag Handle */}
                                      <button className="text-[#4b5563] hover:text-[#9ca3af] cursor-grab">
                                        <GripVertical className="w-4 h-4" />
                                      </button>

                                      {/* Variable Dropdown */}
                                      <select
                                        value={pairing.field}
                                        onChange={(e) => {
                                          const updated = [...conditionPairings]
                                          updated[index].field = e.target.value
                                          setConditionPairings(updated)
                                        }}
                                        className="w-40 px-3 py-2 bg-[#0f1117] text-[#9ca3af] rounded-md text-sm border border-[#1e2130] focus:outline-none focus:border-[#6CEEAD]"
                                      >
                                        <option value="">Variable</option>
                                        <option value="Model Provider">Model Provider</option>
                                        <option value="Use type">Use type</option>
                                        <option value="Risk level">Risk level</option>
                                        <option value="Data classification">Data classification</option>
                                        <option value="Deployment">Deployment</option>
                                        <option value="Workflow stage">Workflow stage</option>
                                      </select>

                                      {/* Operand Dropdown */}
                                      <select
                                        className="w-32 px-3 py-2 bg-[#0f1117] text-[#9ca3af] rounded-md text-sm border border-[#1e2130] focus:outline-none focus:border-[#6CEEAD]"
                                      >
                                        <option value="equals">equals</option>
                                        <option value="not_equals">not equals</option>
                                        <option value="contains">contains</option>
                                        <option value="starts_with">starts with</option>
                                        <option value="ends_with">ends with</option>
                                      </select>

                                      {/* Value Dropdown */}
                                      <select
                                        value={pairing.value}
                                        onChange={(e) => {
                                          const updated = [...conditionPairings]
                                          updated[index].value = e.target.value
                                          setConditionPairings(updated)
                                        }}
                                        className="w-40 px-3 py-2 bg-[#0f1117] text-[#9ca3af] rounded-md text-sm border border-[#1e2130] focus:outline-none focus:border-[#6CEEAD]"
                                      >
                                        <option value="">value</option>
                                        {pairing.field === 'Model Provider' && (
                                          <>
                                            <option value="Anthropic">Anthropic</option>
                                            <option value="OpenAI">OpenAI</option>
                                            <option value="Google">Google</option>
                                            <option value="Microsoft">Microsoft</option>
                                            <option value="Meta">Meta</option>
                                            <option value="Cohere">Cohere</option>
                                          </>
                                        )}
                                        {pairing.field === 'Use type' && (
                                          <>
                                            <option value="Internal Use">Internal Use</option>
                                            <option value="External Use">External Use</option>
                                            <option value="Customer Facing">Customer Facing</option>
                                            <option value="Research">Research</option>
                                            <option value="Development">Development</option>
                                          </>
                                        )}
                                        {pairing.field === 'Risk level' && (
                                          <>
                                            <option value="Low">Low</option>
                                            <option value="Medium">Medium</option>
                                            <option value="High">High</option>
                                            <option value="Critical">Critical</option>
                                          </>
                                        )}
                                        {pairing.field === 'Data classification' && (
                                          <>
                                            <option value="Public">Public</option>
                                            <option value="Internal">Internal</option>
                                            <option value="Confidential">Confidential</option>
                                            <option value="Restricted">Restricted</option>
                                          </>
                                        )}
                                        {pairing.field === 'Deployment' && (
                                          <>
                                            <option value="Production">Production</option>
                                            <option value="Staging">Staging</option>
                                            <option value="Development">Development</option>
                                            <option value="Testing">Testing</option>
                                          </>
                                        )}
                                        {pairing.field === 'Workflow stage' && (
                                          <>
                                            <option value="Intake">Intake</option>
                                            <option value="Review">Review</option>
                                            <option value="Approval">Approval</option>
                                            <option value="Implementation">Implementation</option>
                                            <option value="Monitoring">Monitoring</option>
                                            <option value="Retirement">Retirement</option>
                                          </>
                                        )}
                                      </select>

                                      {/* Delete Button */}
                                      {index > 0 && (
                                        <button 
                                          onClick={() => {
                                            setConditionPairings(conditionPairings.filter(p => p.id !== pairing.id))
                                          }}
                                          className="p-1 text-[#9ca3af] hover:text-[#ef4444] transition-colors"
                                        >
                                          <X className="w-4 h-4" />
                                        </button>
                                      )}
                                    </div>

                                    {/* AND/OR Connector */}
                                    {index < conditionPairings.length - 1 && (
                                      <div className="flex items-center gap-3 py-2 pl-9">
                                        <div className="w-px h-4 bg-[#1e2130] ml-3"></div>
                                        <button
                                          onClick={() => {
                                            const updated = [...conditionPairings]
                                            updated[index].operator = pairing.operator === 'AND' ? 'OR' : 'AND'
                                            setConditionPairings(updated)
                                          }}
                                          className="px-2 py-1 border border-[#1e2130] rounded text-xs text-white font-medium hover:bg-[#1e2130] transition-colors cursor-pointer"
                                        >
                                          {pairing.operator}
                                        </button>
                                        <span className="text-xs text-[#9ca3af]">
                                          {pairing.operator === 'AND' ? 'and also match this' : 'or match this instead'}
                                        </span>
                                      </div>
                                    )}
                                  </div>
                                ))}
                              </div>

                              {/* Add Buttons */}
                              <div className="flex items-center gap-4 mt-4">
                                <button
                                  onClick={() => {
                                    setConditionPairings([
                                      ...conditionPairings,
                                      { id: Date.now(), field: '', value: '', operator: 'AND' as 'AND' | 'OR' }
                                    ])
                                  }}
                                  className="flex items-center gap-1 px-3 py-1.5 bg-[#0f1117] text-white rounded-md text-sm border border-[#1e2130] hover:bg-[#1e2130] transition-colors"
                                >
                                  <Plus className="w-3 h-3" />
                                  Add condition
                                </button>
                                <button
                                  className="flex items-center gap-1 px-3 py-1.5 text-[#9ca3af] hover:text-white rounded-md text-sm transition-colors"
                                >
                                  <Plus className="w-3 h-3" />
                                  Add group
                                </button>
                              </div>
                            </div>
                          </div>
                        </>
                      ) : (
                      /* Simple View - Summary Card with Build Accepted AI Use Pairings */
                      <div className="bg-[#13151f] border border-[#1e2130] rounded-lg mb-6">
                        <div className="p-4 border-b border-[#1e2130]">
                          <div>
                            <h4 className="text-base font-semibold text-white">
                              {formName || 'Anthropic for internal use'}
                            </h4>
                            <p className="text-sm text-[#9ca3af] mt-0.5">
                              {formDescription || 'Approved for internal use only'}
                            </p>
                          </div>
                        </div>
                        <div className="px-4 py-3 flex items-center gap-6 text-sm border-b border-[#1e2130]">
                          <div className="flex items-center gap-2">
                            <span className="text-[#9ca3af]">Record type:</span>
                            <span className="text-white">{formRecordType || 'Model'}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <span className="text-[#9ca3af]">Outcome:</span>
                            <span className="px-2 py-0.5 rounded border border-[#1e2130] text-white text-xs">
                              {formOutcome === 'Approved' ? 'Approved' : formOutcome === 'Denied' ? 'Denied' : 'Needs review'}
                            </span>
                          </div>
                          <div className="flex items-center gap-2">
                            <span className="text-[#9ca3af]">Auto-apply outcome:</span>
                            <span className="text-white">{formApplyOutcome === 'auto-apply' ? 'True' : 'False'}</span>
                          </div>
                        </div>

                        {/* Build Accepted AI Use Pairings - Inside Card */}
                        <div className="p-4">
                          <div className="flex items-center gap-2 mb-1">
                            <h4 className="text-sm font-medium text-white">Build Accepted AI Use Pairings</h4>
                            <div className="w-4 h-4 rounded-full border border-[#4b5563] flex items-center justify-center">
                              <span className="text-[10px] text-[#4b5563]">?</span>
                            </div>
                          </div>
                          <p className="text-xs text-[#9ca3af] mb-4">
                            Select conditions to apply the outcome to. Every condition added must be met for the outcome to be applied.
                          </p>

                          {/* Condition Rows */}
                          <div className="space-y-3">
                            {conditionPairings.map((pairing, index) => (
                              <div key={pairing.id} className="flex items-center gap-3">
                                <select
                                  value={pairing.field}
                                  onChange={(e) => {
                                    const updated = [...conditionPairings]
                                    updated[index].field = e.target.value
                                    setConditionPairings(updated)
                                  }}
                                  className="w-44 px-3 py-2 bg-[#0f1117] text-[#9ca3af] rounded-md text-sm border border-[#1e2130] focus:outline-none focus:border-[#6CEEAD]"
                                >
                                  <option value="Model Provider">Model Provider</option>
                                  <option value="Use type">Use type</option>
                                  <option value="Risk level">Risk level</option>
                                  <option value="Data classification">Data classification</option>
                                  <option value="Deployment">Deployment</option>
                                  <option value="Workflow stage">Workflow stage</option>
                                </select>
                                
                                <span className="text-sm text-[#9ca3af]">Is</span>
                                
                                <select
                                  value={pairing.value}
                                  onChange={(e) => {
                                    const updated = [...conditionPairings]
                                    updated[index].value = e.target.value
                                    setConditionPairings(updated)
                                  }}
                                  className="w-44 px-3 py-2 bg-[#0f1117] text-[#9ca3af] rounded-md text-sm border border-[#1e2130] focus:outline-none focus:border-[#6CEEAD]"
                                >
                                  <option value="">Select value</option>
                                  {pairing.field === 'Model Provider' && (
                                    <>
                                      <option value="Anthropic">Anthropic</option>
                                      <option value="OpenAI">OpenAI</option>
                                      <option value="Google">Google</option>
                                      <option value="Microsoft">Microsoft</option>
                                      <option value="Meta">Meta</option>
                                      <option value="Cohere">Cohere</option>
                                    </>
                                  )}
                                  {pairing.field === 'Use type' && (
                                    <>
                                      <option value="Internal Use">Internal Use</option>
                                      <option value="External Use">External Use</option>
                                      <option value="Customer Facing">Customer Facing</option>
                                      <option value="Research">Research</option>
                                      <option value="Development">Development</option>
                                    </>
                                  )}
                                  {pairing.field === 'Risk level' && (
                                    <>
                                      <option value="Low">Low</option>
                                      <option value="Medium">Medium</option>
                                      <option value="High">High</option>
                                      <option value="Critical">Critical</option>
                                    </>
                                  )}
                                  {pairing.field === 'Data classification' && (
                                    <>
                                      <option value="Public">Public</option>
                                      <option value="Internal">Internal</option>
                                      <option value="Confidential">Confidential</option>
                                      <option value="Restricted">Restricted</option>
                                    </>
                                  )}
                                  {pairing.field === 'Deployment' && (
                                    <>
                                      <option value="Production">Production</option>
                                      <option value="Staging">Staging</option>
                                      <option value="Development">Development</option>
                                      <option value="Testing">Testing</option>
                                    </>
                                  )}
                                  {pairing.field === 'Workflow stage' && (
                                    <>
                                      <option value="Intake">Intake</option>
                                      <option value="Review">Review</option>
                                      <option value="Approval">Approval</option>
                                      <option value="Implementation">Implementation</option>
                                      <option value="Monitoring">Monitoring</option>
                                      <option value="Retirement">Retirement</option>
                                    </>
                                  )}
                                </select>
                                
                                {index > 0 && (
                                  <button 
                                    onClick={() => {
                                      setConditionPairings(conditionPairings.filter(p => p.id !== pairing.id))
                                    }}
                                    className="text-sm text-[#9ca3af] hover:text-[#ef4444] transition-colors"
                                  >
                                    Remove
                                  </button>
                                )}
                                
                                {index === conditionPairings.length - 1 && (
                                  <button
                                    onClick={() => {
                                      setConditionPairings([
                                        ...conditionPairings,
                                        { id: Date.now(), field: 'Model Provider', value: '', operator: 'AND' as 'AND' | 'OR' }
                                      ])
                                    }}
                                    className="flex items-center gap-1 px-3 py-1.5 bg-[#0f1117] text-white rounded-md text-sm border border-[#1e2130] hover:bg-[#1e2130] transition-colors"
                                  >
                                    <Plus className="w-3 h-3" />
                                    Add
                                  </button>
                                )}
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                      )}

                      {/* Form Actions */}
                      <div className="flex items-center gap-3 mt-8">
                        <button
                          onClick={() => {
                            // Create new policy from form data
                            const outcomeMap: Record<string, string> = {
                              'Approved': 'Auto-approved',
                              'Needs additional review': 'Requires review',
                              'Denied': 'Denied'
                            }
                            const modelProviderCondition = conditionPairings.find(p => p.field === 'Model Provider')
                            const newPolicy = {
                              title: formName || 'Untitled Policy',
                              activeRecords: 0,
                              conditions: conditionPairings.length,
                              description: formDescription || 'No description provided',
                              outcome: outcomeMap[formOutcome] || 'Auto-approved',
                              useType: formRecordType || 'Model',
                              model: modelProviderCondition ? modelProviderCondition.value : undefined,
                              modelIcon: modelProviderCondition ? '✦' : undefined,
                              modelProvider: modelProviderCondition?.value,
                              vendor: conditionPairings.find(p => p.field === 'Deployment')?.value,
                              useCondition: conditionPairings.map(p => `${p.field} is ${p.value}`).join(' and ')
                            }
                            setPolicies([newPolicy, ...policies])
                            
                            // Reset form
                            setShowAddAcceptedUseForm(false)
                            setAcceptedUseFormStep(1)
                            setFormRecordType('')
                            setFormName('')
                            setFormDescription('')
                            setFormOutcome('Approved')
                            setFormApplyOutcome('auto-apply')
                            setConditionPairings([
                              { id: 1, field: 'Model Provider', value: 'Anthropic', operator: 'AND' as 'AND' | 'OR' },
                              { id: 2, field: 'Use type', value: 'Internal Use', operator: 'AND' as 'AND' | 'OR' },
                            ])
                          }}
                          className="px-4 py-2 bg-[#6CEEAD] text-[#0f1117] rounded-md text-sm font-medium hover:bg-[#5dd99c] transition-colors"
                        >
                          Save
                        </button>
                        <button
                          onClick={() => setAcceptedUseFormStep(1)}
                          className="px-4 py-2 text-[#9ca3af] hover:text-white rounded-md text-sm font-medium transition-colors"
                        >
                          Back
                        </button>
                      </div>
                    </div>
                  ) : selectedPolicy === null ? (
                  <div className="flex flex-1 overflow-hidden">
                  {/* Left Sidebar - Policy Types Filter */}
                  <div className="w-56 border-r border-[#1e2130] bg-[#0f1117] py-4 overflow-y-auto">
                    {/* Search */}
                    <div className="px-3 mb-4">
                      <div className="relative">
                        <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-[#4b5563]" />
                        <input
                          type="text"
                          placeholder="Search"
                          value={policySearchQuery}
                          onChange={(e) => setPolicySearchQuery(e.target.value)}
                          className="w-full pl-8 pr-3 py-1.5 bg-[#13151f] border border-[#1e2130] rounded-md text-xs text-white placeholder:text-[#4b5563] focus:outline-none focus:border-[#6CEEAD]"
                        />
                      </div>
                    </div>

                    {/* All Policy Types */}
                    <div className="px-3 mb-2">
                      <button
                        onClick={() => setPolicyTypeFilter('all')}
                        className={cn(
                          "w-full flex items-center justify-between px-2 py-1.5 rounded text-sm transition-colors",
                          policyTypeFilter === 'all' ? "text-white font-semibold" : "text-[#9ca3af] hover:text-white"
                        )}
                      >
                        <span>All Policy Types</span>
                        <span className="text-xs text-[#9ca3af]">31</span>
                      </button>
                    </div>

                    {/* Model Providers */}
                    <div className="px-3 mb-1">
                      <button
                        onClick={() => setPolicyTypeFilter('model-providers')}
                        className={cn(
                          "w-full flex items-center justify-between px-2 py-1.5 rounded text-sm transition-colors",
                          policyTypeFilter === 'model-providers' ? "text-white font-semibold" : "text-[#9ca3af] hover:text-white"
                        )}
                      >
                        <span>Model Providers</span>
                        <span className="text-xs text-[#9ca3af]">4</span>
                      </button>
                    </div>
                    <ul className="px-3 mb-4 space-y-0.5">
                      {['OpenAI', 'Anthropic', 'Google', 'Microsoft'].map((provider) => (
                        <li key={provider}>
                          <button className="w-full text-left px-4 py-1 text-xs text-[#9ca3af] hover:text-white transition-colors">
                            {provider}
                          </button>
                        </li>
                      ))}
                    </ul>

                    {/* Vendors */}
                    <div className="px-3 mb-1">
                      <button
                        onClick={() => setPolicyTypeFilter('vendors')}
                        className={cn(
                          "w-full flex items-center justify-between px-2 py-1.5 rounded text-sm transition-colors",
                          policyTypeFilter === 'vendors' ? "text-white font-semibold" : "text-[#9ca3af] hover:text-white"
                        )}
                      >
                        <span>Vendors</span>
                        <span className="text-xs text-[#9ca3af]">14</span>
                      </button>
                    </div>
                    <ul className="px-3 space-y-0.5">
                      {['Internal', 'Aha!', 'Atlassian', 'Figma', 'Pendo', 'Google', 'Maze', 'Microsoft', 'Miro', 'Monday.com', 'Salesforce', 'Service Now', 'Vercel'].map((vendor) => (
                        <li key={vendor}>
                          <button className="w-full text-left px-4 py-1 text-xs text-[#9ca3af] hover:text-white transition-colors">
                            {vendor}
                          </button>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Main Content */}
                  <div className="flex-1 overflow-y-auto p-6">
                    {/* Filter Tabs */}
                    <div className="flex items-center gap-2 mb-6">
                      {[
                        { id: 'all', label: 'All' },
                        { id: 'Auto-approved', label: 'Auto-approved' },
                        { id: 'Requires review', label: 'Requires review' },
                        { id: 'Denied', label: 'Denied' },
                      ].map((tab) => (
                        <button
                          key={tab.id}
                          onClick={() => setPolicyOutcomeFilter(tab.id as typeof policyOutcomeFilter)}
                          className={cn(
                            "px-3 py-1.5 rounded-md text-xs font-medium transition-colors flex items-center gap-1.5",
                            policyOutcomeFilter === tab.id
                              ? "bg-[#1e2130] text-white"
                              : "text-[#9ca3af] hover:text-white hover:bg-[#1e2130]/50"
                          )}
                        >
                          {policyOutcomeFilter === tab.id && (
                            <CheckCircle2 className="w-3 h-3" />
                          )}
                          {tab.label}
                        </button>
                      ))}
                    </div>

                    {/* Policy Cards Grid */}
                    <div className="grid grid-cols-2 gap-4">
                      {policies
                        .filter((policy) => policyOutcomeFilter === 'all' || policy.outcome === policyOutcomeFilter)
                        .filter((policy) => {
                          if (policyTypeFilter === 'all') return true
                          if (policyTypeFilter === 'model-providers') return !!policy.modelProvider
                          if (policyTypeFilter === 'vendors') return !!policy.vendor
                          return true
                        })
                        .filter((policy) => {
                          if (!policySearchQuery.trim()) return true
                          const query = policySearchQuery.toLowerCase()
                          return (
                            policy.title.toLowerCase().includes(query) ||
                            policy.description.toLowerCase().includes(query) ||
                            policy.useType.toLowerCase().includes(query) ||
                            (policy.model?.toLowerCase().includes(query) ?? false) ||
                            (policy.vendor?.toLowerCase().includes(query) ?? false) ||
                            (policy.modelProvider?.toLowerCase().includes(query) ?? false)
                          )
                        })
                        .map((policy, i) => (
                        <div 
                          key={policy.id || i} 
                          onClick={() => setSelectedPolicy(policy.id)}
                          className="bg-[#13151f] border border-[#1e2130] rounded-lg p-4 hover:border-[#2a2d3a] transition-colors cursor-pointer"
                        >
                          {/* Card Header */}
                          <div className="flex items-start justify-between mb-3">
                            <div className="flex-1 min-w-0 pr-2">
                              <h3 className="text-sm font-medium text-white mb-1 truncate">{policy.title}</h3>
                              <p className="text-xs text-[#9ca3af] line-clamp-2">{policy.description}</p>
                            </div>
                            <div className="flex flex-col items-end gap-1 shrink-0">
                              <span className={cn(
                                "text-[10px] px-2 py-0.5 rounded",
                                policy.outcome === 'Auto-approved' ? "bg-[#00B935]/10 text-[#00B935]" :
                                policy.outcome === 'Requires review' ? "bg-[#ffa500]/10 text-[#ffa500]" :
                                "bg-[#ef4444]/10 text-[#ef4444]"
                              )}>
                                {policy.outcome}
                              </span>
                              <span className="text-[10px] text-[#9ca3af]">{policy.activeRecords} active records</span>
                            </div>
                          </div>

                          {/* Use Type */}
                          <div className="mb-3">
                            <span className="text-[10px] text-[#4b5563]">Use type:</span>
                            <span className="text-[10px] text-white ml-1">{policy.useType}</span>
                          </div>

                          {/* Conditions Badge */}
                          <div className="flex items-center gap-2 mb-3">
                            <span className="text-[10px] px-2 py-0.5 rounded bg-[#1e2130] text-[#9ca3af]">
                              {policy.conditions} condition{policy.conditions !== 1 ? 's' : ''}
                            </span>
                          </div>

                          {/* Model/Vendor Info */}
                          <div className="space-y-1.5">
                            {policy.model && (
                              <div className="flex items-center gap-2">
                                <span className="text-xs text-[#9ca3af]">Model:</span>
                                <span className="text-xs text-white flex items-center gap-1">
                                  <span className="text-[#ef4444]">{policy.modelIcon}</span>
                                  {policy.model}
                                </span>
                              </div>
                            )}

                            {policy.vendor && (
                              <div className="flex items-center gap-2">
                                <span className="text-xs text-[#9ca3af]">Vendor:</span>
                                <span className="text-xs text-white">{policy.vendor}</span>
                              </div>
                            )}

                            <div className="flex items-start gap-2">
                              <span className="text-xs text-[#9ca3af] shrink-0">Use Condition:</span>
                              <span className="text-xs text-white">{policy.useCondition}</span>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
                ) : null}
                
                {/* Policy Detail View */}
                {selectedPolicy !== null && (() => {
                  const policy = policies.find(p => p.id === selectedPolicy)
                  if (!policy) return null
                  return (
                    <div className="flex-1 overflow-auto px-6 pt-4 pb-6">
                      {/* Policy Card - Full width, no outer section header */}
                      <div className="bg-[#13151f] border border-[#1e2130] rounded-lg">
                        {/* Card Header */}
                        <div className="p-6 pb-4">
                          <div className="flex items-start justify-between">
                            <div>
                              <h4 className="text-base font-semibold text-white">{policy.title}</h4>
                              <p className="text-sm text-[#9ca3af] mt-1">{policy.description}</p>
                            </div>
                            <div className="flex items-center gap-3">
                              <span className="text-xs px-3 py-1 rounded-full border border-[#1e2130] text-[#9ca3af]">
                                {policy.conditions} condition{policy.conditions !== 1 ? 's' : ''}
                              </span>
                              <span className={`text-xs px-3 py-1 rounded-full border ${
                                policy.outcome === 'Auto-approved' 
                                  ? 'border-[#1e2130] text-[#9ca3af]' 
                                  : policy.outcome === 'Denied'
                                  ? 'border-[#1e2130] text-[#9ca3af]'
                                  : 'border-[#1e2130] text-[#9ca3af]'
                              }`}>
                                {policy.outcome === 'Auto-approved' ? 'Approved' : policy.outcome}
                              </span>
                              <div className="flex items-center gap-2">
                                <span className={`w-2 h-2 rounded-full ${policy.isActive ? 'bg-[#00B935]' : 'bg-[#4b5563]'}`}></span>
                                <span className="text-sm text-[#9ca3af]">Active</span>
                                <button 
                                  onClick={() => {
                                    setPolicies(policies.map(p => 
                                      p.id === selectedPolicy ? {...p, isActive: !p.isActive} : p
                                    ))
                                  }}
                                  className={`w-10 h-5 rounded-full relative transition-colors ${policy.isActive ? 'bg-[#6CEEAD]' : 'bg-[#1e2130]'}`}
                                >
                                  <span className={`absolute top-0.5 w-4 h-4 rounded-full bg-white transition-transform ${policy.isActive ? 'left-5' : 'left-0.5'}`}></span>
                                </button>
                              </div>
                              <div className="relative">
                                <button 
                                  onClick={() => setPolicyMenuOpen(!policyMenuOpen)}
                                  className="p-1 text-[#9ca3af] hover:text-white transition-colors"
                                >
                                  <MoreHorizontal className="w-5 h-5" />
                                </button>
                                {policyMenuOpen && (
                                  <>
                                    <div 
                                      className="fixed inset-0 z-10" 
                                      onClick={() => setPolicyMenuOpen(false)}
                                    />
                                    <div className="absolute right-0 top-full mt-1 w-40 bg-[#13151f] border border-[#1e2130] rounded-lg shadow-lg z-20 py-1">
                                      <button 
                                        onClick={() => {
                                          setPolicyMenuOpen(false)
                                          // Handle edit policy
                                        }}
                                        className="w-full px-3 py-2 text-left text-sm text-white hover:bg-[#1e2130] transition-colors"
                                      >
                                        Edit policy
                                      </button>
                                      <button 
                                        onClick={() => {
                                          setPolicyMenuOpen(false)
                                          // Handle delete policy
                                          if (selectedPolicy) {
                                            setPolicies(policies.filter(p => p.id !== selectedPolicy))
                                            setSelectedPolicy(null)
                                          }
                                        }}
                                        className="w-full px-3 py-2 text-left text-sm text-[#ef4444] hover:bg-[#1e2130] transition-colors"
                                      >
                                        Delete policy
                                      </button>
                                    </div>
                                  </>
                                )}
                              </div>
                              <button 
                                onClick={() => setPolicyDetailExpanded(!policyDetailExpanded)}
                                className="p-1 text-[#9ca3af] hover:text-white transition-colors"
                              >
                                <ChevronDown className={`w-5 h-5 transition-transform ${policyDetailExpanded ? '' : '-rotate-90'}`} />
                              </button>
                            </div>
                          </div>
                        </div>

                        {/* Collapsible Content */}
                        {policyDetailExpanded && (
                          <>
                        {/* Divider */}
                        <div className="border-t border-[#1e2130] mx-6"></div>

                        {/* Metadata Row */}
                        <div className="px-6 py-4 flex items-center gap-8 text-sm">
                          <div className="flex items-center gap-2">
                            <span className="font-medium text-white">Record type:</span>
                            <span className="text-[#9ca3af]">{policy.useType}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <span className="font-medium text-white">Outcome:</span>
                            <span className="px-2 py-0.5 rounded-full border border-[#1e2130] text-[#9ca3af] text-xs">
                              {policy.outcome === 'Auto-approved' ? 'Approved' : policy.outcome}
                            </span>
                          </div>
                          <div className="flex items-center gap-2">
                            <span className="font-medium text-white">Auto-apply outcome:</span>
                            <span className="text-[#9ca3af]">True</span>
                          </div>
                        </div>

                        {/* Rule Summary */}
                        <div className="px-6 pb-4">
                          <h4 className="text-sm font-medium text-white mb-1">Rule summary</h4>
                          <p className="text-xs text-[#9ca3af] mb-3">Plain language preview</p>
                          <div className="bg-[#0f1117] border border-[#1e2130] rounded-lg p-4 flex flex-wrap items-center gap-2">
                            <span className={`px-3 py-1.5 border rounded text-xs font-medium ${
                              policy.outcome === 'Auto-approved' 
                                ? 'border-[#6CEEAD]/30 text-[#6CEEAD] bg-[#6CEEAD]/10' 
                                : policy.outcome === 'Denied' 
                                ? 'border-[#ef4444]/30 text-[#ef4444] bg-[#ef4444]/10'
                                : 'border-[#f59e0b]/30 text-[#f59e0b] bg-[#f59e0b]/10'
                            }`}>
                              {policy.outcome === 'Auto-approved' ? 'APPROVE' : policy.outcome === 'Denied' ? 'DENY' : 'REVIEW'}
                            </span>
                            <span className="text-sm text-[#9ca3af]">as acceptable use</span>
                            <span className="px-3 py-1.5 border border-[#4b5563]/50 rounded text-xs text-[#9ca3af] font-medium bg-[#4b5563]/10">IF</span>
                            {policy.conditionsList?.map((condition, index) => (
                              <span key={condition.id} className="flex items-center gap-2">
                                <span className="text-sm text-white">{condition.field}</span>
                                <span className="text-sm text-[#9ca3af]">is</span>
                                <span className="text-sm text-[#9ca3af]">&quot;{condition.value}&quot;</span>
                                {index < (policy.conditionsList?.length || 0) - 1 && (
                                  <span className={`px-3 py-1.5 border rounded text-xs font-medium ${
                                    condition.operator === 'AND' 
                                      ? 'border-[#6CEEAD]/30 text-[#6CEEAD] bg-[#6CEEAD]/10' 
                                      : 'border-[#f59e0b]/30 text-[#f59e0b] bg-[#f59e0b]/10'
                                  }`}>
                                    {condition.operator}
                                  </span>
                                )}
                              </span>
                            ))}
                          </div>
                        </div>

                        {/* Divider */}
                        <div className="border-t border-[#1e2130] mx-6"></div>

                        {/* Conditions Section */}
                        <div className="p-6">
                          <div className="flex items-center gap-2 mb-1">
                            <h4 className="text-sm font-medium text-white">Conditions</h4>
                            <div className="w-4 h-4 rounded-full border border-[#4b5563] flex items-center justify-center">
                              <span className="text-[10px] text-[#4b5563]">?</span>
                            </div>
                          </div>
                          <p className="text-xs text-[#9ca3af] mb-6">Conditions that surround this rule</p>

                          {/* Condition Rows */}
                          <div className="space-y-0">
                            {policy.conditionsList?.map((condition, index) => (
                              <div key={condition.id}>
                                <div className="flex items-center gap-4 py-3">
                                  {/* Row Number */}
                                  <div className="w-8 h-8 rounded-full border border-[#1e2130] flex items-center justify-center text-sm text-[#9ca3af]">
                                    {index + 1}
                                  </div>
                                  
                                  {/* Drag Handle */}
                                  <div className="text-[#4b5563]">
                                    <GripVertical className="w-4 h-4" />
                                  </div>

                                  {/* Variable */}
                                  <div className="flex-1 max-w-[200px] px-4 py-2.5 bg-[#0f1117] text-white rounded-lg text-sm border border-[#1e2130]">
                                    {condition.field}
                                  </div>

                                  {/* Operand */}
                                  <div className="flex-1 max-w-[180px] px-4 py-2.5 bg-[#0f1117] text-[#9ca3af] rounded-lg text-sm border border-[#1e2130]">
                                    {condition.operand}
                                  </div>

                                  {/* Value */}
                                  <div className="flex-1 max-w-[200px] px-4 py-2.5 bg-[#0f1117] text-white rounded-lg text-sm border border-[#1e2130]">
                                    {condition.value}
                                  </div>
                                </div>

                                {/* AND/OR Connector */}
                                {index < (policy.conditionsList?.length || 0) - 1 && (
                                  <div className="flex items-center gap-3 py-3 pl-12">
                                    <div className="w-px h-6 bg-[#1e2130]"></div>
                                    <span className="px-3 py-1 border border-[#1e2130] rounded text-xs text-white font-medium">
                                      {condition.operator}
                                    </span>
                                    <span className="text-xs text-[#9ca3af] italic">
                                      {condition.operator === 'AND' ? 'and also match this' : 'or match this instead'}
                                    </span>
                                  </div>
                                )}
                              </div>
                            ))}
                          </div>
                        </div>
                          </>
                        )}
                      </div>

                      {/* Active Records Section */}
                      <h3 className="text-base font-medium text-white mt-6 mb-4">Active records linked to rule</h3>
                      
                      {/* Filter Row */}
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-2">
                          <div className="flex items-center gap-2 px-3 py-1.5 bg-[#13151f] rounded-md border border-[#1e2130]">
                            <Filter className="w-4 h-4 text-[#9ca3af]" />
                            <span className="text-sm text-white">OneTrust</span>
                            <ChevronDown className="w-4 h-4 text-[#9ca3af]" />
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="relative">
                            <input
                              type="text"
                              placeholder="Search..."
                              className="pl-3 pr-8 py-1.5 bg-[#13151f] text-white rounded-md text-sm border border-[#1e2130] focus:outline-none focus:border-[#6CEEAD] w-48"
                            />
                            <Search className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#9ca3af]" />
                          </div>
                          <button className="p-1.5 text-[#9ca3af] hover:text-white transition-colors">
                            <Layers className="w-4 h-4" />
                          </button>
                          <button className="p-1.5 text-[#9ca3af] hover:text-white transition-colors">
                            <RefreshCw className="w-4 h-4" />
                          </button>
                        </div>
                      </div>

                      {/* Records Table */}
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
                          {policy.linkedRecords?.map((record, i) => (
                            <div key={i} className="grid gap-4 py-3 border-b border-[#1e2130] last:border-0 hover:bg-[#1a1d2a] cursor-pointer transition-colors -mx-4 px-4 items-center"
                              style={{ gridTemplateColumns: '1fr 110px 100px 1fr 140px 110px' }}>
                              <p className="text-sm font-medium text-white">{record.name}</p>
                              <span className={`text-[10px] font-semibold px-2 py-0.5 rounded border w-fit ${
                                record.approval === 'Approved' 
                                  ? 'border-[#00B935]/30 text-[#00B935]' 
                                  : record.approval === 'Denied'
                                  ? 'border-[#ef4444]/30 text-[#ef4444]'
                                  : 'border-[#f59e0b]/30 text-[#f59e0b]'
                              }`}>{record.approval}</span>
                              <p className="text-xs text-[#9ca3af]">{record.type}</p>
                              <p className="text-xs text-[#9ca3af]">{record.description}</p>
                              <p className="text-xs text-[#9ca3af]">{record.approvedWith}</p>
                              <p className="text-xs text-[#9ca3af]">{record.internal}</p>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  )
                })()}
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
