"use client"

import { useSubscription, tierLabels } from '@/lib/subscription-context'
import { useNavigation, NavigationView } from '@/lib/navigation-context'
import {
  Home,
  LayoutDashboard,
  CheckSquare,
  Bell,
  Building2,
  ClipboardCheck,
  AlertTriangle,
  Server,
  FileText,
  Settings,
  HelpCircle,
  ChevronLeft,
  ChevronRight,
  Brain,
  Shield,
  Users,
  BarChart3,
  Database,
  Wrench,
} from 'lucide-react'
import { cn } from '@/lib/utils'

interface NavItem {
  id: NavigationView
  label: string
  icon: React.ReactNode
}

// Top navigation items (Home, Dashboard, Tasks, Notifications)
const topItems: NavItem[] = [
  { id: 'home', label: 'Home', icon: <Home className="w-5 h-5" /> },
  { id: 'dashboard', label: 'Dashboard', icon: <LayoutDashboard className="w-5 h-5" /> },
  { id: 'tasks', label: 'Tasks', icon: <CheckSquare className="w-5 h-5" /> },
  { id: 'notifications', label: 'Notifications', icon: <Bell className="w-5 h-5" /> },
]

// Workspace items (Vendors, Assessments, etc.)
const workspaceItems: NavItem[] = [
  { id: 'vendors', label: 'Vendors', icon: <Building2 className="w-5 h-5" /> },
  { id: 'assessments', label: 'Assessments', icon: <ClipboardCheck className="w-5 h-5" /> },
  { id: 'risks', label: 'Risks', icon: <AlertTriangle className="w-5 h-5" /> },
  { id: 'assets', label: 'Assets', icon: <Server className="w-5 h-5" /> },
  { id: 'policies', label: 'Policies', icon: <FileText className="w-5 h-5" /> },
]

const moduleItems: NavItem[] = [
  { id: 'ai-governance', label: 'AI Governance', icon: <Brain className="w-5 h-5" /> },
  { id: 'privacy', label: 'Privacy Management', icon: <Shield className="w-5 h-5" /> },
  { id: 'tprm', label: 'TPRM', icon: <Users className="w-5 h-5" /> },
  { id: 'grc', label: 'GRC', icon: <BarChart3 className="w-5 h-5" /> },
  { id: 'data-discovery', label: 'Data Discovery', icon: <Database className="w-5 h-5" /> },
]

// Setup item (separate section)
const setupItem: NavItem = { id: 'setup', label: 'Setup', icon: <Wrench className="w-5 h-5" /> }

const bottomItems: NavItem[] = [
  { id: 'settings', label: 'Settings', icon: <Settings className="w-5 h-5" /> },
  { id: 'help', label: 'Help & Support', icon: <HelpCircle className="w-5 h-5" /> },
]

interface SidebarProps {
  onSubscriptionClick: () => void
}

