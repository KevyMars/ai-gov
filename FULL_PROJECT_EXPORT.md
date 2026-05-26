# OneTrust AI Governance Platform - Full Project Export

This document contains the complete source code for the OneTrust AI Governance Platform prototype.

## Project Structure

```
├── app/
│   ├── globals.css
│   ├── layout.tsx
│   └── page.tsx
├── components/
│   ├── ai-governance-module.tsx
│   ├── assessments-module.tsx
│   ├── generic-page.tsx
│   ├── governance-packs.tsx
│   ├── home-dashboard.tsx
│   ├── interactive-world-map.tsx
│   ├── onetrust-logo.tsx
│   ├── privacy-management-module.tsx
│   ├── record-detail-panel.tsx
│   ├── sidebar.tsx
│   ├── subscription-modal.tsx
│   ├── top-bar.tsx
│   └── vendors-page.tsx
├── lib/
│   ├── navigation-context.tsx
│   ├── sample-data.ts
│   ├── subscription-context.tsx
│   └── utils.ts
└── package.json
```

---

## package.json

```json
{
  "name": "my-project",
  "version": "0.1.0",
  "private": true,
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "eslint ."
  },
  "dependencies": {
    "@fontsource/dm-sans": "^5.2.8",
    "@hookform/resolvers": "^3.9.1",
    "@radix-ui/react-accordion": "1.2.12",
    "@radix-ui/react-alert-dialog": "1.1.15",
    "@radix-ui/react-aspect-ratio": "1.1.8",
    "@radix-ui/react-avatar": "1.1.11",
    "@radix-ui/react-checkbox": "1.3.3",
    "@radix-ui/react-collapsible": "1.1.12",
    "@radix-ui/react-context-menu": "2.2.16",
    "@radix-ui/react-dialog": "1.1.15",
    "@radix-ui/react-dropdown-menu": "2.1.16",
    "@radix-ui/react-hover-card": "1.1.15",
    "@radix-ui/react-label": "2.1.8",
    "@radix-ui/react-menubar": "1.1.16",
    "@radix-ui/react-navigation-menu": "1.2.14",
    "@radix-ui/react-popover": "1.1.15",
    "@radix-ui/react-progress": "1.1.8",
    "@radix-ui/react-radio-group": "1.3.8",
    "@radix-ui/react-scroll-area": "1.2.10",
    "@radix-ui/react-select": "2.2.6",
    "@radix-ui/react-separator": "1.1.8",
    "@radix-ui/react-slider": "1.3.6",
    "@radix-ui/react-slot": "1.2.4",
    "@radix-ui/react-switch": "1.2.6",
    "@radix-ui/react-tabs": "1.1.13",
    "@radix-ui/react-toast": "1.2.15",
    "@radix-ui/react-toggle": "1.1.10",
    "@radix-ui/react-toggle-group": "1.1.11",
    "@radix-ui/react-tooltip": "1.2.8",
    "@types/topojson-specification": "^1.0.5",
    "@vercel/analytics": "1.6.1",
    "autoprefixer": "^10.4.20",
    "class-variance-authority": "^0.7.1",
    "clsx": "^2.1.1",
    "cmdk": "1.1.1",
    "date-fns": "4.1.0",
    "embla-carousel-react": "8.6.0",
    "input-otp": "1.4.2",
    "lucide-react": "^0.564.0",
    "next": "16.2.6",
    "next-themes": "^0.4.6",
    "react": "19.2.4",
    "react-day-picker": "9.13.2",
    "react-dom": "19.2.4",
    "react-hook-form": "^7.54.1",
    "react-resizable-panels": "^2.1.7",
    "react-simple-maps": "^3.0.0",
    "recharts": "2.15.0",
    "sonner": "^1.7.1",
    "tailwind-merge": "^3.3.1",
    "vaul": "^1.1.2",
    "zod": "^3.24.1"
  },
  "devDependencies": {
    "@tailwindcss/postcss": "^4.2.0",
    "@types/node": "^22",
    "@types/react": "19.2.14",
    "@types/react-dom": "19.2.3",
    "postcss": "^8.5",
    "tailwindcss": "^4.2.0",
    "tw-animate-css": "1.3.3",
    "typescript": "5.7.3"
  }
}
```

---

## app/globals.css

```css
@import 'tailwindcss';
@import 'tw-animate-css';

@custom-variant dark (&:is(.dark *));

:root {
  /* OneTrust Brand Colors - Primary Palette */
  /* Black and White carry the majority of the system */
  /* Mint is used sparingly as a purposeful accent */
  --ot-black: #000000;
  --ot-white: #FFFFFF;
  --ot-mint: #6CEEAD; /* RGB: 108, 238, 173 - Primary brand accent */
  
  /* OneTrust Secondary Palette */
  --ot-yellow: #FFEF3C;
  --ot-leaf: #00B935;
  --ot-jade: #008665; /* For accessibility when Mint lacks contrast */
  --ot-sky: #0788F7;
  --ot-indigo: #3B40D8;
  --ot-purple: #976FE6;
  --ot-beige: #D9D9CC;
  
  /* Application Design Tokens */
  --background: #0f1117;
  --foreground: #e5e7eb;
  --card: #13151f;
  --card-foreground: #e5e7eb;
  --popover: #13151f;
  --popover-foreground: #e5e7eb;
  --primary: #6CEEAD;
  --primary-foreground: #000000;
  --secondary: #1e2130;
  --secondary-foreground: #e5e7eb;
  --muted: #1e2130;
  --muted-foreground: #9ca3af;
  --accent: #6CEEAD;
  --accent-foreground: #000000;
  --destructive: #ef4444;
  --destructive-foreground: #fef2f2;
  --border: #1e2130;
  --input: #1e2130;
  --ring: #6CEEAD;
  
  /* Data Visualization - OneTrust Chart Colors */
  --chart-1: #6CEEAD; /* Mint */
  --chart-2: #0788F7; /* Sky */
  --chart-3: #FFEF3C; /* Yellow */
  --chart-4: #00B935; /* Leaf */
  --chart-5: #976FE6; /* Purple */
  --chart-6: #3B40D8; /* Indigo */
  --chart-7: #008665; /* Jade */
  --chart-8: #D9D9CC; /* Beige */
  
  --radius: 0.5rem;
  
  /* Sidebar tokens */
  --sidebar: #13151f;
  --sidebar-foreground: #e5e7eb;
  --sidebar-primary: #6CEEAD;
  --sidebar-primary-foreground: #000000;
  --sidebar-accent: #1e2130;
  --sidebar-accent-foreground: #e5e7eb;
  --sidebar-border: #1e2130;
  --sidebar-ring: #6CEEAD;
  
  /* Surface tokens */
  --surface: #13151f;
  --surface-hover: #1a1d2a;
  --surface-elevated: #1e2130;
  
  /* Status colors */
  --status-success: #00B935;
  --status-warning: #FFEF3C;
  --status-error: #ef4444;
  --status-info: #0788F7;
}

@theme inline {
  --font-sans: 'DM Sans', 'Geist', system-ui, sans-serif;
  --font-mono: 'Geist Mono', monospace;
  --color-background: var(--background);
  --color-foreground: var(--foreground);
  --color-card: var(--card);
  --color-card-foreground: var(--card-foreground);
  --color-popover: var(--popover);
  --color-popover-foreground: var(--popover-foreground);
  --color-primary: var(--primary);
  --color-primary-foreground: var(--primary-foreground);
  --color-secondary: var(--secondary);
  --color-secondary-foreground: var(--secondary-foreground);
  --color-muted: var(--muted);
  --color-muted-foreground: var(--muted-foreground);
  --color-accent: var(--accent);
  --color-accent-foreground: var(--accent-foreground);
  --color-destructive: var(--destructive);
  --color-destructive-foreground: var(--destructive-foreground);
  --color-border: var(--border);
  --color-input: var(--input);
  --color-ring: var(--ring);
  --color-chart-1: var(--chart-1);
  --color-chart-2: var(--chart-2);
  --color-chart-3: var(--chart-3);
  --color-chart-4: var(--chart-4);
  --color-chart-5: var(--chart-5);
  --radius-sm: calc(var(--radius) - 4px);
  --radius-md: calc(var(--radius) - 2px);
  --radius-lg: var(--radius);
  --radius-xl: calc(var(--radius) + 4px);
  --color-sidebar: var(--sidebar);
  --color-sidebar-foreground: var(--sidebar-foreground);
  --color-sidebar-primary: var(--sidebar-primary);
  --color-sidebar-primary-foreground: var(--sidebar-primary-foreground);
  --color-sidebar-accent: var(--sidebar-accent);
  --color-sidebar-accent-foreground: var(--sidebar-accent-foreground);
  --color-sidebar-border: var(--sidebar-border);
  --color-sidebar-ring: var(--sidebar-ring);
}

@layer base {
  * {
    @apply border-border outline-ring/50;
  }
  body {
    @apply bg-background text-foreground;
  }
  
  /* OneTrust Typography Guidelines - Antique Legacy typeface specs */
  /* H1: Medium weight, 90% line-height, -3% letter-spacing */
  h1, .h1 {
    @apply text-3xl font-medium leading-[0.9] tracking-[-0.03em];
  }
  
  /* H2: Light weight, 90% line-height, -3% letter-spacing */
  h2, .h2 {
    @apply text-2xl font-light leading-[0.9] tracking-[-0.03em];
  }
  
  /* H3: Regular/Light weight, 110% line-height, -1% letter-spacing */
  h3, .h3 {
    @apply text-xl font-normal leading-[1.1] tracking-[-0.01em];
  }
  
  /* Body: Regular weight, 120% line-height, 0% letter-spacing */
  p, .body {
    @apply text-base font-normal leading-[1.2];
  }
  
  /* Stats/Large numbers: Book weight, 100% line-height, -1% letter-spacing */
  .stat {
    @apply text-5xl font-normal leading-none tracking-[-0.01em];
  }
}

/* Custom scrollbar for dark theme */
::-webkit-scrollbar {
  width: 8px;
  height: 8px;
}

::-webkit-scrollbar-track {
  background: #0f1117;
}

::-webkit-scrollbar-thumb {
  background: #1e2130;
  border-radius: 4px;
}

::-webkit-scrollbar-thumb:hover {
  background: #2a2d3a;
}

/* OneTrust brand-specific utilities */
.text-balance {
  text-wrap: balance;
}

.text-pretty {
  text-wrap: pretty;
}

/* Mint accent - use sparingly for key actions and emphasis */
.accent-mint {
  color: var(--ot-mint);
}

.bg-accent-mint {
  background-color: var(--ot-mint);
}

/* Jade for accessibility - when Mint lacks contrast */
.accent-jade {
  color: var(--ot-jade);
}

.bg-accent-jade {
  background-color: var(--ot-jade);
}
```

---

## app/layout.tsx

```tsx
import type { Metadata } from 'next'
import { DM_Sans, Geist_Mono } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'

const dmSans = DM_Sans({ 
  subsets: ["latin"],
  variable: '--font-dm-sans'
})

const geistMono = Geist_Mono({ 
  subsets: ["latin"],
  variable: '--font-geist-mono'
})

export const metadata: Metadata = {
  title: 'OneTrust - AI Governance Platform',
  description: 'Enterprise GRC and AI Governance Platform',
  generator: 'v0.app',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="bg-[#0f1117]">
      <body className={`${dmSans.variable} ${geistMono.variable} font-sans antialiased bg-[#0f1117] text-[#e5e7eb]`}>
        {children}
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
```

---

## app/page.tsx

```tsx
"use client"

import { useState } from 'react'
import { SubscriptionProvider, useSubscription } from '@/lib/subscription-context'
import { NavigationProvider, useNavigation } from '@/lib/navigation-context'
import { Sidebar } from '@/components/sidebar'
import { TopBar } from '@/components/top-bar'
import { SubscriptionModal } from '@/components/subscription-modal'
import { HomeDashboard } from '@/components/home-dashboard'
import { AIGovernanceModule } from '@/components/ai-governance-module'
import { PrivacyManagementModule } from '@/components/privacy-management-module'
import { AssessmentsModule } from '@/components/assessments-module'
import { RecordDetailPanel } from '@/components/record-detail-panel'
import { VendorsPage } from '@/components/vendors-page'
import { GenericPage } from '@/components/generic-page'
import { Eye } from 'lucide-react'

function AppContent() {
  const [showSubscriptionModal, setShowSubscriptionModal] = useState(false)
  const { collaboratorView } = useSubscription()
  const { currentView, selectedRecordId } = useNavigation()

  const renderContent = () => {
    switch (currentView) {
      case 'home':
        return <HomeDashboard />
      case 'dashboard':
      case 'tasks':
      case 'notifications':
      case 'setup':
        return <GenericPage />
      case 'ai-governance':
        return <AIGovernanceModule />
      case 'privacy':
        return <PrivacyManagementModule />
      case 'assessments':
        return <AssessmentsModule />
      case 'vendors':
        return <VendorsPage />
      default:
        return <GenericPage />
    }
  }

  return (
    <div className="flex h-screen bg-[#0f1117]">
      <Sidebar onSubscriptionClick={() => setShowSubscriptionModal(true)} />
      
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Collaborator View Banner */}
        {collaboratorView && (
          <div className="bg-[#FFEF3C]/10 border-b border-[#FFEF3C]/30 px-4 py-2 flex items-center gap-2">
            <Eye className="w-4 h-4 text-[#FFEF3C]" />
            <p className="text-sm text-[#FFEF3C]">
              Collaborator View - ABAC restricted. Some tabs and fields are hidden.
            </p>
          </div>
        )}
        
        <TopBar onSubscriptionClick={() => setShowSubscriptionModal(true)} />
        
        <main className="flex-1 overflow-auto">
          {renderContent()}
        </main>
      </div>

      {/* Detail Panel */}
      {selectedRecordId && <RecordDetailPanel />}

      {/* Subscription Modal */}
      <SubscriptionModal 
        isOpen={showSubscriptionModal} 
        onClose={() => setShowSubscriptionModal(false)} 
      />
    </div>
  )
}

export default function OneTrustApp() {
  return (
    <SubscriptionProvider>
      <NavigationProvider>
        <AppContent />
      </NavigationProvider>
    </SubscriptionProvider>
  )
}
```

---

## lib/utils.ts

```ts
import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
```

---

## lib/navigation-context.tsx

```tsx
"use client"

import { createContext, useContext, useState, ReactNode } from 'react'

export type NavigationView = 
  | 'home' 
  | 'dashboard'
  | 'tasks'
  | 'notifications'
  | 'vendors' 
  | 'assessments' 
  | 'risks' 
  | 'assets' 
  | 'policies'
  | 'ai-governance'
  | 'privacy'
  | 'tprm'
  | 'grc'
  | 'data-discovery'
  | 'setup'
  | 'settings'
  | 'help'

export type AIGovTab = 'overview' | 'acceptable-use' | 'governance-packs' | 'inventory' | 'objects' | 'ai-policies'
export type AIGovInventoryItem = 'projects' | 'ai-systems' | 'models' | 'ai-agents' | 'datasets' | 'vendors'
export type AIGovAcceptableUseItem = 'accepted-inventory' | 'accepted-use-policies'

export type PrivacyTab = 'overview' | 'records' | 'objects' | 'policies'
export type PrivacyRecordItem = 'pia-dpia' | 'incidents' | 'privacy-rights' | 'data-mapping' | 'privacy-notices' | 'benchmarking' | 'maturity-planning'

export interface NavigationContextType {
  currentView: NavigationView
  setCurrentView: (view: NavigationView) => void
  aiGovTab: AIGovTab
  setAIGovTab: (tab: AIGovTab) => void
  aiGovInventoryItem: AIGovInventoryItem
  setAIGovInventoryItem: (item: AIGovInventoryItem) => void
  aiGovAcceptableUseItem: AIGovAcceptableUseItem
  setAIGovAcceptableUseItem: (item: AIGovAcceptableUseItem) => void
  privacyTab: PrivacyTab
  setPrivacyTab: (tab: PrivacyTab) => void
  privacyRecordItem: PrivacyRecordItem
  setPrivacyRecordItem: (item: PrivacyRecordItem) => void
  selectedRecordId: string | null
  setSelectedRecordId: (id: string | null) => void
  sidebarCollapsed: boolean
  setSidebarCollapsed: (collapsed: boolean) => void
}

const NavigationContext = createContext<NavigationContextType | undefined>(undefined)

export function NavigationProvider({ children }: { children: ReactNode }) {
  const [currentView, setCurrentView] = useState<NavigationView>('home')
  const [aiGovTab, setAIGovTab] = useState<AIGovTab>('overview')
  const [aiGovInventoryItem, setAIGovInventoryItem] = useState<AIGovInventoryItem>('ai-systems')
  const [aiGovAcceptableUseItem, setAIGovAcceptableUseItem] = useState<AIGovAcceptableUseItem>('accepted-inventory')
  const [privacyTab, setPrivacyTab] = useState<PrivacyTab>('overview')
  const [privacyRecordItem, setPrivacyRecordItem] = useState<PrivacyRecordItem>('pia-dpia')
  const [selectedRecordId, setSelectedRecordId] = useState<string | null>(null)
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)

  return (
    <NavigationContext.Provider value={{
      currentView,
      setCurrentView,
      aiGovTab,
      setAIGovTab,
      aiGovInventoryItem,
      setAIGovInventoryItem,
      aiGovAcceptableUseItem,
      setAIGovAcceptableUseItem,
      privacyTab,
      setPrivacyTab,
      privacyRecordItem,
      setPrivacyRecordItem,
      selectedRecordId,
      setSelectedRecordId,
      sidebarCollapsed,
      setSidebarCollapsed
    }}>
      {children}
    </NavigationContext.Provider>
  )
}

export function useNavigation() {
  const context = useContext(NavigationContext)
  if (!context) {
    throw new Error('useNavigation must be used within a NavigationProvider')
  }
  return context
}
```

---

## lib/subscription-context.tsx

```tsx
"use client"

import { createContext, useContext, useState, ReactNode } from 'react'

export type SubscriptionTier = 'lite' | 'plus' | 'premium'

export interface SubscriptionContextType {
  tier: SubscriptionTier
  setTier: (tier: SubscriptionTier) => void
  collaboratorView: boolean
  setCollaboratorView: (enabled: boolean) => void
}

