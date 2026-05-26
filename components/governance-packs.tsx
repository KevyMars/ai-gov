"use client"

import { useState, useMemo } from "react"
import { cn } from "@/lib/utils"
import {
  Plus,
  Search,
  LayoutGrid,
  List,
  X,
  Check,
  Upload,
  Sparkles,
  ArrowLeft,
  Shield,
} from "lucide-react"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

// ============================================================================
// Types
// ============================================================================
export type PackStatus = "active" | "pending" | "draft" | "inactive" | "archived"
export type Severity = "Critical" | "High" | "Standard"
export type TabType = "all" | "active" | "pending" | "draft"
export type ViewMode = "table" | "cards"

export interface GovernancePack {
  id: string
  name: string
  description: string
  status: PackStatus
  severity: Severity
  provider: string
  risks: number
  controls: number
  owners: string
  shortOwners: string
  frameworks: string[]
  guardrails: string
  date: string
}

// ============================================================================
// Sample Data
// ============================================================================
const initialPacks: GovernancePack[] = [
  {
    id: "1",
    name: "EU AI Act — Enterprise Pack",
    description: "Covers mandatory EU AI Act obligations for high-risk AI systems deployed in customer-facing workflows.",
    status: "active",
    severity: "Critical",
    provider: "EU AI Act",
    risks: 14,
    controls: 18,
    owners: "Sarah Chen, Marcus Reid",
    shortOwners: "Sarah C., Marcus R.",
    frameworks: ["EU AI Act", "Internal_AI_Policy_v3.pdf"],
    guardrails: "3 Guardrails Enforced",
    date: "May 19, 2026",
  },
  {
    id: "2",
    name: "NIST Core Alignment Blueprint",
    description: "Voluntary US alignment pack targeting Map, Measure, and Manage functions.",
    status: "active",
    severity: "High",
    provider: "NIST",
    risks: 12,
    controls: 8,
    owners: "Marcus Reid",
    shortOwners: "Marcus R.",
    frameworks: ["NIST AI RMF 1.0"],
    guardrails: "No active guardrails",
    date: "April 12, 2026",
  },
  {
    id: "3",
    name: "Marketing & GenAI Guardrail Envelope",
    description: "Validation gating pack for localized consumer fine-tuning assets.",
    status: "pending",
    severity: "Critical",
    provider: "EU AI Act",
    risks: 8,
    controls: 6,
    owners: "Sarah Chen",
    shortOwners: "Sarah C.",
    frameworks: ["EU AI Act"],
    guardrails: "Content Filtering",
    date: "May 20, 2026",
  },
  {
    id: "4",
    name: "Internal Sandbox Soft Guidelines",
    description: "Baseline non-regulatory policy matrix designed for safe sandbox experimentation.",
    status: "draft",
    severity: "Standard",
    provider: "Custom",
    risks: 4,
    controls: 4,
    owners: "Tohsheen Bazaz",
    shortOwners: "Tohsheen B.",
    frameworks: ["Custom Internal Policy"],
    guardrails: "None",
    date: "In Development",
  },
  {
    id: "5",
    name: "Legacy HR Model Operational Safeguards",
    description: "Deactivated envelope covering predictive algorithmic hiring components.",
    status: "inactive",
    severity: "High",
    provider: "Custom",
    risks: 9,
    controls: 5,
    owners: "Marcus Reid",
    shortOwners: "Marcus R.",
    frameworks: ["ISO/IEC 42001"],
    guardrails: "PII Redaction",
    date: "Paused May 01, 2026",
  },
]

// ============================================================================
// Status & Severity Pills
// ============================================================================
const statusStyles: Record<PackStatus, string> = {
  draft: "bg-[#4b5563]/20 text-[#9ca3af]",
  pending: "bg-[#FFEF3C]/10 text-[#FFEF3C]",
  active: "bg-[#6CEEAD]/10 text-[#6CEEAD]",
  inactive: "bg-[#f87171]/10 text-[#f87171]",
  archived: "bg-[#1e2130] text-[#6b7280] border border-dashed border-[#4b5563]",
}

const statusLabels: Record<PackStatus, string> = {
  draft: "Draft",
  pending: "Pending",
  active: "Active",
  inactive: "Inactive",
  archived: "Archived",
}

function StatusPill({ status }: { status: PackStatus }) {
  return (
    <span className={cn("inline-flex items-center text-[10px] font-bold px-2 py-0.5 rounded-full", statusStyles[status])}>
      {statusLabels[status]}
    </span>
  )
}

const severityStyles: Record<Severity, string> = {
  Critical: "bg-[#f87171]/10 text-[#f87171]",
  High: "bg-[#FFEF3C]/10 text-[#FFEF3C]",
  Standard: "bg-[#6CEEAD]/10 text-[#6CEEAD]",
}

function SeverityPill({ severity }: { severity: Severity }) {
  return (
    <span className={cn("inline-flex text-[10px] font-bold px-2 py-0.5 rounded", severityStyles[severity])}>
      {severity}
    </span>
  )
}

function FrameworkTag({ children }: { children: React.ReactNode }) {
  return (
    <span className="text-[10px] bg-[#1e2130] border border-[#2a2d3a] rounded px-1.5 py-0.5 text-[#9ca3af]">
      {children}
    </span>
  )
}

// ============================================================================
// Tabs Component
// ============================================================================
const tabs: { id: TabType; label: string }[] = [
  { id: "all", label: "All Packs" },
  { id: "active", label: "Active Scanning" },
  { id: "pending", label: "Pending Review" },
  { id: "draft", label: "Drafts" },
]

function DashTabs({
  currentTab,
  onTabChange,
  counts,
}: {
  currentTab: TabType
  onTabChange: (tab: TabType) => void
  counts: Record<TabType, number>
}) {
  return (
    <div className="flex gap-6">
      {tabs.map((tab) => (
        <button
          key={tab.id}
          onClick={() => onTabChange(tab.id)}
          className={cn(
            "px-1 py-2.5 text-[13px] font-semibold relative transition-colors cursor-pointer",
            currentTab === tab.id ? "text-[#6CEEAD]" : "text-[#9ca3af] hover:text-white"
          )}
        >
          {tab.label}
          <span
            className={cn(
              "text-[10px] font-bold px-1.5 py-0.5 rounded-full ml-1.5 border",
              currentTab === tab.id
                ? "bg-[#6CEEAD]/10 text-[#6CEEAD] border-[#6CEEAD]"
                : "bg-[#1e2130] text-[#9ca3af] border-[#2a2d3a]"
            )}
          >
            {counts[tab.id]}
          </span>
          {currentTab === tab.id && (
            <span className="absolute bottom-0 left-0 right-0 h-[3px] bg-[#6CEEAD] rounded-t" />
          )}
        </button>
      ))}
    </div>
  )
}

// ============================================================================
// Stats Components
// ============================================================================
function StatCard({ label, value, meta }: { label: string; value: React.ReactNode; meta: string }) {
  return (
    <div className="bg-[#13151f] border border-[#1e2130] rounded-lg p-4 flex flex-col gap-1.5">
      <div className="text-[10px] font-bold tracking-wide uppercase text-[#6b7280]">{label}</div>
      <div className="text-2xl font-bold text-white">{value}</div>
      <div className="text-[10px] text-[#9ca3af]">{meta}</div>
    </div>
  )
}

// ============================================================================
// Coverage Alert
// ============================================================================
function CoverageAlert() {
  return (
    <div className="bg-[#0788F7]/10 border border-[#0788F7] rounded-lg px-4 py-3.5 flex items-center gap-3 mb-6">
      <Shield className="w-5 h-5 text-[#0788F7]" />
      <div className="text-xs text-[#60a5fa] leading-relaxed">
        <b>System Posture Engine Status:</b> Background routines are silently scanning{" "}
        <b>59 inventory assets</b> (47 models, 12 agents) across your connected AWS Bedrock and Databricks endpoints.
      </div>
    </div>
  )
}

