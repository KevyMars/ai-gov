"use client"

import { useNavigation, PrivacyTab, PrivacyRecordItem } from '@/lib/navigation-context'
import {
  piaRecords,
  incidentRecords,
  privacyRightRequests,
  dataMappingRecords,
  privacyNotices,
  benchmarkRecords,
  maturityRecords,
} from '@/lib/sample-data'
import {
  FileSearch,
  AlertOctagon,
  UserCheck,
  Map,
  FileText,
  BarChart2,
  TrendingUp,
  Plus,
  Search,
  Filter,
  Download,
  Settings,
  Globe,
} from 'lucide-react'
import { cn } from '@/lib/utils'

const tabs: { id: PrivacyTab; label: string }[] = [
  { id: 'records', label: 'Records' },
  { id: 'objects', label: 'Objects' },
  { id: 'policies', label: 'Policies' },
]

const recordItems: { id: PrivacyRecordItem; label: string; icon: React.ReactNode }[] = [
  { id: 'pia-dpia', label: 'PIA & DPIA', icon: <FileSearch className="w-4 h-4" /> },
  { id: 'incidents', label: 'Incident Management', icon: <AlertOctagon className="w-4 h-4" /> },
  { id: 'privacy-rights', label: 'Privacy Rights', icon: <UserCheck className="w-4 h-4" /> },
  { id: 'data-mapping', label: 'Data Mapping', icon: <Map className="w-4 h-4" /> },
  { id: 'privacy-notices', label: 'Privacy Notices', icon: <FileText className="w-4 h-4" /> },
  { id: 'benchmarking', label: 'Benchmarking', icon: <BarChart2 className="w-4 h-4" /> },
  { id: 'maturity-planning', label: 'Maturity & Planning', icon: <TrendingUp className="w-4 h-4" /> },
]