const SubscriptionContext = createContext<SubscriptionContextType | undefined>(undefined)

export function SubscriptionProvider({ children }: { children: ReactNode }) {
  const [tier, setTier] = useState<SubscriptionTier>('plus')
  const [collaboratorView, setCollaboratorView] = useState(false)

  return (
    <SubscriptionContext.Provider value={{ tier, setTier, collaboratorView, setCollaboratorView }}>
      {children}
    </SubscriptionContext.Provider>
  )
}

export function useSubscription() {
  const context = useContext(SubscriptionContext)
  if (!context) {
    throw new Error('useSubscription must be used within a SubscriptionProvider')
  }
  return context
}

export const tierLabels: Record<SubscriptionTier, string> = {
  lite: 'OT Lite',
  plus: 'OT Plus',
  premium: 'OT Premium'
}

export const tierDescriptions: Record<SubscriptionTier, string> = {
  lite: 'Unlimited users with access to all universal inventory objects',
  plus: 'Everything in Lite plus AI Governance module',
  premium: 'Full access to all modules and features'
}
```

---

## lib/sample-data.ts

```ts
// Sample data for AI Governance module

export interface AISystem {
  id: string
  name: string
  framework: string
  owner: string
  stage: 'In Use' | 'New' | 'In Review' | 'Active'
  riskScore: 'Low' | 'Medium' | 'High'
}

export const aiSystems: AISystem[] = [
  { id: 'AIS-001', name: 'GPT-4 Integration', framework: 'ISO 42001:2023', owner: 'Sarah Chen', stage: 'In Use', riskScore: 'Medium' },
  { id: 'AIS-002', name: 'Document Classifier', framework: 'AICPA/CICA', owner: 'Mark Rivera', stage: 'New', riskScore: 'Low' },
  { id: 'AIS-003', name: 'Risk Scoring Engine', framework: 'ISO 42001:2023', owner: 'Sarah Chen', stage: 'In Use', riskScore: 'High' },
  { id: 'AIS-004', name: 'Customer Chatbot', framework: 'NIST AI RMF', owner: 'Priya Nair', stage: 'In Review', riskScore: 'Medium' },
  { id: 'AIS-005', name: 'Fraud Detection', framework: 'ISO 42001:2023', owner: 'Mark Rivera', stage: 'Active', riskScore: 'High' },
  { id: 'AIS-006', name: 'HR Screening AI', framework: 'EU AI Act', owner: 'Tom Walsh', stage: 'New', riskScore: 'High' },
]

export interface AIModel {
  id: string
  name: string
  vendor: string
  type: string
  version: string
  status: 'Active' | 'Deprecated' | 'Testing'
}

export const aiModels: AIModel[] = [
  { id: 'MOD-001', name: 'GPT-4-turbo', vendor: 'OpenAI', type: 'LLM', version: '4.0', status: 'Active' },
  { id: 'MOD-002', name: 'Claude 3 Sonnet', vendor: 'Anthropic', type: 'LLM', version: '3.0', status: 'Active' },
  { id: 'MOD-003', name: 'Llama 3', vendor: 'Meta', type: 'LLM', version: '3.0', status: 'Testing' },
  { id: 'MOD-004', name: 'Bert-base', vendor: 'Google', type: 'NLP', version: '1.1', status: 'Deprecated' },
]

export interface AIAgent {
  id: string
  name: string
  connectedSystem: string
  owner: string
  status: 'Active' | 'Inactive' | 'Paused'
}

export const aiAgents: AIAgent[] = [
  { id: 'AGT-001', name: 'Document Review Agent', connectedSystem: 'GPT-4 Integration', owner: 'Sarah Chen', status: 'Active' },
  { id: 'AGT-002', name: 'Risk Assessment Agent', connectedSystem: 'Risk Scoring Engine', owner: 'Mark Rivera', status: 'Active' },
  { id: 'AGT-003', name: 'Compliance Monitor', connectedSystem: 'Customer Chatbot', owner: 'Priya Nair', status: 'Paused' },
]

export interface Dataset {
  id: string
  name: string
  type: string
  size: string
  classification: 'Public' | 'Internal' | 'Confidential' | 'Restricted'
}

export const datasets: Dataset[] = [
  { id: 'DS-001', name: 'Customer Interactions', type: 'Structured', size: '2.4 TB', classification: 'Confidential' },
  { id: 'DS-002', name: 'Product Catalog', type: 'Structured', size: '156 GB', classification: 'Internal' },
  { id: 'DS-003', name: 'Training Documents', type: 'Unstructured', size: '890 GB', classification: 'Internal' },
  { id: 'DS-004', name: 'User Feedback', type: 'Mixed', size: '45 GB', classification: 'Confidential' },
]

export interface Project {
  id: string
  name: string
  status: 'Active' | 'Completed' | 'On Hold'
  owner: string
  dueDate: string
}

export const projects: Project[] = [
  { id: 'PRJ-001', name: 'AI Risk Framework Implementation', status: 'Active', owner: 'Sarah Chen', dueDate: 'Jun 30, 2026' },
  { id: 'PRJ-002', name: 'EU AI Act Compliance', status: 'Active', owner: 'Mark Rivera', dueDate: 'Aug 15, 2026' },
  { id: 'PRJ-003', name: 'Model Inventory Audit', status: 'Completed', owner: 'Priya Nair', dueDate: 'Apr 20, 2026' },
]

export interface Vendor {
  id: string
  name: string
  category: string
  riskTier: 'Critical' | 'High' | 'Medium' | 'Low'
  status: 'Active' | 'Under Review' | 'Inactive'
  lastAssessment: string
}

export const vendors: Vendor[] = [
  { id: 'VND-001', name: 'OpenAI', category: 'AI Provider', riskTier: 'Critical', status: 'Active', lastAssessment: 'Mar 15, 2026' },
  { id: 'VND-002', name: 'Anthropic', category: 'AI Provider', riskTier: 'High', status: 'Active', lastAssessment: 'Feb 28, 2026' },
  { id: 'VND-003', name: 'AWS', category: 'Cloud Infrastructure', riskTier: 'Critical', status: 'Active', lastAssessment: 'Apr 10, 2026' },
  { id: 'VND-004', name: 'Snowflake', category: 'Data Platform', riskTier: 'High', status: 'Under Review', lastAssessment: 'Jan 20, 2026' },
  { id: 'VND-005', name: 'DataDog', category: 'Monitoring', riskTier: 'Medium', status: 'Active', lastAssessment: 'Mar 05, 2026' },
]

// Detail data for AI System
export interface AISystemDetail extends AISystem {
  description: string
  department: string
  businessUnit: string
  deploymentDate: string
  lastReview: string
  dataTypes: string[]
  relatedVendors: string[]
  relatedModels: string[]
  relatedAgents: string[]
}

export const aiSystemDetails: Record<string, AISystemDetail> = {
  'AIS-001': {
    id: 'AIS-001',
    name: 'GPT-4 Integration',
    framework: 'ISO 42001:2023',
    owner: 'Sarah Chen',
    stage: 'In Use',
    riskScore: 'Medium',
    description: 'Enterprise GPT-4 integration for document analysis and content generation across multiple business units.',
    department: 'Engineering',
    businessUnit: 'Product Development',
    deploymentDate: 'Jan 15, 2026',
    lastReview: 'Apr 02, 2026',
    dataTypes: ['Customer Data', 'Internal Documents', 'Product Information'],
    relatedVendors: ['OpenAI', 'AWS'],
    relatedModels: ['GPT-4-turbo'],
    relatedAgents: ['Document Review Agent']
  },
  'AIS-003': {
    id: 'AIS-003',
    name: 'Risk Scoring Engine',
    framework: 'ISO 42001:2023',
    owner: 'Sarah Chen',
    stage: 'In Use',
    riskScore: 'High',
    description: 'Automated risk scoring system for evaluating vendor and third-party risks using ML models.',
    department: 'Risk Management',
    businessUnit: 'Compliance',
    deploymentDate: 'Nov 10, 2025',
    lastReview: 'Mar 28, 2026',
    dataTypes: ['Vendor Data', 'Financial Records', 'Compliance Data'],
    relatedVendors: ['AWS', 'Snowflake'],
    relatedModels: ['Bert-base'],
    relatedAgents: ['Risk Assessment Agent']
  }
}

// ─── Privacy Management Sample Data ───────────────────────────────────────────

export interface PiaRecord {
  id: string
  name: string
  type: 'PIA' | 'DPIA'
  status: 'Draft' | 'In Review' | 'Approved' | 'Overdue'
  owner: string
  department: string
  dueDate: string
  riskLevel: 'Low' | 'Medium' | 'High'
}

export const piaRecords: PiaRecord[] = [
  { id: 'PIA-001', name: 'Customer Analytics Platform', type: 'DPIA', status: 'In Review', owner: 'Sarah Chen', department: 'Engineering', dueDate: 'Jun 15, 2026', riskLevel: 'High' },
  { id: 'PIA-002', name: 'HR Onboarding System', type: 'PIA', status: 'Approved', owner: 'Tom Walsh', department: 'HR', dueDate: 'Apr 30, 2026', riskLevel: 'Medium' },
  { id: 'PIA-003', name: 'Marketing Personalisation Engine', type: 'DPIA', status: 'Draft', owner: 'Priya Nair', department: 'Marketing', dueDate: 'Jul 20, 2026', riskLevel: 'High' },
  { id: 'PIA-004', name: 'Vendor Portal Upgrade', type: 'PIA', status: 'Overdue', owner: 'Mark Rivera', department: 'Procurement', dueDate: 'May 01, 2026', riskLevel: 'Low' },
  { id: 'PIA-005', name: 'Mobile App v3.0 Launch', type: 'DPIA', status: 'In Review', owner: 'Sarah Chen', department: 'Product', dueDate: 'Jun 30, 2026', riskLevel: 'Medium' },
]

export interface IncidentRecord {
  id: string
  title: string
  type: 'Data Breach' | 'Unauthorised Access' | 'Data Loss' | 'Policy Violation'
  severity: 'Critical' | 'High' | 'Medium' | 'Low'
  status: 'Open' | 'Under Investigation' | 'Resolved' | 'Reported to Authority'
  reportedBy: string
  reportedDate: string
  affectedRecords: string
}

export const incidentRecords: IncidentRecord[] = [
  { id: 'INC-001', title: 'Misconfigured S3 bucket exposed customer data', type: 'Data Breach', severity: 'Critical', status: 'Reported to Authority', reportedBy: 'Sarah Chen', reportedDate: 'Apr 12, 2026', affectedRecords: '14,200' },
  { id: 'INC-002', title: 'Phishing attack on HR team credentials', type: 'Unauthorised Access', severity: 'High', status: 'Resolved', reportedBy: 'Tom Walsh', reportedDate: 'Mar 28, 2026', affectedRecords: '320' },
  { id: 'INC-003', title: 'Laptop with unencrypted data lost', type: 'Data Loss', severity: 'Medium', status: 'Under Investigation', reportedBy: 'Mark Rivera', reportedDate: 'May 10, 2026', affectedRecords: '450' },
  { id: 'INC-004', title: 'Vendor sent data to wrong recipient', type: 'Policy Violation', severity: 'Low', status: 'Resolved', reportedBy: 'Priya Nair', reportedDate: 'May 02, 2026', affectedRecords: '12' },
]

export interface PrivacyRightRequest {
  id: string
  type: 'Access' | 'Erasure' | 'Portability' | 'Rectification' | 'Objection'
  subject: string
  status: 'New' | 'In Progress' | 'Completed' | 'Overdue' | 'Rejected'
  assignedTo: string
  receivedDate: string
  dueDate: string
  channel: 'Web Form' | 'Email' | 'Phone' | 'In Person'
}

export const privacyRightRequests: PrivacyRightRequest[] = [
  { id: 'PRR-001', type: 'Access', subject: 'J. Smith', status: 'In Progress', assignedTo: 'Sarah Chen', receivedDate: 'May 08, 2026', dueDate: 'Jun 07, 2026', channel: 'Web Form' },
  { id: 'PRR-002', type: 'Erasure', subject: 'A. Patel', status: 'Completed', assignedTo: 'Tom Walsh', receivedDate: 'Apr 20, 2026', dueDate: 'May 20, 2026', channel: 'Email' },
  { id: 'PRR-003', type: 'Portability', subject: 'M. Johnson', status: 'New', assignedTo: 'Priya Nair', receivedDate: 'May 15, 2026', dueDate: 'Jun 14, 2026', channel: 'Web Form' },
  { id: 'PRR-004', type: 'Rectification', subject: 'L. Garcia', status: 'Overdue', assignedTo: 'Mark Rivera', receivedDate: 'Apr 01, 2026', dueDate: 'May 01, 2026', channel: 'Phone' },
  { id: 'PRR-005', type: 'Objection', subject: 'R. Kim', status: 'In Progress', assignedTo: 'Sarah Chen', receivedDate: 'May 12, 2026', dueDate: 'Jun 11, 2026', channel: 'Web Form' },
]

export interface DataMappingRecord {
  id: string
  process: string
  category: string
  legalBasis: 'Consent' | 'Legitimate Interest' | 'Contract' | 'Legal Obligation' | 'Vital Interest'
  dataTypes: string
  recipients: string
  retention: string
  crossBorder: boolean
}

export const dataMappingRecords: DataMappingRecord[] = [
  { id: 'DM-001', process: 'Customer Account Management', category: 'Customer Data', legalBasis: 'Contract', dataTypes: 'Name, Email, Address', recipients: 'CRM, Support Tools', retention: '7 years', crossBorder: true },
  { id: 'DM-002', process: 'Marketing Email Campaigns', category: 'Marketing', legalBasis: 'Consent', dataTypes: 'Email, Preferences', recipients: 'Email Platform', retention: '2 years', crossBorder: true },
  { id: 'DM-003', process: 'Employee Payroll Processing', category: 'HR Data', legalBasis: 'Legal Obligation', dataTypes: 'Name, Salary, Bank Details', recipients: 'Payroll Provider', retention: '10 years', crossBorder: false },
  { id: 'DM-004', process: 'Website Analytics', category: 'Usage Data', legalBasis: 'Legitimate Interest', dataTypes: 'IP Address, Cookies', recipients: 'Analytics Platform', retention: '13 months', crossBorder: true },
  { id: 'DM-005', process: 'Customer Support Tickets', category: 'Customer Data', legalBasis: 'Contract', dataTypes: 'Name, Email, Issue Details', recipients: 'Helpdesk Tool', retention: '3 years', crossBorder: false },
]

export interface PrivacyNotice {
  id: string
  name: string
  type: 'Privacy Policy' | 'Cookie Notice' | 'Employee Notice' | 'Consent Form'
  status: 'Published' | 'Draft' | 'Under Review' | 'Archived'
  version: string
  owner: string
  lastUpdated: string
  languages: number
}

export const privacyNotices: PrivacyNotice[] = [
  { id: 'PN-001', name: 'Global Privacy Policy', type: 'Privacy Policy', status: 'Published', version: '3.2', owner: 'Sarah Chen', lastUpdated: 'Mar 01, 2026', languages: 12 },
  { id: 'PN-002', name: 'Cookie Consent Notice', type: 'Cookie Notice', status: 'Published', version: '2.0', owner: 'Priya Nair', lastUpdated: 'Jan 15, 2026', languages: 8 },
  { id: 'PN-003', name: 'Employee Privacy Notice', type: 'Employee Notice', status: 'Under Review', version: '1.4', owner: 'Tom Walsh', lastUpdated: 'Apr 22, 2026', languages: 5 },
  { id: 'PN-004', name: 'Marketing Consent Form', type: 'Consent Form', status: 'Draft', version: '0.9', owner: 'Mark Rivera', lastUpdated: 'May 10, 2026', languages: 3 },
]

export interface BenchmarkRecord {
  id: string
  framework: string
  score: number
  maxScore: number
  status: 'Compliant' | 'Partially Compliant' | 'Non-Compliant'
  lastAssessed: string
  assessor: string
  nextReview: string
}

export const benchmarkRecords: BenchmarkRecord[] = [
  { id: 'BM-001', framework: 'GDPR', score: 87, maxScore: 100, status: 'Compliant', lastAssessed: 'Apr 01, 2026', assessor: 'Sarah Chen', nextReview: 'Oct 01, 2026' },
  { id: 'BM-002', framework: 'CCPA / CPRA', score: 74, maxScore: 100, status: 'Partially Compliant', lastAssessed: 'Mar 15, 2026', assessor: 'Mark Rivera', nextReview: 'Sep 15, 2026' },
  { id: 'BM-003', framework: 'ISO 27701', score: 91, maxScore: 100, status: 'Compliant', lastAssessed: 'Feb 20, 2026', assessor: 'Priya Nair', nextReview: 'Aug 20, 2026' },
  { id: 'BM-004', framework: 'LGPD (Brazil)', score: 58, maxScore: 100, status: 'Non-Compliant', lastAssessed: 'Apr 10, 2026', assessor: 'Tom Walsh', nextReview: 'Jul 10, 2026' },
]

export interface MaturityRecord {
  id: string
  domain: string
  currentLevel: 1 | 2 | 3 | 4 | 5
  targetLevel: 1 | 2 | 3 | 4 | 5
  status: 'On Track' | 'At Risk' | 'Behind' | 'Achieved'
  owner: string
  targetDate: string
  initiatives: number
}

export const maturityRecords: MaturityRecord[] = [
  { id: 'MT-001', domain: 'Data Governance', currentLevel: 3, targetLevel: 4, status: 'On Track', owner: 'Sarah Chen', targetDate: 'Dec 31, 2026', initiatives: 4 },
  { id: 'MT-002', domain: 'Consent Management', currentLevel: 2, targetLevel: 4, status: 'At Risk', owner: 'Priya Nair', targetDate: 'Sep 30, 2026', initiatives: 6 },
  { id: 'MT-003', domain: 'Incident Response', currentLevel: 4, targetLevel: 5, status: 'On Track', owner: 'Tom Walsh', targetDate: 'Mar 31, 2027', initiatives: 2 },
  { id: 'MT-004', domain: 'Privacy by Design', currentLevel: 2, targetLevel: 3, status: 'Behind', owner: 'Mark Rivera', targetDate: 'Jun 30, 2026', initiatives: 5 },
  { id: 'MT-005', domain: 'Third-Party Risk', currentLevel: 3, targetLevel: 4, status: 'Achieved', owner: 'Sarah Chen', targetDate: 'Apr 30, 2026', initiatives: 3 },
]

