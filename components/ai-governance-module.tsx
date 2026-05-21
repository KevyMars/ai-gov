"use client"

import { useNavigation, AIGovTab, AIGovInventoryItem } from '@/lib/navigation-context'
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
  Settings
} from 'lucide-react'
import { cn } from '@/lib/utils'

const tabs: { id: AIGovTab; label: string }[] = [
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

export function AIGovernanceModule() {
  const { aiGovTab, setAIGovTab, aiGovInventoryItem, setAIGovInventoryItem, setSelectedRecordId } = useNavigation()

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