// ============================================================================
// Table Toolbar
// ============================================================================
function TableToolbar({
  searchValue,
  onSearchChange,
  severityFilter,
  onSeverityChange,
  providerFilter,
  onProviderChange,
  viewMode,
  onViewModeChange,
}: {
  searchValue: string
  onSearchChange: (value: string) => void
  severityFilter: string
  onSeverityChange: (value: string) => void
  providerFilter: string
  onProviderChange: (value: string) => void
  viewMode: ViewMode
  onViewModeChange: (mode: ViewMode) => void
}) {
  return (
    <div className="flex items-center bg-[#13151f] border border-[#1e2130] rounded-lg p-3 gap-3 flex-wrap mb-4">
      <div className="flex-1 min-w-[200px] relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#4b5563]" />
        <input
          type="text"
          className="w-full bg-[#0f1117] border border-[#1e2130] rounded-md pl-9 pr-4 py-2 text-[13px] text-white placeholder-[#4b5563] focus:outline-none focus:border-[#6CEEAD]/50"
          placeholder="Search governance packs..."
          value={searchValue}
          onChange={(e) => onSearchChange(e.target.value)}
        />
      </div>
      <div className="flex items-center gap-2 flex-wrap">
        <select
          className="bg-[#0f1117] border border-[#1e2130] rounded-md px-3 py-2 text-xs text-[#9ca3af] cursor-pointer focus:outline-none focus:border-[#6CEEAD]/50"
          value={severityFilter}
          onChange={(e) => onSeverityChange(e.target.value)}
        >
          <option value="">All severities</option>
          <option value="Critical">Critical</option>
          <option value="High">High</option>
          <option value="Standard">Standard</option>
        </select>
        <select
          className="bg-[#0f1117] border border-[#1e2130] rounded-md px-3 py-2 text-xs text-[#9ca3af] cursor-pointer focus:outline-none focus:border-[#6CEEAD]/50"
          value={providerFilter}
          onChange={(e) => onProviderChange(e.target.value)}
        >
          <option value="">All systems</option>
          <option value="EU AI Act">EU AI Act</option>
          <option value="NIST">NIST RMF</option>
          <option value="Custom">Custom Policies</option>
        </select>
        <div className="h-6 w-px bg-[#2a2d3a] mx-1" />
        <div className="inline-flex items-center bg-[#0f1117] border border-[#1e2130] rounded-md p-0.5">
          <button
            onClick={() => onViewModeChange("table")}
            className={cn(
              "flex items-center justify-center w-8 h-8 rounded transition-colors",
              viewMode === "table" ? "bg-[#6CEEAD] text-[#0f1117]" : "bg-transparent text-[#9ca3af] hover:text-white"
            )}
          >
            <List className="w-4 h-4" />
          </button>
          <button
            onClick={() => onViewModeChange("cards")}
            className={cn(
              "flex items-center justify-center w-8 h-8 rounded transition-colors",
              viewMode === "cards" ? "bg-[#6CEEAD] text-[#0f1117]" : "bg-transparent text-[#9ca3af] hover:text-white"
            )}
          >
            <LayoutGrid className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  )
}

