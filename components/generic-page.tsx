"use client"

import { useNavigation, NavigationView } from '@/lib/navigation-context'
import { 
  ClipboardCheck, 
  AlertTriangle, 
  Server, 
  FileText, 
  Shield,
  Users,
  BarChart3,
  Database,
  Settings,
  HelpCircle,
  LayoutDashboard,
  CheckSquare,
  Bell,
  Wrench
} from 'lucide-react'

const pageConfig: Record<string, { title: string; description: string; icon: React.ReactNode }> = {
  dashboard: {
    title: 'Dashboard',
    description: 'Overview of key metrics and insights across your programs',
    icon: <LayoutDashboard className="w-6 h-6" />
  },
  tasks: {
    title: 'Tasks',
    description: 'Manage and track your assigned tasks and action items',
    icon: <CheckSquare className="w-6 h-6" />
  },
  notifications: {
    title: 'Notifications',
    description: 'View alerts and updates from across the platform',
    icon: <Bell className="w-6 h-6" />
  },
  assessments: {
    title: 'Assessments',
    description: 'Track and manage compliance assessments across your organization',
    icon: <ClipboardCheck className="w-6 h-6" />
  },
  risks: {
    title: 'Risks',
    description: 'Enterprise risk register and management',
    icon: <AlertTriangle className="w-6 h-6" />
  },
  assets: {
    title: 'Assets',
    description: 'Inventory of IT assets and data processing systems',
    icon: <Server className="w-6 h-6" />
  },
  policies: {
    title: 'Policies',
    description: 'Manage organizational policies and compliance documentation',
    icon: <FileText className="w-6 h-6" />
  },
  privacy: {
    title: 'Privacy',
    description: 'Data privacy management, DSARs, and consent tracking',
    icon: <Shield className="w-6 h-6" />
  },
  tprm: {
    title: 'Third-Party Risk Management',
    description: 'Vendor assessments, contracts, and relationship management',
    icon: <Users className="w-6 h-6" />
  },
  grc: {
    title: 'Governance, Risk & Compliance',
    description: 'Enterprise GRC program management',
    icon: <BarChart3 className="w-6 h-6" />
  },
  'data-discovery': {
    title: 'Data Discovery',
    description: 'Discover and classify data across your enterprise',
    icon: <Database className="w-6 h-6" />
  },
  setup: {
    title: 'Setup',
    description: 'Configure modules, integrations, and automation rules',
    icon: <Wrench className="w-6 h-6" />
  },
  settings: {
    title: 'Settings',
    description: 'Configure your OneTrust instance',
    icon: <Settings className="w-6 h-6" />
  },
  help: {
    title: 'Help & Support',
    description: 'Get help and access support resources',
    icon: <HelpCircle className="w-6 h-6" />
  }
}

export function GenericPage() {
  const { currentView } = useNavigation()
  const config = pageConfig[currentView as keyof typeof pageConfig]

  if (!config) return null

  return (
    <div className="p-6">
      <div className="max-w-3xl">
        <div className="flex items-center gap-4 mb-6">
          <div className="w-12 h-12 rounded-lg bg-[#1e2130] flex items-center justify-center text-white">
            {config.icon}
          </div>
          <div>
            <h1 className="text-xl font-medium tracking-[-0.01em] text-white">{config.title}</h1>
            <p className="text-sm text-[#9ca3af] leading-[1.2]">{config.description}</p>
          </div>
        </div>

        <div className="p-6 bg-[#13151f] border border-[#1e2130] rounded-lg">
          <p className="text-[#9ca3af] text-center py-8">
            This page demonstrates the unified navigation architecture. 
            <br />
            All inventory objects are accessible globally, not duplicated per module.
          </p>
        </div>
      </div>
    </div>
  )
}
