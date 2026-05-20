"use client"

import { useState } from 'react'
import { useSubscription, tierLabels } from '@/lib/subscription-context'
import { useNavigation } from '@/lib/navigation-context'
import { assessmentTypes, assessmentInstances, AssessmentType } from '@/lib/sample-data'
import {
  Lock,
  ChevronRight,
  Search,
  Filter,
  Plus,
  Clock,
  CheckCircle2,
  AlertCircle,
  Circle,
  Sparkles,
  ClipboardList,
  LayoutGrid,
  List,
} from 'lucide-react'
import { cn } from '@/lib/utils'

type AssessmentsView = 'all' | 'types'

const categoryIcons: Record<string, string> = {
  'Third-Party Risk': '#0788F7',
  'Security': '#976FE6',
  'Operational Risk': '#FFEF3C',
  'Compliance': '#00B935',
  'Privacy': '#6CEEAD',
  'AI Governance': '#3B40D8',
  'Regulatory': '#D9D9CC',
  'GRC': '#008665',
  'Data Discovery': '#0788F7',
  'Incident Management': '#ef4444',
}

const tierOrder: Record<string, number> = { lite: 0, plus: 1, premium: 2 }

const tierMeta = {
  lite: { label: 'OT Lite', color: '#9ca3af', bg: 'rgba(156,163,175,0.1)' },
  plus: { label: 'OT Plus', color: '#6CEEAD', bg: 'rgba(108,238,173,0.1)' },
  premium: { label: 'OT Premium', color: '#976FE6', bg: 'rgba(151,111,230,0.1)' },
}