// ============================================================================
// Packs Table
// ============================================================================
function PacksTable({
  packs,
  onPackClick,
  onEdit,
  onArchive,
  onApprove,
  onReject,
  onReactivate,
  onResume,
}: {
  packs: GovernancePack[]
  onPackClick: (pack: GovernancePack) => void
  onEdit: (pack: GovernancePack) => void
  onArchive: (pack: GovernancePack) => void
  onApprove?: (pack: GovernancePack) => void
  onReject?: (pack: GovernancePack) => void
  onReactivate?: (pack: GovernancePack) => void
  onResume?: (pack: GovernancePack) => void
}) {
  return (
    <div className="bg-[#13151f] border border-[#1e2130] rounded-lg overflow-hidden mb-6">
      <table className="w-full border-collapse text-[13px] text-left">
        <thead>
          <tr>
            <th className="bg-[#0f1117] border-b border-[#1e2130] px-4 py-3 text-[10px] font-bold tracking-wide uppercase text-[#6b7280]">
              Pack Name & Scope
            </th>
            <th className="bg-[#0f1117] border-b border-[#1e2130] px-4 py-3 text-[10px] font-bold tracking-wide uppercase text-[#6b7280]">
              Status
            </th>
            <th className="bg-[#0f1117] border-b border-[#1e2130] px-4 py-3 text-[10px] font-bold tracking-wide uppercase text-[#6b7280]">
              Severity
            </th>
            <th className="bg-[#0f1117] border-b border-[#1e2130] px-4 py-3 text-[10px] font-bold tracking-wide uppercase text-[#6b7280]">
              Mapped Components
            </th>
            <th className="bg-[#0f1117] border-b border-[#1e2130] px-4 py-3 text-[10px] font-bold tracking-wide uppercase text-[#6b7280]">
              Owners
            </th>
            <th className="bg-[#0f1117] border-b border-[#1e2130] px-4 py-3 text-[10px] font-bold tracking-wide uppercase text-[#6b7280]">
              Actions
            </th>
          </tr>
        </thead>
        <tbody>
          {packs.map((pack, index) => (
            <tr key={pack.id} className="hover:bg-[#1a1d2a] transition-colors">
              <td className={cn("px-4 py-4 align-middle", index !== packs.length - 1 && "border-b border-[#1e2130]")}>
                <div
                  className="font-semibold text-white cursor-pointer hover:text-[#6CEEAD] transition-colors"
                  onClick={() => onPackClick(pack)}
                >
                  {pack.name}
                </div>
                <div className="flex gap-1 flex-wrap mt-1">
                  {pack.frameworks.map((fw, i) => (
                    <FrameworkTag key={i}>{fw}</FrameworkTag>
                  ))}
                </div>
              </td>
              <td className={cn("px-4 py-4 align-middle", index !== packs.length - 1 && "border-b border-[#1e2130]")}>
                <StatusPill status={pack.status} />
              </td>
              <td className={cn("px-4 py-4 align-middle", index !== packs.length - 1 && "border-b border-[#1e2130]")}>
                <SeverityPill severity={pack.severity} />
              </td>
              <td className={cn("px-4 py-4 align-middle text-xs text-[#9ca3af]", index !== packs.length - 1 && "border-b border-[#1e2130]")}>
                {pack.risks} risks · {pack.controls} controls
              </td>
              <td className={cn("px-4 py-4 align-middle text-xs text-[#9ca3af]", index !== packs.length - 1 && "border-b border-[#1e2130]")}>
                {pack.shortOwners}
              </td>
              <td className={cn("px-4 py-4 align-middle", index !== packs.length - 1 && "border-b border-[#1e2130]")}>
                {pack.status === "archived" ? (
                  <span className="text-[#6b7280] text-[11px]">Audit Locked</span>
                ) : (
                  <ActionButtons
                    pack={pack}
                    onEdit={onEdit}
                    onArchive={onArchive}
                    onApprove={onApprove}
                    onReject={onReject}
                    onReactivate={onReactivate}
                    onResume={onResume}
                  />
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

function ActionButtons({
  pack,
  onEdit,
  onArchive,
  onApprove,
  onReject,
  onReactivate,
  onResume,
}: {
  pack: GovernancePack
  onEdit: (pack: GovernancePack) => void
  onArchive: (pack: GovernancePack) => void
  onApprove?: (pack: GovernancePack) => void
  onReject?: (pack: GovernancePack) => void
  onReactivate?: (pack: GovernancePack) => void
  onResume?: (pack: GovernancePack) => void
}) {
  if (pack.status === "active") {
    return (
      <>
        <ActionLink onClick={() => onEdit(pack)}>Edit</ActionLink>
        <ActionLink danger onClick={() => onArchive(pack)}>Archive</ActionLink>
      </>
    )
  }
  if (pack.status === "pending") {
    return (
      <>
        <ActionLink onClick={() => onApprove?.(pack)}>Approve</ActionLink>
        <ActionLink danger onClick={() => onReject?.(pack)}>Reject</ActionLink>
      </>
    )
  }
  if (pack.status === "draft") {
    return (
      <>
        <ActionLink onClick={() => onResume?.(pack)}>Resume</ActionLink>
        <ActionLink danger onClick={() => onArchive(pack)}>Delete</ActionLink>
      </>
    )
  }
  if (pack.status === "inactive") {
    return (
      <>
        <ActionLink onClick={() => onReactivate?.(pack)}>Reactivate</ActionLink>
        <ActionLink danger onClick={() => onArchive(pack)}>Archive</ActionLink>
      </>
    )
  }
  return null
}

function ActionLink({ children, danger, onClick }: { children: React.ReactNode; danger?: boolean; onClick: () => void }) {
  return (
    <button
      className={cn(
        "bg-transparent border-none text-xs font-semibold cursor-pointer mr-3 transition-colors",
        danger ? "text-[#f87171] hover:text-[#ef4444] hover:underline" : "text-[#6CEEAD] hover:text-[#5dd99c] hover:underline"
      )}
      onClick={onClick}
    >
      {children}
    </button>
  )
}

// ============================================================================
// Packs Cards
// ============================================================================
function PacksCards({
  packs,
  onPackClick,
  onEdit,
  onArchive,
  onApprove,
  onReject,
  onReactivate,
  onResume,
}: {
  packs: GovernancePack[]
  onPackClick: (pack: GovernancePack) => void
  onEdit: (pack: GovernancePack) => void
  onArchive: (pack: GovernancePack) => void
  onApprove?: (pack: GovernancePack) => void
  onReject?: (pack: GovernancePack) => void
  onReactivate?: (pack: GovernancePack) => void
  onResume?: (pack: GovernancePack) => void
}) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
      {packs.map((pack) => (
        <div
          key={pack.id}
          className="bg-[#13151f] border border-[#1e2130] rounded-lg p-4 flex flex-col hover:border-[#2a2d3a] transition-all"
        >
          <div className="flex items-start justify-between gap-2 mb-2">
            <h3
              className="text-sm font-semibold text-white cursor-pointer hover:text-[#6CEEAD] transition-colors line-clamp-2"
              onClick={() => onPackClick(pack)}
            >
              {pack.name}
            </h3>
            <StatusPill status={pack.status} />
          </div>
          <div className="flex flex-col gap-1 mb-3">
            <span className="text-[10px] text-[#6b7280]">{pack.shortOwners}</span>
            <SeverityPill severity={pack.severity} />
          </div>
          <p className="text-xs text-[#9ca3af] mb-3 line-clamp-2 flex-grow">{pack.description}</p>
          <div className="flex gap-1 flex-wrap mb-3">
            {pack.frameworks.map((fw, i) => (
              <FrameworkTag key={i}>{fw}</FrameworkTag>
            ))}
          </div>
          <div className="flex items-center gap-4 text-xs text-[#9ca3af] mb-3 py-2 border-t border-b border-[#1e2130]">
            <span>{pack.risks} risks</span>
            <span className="text-[#2a2d3a]">|</span>
            <span>{pack.controls} controls</span>
          </div>
          <div className="flex items-center justify-end mt-auto">
            {pack.status !== "archived" && (
              <CardActionButtons
                pack={pack}
                onEdit={onEdit}
                onArchive={onArchive}
                onApprove={onApprove}
                onReject={onReject}
                onReactivate={onReactivate}
                onResume={onResume}
              />
            )}
          </div>
        </div>
      ))}
    </div>
  )
}

function CardActionButtons({
  pack,
  onEdit,
  onArchive,
  onApprove,
  onReject,
  onReactivate,
  onResume,
}: {
  pack: GovernancePack
  onEdit: (pack: GovernancePack) => void
  onArchive: (pack: GovernancePack) => void
  onApprove?: (pack: GovernancePack) => void
  onReject?: (pack: GovernancePack) => void
  onReactivate?: (pack: GovernancePack) => void
  onResume?: (pack: GovernancePack) => void
}) {
  if (pack.status === "active") {
    return (
      <>
        <CardBtn onClick={() => onEdit(pack)}>Edit</CardBtn>
        <CardBtn danger onClick={() => onArchive(pack)}>Archive</CardBtn>
      </>
    )
  }
  if (pack.status === "pending") {
    return (
      <>
        <CardBtn onClick={() => onApprove?.(pack)}>Approve</CardBtn>
        <CardBtn danger onClick={() => onReject?.(pack)}>Reject</CardBtn>
      </>
    )
  }
  if (pack.status === "draft") {
    return (
      <>
        <CardBtn onClick={() => onResume?.(pack)}>Resume</CardBtn>
        <CardBtn danger onClick={() => onArchive(pack)}>Delete</CardBtn>
      </>
    )
  }
  if (pack.status === "inactive") {
    return (
      <>
        <CardBtn onClick={() => onReactivate?.(pack)}>Reactivate</CardBtn>
        <CardBtn danger onClick={() => onArchive(pack)}>Archive</CardBtn>
      </>
    )
  }
  return null
}

function CardBtn({ children, danger, onClick }: { children: React.ReactNode; danger?: boolean; onClick: () => void }) {
  return (
    <button
      className={cn(
        "px-2 py-1 text-[10px] font-semibold rounded transition-colors",
        danger ? "text-[#f87171] hover:bg-[#f87171]/10" : "text-[#6CEEAD] hover:bg-[#6CEEAD]/10"
      )}
      onClick={onClick}
    >
      {children}
    </button>
  )
}

// ============================================================================
// Pack Drawer
// ============================================================================
function PackDrawer({
  isOpen,
  onClose,
  pack,
}: {
  isOpen: boolean
  onClose: () => void
  pack: {
    title: string
    description: string
    status: PackStatus
    severity: Severity
    components: string
    guardrails: string
    owners: string
    date: string
  } | null
}) {
  if (!pack) return null

  return (
    <>
      <div
        className={cn(
          "fixed inset-0 bg-black/60 transition-all duration-200 ease-in-out z-[100]",
          isOpen ? "opacity-100 visible" : "opacity-0 invisible"
        )}
        onClick={onClose}
      />
      <div
        className={cn(
          "fixed top-0 right-0 bottom-0 w-full sm:w-[460px] bg-[#13151f] shadow-[-4px_0_24px_rgba(0,0,0,0.3)] transition-transform duration-300 ease-in-out z-[101] flex flex-col",
          isOpen ? "translate-x-0" : "translate-x-full"
        )}
      >
        <div className="px-6 py-5 border-b border-[#1e2130] flex items-center justify-between bg-[#0f1117]">
          <div className="text-base font-semibold text-white">{pack.title}</div>
          <button onClick={onClose} className="bg-transparent border-none text-xl text-[#9ca3af] cursor-pointer p-1 hover:text-white">
            &times;
          </button>
        </div>
        <div className="flex-1 overflow-y-auto p-6">
          <div className="mb-5">
            <div className="text-[10px] font-bold tracking-widest uppercase text-[#6b7280] mb-2">Description</div>
            <div className="leading-relaxed text-white text-sm">{pack.description}</div>
          </div>
          <div className="h-px bg-[#1e2130] my-4" />
          <div className="mb-5">
            <div className="text-[10px] font-bold tracking-widest uppercase text-[#6b7280] mb-2">Lifecycle Registry</div>
            <MetaRow label="Lifecycle State"><StatusPill status={pack.status} /></MetaRow>
            <MetaRow label="Assigned Severity"><SeverityPill severity={pack.severity} /></MetaRow>
            <MetaRow label="Last Tracked Shift" value={pack.date} />
          </div>
          <div className="mb-5">
            <div className="text-[10px] font-bold tracking-widest uppercase text-[#6b7280] mb-2">Automated Profile Data</div>
            <MetaRow label="Nested Structures" value={pack.components} />
            <MetaRow label="Active Guardrails" value={pack.guardrails} />
            <MetaRow label="Accountable Owners" value={pack.owners} />
          </div>
          <div className="mt-8 bg-[#1e2130] border border-[#2a2d3a] p-3 rounded-md text-xs text-[#9ca3af] leading-relaxed">
            <b>Auditable Platform Log:</b> Every state transition automatically aggregates historical lookbacks, capturing user identity properties alongside changes.
          </div>
        </div>
      </div>
    </>
  )
}

function MetaRow({ label, value, children }: { label: string; value?: string; children?: React.ReactNode }) {
  return (
    <div className="flex justify-between py-2 border-b border-[#1e2130] text-[13px]">
      <span className="text-[#9ca3af]">{label}</span>
      <span className="text-white font-medium text-right">{children ?? value}</span>
    </div>
  )
}

// ============================================================================
// Wizard Steps Component
// ============================================================================
const wizardSteps = [
  { label: "Details" },
  { label: "Frameworks & Policies" },
  { label: "Risks & Controls" },
  { label: "Guardrails" },
  { label: "Review & Save" },
]

function WizardSteps({ currentStep, onStepClick }: { currentStep: number; onStepClick: (step: number) => void }) {
  return (
    <div className="flex items-end">
      {wizardSteps.map((step, index) => {
        const isActive = index === currentStep
        const isDone = index < currentStep
        return (
          <div key={index} className="flex flex-col items-center flex-1 cursor-pointer relative" onClick={() => onStepClick(index)}>
            {index < wizardSteps.length - 1 && (
              <div className={cn("absolute top-3.5 left-[calc(50%+18px)] right-[calc(-50%+18px)] h-px z-0", isDone ? "bg-[#6CEEAD]" : "bg-[#2a2d3a]")} />
            )}
            <div
              className={cn(
                "w-7 h-7 rounded-full border-2 flex items-center justify-center text-xs font-semibold z-10 transition-all",
                isActive || isDone ? "border-[#6CEEAD] bg-[#6CEEAD] text-[#0f1117]" : "border-[#4b5563] bg-[#0f1117] text-[#9ca3af]"
              )}
            >
              {isDone ? <Check className="w-3.5 h-3.5" /> : index + 1}
            </div>
            <div className={cn("text-[10px] text-center pb-2.5 whitespace-nowrap mt-1.5", isActive ? "text-[#6CEEAD] font-semibold" : isDone ? "text-[#6CEEAD]" : "text-[#9ca3af]")}>
              {step.label}
            </div>
            <div className={cn("absolute bottom-0 left-0 right-0 h-[3px] transition-colors", isActive || isDone ? "bg-[#6CEEAD]" : "bg-transparent")} />
          </div>
        )
      })}
    </div>
  )
}

// ============================================================================
// Wizard Step: Details
// ============================================================================
const severityOptions = [
  { key: "critical" as const, label: "Critical", description: "Mandatory regulatory frameworks. Legal or financial consequence if non-compliant.", badgeClass: "bg-[#f87171]/10 text-[#f87171]", borderClass: "border-[#f87171]" },
  { key: "high" as const, label: "High", description: "Important standards with significant operational impact if violated.", badgeClass: "bg-[#FFEF3C]/10 text-[#FFEF3C]", borderClass: "border-[#FFEF3C]" },
  { key: "standard" as const, label: "Standard", description: "Internal AI policies and softer guidelines with lower compliance consequence.", badgeClass: "bg-[#6CEEAD]/10 text-[#6CEEAD]", borderClass: "border-[#6CEEAD]" },
]

function StepDetails({
  formData,
  onUpdate,
}: {
  formData: { name: string; description: string; owners: string[]; severity: "critical" | "high" | "standard" }
  onUpdate: (data: Partial<{ name: string; description: string; owners: string[]; severity: "critical" | "high" | "standard" }>) => void
}) {
  const [ownerInput, setOwnerInput] = useState("")
  const addOwner = () => {
    if (ownerInput.trim()) {
      onUpdate({ owners: [...formData.owners, ownerInput.trim()] })
      setOwnerInput("")
    }
  }
  const removeOwner = (index: number) => {
    onUpdate({ owners: formData.owners.filter((_, i) => i !== index) })
  }

  return (
    <div>
      <div className="bg-gradient-to-br from-[#976FE6]/20 to-[#0788F7]/20 border border-[#976FE6] rounded-lg p-3 px-4 flex items-center gap-3 mb-5 flex-wrap">
        <Sparkles className="w-5 h-5 text-[#976FE6]" />
        <div className="flex-1 min-w-[200px]">
          <div className="text-xs font-bold text-[#976FE6] mb-0.5">AI-recommended packs available</div>
          <div className="text-[10px] text-[#9ca3af]">Based on your inventory (47 models, 12 agents) we have 3 recommended pack templates.</div>
        </div>
        <button className="bg-[#976FE6] hover:bg-[#8b5cf6] text-white text-[10px] font-semibold px-3 py-1.5 rounded-md whitespace-nowrap transition-colors">
          View recommendations
        </button>
      </div>

      <div className="mb-6">
        <div className="text-[10px] font-bold tracking-wider uppercase text-[#6b7280] mb-2.5">Pack details</div>
        <div className="space-y-4">
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-[#9ca3af]">Pack name <span className="text-[#f87171]">*</span></label>
            <Input
              value={formData.name}
              onChange={(e) => onUpdate({ name: e.target.value })}
              placeholder="e.g. EU AI Act Compliance Pack"
              className="bg-[#0f1117] border-[#1e2130] text-white placeholder-[#4b5563] focus:border-[#6CEEAD]/50"
            />
          </div>
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-[#9ca3af]">Description</label>
            <Textarea
              value={formData.description}
              onChange={(e) => onUpdate({ description: e.target.value })}
              placeholder="What does this pack cover and who is it for?"
              className="bg-[#0f1117] border-[#1e2130] text-white placeholder-[#4b5563] focus:border-[#6CEEAD]/50 min-h-[72px] resize-y"
            />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-[#9ca3af]">Owner(s) <span className="text-[#f87171]">*</span></label>
              <div className="flex gap-2">
                <Input
                  value={ownerInput}
                  onChange={(e) => setOwnerInput(e.target.value)}
                  placeholder="Search team members..."
                  onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), addOwner())}
                  className="flex-1 bg-[#0f1117] border-[#1e2130] text-white placeholder-[#4b5563] focus:border-[#6CEEAD]/50"
                />
                <Button onClick={addOwner} className="bg-[#6CEEAD] hover:bg-[#5dd99c] text-[#0f1117]">Add</Button>
              </div>
              {formData.owners.length > 0 && (
                <div className="flex flex-wrap gap-1.5 mt-2">
                  {formData.owners.map((owner, i) => (
                    <div key={i} className="flex items-center gap-1.5 bg-[#6CEEAD]/10 border border-[#6CEEAD] rounded-full px-2.5 py-1 text-xs text-[#6CEEAD]">
                      {owner}
                      <button onClick={() => removeOwner(i)} className="text-[#6CEEAD] hover:text-white"><X className="w-3.5 h-3.5" /></button>
                    </div>
                  ))}
                </div>
              )}
              <p className="text-[10px] text-[#6b7280] mt-1.5">Owners receive all compliance notifications and are accountable for this pack.</p>
            </div>
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-[#9ca3af]">Severity <span className="text-[#f87171]">*</span></label>
              <div className="flex flex-col gap-2.5">
                {severityOptions.map((opt) => (
                  <div
                    key={opt.key}
                    onClick={() => onUpdate({ severity: opt.key })}
                    className={cn(
                      "border-2 rounded-lg p-3 cursor-pointer transition-all",
                      formData.severity === opt.key ? `${opt.borderClass} bg-[#1e2130]` : "border-[#2a2d3a] hover:border-[#4b5563]"
                    )}
                  >
                    <span className={cn("inline-block text-[10px] font-bold px-2 py-0.5 rounded-full mb-1.5", opt.badgeClass)}>{opt.label}</span>
                    <div className="text-[13px] font-semibold text-white mb-0.5">{opt.label}</div>
                    <div className="text-[10px] text-[#9ca3af] leading-snug">{opt.description}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

// ============================================================================
// Wizard Step: Frameworks
// ============================================================================
const frameworks = [
  { id: "eu-ai-act", icon: "🇪🇺", name: "EU AI Act", meta: "Regulation (EU) 2024/1689 · Mandatory", tags: ["14 controls", "18 risks", "High-risk"] },
  { id: "nist", icon: "🏛", name: "NIST AI RMF 1.0", meta: "US Framework · Voluntary", tags: ["8 controls", "12 risks", "Govern/Map/Measure"] },
  { id: "iso-42001", icon: "📋", name: "ISO/IEC 42001", meta: "International Standard · Certifiable", tags: ["6 controls", "8 risks", "AI Management System"] },
  { id: "soc2", icon: "🔐", name: "SOC 2 + AI Trust", meta: "Audit-ready · Enterprise", tags: ["5 controls", "9 risks", "Security/Availability"] },
  { id: "hitrust", icon: "🏥", name: "HITRUST AI", meta: "Healthcare · PHI-handling", tags: ["7 controls", "11 risks", "Healthcare"] },
  { id: "mas", icon: "💼", name: "Singapore MAS", meta: "Financial Services · APAC", tags: ["6 controls", "8 risks", "FinServ"] },
]

function StepFrameworks({
  selectedFrameworks,
  onToggleFramework,
  uploadedFile,
  onUpload,
}: {
  selectedFrameworks: string[]
  onToggleFramework: (id: string) => void
  uploadedFile: string | null
  onUpload: (filename: string) => void
}) {
  const [isDragOver, setIsDragOver] = useState(false)

  return (
    <div>
      <div className="mb-6">
        <div className="text-[10px] font-bold tracking-wider uppercase text-[#6b7280] mb-2.5">Select frameworks</div>
        <p className="text-[10px] text-[#9ca3af] mb-3">Select one or more frameworks. Risks and controls will be auto-generated in the next step.</p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5">
          {frameworks.map((fw) => {
            const isSelected = selectedFrameworks.includes(fw.id)
            return (
              <div
                key={fw.id}
                onClick={() => onToggleFramework(fw.id)}
                className={cn(
                  "border-2 rounded-lg p-3.5 cursor-pointer transition-all relative",
                  isSelected ? "border-[#6CEEAD] bg-[#6CEEAD]/10" : "border-[#2a2d3a] hover:border-[#4b5563]"
                )}
              >
                {isSelected && (
                  <div className="absolute top-2.5 right-2.5 w-[18px] h-[18px] bg-[#6CEEAD] rounded-full flex items-center justify-center">
                    <Check className="w-2.5 h-2.5 text-[#0f1117]" />
                  </div>
                )}
                <div className="text-xl mb-1.5">{fw.icon}</div>
                <div className="text-[13px] font-semibold text-white mb-0.5">{fw.name}</div>
                <div className="text-[10px] text-[#9ca3af]">{fw.meta}</div>
                <div className="flex flex-wrap gap-1 mt-1.5">
                  {fw.tags.map((tag) => (
                    <span key={tag} className="text-[9px] bg-[#1e2130] border border-[#2a2d3a] rounded-full px-2 py-0.5 text-[#9ca3af]">{tag}</span>
                  ))}
                </div>
              </div>
            )
          })}
        </div>
      </div>

      <div className="flex items-center gap-3 my-4 text-[#6b7280] text-[10px]">
        <div className="flex-1 h-px bg-[#2a2d3a]" />
        or add your own AI policy document
        <div className="flex-1 h-px bg-[#2a2d3a]" />
      </div>

      <div className="mb-6">
        <div className="text-[10px] font-bold tracking-wider uppercase text-[#6b7280] mb-2.5">Upload AI policy document</div>
        <div
          onClick={() => onUpload("Internal_AI_Policy_v3.pdf")}
          onDragOver={(e) => { e.preventDefault(); setIsDragOver(true) }}
          onDragLeave={() => setIsDragOver(false)}
          onDrop={(e) => { e.preventDefault(); setIsDragOver(false); onUpload("Internal_AI_Policy_v3.pdf") }}
          className={cn(
            "border-2 border-dashed rounded-lg p-6 text-center cursor-pointer transition-all",
            isDragOver || uploadedFile ? "border-[#6CEEAD] bg-[#6CEEAD]/10" : "border-[#4b5563] hover:border-[#6CEEAD] hover:bg-[#6CEEAD]/5"
          )}
        >
          <Upload className="w-7 h-7 mx-auto mb-2 text-[#9ca3af]" />
          <div className="text-[13px] font-semibold text-white mb-1">Drop your policy document here or click to browse</div>
          <div className="text-[10px] text-[#9ca3af]">Our AI will scan the document and extract risks and controls automatically</div>
          <div className="flex gap-1.5 justify-center mt-2.5">
            {["PDF", "DOCX", "TXT"].map((type) => (
              <span key={type} className="text-[9px] bg-[#1e2130] border border-[#2a2d3a] rounded px-2 py-0.5 text-[#9ca3af]">{type}</span>
            ))}
          </div>
        </div>
        {uploadedFile && (
          <div className="mt-2.5 bg-[#6CEEAD]/10 border border-[#6CEEAD] rounded-lg p-3 text-xs text-[#6CEEAD]">
            <Check className="w-3.5 h-3.5 inline mr-1" /> <b>{uploadedFile}</b> scanned — AI found <b>6 additional risks</b> and <b>4 controls</b>. These will be added to Step 3.
          </div>
        )}
      </div>
    </div>
  )
}

// ============================================================================
// Wizard Step: Risks
// ============================================================================
const risks = [
  { id: 1, name: "Biased model output", desc: "Unfair or discriminatory outputs affecting protected groups", severity: "high", controls: 3, sources: ["EU AI Act", "NIST"] },
  { id: 2, name: "Lack of human oversight", desc: "No mechanism for human review of high-stakes decisions", severity: "high", controls: 2, sources: ["EU AI Act"] },
  { id: 3, name: "Data provenance unclear", desc: "Training data sources not documented or auditable", severity: "high", controls: 2, sources: ["EU AI Act", "ISO 42001"] },
  { id: 4, name: "Insufficient explainability", desc: "Model decisions cannot be explained to affected users", severity: "med", controls: 2, sources: ["EU AI Act"] },
  { id: 5, name: "PII exposure in outputs", desc: "Model may surface personal data in generated responses", severity: "high", controls: 3, sources: ["NIST", "Custom"] },
  { id: 6, name: "Model drift undetected", desc: "Performance degradation not monitored over time", severity: "med", controls: 2, sources: ["NIST"] },
  { id: 7, name: "Inadequate access controls", desc: "Insufficient restrictions on who can query or modify models", severity: "low", controls: 2, sources: ["ISO 42001"] },
]

function StepRisks() {
  const [search, setSearch] = useState("")
  const [severityFilter, setSeverityFilter] = useState("all")
  const [frameworkFilter, setFrameworkFilter] = useState("all")

  const filteredRisks = risks.filter((r) => {
    const matchesSearch = r.name.toLowerCase().includes(search.toLowerCase()) || r.desc.toLowerCase().includes(search.toLowerCase())
    const matchesSeverity = severityFilter === "all" || r.severity === severityFilter
    const matchesFramework = frameworkFilter === "all" || r.sources.some((s) => s.toLowerCase().includes(frameworkFilter.toLowerCase()))
    return matchesSearch && matchesSeverity && matchesFramework
  })

  return (
    <div>
      <div className="bg-[#6CEEAD]/10 border border-[#6CEEAD] rounded-lg p-3 text-xs text-[#6CEEAD] mb-4">
        <Sparkles className="w-3.5 h-3.5 inline mr-1" /> <b>Deduplication complete</b> — EU AI Act and NIST RMF shared 4 overlapping risks. These have been merged into unified items.
      </div>

      <div className="mb-6">
        <div className="flex items-center gap-2 mb-3 flex-wrap">
          <span className="text-xs text-[#9ca3af] whitespace-nowrap">Showing <b className="text-white">14 risks</b> · <b className="text-white">18 controls</b> auto-generated</span>
          <div className="relative flex-1 min-w-[140px]">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-[#4b5563]" />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search risks or controls..."
              className="w-full bg-[#0f1117] border border-[#1e2130] rounded-md pl-8 pr-3 py-1.5 text-xs text-white placeholder-[#4b5563] focus:outline-none focus:border-[#6CEEAD]/50"
            />
          </div>
          <select
            value={severityFilter}
            onChange={(e) => setSeverityFilter(e.target.value)}
            className="bg-[#0f1117] border border-[#1e2130] rounded-md px-2 py-1.5 text-xs text-[#9ca3af] focus:outline-none focus:border-[#6CEEAD]/50"
          >
            <option value="all">All severity</option>
            <option value="high">High</option>
            <option value="med">Medium</option>
            <option value="low">Low</option>
          </select>
          <select
            value={frameworkFilter}
            onChange={(e) => setFrameworkFilter(e.target.value)}
            className="bg-[#0f1117] border border-[#1e2130] rounded-md px-2 py-1.5 text-xs text-[#9ca3af] focus:outline-none focus:border-[#6CEEAD]/50"
          >
            <option value="all">All frameworks</option>
            <option value="eu">EU AI Act</option>
            <option value="nist">NIST</option>
            <option value="custom">Custom</option>
          </select>
          <button className="bg-[#6CEEAD] hover:bg-[#5dd99c] text-[#0f1117] text-xs font-semibold px-3 py-1.5 rounded-md">+ Add risk</button>
          <button className="bg-[#1e2130] hover:bg-[#2a2d3a] text-[#9ca3af] text-xs px-3 py-1.5 rounded-md border border-[#2a2d3a]">+ Add control</button>
        </div>

        <div className="border border-[#1e2130] rounded-lg overflow-hidden">
          <table className="w-full text-xs">
            <thead>
              <tr className="bg-[#0f1117]">
                <th className="text-left p-2.5 border-b-2 border-[#1e2130] text-[#6b7280] font-bold text-[10px] tracking-wide uppercase">Risk</th>
                <th className="text-left p-2.5 border-b-2 border-[#1e2130] text-[#6b7280] font-bold text-[10px] tracking-wide uppercase">Severity</th>
                <th className="text-left p-2.5 border-b-2 border-[#1e2130] text-[#6b7280] font-bold text-[10px] tracking-wide uppercase">Controls</th>
                <th className="text-left p-2.5 border-b-2 border-[#1e2130] text-[#6b7280] font-bold text-[10px] tracking-wide uppercase">Source</th>
                <th className="p-2.5 border-b-2 border-[#1e2130]"></th>
              </tr>
            </thead>
            <tbody>
              {filteredRisks.map((risk) => (
                <tr key={risk.id} className="hover:bg-[#1a1d2a]">
                  <td className="p-2.5 border-b border-[#1e2130]">
                    <div className="font-semibold text-white mb-0.5">{risk.name}</div>
                    <div className="text-[10px] text-[#9ca3af]">{risk.desc}</div>
                  </td>
                  <td className="p-2.5 border-b border-[#1e2130]">
                    <span className={cn(
                      "inline-block text-[10px] font-bold px-2 py-0.5 rounded-full",
                      risk.severity === "high" && "bg-[#f87171]/10 text-[#f87171]",
                      risk.severity === "med" && "bg-[#FFEF3C]/10 text-[#FFEF3C]",
                      risk.severity === "low" && "bg-[#6CEEAD]/10 text-[#6CEEAD]"
                    )}>
                      {risk.severity === "high" ? "High" : risk.severity === "med" ? "Med" : "Low"}
                    </span>
                  </td>
                  <td className="p-2.5 border-b border-[#1e2130] text-[#9ca3af]">{risk.controls} controls</td>
                  <td className="p-2.5 border-b border-[#1e2130]">
                    <div className="flex flex-wrap gap-1">
                      {risk.sources.map((src) => (
                        <span key={src} className="text-[9px] bg-[#1e2130] border border-[#2a2d3a] rounded-full px-2 py-0.5 text-[#9ca3af]">{src}</span>
                      ))}
                    </div>
                  </td>
                  <td className="p-2.5 border-b border-[#1e2130]">
                    <button className="text-[#6CEEAD] text-[10px] font-semibold hover:underline">Edit</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="text-[10px] text-[#9ca3af] mt-2 text-center">
          Showing {filteredRisks.length} of 14 risks · <button className="text-[#6CEEAD] hover:underline">Show all</button>
        </div>
      </div>
    </div>
  )
}

// ============================================================================
// Wizard Step: Guardrails
// ============================================================================
const guardrails = [
  { id: "content-filter", icon: "🚫", name: "Content filtering", desc: "Block harmful, offensive, or policy-violating outputs from model responses.", hyperscaler: "AWS Bedrock · Databricks" },
  { id: "pii-detection", icon: "🔏", name: "PII detection & redaction", desc: "Automatically detect and redact personal data in model outputs before delivery.", hyperscaler: "AWS Bedrock · Databricks" },
  { id: "topic-restrict", icon: "🎯", name: "Topic restrictions", desc: "Restrict model to approved topic domains and block out-of-scope queries.", hyperscaler: "AWS Bedrock" },
  { id: "human-review", icon: "👁", name: "Human review trigger", desc: "Route low-confidence or high-stakes outputs to a human reviewer before delivery.", hyperscaler: "Custom" },
  { id: "confidence", icon: "📊", name: "Output confidence threshold", desc: "Block or flag outputs below a defined confidence score.", hyperscaler: "Databricks" },
  { id: "grounding", icon: "🔗", name: "Grounding check", desc: "Verify model outputs are grounded in provided context and not hallucinated.", hyperscaler: "AWS Bedrock" },
]

function StepGuardrails({
  selectedGuardrails,
  onToggleGuardrail,
}: {
  selectedGuardrails: string[]
  onToggleGuardrail: (id: string) => void
}) {
  return (
    <div>
      <div className="mb-6">
        <div className="text-[10px] font-bold tracking-wider uppercase text-[#6b7280] mb-2.5">Recommended guardrails</div>
        <p className="text-[10px] text-[#9ca3af] mb-3">Auto-suggested based on EU AI Act framework and your connected hyperscalers (AWS Bedrock, Databricks). Select all that apply.</p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5">
          {guardrails.map((gl) => {
            const isSelected = selectedGuardrails.includes(gl.id)
            return (
              <div
                key={gl.id}
                onClick={() => onToggleGuardrail(gl.id)}
                className={cn(
                  "border-2 rounded-lg p-3 cursor-pointer transition-all",
                  isSelected ? "border-[#976FE6] bg-[#976FE6]/10" : "border-[#2a2d3a] hover:border-[#4b5563]"
                )}
              >
                <div className="flex items-center gap-2 mb-1">
                  <div className={cn("w-7 h-7 rounded-md flex items-center justify-center text-sm flex-shrink-0", isSelected ? "bg-[#976FE6] text-white" : "bg-[#976FE6]/20")}>
                    {gl.icon}
                  </div>
                  <div className="text-xs font-semibold text-white">{gl.name}</div>
                </div>
                <div className="text-[10px] text-[#9ca3af] leading-snug">{gl.desc}</div>
                <div className="text-[9px] text-[#976FE6] font-semibold mt-1">{gl.hyperscaler}</div>
              </div>
            )
          })}
        </div>
      </div>

      <div className="h-px bg-[#2a2d3a] my-5" />

      <div className="mb-6">
        <div className="text-[10px] font-bold tracking-wider uppercase text-[#6b7280] mb-2.5">Condition rule builder</div>
        <p className="text-[10px] text-[#9ca3af] mb-3">Write IF/THEN rules to require specific guardrails based on model or agent attributes.</p>
        <div className="border border-[#1e2130] rounded-lg overflow-hidden mb-2.5">
          <div className="bg-[#0f1117] px-3.5 py-2.5 flex items-center justify-between border-b border-[#1e2130]">
            <div className="text-xs font-bold text-white">Rule 1</div>
            <button className="text-[#6CEEAD] text-[10px] font-semibold hover:underline">Duplicate</button>
          </div>
          <div className="p-3.5 space-y-2">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-[10px] font-bold text-[#976FE6] px-1 whitespace-nowrap">IF</span>
              <select className="flex-1 min-w-[80px] bg-[#0f1117] border border-[#1e2130] rounded px-2 py-1.5 text-xs text-white">
                <option>Model type</option>
                <option>Data sensitivity</option>
                <option>Audience type</option>
              </select>
              <select className="w-[90px] bg-[#0f1117] border border-[#1e2130] rounded px-2 py-1.5 text-xs text-white">
                <option>equals</option>
                <option>contains</option>
                <option>is not</option>
              </select>
              <select className="flex-1 min-w-[80px] bg-[#0f1117] border border-[#1e2130] rounded px-2 py-1.5 text-xs text-white">
                <option>Customer-facing</option>
                <option>Internal</option>
              </select>
            </div>
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-[10px] font-bold text-[#976FE6] px-1 whitespace-nowrap">AND</span>
              <select className="flex-1 min-w-[80px] bg-[#0f1117] border border-[#1e2130] rounded px-2 py-1.5 text-xs text-white">
                <option>Data sensitivity</option>
                <option>Model type</option>
                <option>Audience type</option>
              </select>
              <select className="w-[90px] bg-[#0f1117] border border-[#1e2130] rounded px-2 py-1.5 text-xs text-white">
                <option>equals</option>
                <option>contains</option>
                <option>is not</option>
              </select>
              <select className="flex-1 min-w-[80px] bg-[#0f1117] border border-[#1e2130] rounded px-2 py-1.5 text-xs text-white">
                <option>High</option>
                <option>Medium</option>
                <option>Low</option>
              </select>
            </div>
          </div>
          <button className="w-[calc(100%-28px)] mx-3.5 mb-3 border border-dashed border-[#4b5563] rounded-md py-2 text-xs text-[#9ca3af] hover:border-[#976FE6] hover:text-[#976FE6] transition-colors">
            + Add condition
          </button>
          <div className="flex items-center gap-2 px-3.5 py-2.5 bg-[#976FE6]/10 border-t border-[#1e2130] flex-wrap">
            <span className="text-[10px] font-bold text-[#6CEEAD] whitespace-nowrap">THEN require</span>
            <select className="flex-1 min-w-[160px] bg-[#0f1117] border border-[#976FE6] rounded px-2 py-1.5 text-xs text-white">
              <option>PII detection & redaction</option>
              <option>Content filtering</option>
              <option>Human review trigger</option>
            </select>
          </div>
        </div>
        <button className="w-full border border-dashed border-[#4b5563] rounded-md py-2.5 text-xs text-[#9ca3af] hover:border-[#976FE6] hover:text-[#976FE6] transition-colors">
          + Add another rule
        </button>
      </div>
    </div>
  )
}

// ============================================================================
// Wizard Step: Review
// ============================================================================
const frameworkNames: Record<string, string> = {
  "eu-ai-act": "EU AI Act",
  "nist": "NIST AI RMF 1.0",
  "iso-42001": "ISO/IEC 42001",
  "soc2": "SOC 2 + AI Trust",
  "hitrust": "HITRUST AI",
  "mas": "Singapore MAS",
}

const guardrailNames: Record<string, string> = {
  "content-filter": "Content filtering",
  "pii-detection": "PII detection",
  "topic-restrict": "Topic restrictions",
  "human-review": "Human review trigger",
  "confidence": "Output confidence threshold",
  "grounding": "Grounding check",
}

function StepReview({
  formData,
  selectedFrameworks,
  uploadedFile,
  selectedGuardrails,
  onGoToStep,
}: {
  formData: { name: string; description: string; owners: string[]; severity: "critical" | "high" | "standard" }
  selectedFrameworks: string[]
  uploadedFile: string | null
  selectedGuardrails: string[]
  onGoToStep: (step: number) => void
}) {
  const severityLabel = formData.severity === "critical" ? "Critical" : formData.severity === "high" ? "High" : "Standard"

  return (
    <div>
      <div className="bg-[#0788F7]/10 border border-[#0788F7] rounded-lg p-4 flex items-center gap-4 mb-4 flex-wrap">
        <div>
          <div className="text-3xl font-bold text-[#0788F7]">59</div>
          <div className="text-xs text-[#0788F7] font-semibold">Inventory items this pack will cover</div>
          <div className="text-[10px] text-[#9ca3af]">47 models · 12 agents · scanning begins immediately on activation</div>
        </div>
        <div className="ml-auto text-right">
          <div className="text-3xl font-bold text-[#FFEF3C]">14</div>
          <div className="text-xs text-[#FFEF3C] font-semibold">Risks attached</div>
          <div className="text-[10px] text-[#9ca3af]">18 controls · {selectedGuardrails.length} guardrails active</div>
        </div>
      </div>

      <ReviewSection title="Pack details" onEdit={() => onGoToStep(0)}>
        <ReviewRow label="Pack name"><b className="text-white">{formData.name}</b></ReviewRow>
        <ReviewRow label="Description">{formData.description}</ReviewRow>
        <ReviewRow label="Severity">
          <span className={cn(
            "inline-block text-[10px] font-bold px-2 py-0.5 rounded-full",
            formData.severity === "critical" && "bg-[#f87171]/10 text-[#f87171]",
            formData.severity === "high" && "bg-[#FFEF3C]/10 text-[#FFEF3C]",
            formData.severity === "standard" && "bg-[#6CEEAD]/10 text-[#6CEEAD]"
          )}>
            {severityLabel}
          </span>
        </ReviewRow>
        <ReviewRow label="Owners">
          {formData.owners.map((o) => (
            <span key={o} className="inline-flex items-center gap-1 bg-[#6CEEAD]/10 border border-[#6CEEAD] rounded-full px-2.5 py-0.5 text-[10px] text-[#6CEEAD] mr-1">
              {o}
            </span>
          ))}
        </ReviewRow>
      </ReviewSection>

      <ReviewSection title="Frameworks & policies" onEdit={() => onGoToStep(1)}>
        <ReviewRow label="Selected">
          {selectedFrameworks.map((id) => (
            <span key={id} className="inline-flex items-center gap-1 bg-[#6CEEAD]/10 border border-[#6CEEAD] rounded-full px-2.5 py-0.5 text-[10px] text-[#6CEEAD] mr-1">
              {frameworkNames[id] || id}
            </span>
          ))}
        </ReviewRow>
        {uploadedFile && <ReviewRow label="Custom policy">{uploadedFile} · 6 risks extracted</ReviewRow>}
      </ReviewSection>

      <ReviewSection title="Risks & controls" onEdit={() => onGoToStep(2)}>
        <ReviewRow label="Total risks">14 risks (4 deduplicated across frameworks)</ReviewRow>
        <ReviewRow label="Total controls">18 controls</ReviewRow>
        <ReviewRow label="Severity breakdown">
          <span className="inline-block text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#f87171]/10 text-[#f87171] mr-1">5 High</span>
          <span className="inline-block text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#FFEF3C]/10 text-[#FFEF3C] mr-1">6 Med</span>
          <span className="inline-block text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#6CEEAD]/10 text-[#6CEEAD]">3 Low</span>
        </ReviewRow>
      </ReviewSection>

      <ReviewSection title="Guardrails" onEdit={() => onGoToStep(3)}>
        <ReviewRow label="Selected">
          {selectedGuardrails.map((id) => (
            <span key={id} className="inline-flex items-center gap-1 bg-[#6CEEAD]/10 border border-[#6CEEAD] rounded-full px-2.5 py-0.5 text-[10px] text-[#6CEEAD] mr-1 mb-1">
              {guardrailNames[id] || id}
            </span>
          ))}
        </ReviewRow>
        <ReviewRow label="Custom rules">1 rule: IF model type = customer-facing AND data sensitivity = high → THEN PII detection & redaction</ReviewRow>
        <ReviewRow label="Hyperscalers">
          <span className="inline-flex items-center gap-1 bg-[#6CEEAD]/10 border border-[#6CEEAD] rounded-full px-2.5 py-0.5 text-[10px] text-[#6CEEAD] mr-1">AWS Bedrock</span>
          <span className="inline-flex items-center gap-1 bg-[#6CEEAD]/10 border border-[#6CEEAD] rounded-full px-2.5 py-0.5 text-[10px] text-[#6CEEAD] mr-1">Databricks</span>
        </ReviewRow>
      </ReviewSection>

      <div className="bg-[#FFEF3C]/10 border border-[#FFEF3C] rounded-lg p-3 text-xs leading-relaxed text-[#FFEF3C]">
        <b>What happens next:</b> This pack will be sent to an AI Governance admin for approval. Once approved it goes Active and immediately begins scanning all 59 inventory items.
      </div>
    </div>
  )
}

function ReviewSection({ title, onEdit, children }: { title: string; onEdit: () => void; children: React.ReactNode }) {
  return (
    <div className="border border-[#1e2130] rounded-lg overflow-hidden mb-4">
      <div className="bg-[#0f1117] px-4 py-2.5 flex items-center justify-between border-b border-[#1e2130]">
        <div className="text-xs font-bold text-white">{title}</div>
        <button onClick={onEdit} className="text-[#6CEEAD] text-[10px] font-semibold hover:underline">Edit</button>
      </div>
      <div className="p-4 space-y-2">{children}</div>
    </div>
  )
}

function ReviewRow({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="flex gap-3 items-baseline flex-wrap">
      <span className="text-[10px] text-[#6b7280] min-w-[120px] flex-shrink-0">{label}</span>
      <span className="text-xs text-[#9ca3af]">{children}</span>
    </div>
  )
}

// ============================================================================
// Success Screen
// ============================================================================
function SuccessScreen({
  packName,
  onCreateAnother,
  onViewAll,
}: {
  packName: string
  onCreateAnother: () => void
  onViewAll: () => void
}) {
  return (
    <div className="text-center py-16 px-5">
      <div className="w-16 h-16 bg-[#6CEEAD]/10 rounded-full flex items-center justify-center mx-auto mb-4">
        <Check className="w-7 h-7 text-[#6CEEAD]" />
      </div>
      <h2 className="text-xl font-semibold text-white mb-2">Governance pack submitted for approval</h2>
      <p className="text-[13px] text-[#9ca3af] mb-6 leading-relaxed max-w-md mx-auto">
        <b className="text-white">{packName}</b> has been sent to your AI Governance admins for review.<br />
        Pack owners will receive an email notification with a direct link once approved and active.
      </p>
      <div className="flex justify-center gap-8 mb-7 flex-wrap">
        <div className="text-center">
          <div className="text-3xl font-bold text-[#6CEEAD]">59</div>
          <div className="text-[10px] text-[#9ca3af]">Items to be scanned</div>
        </div>
        <div className="text-center">
          <div className="text-3xl font-bold text-[#6CEEAD]">14</div>
          <div className="text-[10px] text-[#9ca3af]">Risks attached</div>
        </div>
        <div className="text-center">
          <div className="text-3xl font-bold text-[#6CEEAD]">18</div>
          <div className="text-[10px] text-[#9ca3af]">Controls mapped</div>
        </div>
        <div className="text-center">
          <div className="text-3xl font-bold text-[#6CEEAD]">3</div>
          <div className="text-[10px] text-[#9ca3af]">Guardrails configured</div>
        </div>
      </div>
      <div className="flex justify-center gap-2.5">
        <button onClick={onCreateAnother} className="bg-[#6CEEAD] hover:bg-[#5dd99c] text-[#0f1117] font-semibold px-4 py-2.5 rounded-md text-sm transition-colors">
          Create another pack
        </button>
        <button onClick={onViewAll} className="border-2 border-[#6CEEAD] text-[#6CEEAD] hover:bg-[#6CEEAD]/10 font-semibold px-4 py-2.5 rounded-md text-sm transition-colors">
          View all packs
        </button>
      </div>
    </div>
  )
}

// ============================================================================
// Main Exported Component
// ============================================================================
export function GovernancePacksView() {
  const [packs, setPacks] = useState<GovernancePack[]>(initialPacks)
  const [currentTab, setCurrentTab] = useState<TabType>("all")
  const [searchValue, setSearchValue] = useState("")
  const [severityFilter, setSeverityFilter] = useState("")
  const [providerFilter, setProviderFilter] = useState("")
  const [drawerOpen, setDrawerOpen] = useState(false)
  const [selectedPack, setSelectedPack] = useState<GovernancePack | null>(null)
  const [viewMode, setViewMode] = useState<ViewMode>("table")
  const [showWizard, setShowWizard] = useState(false)
  const [wizardStep, setWizardStep] = useState(0)
  const [isSubmitted, setIsSubmitted] = useState(false)

  // Wizard form state
  const [formData, setFormData] = useState({
    name: "EU AI Act — Enterprise Pack",
    description: "Covers mandatory EU AI Act obligations for high-risk AI systems deployed in customer-facing workflows.",
    owners: ["Sarah Chen", "Marcus Reid"],
    severity: "critical" as const,
  })
  const [selectedFrameworks, setSelectedFrameworks] = useState<string[]>(["eu-ai-act"])
  const [uploadedFile, setUploadedFile] = useState<string | null>(null)
  const [selectedGuardrails, setSelectedGuardrails] = useState<string[]>(["content-filter", "pii-detection", "topic-restrict"])

  // Tab counts
  const tabCounts = useMemo(() => ({
    all: packs.length,
    active: packs.filter((p) => p.status === "active").length,
    pending: packs.filter((p) => p.status === "pending").length,
    draft: packs.filter((p) => p.status === "draft").length,
  }), [packs])

  // Filtered packs
  const filteredPacks = useMemo(() => {
    return packs.filter((pack) => {
      const matchesTab = currentTab === "all" || pack.status === currentTab
      const matchesSearch = pack.name.toLowerCase().includes(searchValue.toLowerCase())
      const matchesSeverity = severityFilter === "" || pack.severity === severityFilter
      const matchesProvider = providerFilter === "" || pack.provider === providerFilter
      return matchesTab && matchesSearch && matchesSeverity && matchesProvider
    })
  }, [packs, currentTab, searchValue, severityFilter, providerFilter])

  const handlePackClick = (pack: GovernancePack) => {
    setSelectedPack(pack)
    setDrawerOpen(true)
  }

  const handleEdit = () => {
    alert("Redirecting to Governance Pack Wizard...")
  }

  const handleArchive = (pack: GovernancePack) => {
    setPacks((prev) => prev.map((p) => (p.id === pack.id ? { ...p, status: "archived" as PackStatus } : p)))
  }

  const handleApprove = () => {
    alert("Approving pack would transition into Active Background Scanning layers.")
  }

  const handleReject = () => {
    alert("Rejecting pushes pack back to localized Draft layer.")
  }

  const handleReactivate = () => {
    alert("Reactivating returns this pack to Pending Review gates.")
  }

  const handleResume = () => {
    setShowWizard(true)
  }

  const goToWizardStep = (step: number) => {
    if (step >= 0 && step <= 4) setWizardStep(step)
  }

  const nextWizardStep = () => {
    if (wizardStep === 4) {
      setIsSubmitted(true)
    } else {
      goToWizardStep(wizardStep + 1)
    }
  }

  const prevWizardStep = () => goToWizardStep(wizardStep - 1)

  const toggleFramework = (id: string) => {
    setSelectedFrameworks((prev) => prev.includes(id) ? prev.filter((f) => f !== id) : [...prev, id])
  }

  const toggleGuardrail = (id: string) => {
    setSelectedGuardrails((prev) => prev.includes(id) ? prev.filter((g) => g !== id) : [...prev, id])
  }

  const resetWizard = () => {
    setWizardStep(0)
    setIsSubmitted(false)
    setFormData({ name: "", description: "", owners: [], severity: "standard" })
    setSelectedFrameworks([])
    setUploadedFile(null)
    setSelectedGuardrails([])
  }

  const hints = [
    "Step 1 of 5 — Fill in the pack details to get started",
    "Step 2 of 5 — Select frameworks or upload your own policy document",
    "Step 3 of 5 — Review and adjust auto-generated risks and controls",
    "Step 4 of 5 — Configure guardrails and conditional rules",
    "Step 5 of 5 — Review everything before submitting for approval",
  ]

  const nextLabels = ["Continue", "Continue", "Continue", "Continue", "Submit for approval"]

  // Wizard View
  if (showWizard) {
    if (isSubmitted) {
      return (
        <div className="flex-1 flex flex-col">
          <SuccessScreen
            packName={formData.name}
            onCreateAnother={() => { resetWizard() }}
            onViewAll={() => { setShowWizard(false); resetWizard() }}
          />
        </div>
      )
    }

    return (
      <div className="flex-1 flex flex-col">
        {/* Wizard Header */}
        <div className="bg-[#13151f] border-b border-[#1e2130] px-6 pt-5 pb-0">
          <div className="flex items-center gap-3 mb-5">
            <button
              onClick={() => setShowWizard(false)}
              className="text-xs text-[#9ca3af] flex items-center gap-1 hover:text-white transition-colors"
            >
              <ArrowLeft className="w-3 h-3" />
              Back
            </button>
            <h1 className="text-lg font-semibold text-white">Create Governance Pack</h1>
          </div>
          <WizardSteps currentStep={wizardStep} onStepClick={goToWizardStep} />
        </div>

        {/* Wizard Body */}
        <div className="flex-1 overflow-auto px-6 py-7 max-w-[860px] w-full mx-auto">
          {wizardStep === 0 && <StepDetails formData={formData} onUpdate={(data) => setFormData((prev) => ({ ...prev, ...data }))} />}
          {wizardStep === 1 && <StepFrameworks selectedFrameworks={selectedFrameworks} onToggleFramework={toggleFramework} uploadedFile={uploadedFile} onUpload={setUploadedFile} />}
          {wizardStep === 2 && <StepRisks />}
          {wizardStep === 3 && <StepGuardrails selectedGuardrails={selectedGuardrails} onToggleGuardrail={toggleGuardrail} />}
          {wizardStep === 4 && <StepReview formData={formData} selectedFrameworks={selectedFrameworks} uploadedFile={uploadedFile} selectedGuardrails={selectedGuardrails} onGoToStep={goToWizardStep} />}
        </div>

        {/* Wizard Footer */}
        <div className="bg-[#13151f] border-t border-[#1e2130] px-6 py-4 flex items-center justify-between sticky bottom-0 z-10">
          <div className="text-xs text-[#9ca3af]">{hints[wizardStep]}</div>
          <div className="flex gap-2.5">
            {wizardStep > 0 && (
              <button onClick={prevWizardStep} className="px-4 py-2 bg-[#1e2130] hover:bg-[#2a2d3a] border border-[#2a2d3a] text-white rounded-md text-sm font-medium transition-colors">
                Back
              </button>
            )}
            <button onClick={nextWizardStep} className="px-4 py-2 bg-[#6CEEAD] hover:bg-[#5dd99c] text-[#0f1117] rounded-md text-sm font-semibold transition-colors">
              {nextLabels[wizardStep]}
            </button>
          </div>
        </div>
      </div>
    )
  }

  // Dashboard View
  return (
    <div className="flex-1 flex flex-col">
      {/* Header */}
      <div className="bg-[#13151f] border-b border-[#1e2130] px-6 pt-6 pb-0">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
          <div>
            <h1 className="text-lg font-semibold text-white">Governance Packs</h1>
            <p className="text-xs text-[#9ca3af]">Manage framework-driven policy envelopes and automate compliance across model and agent inventories.</p>
          </div>
          <button
            onClick={() => setShowWizard(true)}
            className="bg-[#6CEEAD] hover:bg-[#5dd99c] text-[#0f1117] rounded-md px-4 py-2.5 text-[13px] font-semibold flex items-center gap-1.5 transition-colors"
          >
            <Plus className="w-4 h-4" />
            Create Pack
          </button>
        </div>
        <DashTabs currentTab={currentTab} onTabChange={setCurrentTab} counts={tabCounts} />
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-auto p-6">
        <CoverageAlert />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <StatCard label="Total Core Packs" value="5" meta="Across 3 regulatory standards" />
          <StatCard
            label="Active Background Scans"
            value={<>59 <span className="text-xs font-normal text-[#6CEEAD]">Assets</span></>}
            meta="Zero developer disruptions generated"
          />
          <StatCard label="Deduplicated Controls" value="18" meta="4 redundant mappings collapsed" />
          <StatCard
            label="Compliance Gaps Uncovered"
            value={<><span className="text-[#f87171]">14</span> <span className="text-xs font-normal text-[#9ca3af]">Risks</span></>}
            meta="Staged at system intake level"
          />
        </div>

        <TableToolbar
          searchValue={searchValue}
          onSearchChange={setSearchValue}
          severityFilter={severityFilter}
          onSeverityChange={setSeverityFilter}
          providerFilter={providerFilter}
          onProviderChange={setProviderFilter}
          viewMode={viewMode}
          onViewModeChange={setViewMode}
        />

        {viewMode === "table" ? (
          <PacksTable
            packs={filteredPacks}
            onPackClick={handlePackClick}
            onEdit={handleEdit}
            onArchive={handleArchive}
            onApprove={handleApprove}
            onReject={handleReject}
            onReactivate={handleReactivate}
            onResume={handleResume}
          />
        ) : (
          <PacksCards
            packs={filteredPacks}
            onPackClick={handlePackClick}
            onEdit={handleEdit}
            onArchive={handleArchive}
            onApprove={handleApprove}
            onReject={handleReject}
            onReactivate={handleReactivate}
            onResume={handleResume}
          />
        )}
      </div>

      <PackDrawer
        isOpen={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        pack={
          selectedPack
            ? {
                title: selectedPack.name,
                description: selectedPack.description,
                status: selectedPack.status,
                severity: selectedPack.severity,
                components: `${selectedPack.risks} Risks / ${selectedPack.controls} Controls`,
                guardrails: selectedPack.guardrails,
                owners: selectedPack.owners,
                date: selectedPack.date,
              }
            : null
        }
      />
    </div>
  )
}