// ─── Assessments Module ────────────────────────────────────────────────────────

export type AssessmentTier = 'lite' | 'plus' | 'premium'

export interface AssessmentType {
  id: string
  name: string
  description: string
  category: string
  tier: AssessmentTier        // minimum tier required to access
  module: string              // which module this belongs to
  estimatedTime: string       // e.g. "30 min", "2 hrs"
  questionCount: number
}

export const assessmentTypes: AssessmentType[] = [
  // ── OT Lite ──────────────────────────────────────────────────────────────────
  {
    id: 'AT-001',
    name: 'Vendor Risk Assessment',
    description: 'Evaluate a vendor\'s security posture, data handling practices, and contractual obligations.',
    category: 'Third-Party Risk',
    tier: 'lite',
    module: 'Workspace',
    estimatedTime: '45 min',
    questionCount: 32,
  },
  {
    id: 'AT-002',
    name: 'Security Questionnaire',
    description: 'Assess a vendor or internal system against baseline security controls and best practices.',
    category: 'Security',
    tier: 'lite',
    module: 'Workspace',
    estimatedTime: '30 min',
    questionCount: 24,
  },
  {
    id: 'AT-003',
    name: 'Business Impact Analysis',
    description: 'Identify critical business processes and assess the impact of potential disruptions.',
    category: 'Operational Risk',
    tier: 'lite',
    module: 'Workspace',
    estimatedTime: '1 hr',
    questionCount: 28,
  },
  {
    id: 'AT-004',
    name: 'Internal Compliance Audit',
    description: 'Review internal controls and processes against applicable policies and standards.',
    category: 'Compliance',
    tier: 'lite',
    module: 'Workspace',
    estimatedTime: '2 hrs',
    questionCount: 48,
  },
  // ── OT Plus — Privacy Management & AI Governance ─────────────────────────────
  {
    id: 'AT-005',
    name: 'Data Protection Impact Assessment (DPIA)',
    description: 'Systematically analyse and identify privacy risks for high-risk processing activities as required under GDPR Article 35.',
    category: 'Privacy',
    tier: 'plus',
    module: 'Privacy Management',
    estimatedTime: '2–3 hrs',
    questionCount: 64,
  },
  {
    id: 'AT-006',
    name: 'Privacy Impact Assessment (PIA)',
    description: 'Evaluate the privacy implications of a new project, system, or process before launch.',
    category: 'Privacy',
    tier: 'plus',
    module: 'Privacy Management',
    estimatedTime: '1–2 hrs',
    questionCount: 52,
  },
  {
    id: 'AT-007',
    name: 'Cookie & Consent Audit',
    description: 'Review cookie usage, consent mechanisms, and compliance with ePrivacy Directive and GDPR requirements.',
    category: 'Privacy',
    tier: 'plus',
    module: 'Privacy Management',
    estimatedTime: '1 hr',
    questionCount: 36,
  },
  {
    id: 'AT-008',
    name: 'Data Subject Rights Readiness',
    description: 'Assess your organisation\'s capability to respond to DSAR, erasure, portability, and objection requests within legal timeframes.',
    category: 'Privacy',
    tier: 'plus',
    module: 'Privacy Management',
    estimatedTime: '45 min',
    questionCount: 30,
  },
  {
    id: 'AT-009',
    name: 'Data Processing Activity Review',
    description: 'Validate and update Records of Processing Activities (RoPA) for accuracy, completeness, and legal basis documentation.',
    category: 'Privacy',
    tier: 'plus',
    module: 'Privacy Management',
    estimatedTime: '1 hr',
    questionCount: 40,
  },
  {
    id: 'AT-010',
    name: 'AI System Risk Assessment',
    description: 'Evaluate an AI system\'s risk profile across dimensions of fairness, explainability, robustness, and regulatory compliance.',
    category: 'AI Governance',
    tier: 'plus',
    module: 'AI Governance',
    estimatedTime: '2 hrs',
    questionCount: 58,
  },
  {
    id: 'AT-011',
    name: 'AI Model Bias & Fairness Assessment',
    description: 'Test AI models for discriminatory outputs, demographic bias, and adherence to ethical AI principles.',
    category: 'AI Governance',
    tier: 'plus',
    module: 'AI Governance',
    estimatedTime: '1.5 hrs',
    questionCount: 44,
  },
  // ── OT Premium — TPRM, GRC, Data Discovery ───────────────────────────────────
  {
    id: 'AT-012',
    name: 'Third-Party Privacy Assessment',
    description: 'Comprehensive privacy due diligence for sub-processors and data recipients, including transfer mechanism validation.',
    category: 'Third-Party Risk',
    tier: 'premium',
    module: 'TPRM',
    estimatedTime: '2 hrs',
    questionCount: 60,
  },
  {
    id: 'AT-013',
    name: 'Cross-Border Transfer Assessment',
    description: 'Evaluate adequacy decisions, Standard Contractual Clauses, and supplementary measures for international data transfers.',
    category: 'Privacy',
    tier: 'premium',
    module: 'Privacy Management',
    estimatedTime: '1.5 hrs',
    questionCount: 48,
  },
  {
    id: 'AT-014',
    name: 'GDPR Readiness Assessment',
    description: 'Full-scope GDPR compliance evaluation across all 99 articles, covering governance, data flows, rights, and security.',
    category: 'Regulatory',
    tier: 'premium',
    module: 'GRC',
    estimatedTime: '4 hrs',
    questionCount: 120,
  },
  {
    id: 'AT-015',
    name: 'CCPA / CPRA Compliance Assessment',
    description: 'Evaluate compliance with California Consumer Privacy Act and CPRA amendments for consumer rights and opt-out mechanisms.',
    category: 'Regulatory',
    tier: 'premium',
    module: 'GRC',
    estimatedTime: '2 hrs',
    questionCount: 72,
  },
  {
    id: 'AT-016',
    name: 'GRC Control Effectiveness Assessment',
    description: 'Test the design and operating effectiveness of privacy and security controls against GRC frameworks.',
    category: 'GRC',
    tier: 'premium',
    module: 'GRC',
    estimatedTime: '3 hrs',
    questionCount: 96,
  },
  {
    id: 'AT-017',
    name: 'Sensitive Data Discovery Assessment',
    description: 'Identify unknown personal and sensitive data stores across structured and unstructured repositories.',
    category: 'Data Discovery',
    tier: 'premium',
    module: 'Data Discovery',
    estimatedTime: '2 hrs',
    questionCount: 54,
  },
  {
    id: 'AT-018',
    name: 'Privacy Programme Maturity Assessment',
    description: 'Benchmark your privacy programme against industry maturity models including NIST Privacy Framework and ISO 29101.',
    category: 'Privacy',
    tier: 'premium',
    module: 'Privacy Management',
    estimatedTime: '3 hrs',
    questionCount: 88,
  },
  {
    id: 'AT-019',
    name: 'Breach Readiness & Response Assessment',
    description: 'Assess incident detection capabilities, notification procedures, and regulatory reporting readiness.',
    category: 'Incident Management',
    tier: 'premium',
    module: 'Privacy Management',
    estimatedTime: '1.5 hrs',
    questionCount: 50,
  },
]

export interface AssessmentInstance {
  id: string
  typeId: string
  typeName: string
  subject: string           // vendor name, system name, etc.
  status: 'Not Started' | 'In Progress' | 'In Review' | 'Completed' | 'Overdue'
  assignedTo: string
  dueDate: string
  completedDate?: string
  score?: number            // 0–100 if completed
  tier: AssessmentTier
}

export const assessmentInstances: AssessmentInstance[] = [
  { id: 'AI-001', typeId: 'AT-001', typeName: 'Vendor Risk Assessment', subject: 'OpenAI', status: 'Completed', assignedTo: 'Sarah Chen', dueDate: 'Mar 15, 2026', completedDate: 'Mar 12, 2026', score: 78, tier: 'lite' },
  { id: 'AI-002', typeId: 'AT-001', typeName: 'Vendor Risk Assessment', subject: 'Snowflake', status: 'In Progress', assignedTo: 'Mark Rivera', dueDate: 'Jun 01, 2026', tier: 'lite' },
  { id: 'AI-003', typeId: 'AT-002', typeName: 'Security Questionnaire', subject: 'AWS Integration', status: 'Completed', assignedTo: 'Tom Walsh', dueDate: 'Apr 10, 2026', completedDate: 'Apr 08, 2026', score: 91, tier: 'lite' },
  { id: 'AI-004', typeId: 'AT-004', typeName: 'Internal Compliance Audit', subject: 'Q1 2026 Audit', status: 'Completed', assignedTo: 'Priya Nair', dueDate: 'Apr 30, 2026', completedDate: 'Apr 28, 2026', score: 84, tier: 'lite' },
  { id: 'AI-005', typeId: 'AT-001', typeName: 'Vendor Risk Assessment', subject: 'DataDog', status: 'Overdue', assignedTo: 'Mark Rivera', dueDate: 'May 01, 2026', tier: 'lite' },
  { id: 'AI-006', typeId: 'AT-005', typeName: 'DPIA', subject: 'Customer Analytics Platform', status: 'In Review', assignedTo: 'Sarah Chen', dueDate: 'Jun 15, 2026', tier: 'plus' },
  { id: 'AI-007', typeId: 'AT-006', typeName: 'PIA', subject: 'Mobile App v3.0', status: 'In Progress', assignedTo: 'Priya Nair', dueDate: 'Jun 30, 2026', tier: 'plus' },
  { id: 'AI-008', typeId: 'AT-007', typeName: 'Cookie & Consent Audit', subject: 'Corporate Website', status: 'Completed', assignedTo: 'Tom Walsh', dueDate: 'Mar 31, 2026', completedDate: 'Mar 29, 2026', score: 72, tier: 'plus' },
  { id: 'AI-009', typeId: 'AT-010', typeName: 'AI System Risk Assessment', subject: 'HR Screening AI', status: 'Not Started', assignedTo: 'Sarah Chen', dueDate: 'Jul 15, 2026', tier: 'plus' },
  { id: 'AI-010', typeId: 'AT-011', typeName: 'AI Model Bias Assessment', subject: 'Fraud Detection', status: 'In Progress', assignedTo: 'Mark Rivera', dueDate: 'Jun 20, 2026', tier: 'plus' },
  { id: 'AI-011', typeId: 'AT-012', typeName: 'Third-Party Privacy Assessment', subject: 'Anthropic', status: 'Completed', assignedTo: 'Sarah Chen', dueDate: 'Feb 28, 2026', completedDate: 'Feb 25, 2026', score: 88, tier: 'premium' },
  { id: 'AI-012', typeId: 'AT-014', typeName: 'GDPR Readiness Assessment', subject: 'Enterprise-wide', status: 'In Progress', assignedTo: 'Priya Nair', dueDate: 'Aug 31, 2026', tier: 'premium' },
  { id: 'AI-013', typeId: 'AT-016', typeName: 'GRC Control Effectiveness', subject: 'Privacy Controls Q2', status: 'Not Started', assignedTo: 'Tom Walsh', dueDate: 'Sep 30, 2026', tier: 'premium' },
]
```

---

## components/onetrust-logo.tsx

```tsx
"use client"

import { cn } from '@/lib/utils'

interface OneTrustLogoProps {
  className?: string
  variant?: 'mark' | 'full'
  color?: 'black' | 'white' | 'mint'
}

// The OneTrust symbol is a stylized fusion of O and T - 
// constructed as a single vertical pillar framed by two dynamic curves
export function OneTrustLogo({ className, variant = 'mark', color = 'white' }: OneTrustLogoProps) {
  const fillColor = {
    black: '#000000',
    white: '#ffffff',
    mint: '#6CEEAD'
  }[color]

  if (variant === 'mark') {
    return (
      <svg 
        viewBox="0 0 48 32" 
        className={cn("h-8 w-auto", className)}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Left curve */}
        <path
          d="M16 0C7.163 0 0 7.163 0 16s7.163 16 16 16c4.418 0 8.418-1.79 11.314-4.686V4.686C24.418 1.79 20.418 0 16 0z"
          fill={fillColor}
        />
        {/* Center pillar (negative space creates the T) */}
        <rect x="18" y="0" width="4" height="32" fill={color === 'white' ? '#13151f' : '#ffffff'} />
        {/* Right curve */}
        <path
          d="M32 0c-4.418 0-8.418 1.79-11.314 4.686v22.628C23.582 30.21 27.582 32 32 32c8.837 0 16-7.163 16-16S40.837 0 32 0z"
          fill={fillColor}
        />
        {/* Right inner curve (negative space) */}
        <path
          d="M32 4c-3.314 0-6.314 1.343-8.485 3.515v16.97A11.953 11.953 0 0032 28c6.627 0 12-5.373 12-12S38.627 4 32 4z"
          fill={color === 'white' ? '#13151f' : '#ffffff'}
        />
      </svg>
    )
  }

  // Full logo with wordmark
  return (
    <div className={cn("flex items-center gap-3", className)}>
      <svg 
        viewBox="0 0 48 32" 
        className="h-8 w-auto"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Left curve */}
        <path
          d="M16 0C7.163 0 0 7.163 0 16s7.163 16 16 16c4.418 0 8.418-1.79 11.314-4.686V4.686C24.418 1.79 20.418 0 16 0z"
          fill={fillColor}
        />
        {/* Center pillar (negative space creates the T) */}
        <rect x="18" y="0" width="4" height="32" fill={color === 'white' ? '#13151f' : '#ffffff'} />
        {/* Right curve */}
        <path
          d="M32 0c-4.418 0-8.418 1.79-11.314 4.686v22.628C23.582 30.21 27.582 32 32 32c8.837 0 16-7.163 16-16S40.837 0 32 0z"
          fill={fillColor}
        />
        {/* Right inner curve (negative space) */}
        <path
          d="M32 4c-3.314 0-6.314 1.343-8.485 3.515v16.97A11.953 11.953 0 0032 28c6.627 0 12-5.373 12-12S38.627 4 32 4z"
          fill={color === 'white' ? '#13151f' : '#ffffff'}
        />
      </svg>
      <span className={cn(
        "text-xl font-medium tracking-tight",
        color === 'white' && "text-white",
        color === 'black' && "text-black",
        color === 'mint' && "text-[#6CEEAD]"
      )}>
        OneTrust
      </span>
    </div>
  )
}

// Simplified mark version that matches the brand guidelines more closely
export function OneTrustMark({ className, color = 'white' }: Omit<OneTrustLogoProps, 'variant'>) {
  const fillColor = {
    black: '#000000',
    white: '#ffffff',
    mint: '#6CEEAD'
  }[color]
  
  const bgColor = {
    black: '#ffffff',
    white: '#13151f',
    mint: '#000000'
  }[color]

  return (
    <svg 
      viewBox="0 0 64 40" 
      className={cn("h-8 w-auto", className)}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Left half-circle with inner white space */}
      <path
        d="M20 0C8.954 0 0 8.954 0 20s8.954 20 20 20c5.523 0 10.523-2.239 14.142-5.858V5.858C30.523 2.239 25.523 0 20 0z"
        fill={fillColor}
      />
      {/* Left inner arc (creates the C shape) */}
      <path
        d="M20 6c-7.732 0-14 6.268-14 14s6.268 14 14 14c3.866 0 7.366-1.568 9.899-4.101V10.101C27.366 7.568 23.866 6 20 6z"
        fill={bgColor}
      />
      
      {/* Center vertical bar (the T pillar) */}
      <rect x="30" y="0" width="4" height="40" fill={fillColor} />
      
      {/* Right half-circle with inner white space */}
      <path
        d="M44 0c-5.523 0-10.523 2.239-14.142 5.858v28.284C33.477 37.761 38.477 40 44 40c11.046 0 20-8.954 20-20S55.046 0 44 0z"
        fill={fillColor}
      />
      {/* Right inner arc (creates the reverse C shape) */}
      <path
        d="M44 6c-3.866 0-7.366 1.568-9.899 4.101v19.798C36.634 32.432 40.134 34 44 34c7.732 0 14-6.268 14-14S51.732 6 44 6z"
        fill={bgColor}
      />
    </svg>
  )
}
```

---

## components/sidebar.tsx

```tsx
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
```

---

## components/top-bar.tsx

```tsx
"use client"

import { useSubscription, tierLabels } from '@/lib/subscription-context'
import { useNavigation, NavigationView } from '@/lib/navigation-context'
import { Search, Bell, ChevronRight } from 'lucide-react'
import { cn } from '@/lib/utils'

const viewLabels: Record<NavigationView, string> = {
  home: 'Home',
  vendors: 'Vendors',
  assessments: 'Assessments',
  risks: 'Risks',
  assets: 'Assets',
  policies: 'Policies',
  'ai-governance': 'AI Governance',
  privacy: 'Privacy Management',
  tprm: 'TPRM',
  grc: 'GRC',
  'data-discovery': 'Data Discovery',
  settings: 'Settings',
  help: 'Help & Support',
}

interface TopBarProps {
  onSubscriptionClick: () => void
}