export function AssessmentsModule() {
  const { tier, setTier } = useSubscription()
  const { setSelectedRecordId } = useNavigation()
  const [view, setView] = useState<AssessmentsView>('types')
  const [searchQuery, setSearchQuery] = useState('')

  const currentTierOrder = tierOrder[tier]

  // Types the current tier can access
  const availableTypes = assessmentTypes.filter(t => tierOrder[t.tier] <= currentTierOrder)
  const lockedTypes = assessmentTypes.filter(t => tierOrder[t.tier] > currentTierOrder)

  // Instances the current tier can see
  const availableInstances = assessmentInstances.filter(i => tierOrder[i.tier] <= currentTierOrder)

  const filteredInstances = availableInstances.filter(i =>
    i.typeName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    i.subject.toLowerCase().includes(searchQuery.toLowerCase()) ||
    i.assignedTo.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const statusColors: Record<string, string> = {
    'Completed': 'bg-[#00B935]/10 text-[#00B935]',
    'In Progress': 'bg-[#FFEF3C]/10 text-[#FFEF3C]',
    'In Review': 'bg-[#0788F7]/10 text-[#0788F7]',
    'Not Started': 'bg-[#4b5563]/10 text-[#9ca3af]',
    'Overdue': 'bg-[#ef4444]/10 text-[#ef4444]',
  }

  const statusIcon = (status: string) => {
    if (status === 'Completed') return <CheckCircle2 className="w-3.5 h-3.5 text-[#00B935]" />
    if (status === 'Overdue') return <AlertCircle className="w-3.5 h-3.5 text-[#ef4444]" />
    if (status === 'In Progress' || status === 'In Review') return <Clock className="w-3.5 h-3.5 text-[#FFEF3C]" />
    return <Circle className="w-3.5 h-3.5 text-[#4b5563]" />
  }

  // Summary stats
  const total = availableInstances.length
  const completed = availableInstances.filter(i => i.status === 'Completed').length
  const inProgress = availableInstances.filter(i => i.status === 'In Progress' || i.status === 'In Review').length
  const overdue = availableInstances.filter(i => i.status === 'Overdue').length

  // Group available types by category for the card grid
  const typesByCategory = availableTypes.reduce<Record<string, AssessmentType[]>>((acc, t) => {
    if (!acc[t.category]) acc[t.category] = []
    acc[t.category].push(t)
    return acc
  }, {})

  // Group locked types by tier for the locked section
  const lockedByTier = lockedTypes.reduce<Record<string, AssessmentType[]>>((acc, t) => {
    if (!acc[t.tier]) acc[t.tier] = []
    acc[t.tier].push(t)
    return acc
  }, {})

  const nextTier = tier === 'lite' ? 'plus' : tier === 'plus' ? 'premium' : null

  return (
    <div className="h-full flex flex-col">
      {/* Module Header */}
      <div className="px-6 pt-6 pb-0">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h1 className="text-xl font-medium tracking-[-0.03em] text-white">Assessments</h1>
            <p className="text-sm text-[#9ca3af] mt-0.5">
              {availableTypes.length} assessment types available on{' '}
              <span className="text-[#6CEEAD]">{tierLabels[tier]}</span>
            </p>
          </div>
          <div className="flex items-center gap-2">
            <button className="flex items-center gap-2 px-3 py-2 bg-[#6CEEAD] text-[#0f1117] rounded-md text-sm font-medium hover:bg-[#5dd99c] transition-colors">
              <Plus className="w-4 h-4" />
              Start assessment
            </button>
          </div>
        </div>

        {/* Summary Stats */}
        <div className="grid grid-cols-4 gap-3 mb-5">
          {[
            { label: 'Total', value: total, color: '#fff' },
            { label: 'Completed', value: completed, color: '#00B935' },
            { label: 'In Progress', value: inProgress, color: '#FFEF3C' },
            { label: 'Overdue', value: overdue, color: '#ef4444' },
          ].map(stat => (
            <div key={stat.label} className="p-3 bg-[#13151f] border border-[#1e2130] rounded-lg">
              <p className="text-xs text-[#9ca3af] mb-1">{stat.label}</p>
              <p className="text-2xl font-semibold" style={{ color: stat.color }}>{stat.value}</p>
            </div>
          ))}
        </div>

        {/* View Toggle */}
        <div className="flex items-center gap-1 border-b border-[#1e2130]">
          <button
            onClick={() => setView('types')}
            className={cn(
              "flex items-center gap-2 px-4 py-2.5 text-sm font-medium transition-colors relative",
              view === 'types' ? "text-[#6CEEAD]" : "text-[#9ca3af] hover:text-white"
            )}
          >
            <LayoutGrid className="w-4 h-4" />
            Assessment Types
            {view === 'types' && <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#6CEEAD]" />}
          </button>
          <button
            onClick={() => setView('all')}
            className={cn(
              "flex items-center gap-2 px-4 py-2.5 text-sm font-medium transition-colors relative",
              view === 'all' ? "text-[#6CEEAD]" : "text-[#9ca3af] hover:text-white"
            )}
          >
            <List className="w-4 h-4" />
            All Assessments
            <span className="ml-1 px-1.5 py-0.5 text-xs bg-[#1e2130] text-[#9ca3af] rounded">
              {availableInstances.length}
            </span>
            {view === 'all' && <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#6CEEAD]" />}
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-auto px-6 py-5">

        {/* ── Assessment Types View ────────────────────────────────────────────── */}
        {view === 'types' && (
          <div className="space-y-8">

            {/* Available types grouped by category */}
            {Object.entries(typesByCategory).map(([category, types]) => (
              <div key={category}>
                <div className="flex items-center gap-2 mb-3">
                  <div
                    className="w-2 h-2 rounded-full"
                    style={{ background: categoryIcons[category] || '#9ca3af' }}
                  />
                  <h3 className="text-sm font-medium text-[#9ca3af] uppercase tracking-wider">{category}</h3>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-3">
                  {types.map(type => (
                    <div
                      key={type.id}
                      className="p-4 bg-[#13151f] border border-[#1e2130] rounded-lg hover:border-[#2a2d3a] cursor-pointer transition-all group"
                      onClick={() => setSelectedRecordId(type.name)}
                    >
                      <div className="flex items-start justify-between mb-2">
                        <div
                          className="px-2 py-0.5 rounded text-xs font-medium"
                          style={{
                            background: tierMeta[type.tier].bg,
                            color: tierMeta[type.tier].color,
                          }}
                        >
                          {tierMeta[type.tier].label}
                        </div>
                        <span className="text-xs text-[#4b5563]">{type.questionCount} questions</span>
                      </div>
                      <h4 className="text-sm font-medium text-white mb-1 leading-snug">{type.name}</h4>
                      <p className="text-xs text-[#9ca3af] leading-relaxed mb-3 line-clamp-2">{type.description}</p>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-1 text-xs text-[#4b5563]">
                          <Clock className="w-3 h-3" />
                          {type.estimatedTime}
                        </div>
                        <span className="text-xs text-[#4b5563] group-hover:text-[#6CEEAD] transition-colors flex items-center gap-1">
                          Start <ChevronRight className="w-3 h-3" />
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}

            {/* Locked types — grouped by tier */}
            {Object.entries(lockedByTier)
              .sort(([a], [b]) => tierOrder[a] - tierOrder[b])
              .map(([lockedTier, types]) => (
                <div key={lockedTier}>
                  {/* Upgrade prompt header */}
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <Lock className="w-3.5 h-3.5 text-[#4b5563]" />
                      <h3 className="text-sm font-medium text-[#4b5563] uppercase tracking-wider">
                        Unlocked with {tierMeta[lockedTier as keyof typeof tierMeta].label}
                      </h3>
                    </div>
                    {nextTier === lockedTier && (
                      <button
                        onClick={() => setTier(lockedTier as 'plus' | 'premium')}
                        className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-md transition-colors"
                        style={{
                          background: tierMeta[lockedTier as keyof typeof tierMeta].bg,
                          color: tierMeta[lockedTier as keyof typeof tierMeta].color,
                          border: `1px solid ${tierMeta[lockedTier as keyof typeof tierMeta].color}40`,
                        }}
                      >
                        <Sparkles className="w-3 h-3" />
                        Upgrade to {tierMeta[lockedTier as keyof typeof tierMeta].label}
                      </button>
                    )}
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-3">
                    {types.map(type => (
                      <div
                        key={type.id}
                        className="p-4 bg-[#13151f]/60 border border-[#1e2130] rounded-lg opacity-50 relative overflow-hidden"
                      >
                        {/* Lock overlay */}
                        <div className="absolute top-3 right-3">
                          <Lock className="w-3.5 h-3.5 text-[#4b5563]" />
                        </div>
                        <div className="flex items-start justify-between mb-2">
                          <div
                            className="px-2 py-0.5 rounded text-xs font-medium"
                            style={{
                              background: tierMeta[type.tier as keyof typeof tierMeta].bg,
                              color: tierMeta[type.tier as keyof typeof tierMeta].color,
                            }}
                          >
                            {tierMeta[type.tier as keyof typeof tierMeta].label}
                          </div>
                          <span className="text-xs text-[#4b5563] mr-5">{type.questionCount} questions</span>
                        </div>
                        <h4 className="text-sm font-medium text-[#4b5563] mb-1 leading-snug">{type.name}</h4>
                        <p className="text-xs text-[#4b5563] leading-relaxed line-clamp-2">{type.description}</p>
                        <div className="mt-3 flex items-center gap-1 text-xs text-[#4b5563]">
                          <Clock className="w-3 h-3" />
                          {type.estimatedTime}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
          </div>
        )}

        {/* ── All Assessments View ─────────────────────────────────────────────── */}
        {view === 'all' && (
          <div>
            {/* Search & filter bar */}
            <div className="flex items-center gap-2 mb-4">
              <div className="relative flex-1 max-w-sm">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#4b5563]" />
                <input
                  type="text"
                  placeholder="Search assessments..."
                  value={searchQuery}
                  onChange={e => setSearchQuery(e.target.value)}
                  className="w-full pl-9 pr-4 py-2 bg-[#1e2130] border border-[#2a2d3a] rounded-md text-sm text-white placeholder-[#4b5563] focus:outline-none focus:border-[#6CEEAD]/50"
                />
              </div>
              <button className="p-2 bg-[#1e2130] border border-[#2a2d3a] rounded-md text-[#9ca3af] hover:text-white hover:border-[#3a3d4a] transition-colors">
                <Filter className="w-4 h-4" />
              </button>
            </div>

            <div className="bg-[#13151f] border border-[#1e2130] rounded-lg overflow-hidden">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-[#1e2130]">
                    <th className="text-left py-3 px-4 text-xs font-medium text-[#9ca3af] uppercase tracking-wider">Assessment</th>
                    <th className="text-left py-3 px-4 text-xs font-medium text-[#9ca3af] uppercase tracking-wider">Subject</th>
                    <th className="text-left py-3 px-4 text-xs font-medium text-[#9ca3af] uppercase tracking-wider">Assigned To</th>
                    <th className="text-left py-3 px-4 text-xs font-medium text-[#9ca3af] uppercase tracking-wider">Due Date</th>
                    <th className="text-left py-3 px-4 text-xs font-medium text-[#9ca3af] uppercase tracking-wider">Score</th>
                    <th className="text-left py-3 px-4 text-xs font-medium text-[#9ca3af] uppercase tracking-wider">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredInstances.length === 0 ? (
                    <tr>
                      <td colSpan={6} className="py-12 text-center text-sm text-[#4b5563]">
                        No assessments match your search
                      </td>
                    </tr>
                  ) : (
                    filteredInstances.map(instance => (
                      <tr
                        key={instance.id}
                        className="border-b border-[#1e2130] hover:bg-[#1a1d2a] cursor-pointer transition-colors"
                        onClick={() => setSelectedRecordId(instance.subject)}
                      >
                        <td className="py-3 px-4">
                          <div className="flex items-center gap-2">
                            <ClipboardList className="w-3.5 h-3.5 text-[#4b5563] flex-shrink-0" />
                            <span className="text-sm text-white font-medium">{instance.typeName}</span>
                          </div>
                        </td>
                        <td className="py-3 px-4 text-sm text-[#9ca3af]">{instance.subject}</td>
                        <td className="py-3 px-4 text-sm text-[#9ca3af]">{instance.assignedTo}</td>
                        <td className="py-3 px-4 text-sm text-[#9ca3af]">{instance.dueDate}</td>
                        <td className="py-3 px-4">
                          {instance.score !== undefined ? (
                            <div className="flex items-center gap-2">
                              <div className="w-16 h-1.5 bg-[#1e2130] rounded-full">
                                <div
                                  className="h-1.5 rounded-full"
                                  style={{
                                    width: `${instance.score}%`,
                                    background: instance.score >= 80 ? '#00B935' : instance.score >= 60 ? '#FFEF3C' : '#ef4444',
                                  }}
                                />
                              </div>
                              <span className="text-sm text-white">{instance.score}%</span>
                            </div>
                          ) : (
                            <span className="text-sm text-[#4b5563]">—</span>
                          )}
                        </td>
                        <td className="py-3 px-4">
                          <span className={cn("text-xs px-2 py-1 rounded flex items-center gap-1.5 w-fit", statusColors[instance.status])}>
                            {statusIcon(instance.status)}
                            {instance.status}
                          </span>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
