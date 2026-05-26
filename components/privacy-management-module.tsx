"use client"

import { useState } from 'react'
import { useNavigation } from '@/lib/navigation-context'
import {
  piaRecords,
  incidentRecords,
  privacyRightRequests,
  dataMappingRecords,
  privacyNotices,
} from '@/lib/sample-data'
import {
  Plus,
  Search,
  Filter,
  Download,
  AlertTriangle,
  CheckCircle,
  Clock,
  ArrowRight,
  Inbox,
  Activity,
  Database,
  Building2,
  FolderKanban,
  Map,
  Globe,
  GitBranch,
  FileBarChart,
} from 'lucide-react'
import { cn } from '@/lib/utils'

// ── Secondary Tab config ──────────────────────────────────────────────────────────
type SecondaryTab = 'overview' | 'incidents' | 'privacy-rights' | 'data-mapping' | 'privacy-notices' | 'benchmarking' | 'maturity'

const secondaryTabs: { id: SecondaryTab; label: string }[] = [
  { id: 'overview',        label: 'Overview' },
  { id: 'incidents',       label: 'Incident Manager' },
  { id: 'privacy-rights',  label: 'Privacy Rights' },
  { id: 'data-mapping',    label: 'Data Mapping' },
  { id: 'privacy-notices', label: 'Privacy Notices' },
  { id: 'benchmarking',    label: 'Program Benchmarking' },
  { id: 'maturity',        label: 'Maturity & Planning' },
]

// Tertiary tabs for Privacy Rights
type PrivacyRightsTertiaryTab = 'requests' | 'reports' | 'subtasks'
const privacyRightsTertiaryTabs: { id: PrivacyRightsTertiaryTab; label: string }[] = [
  { id: 'requests', label: 'Requests' },
  { id: 'reports',  label: 'Reports' },
  { id: 'subtasks', label: 'Subtasks' },
]

// Tertiary tabs for Data Mapping
type DataMappingTertiaryTab = 'pending' | 'processing' | 'assets' | 'entities' | 'projects' | 'asset-map' | 'cross-border' | 'data-lineage' | 'reports'
const dataMappingTertiaryTabs: { id: DataMappingTertiaryTab; label: string; icon: React.ReactNode }[] = [
  { id: 'pending',      label: 'Pending Inventory',     icon: <Inbox className="w-4 h-4" /> },
  { id: 'processing',   label: 'Processing Activi...',  icon: <Activity className="w-4 h-4" /> },
  { id: 'assets',       label: 'Assets',                icon: <Database className="w-4 h-4" /> },
  { id: 'entities',     label: 'Entities',              icon: <Building2 className="w-4 h-4" /> },
  { id: 'projects',     label: 'Projects',              icon: <FolderKanban className="w-4 h-4" /> },
  { id: 'asset-map',    label: 'Asset Map',             icon: <Map className="w-4 h-4" /> },
  { id: 'cross-border', label: 'Cross Border',          icon: <Globe className="w-4 h-4" /> },
  { id: 'data-lineage', label: 'Data Lineage',          icon: <GitBranch className="w-4 h-4" /> },
  { id: 'reports',      label: 'Reports',               icon: <FileBarChart className="w-4 h-4" /> },
]

// ── PIA & DPIA dashboard data ─────────────────────────────────────────────────

const piaDpiaStats = [
  { label: 'Active',   value: '24',  sub: '+2 this week',     accent: '#0788F7' },
  { label: 'Overdue',  value: '7',   sub: '3 critical items', accent: '#ef4444' },
  { label: 'Draft',    value: '15',  sub: '5 pending review', accent: '#976FE6' },
  { label: 'Avg Risk', value: '4.2', sub: 'of 10  ·  ↓ 0.3', accent: '#f59e0b' },
]

const recentAssessments = [
  { name: 'Q1 DPIA — Payroll Upgrade',  type: 'DPIA', risk: 'High',   riskAccent: '#ef4444', status: 'In Review', statusAccent: '#ef4444' },
  { name: 'Cookie Consent Audit',        type: 'PIA',  risk: 'Medium', riskAccent: '#f59e0b', status: 'Active',    statusAccent: '#f59e0b' },
  { name: 'Vendor Onboarding — Stripe',  type: 'TIA',  risk: 'Low',    riskAccent: '#00B935', status: 'Complete',  statusAccent: '#00B935' },
  { name: 'HR Data Retention Review',    type: 'LIA',  risk: 'Medium', riskAccent: '#0788F7', status: 'Draft',     statusAccent: '#0788F7' },
  { name: 'EU Marketing Campaign 2026',  type: 'PIA',  risk: 'High',   riskAccent: '#ef4444', status: 'Active',    statusAccent: '#ef4444' },
]

const C = 2 * Math.PI * 38 // donut circumference ≈ 238.76
const programHealth = [
  { label: 'Compliant',   pct: 0.73, color: '#00B935', offset: 0    },
  { label: 'In Progress', pct: 0.18, color: '#f59e0b', offset: 0.73 },
  { label: 'At Risk',     pct: 0.09, color: '#ef4444', offset: 0.91 },
]

const quickActions = [
  { label: '+ New PIA Assessment',       cls: 'bg-[#6CEEAD]/10 text-[#6CEEAD]' },
  { label: 'Import Assessment Template', cls: 'bg-[#1e2130] text-white'         },
  { label: 'Run Risk Scan',              cls: 'bg-[#f59e0b]/10 text-[#f59e0b]' },
  { label: 'Export to PDF',             cls: 'bg-[#1e2130] text-[#9ca3af]'     },
]

const riskBars = [
  { h: 50, c: '#ef4444' }, { h: 56, c: '#ef4444' }, { h: 59, c: '#ef4444' },
  { h: 52, c: '#f59e0b' }, { h: 47, c: '#f59e0b' }, { h: 44, c: '#f59e0b' },
  { h: 40, c: '#f59e0b' }, { h: 46, c: '#f59e0b' },
  { h: 49, c: '#6CEEAD' }, { h: 46, c: '#6CEEAD' }, { h: 42, c: '#6CEEAD' }, { h: 40, c: '#6CEEAD' },
]
const xLabels = ['Apr 14', 'Apr 21', 'Apr 28', 'May 5', 'May 12']

// ── Incident Management dashboard data ───────────────────────────────────────

const incidentStats = [
  { label: 'Open Incidents',      value: '8',  sub: '3 critical · 5 medium', accent: '#ef4444' },
  { label: 'Under Investigation', value: '5',  sub: 'avg 18 days open',       accent: '#f59e0b' },
  { label: 'Notifications Due',   value: '3',  sub: 'within 72 hrs (GDPR)',   accent: '#f97316' },
  { label: 'Resolved This Month', value: '12', sub: '↓ 4 vs last month',      accent: '#00B935' },
]

const activeIncidents = [
  { name: 'Unauthorized Access — Marketing DB', severity: 'Critical', sevColor: '#ef4444', category: 'Data Breach',  reported: 'May 10', status: 'Investigating', stColor: '#f59e0b', highlight: true  },
  { name: 'Ransomware Attempt — Dev Server',    severity: 'Critical', sevColor: '#ef4444', category: 'Cyber Attack', reported: 'May 11', status: 'Contained',     stColor: '#0788F7', highlight: false },
  { name: 'Accidental Email Disclosure',         severity: 'Medium',   sevColor: '#f59e0b', category: 'Human Error',  reported: 'May 12', status: 'Notified',      stColor: '#00B935', highlight: false },
  { name: 'Vendor API Key Exposed',              severity: 'Critical', sevColor: '#ef4444', category: 'Third Party',  reported: 'May 13', status: 'Investigating', stColor: '#f59e0b', highlight: false },
  { name: 'Employee Data Exported Externally',   severity: 'Medium',   sevColor: '#f59e0b', category: 'Insider Risk', reported: 'May 14', status: 'Under Review',  stColor: '#0788F7', highlight: false },
]

const incidentTypes = [
  { label: 'Data Breach',         count: 12, pct: 40, color: '#ef4444' },
  { label: 'Cyber Attack',        count: 8,  pct: 27, color: '#f59e0b' },
  { label: 'Human Error',         count: 6,  pct: 20, color: '#f97316' },
  { label: 'Third Party / Vendor',count: 4,  pct: 13, color: '#976FE6' },
]

const playbooks = [
  { name: 'GDPR Art. 33 — DPA Notification',     desc: 'Notify supervisory authority within 72hrs',        pct: 65,  status: 'In Progress', stColor: '#f59e0b', barColor: '#ef4444'  },
  { name: 'Art. 34 — Data Subject Notification',  desc: 'Notify affected individuals without undue delay',  pct: 0,   status: 'Not Started', stColor: '#4b5563', barColor: '#1e2130'  },
  { name: 'Internal Escalation Protocol',         desc: 'DPO, CISO, Legal notified and looped in',         pct: 100, status: 'Complete',    stColor: '#00B935', barColor: '#00B935'  },
  { name: 'Evidence Collection & Documentation',  desc: 'Preserve logs, screenshots, access records',       pct: 40,  status: 'In Progress', stColor: '#f59e0b', barColor: '#0788F7'  },
]

// GDPR clock: 26h 14m remaining out of 72h ≈ 36.4% remaining
const CLOCK_C = 2 * Math.PI * 36 // r=36 → ≈ 226.2
const CLOCK_REMAINING = 26.23 / 72 // ≈ 0.364

const clockTimeline = [
  { label: 'Detected',   time: 'May 10, 09:14', done: true  },
  { label: 'Assessed',   time: 'May 10, 14:30', done: true  },
  { label: 'Notify DPA', time: 'By May 13, 09:14', done: false },
]

// ── PIA & DPIA Overview ───────────────────────────────────────────────────────