export function PrivacyManagementModule() {
  const { privacyTab, setPrivacyTab, privacyRecordItem, setPrivacyRecordItem, setSelectedRecordId } = useNavigation()

  const statusColors: Record<string, string> = {
    // Generic statuses
    'Draft': 'bg-[#9ca3af]/10 text-[#9ca3af]',
    'In Review': 'bg-[#FFEF3C]/10 text-[#FFEF3C]',
    'Approved': 'bg-[#00B935]/10 text-[#00B935]',
    'Published': 'bg-[#00B935]/10 text-[#00B935]',
    'Archived': 'bg-[#4b5563]/10 text-[#9ca3af]',
    'Overdue': 'bg-[#ef4444]/10 text-[#ef4444]',
    // Incident
    'Open': 'bg-[#ef4444]/10 text-[#ef4444]',
    'Under Investigation': 'bg-[#FFEF3C]/10 text-[#FFEF3C]',
    'Resolved': 'bg-[#00B935]/10 text-[#00B935]',
    'Reported to Authority': 'bg-[#0788F7]/10 text-[#0788F7]',
    // Rights
    'New': 'bg-[#0788F7]/10 text-[#0788F7]',
    'In Progress': 'bg-[#FFEF3C]/10 text-[#FFEF3C]',
    'Completed': 'bg-[#00B935]/10 text-[#00B935]',
    'Rejected': 'bg-[#ef4444]/10 text-[#ef4444]',
    // Benchmark
    'Compliant': 'bg-[#00B935]/10 text-[#00B935]',
    'Partially Compliant': 'bg-[#FFEF3C]/10 text-[#FFEF3C]',
    'Non-Compliant': 'bg-[#ef4444]/10 text-[#ef4444]',
    // Maturity
    'On Track': 'bg-[#00B935]/10 text-[#00B935]',
    'At Risk': 'bg-[#FFEF3C]/10 text-[#FFEF3C]',
    'Behind': 'bg-[#ef4444]/10 text-[#ef4444]',
    'Achieved': 'bg-[#6CEEAD]/10 text-[#6CEEAD]',
  }

  const severityColors: Record<string, string> = {
    'Critical': 'bg-[#ef4444]/10 text-[#ef4444]',
    'High': 'bg-[#FFEF3C]/10 text-[#FFEF3C]',
    'Medium': 'bg-[#0788F7]/10 text-[#0788F7]',
    'Low': 'bg-[#00B935]/10 text-[#00B935]',
  }

  const maturityLevelLabel = (level: number) => ['', 'Initial', 'Developing', 'Defined', 'Managed', 'Optimised'][level]

  const maturityLevelColor = (level: number) => {
    if (level <= 1) return 'text-[#ef4444]'
    if (level === 2) return 'text-[#FFEF3C]'
    if (level === 3) return 'text-[#0788F7]'
    return 'text-[#00B935]'
  }

  const getItemLabel = () => recordItems.find(i => i.id === privacyRecordItem)?.label || ''
  const getItemCount = () => {
    switch (privacyRecordItem) {
      case 'pia-dpia': return piaRecords.length
      case 'incidents': return incidentRecords.length
      case 'privacy-rights': return privacyRightRequests.length
      case 'data-mapping': return dataMappingRecords.length
      case 'privacy-notices': return privacyNotices.length
      case 'benchmarking': return benchmarkRecords.length
      case 'maturity-planning': return maturityRecords.length
      default: return 0
    }
  }

  const renderRecordsTable = () => {
    switch (privacyRecordItem) {

      case 'pia-dpia':
        return (
          <table className="w-full">
            <thead>
              <tr className="border-b border-[#1e2130]">
                <th className="text-left py-3 px-4 text-xs font-medium text-[#9ca3af] uppercase tracking-wider">ID</th>
                <th className="text-left py-3 px-4 text-xs font-medium text-[#9ca3af] uppercase tracking-wider">Name</th>
                <th className="text-left py-3 px-4 text-xs font-medium text-[#9ca3af] uppercase tracking-wider">Type</th>
                <th className="text-left py-3 px-4 text-xs font-medium text-[#9ca3af] uppercase tracking-wider">Owner</th>
                <th className="text-left py-3 px-4 text-xs font-medium text-[#9ca3af] uppercase tracking-wider">Department</th>
                <th className="text-left py-3 px-4 text-xs font-medium text-[#9ca3af] uppercase tracking-wider">Due Date</th>
                <th className="text-left py-3 px-4 text-xs font-medium text-[#9ca3af] uppercase tracking-wider">Risk</th>
                <th className="text-left py-3 px-4 text-xs font-medium text-[#9ca3af] uppercase tracking-wider">Status</th>
              </tr>
            </thead>
            <tbody>
              {piaRecords.map((record) => (
                <tr
                  key={record.id}
                  className="border-b border-[#1e2130] hover:bg-[#1a1d2a] cursor-pointer transition-colors"
                  onClick={() => setSelectedRecordId(record.name)}
                >
                  <td className="py-3 px-4 text-sm text-[#9ca3af]">{record.id}</td>
                  <td className="py-3 px-4 text-sm text-white font-medium">{record.name}</td>
                  <td className="py-3 px-4">
                    <span className="text-xs px-2 py-1 rounded bg-[#0788F7]/10 text-[#0788F7]">{record.type}</span>
                  </td>
                  <td className="py-3 px-4 text-sm text-[#9ca3af]">{record.owner}</td>
                  <td className="py-3 px-4 text-sm text-[#9ca3af]">{record.department}</td>
                  <td className="py-3 px-4 text-sm text-[#9ca3af]">{record.dueDate}</td>
                  <td className="py-3 px-4">
                    <span className={cn("text-xs px-2 py-1 rounded", severityColors[record.riskLevel])}>{record.riskLevel}</span>
                  </td>
                  <td className="py-3 px-4">
                    <span className={cn("text-xs px-2 py-1 rounded", statusColors[record.status])}>{record.status}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )

      case 'incidents':
        return (
          <table className="w-full">
            <thead>
              <tr className="border-b border-[#1e2130]">
                <th className="text-left py-3 px-4 text-xs font-medium text-[#9ca3af] uppercase tracking-wider">ID</th>
                <th className="text-left py-3 px-4 text-xs font-medium text-[#9ca3af] uppercase tracking-wider">Title</th>
                <th className="text-left py-3 px-4 text-xs font-medium text-[#9ca3af] uppercase tracking-wider">Type</th>
                <th className="text-left py-3 px-4 text-xs font-medium text-[#9ca3af] uppercase tracking-wider">Severity</th>
                <th className="text-left py-3 px-4 text-xs font-medium text-[#9ca3af] uppercase tracking-wider">Affected Records</th>
                <th className="text-left py-3 px-4 text-xs font-medium text-[#9ca3af] uppercase tracking-wider">Reported</th>
                <th className="text-left py-3 px-4 text-xs font-medium text-[#9ca3af] uppercase tracking-wider">Status</th>
              </tr>
            </thead>
            <tbody>
              {incidentRecords.map((record) => (
                <tr
                  key={record.id}
                  className="border-b border-[#1e2130] hover:bg-[#1a1d2a] cursor-pointer transition-colors"
                  onClick={() => setSelectedRecordId(record.title)}
                >
                  <td className="py-3 px-4 text-sm text-[#9ca3af]">{record.id}</td>
                  <td className="py-3 px-4 text-sm text-white font-medium">{record.title}</td>
                  <td className="py-3 px-4 text-sm text-[#9ca3af]">{record.type}</td>
                  <td className="py-3 px-4">
                    <span className={cn("text-xs px-2 py-1 rounded", severityColors[record.severity])}>{record.severity}</span>
                  </td>
                  <td className="py-3 px-4 text-sm text-[#9ca3af]">{record.affectedRecords}</td>
                  <td className="py-3 px-4 text-sm text-[#9ca3af]">{record.reportedDate}</td>
                  <td className="py-3 px-4">
                    <span className={cn("text-xs px-2 py-1 rounded", statusColors[record.status])}>{record.status}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )

      case 'privacy-rights':
        return (
          <table className="w-full">
            <thead>
              <tr className="border-b border-[#1e2130]">
                <th className="text-left py-3 px-4 text-xs font-medium text-[#9ca3af] uppercase tracking-wider">ID</th>
                <th className="text-left py-3 px-4 text-xs font-medium text-[#9ca3af] uppercase tracking-wider">Type</th>
                <th className="text-left py-3 px-4 text-xs font-medium text-[#9ca3af] uppercase tracking-wider">Subject</th>
                <th className="text-left py-3 px-4 text-xs font-medium text-[#9ca3af] uppercase tracking-wider">Assigned To</th>
                <th className="text-left py-3 px-4 text-xs font-medium text-[#9ca3af] uppercase tracking-wider">Channel</th>
                <th className="text-left py-3 px-4 text-xs font-medium text-[#9ca3af] uppercase tracking-wider">Received</th>
                <th className="text-left py-3 px-4 text-xs font-medium text-[#9ca3af] uppercase tracking-wider">Due</th>
                <th className="text-left py-3 px-4 text-xs font-medium text-[#9ca3af] uppercase tracking-wider">Status</th>
              </tr>
            </thead>
            <tbody>
              {privacyRightRequests.map((record) => (
                <tr
                  key={record.id}
                  className="border-b border-[#1e2130] hover:bg-[#1a1d2a] cursor-pointer transition-colors"
                  onClick={() => setSelectedRecordId(record.id)}
                >
                  <td className="py-3 px-4 text-sm text-[#9ca3af]">{record.id}</td>
                  <td className="py-3 px-4">
                    <span className="text-xs px-2 py-1 rounded bg-[#976FE6]/10 text-[#976FE6]">{record.type}</span>
                  </td>
                  <td className="py-3 px-4 text-sm text-white font-medium">{record.subject}</td>
                  <td className="py-3 px-4 text-sm text-[#9ca3af]">{record.assignedTo}</td>
                  <td className="py-3 px-4 text-sm text-[#9ca3af]">{record.channel}</td>
                  <td className="py-3 px-4 text-sm text-[#9ca3af]">{record.receivedDate}</td>
                  <td className="py-3 px-4 text-sm text-[#9ca3af]">{record.dueDate}</td>
                  <td className="py-3 px-4">
                    <span className={cn("text-xs px-2 py-1 rounded", statusColors[record.status])}>{record.status}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )

      case 'data-mapping':
        return (
          <table className="w-full">
            <thead>
              <tr className="border-b border-[#1e2130]">
                <th className="text-left py-3 px-4 text-xs font-medium text-[#9ca3af] uppercase tracking-wider">ID</th>
                <th className="text-left py-3 px-4 text-xs font-medium text-[#9ca3af] uppercase tracking-wider">Process</th>
                <th className="text-left py-3 px-4 text-xs font-medium text-[#9ca3af] uppercase tracking-wider">Category</th>
                <th className="text-left py-3 px-4 text-xs font-medium text-[#9ca3af] uppercase tracking-wider">Legal Basis</th>
                <th className="text-left py-3 px-4 text-xs font-medium text-[#9ca3af] uppercase tracking-wider">Data Types</th>
                <th className="text-left py-3 px-4 text-xs font-medium text-[#9ca3af] uppercase tracking-wider">Retention</th>
                <th className="text-left py-3 px-4 text-xs font-medium text-[#9ca3af] uppercase tracking-wider">Cross-Border</th>
              </tr>
            </thead>
            <tbody>
              {dataMappingRecords.map((record) => (
                <tr
                  key={record.id}
                  className="border-b border-[#1e2130] hover:bg-[#1a1d2a] cursor-pointer transition-colors"
                  onClick={() => setSelectedRecordId(record.process)}
                >
                  <td className="py-3 px-4 text-sm text-[#9ca3af]">{record.id}</td>
                  <td className="py-3 px-4 text-sm text-white font-medium">{record.process}</td>
                  <td className="py-3 px-4 text-sm text-[#9ca3af]">{record.category}</td>
                  <td className="py-3 px-4">
                    <span className="text-xs px-2 py-1 rounded bg-[#3B40D8]/10 text-[#3B40D8]">{record.legalBasis}</span>
                  </td>
                  <td className="py-3 px-4 text-sm text-[#9ca3af]">{record.dataTypes}</td>
                  <td className="py-3 px-4 text-sm text-[#9ca3af]">{record.retention}</td>
                  <td className="py-3 px-4">
                    {record.crossBorder ? (
                      <span className="text-xs px-2 py-1 rounded bg-[#FFEF3C]/10 text-[#FFEF3C] flex items-center gap-1 w-fit">
                        <Globe className="w-3 h-3" /> Yes
                      </span>
                    ) : (
                      <span className="text-xs px-2 py-1 rounded bg-[#00B935]/10 text-[#00B935]">No</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )

      case 'privacy-notices':
        return (
          <table className="w-full">
            <thead>
              <tr className="border-b border-[#1e2130]">
                <th className="text-left py-3 px-4 text-xs font-medium text-[#9ca3af] uppercase tracking-wider">ID</th>
                <th className="text-left py-3 px-4 text-xs font-medium text-[#9ca3af] uppercase tracking-wider">Name</th>
                <th className="text-left py-3 px-4 text-xs font-medium text-[#9ca3af] uppercase tracking-wider">Type</th>
                <th className="text-left py-3 px-4 text-xs font-medium text-[#9ca3af] uppercase tracking-wider">Version</th>
                <th className="text-left py-3 px-4 text-xs font-medium text-[#9ca3af] uppercase tracking-wider">Owner</th>
                <th className="text-left py-3 px-4 text-xs font-medium text-[#9ca3af] uppercase tracking-wider">Last Updated</th>
                <th className="text-left py-3 px-4 text-xs font-medium text-[#9ca3af] uppercase tracking-wider">Languages</th>
                <th className="text-left py-3 px-4 text-xs font-medium text-[#9ca3af] uppercase tracking-wider">Status</th>
              </tr>
            </thead>
            <tbody>
              {privacyNotices.map((record) => (
                <tr
                  key={record.id}
                  className="border-b border-[#1e2130] hover:bg-[#1a1d2a] cursor-pointer transition-colors"
                  onClick={() => setSelectedRecordId(record.name)}
                >
                  <td className="py-3 px-4 text-sm text-[#9ca3af]">{record.id}</td>
                  <td className="py-3 px-4 text-sm text-white font-medium">{record.name}</td>
                  <td className="py-3 px-4 text-sm text-[#9ca3af]">{record.type}</td>
                  <td className="py-3 px-4 text-sm text-[#9ca3af]">v{record.version}</td>
                  <td className="py-3 px-4 text-sm text-[#9ca3af]">{record.owner}</td>
                  <td className="py-3 px-4 text-sm text-[#9ca3af]">{record.lastUpdated}</td>
                  <td className="py-3 px-4 text-sm text-[#9ca3af]">{record.languages}</td>
                  <td className="py-3 px-4">
                    <span className={cn("text-xs px-2 py-1 rounded", statusColors[record.status])}>{record.status}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )

      case 'benchmarking':
        return (
          <table className="w-full">
            <thead>
              <tr className="border-b border-[#1e2130]">
                <th className="text-left py-3 px-4 text-xs font-medium text-[#9ca3af] uppercase tracking-wider">ID</th>
                <th className="text-left py-3 px-4 text-xs font-medium text-[#9ca3af] uppercase tracking-wider">Framework</th>
                <th className="text-left py-3 px-4 text-xs font-medium text-[#9ca3af] uppercase tracking-wider">Score</th>
                <th className="text-left py-3 px-4 text-xs font-medium text-[#9ca3af] uppercase tracking-wider">Assessor</th>
                <th className="text-left py-3 px-4 text-xs font-medium text-[#9ca3af] uppercase tracking-wider">Last Assessed</th>
                <th className="text-left py-3 px-4 text-xs font-medium text-[#9ca3af] uppercase tracking-wider">Next Review</th>
                <th className="text-left py-3 px-4 text-xs font-medium text-[#9ca3af] uppercase tracking-wider">Status</th>
              </tr>
            </thead>
            <tbody>
              {benchmarkRecords.map((record) => (
                <tr
                  key={record.id}
                  className="border-b border-[#1e2130] hover:bg-[#1a1d2a] cursor-pointer transition-colors"
                  onClick={() => setSelectedRecordId(record.framework)}
                >
                  <td className="py-3 px-4 text-sm text-[#9ca3af]">{record.id}</td>
                  <td className="py-3 px-4 text-sm text-white font-medium">{record.framework}</td>
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-2">
                      <div className="flex-1 h-1.5 bg-[#1e2130] rounded-full w-20">
                        <div
                          className="h-1.5 rounded-full"
                          style={{
                            width: `${record.score}%`,
                            background: record.score >= 80 ? '#00B935' : record.score >= 60 ? '#FFEF3C' : '#ef4444'
                          }}
                        />
                      </div>
                      <span className="text-sm text-white">{record.score}%</span>
                    </div>
                  </td>
                  <td className="py-3 px-4 text-sm text-[#9ca3af]">{record.assessor}</td>
                  <td className="py-3 px-4 text-sm text-[#9ca3af]">{record.lastAssessed}</td>
                  <td className="py-3 px-4 text-sm text-[#9ca3af]">{record.nextReview}</td>
                  <td className="py-3 px-4">
                    <span className={cn("text-xs px-2 py-1 rounded", statusColors[record.status])}>{record.status}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )

      case 'maturity-planning':
        return (
          <table className="w-full">
            <thead>
              <tr className="border-b border-[#1e2130]">
                <th className="text-left py-3 px-4 text-xs font-medium text-[#9ca3af] uppercase tracking-wider">ID</th>
                <th className="text-left py-3 px-4 text-xs font-medium text-[#9ca3af] uppercase tracking-wider">Domain</th>
                <th className="text-left py-3 px-4 text-xs font-medium text-[#9ca3af] uppercase tracking-wider">Current Level</th>
                <th className="text-left py-3 px-4 text-xs font-medium text-[#9ca3af] uppercase tracking-wider">Target Level</th>
                <th className="text-left py-3 px-4 text-xs font-medium text-[#9ca3af] uppercase tracking-wider">Owner</th>
                <th className="text-left py-3 px-4 text-xs font-medium text-[#9ca3af] uppercase tracking-wider">Target Date</th>
                <th className="text-left py-3 px-4 text-xs font-medium text-[#9ca3af] uppercase tracking-wider">Initiatives</th>
                <th className="text-left py-3 px-4 text-xs font-medium text-[#9ca3af] uppercase tracking-wider">Status</th>
              </tr>
            </thead>
            <tbody>
              {maturityRecords.map((record) => (
                <tr
                  key={record.id}
                  className="border-b border-[#1e2130] hover:bg-[#1a1d2a] cursor-pointer transition-colors"
                  onClick={() => setSelectedRecordId(record.domain)}
                >
                  <td className="py-3 px-4 text-sm text-[#9ca3af]">{record.id}</td>
                  <td className="py-3 px-4 text-sm text-white font-medium">{record.domain}</td>
                  <td className="py-3 px-4">
                    <span className={cn("text-sm font-medium", maturityLevelColor(record.currentLevel))}>
                      L{record.currentLevel} – {maturityLevelLabel(record.currentLevel)}
                    </span>
                  </td>
                  <td className="py-3 px-4">
                    <span className={cn("text-sm font-medium", maturityLevelColor(record.targetLevel))}>
                      L{record.targetLevel} – {maturityLevelLabel(record.targetLevel)}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-sm text-[#9ca3af]">{record.owner}</td>
                  <td className="py-3 px-4 text-sm text-[#9ca3af]">{record.targetDate}</td>
                  <td className="py-3 px-4 text-sm text-[#9ca3af]">{record.initiatives}</td>
                  <td className="py-3 px-4">
                    <span className={cn("text-xs px-2 py-1 rounded", statusColors[record.status])}>{record.status}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )

      default:
        return null
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
              onClick={() => setPrivacyTab(tab.id)}
              className={cn(
                "px-4 py-3 text-sm font-medium transition-colors relative",
                privacyTab === tab.id
                  ? "text-[#6CEEAD]"
                  : "text-[#9ca3af] hover:text-white"
              )}
            >
              {tab.label}
              {privacyTab === tab.id && (
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#6CEEAD]" />
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Tab Content */}
      <div className="flex-1 flex overflow-hidden">

        {/* Records Tab */}
        {privacyTab === 'records' && (
          <>
            {/* Secondary Rail */}
            <div className="w-52 border-r border-[#1e2130] bg-[#0f1117] py-4">
              <ul className="space-y-1 px-2">
                {recordItems.map((item) => (
                  <li key={item.id}>
                    <button
                      onClick={() => setPrivacyRecordItem(item.id)}
                      className={cn(
                        "w-full flex items-center gap-2 px-3 py-2 rounded-md text-sm transition-colors",
                        privacyRecordItem === item.id
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
                  {renderRecordsTable()}
                </div>
              </div>
            </div>
          </>
        )}

        {/* Objects Tab */}
        {privacyTab === 'objects' && (
          <div className="flex-1 p-6">
            <h2 className="text-lg font-medium tracking-[-0.01em] text-white mb-2">Objects</h2>
            <p className="text-[#9ca3af] mb-6 text-sm">Reusable building blocks that can be connected across your privacy records.</p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {[
                { label: 'Frameworks', desc: 'GDPR, CCPA, ISO 27701 and more', color: '#0788F7' },
                { label: 'Controls', desc: 'Privacy controls and safeguards', color: '#00B935' },
                { label: 'Templates', desc: 'Reusable assessment templates', color: '#FFEF3C' },
                { label: 'Data Categories', desc: 'Defined personal data categories', color: '#976FE6' },
                { label: 'Legal Bases', desc: 'Approved lawful processing bases', color: '#6CEEAD' },
                { label: 'Retention Schedules', desc: 'Data retention rules by category', color: '#3B40D8' },
              ].map((obj) => (
                <div
                  key={obj.label}
                  className="p-4 bg-[#13151f] border border-[#1e2130] rounded-lg hover:border-[#2a2d3a] transition-colors cursor-pointer"
                >
                  <div className="flex items-center gap-3 mb-2">
                    <div
                      className="w-10 h-10 rounded-lg flex items-center justify-center"
                      style={{ background: `${obj.color}18` }}
                    >
                      <FileText className="w-5 h-5" style={{ color: obj.color }} />
                    </div>
                    <div>
                      <h3 className="text-sm font-medium text-white">{obj.label}</h3>
                      <p className="text-xs text-[#9ca3af]">{obj.desc}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Policies Tab */}
        {privacyTab === 'policies' && (
          <div className="flex-1 p-6">
            <h2 className="text-lg font-medium tracking-[-0.01em] text-white mb-2">Privacy Policies</h2>
            <p className="text-[#9ca3af] mb-6 text-sm">Policy engine enforcing privacy requirements across your records and processes.</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <div className="p-4 bg-[#13151f] border border-[#1e2130] rounded-lg">
                <h3 className="text-sm font-medium text-white mb-2">Active Policies</h3>
                <p className="text-2xl font-semibold text-[#00B935]">18</p>
                <p className="text-xs text-[#9ca3af]">Enforcing guardrails</p>
              </div>
              <div className="p-4 bg-[#13151f] border border-[#1e2130] rounded-lg">
                <h3 className="text-sm font-medium text-white mb-2">Pending Review</h3>
                <p className="text-2xl font-semibold text-[#FFEF3C]">5</p>
                <p className="text-xs text-[#9ca3af]">Awaiting approval</p>
              </div>
            </div>
            <h3 className="text-sm font-medium text-white mb-3">Recent Policies</h3>
            <div className="space-y-2">
              {[
                { name: 'Data Minimisation Policy', status: 'Active' },
                { name: 'Consent Withdrawal Procedure', status: 'Active' },
                { name: 'Cross-Border Transfer Rules', status: 'Active' },
                { name: 'Breach Notification SLA', status: 'Draft' },
                { name: 'Retention & Deletion Schedule', status: 'Active' },
              ].map((policy) => (
                <div
                  key={policy.name}
                  className="p-3 bg-[#13151f] border border-[#1e2130] rounded-lg flex items-center justify-between hover:border-[#2a2d3a] cursor-pointer transition-colors"
                >
                  <span className="text-sm text-white">{policy.name}</span>
                  <span className={cn(
                    "text-xs px-2 py-1 rounded",
                    statusColors[policy.status]
                  )}>
                    {policy.status}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