export function TopBar({ onSubscriptionClick }: TopBarProps) {
  const { tier } = useSubscription()
  const {
    currentView,
    aiGovTab,
    aiGovInventoryItem,
    aiGovAcceptableUseItem,
    privacyTab,
    privacyRecordItem,
    selectedRecordId,
    setCurrentView,
    setSelectedRecordId,
  } = useNavigation()

  const breadcrumbs: { label: string; onClick?: () => void }[] = [
    { 
      label: 'Home', 
      onClick: () => {
        setCurrentView('home')
        setSelectedRecordId(null)
      }
    }
  ]

  if (currentView !== 'home') {
    breadcrumbs.push({ 
      label: viewLabels[currentView],
      onClick: () => setSelectedRecordId(null)
    })
  }

  if (currentView === 'ai-governance') {
    const aiGovTabLabels: Record<string, string> = {
      'overview': 'Overview',
      'acceptable-use': 'Acceptable Use',
      'governance-packs': 'Governance Packs',
      'inventory': 'Inventory',
      'objects': 'Objects',
      'ai-policies': 'AI Policies',
    }
    
    if (aiGovTab === 'inventory') {
      const inventoryLabels: Record<string, string> = {
        'projects': 'Projects',
        'ai-systems': 'AI Systems',
        'models': 'Models',
        'ai-agents': 'AI Agents',
        'datasets': 'Datasets',
        'vendors': 'Model Providers'
      }
      breadcrumbs.push({ 
        label: inventoryLabels[aiGovInventoryItem],
        onClick: () => setSelectedRecordId(null)
      })
    } else if (aiGovTab === 'acceptable-use') {
      const acceptableUseLabels: Record<string, string> = {
        'accepted-inventory': 'Inventory',
        'accepted-use-policies': 'Policies'
      }
      breadcrumbs.push({ 
        label: acceptableUseLabels[aiGovAcceptableUseItem],
        onClick: () => setSelectedRecordId(null)
      })
    } else {
      breadcrumbs.push({ 
        label: aiGovTabLabels[aiGovTab],
        onClick: () => setSelectedRecordId(null)
      })
    }
  }

  if (currentView === 'privacy') {
    const privacyTabLabels: Record<string, string> = {
      overview: 'Overview',
      records: 'Records',
      objects: 'Objects',
      policies: 'Policies',
    }
    const privacyRecordLabels: Record<string, string> = {
      'pia-dpia': 'PIA & DPIA',
      'incidents': 'Incident Management',
      'privacy-rights': 'Privacy Rights',
      'data-mapping': 'Data Mapping',
      'privacy-notices': 'Privacy Notices',
      'benchmarking': 'Benchmarking',
      'maturity-planning': 'Maturity & Planning',
    }

    breadcrumbs.push({
      label: privacyRecordLabels[privacyRecordItem] ?? 'PIA & DPIA',
      onClick: () => setSelectedRecordId(null),
    })
    breadcrumbs.push({
      label: privacyTabLabels[privacyTab] ?? 'Overview',
      onClick: () => setSelectedRecordId(null),
    })
  }

  if (selectedRecordId) {
    breadcrumbs.push({ label: selectedRecordId })
  }

  return (
    <header className="h-14 border-b border-[#1e2130] bg-[#0f1117] flex items-center justify-between px-4">
      {/* Breadcrumb */}
      <nav className="flex items-center text-sm">
        {breadcrumbs.map((crumb, index) => (
          <div key={index} className="flex items-center">
            {index > 0 && <ChevronRight className="w-4 h-4 mx-2 text-[#4b5563]" />}
            {crumb.onClick && index < breadcrumbs.length - 1 ? (
              <button
                onClick={crumb.onClick}
                className="text-[#9ca3af] hover:text-white transition-colors"
              >
                {crumb.label}
              </button>
            ) : (
              <span className={cn(
                index === breadcrumbs.length - 1 ? "text-white font-medium" : "text-[#9ca3af]"
              )}>
                {crumb.label}
              </span>
            )}
          </div>
        ))}
      </nav>

      {/* Right Actions */}
      <div className="flex items-center gap-3">
        <button className="p-2 text-[#9ca3af] hover:text-white hover:bg-[#1e2130] rounded-md transition-colors">
          <Search className="w-5 h-5" />
        </button>
        <button className="p-2 text-[#9ca3af] hover:text-white hover:bg-[#1e2130] rounded-md transition-colors relative">
          <Bell className="w-5 h-5" />
          <span className="absolute top-1 right-1 w-2 h-2 bg-[#ef4444] rounded-full" />
        </button>
        <button
          onClick={onSubscriptionClick}
          className="py-1.5 px-3 rounded-md bg-[#6CEEAD]/10 border border-[#6CEEAD]/30 text-[#6CEEAD] text-sm font-medium hover:bg-[#6CEEAD]/20 transition-colors"
        >
          {tierLabels[tier]}
        </button>
        <div className="w-8 h-8 rounded-full bg-[#0788F7] flex items-center justify-center text-white text-sm font-medium cursor-pointer">
          JR
        </div>
      </div>
    </header>
  )
}
```

---

## components/home-dashboard.tsx

```tsx
"use client"

import { useSubscription, tierLabels } from '@/lib/subscription-context'
import { useNavigation, NavigationView } from '@/lib/navigation-context'
import {
  Building2,
  ClipboardCheck,
  AlertTriangle,
  Server,
  FileText,
  Brain,
  ChevronRight,
  Clock,
  AlertCircle
} from 'lucide-react'
import { cn } from '@/lib/utils'

interface Action {
  id: string
  type: 'Assessment' | 'Task' | 'Risk' | 'Evidence'
  title: string
  dueDate: string
  status: 'overdue' | 'due-soon' | 'upcoming'
}

const actions: Action[] = [
  { id: '1', type: 'Assessment', title: 'Q2 Vendor Risk Assessment', dueDate: '2 days overdue', status: 'overdue' },
  { id: '2', type: 'Risk', title: 'High risk AI system review', dueDate: 'Due today', status: 'due-soon' },
  { id: '3', type: 'Task', title: 'Update privacy policy', dueDate: 'Due in 3 days', status: 'upcoming' },
  { id: '4', type: 'Evidence', title: 'SOC 2 compliance evidence', dueDate: '1 day overdue', status: 'overdue' },
  { id: '5', type: 'Assessment', title: 'AI Model validation', dueDate: 'Due in 5 days', status: 'upcoming' },
  { id: '6', type: 'Task', title: 'Review vendor contract', dueDate: 'Due tomorrow', status: 'due-soon' },
]

interface RecentActivity {
  id: string
  action: string
  target: string
  user: string
  time: string
}

const recentActivity: RecentActivity[] = [
  { id: '1', action: 'Updated', target: 'GPT-4 Integration', user: 'Sarah Chen', time: '2 hours ago' },
  { id: '2', action: 'Created', target: 'New Vendor Assessment', user: 'Mark Rivera', time: '4 hours ago' },
  { id: '3', action: 'Approved', target: 'AI Policy v2.1', user: 'Priya Nair', time: '5 hours ago' },
  { id: '4', action: 'Flagged', target: 'High Risk Finding', user: 'Tom Walsh', time: '1 day ago' },
  { id: '5', action: 'Completed', target: 'TPRM Assessment', user: 'Sarah Chen', time: '1 day ago' },
]

const quickAccessItems: { id: NavigationView; label: string; icon: React.ReactNode; count: number }[] = [
  { id: 'vendors', label: 'Vendors', icon: <Building2 className="w-5 h-5" />, count: 142 },
  { id: 'assessments', label: 'Assessments', icon: <ClipboardCheck className="w-5 h-5" />, count: 38 },
  { id: 'risks', label: 'Risks', icon: <AlertTriangle className="w-5 h-5" />, count: 24 },
  { id: 'assets', label: 'Assets', icon: <Server className="w-5 h-5" />, count: 89 },
  { id: 'policies', label: 'Policies', icon: <FileText className="w-5 h-5" />, count: 15 },
]