function PiaDpiaDashboard() {
  return (
    <div className="p-6 space-y-4">
      <div>
        <h2 className="text-lg font-medium text-white">Active Assessments</h2>
        <p className="text-xs text-[#9ca3af] mt-0.5">PIA &amp; DPIA · Last updated today at 9:41 AM</p>
      </div>

      {/* Stat cards */}
      <div className="grid grid-cols-4 gap-3">
        {piaDpiaStats.map((s) => (
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

      {/* Middle row */}
      <div className="grid grid-cols-3 gap-3">
        <div className="col-span-2 bg-[#13151f] border border-[#1e2130] rounded-lg overflow-hidden">
          <div className="flex items-center justify-between px-4 py-3 bg-[#0f1117] border-b border-[#1e2130]">
            <p className="text-sm font-semibold text-white">Recent Assessments</p>
            <button className="text-[11px] text-[#6CEEAD] hover:underline">View all →</button>
          </div>
          <div className="px-4">
            <div className="grid gap-2 py-2.5 border-b border-[#1e2130]"
              style={{ gridTemplateColumns: '1fr 60px 80px 90px' }}>
              {['Assessment Name', 'Type', 'Risk', 'Status'].map((h) => (
                <p key={h} className="text-[10px] font-semibold text-[#4b5563] uppercase tracking-wider">{h}</p>
              ))}
            </div>
            {recentAssessments.map((row, i) => (
              <div key={i}
                className="grid gap-2 py-3 border-b border-[#1e2130] last:border-0 hover:bg-[#1a1d2a] cursor-pointer transition-colors -mx-4 px-4 items-center"
                style={{ gridTemplateColumns: '1fr 60px 80px 90px' }}>
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

        {/* Program Health donut */}
        <div className="bg-[#13151f] border border-[#1e2130] rounded-lg p-4 flex flex-col">
          <p className="text-sm font-semibold text-white">Program Health</p>
          <p className="text-[10px] text-[#9ca3af] mt-0.5">vs last quarter</p>
          <div className="flex items-center justify-center flex-1 py-4">
            <div className="relative w-28 h-28">
              <svg viewBox="0 0 100 100" className="w-full h-full -rotate-90">
                <circle cx="50" cy="50" r="38" fill="none" stroke="#1e2130" strokeWidth="10" />
                {programHealth.map((seg) => (
                  <circle key={seg.label} cx="50" cy="50" r="38" fill="none"
                    stroke={seg.color} strokeWidth="10"
                    strokeDasharray={`${seg.pct * C} ${C}`}
                    strokeDashoffset={`${-seg.offset * C}`}
                    strokeLinecap="butt" />
                ))}
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <p className="text-xl font-bold text-white">73%</p>
                <p className="text-[10px] text-[#9ca3af]">overall</p>
              </div>
            </div>
          </div>
          <div>
            {programHealth.map((seg) => (
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
      </div>

      {/* Bottom row */}
      <div className="grid grid-cols-3 gap-3">
        <div className="bg-[#13151f] border border-[#1e2130] rounded-lg overflow-hidden">
          <div className="px-4 py-3 border-b border-[#1e2130]">
            <p className="text-sm font-semibold text-white">Quick Actions</p>
          </div>
          <div className="p-3 space-y-2">
            {quickActions.map((a) => (
              <button key={a.label}
                className={cn('w-full text-left px-3 py-2.5 rounded-md text-xs font-medium transition-opacity hover:opacity-80', a.cls)}>
                {a.label}
              </button>
            ))}
          </div>
        </div>

        <div className="col-span-2 bg-[#13151f] border border-[#1e2130] rounded-lg overflow-hidden">
          <div className="flex items-start justify-between px-4 pt-3 pb-2 border-b border-[#1e2130]">
            <div>
              <p className="text-sm font-semibold text-white">Risk Trend — Last 30 Days</p>
              <p className="text-[10px] text-[#9ca3af]">Avg risk score across active assessments</p>
            </div>
            <p className="text-xs font-medium text-[#00B935] whitespace-nowrap">↓ 1.0 pts  improving</p>
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
                {riskBars.map((bar, i) => (
                  <div key={i} className="flex-1 rounded-sm opacity-80 hover:opacity-100 transition-opacity"
                    style={{ height: `${bar.h}%`, background: bar.c }} />
                ))}
              </div>
            </div>
            <div className="ml-6 flex justify-between mt-1.5">
              {xLabels.map((l) => (
                <p key={l} className="text-[9px] text-[#4b5563]">{l}</p>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

// ── Incident Management Overview ──────────────────────────────────────────────

function IncidentManagementDashboard() {
  return (
    <div className="p-6 space-y-4">

      {/* Urgent alert banner */}
      <div className="flex items-center justify-between px-4 py-2.5 bg-[#ef4444]/8 border border-[#ef4444]/20 rounded-lg">
        <div className="flex items-center gap-2">
          <div className="w-1 h-full self-stretch rounded-sm bg-[#ef4444] shrink-0" />
          <AlertTriangle className="w-3.5 h-3.5 text-[#ef4444] shrink-0" />
          <p className="text-[11px] text-[#ef4444] font-medium">
            1 incident approaching 72-hour GDPR notification deadline — Unauthorized Access, Marketing DB
          </p>
        </div>
        <button className="text-[11px] font-semibold text-[#ef4444] whitespace-nowrap hover:underline ml-4">
          Review →
        </button>
      </div>

      {/* Header */}
      <div>
        <h2 className="text-lg font-medium text-white">Active Incidents</h2>
        <p className="text-xs text-[#9ca3af] mt-0.5">Incident Management ������ Breach Response &amp; Regulatory Notification</p>
      </div>

      {/* Stat cards */}
      <div className="grid grid-cols-4 gap-3">
        {incidentStats.map((s) => (
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

      {/* Middle row: incident list + GDPR clock */}
      <div className="grid grid-cols-3 gap-3">

        {/* Active incidents table */}
        <div className="col-span-2 bg-[#13151f] border border-[#1e2130] rounded-lg overflow-hidden">
          <div className="flex items-center justify-between px-4 py-3 bg-[#0f1117] border-b border-[#1e2130]">
            <p className="text-sm font-semibold text-white">Active Incidents</p>
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2 text-[11px] text-[#9ca3af]">
                <button className="hover:text-white transition-colors">All</button>
                <button className="hover:text-white transition-colors">Critical</button>
                <button className="hover:text-white transition-colors">Investigating</button>
              </div>
              <button className="text-[11px] text-[#6CEEAD] hover:underline">Export →</button>
            </div>
          </div>
          <div className="px-4">
            {/* Column headers */}
            <div className="grid gap-2 py-2.5 border-b border-[#1e2130]"
              style={{ gridTemplateColumns: '1fr 80px 100px 72px 100px' }}>
              {['Incident', 'Severity', 'Category', 'Reported', 'Status'].map((h) => (
                <p key={h} className="text-[10px] font-semibold text-[#4b5563] uppercase tracking-wider">{h}</p>
              ))}
            </div>
            {/* Rows */}
            {activeIncidents.map((row, i) => (
              <div key={i}
                className={cn(
                  "grid gap-2 py-3 border-b border-[#1e2130] last:border-0 cursor-pointer transition-colors -mx-4 px-4 items-center",
                  row.highlight ? "bg-[#ef4444]/5 hover:bg-[#ef4444]/8" : "hover:bg-[#1a1d2a]"
                )}
                style={{ gridTemplateColumns: '1fr 80px 100px 72px 100px' }}>
                <p className="text-xs font-medium text-white truncate">{row.name}</p>
                <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full w-fit"
                  style={{ color: row.sevColor, background: `${row.sevColor}1a` }}>{row.severity}</span>
                <p className="text-[10px] text-[#9ca3af]">{row.category}</p>
                <p className="text-[10px] text-[#4b5563]">{row.reported}</p>
                <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full w-fit"
                  style={{ color: row.stColor, background: `${row.stColor}1a` }}>{row.status}</span>
              </div>
            ))}
            <p className="text-[10px] text-[#4b5563] py-2.5">Showing 5 of 8 open incidents</p>
          </div>
        </div>

        {/* GDPR Notification Clock */}
        <div className="bg-[#13151f] border border-[#1e2130] rounded-lg overflow-hidden flex flex-col">
          <div className="px-4 pt-4 pb-3 border-b border-[#1e2130]">
            <p className="text-sm font-semibold text-white">GDPR Notification Clock</p>
            <p className="text-[10px] text-[#9ca3af] mt-0.5">Art. 33 — 72hr to notify DPA</p>
          </div>

          {/* Countdown ring */}
          <div className="flex flex-col items-center pt-4 pb-2">
            <div className="relative w-28 h-28">
              <svg viewBox="0 0 100 100" className="w-full h-full -rotate-90">
                {/* full elapsed track */}
                <circle cx="50" cy="50" r="36" fill="none" stroke="#1e2130" strokeWidth="10" />
                {/* elapsed portion (dim) */}
                <circle cx="50" cy="50" r="36" fill="none" stroke="#2a1a1a" strokeWidth="10"
                  strokeDasharray={`${(1 - CLOCK_REMAINING) * CLOCK_C} ${CLOCK_C}`}
                  strokeLinecap="butt" />
                {/* remaining (urgent red) */}
                <circle cx="50" cy="50" r="36" fill="none" stroke="#ef4444" strokeWidth="10"
                  strokeDasharray={`${CLOCK_REMAINING * CLOCK_C} ${CLOCK_C}`}
                  strokeDashoffset={`${-(1 - CLOCK_REMAINING) * CLOCK_C}`}
                  strokeLinecap="butt" />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <p className="text-2xl font-bold text-[#ef4444] leading-none">26h</p>
                <p className="text-sm font-bold text-[#ef4444] leading-none mt-0.5">14m</p>
                <p className="text-[9px] text-[#9ca3af] mt-1">remaining</p>
              </div>
            </div>

            {/* Urgent badge */}
            <div className="mt-2 px-3 py-1 bg-[#ef4444]/10 border border-[#ef4444]/20 rounded-full">
              <p className="text-[10px] font-bold text-[#ef4444]">⚠ URGENT — Act Now</p>
            </div>
          </div>

          {/* Timeline */}
          <div className="px-4 py-3 border-t border-[#1e2130] space-y-0">
            {clockTimeline.map((step, i) => (
              <div key={step.label} className="flex items-start gap-3">
                <div className="flex flex-col items-center shrink-0">
                  <div className={cn(
                    "w-3 h-3 rounded-full border-2 mt-0.5",
                    step.done
                      ? "bg-[#00B935] border-[#00B935]"
                      : "bg-transparent border-[#ef4444]"
                  )} />
                  {i < clockTimeline.length - 1 && (
                    <div className="w-0.5 h-4 bg-[#00B935] mt-0.5" />
                  )}
                </div>
                <div className="flex items-baseline justify-between w-full pb-1">
                  <p className={cn(
                    "text-[10px] font-medium",
                    step.done ? "text-white" : "text-[#ef4444]"
                  )}>{step.label}</p>
                  <p className={cn(
                    "text-[9px]",
                    step.done ? "text-[#4b5563]" : "text-[#ef4444]"
                  )}>{step.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom row: incident types + response playbooks */}
      <div className="grid grid-cols-3 gap-3">

        {/* Incident Types */}
        <div className="bg-[#13151f] border border-[#1e2130] rounded-lg overflow-hidden">
          <div className="px-4 pt-4 pb-2 border-b border-[#1e2130]">
            <p className="text-sm font-semibold text-white">Incident Types</p>
            <p className="text-[10px] text-[#9ca3af] mt-0.5">Last 90 days</p>
          </div>
          <div className="p-4 space-y-4">
            {incidentTypes.map((t) => (
              <div key={t.label}>
                <div className="flex items-center justify-between mb-1.5">
                  <div className="flex items-center gap-2">
                    <div className="w-2.5 h-2.5 rounded-full" style={{ background: t.color }} />
                    <p className="text-xs text-white">{t.label}</p>
                  </div>
                  <p className="text-xs font-bold" style={{ color: t.color }}>{t.count}</p>
                </div>
                <div className="h-1.5 bg-[#1e2130] rounded-full overflow-hidden">
                  <div className="h-full rounded-full" style={{ width: `${t.pct}%`, background: t.color }} />
                </div>
              </div>
            ))}
            <p className="text-[9px] text-[#4b5563] pt-1">30 total incidents in period</p>
          </div>
        </div>

        {/* Response Playbooks */}
        <div className="col-span-2 bg-[#13151f] border border-[#1e2130] rounded-lg overflow-hidden">
          <div className="px-4 pt-4 pb-2 border-b border-[#1e2130]">
            <p className="text-sm font-semibold text-white">Response Playbooks</p>
            <p className="text-[10px] text-[#9ca3af] mt-0.5">Automated guidance for the current incident</p>
          </div>
          <div className="divide-y divide-[#1e2130]">
            {playbooks.map((p) => (
              <div key={p.name} className="px-4 py-3 flex items-center gap-4 hover:bg-[#1a1d2a] transition-colors cursor-pointer">
                <div className="w-2.5 h-2.5 rounded-full shrink-0" style={{ background: p.barColor }} />
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-semibold text-white truncate">{p.name}</p>
                  <p className="text-[10px] text-[#9ca3af] mt-0.5 truncate">{p.desc}</p>
                </div>
                <div className="flex items-center gap-3 shrink-0">
                  <div className="w-32">
                    <div className="h-1 bg-[#1e2130] rounded-full overflow-hidden">
                      <div className="h-full rounded-full" style={{ width: `${p.pct}%`, background: p.barColor }} />
                    </div>
                    <p className="text-[9px] text-[#4b5563] mt-1">{p.pct}%</p>
                  </div>
                  <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full whitespace-nowrap"
                    style={{ color: p.stColor, background: `${p.stColor}1a` }}>{p.status}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

// ── Privacy Rights dashboard data ────────────────────────────────────────────

const privacyRightsStats = [
  { label: 'Open Requests',        value: '47',  sub: '↑8 received this week',  accent: '#976FE6' },
  { label: 'Approaching SLA',      value: '12',  sub: 'due within 5 days',       accent: '#f59e0b' },
  { label: 'Avg Response Time',    value: '22d', sub: 'vs 30-day target (GDPR)', accent: '#00B935' },
  { label: 'Completed This Month', value: '38',  sub: '94% on-time rate',        accent: '#8b5cf4' },
]

const dsarRequests = [
  { initial: 'J', email: 'jane.doe@gmail.com',    type: 'Access',        typeColor: '#976FE6', jurisdiction: 'GDPR',   received: 'May 8',  slaElapsed: 20,  slaDays: '24d', slaColor: '#00B935', status: 'In Progress', stColor: '#0788F7' },
  { initial: 'M', email: 'm.johnson@outlook.com', type: 'Erasure',       typeColor: '#8b5cf4', jurisdiction: 'CCPA',   received: 'May 10', slaElapsed: 90,  slaDays: '3d',  slaColor: '#ef4444', status: 'Urgent',      stColor: '#f59e0b' },
  { initial: 'P', email: 'priya.s@work.io',       type: 'Portability',   typeColor: '#e6529a', jurisdiction: 'GDPR',   received: 'May 11', slaElapsed: 40,  slaDays: '18d', slaColor: '#00B935', status: 'In Progress', stColor: '#0788F7' },
  { initial: 'A', email: 'anon-ref-4471',          type: 'Rectification', typeColor: '#5b9baa', jurisdiction: 'PIPEDA', received: 'May 12', slaElapsed: 13,  slaDays: '26d', slaColor: '#00B935', status: 'New',         stColor: '#976FE6' },
  { initial: 'L', email: 'lee.w@company.com',     type: 'Access',        typeColor: '#976FE6', jurisdiction: 'GDPR',   received: 'May 13', slaElapsed: 97,  slaDays: '1d',  slaColor: '#ef4444', status: 'Urgent',      stColor: '#ef4444' },
]

const PR_C = 2 * Math.PI * 38
const requestTypes = [
  { label: 'Access (SAR)',  count: 21, pct: 21 / 47, color: '#976FE6', offset: 0               },
  { label: 'Erasure',       count: 13, pct: 13 / 47, color: '#8b5cf4', offset: 21 / 47         },
  { label: 'Portability',   count: 7,  pct: 7  / 47, color: '#e6529a', offset: 34 / 47         },
  { label: 'Rectification', count: 6,  pct: 6  / 47, color: '#5b9baa', offset: 41 / 47         },
]

const jurisdictions = [
  { label: 'GDPR (EU)',         detail: '62%  ·  29 requests', pct: 62, color: '#0788F7' },
  { label: 'CCPA (California)', detail: '24%  ·  11 requests', pct: 24, color: '#976FE6' },
  { label: 'PIPEDA (Canada)',   detail: '8%  ·  4 requests',   pct: 8,  color: '#8b5cf4' },
  { label: 'Other',             detail: '6%  ·  3 requests',   pct: 6,  color: '#4b5563' },
]

const privacyRightsActions = [
  { label: 'Start Fulfilment',     cls: 'bg-[#976FE6]/10 text-[#976FE6]' },
  { label: 'Send ID Verification', cls: 'bg-[#0788F7]/10 text-[#0788F7]' },
  { label: 'Request Extension',    cls: 'bg-[#f59e0b]/10 text-[#f59e0b]' },
  { label: 'Generate Response',    cls: 'bg-[#8b5cf4]/10 text-[#8b5cf4]' },
]

const slaAvgByType = [
  { label: 'Access',      days: '22d', color: '#976FE6' },
  { label: 'Erasure',     days: '18d', color: '#8b5cf4' },
  { label: 'Portability', days: '26d', color: '#e6529a' },
]

// ── Privacy Rights Overview ───────────────────────────────────────────────────

function PrivacyRightsDashboard() {
  return (
    <div className="p-6 space-y-4">

      {/* SLA alert banner */}
      <div className="flex items-center justify-between px-4 py-2.5 bg-[#f59e0b]/8 border border-[#f59e0b]/20 rounded-lg">
        <div className="flex items-center gap-2">
          <AlertTriangle className="w-3.5 h-3.5 text-[#f59e0b] shrink-0" />
          <p className="text-[11px] text-[#f59e0b] font-medium">
            12 requests approaching their 30-day SLA deadline — earliest due in 3 days
          </p>
        </div>
        <button className="text-[11px] font-semibold text-[#f59e0b] whitespace-nowrap hover:underline ml-4">
          View all →
        </button>
      </div>

      {/* Header */}
      <div>
        <h2 className="text-lg font-medium text-white">Request Queue</h2>
        <p className="text-xs text-[#9ca3af] mt-0.5">Privacy Rights / DSAR  ·  Subject Access, Erasure, Portability &amp; Rectification</p>
      </div>

      {/* Stat cards */}
      <div className="grid grid-cols-4 gap-3">
        {privacyRightsStats.map((s) => (
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

      {/* Middle row: DSAR queue + Request Types donut */}
      <div className="grid grid-cols-3 gap-3">

        {/* Request Queue table */}
        <div className="col-span-2 bg-[#13151f] border border-[#1e2130] rounded-lg overflow-hidden">
          <div className="flex items-center justify-between px-4 py-3 bg-[#0f1117] border-b border-[#1e2130]">
            <p className="text-sm font-semibold text-white">Request Queue</p>
            <div className="flex items-center gap-1.5">
              {[
                { label: 'All (47)',      active: true  },
                { label: 'Access (21)',   active: false },
                { label: 'Erasure (13)', active: false },
                { label: 'Portability (7)', active: false },
                { label: 'Rectify (6)', active: false },
              ].map((f) => (
                <button key={f.label}
                  className={cn(
                    'text-[9px] font-medium px-2 py-0.5 rounded-full transition-colors',
                    f.active
                      ? 'bg-[#976FE6]/15 text-[#976FE6]'
                      : 'bg-[#1e2130] text-[#4b5563] hover:text-white'
                  )}>
                  {f.label}
                </button>
              ))}
            </div>
          </div>
          <div className="px-4">
            {/* Column headers */}
            <div className="grid gap-2 py-2.5 border-b border-[#1e2130]"
              style={{ gridTemplateColumns: '1fr 90px 80px 64px 80px 80px' }}>
              {['Requester', 'Type', 'Jurisdiction', 'Received', 'SLA', 'Status'].map((h) => (
                <p key={h} className="text-[10px] font-semibold text-[#4b5563] uppercase tracking-wider">{h}</p>
              ))}
            </div>
            {/* Rows */}
            {dsarRequests.map((row, i) => (
              <div key={i}
                className={cn(
                  "grid gap-2 py-3 border-b border-[#1e2130] last:border-0 cursor-pointer transition-colors -mx-4 px-4 items-center",
                  row.slaElapsed >= 90 ? "bg-[#ef4444]/5 hover:bg-[#ef4444]/8" : "hover:bg-[#1a1d2a]"
                )}
                style={{ gridTemplateColumns: '1fr 90px 80px 64px 80px 80px' }}>
                {/* Requester */}
                <div className="flex items-center gap-2 min-w-0">
                  <div className="w-5 h-5 rounded-full bg-[#976FE6]/15 flex items-center justify-center shrink-0">
                    <span className="text-[9px] font-bold text-[#976FE6]">{row.initial}</span>
                  </div>
                  <p className="text-xs font-medium text-white truncate">{row.email}</p>
                </div>
                {/* Type badge */}
                <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full w-fit"
                  style={{ color: row.typeColor, background: `${row.typeColor}20` }}>
                  {row.type}
                </span>
                {/* Jurisdiction */}
                <p className="text-[10px] text-[#9ca3af]">{row.jurisdiction}</p>
                {/* Received */}
                <p className="text-[10px] text-[#4b5563]">{row.received}</p>
                {/* SLA bar + days */}
                <div>
                  <div className="h-1.5 bg-[#1e2130] rounded-full overflow-hidden w-14">
                    <div className="h-full rounded-full transition-all"
                      style={{ width: `${row.slaElapsed}%`, background: row.slaColor }} />
                  </div>
                  <p className="text-[9px] font-semibold mt-0.5" style={{ color: row.slaColor }}>{row.slaDays}</p>
                </div>
                {/* Status badge */}
                <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full w-fit"
                  style={{ color: row.stColor, background: `${row.stColor}20` }}>
                  {row.status}
                </span>
              </div>
            ))}
            <p className="text-[10px] text-[#4b5563] py-2.5">Showing 5 of 47 open requests</p>
          </div>
        </div>

        {/* Request Types donut */}
        <div className="bg-[#13151f] border border-[#1e2130] rounded-lg overflow-hidden flex flex-col">
          <div className="px-4 pt-4 pb-3 border-b border-[#1e2130]">
            <p className="text-sm font-semibold text-white">Request Types</p>
            <p className="text-[10px] text-[#9ca3af] mt-0.5">Open requests by category</p>
          </div>
          <div className="flex items-center justify-center py-5">
            <div className="relative w-28 h-28">
              <svg viewBox="0 0 100 100" className="w-full h-full -rotate-90">
                <circle cx="50" cy="50" r="38" fill="none" stroke="#1e2130" strokeWidth="10" />
                {requestTypes.map((seg) => (
                  <circle key={seg.label} cx="50" cy="50" r="38" fill="none"
                    stroke={seg.color} strokeWidth="10"
                    strokeDasharray={`${seg.pct * PR_C} ${PR_C}`}
                    strokeDashoffset={`${-seg.offset * PR_C}`}
                    strokeLinecap="butt" />
                ))}
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <p className="text-xl font-bold text-white">47</p>
                <p className="text-[10px] text-[#9ca3af]">requests</p>
              </div>
            </div>
          </div>
          <div className="px-4 pb-4 space-y-2 flex-1">
            {requestTypes.map((t) => (
              <div key={t.label}>
                <div className="flex items-center justify-between mb-1">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full" style={{ background: t.color }} />
                    <p className="text-xs text-white">{t.label}</p>
                  </div>
                  <p className="text-xs font-bold" style={{ color: t.color }}>{t.count}</p>
                </div>
                <div className="h-1 bg-[#1e2130] rounded-full overflow-hidden">
                  <div className="h-full rounded-full" style={{ width: `${Math.round(t.pct * 100)}%`, background: t.color }} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom row: SLA Performance + Jurisdiction & Regulations */}
      <div className="grid grid-cols-3 gap-3">

        {/* SLA Performance */}
        <div className="bg-[#13151f] border border-[#1e2130] rounded-lg overflow-hidden">
          <div className="px-4 pt-4 pb-3 border-b border-[#1e2130]">
            <p className="text-sm font-semibold text-white">SLA Performance</p>
            <p className="text-[10px] text-[#9ca3af] mt-0.5">This month · 38 completed</p>
          </div>
          <div className="p-4">
            {/* Big 94% */}
            <div className="text-center mb-3">
              <p className="text-4xl font-bold text-[#00B935] leading-none">94%</p>
              <p className="text-[11px] text-[#9ca3af] mt-1">on-time</p>
            </div>
            {/* Progress bar */}
            <div className="h-3 bg-[#1e2130] rounded-full overflow-hidden flex mb-1">
              <div className="h-full bg-[#00B935] rounded-l-full" style={{ width: '94%' }} />
              <div className="h-full bg-[#ef4444] rounded-r-full flex-1" />
            </div>
            <div className="flex items-center justify-between mb-4">
              <p className="text-[10px] text-[#00B935]">36 on-time</p>
              <p className="text-[10px] text-[#ef4444]">2 overdue</p>
            </div>
            <div className="border-t border-[#1e2130] pt-3">
              <p className="text-[10px] font-semibold text-[#9ca3af] mb-2">Avg response by type</p>
              {slaAvgByType.map((t) => (
                <div key={t.label} className="flex items-center justify-between py-1">
                  <p className="text-[10px] text-white">{t.label}</p>
                  <p className="text-[10px] font-bold" style={{ color: t.color }}>{t.days}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Jurisdiction & Regulations */}
        <div className="col-span-2 bg-[#13151f] border border-[#1e2130] rounded-lg overflow-hidden">
          <div className="px-4 pt-4 pb-3 border-b border-[#1e2130]">
            <p className="text-sm font-semibold text-white">Jurisdiction &amp; Regulations</p>
            <p className="text-[10px] text-[#9ca3af] mt-0.5">Open requests by governing regulation</p>
          </div>
          <div className="p-4 flex gap-6">
            {/* Jurisdiction bars */}
            <div className="flex-1 space-y-4">
              {jurisdictions.map((j) => (
                <div key={j.label}>
                  <div className="flex items-center gap-2 mb-0.5">
                    <div className="w-2 h-2 rounded-full" style={{ background: j.color }} />
                    <p className="text-[11px] font-medium text-white">{j.label}</p>
                  </div>
                  <p className="text-[10px] text-[#9ca3af] mb-1.5 ml-4">{j.detail}</p>
                  <div className="h-1 bg-[#1e2130] rounded-full overflow-hidden">
                    <div className="h-full rounded-full" style={{ width: `${j.pct}%`, background: j.color }} />
                  </div>
                </div>
              ))}
            </div>

            {/* Divider */}
            <div className="w-px bg-[#1e2130] self-stretch shrink-0" />

            {/* Quick Actions */}
            <div className="w-52 shrink-0">
              <p className="text-[12px] font-semibold text-white mb-3">Quick Actions</p>
              <div className="space-y-2">
                {privacyRightsActions.map((a) => (
                  <button key={a.label}
                    className={cn('w-full text-left px-3 py-2 rounded-md text-xs font-medium transition-opacity hover:opacity-80', a.cls)}>
                    {a.label}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

// ── Data Mapping dashboard data ───────────────────────────────────────────────

const dataMappingStats = [
  { label: 'Processing Activities', value: '342', sub: '↑12 added this month',  accent: '#00B935' },
  { label: 'Systems Mapped',        value: '87',  sub: 'of 94 identified',       accent: '#0788F7' },
  { label: 'Data Categories',       value: '12',  sub: 'active types tracked',   accent: '#976FE6' },
  { label: 'Article 30 Gaps',       value: '23',  sub: 'require attention ⚠',    accent: '#f59e0b' },
]

const processingActivities = [
  { name: 'Employee Payroll Processing', purpose: 'HR Admin',         basis: 'Legal Obligation', sensitivity: 'High',   sensColor: '#ef4444', status: 'Active',       stColor: '#00B935', highlight: true  },
  { name: 'Marketing Email Campaigns',   purpose: 'Direct Marketing', basis: 'Consent',          sensitivity: 'Medium', sensColor: '#f59e0b', status: 'Active',       stColor: '#00B935', highlight: false },
  { name: 'Customer Analytics & BI',     purpose: 'Analytics',        basis: 'Legit. Interest',  sensitivity: 'Medium', sensColor: '#f59e0b', status: 'Under Review', stColor: '#0788F7', highlight: false },
  { name: 'Vendor Data Sharing — EU',    purpose: 'Contract Perf.',   basis: 'Contract',         sensitivity: 'High',   sensColor: '#ef4444', status: 'Active',       stColor: '#00B935', highlight: false },
  { name: 'Cookie & Pixel Tracking',     purpose: 'Analytics',        basis: 'Consent',          sensitivity: 'Low',    sensColor: '#00B935', status: 'Needs Update', stColor: '#f59e0b', highlight: false },
]

const DM_C = 2 * Math.PI * 38
const legalBases = [
  { label: 'Consent',              detail: '35%  ·  120', pct: 0.35, color: '#0788F7', offset: 0    },
  { label: 'Legitimate Interest',  detail: '28%  ·  96',  pct: 0.28, color: '#976FE6', offset: 0.35 },
  { label: 'Contract',             detail: '22%  ·  75',  pct: 0.22, color: '#5b9baa', offset: 0.63 },
  { label: 'Legal Obligation',     detail: '15%  ·  51',  pct: 0.15, color: '#00B935', offset: 0.85 },
]

const systemInventory = [
  { initials: 'SC', name: 'Salesforce CRM',   cats: 'Contact, Financial',     barPct: 92, barColor: '#ef4444' },
  { initials: 'WH', name: 'Workday HRM',      cats: 'HR, Personal ID',        barPct: 88, barColor: '#ef4444' },
  { initials: 'SP', name: 'Stripe Payments',  cats: 'Financial, Transaction', barPct: 74, barColor: '#f59e0b' },
  { initials: 'M',  name: 'Marketo',          cats: 'Contact, Behavioral',    barPct: 45, barColor: '#00B935' },
]

const dataMappingActions = [
  { label: '+ Add Processing Activity', cls: 'bg-[#00B935]/10 text-[#00B935]' },
  { label: 'Run Gap Analysis',          cls: 'bg-[#f59e0b]/10 text-[#f59e0b]' },
  { label: 'Import from CSV / API',     cls: 'bg-[#0788F7]/10 text-[#0788F7]' },
  { label: 'Map New Data Source',       cls: 'bg-[#976FE6]/10 text-[#976FE6]' },
  { label: 'Export Article 30 Report',  cls: 'bg-[#5b9baa]/10 text-[#5b9baa]' },
  { label: 'View Data Flows Diagram',   cls: 'bg-[#1e2130] text-[#9ca3af]'    },
]

// ── Data Mapping Overview ─────────────────────────────────────────────────────

function DataMappingDashboard() {
  return (
    <div className="p-6 space-y-4">

      {/* Header */}
      <div>
        <h2 className="text-lg font-medium text-white">Processing Activities</h2>
        <p className="text-xs text-[#9ca3af] mt-0.5">Data Mapping &amp; RoPA  ·  Article 30 GDPR Registry  ·  342 records</p>
      </div>

      {/* Stat cards */}
      <div className="grid grid-cols-4 gap-3">
        {dataMappingStats.map((s) => (
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

      {/* Middle row: processing table + legal basis donut */}
      <div className="grid grid-cols-3 gap-3">

        {/* Processing Activities table */}
        <div className="col-span-2 bg-[#13151f] border border-[#1e2130] rounded-lg overflow-hidden">
          <div className="flex items-center justify-between px-4 py-3 bg-[#0f1117] border-b border-[#1e2130]">
            <p className="text-sm font-semibold text-white">Processing Activities</p>
            <div className="flex items-center gap-3">
              <button className="text-[11px] text-[#9ca3af] hover:text-white transition-colors">Filter ▾</button>
              <button className="text-[11px] text-[#5b9baa] hover:underline">Export →</button>
            </div>
          </div>
          <div className="px-4">
            {/* Column headers */}
            <div className="grid gap-2 py-2.5 border-b border-[#1e2130]"
              style={{ gridTemplateColumns: '1fr 90px 100px 72px 90px' }}>
              {['Activity Name', 'Purpose', 'Legal Basis', 'Sensitivity', 'Status'].map((h) => (
                <p key={h} className="text-[10px] font-semibold text-[#4b5563] uppercase tracking-wider">{h}</p>
              ))}
            </div>
            {/* Rows */}
            {processingActivities.map((row, i) => (
              <div key={i}
                className={cn(
                  "grid gap-2 py-3 border-b border-[#1e2130] last:border-0 cursor-pointer transition-colors -mx-4 px-4 items-center",
                  row.highlight ? "bg-[#00B935]/4 hover:bg-[#00B935]/6" : "hover:bg-[#1a1d2a]"
                )}
                style={{ gridTemplateColumns: '1fr 90px 100px 72px 90px' }}>
                <p className="text-xs font-medium text-white truncate">{row.name}</p>
                <p className="text-[10px] text-[#9ca3af]">{row.purpose}</p>
                <p className="text-[10px] text-[#9ca3af]">{row.basis}</p>
                <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full w-fit"
                  style={{ color: row.sensColor, background: `${row.sensColor}20` }}>{row.sensitivity}</span>
                <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full w-fit"
                  style={{ color: row.stColor, background: `${row.stColor}20` }}>{row.status}</span>
              </div>
            ))}
            <div className="flex items-center justify-between py-2.5">
              <p className="text-[10px] text-[#4b5563]">Showing 1–5 of 342 records</p>
              <p className="text-[10px] text-[#5b9baa]">← Prev &nbsp; 1 &nbsp; 2 &nbsp; 3 &nbsp; Next →</p>
            </div>
          </div>
        </div>

        {/* Legal Basis Breakdown */}
        <div className="bg-[#13151f] border border-[#1e2130] rounded-lg overflow-hidden flex flex-col">
          <div className="px-4 pt-4 pb-3 border-b border-[#1e2130]">
            <p className="text-sm font-semibold text-white">Legal Basis Breakdown</p>
            <p className="text-[10px] text-[#9ca3af] mt-0.5">by processing activity count</p>
          </div>
          {/* Donut */}
          <div className="flex items-center justify-center py-5">
            <div className="relative w-28 h-28">
              <svg viewBox="0 0 100 100" className="w-full h-full -rotate-90">
                <circle cx="50" cy="50" r="38" fill="none" stroke="#1e2130" strokeWidth="10" />
                {legalBases.map((seg) => (
                  <circle key={seg.label} cx="50" cy="50" r="38" fill="none"
                    stroke={seg.color} strokeWidth="10"
                    strokeDasharray={`${seg.pct * DM_C} ${DM_C}`}
                    strokeDashoffset={`${-seg.offset * DM_C}`}
                    strokeLinecap="butt" />
                ))}
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <p className="text-xl font-bold text-white">342</p>
                <p className="text-[10px] text-[#9ca3af]">total</p>
              </div>
            </div>
          </div>
          {/* Legend */}
          <div className="px-4 pb-4 space-y-3 flex-1">
            {legalBases.map((b) => (
              <div key={b.label}>
                <div className="flex items-center justify-between mb-1">
                  <div className="flex items-center gap-2">
                    <div className="w-2.5 h-2.5 rounded-sm" style={{ background: b.color }} />
                    <p className="text-[10px] text-white">{b.label}</p>
                  </div>
                  <p className="text-[10px] font-semibold" style={{ color: b.color }}>{b.detail}</p>
                </div>
                <div className="h-1 bg-[#1e2130] rounded-full overflow-hidden">
                  <div className="h-full rounded-full" style={{ width: `${b.pct * 100}%`, background: b.color }} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom row: system inventory + quick actions */}
      <div className="grid grid-cols-3 gap-3">

        {/* System Inventory */}
        <div className="bg-[#13151f] border border-[#1e2130] rounded-lg overflow-hidden">
          <div className="px-4 pt-4 pb-3 border-b border-[#1e2130]">
            <p className="text-sm font-semibold text-white">System Inventory</p>
            <p className="text-[10px] text-[#9ca3af] mt-0.5">Top systems by data volume</p>
          </div>
          <div className="divide-y divide-[#1e2130]">
            {systemInventory.map((sys) => (
              <div key={sys.name} className="px-4 py-3 hover:bg-[#1a1d2a] transition-colors cursor-pointer">
                <div className="flex items-center gap-3">
                  <div className="w-7 h-7 rounded-full shrink-0 flex items-center justify-center"
                    style={{ background: `${sys.barColor}18` }}>
                    <span className="text-[9px] font-bold" style={{ color: sys.barColor }}>{sys.initials}</span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-[11px] font-semibold text-white">{sys.name}</p>
                    <p className="text-[9px] text-[#9ca3af]">{sys.cats}</p>
                    <div className="mt-1.5 h-1 bg-[#1e2130] rounded-full overflow-hidden">
                      <div className="h-full rounded-full" style={{ width: `${sys.barPct}%`, background: sys.barColor }} />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="col-span-2 bg-[#13151f] border border-[#1e2130] rounded-lg overflow-hidden flex flex-col">
          <div className="px-4 pt-4 pb-3 border-b border-[#1e2130]">
            <p className="text-sm font-semibold text-white">Quick Actions</p>
          </div>
          <div className="p-4 flex-1">
            <div className="grid grid-cols-2 gap-2">
              {dataMappingActions.map((a) => (
                <button key={a.label}
                  className={cn('w-full text-left px-4 py-3 rounded-md text-xs font-medium transition-opacity hover:opacity-80', a.cls)}>
                  {a.label}
                </button>
              ))}
            </div>
          </div>
          {/* Article 30 coverage footer */}
          <div className="px-4 py-3 border-t border-[#1e2130] flex items-center gap-3">
            <p className="text-[10px] text-[#9ca3af] whitespace-nowrap shrink-0">Article 30 Coverage:</p>
            <div className="flex-1 h-1.5 bg-[#1e2130] rounded-full overflow-hidden">
              <div className="h-full bg-[#00B935] rounded-full" style={{ width: '85%' }} />
            </div>
            <p className="text-[10px] font-semibold text-[#00B935] whitespace-nowrap shrink-0">85% complete</p>
          </div>
        </div>
      </div>
    </div>
  )
}

// ── Privacy Notices dashboard data ────────────────────────────────────────────

const privacyNoticesStats = [
  { label: 'Active Notices',     value: '18',  sub: '↑2 added this month',   accent: '#5b9baa' },
  { label: 'Languages Covered',  value: '14',  sub: 'of 16 required',         accent: '#0788F7' },
  { label: 'Due for Review',     value: '3',   sub: '↑1 flagged this week',   accent: '#f59e0b' },
  { label: 'Avg. Consent Rate',  value: '76%', sub: '↑3% vs. last quarter',   accent: '#00B935' },
]

const noticeLibrary = [
  { name: 'GDPR Privacy Notice',   jurisdiction: 'EU / GDPR',       type: 'Cookie & Data',    status: 'Active',       stColor: '#00B935', highlight: true  },
  { name: 'CCPA Privacy Policy',   jurisdiction: 'US / California',  type: 'Consumer Rights',  status: 'Active',       stColor: '#00B935', highlight: false },
  { name: 'Cookie Consent Banner', jurisdiction: 'Global',           type: 'Cookie Consent',   status: 'Active',       stColor: '#00B935', highlight: false },
  { name: 'Employee Privacy Notice',jurisdiction: 'EU / Global',     type: 'HR & Employment',  status: 'Under Review', stColor: '#f59e0b', highlight: false },
  { name: 'Mktg. Consent Notice',  jurisdiction: 'EU',              type: 'Marketing',         status: 'Draft',        stColor: '#9ca3af', highlight: false },
]

const PN_C = 2 * Math.PI * 38
const noticeTypes = [
  { label: 'Cookie & Data',    detail: '39%  ·  7 notices', pct: 0.39, color: '#5b9baa', offset: 0    },
  { label: 'Consumer Rights',  detail: '28%  ·  5 notices', pct: 0.28, color: '#0788F7', offset: 0.39 },
  { label: 'HR & Employment',  detail: '17%  ·  3 notices', pct: 0.17, color: '#00B935', offset: 0.67 },
  { label: 'Marketing',        detail: '16%  ·  3 notices', pct: 0.16, color: '#f59e0b', offset: 0.84 },
]

const noticeTemplates = [
  { label: 'GDPR Privacy Notice Template', sub: 'EU · cookie & data processing',     color: '#5b9baa' },
  { label: 'CCPA Privacy Policy',          sub: 'US / California · consumer rights', color: '#0788F7' },
  { label: 'Employee Privacy Notice',      sub: 'HR & employment · global',          color: '#00B935' },
  { label: 'Custom / Blank Template',      sub: 'Build from scratch',                color: '#4b5563' },
]

const privacyNoticeActions = [
  { label: '+ Create New Notice',  cls: 'bg-[#5b9baa] text-white'           },
  { label: 'Import from Template', cls: 'bg-[#1e2130] text-[#9ca3af]'       },
  { label: 'Request Legal Review', cls: 'bg-[#1e2130] text-[#9ca3af]'       },
  { label: 'Translate Notice',     cls: 'bg-[#5b9baa]/10 text-[#5b9baa]'   },
  { label: 'Export Notice PDF',    cls: 'bg-[#1e2130] text-[#9ca3af]'       },
  { label: 'View Consent Logs',    cls: 'bg-[#1e2130] text-[#9ca3af]'       },
]

// ── Privacy Notices Overview ───────────────────────────────────────────────────

function PrivacyNoticesDashboard() {
  return (
    <div className="p-6 space-y-4">

      {/* Header */}
      <div>
        <h2 className="text-lg font-medium text-white">Privacy Notice Library</h2>
        <p className="text-xs text-[#9ca3af] mt-0.5">Privacy Notices  ·  18 active notices  ·  14 languages covered</p>
      </div>

      {/* Stat cards */}
      <div className="grid grid-cols-4 gap-3">
        {privacyNoticesStats.map((s) => (
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

      {/* Middle row: notice library table + notice type donut */}
      <div className="grid grid-cols-3 gap-3">

        {/* Notice Library table */}
        <div className="col-span-2 bg-[#13151f] border border-[#1e2130] rounded-lg overflow-hidden">
          <div className="flex items-center justify-between px-4 py-3 bg-[#0f1117] border-b border-[#1e2130]">
            <p className="text-sm font-semibold text-white">Notice Library</p>
            <div className="flex items-center gap-3">
              <button className="text-[11px] text-[#9ca3af] hover:text-white transition-colors">Filter ▾</button>
              <button className="text-[11px] text-[#5b9baa] hover:underline">Export →</button>
            </div>
          </div>
          <div className="px-4">
            {/* Column headers */}
            <div className="grid gap-2 py-2.5 border-b border-[#1e2130]"
              style={{ gridTemplateColumns: '1fr 110px 110px 90px' }}>
              {['Notice Name', 'Jurisdiction', 'Type', 'Status'].map((h) => (
                <p key={h} className="text-[10px] font-semibold text-[#4b5563] uppercase tracking-wider">{h}</p>
              ))}
            </div>
            {/* Rows */}
            {noticeLibrary.map((row, i) => (
              <div key={i}
                className={cn(
                  "grid gap-2 py-3 border-b border-[#1e2130] last:border-0 cursor-pointer transition-colors -mx-4 px-4 items-center",
                  row.highlight ? "bg-[#5b9baa]/5 hover:bg-[#5b9baa]/8" : "hover:bg-[#1a1d2a]"
                )}
                style={{ gridTemplateColumns: '1fr 110px 110px 90px' }}>
                <p className={cn("text-xs font-medium truncate", row.highlight ? "text-[#5b9baa] font-semibold" : "text-white")}>
                  {row.name}
                </p>
                <p className="text-[10px] text-[#9ca3af]">{row.jurisdiction}</p>
                <p className="text-[10px] text-[#9ca3af]">{row.type}</p>
                <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full w-fit"
                  style={{ color: row.stColor, background: `${row.stColor}20` }}>{row.status}</span>
              </div>
            ))}
            <div className="flex items-center justify-between py-2.5">
              <p className="text-[10px] text-[#5b9baa]">← Prev &nbsp; <span className="font-semibold">1</span> &nbsp; 2 &nbsp; 3 &nbsp; Next →</p>
              <p className="text-[10px] text-[#4b5563]">Showing 1–5 of 18 notices</p>
            </div>
          </div>
        </div>

        {/* Notice Type Breakdown donut */}
        <div className="bg-[#13151f] border border-[#1e2130] rounded-lg overflow-hidden flex flex-col">
          <div className="px-4 pt-4 pb-3 border-b border-[#1e2130]">
            <p className="text-sm font-semibold text-white">Notice Type Breakdown</p>
            <p className="text-[10px] text-[#9ca3af] mt-0.5">by active notice count</p>
          </div>
          {/* Donut */}
          <div className="flex items-center justify-center py-5">
            <div className="relative w-28 h-28">
              <svg viewBox="0 0 100 100" className="w-full h-full -rotate-90">
                <circle cx="50" cy="50" r="38" fill="none" stroke="#1e2130" strokeWidth="10" />
                {noticeTypes.map((seg) => (
                  <circle key={seg.label} cx="50" cy="50" r="38" fill="none"
                    stroke={seg.color} strokeWidth="10"
                    strokeDasharray={`${seg.pct * PN_C} ${PN_C}`}
                    strokeDashoffset={`${-seg.offset * PN_C}`}
                    strokeLinecap="butt" />
                ))}
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <p className="text-xl font-bold text-white">18</p>
                <p className="text-[10px] text-[#9ca3af]">total</p>
              </div>
            </div>
          </div>
          {/* Legend */}
          <div className="px-4 pb-4 space-y-3 flex-1">
            {noticeTypes.map((t) => (
              <div key={t.label} className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-sm" style={{ background: t.color }} />
                  <p className="text-[10px] text-white">{t.label}</p>
                </div>
                <p className="text-[10px] text-[#4b5563]">{t.detail}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom row: template library + quick actions */}
      <div className="grid grid-cols-3 gap-3">

        {/* Template Library */}
        <div className="bg-[#13151f] border border-[#1e2130] rounded-lg overflow-hidden">
          <div className="px-4 pt-4 pb-3 border-b border-[#1e2130]">
            <p className="text-sm font-semibold text-white">Template Library</p>
          </div>
          <div className="divide-y divide-[#1e2130]">
            {noticeTemplates.map((t) => (
              <div key={t.label} className="flex items-start gap-3 px-4 py-3 hover:bg-[#1a1d2a] transition-colors cursor-pointer">
                <div className="w-2 h-2 rounded-sm mt-1.5 shrink-0" style={{ background: t.color }} />
                <div className="min-w-0">
                  <p className="text-xs font-medium text-white truncate">{t.label}</p>
                  <p className="text-[10px] text-[#4b5563] mt-0.5">{t.sub}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="col-span-2 bg-[#13151f] border border-[#1e2130] rounded-lg overflow-hidden flex flex-col">
          <div className="px-4 pt-4 pb-3 border-b border-[#1e2130]">
            <p className="text-sm font-semibold text-white">Quick Actions</p>
          </div>
          <div className="p-4 flex-1">
            <div className="grid grid-cols-3 gap-2">
              {privacyNoticeActions.map((a) => (
                <button key={a.label}
                  className={cn('w-full text-left px-3 py-3 rounded-md text-xs font-semibold transition-opacity hover:opacity-80', a.cls)}>
                  {a.label}
                </button>
              ))}
            </div>
          </div>
          {/* Notice coverage footer */}
          <div className="px-4 py-3 border-t border-[#1e2130] flex items-center gap-3">
            <p className="text-[10px] text-[#9ca3af] whitespace-nowrap shrink-0">Notice Coverage:</p>
            <div className="flex-1 h-1.5 bg-[#1e2130] rounded-full overflow-hidden">
              <div className="h-full bg-[#5b9baa] rounded-full" style={{ width: '78%' }} />
            </div>
            <p className="text-[10px] font-semibold text-[#5b9baa] whitespace-nowrap shrink-0">78% current</p>
          </div>
        </div>
      </div>
    </div>
  )
}

// ── Benchmarking dashboard data ───────────────────────────────────────────────

const benchmarkingStats = [
  { label: 'Maturity Score',       value: '3.4',  sub: '↑0.2 vs. last quarter',     accent: '#976FE6' },
  { label: 'Industry Percentile',  value: '68th', sub: 'top tier threshold: 80th',   accent: '#0788F7' },
  { label: 'Regulation Coverage',  value: '84%',  sub: '↑6% from Q1 2026',          accent: '#00B935' },
  { label: 'Critical Gaps',        value: '7',    sub: '↓3 resolved this quarter',   accent: '#f59e0b' },
]

const moduleScores = [
  { name: 'Data Mapping & RoPA',  score: 4.1, barColor: '#00B935', indAvg: 3.8, gap: '+0.3', gapColor: '#00B935', trend: '↑', trendColor: '#00B935', highlight: false },
  { name: 'Privacy Notices',      score: 3.8, barColor: '#00B935', indAvg: 3.5, gap: '+0.3', gapColor: '#00B935', trend: '↑', trendColor: '#00B935', highlight: false },
  { name: 'Consent Management',   score: 3.6, barColor: '#00B935', indAvg: 3.6, gap: '0.0',  gapColor: '#4b5563', trend: '→', trendColor: '#4b5563', highlight: false },
  { name: 'Privacy Rights DSAR',  score: 3.5, barColor: '#f59e0b', indAvg: 3.7, gap: '–0.2', gapColor: '#f59e0b', trend: '→', trendColor: '#4b5563', highlight: false },
  { name: 'PIA & DPIA',           score: 3.2, barColor: '#f59e0b', indAvg: 3.4, gap: '���0.2', gapColor: '#f59e0b', trend: '↓', trendColor: '#ef4444', highlight: true  },
  { name: 'Incident Response',    score: 3.0, barColor: '#ef4444', indAvg: 3.6, gap: '–0.6', gapColor: '#ef4444', trend: '→', trendColor: '#4b5563', highlight: false },
]

const industryComparison = [
  { label: 'Process Maturity', yourScore: 3.8, indAvg: 3.7 },
  { label: 'Tech Coverage',    yourScore: 3.2, indAvg: 3.5 },
  { label: 'Risk Integration', yourScore: 3.5, indAvg: 3.4 },
  { label: 'Automation Level', yourScore: 2.8, indAvg: 3.1 },
]

const regulationCoverage = [
  { label: 'GDPR (EU)',        pct: 92, color: '#00B935' },
  { label: 'CCPA (US/CA)',     pct: 86, color: '#00B935' },
  { label: 'LGPD (Brazil)',    pct: 71, color: '#f59e0b' },
  { label: 'PIPEDA (Canada)',  pct: 68, color: '#f59e0b' },
  { label: 'India DPDP',       pct: 24, color: '#ef4444' },
]

const benchmarkingActions = [
  { label: 'Run Full Assessment',       cls: 'bg-[#976FE6] text-white'           },
  { label: 'Export Benchmark Report',   cls: 'bg-[#1e2130] text-[#9ca3af]'       },
  { label: 'Schedule Quarterly Review', cls: 'bg-[#1e2130] text-[#9ca3af]'       },
  { label: 'Compare with Peers',        cls: 'bg-[#976FE6]/10 text-[#976FE6]'   },
  { label: 'View Gap Analysis',         cls: 'bg-[#1e2130] text-[#9ca3af]'       },
  { label: 'Download Exec Summary',     cls: 'bg-[#1e2130] text-[#9ca3af]'       },
]

// ── Benchmarking Overview ─────────────────────────────────────────────────────

function BenchmarkingDashboard() {
  return (
    <div className="p-6 space-y-4">

      {/* Header */}
      <div>
        <h2 className="text-lg font-medium text-white">Program Benchmarking</h2>
        <p className="text-xs text-[#9ca3af] mt-0.5">Benchmarking  ·  6 modules assessed  ·  Q2 2026  ·  last updated 3 days ago</p>
      </div>

      {/* Stat cards */}
      <div className="grid grid-cols-4 gap-3">
        {benchmarkingStats.map((s) => (
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

      {/* Middle row: module scores + industry comparison */}
      <div className="grid grid-cols-3 gap-3">

        {/* Module Benchmark Scores */}
        <div className="col-span-2 bg-[#13151f] border border-[#1e2130] rounded-lg overflow-hidden">
          <div className="flex items-center justify-between px-4 py-3 bg-[#0f1117] border-b border-[#1e2130]">
            <p className="text-sm font-semibold text-white">Module Benchmark Scores</p>
            <div className="flex items-center gap-3">
              <button className="text-[11px] text-[#9ca3af] hover:text-white transition-colors">Filter ▾</button>
              <button className="text-[11px] text-[#976FE6] hover:underline">Export →</button>
            </div>
          </div>
          <div className="px-4">
            {/* Column headers */}
            <div className="grid gap-2 py-2.5 border-b border-[#1e2130]"
              style={{ gridTemplateColumns: '1fr 100px 72px 64px 48px' }}>
              {['Module', 'Score', 'Ind. Avg', 'Gap', 'Trend'].map((h) => (
                <p key={h} className="text-[10px] font-semibold text-[#4b5563] uppercase tracking-wider">{h}</p>
              ))}
            </div>
            {/* Rows */}
            {moduleScores.map((row, i) => (
              <div key={i}
                className={cn(
                  "grid gap-2 py-2.5 border-b border-[#1e2130] last:border-0 cursor-pointer transition-colors -mx-4 px-4 items-center",
                  row.highlight ? "bg-[#976FE6]/6 hover:bg-[#976FE6]/8" : "hover:bg-[#1a1d2a]"
                )}
                style={{ gridTemplateColumns: '1fr 100px 72px 64px 48px' }}>
                <p className={cn("text-xs font-medium truncate", row.highlight ? "text-[#976FE6] font-semibold" : "text-white")}>
                  {row.name}
                </p>
                <div>
                  <p className="text-xs font-semibold text-white mb-1">{row.score.toFixed(1)}</p>
                  <div className="h-1.5 bg-[#1e2130] rounded-full overflow-hidden w-14">
                    <div className="h-full rounded-full" style={{ width: `${(row.score / 5) * 100}%`, background: row.barColor }} />
                  </div>
                </div>
                <p className="text-[11px] text-[#4b5563]">{row.indAvg.toFixed(1)}</p>
                <p className="text-[11px] font-semibold" style={{ color: row.gapColor }}>{row.gap}</p>
                <p className="text-base font-bold" style={{ color: row.trendColor }}>{row.trend}</p>
              </div>
            ))}
            <div className="flex items-center justify-between py-2.5">
              <p className="text-[10px] text-[#976FE6]">← Prev &nbsp; <span className="font-semibold">1</span> &nbsp; 2 &nbsp; Next →</p>
              <p className="text-[10px] text-[#4b5563]">Showing 6 of 8 assessed modules</p>
            </div>
          </div>
        </div>

        {/* Industry Comparison */}
        <div className="bg-[#13151f] border border-[#1e2130] rounded-lg overflow-hidden flex flex-col">
          <div className="px-4 pt-4 pb-3 border-b border-[#1e2130]">
            <p className="text-sm font-semibold text-white">Industry Comparison</p>
            <p className="text-[10px] text-[#9ca3af] mt-0.5">your score vs. industry average</p>
          </div>
          {/* Legend */}
          <div className="flex items-center gap-4 px-4 pt-3 pb-2">
            <div className="flex items-center gap-1.5">
              <div className="w-2.5 h-2.5 rounded-sm bg-[#976FE6]" />
              <p className="text-[10px] text-[#9ca3af]">Your Score</p>
            </div>
            <div className="flex items-center gap-1.5">
              <div className="w-5 h-0.5 bg-[#4b5563]" />
              <p className="text-[10px] text-[#9ca3af]">Industry Avg</p>
            </div>
          </div>
          <div className="px-4 pb-4 flex-1 space-y-5">
            {industryComparison.map((row) => {
              const yourPct = (row.yourScore / 5) * 100
              const avgPct  = (row.indAvg   / 5) * 100
              return (
                <div key={row.label}>
                  <p className="text-[11px] text-white mb-2">{row.label}</p>
                  <div className="relative h-2 bg-[#1e2130] rounded-full overflow-visible">
                    <div className="absolute h-full bg-[#976FE6] rounded-full"
                      style={{ width: `${yourPct}%` }} />
                    {/* industry avg marker */}
                    <div className="absolute top-1/2 -translate-y-1/2 w-0.5 h-4 bg-[#4b5563] rounded-sm"
                      style={{ left: `${avgPct}%` }} />
                  </div>
                  <div className="flex items-center justify-between mt-1.5">
                    <p className="text-[10px] font-semibold text-[#976FE6]">{row.yourScore.toFixed(1)}</p>
                    <p className="text-[10px] text-[#4b5563]">{row.indAvg.toFixed(1)}</p>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>

      {/* Bottom row: regulation coverage + quick actions */}
      <div className="grid grid-cols-3 gap-3">

        {/* Regulation Coverage */}
        <div className="bg-[#13151f] border border-[#1e2130] rounded-lg overflow-hidden">
          <div className="px-4 pt-4 pb-3 border-b border-[#1e2130]">
            <p className="text-sm font-semibold text-white">Regulation Coverage</p>
          </div>
          <div className="p-4 space-y-4">
            {regulationCoverage.map((r) => (
              <div key={r.label}>
                <div className="flex items-center justify-between mb-1.5">
                  <p className="text-[11px] text-white">{r.label}</p>
                  <p className="text-[11px] font-semibold" style={{ color: r.color }}>{r.pct}%</p>
                </div>
                <div className="h-1.5 bg-[#1e2130] rounded-full overflow-hidden">
                  <div className="h-full rounded-full" style={{ width: `${r.pct}%`, background: r.color }} />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="col-span-2 bg-[#13151f] border border-[#1e2130] rounded-lg overflow-hidden flex flex-col">
          <div className="px-4 pt-4 pb-3 border-b border-[#1e2130]">
            <p className="text-sm font-semibold text-white">Quick Actions</p>
          </div>
          <div className="p-4 flex-1">
            <div className="grid grid-cols-3 gap-2">
              {benchmarkingActions.map((a) => (
                <button key={a.label}
                  className={cn('w-full text-left px-3 py-3 rounded-md text-xs font-semibold transition-opacity hover:opacity-80', a.cls)}>
                  {a.label}
                </button>
              ))}
            </div>
          </div>
          {/* Modules benchmarked footer */}
          <div className="px-4 py-3 border-t border-[#1e2130] flex items-center gap-3">
            <p className="text-[10px] text-[#9ca3af] whitespace-nowrap shrink-0">Modules Benchmarked:</p>
            <div className="flex-1 h-1.5 bg-[#1e2130] rounded-full overflow-hidden">
              <div className="h-full bg-[#976FE6] rounded-full" style={{ width: '75%' }} />
            </div>
            <p className="text-[10px] font-semibold text-[#976FE6] whitespace-nowrap shrink-0">75% — 6 of 8</p>
          </div>
        </div>
      </div>
    </div>
  )
}

// ── Maturity & Planning dashboard data ───────────────────────────────────────

const maturityStats = [
  { label: 'Maturity Score',       value: '3.4',  sub: 'of 5.0  ·  Level 3 — Defined',  accent: '#f59e0b' },
  { label: 'Regulations Covered',  value: '14',   sub: 'of 18 identified (78%)',          accent: '#00B935' },
  { label: 'Open Gaps',            value: '23',   sub: '7 critical · 10 high · 6 med',   accent: '#ef4444' },
  { label: 'Q2 Milestones',        value: '8/12', sub: '67% complete  ·  4 remaining',   accent: '#0788F7' },
]

const maturityModules = [
  { name: 'PIA & DPIA',            score: 4.1, barColor: '#5b9baa', targetPct: 90 },
  { name: 'Data Mapping',          score: 3.8, barColor: '#5b9baa', targetPct: 80 },
  { name: 'Incident Management',   score: 2.9, barColor: '#f59e0b', targetPct: 80 },
  { name: 'Privacy Rights / DSAR', score: 3.6, barColor: '#5b9baa', targetPct: 90 },
  { name: 'Privacy Notices',       score: 4.2, barColor: '#5b9baa', targetPct: 90 },
  { name: 'Program Benchmarking',  score: 2.4, barColor: '#f97316', targetPct: 70 },
  { name: 'Maturity & Planning',   score: 3.1, barColor: '#f59e0b', targetPct: 80 },
  { name: 'Training',              score: 3.7, barColor: '#5b9baa', targetPct: 90 },
]

const maturityRegulations = [
  { label: 'GDPR (EU)',           pct: 92, color: '#00B935' },
  { label: 'CCPA / CPRA (CA)',    pct: 87, color: '#00B935' },
  { label: 'LGPD (Brazil)',       pct: 71, color: '#f59e0b' },
  { label: 'PIPEDA (Canada)',     pct: 65, color: '#f59e0b' },
  { label: 'PDPA (Thailand)',     pct: 48, color: '#ef4444'  },
  { label: 'POPIA (South Africa)',pct: 42, color: '#ef4444'  },
  { label: 'China PIPL',         pct: 28, color: '#ef4444'  },
  { label: 'India DPDP',         pct: 15, color: '#ef4444'  },
]

const GAP_C = 2 * Math.PI * 32
const gapSegments = [
  { label: 'Critical', count: 7,  color: '#ef4444', pct: 7  / 23, offset: 0       },
  { label: 'High',     count: 10, color: '#f59e0b', pct: 10 / 23, offset: 7  / 23 },
  { label: 'Medium',   count: 6,  color: '#f97316', pct: 6  / 23, offset: 17 / 23 },
]

const roadmilestones = [
  { dot: '#5b9baa', name: 'Complete DPIA Process Documentation', initials: 'KM', due: 'Due Jun 15', pct: 45,  barColor: '#f59e0b', status: 'In Progress', stColor: '#f59e0b' },
  { dot: '#0788F7', name: 'CCPA Opt-Out Flow Implementation',    initials: 'PS', due: 'Due Jun 30', pct: 70,  barColor: '#0788F7', status: 'In Progress', stColor: '#0788F7' },
  { dot: '#00B935', name: 'Incident Response Playbook v2',       initials: 'TC', due: 'Due May 30', pct: 100, barColor: '#00B935', status: 'Complete',    stColor: '#00B935' },
  { dot: '#ef4444', name: 'China PIPL Gap Assessment',           initials: 'KM', due: 'Due Jul 1',  pct: 0,   barColor: '#1e2130', status: 'Not Started', stColor: '#ef4444' },
]

// ── Maturity & Planning Overview ──────────────────────────────────────────────

function MaturityPlanningDashboard() {
  return (
    <div className="p-6 space-y-4">

      {/* Status banner */}
      <div className="flex items-center justify-between px-4 py-2.5 bg-[#f59e0b]/8 border border-[#f59e0b]/20 rounded-lg">
        <div className="flex items-center gap-2">
          <div className="w-1 h-5 rounded-sm bg-[#f59e0b] shrink-0" />
          <p className="text-[11px] text-[#f59e0b] font-medium">
            Program is at Level 3 (Defined)  ·  Target: Level 4 (Managed) by Q4 2026  ·  Gap: 7 critical items require remediation
          </p>
        </div>
      </div>

      {/* Header */}
      <div>
        <h2 className="text-lg font-medium text-white">Program Maturity Overview</h2>
        <p className="text-xs text-[#9ca3af] mt-0.5">Maturity &amp; Planning  ·  NIST Privacy Framework  ·  Q2 2026 Assessment</p>
      </div>

      {/* Stat cards */}
      <div className="grid grid-cols-4 gap-3">
        {maturityStats.map((s) => (
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

      {/* Middle row: maturity by module + regulation coverage */}
      <div className="grid grid-cols-3 gap-3">

        {/* Maturity by Module horizontal bars */}
        <div className="col-span-2 bg-[#13151f] border border-[#1e2130] rounded-lg overflow-hidden">
          <div className="flex items-center justify-between px-4 py-3 bg-[#0f1117] border-b border-[#1e2130]">
            <p className="text-sm font-semibold text-white">Maturity by Module</p>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-1.5">
                <div className="w-2.5 h-2.5 rounded-sm bg-[#f59e0b]" />
                <p className="text-[10px] text-[#9ca3af]">Current</p>
              </div>
              <div className="flex items-center gap-1.5">
                <div className="w-2.5 h-2.5 rounded-sm bg-[#1e2130]" />
                <p className="text-[10px] text-[#9ca3af]">Target</p>
              </div>
            </div>
          </div>
          <div className="px-4 pt-3 pb-1">
            <div className="space-y-2.5">
              {maturityModules.map((m) => {
                const barPct = (m.score / 5) * 100
                return (
                  <div key={m.name} className="flex items-center gap-3">
                    <p className="text-[10px] text-white w-36 shrink-0 truncate">{m.name}</p>
                    <p className="text-[10px] font-bold w-6 shrink-0" style={{ color: m.barColor }}>{m.score.toFixed(1)}</p>
                    <div className="relative flex-1 h-2.5 bg-[#1e2130] rounded-full overflow-visible">
                      <div className="absolute h-full rounded-full" style={{ width: `${barPct}%`, background: m.barColor }} />
                      {/* Target marker */}
                      <div className="absolute top-1/2 -translate-y-1/2 w-0.5 h-4 bg-[#4b5563] rounded-sm"
                        style={{ left: `${m.targetPct}%` }} />
                    </div>
                  </div>
                )
              })}
            </div>
            {/* X-axis */}
            <div className="mt-3 ml-[168px] flex justify-between pb-1">
              {['0', '1', '2', '3', '4', '5'].map((n) => (
                <p key={n} className="text-[9px] text-[#4b5563]">{n}</p>
              ))}
            </div>
            <div className="ml-[168px] flex justify-between pb-2 -mt-0.5">
              {['L1 Initial', 'L2 Developing', 'L3 Defined', 'L4 Managed', 'L5 Optimized'].map((l) => (
                <p key={l} className="text-[8px] text-[#4b5563]">{l}</p>
              ))}
            </div>
          </div>
        </div>

        {/* Regulation Coverage */}
        <div className="bg-[#13151f] border border-[#1e2130] rounded-lg overflow-hidden flex flex-col">
          <div className="px-4 pt-4 pb-3 border-b border-[#1e2130]">
            <p className="text-sm font-semibold text-white">Regulation Coverage</p>
            <p className="text-[10px] text-[#9ca3af] mt-0.5">Compliance readiness by framework</p>
          </div>
          <div className="p-4 space-y-3 flex-1 overflow-auto">
            {maturityRegulations.map((r) => (
              <div key={r.label}>
                <div className="flex items-center justify-between mb-1">
                  <p className="text-[10px] text-white">{r.label}</p>
                  <p className="text-[10px] font-bold" style={{ color: r.color }}>{r.pct}%</p>
                </div>
                <div className="h-1 bg-[#1e2130] rounded-full overflow-hidden">
                  <div className="h-full rounded-full" style={{ width: `${r.pct}%`, background: r.color }} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom row: gap analysis + roadmap milestones */}
      <div className="grid grid-cols-3 gap-3">

        {/* Gap Analysis */}
        <div className="bg-[#13151f] border border-[#1e2130] rounded-lg overflow-hidden flex flex-col">
          <div className="px-4 pt-4 pb-3 border-b border-[#1e2130]">
            <p className="text-sm font-semibold text-white">Gap Analysis</p>
            <p className="text-[10px] text-[#9ca3af] mt-0.5">23 open gaps across platform</p>
          </div>
          {/* Donut */}
          <div className="flex items-center justify-center py-4">
            <div className="relative w-24 h-24">
              <svg viewBox="0 0 100 100" className="w-full h-full -rotate-90">
                <circle cx="50" cy="50" r="32" fill="none" stroke="#1e2130" strokeWidth="10" />
                {gapSegments.map((seg) => (
                  <circle key={seg.label} cx="50" cy="50" r="32" fill="none"
                    stroke={seg.color} strokeWidth="10"
                    strokeDasharray={`${seg.pct * GAP_C} ${GAP_C}`}
                    strokeDashoffset={`${-seg.offset * GAP_C}`}
                    strokeLinecap="butt" />
                ))}
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <p className="text-xl font-bold text-white">23</p>
                <p className="text-[10px] text-[#9ca3af]">gaps</p>
              </div>
            </div>
          </div>
          {/* Legend */}
          <div className="px-4 pb-3">
            <div className="grid grid-cols-3 gap-2 text-center">
              {gapSegments.map((seg) => (
                <div key={seg.label}>
                  <p className="text-[9px] text-[#9ca3af]">{seg.label}</p>
                  <p className="text-sm font-bold mt-0.5" style={{ color: seg.color }}>{seg.count}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="px-4 py-2.5 border-t border-[#1e2130]">
            <p className="text-[9px] text-[#ef4444]">Top gap: DPIA documentation incomplete</p>
          </div>
        </div>

        {/* Roadmap Milestones */}
        <div className="col-span-2 bg-[#13151f] border border-[#1e2130] rounded-lg overflow-hidden flex flex-col">
          <div className="flex items-center justify-between px-4 py-3 bg-[#0f1117] border-b border-[#1e2130]">
            <p className="text-sm font-semibold text-white">Roadmap Milestones</p>
            <div className="flex items-center gap-1.5">
              {[
                { label: 'Q2 2026 (Current)', active: true  },
                { label: 'Q3 2026',           active: false },
                { label: 'Q4 2026',           active: false },
              ].map((q) => (
                <button key={q.label}
                  className={cn(
                    'text-[9px] font-medium px-2 py-0.5 rounded-full transition-colors',
                    q.active
                      ? 'bg-[#f59e0b]/15 text-[#f59e0b]'
                      : 'bg-[#1e2130] text-[#4b5563] hover:text-white'
                  )}>
                  {q.label}
                </button>
              ))}
            </div>
          </div>
          <div className="flex-1 divide-y divide-[#1e2130]">
            {roadmilestones.map((m) => (
              <div key={m.name} className="flex items-center gap-3 px-4 py-3 hover:bg-[#1a1d2a] transition-colors cursor-pointer">
                {/* Status dot */}
                <div className="w-2 h-2 rounded-full shrink-0" style={{ background: m.dot }} />
                {/* Name + assignee + due */}
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-medium text-white truncate">{m.name}</p>
                  <div className="flex items-center gap-2 mt-1">
                    <div className="px-1.5 py-0.5 rounded bg-[#5b9baa]/15">
                      <span className="text-[8px] font-bold text-[#5b9baa]">{m.initials}</span>
                    </div>
                    <p className="text-[9px] text-[#4b5563]">{m.due}</p>
                  </div>
                </div>
                {/* Progress bar + % + status */}
                <div className="flex items-center gap-2 shrink-0">
                  <div className="w-28">
                    <div className="h-1.5 bg-[#1e2130] rounded-full overflow-hidden">
                      <div className="h-full rounded-full" style={{ width: `${m.pct}%`, background: m.barColor }} />
                    </div>
                    <p className="text-[9px] text-[#4b5563] mt-0.5">{m.pct}%</p>
                  </div>
                  <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full whitespace-nowrap"
                    style={{ color: m.stColor, background: `${m.stColor}20` }}>{m.status}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

// ── Overview dispatcher ───────────────────────────────────────────────────────

function OverviewContent({ item }: { item: PrivacyRecordItem }) {
  switch (item) {
    case 'pia-dpia':         return <PiaDpiaDashboard />
    case 'incidents':        return <IncidentManagementDashboard />
    case 'privacy-rights':   return <PrivacyRightsDashboard />
    case 'data-mapping':     return <DataMappingDashboard />
    case 'privacy-notices':  return <PrivacyNoticesDashboard />
    case 'benchmarking':      return <BenchmarkingDashboard />
    case 'maturity-planning': return <MaturityPlanningDashboard />
    default:
      return (
        <div className="flex flex-col items-center justify-center h-64 text-center px-6">
          <p className="text-sm font-medium text-white mb-1">
            {recordItems.find(r => r.id === item)?.label} Overview
          </p>
          <p className="text-xs text-[#9ca3af]">Dashboard coming soon for this section.</p>
        </div>
      )
  }
}

// ── Main module ───────────────────────────────────────────────────────────────

export function PrivacyManagementModule() {
  const [activeTab, setActiveTab] = useState<SecondaryTab>('overview')
  const [privacyRightsTertiary, setPrivacyRightsTertiary] = useState<PrivacyRightsTertiaryTab>('requests')
  const [dataMappingTertiary, setDataMappingTertiary] = useState<DataMappingTertiaryTab>('pending')
  const { setSelectedRecordId } = useNavigation()

  const statusColors: Record<string, string> = {
    'Draft':                 'bg-[#9ca3af]/10 text-[#9ca3af]',
    'In Review':             'bg-[#FFEF3C]/10 text-[#FFEF3C]',
    'Approved':              'bg-[#00B935]/10 text-[#00B935]',
    'Published':             'bg-[#00B935]/10 text-[#00B935]',
    'Active':                'bg-[#00B935]/10 text-[#00B935]',
    'Archived':              'bg-[#4b5563]/10 text-[#9ca3af]',
    'Overdue':               'bg-[#ef4444]/10 text-[#ef4444]',
    'Open':                  'bg-[#ef4444]/10 text-[#ef4444]',
    'Under Investigation':   'bg-[#FFEF3C]/10 text-[#FFEF3C]',
    'Resolved':              'bg-[#00B935]/10 text-[#00B935]',
    'Reported to Authority': 'bg-[#0788F7]/10 text-[#0788F7]',
    'New':                   'bg-[#0788F7]/10 text-[#0788F7]',
    'In Progress':           'bg-[#FFEF3C]/10 text-[#FFEF3C]',
    'Completed':             'bg-[#00B935]/10 text-[#00B935]',
    'Rejected':              'bg-[#ef4444]/10 text-[#ef4444]',
    'Compliant':             'bg-[#00B935]/10 text-[#00B935]',
    'Partially Compliant':   'bg-[#FFEF3C]/10 text-[#FFEF3C]',
    'Non-Compliant':         'bg-[#ef4444]/10 text-[#ef4444]',
    'On Track':              'bg-[#00B935]/10 text-[#00B935]',
    'At Risk':               'bg-[#FFEF3C]/10 text-[#FFEF3C]',
    'Behind':                'bg-[#ef4444]/10 text-[#ef4444]',
    'Achieved':              'bg-[#6CEEAD]/10 text-[#6CEEAD]',
  }

  const severityColors: Record<string, string> = {
    'Critical': 'bg-[#ef4444]/10 text-[#ef4444]',
    'High':     'bg-[#FFEF3C]/10 text-[#FFEF3C]',
    'Medium':   'bg-[#0788F7]/10 text-[#0788F7]',
    'Low':      'bg-[#00B935]/10 text-[#00B935]',
  }

  return (
    <div className="h-full flex flex-col">
      {/* Secondary Tabs - Horizontal tab strip */}
      <div className="border-b border-[#1e2130] px-6 shrink-0">
        <div className="flex gap-1">
          {secondaryTabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={cn(
                "px-4 py-3 text-sm font-medium transition-colors relative whitespace-nowrap",
                activeTab === tab.id ? "text-[#6CEEAD]" : "text-[#9ca3af] hover:text-white"
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

      {/* Tab Content */}
      <div className="flex-1 overflow-auto">

        {/* Tab 1: Overview (Default) */}
        {activeTab === 'overview' && <PiaDpiaDashboard />}

        {/* Tab 2: Incident Manager */}
        {activeTab === 'incidents' && (
          <div className="p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-medium text-white">Incident Register</h2>
              <button className="flex items-center gap-2 px-4 py-2 bg-[#6CEEAD] text-[#0f1117] rounded-md text-sm font-medium hover:bg-[#5dd99c] transition-colors">
                <Plus className="w-4 h-4" />
                Add incident
              </button>
            </div>
            <div className="bg-[#13151f] border border-[#1e2130] rounded-lg overflow-hidden">
              <div className="px-4">
                <div className="grid gap-4 py-3 border-b border-[#1e2130]"
                  style={{ gridTemplateColumns: '80px 1fr 120px 140px 120px 100px 120px' }}>
                  <p className="text-[10px] font-semibold text-[#4b5563] uppercase tracking-wider">Incident #</p>
                  <p className="text-[10px] font-semibold text-[#4b5563] uppercase tracking-wider">Incident Name</p>
                  <p className="text-[10px] font-semibold text-[#4b5563] uppercase tracking-wider">Incident Type</p>
                  <p className="text-[10px] font-semibold text-[#4b5563] uppercase tracking-wider">Organization</p>
                  <p className="text-[10px] font-semibold text-[#4b5563] uppercase tracking-wider">Reporter</p>
                  <p className="text-[10px] font-semibold text-[#4b5563] uppercase tracking-wider">Stage</p>
                  <p className="text-[10px] font-semibold text-[#4b5563] uppercase tracking-wider">Assigned</p>
                </div>
                {incidentRecords.map((record) => (
                  <div key={record.id}
                    className="grid gap-4 py-3 border-b border-[#1e2130] last:border-0 hover:bg-[#1a1d2a] cursor-pointer transition-colors -mx-4 px-4 items-center"
                    style={{ gridTemplateColumns: '80px 1fr 120px 140px 120px 100px 120px' }}
                    onClick={() => setSelectedRecordId(record.title)}>
                    <p className="text-sm text-[#9ca3af]">{record.id}</p>
                    <p className="text-sm font-medium text-white truncate">{record.title}</p>
                    <p className="text-xs text-[#9ca3af]">{record.type}</p>
                    <p className="text-xs text-[#9ca3af]">OneTrust</p>
                    <p className="text-xs text-[#9ca3af]">{record.reportedBy}</p>
                    <span className={cn("text-[10px] font-semibold px-2 py-0.5 rounded w-fit", statusColors[record.status])}>{record.status}</span>
                    <p className="text-xs text-[#9ca3af]">{record.reportedBy}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Tab 3: Privacy Rights */}
        {activeTab === 'privacy-rights' && (
          <div className="flex flex-col h-full">
            {/* Tertiary Tabs */}
            <div className="border-b border-[#1e2130] px-6 shrink-0 bg-[#0f1117]">
              <div className="flex gap-1">
                {privacyRightsTertiaryTabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setPrivacyRightsTertiary(tab.id)}
                    className={cn(
                      "px-3 py-2 text-xs font-medium transition-colors relative",
                      privacyRightsTertiary === tab.id ? "text-white" : "text-[#9ca3af] hover:text-white"
                    )}
                  >
                    {tab.label}
                    {privacyRightsTertiary === tab.id && (
                      <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#4b5563]" />
                    )}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex-1 overflow-auto p-6">
              {privacyRightsTertiary === 'requests' && (
                <>
                  {/* Data Redaction Alert Banner */}
                  <div className="mb-6 p-4 bg-[#f59e0b]/10 border border-[#f59e0b]/30 rounded-lg flex items-start gap-3">
                    <AlertTriangle className="w-5 h-5 text-[#f59e0b] shrink-0 mt-0.5" />
                    <div>
                      <p className="text-sm font-medium text-white">Data Redaction for privacy requests</p>
                      <p className="text-xs text-[#9ca3af] mt-1">Configure automated data redaction workflows to comply with GDPR Article 17 and CCPA deletion requests.</p>
                    </div>
                  </div>

                  <div className="flex items-center justify-between mb-4">
                    <h2 className="text-lg font-medium text-white">Requests</h2>
                    <div className="flex items-center gap-2">
                      <div className="relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#4b5563]" />
                        <input type="text" placeholder="Search..."
                          className="pl-9 pr-4 py-2 bg-[#1e2130] border border-[#2a2d3a] rounded-md text-sm text-white placeholder-[#4b5563] focus:outline-none focus:border-[#6CEEAD]/50 w-64" />
                      </div>
                      <button className="flex items-center gap-2 px-3 py-2 bg-[#6CEEAD] text-[#0f1117] rounded-md text-sm font-medium hover:bg-[#5dd99c] transition-colors">
                        <Plus className="w-4 h-4" />
                        Add new
                      </button>
                    </div>
                  </div>

                  <div className="bg-[#13151f] border border-[#1e2130] rounded-lg overflow-hidden">
                    <div className="px-4">
                      <div className="grid gap-4 py-3 border-b border-[#1e2130]"
                        style={{ gridTemplateColumns: '80px 1fr 100px 120px 100px 100px' }}>
                        <p className="text-[10px] font-semibold text-[#4b5563] uppercase tracking-wider">ID</p>
                        <p className="text-[10px] font-semibold text-[#4b5563] uppercase tracking-wider">Subject</p>
                        <p className="text-[10px] font-semibold text-[#4b5563] uppercase tracking-wider">Type</p>
                        <p className="text-[10px] font-semibold text-[#4b5563] uppercase tracking-wider">Submitted</p>
                        <p className="text-[10px] font-semibold text-[#4b5563] uppercase tracking-wider">Due Date</p>
                        <p className="text-[10px] font-semibold text-[#4b5563] uppercase tracking-wider">Status</p>
                      </div>
                      {privacyRightRequests.map((record) => (
                        <div key={record.id}
                          className="grid gap-4 py-3 border-b border-[#1e2130] last:border-0 hover:bg-[#1a1d2a] cursor-pointer transition-colors -mx-4 px-4 items-center"
                          style={{ gridTemplateColumns: '80px 1fr 100px 120px 100px 100px' }}
                          onClick={() => setSelectedRecordId(record.subject)}>
                          <p className="text-sm text-[#9ca3af]">{record.id}</p>
                          <p className="text-sm font-medium text-white">{record.subject}</p>
                          <p className="text-xs text-[#9ca3af]">{record.type}</p>
                          <p className="text-xs text-[#9ca3af]">{record.receivedDate}</p>
                          <p className="text-xs text-[#9ca3af]">{record.dueDate}</p>
                          <span className={cn("text-[10px] font-semibold px-2 py-0.5 rounded w-fit", statusColors[record.status])}>{record.status}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </>
              )}
              {privacyRightsTertiary === 'reports' && (
                <div className="text-center py-16 text-[#9ca3af]">
                  <p className="text-sm">Reports view coming soon</p>
                </div>
              )}
              {privacyRightsTertiary === 'subtasks' && (
                <div className="text-center py-16 text-[#9ca3af]">
                  <p className="text-sm">Subtasks view coming soon</p>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Tab 4: Data Mapping */}
        {activeTab === 'data-mapping' && (
          <div className="flex h-full">
            {/* Vertical Tertiary Navigation Rail */}
            <div className="w-48 border-r border-[#1e2130] bg-[#0f1117] py-4 shrink-0">
              <ul className="space-y-1 px-2">
                {dataMappingTertiaryTabs.map((tab) => (
                  <li key={tab.id}>
                    <button
                      onClick={() => setDataMappingTertiary(tab.id)}
                      className={cn(
                        "w-full flex items-center gap-2 px-3 py-2 rounded-md text-sm transition-colors",
                        dataMappingTertiary === tab.id
                          ? "bg-[#6CEEAD]/10 text-[#6CEEAD]"
                          : "text-[#9ca3af] hover:bg-[#1e2130] hover:text-white"
                      )}
                    >
                      {tab.icon}
                      <span>{tab.label}</span>
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            {/* Main Content Area */}
            <div className="flex-1 overflow-auto p-6">
              {dataMappingTertiary === 'pending' && (
                <>
                  <h2 className="text-lg font-medium text-white mb-4">Pending Inventory</h2>
                  
                  {/* Metric Summary */}
                  <div className="grid grid-cols-4 gap-4 mb-6">
                    {[
                      { label: 'Total pending', value: '341', color: '#0788F7' },
                      { label: 'New records', value: '141', color: '#6CEEAD' },
                      { label: 'Updated record', value: '1', color: '#f59e0b' },
                      { label: 'Similar records', value: '72', color: '#976FE6' },
                    ].map((stat) => (
                      <div key={stat.label} className="bg-[#13151f] border border-[#1e2130] rounded-lg p-4">
                        <p className="text-2xl font-bold text-white">{stat.value}</p>
                        <p className="text-xs text-[#9ca3af] mt-1">{stat.label}</p>
                        <div className="h-1 mt-2 rounded-full" style={{ background: `${stat.color}30` }}>
                          <div className="h-full rounded-full" style={{ background: stat.color, width: '60%' }} />
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="bg-[#13151f] border border-[#1e2130] rounded-lg overflow-hidden">
                    <div className="px-4">
                      <div className="grid gap-4 py-3 border-b border-[#1e2130]"
                        style={{ gridTemplateColumns: '80px 1fr 120px 140px 100px' }}>
                        <p className="text-[10px] font-semibold text-[#4b5563] uppercase tracking-wider">ID</p>
                        <p className="text-[10px] font-semibold text-[#4b5563] uppercase tracking-wider">Process</p>
                        <p className="text-[10px] font-semibold text-[#4b5563] uppercase tracking-wider">Category</p>
                        <p className="text-[10px] font-semibold text-[#4b5563] uppercase tracking-wider">Data Types</p>
                        <p className="text-[10px] font-semibold text-[#4b5563] uppercase tracking-wider">Cross-Border</p>
                      </div>
                      {dataMappingRecords.map((record) => (
                        <div key={record.id}
                          className="grid gap-4 py-3 border-b border-[#1e2130] last:border-0 hover:bg-[#1a1d2a] cursor-pointer transition-colors -mx-4 px-4 items-center"
                          style={{ gridTemplateColumns: '80px 1fr 120px 140px 100px' }}
                          onClick={() => setSelectedRecordId(record.process)}>
                          <p className="text-sm text-[#9ca3af]">{record.id}</p>
                          <p className="text-sm font-medium text-white">{record.process}</p>
                          <p className="text-xs text-[#9ca3af]">{record.category}</p>
                          <p className="text-xs text-[#9ca3af]">{record.dataTypes}</p>
                          <span className={cn("text-[10px] font-semibold px-2 py-0.5 rounded w-fit", record.crossBorder ? 'bg-[#f59e0b]/10 text-[#f59e0b]' : 'bg-[#00B935]/10 text-[#00B935]')}>
                            {record.crossBorder ? 'Yes' : 'No'}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </>
              )}
              {dataMappingTertiary !== 'pending' && (
                <div className="text-center py-16 text-[#9ca3af]">
                  <p className="text-sm">{dataMappingTertiaryTabs.find(t => t.id === dataMappingTertiary)?.label} view coming soon</p>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Tab 5: Privacy Notices */}
        {activeTab === 'privacy-notices' && (
          <div className="p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-medium text-white">Privacy Notices</h2>
              <button className="flex items-center gap-2 px-4 py-2 bg-[#6CEEAD] text-[#0f1117] rounded-md text-sm font-medium hover:bg-[#5dd99c] transition-colors">
                <Plus className="w-4 h-4" />
                Add new
              </button>
            </div>
            <div className="bg-[#13151f] border border-[#1e2130] rounded-lg overflow-hidden">
              <div className="px-4">
                <div className="grid gap-4 py-3 border-b border-[#1e2130]"
                  style={{ gridTemplateColumns: '80px 1fr 120px 120px 100px 100px' }}>
                  <p className="text-[10px] font-semibold text-[#4b5563] uppercase tracking-wider">ID</p>
                  <p className="text-[10px] font-semibold text-[#4b5563] uppercase tracking-wider">Notice Name</p>
                  <p className="text-[10px] font-semibold text-[#4b5563] uppercase tracking-wider">Type</p>
                  <p className="text-[10px] font-semibold text-[#4b5563] uppercase tracking-wider">Last Updated</p>
                  <p className="text-[10px] font-semibold text-[#4b5563] uppercase tracking-wider">Version</p>
                  <p className="text-[10px] font-semibold text-[#4b5563] uppercase tracking-wider">Status</p>
                </div>
                {privacyNotices.map((record) => (
                  <div key={record.id}
                    className="grid gap-4 py-3 border-b border-[#1e2130] last:border-0 hover:bg-[#1a1d2a] cursor-pointer transition-colors -mx-4 px-4 items-center"
                    style={{ gridTemplateColumns: '80px 1fr 120px 120px 100px 100px' }}
                    onClick={() => setSelectedRecordId(record.name)}>
                    <p className="text-sm text-[#9ca3af]">{record.id}</p>
                    <p className="text-sm font-medium text-white">{record.name}</p>
                    <p className="text-xs text-[#9ca3af]">{record.type}</p>
                    <p className="text-xs text-[#9ca3af]">{record.lastUpdated}</p>
                    <p className="text-xs text-[#9ca3af]">{record.version}</p>
                    <span className={cn("text-[10px] font-semibold px-2 py-0.5 rounded w-fit", statusColors[record.status])}>{record.status}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Tab 6: Program Benchmarking */}
        {activeTab === 'benchmarking' && (
          <div className="flex-1 flex flex-col items-center justify-center p-12">
            <div className="max-w-2xl text-center">
              <h2 className="text-2xl font-semibold text-white mb-4">Welcome to Program Benchmarking</h2>
              <p className="text-[#9ca3af] mb-8">Compare your privacy program against industry standards and peer organizations to identify gaps and opportunities for improvement.</p>
              <button className="px-6 py-3 bg-[#6CEEAD] text-[#0f1117] rounded-md text-sm font-medium hover:bg-[#5dd99c] transition-colors mb-12">
                Start assessment
              </button>

              <div className="grid grid-cols-3 gap-6">
                {[
                  { title: 'Self-Assess', desc: 'Evaluate your current privacy maturity across key domains', icon: <CheckCircle className="w-8 h-8 text-[#6CEEAD]" /> },
                  { title: 'Benchmark', desc: 'Compare your results against industry peers and standards', icon: <Clock className="w-8 h-8 text-[#0788F7]" /> },
                  { title: 'Gain insights', desc: 'Get actionable recommendations to improve your program', icon: <ArrowRight className="w-8 h-8 text-[#976FE6]" /> },
                ].map((item) => (
                  <div key={item.title} className="p-6 bg-[#13151f] border border-[#1e2130] rounded-lg text-center">
                    <div className="flex justify-center mb-4">{item.icon}</div>
                    <h3 className="text-sm font-medium text-white mb-2">{item.title}</h3>
                    <p className="text-xs text-[#9ca3af]">{item.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Tab 7: Maturity & Planning */}
        {activeTab === 'maturity' && (
          <div className="flex-1 flex flex-col items-center justify-center p-12">
            <div className="max-w-3xl text-center">
              <h2 className="text-2xl font-semibold text-white mb-4">Welcome to Maturity & Planning</h2>
              <p className="text-[#9ca3af] mb-8">Assess your privacy program maturity and create strategic roadmaps for continuous improvement.</p>
              <button className="px-6 py-3 bg-[#6CEEAD] text-[#0f1117] rounded-md text-sm font-medium hover:bg-[#5dd99c] transition-colors mb-12">
                Customize assessment
              </button>

              <h3 className="text-sm font-medium text-white mb-4">Readiness templates</h3>
              <div className="grid grid-cols-3 gap-4">
                {[
                  { title: 'GDPR Readiness', desc: 'EU General Data Protection Regulation compliance assessment', color: '#0788F7' },
                  { title: 'CCPA/CPRA Readiness', desc: 'California privacy law compliance assessment', color: '#6CEEAD' },
                  { title: 'ISO 27701', desc: 'Privacy Information Management System certification', color: '#976FE6' },
                  { title: 'NIST Privacy Framework', desc: 'US federal privacy framework alignment', color: '#f59e0b' },
                  { title: 'Custom Assessment', desc: 'Build your own maturity assessment criteria', color: '#9ca3af' },
                  { title: 'Industry Benchmark', desc: 'Compare against sector-specific standards', color: '#ef4444' },
                ].map((template) => (
                  <div key={template.title} className="p-4 bg-[#13151f] border border-[#1e2130] rounded-lg text-left hover:border-[#2a2d3a] cursor-pointer transition-colors">
                    <div className="w-10 h-10 rounded-lg flex items-center justify-center mb-3" style={{ background: `${template.color}18` }}>
                      <div className="w-4 h-4 rounded" style={{ background: template.color }} />
                    </div>
                    <h4 className="text-sm font-medium text-white mb-1">{template.title}</h4>
                    <p className="text-xs text-[#9ca3af]">{template.desc}</p>
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