export function Sidebar({ onSubscriptionClick }: SidebarProps) {
  const { tier } = useSubscription()
  const { currentView, setCurrentView, sidebarCollapsed, setSidebarCollapsed, setSelectedRecordId } = useNavigation()

  const visibleModules = moduleItems.filter(item => {
    if (tier === 'lite') return false
    if (tier === 'plus') return item.id === 'ai-governance'
    return true // premium shows all
  })

  const handleNavClick = (view: NavigationView) => {
    setCurrentView(view)
    setSelectedRecordId(null)
  }

  return (
    <aside
      className={cn(
        "h-screen flex flex-col border-r border-[#1e2130] bg-[#13151f] transition-all duration-300 ease-in-out",
        sidebarCollapsed ? "w-16" : "w-64"
      )}
    >
      {/* Logo and Brand */}
      <div className="p-4 flex items-center justify-between border-b border-[#1e2130]">
        {!sidebarCollapsed && (
          <img 
            src="/images/ot-logo-lockup-white.png" 
            alt="OneTrust" 
            className="h-6 w-auto"
          />
        )}
        {sidebarCollapsed && (
          <img 
            src="/images/ot-logo-mark-white.png" 
            alt="OneTrust" 
            className="h-6 w-auto mx-auto"
          />
        )}
      </div>

      {/* Subscription Badge */}
      <button
        onClick={onSubscriptionClick}
        className={cn(
          "mx-3 mt-3 py-1.5 px-3 rounded-md bg-[#6CEEAD]/10 border border-[#6CEEAD]/30 text-[#6CEEAD] text-sm font-medium hover:bg-[#6CEEAD]/20 transition-colors",
          sidebarCollapsed && "mx-2 px-2"
        )}
      >
        {sidebarCollapsed ? "+" : tierLabels[tier]}
      </button>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto py-4">
        {/* Top Section - Home, Dashboard, Tasks, Notifications */}
        <ul className="space-y-1 px-2">
          {topItems.map((item) => (
            <li key={item.id}>
              <button
                onClick={() => handleNavClick(item.id)}
                className={cn(
                  "w-full flex items-center gap-3 px-3 py-2 rounded-md text-sm transition-colors",
                  currentView === item.id
                    ? "bg-[#6CEEAD]/10 text-[#6CEEAD]"
                    : "text-[#9ca3af] hover:bg-[#1e2130] hover:text-white",
                  sidebarCollapsed && "justify-center px-2"
                )}
                title={sidebarCollapsed ? item.label : undefined}
              >
                {item.icon}
                {!sidebarCollapsed && <span>{item.label}</span>}
              </button>
            </li>
          ))}
        </ul>

        {/* Divider before Workspace */}
        <div className="my-4 mx-4 border-t border-[#1e2130]" />
        
        {/* Workspace Section - Vendors, Assessments, etc. */}
        {!sidebarCollapsed && (
          <div className="px-4 mb-2 text-xs font-medium text-[#4b5563] uppercase tracking-wider">
            Workspace
          </div>
        )}
        <ul className="space-y-1 px-2">
          {workspaceItems.map((item) => (
            <li key={item.id}>
              <button
                onClick={() => handleNavClick(item.id)}
                className={cn(
                  "w-full flex items-center gap-3 px-3 py-2 rounded-md text-sm transition-colors",
                  currentView === item.id
                    ? "bg-[#6CEEAD]/10 text-[#6CEEAD]"
                    : "text-[#9ca3af] hover:bg-[#1e2130] hover:text-white",
                  sidebarCollapsed && "justify-center px-2"
                )}
                title={sidebarCollapsed ? item.label : undefined}
              >
                {item.icon}
                {!sidebarCollapsed && <span>{item.label}</span>}
              </button>
            </li>
          ))}
        </ul>

        {/* Apps Section - Only if modules available */}
        {visibleModules.length > 0 && (
          <>
            <div className="my-4 mx-4 border-t border-[#1e2130]" />
            {!sidebarCollapsed && (
              <div className="px-4 mb-2 text-xs font-medium text-[#4b5563] uppercase tracking-wider">
                Apps
              </div>
            )}
            <ul className="space-y-1 px-2">
              {visibleModules.map((item) => (
                <li key={item.id}>
                  <button
                    onClick={() => handleNavClick(item.id)}
                    className={cn(
                      "w-full flex items-center gap-3 px-3 py-2 rounded-md text-sm transition-colors",
                      currentView === item.id
                        ? "bg-[#6CEEAD]/10 text-[#6CEEAD]"
                        : "text-[#9ca3af] hover:bg-[#1e2130] hover:text-white",
                      sidebarCollapsed && "justify-center px-2"
                    )}
                    title={sidebarCollapsed ? item.label : undefined}
                  >
                    {item.icon}
                    {!sidebarCollapsed && <span>{item.label}</span>}
                  </button>
                </li>
              ))}
            </ul>
            
            {/* Setup Section - Below Apps */}
            <div className="my-4 mx-4 border-t border-[#1e2130]" />
            {!sidebarCollapsed && (
              <div className="px-4 mb-2 text-xs font-medium text-[#4b5563] uppercase tracking-wider">
                Configuration
              </div>
            )}
            <ul className="space-y-1 px-2">
              <li>
                <button
                  onClick={() => handleNavClick(setupItem.id)}
                  className={cn(
                    "w-full flex items-center gap-3 px-3 py-2 rounded-md text-sm transition-colors",
                    currentView === setupItem.id
                      ? "bg-[#6CEEAD]/10 text-[#6CEEAD]"
                      : "text-[#9ca3af] hover:bg-[#1e2130] hover:text-white",
                    sidebarCollapsed && "justify-center px-2"
                  )}
                  title={sidebarCollapsed ? setupItem.label : undefined}
                >
                  {setupItem.icon}
                  {!sidebarCollapsed && <span>{setupItem.label}</span>}
                </button>
              </li>
            </ul>
          </>
        )}

        {/* Upgrade Card for Lite */}
        {tier === 'lite' && !sidebarCollapsed && (
          <div className="mx-3 mt-4 p-3 rounded-lg bg-[#1e2130] border border-[#2a2d3a]">
            <p className="text-sm font-medium text-white mb-1">Upgrade to OT+</p>
            <p className="text-xs text-[#9ca3af] mb-2">Unlock AI Governance and more modules</p>
            <button 
              onClick={onSubscriptionClick}
              className="w-full py-1.5 px-3 rounded-md bg-[#6CEEAD] text-[#0f1117] text-sm font-medium hover:bg-[#5dd99c] transition-colors"
            >
              Upgrade
            </button>
          </div>
        )}
      </nav>

      {/* Bottom Section */}
      <div className="border-t border-[#1e2130] py-2 px-2">
        <ul className="space-y-1">
          {bottomItems.map((item) => (
            <li key={item.id}>
              <button
                onClick={() => handleNavClick(item.id)}
                className={cn(
                  "w-full flex items-center gap-3 px-3 py-2 rounded-md text-sm transition-colors",
                  currentView === item.id
                    ? "bg-[#6CEEAD]/10 text-[#6CEEAD]"
                    : "text-[#9ca3af] hover:bg-[#1e2130] hover:text-white",
                  sidebarCollapsed && "justify-center px-2"
                )}
                title={sidebarCollapsed ? item.label : undefined}
              >
                {item.icon}
                {!sidebarCollapsed && <span>{item.label}</span>}
              </button>
            </li>
          ))}
        </ul>

        {/* User */}
        <div className={cn(
          "mt-3 p-2 rounded-md hover:bg-[#1e2130] transition-colors cursor-pointer flex items-center gap-3",
          sidebarCollapsed && "justify-center"
        )}>
          <div className="w-8 h-8 rounded-full bg-[#0788F7] flex items-center justify-center text-white text-sm font-medium">
            JR
          </div>
          {!sidebarCollapsed && (
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-white truncate">Jacob Roope</p>
              <p className="text-xs text-[#9ca3af] truncate">Admin</p>
            </div>
          )}
        </div>

        {/* Collapse Toggle */}
        <button
          onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
          className="w-full mt-2 flex items-center justify-center py-2 text-[#9ca3af] hover:text-white transition-colors"
        >
          {sidebarCollapsed ? (
            <ChevronRight className="w-5 h-5" />
          ) : (
            <ChevronLeft className="w-5 h-5" />
          )}
        </button>
      </div>
    </aside>
  )
}