export function HomeDashboard() {
  const { tier } = useSubscription()
  const { setCurrentView } = useNavigation()

  // OneTrust Secondary Palette for status/type differentiation
  // Using Sky, Leaf, Destructive, Yellow - avoiding Mint overuse
  const typeColors = {
    Assessment: 'bg-[#0788F7]/10 text-[#0788F7]', // Sky
    Task: 'bg-[#00B935]/10 text-[#00B935]', // Leaf
    Risk: 'bg-[#ef4444]/10 text-[#ef4444]', // Destructive red
    Evidence: 'bg-[#FFEF3C]/10 text-[#FFEF3C]' // Yellow
  }

  const statusColors = {
    overdue: 'text-[#ef4444]',
    'due-soon': 'text-[#FFEF3C]', // OneTrust Yellow
    upcoming: 'text-[#9ca3af]'
  }

  return (
    <div className="p-6 max-w-7xl mx-auto">
      {/* Welcome Header */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-2">
          <h1 className="text-2xl font-medium tracking-[-0.03em] text-white">Welcome back, Jacob</h1>
          <span className="py-1 px-2.5 rounded-md bg-[#6CEEAD]/10 border border-[#6CEEAD]/30 text-[#6CEEAD] text-sm font-medium">
            {tierLabels[tier]}
          </span>
        </div>
        <p className="text-[#9ca3af] leading-[1.2]">Here&apos;s what&apos;s happening across your governance programs</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* My Actions */}
          <div className="bg-[#13151f] border border-[#1e2130] rounded-lg">
            <div className="p-4 border-b border-[#1e2130] flex items-center justify-between">
              <h2 className="text-lg font-medium tracking-[-0.01em] text-white">My Actions</h2>
              <span className="text-sm text-[#9ca3af]">{actions.length} items</span>
            </div>
            <div className="divide-y divide-[#1e2130]">
              {actions.map((action) => (
                <div
                  key={action.id}
                  className="p-4 flex items-center justify-between hover:bg-[#1a1d2a] transition-colors cursor-pointer"
                >
                  <div className="flex items-center gap-3">
                    {action.status === 'overdue' ? (
                      <AlertCircle className="w-5 h-5 text-[#ef4444]" />
                    ) : (
                      <Clock className="w-5 h-5 text-[#9ca3af]" />
                    )}
                    <div>
                      <p className="text-sm text-white">{action.title}</p>
                      <div className="flex items-center gap-2 mt-1">
                        <span className={cn("text-xs px-2 py-0.5 rounded", typeColors[action.type])}>
                          {action.type}
                        </span>
                        <span className={cn("text-xs", statusColors[action.status])}>
                          {action.dueDate}
                        </span>
                      </div>
                    </div>
                  </div>
                  <ChevronRight className="w-4 h-4 text-[#4b5563]" />
                </div>
              ))}
            </div>
          </div>

          {/* Quick Access */}
          <div>
            <h2 className="text-lg font-medium tracking-[-0.01em] text-white mb-4">Quick Access</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
              {quickAccessItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => setCurrentView(item.id)}
                  className="p-4 bg-[#13151f] border border-[#1e2130] rounded-lg hover:border-[#2a2d3a] hover:bg-[#1a1d2a] transition-colors text-left"
                >
                  <div className="text-[#9ca3af] mb-2">{item.icon}</div>
                  <p className="text-sm font-medium text-white">{item.label}</p>
                  <p className="text-xs text-[#9ca3af] mt-1">{item.count} items</p>
                </button>
              ))}
            </div>
          </div>

          {/* Module Cards - Only if subscribed */}
          {tier !== 'lite' && (
            <div>
              <h2 className="text-lg font-medium tracking-[-0.01em] text-white mb-4">Your Modules</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <button
                  onClick={() => setCurrentView('ai-governance')}
                  className="p-4 bg-[#13151f] border border-[#1e2130] rounded-lg hover:border-[#6CEEAD]/50 hover:bg-[#1a1d2a] transition-colors text-left group"
                >
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 rounded-lg bg-[#6CEEAD]/10 flex items-center justify-center">
                      <Brain className="w-5 h-5 text-[#6CEEAD]" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-white">AI Governance</p>
                      <p className="text-xs text-[#9ca3af]">Manage AI systems and compliance</p>
                    </div>
                  </div>
                  <div className="grid grid-cols-3 gap-3 text-center">
                    <div>
                      <p className="text-lg font-semibold text-white">6</p>
                      <p className="text-xs text-[#9ca3af]">AI Systems</p>
                    </div>
                    <div>
                      <p className="text-lg font-semibold text-[#ef4444]">3</p>
                      <p className="text-xs text-[#9ca3af]">High Risk</p>
                    </div>
                    <div>
                      <p className="text-lg font-semibold text-white">4</p>
                      <p className="text-xs text-[#9ca3af]">Models</p>
                    </div>
                  </div>
                </button>

                {tier === 'premium' && (
                  <>
                    <div className="p-4 bg-[#13151f] border border-[#1e2130] rounded-lg">
                      <div className="flex items-center gap-3 mb-3">
                        <div className="w-10 h-10 rounded-lg bg-[#3b82f6]/10 flex items-center justify-center">
                          <ClipboardCheck className="w-5 h-5 text-[#3b82f6]" />
                        </div>
                        <div>
                          <p className="text-sm font-medium text-white">Privacy</p>
                          <p className="text-xs text-[#9ca3af]">Data privacy management</p>
                        </div>
                      </div>
                      <div className="grid grid-cols-3 gap-3 text-center">
                        <div>
                          <p className="text-lg font-semibold text-white">12</p>
                          <p className="text-xs text-[#9ca3af]">DSARs</p>
                        </div>
                        <div>
                          <p className="text-lg font-semibold text-white">8</p>
                          <p className="text-xs text-[#9ca3af]">Consents</p>
                        </div>
                        <div>
                          <p className="text-lg font-semibold text-white">5</p>
                          <p className="text-xs text-[#9ca3af]">PIAs</p>
                        </div>
                      </div>
                    </div>
                  </>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Sidebar - Recent Activity */}
        <div className="space-y-6">
          <div className="bg-[#13151f] border border-[#1e2130] rounded-lg">
            <div className="p-4 border-b border-[#1e2130]">
              <h2 className="text-lg font-medium tracking-[-0.01em] text-white">Recent Activity</h2>
            </div>
            <div className="divide-y divide-[#1e2130]">
              {recentActivity.map((activity) => (
                <div key={activity.id} className="p-4">
                  <p className="text-sm text-white">
                    <span className="text-[#9ca3af]">{activity.user}</span>
                    {' '}{activity.action.toLowerCase()}{' '}
                    <span className="text-[#6CEEAD]">{activity.target}</span>
                  </p>
                  <p className="text-xs text-[#4b5563] mt-1">{activity.time}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
```

---

## components/subscription-modal.tsx

```tsx
"use client"

import { useSubscription, SubscriptionTier, tierLabels, tierDescriptions } from '@/lib/subscription-context'
import { X, Check } from 'lucide-react'
import { cn } from '@/lib/utils'
import { OneTrustMark } from './onetrust-logo'

interface SubscriptionModalProps {
  isOpen: boolean
  onClose: () => void
}

const tierFeatures: Record<SubscriptionTier, string[]> = {
  lite: [
    'Unlimited users',
    'Vendors inventory',
    'Assessments inventory',
    'Risks inventory',
    'Assets inventory',
    'Policies inventory'
  ],
  plus: [
    'Everything in Lite',
    'AI Governance module',
    'AI Systems tracking',
    'Model inventory',
    'AI Agents management'
  ],
  premium: [
    'Everything in Plus',
    'Privacy module',
    'TPRM module',
    'GRC module',
    'Data Discovery module',
    'Advanced analytics'
  ]
}

export function SubscriptionModal({ isOpen, onClose }: SubscriptionModalProps) {
  const { tier, setTier, collaboratorView, setCollaboratorView } = useSubscription()

  if (!isOpen) return null

  const tiers: SubscriptionTier[] = ['lite', 'plus', 'premium']

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/70 backdrop-blur-sm"
        onClick={onClose}
      />
      
      {/* Modal */}
      <div className="relative bg-[#13151f] border border-[#1e2130] rounded-xl w-full max-w-3xl mx-4 max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-[#1e2130]">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-[#6CEEAD] flex items-center justify-center">
              <OneTrustMark className="h-5" color="black" />
            </div>
            <div>
              <h2 className="text-xl font-medium tracking-[-0.03em] text-white">Subscription Tiers</h2>
              <p className="text-sm text-[#9ca3af]">Switch tiers to see navigation changes in real-time</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-[#9ca3af] hover:text-white hover:bg-[#1e2130] rounded-md transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tiers Grid */}
        <div className="p-6 grid grid-cols-3 gap-4">
          {tiers.map((t) => (
            <button
              key={t}
              onClick={() => setTier(t)}
              className={cn(
                "p-4 rounded-lg border text-left transition-all",
                tier === t
                  ? "border-[#6CEEAD] bg-[#6CEEAD]/10"
                  : "border-[#1e2130] hover:border-[#2a2d3a] bg-[#0f1117]"
              )}
            >
              <div className="flex items-center justify-between mb-3">
                <span className={cn(
                  "text-lg font-semibold",
                  tier === t ? "text-[#6CEEAD]" : "text-white"
                )}>
                  {tierLabels[t]}
                </span>
                {tier === t && (
                  <div className="w-6 h-6 rounded-full bg-[#6CEEAD] flex items-center justify-center">
                    <Check className="w-4 h-4 text-[#0f1117]" />
                  </div>
                )}
              </div>
              <p className="text-xs text-[#9ca3af] mb-4">{tierDescriptions[t]}</p>
              <ul className="space-y-2">
                {tierFeatures[t].map((feature, i) => (
                  <li key={i} className="flex items-center gap-2 text-sm text-[#e5e7eb]">
                    <Check className="w-4 h-4 text-[#6CEEAD] flex-shrink-0" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </button>
          ))}
        </div>

        {/* ABAC Demo Toggle */}
        <div className="px-6 pb-6">
          <div className="p-4 rounded-lg bg-[#1e2130] border border-[#2a2d3a]">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-sm font-medium text-white">Enable Collaborator View</h3>
                <p className="text-xs text-[#9ca3af] mt-1">
                  Demo ABAC restrictions - limits visible tabs and fields
                </p>
              </div>
              <button
                onClick={() => setCollaboratorView(!collaboratorView)}
                className={cn(
                  "relative w-11 h-6 rounded-full transition-colors",
                  collaboratorView ? "bg-[#6CEEAD]" : "bg-[#2a2d3a]"
                )}
              >
                <span
                  className={cn(
                    "absolute top-0.5 left-0.5 w-5 h-5 rounded-full bg-white transition-transform",
                    collaboratorView && "translate-x-5"
                  )}
                />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
```

---

## components/record-detail-panel.tsx

```tsx
"use client"

import { useState } from 'react'
import { useSubscription } from '@/lib/subscription-context'
import { useNavigation } from '@/lib/navigation-context'
import { aiSystemDetails, aiSystems } from '@/lib/sample-data'
import { X, Edit2, ExternalLink, Lock } from 'lucide-react'
import { cn } from '@/lib/utils'

type DetailTab = 'overview' | 'risk' | 'assessments' | 'policies' | 'audit-log' | 'settings'

const allTabs: { id: DetailTab; label: string }[] = [
  { id: 'overview', label: 'Overview' },
  { id: 'risk', label: 'Risk' },
  { id: 'assessments', label: 'Assessments' },
  { id: 'policies', label: 'Policies' },
  { id: 'audit-log', label: 'Audit Log' },
  { id: 'settings', label: 'Settings' },
]

const restrictedTabs: DetailTab[] = ['risk', 'audit-log']

export function RecordDetailPanel() {
  const { collaboratorView } = useSubscription()
  const { selectedRecordId, setSelectedRecordId } = useNavigation()
  const [activeTab, setActiveTab] = useState<DetailTab>('overview')

  if (!selectedRecordId) return null

  // Find matching AI system
  const system = aiSystems.find(s => s.name === selectedRecordId)
  const details = system ? aiSystemDetails[system.id] : null

  const visibleTabs = collaboratorView 
    ? allTabs.filter(tab => !restrictedTabs.includes(tab.id))
    : allTabs

  // OneTrust Secondary Palette - Mint used sparingly
  const riskColors = {
    'Low': 'bg-[#00B935]/10 text-[#00B935] border-[#00B935]/30', // Leaf
    'Medium': 'bg-[#FFEF3C]/10 text-[#FFEF3C] border-[#FFEF3C]/30', // Yellow
    'High': 'bg-[#ef4444]/10 text-[#ef4444] border-[#ef4444]/30' // Destructive
  }

  const stageColors = {
    'In Use': 'bg-[#00B935]/10 text-[#00B935]', // Leaf
    'New': 'bg-[#0788F7]/10 text-[#0788F7]', // Sky
    'In Review': 'bg-[#FFEF3C]/10 text-[#FFEF3C]', // Yellow
    'Active': 'bg-[#00B935]/10 text-[#00B935]' // Leaf
  }

  // Reset to overview if current tab is restricted
  if (collaboratorView && restrictedTabs.includes(activeTab)) {
    setActiveTab('overview')
  }

  return (
    <div className="fixed inset-y-0 right-0 w-[600px] bg-[#13151f] border-l border-[#1e2130] shadow-2xl z-40 flex flex-col">
      {/* Header */}
      <div className="p-4 border-b border-[#1e2130] flex items-start justify-between">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <h2 className="text-lg font-medium tracking-[-0.01em] text-white">{selectedRecordId}</h2>
            {system && (
              <span className={cn("text-xs px-2 py-0.5 rounded", stageColors[system.stage])}>
                {system.stage}
              </span>
            )}
          </div>
          {system && (
            <p className="text-sm text-[#9ca3af]">{system.id} | {system.framework}</p>
          )}
        </div>
        <div className="flex items-center gap-2">
          {!collaboratorView && (
            <button className="p-2 text-[#9ca3af] hover:text-white hover:bg-[#1e2130] rounded-md transition-colors">
              <Edit2 className="w-4 h-4" />
            </button>
          )}
          <button 
            onClick={() => setSelectedRecordId(null)}
            className="p-2 text-[#9ca3af] hover:text-white hover:bg-[#1e2130] rounded-md transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="border-b border-[#1e2130] px-4">
        <div className="flex gap-1">
          {visibleTabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={cn(
                "px-3 py-2.5 text-sm font-medium transition-colors relative",
                activeTab === tab.id
                  ? "text-[#6CEEAD]"
                  : "text-[#9ca3af] hover:text-white"
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

      {/* Restricted tabs message - use Yellow per OneTrust brand */}
      {collaboratorView && (
        <div className="mx-4 mt-4 p-3 rounded-md bg-[#1e2130] border border-[#2a2d3a] flex items-center gap-2">
          <Lock className="w-4 h-4 text-[#FFEF3C]" />
          <p className="text-xs text-[#9ca3af]">
            Some tabs are hidden due to access restrictions (Risk, Audit Log)
          </p>
        </div>
      )}

      {/* Tab Content */}
      <div className="flex-1 overflow-auto p-4">
        {activeTab === 'overview' && (
          <div className="space-y-6">
            {/* Risk Score Card */}
            {system && (
              <div className={cn(
                "p-4 rounded-lg border",
                riskColors[system.riskScore]
              )}>
                <p className="text-xs uppercase tracking-wider opacity-70 mb-1">Risk Score</p>
                <p className="text-2xl font-semibold">{system.riskScore}</p>
              </div>
            )}

            {/* Metadata */}
            <div>
              <h3 className="text-sm font-medium text-white mb-3">Details</h3>
              <div className="grid grid-cols-2 gap-4">
                {collaboratorView ? (
                  <>
                    <div>
                      <p className="text-xs text-[#4b5563] mb-1">Name</p>
                      <p className="text-sm text-white">{selectedRecordId}</p>
                    </div>
                    <div>
                      <p className="text-xs text-[#4b5563] mb-1">Framework</p>
                      <p className="text-sm text-white">{system?.framework || '-'}</p>
                    </div>
                    <div>
                      <p className="text-xs text-[#4b5563] mb-1">Owner</p>
                      <p className="text-sm text-white">{system?.owner || '-'}</p>
                    </div>
                    <div>
                      <p className="text-xs text-[#4b5563] mb-1">Status</p>
                      <p className="text-sm text-white">{system?.stage || '-'}</p>
                    </div>
                  </>
                ) : (
                  <>
                    <div>
                      <p className="text-xs text-[#4b5563] mb-1">Name</p>
                      <p className="text-sm text-white">{selectedRecordId}</p>
                    </div>
                    <div>
                      <p className="text-xs text-[#4b5563] mb-1">Framework</p>
                      <p className="text-sm text-white">{system?.framework || '-'}</p>
                    </div>
                    <div>
                      <p className="text-xs text-[#4b5563] mb-1">Owner</p>
                      <p className="text-sm text-white">{system?.owner || '-'}</p>
                    </div>
                    <div>
                      <p className="text-xs text-[#4b5563] mb-1">Stage</p>
                      <p className="text-sm text-white">{system?.stage || '-'}</p>
                    </div>
                    {details && (
                      <>
                        <div>
                          <p className="text-xs text-[#4b5563] mb-1">Department</p>
                          <p className="text-sm text-white">{details.department}</p>
                        </div>
                        <div>
                          <p className="text-xs text-[#4b5563] mb-1">Business Unit</p>
                          <p className="text-sm text-white">{details.businessUnit}</p>
                        </div>
                        <div>
                          <p className="text-xs text-[#4b5563] mb-1">Deployment Date</p>
                          <p className="text-sm text-white">{details.deploymentDate}</p>
                        </div>
                        <div>
                          <p className="text-xs text-[#4b5563] mb-1">Last Review</p>
                          <p className="text-sm text-white">{details.lastReview}</p>
                        </div>
                      </>
                    )}
                  </>
                )}
              </div>
            </div>

            {/* Description */}
            {details && !collaboratorView && (
              <div>
                <h3 className="text-sm font-medium text-white mb-2">Description</h3>
                <p className="text-sm text-[#9ca3af]">{details.description}</p>
              </div>
            )}

            {/* Data Types */}
            {details && !collaboratorView && (
              <div>
                <h3 className="text-sm font-medium text-white mb-2">Data Types</h3>
                <div className="flex flex-wrap gap-2">
                  {details.dataTypes.map((type) => (
                    <span key={type} className="text-xs px-2 py-1 rounded bg-[#1e2130] text-[#9ca3af]">
                      {type}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Related Items */}
            {details && !collaboratorView && (
              <div>
                <h3 className="text-sm font-medium text-white mb-3">Related Items</h3>
                <div className="space-y-3">
                  {details.relatedVendors.length > 0 && (
                    <div>
                      <p className="text-xs text-[#4b5563] mb-2">Vendors</p>
                      <div className="space-y-1">
                        {details.relatedVendors.map((vendor) => (
                          <button 
                            key={vendor}
                            className="w-full flex items-center justify-between p-2 rounded bg-[#1e2130] hover:bg-[#2a2d3a] transition-colors"
                          >
                            <span className="text-sm text-white">{vendor}</span>
                            <ExternalLink className="w-3 h-3 text-[#4b5563]" />
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                  {details.relatedModels.length > 0 && (
                    <div>
                      <p className="text-xs text-[#4b5563] mb-2">Models</p>
                      <div className="space-y-1">
                        {details.relatedModels.map((model) => (
                          <button 
                            key={model}
                            className="w-full flex items-center justify-between p-2 rounded bg-[#1e2130] hover:bg-[#2a2d3a] transition-colors"
                          >
                            <span className="text-sm text-white">{model}</span>
                            <ExternalLink className="w-3 h-3 text-[#4b5563]" />
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                  {details.relatedAgents.length > 0 && (
                    <div>
                      <p className="text-xs text-[#4b5563] mb-2">AI Agents</p>
                      <div className="space-y-1">
                        {details.relatedAgents.map((agent) => (
                          <button 
                            key={agent}
                            className="w-full flex items-center justify-between p-2 rounded bg-[#1e2130] hover:bg-[#2a2d3a] transition-colors"
                          >
                            <span className="text-sm text-white">{agent}</span>
                            <ExternalLink className="w-3 h-3 text-[#4b5563]" />
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        )}

        {activeTab === 'risk' && !collaboratorView && (
          <div className="space-y-4">
            <h3 className="text-sm font-medium text-white">Risk Assessment</h3>
            <div className="p-4 bg-[#1e2130] rounded-lg">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-xs text-[#4b5563] mb-1">Inherent Risk</p>
                  <p className="text-lg font-semibold text-[#ef4444]">High</p>
                </div>
                <div>
                  <p className="text-xs text-[#4b5563] mb-1">Residual Risk</p>
                  <p className="text-lg font-semibold text-[#FFEF3C]">Medium</p>
                </div>
                <div>
                  <p className="text-xs text-[#4b5563] mb-1">Control Effectiveness</p>
                  <p className="text-lg font-semibold text-[#00B935]">72%</p>
                </div>
                <div>
                  <p className="text-xs text-[#4b5563] mb-1">Last Assessment</p>
                  <p className="text-sm text-white">Mar 28, 2026</p>
                </div>
              </div>
            </div>
            <div>
              <h4 className="text-sm font-medium text-white mb-2">Risk Factors</h4>
              <ul className="space-y-2">
                {['Data privacy exposure', 'Model bias potential', 'Regulatory compliance gaps'].map((factor) => (
                  <li key={factor} className="flex items-center gap-2 text-sm text-[#9ca3af]">
                    <div className="w-1.5 h-1.5 rounded-full bg-[#ef4444]" />
                    {factor}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}

        {activeTab === 'assessments' && (
          <div className="space-y-4">
            <h3 className="text-sm font-medium text-white">Linked Assessments</h3>
            <div className="space-y-2">
              {['ISO 42001 Gap Analysis', 'Data Privacy Impact Assessment', 'Bias Testing Report'].map((assessment, i) => (
                <div key={assessment} className="p-3 bg-[#1e2130] rounded-lg flex items-center justify-between">
                  <div>
                    <p className="text-sm text-white">{assessment}</p>
                    <p className="text-xs text-[#4b5563]">Completed Apr {10 + i}, 2026</p>
                  </div>
                  <span className="text-xs px-2 py-1 rounded bg-[#00B935]/10 text-[#00B935]">
                    Completed
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'policies' && (
          <div className="space-y-4">
            <h3 className="text-sm font-medium text-white">Applied Policies</h3>
            <div className="space-y-2">
              {['AI Ethics Policy', 'Data Handling Guidelines', 'Model Deployment Standards'].map((policy) => (
                <div key={policy} className="p-3 bg-[#1e2130] rounded-lg flex items-center justify-between">
                  <p className="text-sm text-white">{policy}</p>
                  <ExternalLink className="w-4 h-4 text-[#4b5563]" />
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'audit-log' && !collaboratorView && (
          <div className="space-y-4">
            <h3 className="text-sm font-medium text-white">Activity Log</h3>
            <div className="space-y-3">
              {[
                { action: 'Risk score updated', user: 'Sarah Chen', time: '2 hours ago' },
                { action: 'Assessment linked', user: 'Mark Rivera', time: '1 day ago' },
                { action: 'Stage changed to In Use', user: 'Sarah Chen', time: '3 days ago' },
                { action: 'Record created', user: 'Priya Nair', time: '2 weeks ago' },
              ].map((log, i) => (
                <div key={i} className="flex items-start gap-3">
                  <div className="w-2 h-2 mt-1.5 rounded-full bg-[#4b5563]" />
                  <div>
                    <p className="text-sm text-white">{log.action}</p>
                    <p className="text-xs text-[#4b5563]">{log.user} - {log.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'settings' && (
          <div className="space-y-4">
            <h3 className="text-sm font-medium text-white">Record Settings</h3>
            <p className="text-sm text-[#9ca3af]">Configure notifications, access controls, and automation rules for this record.</p>
            {collaboratorView && (
              <div className="p-3 rounded-md bg-[#FFEF3C]/10 border border-[#FFEF3C]/30">
                <p className="text-sm text-[#FFEF3C]">You have read-only access to this record</p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
```

---

## components/generic-page.tsx

```tsx
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
```

---

## components/vendors-page.tsx

```tsx
"use client"

import { useNavigation } from '@/lib/navigation-context'
import { vendors } from '@/lib/sample-data'
import { Plus, Search, Filter, Download } from 'lucide-react'
import { cn } from '@/lib/utils'

export function VendorsPage() {
  const { setSelectedRecordId } = useNavigation()

  // OneTrust Secondary Palette - use Mint sparingly
  const riskTierColors = {
    'Critical': 'bg-[#ef4444]/10 text-[#ef4444]',
    'High': 'bg-[#FFEF3C]/10 text-[#FFEF3C]', // Yellow
    'Medium': 'bg-[#0788F7]/10 text-[#0788F7]', // Sky
    'Low': 'bg-[#00B935]/10 text-[#00B935]' // Leaf
  }

  const statusColors = {
    'Active': 'bg-[#00B935]/10 text-[#00B935]', // Leaf
    'Under Review': 'bg-[#FFEF3C]/10 text-[#FFEF3C]', // Yellow
    'Inactive': 'bg-[#4b5563]/10 text-[#9ca3af]'
  }

  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-xl font-medium tracking-[-0.01em] text-white">Vendors</h1>
          <p className="text-sm text-[#9ca3af] leading-[1.2]">Global vendor inventory - accessible across all modules</p>
        </div>
        <div className="flex items-center gap-2">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#4b5563]" />
            <input
              type="text"
              placeholder="Search vendors..."
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
            Add vendor
          </button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-4 gap-4 mb-6">
        <div className="p-4 bg-[#13151f] border border-[#1e2130] rounded-lg">
          <p className="text-2xl font-semibold text-white">{vendors.length}</p>
          <p className="text-sm text-[#9ca3af]">Total Vendors</p>
        </div>
        <div className="p-4 bg-[#13151f] border border-[#1e2130] rounded-lg">
          <p className="text-2xl font-semibold text-[#ef4444]">{vendors.filter(v => v.riskTier === 'Critical').length}</p>
          <p className="text-sm text-[#9ca3af]">Critical Risk</p>
        </div>
        <div className="p-4 bg-[#13151f] border border-[#1e2130] rounded-lg">
          <p className="text-2xl font-semibold text-[#FFEF3C]">{vendors.filter(v => v.status === 'Under Review').length}</p>
          <p className="text-sm text-[#9ca3af]">Under Review</p>
        </div>
        <div className="p-4 bg-[#13151f] border border-[#1e2130] rounded-lg">
          <p className="text-2xl font-semibold text-[#00B935]">{vendors.filter(v => v.status === 'Active').length}</p>
          <p className="text-sm text-[#9ca3af]">Active</p>
        </div>
      </div>

      {/* Table */}
      <div className="bg-[#13151f] border border-[#1e2130] rounded-lg overflow-hidden">
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
      </div>
    </div>
  )
}
```

---

## components/assessments-module.tsx

```tsx
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
```

---

## components/interactive-world-map.tsx

```tsx
'use client'

import { useState, useMemo } from 'react'
import {
  ComposableMap,
  Geographies,
  Geography,
  Marker,
  Line,
  ZoomableGroup,
} from 'react-simple-maps'

const geoUrl = 'https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json'

interface AssetLocation {
  id: string
  name: string
  coordinates: [number, number]
  assetCount: number
  type: 'internal' | '3rd-party' | 'both'
}

interface DataTransfer {
  from: [number, number]
  to: [number, number]
  id: string
}

const assetLocations: AssetLocation[] = [
  { id: '1', name: 'United States', coordinates: [-95, 38], assetCount: 245, type: 'both' },
  { id: '2', name: 'United Kingdom', coordinates: [-1, 52], assetCount: 89, type: 'internal' },
  { id: '3', name: 'Germany', coordinates: [10, 51], assetCount: 156, type: 'both' },
  { id: '4', name: 'France', coordinates: [2, 47], assetCount: 67, type: '3rd-party' },
  { id: '5', name: 'Netherlands', coordinates: [5, 52], assetCount: 45, type: 'internal' },
  { id: '6', name: 'India', coordinates: [78, 21], assetCount: 312, type: 'both' },
  { id: '7', name: 'Singapore', coordinates: [104, 1], assetCount: 78, type: 'internal' },
  { id: '8', name: 'Australia', coordinates: [134, -25], assetCount: 56, type: '3rd-party' },
  { id: '9', name: 'Japan', coordinates: [138, 36], assetCount: 124, type: 'both' },
  { id: '10', name: 'Brazil', coordinates: [-51, -10], assetCount: 34, type: '3rd-party' },
  { id: '11', name: 'Canada', coordinates: [-106, 56], assetCount: 67, type: 'internal' },
  { id: '12', name: 'South Africa', coordinates: [25, -30], assetCount: 23, type: '3rd-party' },
  { id: '13', name: 'UAE', coordinates: [54, 24], assetCount: 45, type: 'internal' },
  { id: '14', name: 'Ireland', coordinates: [-8, 53], assetCount: 89, type: 'both' },
  { id: '15', name: 'Sweden', coordinates: [15, 62], assetCount: 34, type: 'internal' },
]

// Generate cross-border transfers
const generateTransfers = (): DataTransfer[] => {
  const transfers: DataTransfer[] = []
  const hubLocations = assetLocations.filter(l => l.assetCount > 80)
  
  hubLocations.forEach(hub => {
    assetLocations.forEach(loc => {
      if (hub.id !== loc.id && Math.random() > 0.4) {
        transfers.push({
          id: `${hub.id}-${loc.id}`,
          from: hub.coordinates,
          to: loc.coordinates,
        })
      }
    })
  })
  return transfers
}

interface AssetMapProps {
  onLocationClick?: (location: AssetLocation) => void
  showInternal?: boolean
  show3rdParty?: boolean
}

export function AssetMap({ onLocationClick, showInternal = true, show3rdParty = true }: AssetMapProps) {
  const [hoveredLocation, setHoveredLocation] = useState<string | null>(null)
  const [tooltipContent, setTooltipContent] = useState<{ name: string; count: number; x: number; y: number } | null>(null)

  const filteredLocations = useMemo(() => {
    return assetLocations.filter(loc => {
      if (loc.type === 'both') return showInternal || show3rdParty
      if (loc.type === 'internal') return showInternal
      if (loc.type === '3rd-party') return show3rdParty
      return true
    })
  }, [showInternal, show3rdParty])

  return (
    <div className="relative w-full h-full bg-[#1a1d2a] rounded-lg overflow-hidden" style={{ minHeight: '500px' }}>
      <ComposableMap
        projection="geoMercator"
        projectionConfig={{
          scale: 120,
          center: [20, 30],
        }}
        style={{ width: '100%', height: '100%' }}
      >
        <ZoomableGroup>
          <Geographies geography={geoUrl}>
            {({ geographies }) =>
              geographies.map((geo) => (
                <Geography
                  key={geo.rsmKey}
                  geography={geo}
                  fill="#2a2d3a"
                  stroke="#1e2130"
                  strokeWidth={0.5}
                  style={{
                    default: { outline: 'none' },
                    hover: { fill: '#3a3d4a', outline: 'none' },
                    pressed: { outline: 'none' },
                  }}
                />
              ))
            }
          </Geographies>

          {filteredLocations.map((location) => (
            <Marker
              key={location.id}
              coordinates={location.coordinates}
              onMouseEnter={() => {
                setHoveredLocation(location.id)
                setTooltipContent({
                  name: location.name,
                  count: location.assetCount,
                  x: 0,
                  y: 0,
                })
              }}
              onMouseLeave={() => {
                setHoveredLocation(null)
                setTooltipContent(null)
              }}
              onClick={() => onLocationClick?.(location)}
              style={{ cursor: 'pointer' }}
            >
              <circle
                r={Math.max(6, Math.min(14, location.assetCount / 20))}
                fill={
                  location.type === 'internal'
                    ? '#6CEEAD'
                    : location.type === '3rd-party'
                    ? '#0788F7'
                    : '#976FE6'
                }
                fillOpacity={hoveredLocation === location.id ? 1 : 0.7}
                stroke={hoveredLocation === location.id ? '#fff' : 'transparent'}
                strokeWidth={2}
                className="transition-all duration-200"
              />
              {hoveredLocation === location.id && (
                <text
                  textAnchor="middle"
                  y={-15}
                  style={{
                    fontFamily: 'system-ui',
                    fontSize: '10px',
                    fill: '#fff',
                    fontWeight: 500,
                  }}
                >
                  {location.name} ({location.assetCount})
                </text>
              )}
            </Marker>
          ))}
        </ZoomableGroup>
      </ComposableMap>

      {/* Legend */}
      <div className="absolute bottom-4 left-4 bg-[#13151f]/90 border border-[#1e2130] rounded-lg p-3">
        <p className="text-[10px] text-[#9ca3af] uppercase tracking-wider mb-2">Asset Type</p>
        <div className="space-y-1.5">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-[#6CEEAD]" />
            <span className="text-xs text-white">Internal</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-[#0788F7]" />
            <span className="text-xs text-white">3rd Party</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-[#976FE6]" />
            <span className="text-xs text-white">Both</span>
          </div>
        </div>
      </div>
    </div>
  )
}

interface CrossBorderMapProps {
  onTransferClick?: (transfer: DataTransfer) => void
  showRelationships?: boolean
}

export function CrossBorderMap({ onTransferClick, showRelationships = true }: CrossBorderMapProps) {
  const [hoveredTransfer, setHoveredTransfer] = useState<string | null>(null)
  const [hoveredLocation, setHoveredLocation] = useState<string | null>(null)
  
  const transfers = useMemo(() => generateTransfers(), [])

  return (
    <div className="relative w-full h-full bg-[#1a1d2a] rounded-lg overflow-hidden" style={{ minHeight: '500px' }}>
      <ComposableMap
        projection="geoMercator"
        projectionConfig={{
          scale: 120,
          center: [20, 30],
        }}
        style={{ width: '100%', height: '100%' }}
      >
        <ZoomableGroup>
          <Geographies geography={geoUrl}>
            {({ geographies }) =>
              geographies.map((geo) => (
                <Geography
                  key={geo.rsmKey}
                  geography={geo}
                  fill="#2a2d3a"
                  stroke="#1e2130"
                  strokeWidth={0.5}
                  style={{
                    default: { outline: 'none' },
                    hover: { fill: '#3a3d4a', outline: 'none' },
                    pressed: { outline: 'none' },
                  }}
                />
              ))
            }
          </Geographies>

          {/* Data transfer lines */}
          {showRelationships && transfers.map((transfer) => (
            <Line
              key={transfer.id}
              from={transfer.from}
              to={transfer.to}
              stroke={hoveredTransfer === transfer.id ? '#6CEEAD' : '#0788F7'}
              strokeWidth={hoveredTransfer === transfer.id ? 2 : 1}
              strokeOpacity={hoveredTransfer === transfer.id ? 1 : 0.4}
              strokeLinecap="round"
              strokeDasharray="4 2"
              style={{ cursor: 'pointer' }}
              onMouseEnter={() => setHoveredTransfer(transfer.id)}
              onMouseLeave={() => setHoveredTransfer(null)}
              onClick={() => onTransferClick?.(transfer)}
            />
          ))}

          {/* Location markers */}
          {assetLocations.map((location) => (
            <Marker
              key={location.id}
              coordinates={location.coordinates}
              onMouseEnter={() => setHoveredLocation(location.id)}
              onMouseLeave={() => setHoveredLocation(null)}
            >
              <circle
                r={6}
                fill="#fff"
                fillOpacity={0.9}
                stroke={hoveredLocation === location.id ? '#6CEEAD' : '#0788F7'}
                strokeWidth={2}
                className="transition-all duration-200"
                style={{ cursor: 'pointer' }}
              />
              {hoveredLocation === location.id && (
                <text
                  textAnchor="middle"
                  y={-12}
                  style={{
                    fontFamily: 'system-ui',
                    fontSize: '10px',
                    fill: '#fff',
                    fontWeight: 500,
                  }}
                >
                  {location.name}
                </text>
              )}
            </Marker>
          ))}
        </ZoomableGroup>
      </ComposableMap>

      {/* Stats overlay */}
      <div className="absolute top-4 right-4 bg-[#13151f]/90 border border-[#1e2130] rounded-lg p-3">
        <div className="flex items-center gap-2 text-sm">
          <div className="w-2 h-2 rounded-full bg-[#0788F7] animate-pulse" />
          <span className="text-white font-medium">{transfers.length}</span>
          <span className="text-[#9ca3af]">Active Transfers</span>
        </div>
      </div>

      {/* Legend */}
      <div className="absolute bottom-4 left-4 bg-[#13151f]/90 border border-[#1e2130] rounded-lg p-3">
        <p className="text-[10px] text-[#9ca3af] uppercase tracking-wider mb-2">Legend</p>
        <div className="space-y-1.5">
          <div className="flex items-center gap-2">
            <div className="w-4 h-0.5 bg-[#0788F7]" style={{ borderTop: '2px dashed #0788F7' }} />
            <span className="text-xs text-white">Data Transfer</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-white border-2 border-[#0788F7]" />
            <span className="text-xs text-white">Data Center</span>
          </div>
        </div>
      </div>
    </div>
  )
}
```

---

## components/governance-packs.tsx

```tsx
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
```

---

## components/ai-governance-module.tsx

```tsx
"use client"

import { useState } from 'react'
import { useNavigation, AIGovTab, AIGovInventoryItem, AIGovAcceptableUseItem } from '@/lib/navigation-context'
import { GovernancePacksView } from './governance-packs'
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
          <GovernancePacksView />
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
```

---

## components/privacy-management-module.tsx

```tsx
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
  ChevronDown,
} from 'lucide-react'
import { AssetMap, CrossBorderMap } from './interactive-world-map'
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
              {/* Pending Inventory */}
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

              {/* Processing Activities */}
              {dataMappingTertiary === 'processing' && (
                <>
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <h2 className="text-lg font-medium text-white">Processing activities</h2>
                      <p className="text-sm text-[#9ca3af]">Processing activities are records of business activities that involve the collection, storage, processing, and potential disclosure, sharing, or selling of personal information.</p>
                    </div>
                    <button className="flex items-center gap-2 px-4 py-2 bg-[#6CEEAD] text-[#0f1117] rounded-md text-sm font-medium hover:bg-[#5dd99c] transition-colors whitespace-nowrap">
                      <Plus className="w-4 h-4" />
                      Add processing activity
                    </button>
                  </div>
                  <div className="bg-[#13151f] border border-[#1e2130] rounded-lg overflow-hidden">
                    <div className="px-4">
                      <div className="grid gap-4 py-3 border-b border-[#1e2130]"
                        style={{ gridTemplateColumns: '70px 1fr 180px 180px 100px' }}>
                        <p className="text-[10px] font-semibold text-[#4b5563] uppercase tracking-wider">ID</p>
                        <p className="text-[10px] font-semibold text-[#4b5563] uppercase tracking-wider">Name</p>
                        <p className="text-[10px] font-semibold text-[#4b5563] uppercase tracking-wider">Managing Organization</p>
                        <p className="text-[10px] font-semibold text-[#4b5563] uppercase tracking-wider">Business Process Owner</p>
                        <p className="text-[10px] font-semibold text-[#4b5563] uppercase tracking-wider">Status</p>
                      </div>
                      {[
                        { id: '15692', name: 'N-Bulk PA-101 - location', org: 'LKGBTenant3LID40', owner: 'dm26661-test1@ot.com', status: 'Pending' },
                        { id: '9917', name: 'N-Bulk PA-1011', org: 'LKGBTenant3LID40', owner: 'lkgb sa', status: 'Archived' },
                        { id: '15844', name: 'N-Bulk PA-1011-0089', org: 'LKGBTenant3LID40', owner: 'Anurag Deep', status: 'Active' },
                        { id: '15778', name: 'N-Bulk PA-1011-klm', org: 'LKGBTenant3LID40', owner: 'Praveen Kupati', status: 'Active' },
                        { id: '9922', name: 'N-Bulk PA-1012', org: 'W.L. GORE & Associates', owner: 'lkgb sa', status: 'Active' },
                        { id: '9912', name: 'N-Bulk PA-1013', org: 'W.L. GORE & Associates', owner: 'lkgb sa', status: 'Active' },
                        { id: '9907', name: 'N-Bulk PA-1015', org: 'LKGBTenant3LID40', owner: 'lkgb sa', status: 'Active' },
                        { id: '9934', name: 'N-Bulk PA-1016', org: 'LKGBTenant3LID40', owner: 'lkgb sa', status: 'Active' },
                      ].map((record) => (
                        <div key={record.id}
                          className="grid gap-4 py-3 border-b border-[#1e2130] last:border-0 hover:bg-[#1a1d2a] cursor-pointer transition-colors -mx-4 px-4 items-center"
                          style={{ gridTemplateColumns: '70px 1fr 180px 180px 100px' }}
                          onClick={() => setSelectedRecordId(record.name)}>
                          <p className="text-sm text-[#9ca3af]">{record.id}</p>
                          <p className="text-sm font-medium text-[#0788F7]">{record.name}</p>
                          <p className="text-xs text-[#9ca3af]">{record.org}</p>
                          <p className="text-xs text-[#9ca3af]">{record.owner}</p>
                          <span className={cn("text-[10px] font-semibold px-2 py-0.5 rounded w-fit", statusColors[record.status])}>{record.status}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </>
              )}

              {/* Assets */}
              {dataMappingTertiary === 'assets' && (
                <>
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <h2 className="text-lg font-medium text-white">Assets</h2>
                      <p className="text-sm text-[#9ca3af]">Assets are any data, devices, or other components within an organization that support information-related activities.</p>
                    </div>
                    <button className="flex items-center gap-2 px-4 py-2 bg-[#6CEEAD] text-[#0f1117] rounded-md text-sm font-medium hover:bg-[#5dd99c] transition-colors">
                      <Plus className="w-4 h-4" />
                      Add asset
                    </button>
                  </div>
                  <div className="bg-[#13151f] border border-[#1e2130] rounded-lg overflow-hidden">
                    <div className="px-4">
                      <div className="grid gap-4 py-3 border-b border-[#1e2130]"
                        style={{ gridTemplateColumns: '70px 1fr 180px 120px 120px 100px 80px' }}>
                        <p className="text-[10px] font-semibold text-[#4b5563] uppercase tracking-wider">ID</p>
                        <p className="text-[10px] font-semibold text-[#4b5563] uppercase tracking-wider">Name</p>
                        <p className="text-[10px] font-semibold text-[#4b5563] uppercase tracking-wider">Managing Organization</p>
                        <p className="text-[10px] font-semibold text-[#4b5563] uppercase tracking-wider">Hosting Location</p>
                        <p className="text-[10px] font-semibold text-[#4b5563] uppercase tracking-wider">Type</p>
                        <p className="text-[10px] font-semibold text-[#4b5563] uppercase tracking-wider">IT Owner</p>
                        <p className="text-[10px] font-semibold text-[#4b5563] uppercase tracking-wider">Status</p>
                      </div>
                      {[
                        { id: '10773', name: 'N-Bulk-1978', org: 'LKGBTenant3LID40', location: 'Aruba', type: '- - - -', owner: '- - - -', status: 'Active' },
                        { id: '10770', name: 'N-Bulk-1979', org: 'LKGBTenant3LID40', location: 'Australia', type: '- - - -', owner: '- - - -', status: 'Active' },
                        { id: '8972', name: 'N-Bulk-198', org: 'LKGBTenant3LID40', location: 'Antarctica', type: '- - - -', owner: '- - - -', status: 'Active' },
                        { id: '10738', name: 'N-Bulk-1981', org: 'LKGBTenant3LID40', location: 'Azerbaijan', type: '- - - -', owner: '- - - -', status: 'Active' },
                        { id: '10745', name: 'N-Bulk-1982', org: 'LKGBTenant3LID40', location: 'Bahamas', type: '- - - -', owner: '- - - -', status: 'Active' },
                        { id: '10741', name: 'N-Bulk-1983', org: 'LKGBTenant3LID40', location: 'Bahrain', type: '- - - -', owner: '- - - -', status: 'Active' },
                        { id: '10737', name: 'N-Bulk-1984', org: 'LKGBTenant3LID40', location: 'Bangladesh', type: '- - - -', owner: '- - - -', status: 'Active' },
                        { id: '10765', name: 'N-Bulk-1985', org: 'LKGBTenant3LID40', location: 'Barbados', type: '- - - -', owner: '- - - -', status: 'Active' },
                      ].map((record) => (
                        <div key={record.id}
                          className="grid gap-4 py-3 border-b border-[#1e2130] last:border-0 hover:bg-[#1a1d2a] cursor-pointer transition-colors -mx-4 px-4 items-center"
                          style={{ gridTemplateColumns: '70px 1fr 180px 120px 120px 100px 80px' }}
                          onClick={() => setSelectedRecordId(record.name)}>
                          <p className="text-sm text-[#9ca3af]">{record.id}</p>
                          <p className="text-sm font-medium text-[#0788F7]">{record.name}</p>
                          <p className="text-xs text-[#9ca3af]">{record.org}</p>
                          <p className="text-xs text-[#9ca3af]">{record.location}</p>
                          <p className="text-xs text-[#9ca3af]">{record.type}</p>
                          <p className="text-xs text-[#9ca3af]">{record.owner}</p>
                          <span className={cn("text-[10px] font-semibold px-2 py-0.5 rounded w-fit", statusColors[record.status])}>{record.status}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </>
              )}

              {/* Entities */}
              {dataMappingTertiary === 'entities' && (
                <>
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <h2 className="text-lg font-medium text-white">Legal entities</h2>
                      <p className="text-sm text-[#9ca3af]">Entities are individuals, companies, or organizations that have legal rights and obligations.</p>
                    </div>
                    <button className="flex items-center gap-2 px-4 py-2 bg-[#6CEEAD] text-[#0f1117] rounded-md text-sm font-medium hover:bg-[#5dd99c] transition-colors">
                      <Plus className="w-4 h-4" />
                      Add entity
                    </button>
                  </div>
                  <div className="bg-[#13151f] border border-[#1e2130] rounded-lg overflow-hidden">
                    <div className="px-4">
                      <div className="grid gap-4 py-3 border-b border-[#1e2130]"
                        style={{ gridTemplateColumns: '60px 1fr 160px 140px 100px 100px' }}>
                        <p className="text-[10px] font-semibold text-[#4b5563] uppercase tracking-wider">ID</p>
                        <p className="text-[10px] font-semibold text-[#4b5563] uppercase tracking-wider">Entity Name</p>
                        <p className="text-[10px] font-semibold text-[#4b5563] uppercase tracking-wider">Organization</p>
                        <p className="text-[10px] font-semibold text-[#4b5563] uppercase tracking-wider">Primary Location</p>
                        <p className="text-[10px] font-semibold text-[#4b5563] uppercase tracking-wider">Type</p>
                        <p className="text-[10px] font-semibold text-[#4b5563] uppercase tracking-wider">Int/External</p>
                      </div>
                      {[
                        { id: '9504', name: '6.4 - Entity New', org: 'LKGBTenant3LID40', location: 'Aland Islands', type: 'Branch, Affiliate', intExt: 'External' },
                        { id: '9547', name: '6.4 - Entity New', org: 'LKGBTenant3LID40', location: 'American Samoa', type: 'Affiliate', intExt: 'External' },
                        { id: '9506', name: '6.4 - Entity New test', org: 'LKGBTenant3LID40', location: 'American Samoa', type: 'Affiliate, Branch', intExt: 'External' },
                        { id: '40', name: 'Entity 1', org: 'Ujjavale1234', location: 'India', type: 'Affiliate', intExt: 'External' },
                        { id: '9539', name: 'En 1711/10', org: 'LKGBTenant3LID40', location: 'Albania', type: 'Affiliate', intExt: '- - - -' },
                        { id: '46', name: 'Entity 789', org: 'Ujjavale1234', location: 'Unknown', type: 'Affiliate', intExt: 'Internal' },
                        { id: '38', name: 'N entity lkgb', org: 'Ujjavale1234', location: 'Albania', type: 'Affiliate', intExt: 'Internal' },
                        { id: '9638', name: '#entity-1', org: 'LKGBTenant3LID40', location: 'Aland Islands', type: '- - - -', intExt: '- - - -' },
                      ].map((record) => (
                        <div key={record.id}
                          className="grid gap-4 py-3 border-b border-[#1e2130] last:border-0 hover:bg-[#1a1d2a] cursor-pointer transition-colors -mx-4 px-4 items-center"
                          style={{ gridTemplateColumns: '60px 1fr 160px 140px 100px 100px' }}
                          onClick={() => setSelectedRecordId(record.name)}>
                          <p className="text-sm text-[#9ca3af]">{record.id}</p>
                          <p className="text-sm font-medium text-[#0788F7]">{record.name}</p>
                          <p className="text-xs text-[#9ca3af]">{record.org}</p>
                          <p className="text-xs text-[#9ca3af]">{record.location}</p>
                          <p className="text-xs text-[#9ca3af]">{record.type}</p>
                          <p className="text-xs text-[#9ca3af]">{record.intExt}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </>
              )}

              {/* Projects */}
              {dataMappingTertiary === 'projects' && (
                <>
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <h2 className="text-lg font-medium text-white">Projects</h2>
                      <p className="text-sm text-[#9ca3af]">Organize and collaborate on the work required for this object.</p>
                    </div>
                    <button className="flex items-center gap-2 px-4 py-2 bg-[#6CEEAD] text-[#0f1117] rounded-md text-sm font-medium hover:bg-[#5dd99c] transition-colors">
                      <Plus className="w-4 h-4" />
                      Add new
                    </button>
                  </div>
                  <div className="bg-[#13151f] border border-[#1e2130] rounded-lg overflow-hidden">
                    <div className="px-4">
                      <div className="grid gap-4 py-3 border-b border-[#1e2130]"
                        style={{ gridTemplateColumns: '1fr 120px 160px 1fr 180px' }}>
                        <p className="text-[10px] font-semibold text-[#4b5563] uppercase tracking-wider">Name</p>
                        <p className="text-[10px] font-semibold text-[#4b5563] uppercase tracking-wider">Stage</p>
                        <p className="text-[10px] font-semibold text-[#4b5563] uppercase tracking-wider">Organization</p>
                        <p className="text-[10px] font-semibold text-[#4b5563] uppercase tracking-wider">Description</p>
                        <p className="text-[10px] font-semibold text-[#4b5563] uppercase tracking-wider">Project Owner</p>
                      </div>
                      {[
                        { name: '12-2-project-1', stage: 'Under review', org: 'LKGBTenant3LID40', desc: '- - - - -', owner: 'Hongze Liu' },
                        { name: '13-2-project-1', stage: 'Not started', org: 'LKGBTenant3LID40', desc: '- - - - -', owner: '' },
                        { name: 'abc', stage: 'Not started', org: 'LKGBTenant3LID40', desc: '- - - - -', owner: '' },
                        { name: 'abcd-project', stage: 'Not started', org: 'Incident Manager', desc: '- - - - -', owner: 'Hongze Liu' },
                        { name: 'AuditD1 updated testing final testing', stage: 'Not started', org: 'LKGBTenant3LID40', desc: '- - - - -', owner: '' },
                        { name: 'AuditTest', stage: 'Under review', org: 'LKGBTenant3LID40', desc: '- - - - -', owner: '' },
                        { name: 'AuditTest updated', stage: 'Not started', org: 'LKGBTenant3LID40', desc: '- - - - -', owner: '' },
                        { name: 'bug check 26-11-2025 testing', stage: 'Completed', org: 'LKGBTenant3LID40', desc: '- - - - -', owner: '' },
                      ].map((record, idx) => (
                        <div key={idx}
                          className="grid gap-4 py-3 border-b border-[#1e2130] last:border-0 hover:bg-[#1a1d2a] cursor-pointer transition-colors -mx-4 px-4 items-center"
                          style={{ gridTemplateColumns: '1fr 120px 160px 1fr 180px' }}
                          onClick={() => setSelectedRecordId(record.name)}>
                          <p className="text-sm font-medium text-[#0788F7]">{record.name}</p>
                          <span className={cn("text-[10px] font-semibold px-2 py-0.5 rounded w-fit",
                            record.stage === 'Under review' ? 'bg-[#FFEF3C]/10 text-[#FFEF3C]' :
                            record.stage === 'Completed' ? 'bg-[#00B935]/10 text-[#00B935]' :
                            'bg-[#4b5563]/10 text-[#9ca3af]'
                          )}>{record.stage}</span>
                          <p className="text-xs text-[#9ca3af]">{record.org}</p>
                          <p className="text-xs text-[#9ca3af]">{record.desc}</p>
                          <p className="text-xs text-[#9ca3af]">{record.owner || '—'}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </>
              )}

              {/* Asset Map */}
              {dataMappingTertiary === 'asset-map' && (
                <>
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <h2 className="text-lg font-medium text-white">Asset map</h2>
                      <p className="text-sm text-[#9ca3af]">Filter by organization group to see the internal and third-party assets hosted in each location.</p>
                    </div>
                  </div>
                  <div className="flex gap-6">
                    <div className="flex-1">
                      <AssetMap
                        onLocationClick={(loc) => setSelectedRecordId(loc.name)}
                        showInternal={true}
                        show3rdParty={true}
                      />
                    </div>
                    <div className="w-56 bg-[#13151f] border border-[#1e2130] rounded-lg p-4 h-fit">
                      <h3 className="text-sm font-medium text-white mb-4">Filters</h3>
                      <div className="mb-4">
                        <label className="text-xs text-[#9ca3af] mb-2 block">Organization group</label>
                        <div className="relative">
                          <select className="w-full bg-[#1e2130] border border-[#2a2d3a] rounded-md px-3 py-2 text-sm text-white appearance-none cursor-pointer">
                            <option>LKGBTenant3LID40</option>
                            <option>W.L. GORE & Associates</option>
                            <option>Incident Manager</option>
                          </select>
                          <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#9ca3af] pointer-events-none" />
                        </div>
                      </div>
                      <div>
                        <label className="text-xs text-[#9ca3af] mb-2 block">Internal or 3rd party</label>
                        <div className="space-y-2">
                          <label className="flex items-center gap-2 text-sm text-white cursor-pointer">
                            <input type="checkbox" defaultChecked className="w-4 h-4 rounded border-[#2a2d3a] bg-[#1e2130] text-[#6CEEAD] focus:ring-[#6CEEAD] cursor-pointer" />
                            3rd Party
                          </label>
                          <label className="flex items-center gap-2 text-sm text-white cursor-pointer">
                            <input type="checkbox" defaultChecked className="w-4 h-4 rounded border-[#2a2d3a] bg-[#1e2130] text-[#6CEEAD] focus:ring-[#6CEEAD] cursor-pointer" />
                            Internal
                          </label>
                        </div>
                      </div>
                    </div>
                  </div>
                </>
              )}

              {/* Cross-Border */}
              {dataMappingTertiary === 'cross-border' && (
                <>
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <h2 className="text-lg font-medium text-white">Cross-Border</h2>
                      <p className="text-sm text-[#9ca3af]">View cross-border data transfers between related inventories. Keep your records current by reviewing and confirming potential inventory relationships.</p>
                    </div>
                    <button className="flex items-center gap-2 px-4 py-2 bg-[#6CEEAD] text-[#0f1117] rounded-md text-sm font-medium hover:bg-[#5dd99c] transition-colors">
                      <Download className="w-4 h-4" />
                      Export
                    </button>
                  </div>
                  <div className="flex items-center justify-end gap-4 mb-4">
                    <div className="flex items-center gap-2 text-sm text-[#f59e0b]">
                      <AlertTriangle className="w-4 h-4" />
                      <span>160 Potential relationships</span>
                    </div>
                    <label className="flex items-center gap-2 text-sm text-white cursor-pointer">
                      <input type="checkbox" defaultChecked className="w-4 h-4 rounded border-[#2a2d3a] bg-[#1e2130] text-[#6CEEAD] focus:ring-[#6CEEAD] cursor-pointer" />
                      Show
                    </label>
                    <button className="p-1 text-[#9ca3af] hover:text-white transition-colors">
                      <Filter className="w-4 h-4" />
                    </button>
                  </div>
                  <CrossBorderMap
                    onTransferClick={(transfer) => setSelectedRecordId(`Transfer ${transfer.id}`)}
                    showRelationships={true}
                  />
                </>
              )}

              {/* Data Lineage */}
              {dataMappingTertiary === 'data-lineage' && (
                <>
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <h2 className="text-lg font-medium text-white">Data lineage</h2>
                      <p className="text-sm text-[#9ca3af]">Manage the lineage diagrams of your processing activities.</p>
                    </div>
                  </div>
                  <div className="flex justify-end mb-4">
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#4b5563]" />
                      <input type="text" placeholder="Search"
                        className="pl-9 pr-4 py-2 bg-[#1e2130] border border-[#2a2d3a] rounded-md text-sm text-white placeholder-[#4b5563] focus:outline-none focus:border-[#6CEEAD]/50 w-64" />
                    </div>
                  </div>
                  <div className="bg-[#13151f] border border-[#1e2130] rounded-lg overflow-hidden">
                    <div className="px-4">
                      <div className="grid gap-4 py-3 border-b border-[#1e2130]"
                        style={{ gridTemplateColumns: '1fr 200px' }}>
                        <p className="text-[10px] font-semibold text-[#4b5563] uppercase tracking-wider">Name</p>
                        <p className="text-[10px] font-semibold text-[#4b5563] uppercase tracking-wider">Managing Organization</p>
                      </div>
                      {[
                        { name: 'N-Bulk PA-1012', org: 'W.L. GORE & Associates' },
                        { name: 'N-Bulk PA-1019', org: 'LKGBTenant3LID40' },
                        { name: 'N-Bulk PA-1039', org: 'LKGBTenant3LID40' },
                        { name: 'Add New PA for test', org: 'LKGBTenant3LID40' },
                        { name: 'Launch Assessment (repeated)', org: 'LKGBTenant3LID40' },
                        { name: 'Plan, transport, and deliver outbound product', org: 'LKGBTenant3LID40' },
                        { name: 'Tuesday morning', org: 'LKGBTenant3LID40' },
                      ].map((record, idx) => (
                        <div key={idx}
                          className="grid gap-4 py-3 border-b border-[#1e2130] last:border-0 hover:bg-[#1a1d2a] cursor-pointer transition-colors -mx-4 px-4 items-center"
                          style={{ gridTemplateColumns: '1fr 200px' }}
                          onClick={() => setSelectedRecordId(record.name)}>
                          <p className="text-sm font-medium text-[#0788F7]">{record.name}</p>
                          <p className="text-xs text-[#9ca3af]">{record.org}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </>
              )}

              {/* Reports */}
              {dataMappingTertiary === 'reports' && (
                <>
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="text-lg font-medium text-white">Reports</h2>
                    <button className="flex items-center gap-2 px-4 py-2 bg-[#6CEEAD] text-[#0f1117] rounded-md text-sm font-medium hover:bg-[#5dd99c] transition-colors">
                      <Plus className="w-4 h-4" />
                      Create new
                    </button>
                  </div>
                  <div className="flex items-center gap-2 mb-4">
                    <button className="flex items-center gap-1 px-3 py-1.5 bg-[#1e2130] border border-[#2a2d3a] rounded-md text-xs text-[#9ca3af] hover:text-white">
                      <Filter className="w-3 h-3" /> Add filter
                    </button>
                    <div className="relative flex-1 max-w-xs ml-auto">
                      <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#4b5563]" />
                      <input type="text" placeholder="Search"
                        className="w-full pl-9 pr-4 py-2 bg-[#1e2130] border border-[#2a2d3a] rounded-md text-sm text-white placeholder-[#4b5563] focus:outline-none focus:border-[#6CEEAD]/50" />
                    </div>
                  </div>
                  <div className="bg-[#13151f] border border-[#1e2130] rounded-lg overflow-hidden">
                    <div className="px-4">
                      <div className="grid gap-4 py-3 border-b border-[#1e2130]"
                        style={{ gridTemplateColumns: '1fr 100px 140px 80px 140px 120px' }}>
                        <p className="text-[10px] font-semibold text-[#4b5563] uppercase tracking-wider">Report Name</p>
                        <p className="text-[10px] font-semibold text-[#4b5563] uppercase tracking-wider">Data Type</p>
                        <p className="text-[10px] font-semibold text-[#4b5563] uppercase tracking-wider">Organization</p>
                        <p className="text-[10px] font-semibold text-[#4b5563] uppercase tracking-wider">Type</p>
                        <p className="text-[10px] font-semibold text-[#4b5563] uppercase tracking-wider">Created By</p>
                        <p className="text-[10px] font-semibold text-[#4b5563] uppercase tracking-wider">Date Created</p>
                      </div>
                      {[
                        { name: 'A DM col asset - Copy - Copy', dataType: 'Asset', org: 'LKGBTenant3LID40', type: 'COLUMN', createdBy: 'Sanatan Surya', date: '19/11/2024' },
                        { name: 'A DM col asset - Copy - Copy1', dataType: 'Asset', org: 'LKGBTenant3LID40', type: 'COLUMN', createdBy: 'Linu K.M', date: '27/06/2024' },
                        { name: 'A PIA col', dataType: 'Assessment', org: 'LKGBTenant3LID40', type: 'COLUMN', createdBy: 'site40 admintester', date: '21/03/2023' },
                        { name: 'A PIA col - Copy Surya', dataType: 'Assessment', org: 'LKGBTenant3LID40', type: 'COLUMN', createdBy: 'NEW USERAGAIN', date: '27/01/2025' },
                        { name: 'A01 PIA & DPIA Automation PDF', dataType: 'Assessment', org: 'LKGBTenant3LID40', type: 'PDF', createdBy: 'site40 admintester', date: '17/03/2023' },
                        { name: 'A02 PIA & DPIA Automation - Any Template P...', dataType: 'Assessment', org: 'LKGBTenant3LID40', type: 'PDF', createdBy: 'Sanatan Surya', date: '19/11/2024' },
                        { name: 'A03 Data Mapping Automation - Asset - PDF', dataType: 'Asset', org: 'LKGBTenant3LID40', type: 'PDF', createdBy: 'site40 admintester', date: '17/03/2023' },
                      ].map((record, idx) => (
                        <div key={idx}
                          className="grid gap-4 py-3 border-b border-[#1e2130] last:border-0 hover:bg-[#1a1d2a] cursor-pointer transition-colors -mx-4 px-4 items-center"
                          style={{ gridTemplateColumns: '1fr 100px 140px 80px 140px 120px' }}
                          onClick={() => setSelectedRecordId(record.name)}>
                          <p className="text-sm font-medium text-[#0788F7] truncate">{record.name}</p>
                          <p className="text-xs text-[#9ca3af]">{record.dataType}</p>
                          <p className="text-xs text-[#9ca3af]">{record.org}</p>
                          <p className="text-xs text-[#9ca3af]">{record.type}</p>
                          <p className="text-xs text-[#9ca3af]">{record.createdBy}</p>
                          <p className="text-xs text-[#9ca3af]">{record.date}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </>
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
```

---

## components/ui/button.tsx

```tsx
import * as React from 'react'
import { Slot } from '@radix-ui/react-slot'
import { cva, type VariantProps } from 'class-variance-authority'

import { cn } from '@/lib/utils'

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
  {
    variants: {
      variant: {
        default: 'bg-primary text-primary-foreground hover:bg-primary/90',
        destructive:
          'bg-destructive text-white hover:bg-destructive/90 focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40 dark:bg-destructive/60',
        outline:
          'border bg-background shadow-xs hover:bg-accent hover:text-accent-foreground dark:bg-input/30 dark:border-input dark:hover:bg-input/50',
        secondary:
          'bg-secondary text-secondary-foreground hover:bg-secondary/80',
        ghost:
          'hover:bg-accent hover:text-accent-foreground dark:hover:bg-accent/50',
        link: 'text-primary underline-offset-4 hover:underline',
      },
      size: {
        default: 'h-9 px-4 py-2 has-[>svg]:px-3',
        sm: 'h-8 rounded-md gap-1.5 px-3 has-[>svg]:px-2.5',
        lg: 'h-10 rounded-md px-6 has-[>svg]:px-4',
        icon: 'size-9',
        'icon-sm': 'size-8',
        'icon-lg': 'size-10',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  },
)

function Button({
  className,
  variant,
  size,
  asChild = false,
  ...props
}: React.ComponentProps<'button'> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean
  }) {
  const Comp = asChild ? Slot : 'button'

  return (
    <Comp
      data-slot="button"
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  )
}

export { Button, buttonVariants }
```

---

## components/ui/input.tsx

```tsx
import * as React from 'react'

import { cn } from '@/lib/utils'

function Input({ className, type, ...props }: React.ComponentProps<'input'>) {
  return (
    <input
      type={type}
      data-slot="input"
      className={cn(
        'file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground dark:bg-input/30 border-input h-9 w-full min-w-0 rounded-md border bg-transparent px-3 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm',
        'focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]',
        'aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive',
        className,
      )}
      {...props}
    />
  )
}

export { Input }
```

---

## components/ui/textarea.tsx

```tsx
import * as React from 'react'

import { cn } from '@/lib/utils'

function Textarea({ className, ...props }: React.ComponentProps<'textarea'>) {
  return (
    <textarea
      data-slot="textarea"
      className={cn(
        'border-input placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-ring/50 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive dark:bg-input/30 flex field-sizing-content min-h-16 w-full rounded-md border bg-transparent px-3 py-2 text-base shadow-xs transition-[color,box-shadow] outline-none focus-visible:ring-[3px] disabled:cursor-not-allowed disabled:opacity-50 md:text-sm',
        className,
      )}
      {...props}
    />
  )
}

export { Textarea }
```

---

## components/ui/select.tsx

```tsx
'use client'

import * as React from 'react'
import * as SelectPrimitive from '@radix-ui/react-select'
import { CheckIcon, ChevronDownIcon, ChevronUpIcon } from 'lucide-react'

import { cn } from '@/lib/utils'

function Select({
  ...props
}: React.ComponentProps<typeof SelectPrimitive.Root>) {
  return <SelectPrimitive.Root data-slot="select" {...props} />
}

function SelectGroup({
  ...props
}: React.ComponentProps<typeof SelectPrimitive.Group>) {
  return <SelectPrimitive.Group data-slot="select-group" {...props} />
}

function SelectValue({
  ...props
}: React.ComponentProps<typeof SelectPrimitive.Value>) {
  return <SelectPrimitive.Value data-slot="select-value" {...props} />
}

function SelectTrigger({
  className,
  size = 'default',
  children,
  ...props
}: React.ComponentProps<typeof SelectPrimitive.Trigger> & {
  size?: 'sm' | 'default'
}) {
  return (
    <SelectPrimitive.Trigger
      data-slot="select-trigger"
      data-size={size}
      className={cn(
        "border-input data-[placeholder]:text-muted-foreground [&_svg:not([class*='text-'])]:text-muted-foreground focus-visible:border-ring focus-visible:ring-ring/50 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive dark:bg-input/30 dark:hover:bg-input/50 flex w-fit items-center justify-between gap-2 rounded-md border bg-transparent px-3 py-2 text-sm whitespace-nowrap shadow-xs transition-[color,box-shadow] outline-none focus-visible:ring-[3px] disabled:cursor-not-allowed disabled:opacity-50 data-[size=default]:h-9 data-[size=sm]:h-8 *:data-[slot=select-value]:line-clamp-1 *:data-[slot=select-value]:flex *:data-[slot=select-value]:items-center *:data-[slot=select-value]:gap-2 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
        className,
      )}
      {...props}
    >
      {children}
      <SelectPrimitive.Icon asChild>
        <ChevronDownIcon className="size-4 opacity-50" />
      </SelectPrimitive.Icon>
    </SelectPrimitive.Trigger>
  )
}

function SelectContent({
  className,
  children,
  position = 'popper',
  ...props
}: React.ComponentProps<typeof SelectPrimitive.Content>) {
  return (
    <SelectPrimitive.Portal>
      <SelectPrimitive.Content
        data-slot="select-content"
        className={cn(
          'bg-popover text-popover-foreground data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 relative z-50 max-h-(--radix-select-content-available-height) min-w-[8rem] origin-(--radix-select-content-transform-origin) overflow-x-hidden overflow-y-auto rounded-md border shadow-md',
          position === 'popper' &&
            'data-[side=bottom]:translate-y-1 data-[side=left]:-translate-x-1 data-[side=right]:translate-x-1 data-[side=top]:-translate-y-1',
          className,
        )}
        position={position}
        {...props}
      >
        <SelectScrollUpButton />
        <SelectPrimitive.Viewport
          className={cn(
            'p-1',
            position === 'popper' &&
              'h-[var(--radix-select-trigger-height)] w-full min-w-[var(--radix-select-trigger-width)] scroll-my-1',
          )}
        >
          {children}
        </SelectPrimitive.Viewport>
        <SelectScrollDownButton />
      </SelectPrimitive.Content>
    </SelectPrimitive.Portal>
  )
}

function SelectLabel({
  className,
  ...props
}: React.ComponentProps<typeof SelectPrimitive.Label>) {
  return (
    <SelectPrimitive.Label
      data-slot="select-label"
      className={cn('text-muted-foreground px-2 py-1.5 text-xs', className)}
      {...props}
    />
  )
}

function SelectItem({
  className,
  children,
  ...props
}: React.ComponentProps<typeof SelectPrimitive.Item>) {
  return (
    <SelectPrimitive.Item
      data-slot="select-item"
      className={cn(
        "focus:bg-accent focus:text-accent-foreground [&_svg:not([class*='text-'])]:text-muted-foreground relative flex w-full cursor-default items-center gap-2 rounded-sm py-1.5 pr-8 pl-2 text-sm outline-hidden select-none data-[disabled]:pointer-events-none data-[disabled]:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4 *:[span]:last:flex *:[span]:last:items-center *:[span]:last:gap-2",
        className,
      )}
      {...props}
    >
      <span className="absolute right-2 flex size-3.5 items-center justify-center">
        <SelectPrimitive.ItemIndicator>
          <CheckIcon className="size-4" />
        </SelectPrimitive.ItemIndicator>
      </span>
      <SelectPrimitive.ItemText>{children}</SelectPrimitive.ItemText>
    </SelectPrimitive.Item>
  )
}

function SelectSeparator({
  className,
  ...props
}: React.ComponentProps<typeof SelectPrimitive.Separator>) {
  return (
    <SelectPrimitive.Separator
      data-slot="select-separator"
      className={cn('bg-border pointer-events-none -mx-1 my-1 h-px', className)}
      {...props}
    />
  )
}

function SelectScrollUpButton({
  className,
  ...props
}: React.ComponentProps<typeof SelectPrimitive.ScrollUpButton>) {
  return (
    <SelectPrimitive.ScrollUpButton
      data-slot="select-scroll-up-button"
      className={cn(
        'flex cursor-default items-center justify-center py-1',
        className,
      )}
      {...props}
    >
      <ChevronUpIcon className="size-4" />
    </SelectPrimitive.ScrollUpButton>
  )
}

function SelectScrollDownButton({
  className,
  ...props
}: React.ComponentProps<typeof SelectPrimitive.ScrollDownButton>) {
  return (
    <SelectPrimitive.ScrollDownButton
      data-slot="select-scroll-down-button"
      className={cn(
        'flex cursor-default items-center justify-center py-1',
        className,
      )}
      {...props}
    >
      <ChevronDownIcon className="size-4" />
    </SelectPrimitive.ScrollDownButton>
  )
}

export {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectScrollDownButton,
  SelectScrollUpButton,
  SelectSeparator,
  SelectTrigger,
  SelectValue,
}
```

---

## components/ui/checkbox.tsx

```tsx
'use client'

import * as React from 'react'
import * as CheckboxPrimitive from '@radix-ui/react-checkbox'
import { CheckIcon } from 'lucide-react'

import { cn } from '@/lib/utils'

function Checkbox({
  className,
  ...props
}: React.ComponentProps<typeof CheckboxPrimitive.Root>) {
  return (
    <CheckboxPrimitive.Root
      data-slot="checkbox"
      className={cn(
        'peer border-input dark:bg-input/30 data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground dark:data-[state=checked]:bg-primary data-[state=checked]:border-primary focus-visible:border-ring focus-visible:ring-ring/50 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive size-4 shrink-0 rounded-[4px] border shadow-xs transition-shadow outline-none focus-visible:ring-[3px] disabled:cursor-not-allowed disabled:opacity-50',
        className,
      )}
      {...props}
    >
      <CheckboxPrimitive.Indicator
        data-slot="checkbox-indicator"
        className="flex items-center justify-center text-current transition-none"
      >
        <CheckIcon className="size-3.5" />
      </CheckboxPrimitive.Indicator>
    </CheckboxPrimitive.Root>
  )
}

export { Checkbox }
```

---

## components/ui/switch.tsx

```tsx
'use client'

import * as React from 'react'
import * as SwitchPrimitive from '@radix-ui/react-switch'

import { cn } from '@/lib/utils'

function Switch({
  className,
  ...props
}: React.ComponentProps<typeof SwitchPrimitive.Root>) {
  return (
    <SwitchPrimitive.Root
      data-slot="switch"
      className={cn(
        'peer data-[state=checked]:bg-primary data-[state=unchecked]:bg-input focus-visible:border-ring focus-visible:ring-ring/50 dark:data-[state=unchecked]:bg-input/80 inline-flex h-[1.15rem] w-8 shrink-0 items-center rounded-full border border-transparent shadow-xs transition-all outline-none focus-visible:ring-[3px] disabled:cursor-not-allowed disabled:opacity-50',
        className,
      )}
      {...props}
    >
      <SwitchPrimitive.Thumb
        data-slot="switch-thumb"
        className="bg-background dark:data-[state=unchecked]:bg-foreground dark:data-[state=checked]:bg-primary-foreground pointer-events-none block size-4 rounded-full ring-0 transition-transform data-[state=checked]:translate-x-[calc(100%-2px)] data-[state=unchecked]:translate-x-0"
      />
    </SwitchPrimitive.Root>
  )
}

export { Switch }
```

---

## components/ui/tabs.tsx

```tsx
'use client'

import * as React from 'react'
import * as TabsPrimitive from '@radix-ui/react-tabs'

import { cn } from '@/lib/utils'

function Tabs({
  className,
  ...props
}: React.ComponentProps<typeof TabsPrimitive.Root>) {
  return (
    <TabsPrimitive.Root
      data-slot="tabs"
      className={cn('flex flex-col gap-2', className)}
      {...props}
    />
  )
}

function TabsList({
  className,
  ...props
}: React.ComponentProps<typeof TabsPrimitive.List>) {
  return (
    <TabsPrimitive.List
      data-slot="tabs-list"
      className={cn(
        'bg-muted text-muted-foreground inline-flex h-9 w-fit items-center justify-center rounded-lg p-[3px]',
        className,
      )}
      {...props}
    />
  )
}

function TabsTrigger({
  className,
  ...props
}: React.ComponentProps<typeof TabsPrimitive.Trigger>) {
  return (
    <TabsPrimitive.Trigger
      data-slot="tabs-trigger"
      className={cn(
        "data-[state=active]:bg-background dark:data-[state=active]:text-foreground focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:outline-ring dark:data-[state=active]:border-input dark:data-[state=active]:bg-input/30 text-foreground dark:text-muted-foreground inline-flex h-[calc(100%-1px)] flex-1 items-center justify-center gap-1.5 rounded-md border border-transparent px-2 py-1 text-sm font-medium whitespace-nowrap transition-[color,box-shadow] focus-visible:ring-[3px] focus-visible:outline-1 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:shadow-sm [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
        className,
      )}
      {...props}
    />
  )
}

function TabsContent({
  className,
  ...props
}: React.ComponentProps<typeof TabsPrimitive.Content>) {
  return (
    <TabsPrimitive.Content
      data-slot="tabs-content"
      className={cn('flex-1 outline-none', className)}
      {...props}
    />
  )
}

export { Tabs, TabsList, TabsTrigger, TabsContent }
```

---

## components/ui/tooltip.tsx

```tsx
'use client'

import * as React from 'react'
import * as TooltipPrimitive from '@radix-ui/react-tooltip'

import { cn } from '@/lib/utils'

function TooltipProvider({
  delayDuration = 0,
  ...props
}: React.ComponentProps<typeof TooltipPrimitive.Provider>) {
  return (
    <TooltipPrimitive.Provider
      data-slot="tooltip-provider"
      delayDuration={delayDuration}
      {...props}
    />
  )
}

function Tooltip({
  ...props
}: React.ComponentProps<typeof TooltipPrimitive.Root>) {
  return (
    <TooltipProvider>
      <TooltipPrimitive.Root data-slot="tooltip" {...props} />
    </TooltipProvider>
  )
}

function TooltipTrigger({
  ...props
}: React.ComponentProps<typeof TooltipPrimitive.Trigger>) {
  return <TooltipPrimitive.Trigger data-slot="tooltip-trigger" {...props} />
}

function TooltipContent({
  className,
  sideOffset = 0,
  children,
  ...props
}: React.ComponentProps<typeof TooltipPrimitive.Content>) {
  return (
    <TooltipPrimitive.Portal>
      <TooltipPrimitive.Content
        data-slot="tooltip-content"
        sideOffset={sideOffset}
        className={cn(
          'bg-foreground text-background animate-in fade-in-0 zoom-in-95 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 z-50 w-fit origin-(--radix-tooltip-content-transform-origin) rounded-md px-3 py-1.5 text-xs text-balance',
          className,
        )}
        {...props}
      >
        {children}
        <TooltipPrimitive.Arrow className="bg-foreground fill-foreground z-50 size-2.5 translate-y-[calc(-50%_-_2px)] rotate-45 rounded-[2px]" />
      </TooltipPrimitive.Content>
    </TooltipPrimitive.Portal>
  )
}

export { Tooltip, TooltipTrigger, TooltipContent, TooltipProvider }
```

---

## components/ui/progress.tsx

```tsx
'use client'

import * as React from 'react'
import * as ProgressPrimitive from '@radix-ui/react-progress'

import { cn } from '@/lib/utils'

function Progress({
  className,
  value,
  ...props
}: React.ComponentProps<typeof ProgressPrimitive.Root>) {
  return (
    <ProgressPrimitive.Root
      data-slot="progress"
      className={cn(
        'bg-primary/20 relative h-2 w-full overflow-hidden rounded-full',
        className,
      )}
      {...props}
    >
      <ProgressPrimitive.Indicator
        data-slot="progress-indicator"
        className="bg-primary h-full w-full flex-1 transition-all"
        style={{ transform: `translateX(-${100 - (value || 0)}%)` }}
      />
    </ProgressPrimitive.Root>
  )
}

export { Progress }
```

---

## components/ui/badge.tsx

```tsx
import * as React from 'react'
import { Slot } from '@radix-ui/react-slot'
import { cva, type VariantProps } from 'class-variance-authority'

import { cn } from '@/lib/utils'

const badgeVariants = cva(
  'inline-flex items-center justify-center rounded-md border px-2 py-0.5 text-xs font-medium w-fit whitespace-nowrap shrink-0 [&>svg]:size-3 gap-1 [&>svg]:pointer-events-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive transition-[color,box-shadow] overflow-hidden',
  {
    variants: {
      variant: {
        default:
          'border-transparent bg-primary text-primary-foreground [a&]:hover:bg-primary/90',
        secondary:
          'border-transparent bg-secondary text-secondary-foreground [a&]:hover:bg-secondary/90',
        destructive:
          'border-transparent bg-destructive text-white [a&]:hover:bg-destructive/90 focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40 dark:bg-destructive/60',
        outline:
          'text-foreground [a&]:hover:bg-accent [a&]:hover:text-accent-foreground',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  },
)

function Badge({
  className,
  variant,
  asChild = false,
  ...props
}: React.ComponentProps<'span'> &
  VariantProps<typeof badgeVariants> & { asChild?: boolean }) {
  const Comp = asChild ? Slot : 'span'

  return (
    <Comp
      data-slot="badge"
      className={cn(badgeVariants({ variant }), className)}
      {...props}
    />
  )
}

export { Badge, badgeVariants }
```

---

## components/ui/card.tsx

```tsx
import * as React from 'react'

import { cn } from '@/lib/utils'

function Card({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot="card"
      className={cn(
        'bg-card text-card-foreground flex flex-col gap-6 rounded-xl border py-6 shadow-sm',
        className,
      )}
      {...props}
    />
  )
}

function CardHeader({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot="card-header"
      className={cn(
        '@container/card-header grid auto-rows-min grid-rows-[auto_auto] items-start gap-2 px-6 has-data-[slot=card-action]:grid-cols-[1fr_auto] [.border-b]:pb-6',
        className,
      )}
      {...props}
    />
  )
}

function CardTitle({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot="card-title"
      className={cn('leading-none font-semibold', className)}
      {...props}
    />
  )
}

function CardDescription({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot="card-description"
      className={cn('text-muted-foreground text-sm', className)}
      {...props}
    />
  )
}

function CardAction({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot="card-action"
      className={cn(
        'col-start-2 row-span-2 row-start-1 self-start justify-self-end',
        className,
      )}
      {...props}
    />
  )
}

function CardContent({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot="card-content"
      className={cn('px-6', className)}
      {...props}
    />
  )
}

function CardFooter({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot="card-footer"
      className={cn('flex items-center px-6 [.border-t]:pt-6', className)}
      {...props}
    />
  )
}

export {
  Card,
  CardHeader,
  CardFooter,
  CardTitle,
  CardAction,
  CardDescription,
  CardContent,
}
```

---

## components/ui/scroll-area.tsx

```tsx
'use client'

import * as React from 'react'
import * as ScrollAreaPrimitive from '@radix-ui/react-scroll-area'

import { cn } from '@/lib/utils'

function ScrollArea({
  className,
  children,
  ...props
}: React.ComponentProps<typeof ScrollAreaPrimitive.Root>) {
  return (
    <ScrollAreaPrimitive.Root
      data-slot="scroll-area"
      className={cn('relative', className)}
      {...props}
    >
      <ScrollAreaPrimitive.Viewport
        data-slot="scroll-area-viewport"
        className="focus-visible:ring-ring/50 size-full rounded-[inherit] transition-[color,box-shadow] outline-none focus-visible:ring-[3px] focus-visible:outline-1"
      >
        {children}
      </ScrollAreaPrimitive.Viewport>
      <ScrollBar />
      <ScrollAreaPrimitive.Corner />
    </ScrollAreaPrimitive.Root>
  )
}

function ScrollBar({
  className,
  orientation = 'vertical',
  ...props
}: React.ComponentProps<typeof ScrollAreaPrimitive.ScrollAreaScrollbar>) {
  return (
    <ScrollAreaPrimitive.ScrollAreaScrollbar
      data-slot="scroll-area-scrollbar"
      orientation={orientation}
      className={cn(
        'flex touch-none p-px transition-colors select-none',
        orientation === 'vertical' &&
          'h-full w-2.5 border-l border-l-transparent',
        orientation === 'horizontal' &&
          'h-2.5 flex-col border-t border-t-transparent',
        className,
      )}
      {...props}
    >
      <ScrollAreaPrimitive.ScrollAreaThumb
        data-slot="scroll-area-thumb"
        className="bg-border relative flex-1 rounded-full"
      />
    </ScrollAreaPrimitive.ScrollAreaScrollbar>
  )
}

export { ScrollArea, ScrollBar }
```

