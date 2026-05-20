# OneTrust Redesign Prototype Specification

## Overview

This is a high-fidelity interactive prototype for a redesigned OneTrust platform, built with Next.js 15, React, TypeScript, and Tailwind CSS. The design follows OneTrust's official Visual Identity Guidelines with a dark theme inspired by modern SaaS products like Vanta and Linear.

## Tech Stack

- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS v4
- **UI Components**: shadcn/ui
- **Icons**: Lucide React
- **Font**: DM Sans (via @fontsource/dm-sans)

---

## Brand Guidelines

### Primary Color Palette

| Color | Hex | Usage |
|-------|-----|-------|
| Black | `#000000` | Primary dark backgrounds, text |
| White | `#FFFFFF` | Primary light text, backgrounds |
| Mint | `#6CEEAD` | **Accent only** - Key actions, active states, CTAs. Use sparingly. |

### Secondary Color Palette

| Color | Hex | Usage |
|-------|-----|-------|
| Yellow | `#FFEF3C` | Warnings, pending states, due-soon items |
| Leaf | `#00B935` | Success, active, completed states |
| Jade | `#008665` | Accessibility alternative to Mint |
| Sky | `#0788F7` | Informational, new items, links |
| Indigo | `#3B40D8` | Secondary accent |
| Purple | `#976FE6` | Tertiary accent |
| Beige | `#D9D9CC` | Neutral accent |

### Dark Theme Surface Colors

| Element | Hex |
|---------|-----|
| Background | `#0f1117` |
| Surface/Cards | `#13151f` |
| Borders | `#1e2130` |
| Hover borders | `#2a2d3a` |
| Muted text | `#9ca3af` |
| Disabled text | `#4b5563` |

### Typography

- **Font Family**: DM Sans
- **H1/H2**: Medium weight, `-3%` letter-spacing (`tracking-[-0.03em]`)
- **H3/Body**: Regular weight, `-1%` letter-spacing (`tracking-[-0.01em]`)
- **Line heights**: 90% for headings, 120% for body text

### Logo Assets

- **Full lockup** (expanded sidebar): `/public/images/ot-logo-lockup-white.png`
- **Mark only** (collapsed sidebar): `/public/images/ot-logo-mark-white.png`

---

## Navigation Structure

### Sidebar Layout

```
┌─────────────────────────────────┐
│ [Logo]              [Collapse]  │
├─────────────────────────────────┤
│ Home                            │
│ Dashboard                       │
│ Tasks                           │
│ Notifications                   │
├─────────────────────────────────┤
│ WORKSPACE                       │
│ Vendors                         │
│ Assessments                     │
│ Risks                           │
│ Assets                          │
│ Policies                        │
├─────────────────────────────────┤
│ APPS (tier-gated)               │
│ AI Governance                   │
│ Privacy                         │
│ TPRM                            │
│ GRC                             │
│ Data Discovery                  │
├─────────────────────────────────┤
│ CONFIGURATION                   │
│ Setup                           │
├─────────────────────────────────┤
│ Settings                        │
│ Help & Support                  │
│ [User Profile]                  │
│ [Tier Badge]                    │
└─────────────────────────────────┘
```

### Navigation Types

```typescript
type NavigationView = 
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
```

---

## Subscription Tiers

### Tier Definitions

| Tier | Label | Modules Available |
|------|-------|-------------------|
| `lite` | OT Lite | Core workspace only (no Apps section) |
| `plus` | OT Plus | AI Governance, Privacy |
| `premium` | OT Premium | All modules |

### Tier-Gated Features

- **Apps section**: Only visible for `plus` and `premium` tiers
- **Module access**: Controlled by `subscription-context.tsx`
- **Upgrade prompt**: Shown to `lite` users in sidebar

---

## AI Governance Module

### Tab Structure

```typescript
type AIGovTab = 'inventory' | 'objects' | 'ai-policies'
```

| Tab | Description |
|-----|-------------|
| Inventory | AI Systems, Models, Agents, Datasets, Projects, Vendors tables |
| Objects | Frameworks, Controls, Templates |
| AI Policies | Policy engine with active policies list |

### Inventory Secondary Rail

When viewing Inventory tab, a secondary rail appears with items:
- AI Systems
- Models
- Agents
- Datasets
- Projects
- Vendors

### Sample Data Schema

```typescript
interface AISystem {
  id: string
  name: string
  stage: 'In Use' | 'New' | 'In Review' | 'Active'
  risk: 'Low' | 'Medium' | 'High'
  owner: string
  lastUpdated: string
  description: string
}

interface AIModel {
  id: string
  name: string
  type: string
  status: 'Active' | 'Testing' | 'Deprecated'
  provider: string
  lastTrained: string
}

interface AIAgent {
  id: string
  name: string
  purpose: string
  status: 'Active' | 'Paused' | 'Inactive'
  linkedSystems: number
  createdDate: string
}

interface Dataset {
  id: string
  name: string
  classification: 'Public' | 'Internal' | 'Confidential' | 'Restricted'
  records: string
  lastUpdated: string
  owner: string
}

interface Project {
  id: string
  name: string
  status: 'Active' | 'Completed' | 'On Hold'
  team: string
  startDate: string
  linkedSystems: number
}

interface Vendor {
  id: string
  name: string
  category: string
  riskTier: 'Critical' | 'High' | 'Medium' | 'Low'
  status: 'Active' | 'Under Review' | 'Inactive'
  lastAssessment: string
}
```

---

## Record Detail Panel

When clicking a table row, a slide-in panel appears with:

### Tabs (Full Access)
- Overview
- Risk
- Assessments
- Policies
- Audit Log
- Settings

### Tabs (Collaborator View - ABAC Restricted)
- Overview
- Assessments
- Policies
- Settings

Hidden tabs in Collaborator View: Risk, Audit Log

### Collaborator View Features
- Yellow banner indicating restricted access
- Read-only indicators on fields
- Fewer metadata fields visible
- Warning messages about access restrictions

---

## Component Architecture

### File Structure

```
/app
  /globals.css          # Design tokens, Tailwind config
  /layout.tsx           # Root layout with DM Sans font
  /page.tsx             # Main app orchestrator

/components
  /sidebar.tsx          # Collapsible navigation sidebar
  /top-bar.tsx          # Global search, notifications, user menu
  /subscription-modal.tsx # Tier switcher modal
  /home-dashboard.tsx   # Home view with actions, quick access
  /ai-governance-module.tsx # AI Gov tabs and content
  /record-detail-panel.tsx  # Slide-in detail view
  /vendors-page.tsx     # Global vendors inventory
  /generic-page.tsx     # Placeholder for other views
  /onetrust-logo.tsx    # SVG logo component (backup)
  /ui/*                 # shadcn/ui components

/lib
  /subscription-context.tsx # Tier state management
  /navigation-context.tsx   # Navigation state management
  /sample-data.ts           # Mock data for tables
  /utils.ts                 # Utility functions (cn)

/public/images
  /ot-logo-lockup-white.png # Full logo
  /ot-logo-mark-white.png   # Mark only
```

---

## Key Interactions

### Sidebar
- Collapsible with smooth width transition
- Shows full logo when expanded, mark when collapsed
- Icons have tooltips when collapsed
- Tier badge clickable to open subscription modal

### Subscription Switcher
- Accessible from sidebar badge or top bar
- Real-time tier switching
- Instantly updates navigation visibility
- Shows feature comparison

### Tables
- Sortable columns
- Search/filter functionality
- Row click opens detail panel
- Add button for new records

### Detail Panel
- Slide-in from right
- Tabbed interface
- Collaborator view toggle for ABAC demo
- Close button and escape key support

---

## Status/State Color Mapping

### Risk Levels
| Level | Color |
|-------|-------|
| Low | Leaf `#00B935` |
| Medium | Yellow `#FFEF3C` |
| High | Destructive `#ef4444` |

### Stage/Status
| State | Color |
|-------|-------|
| Active/In Use/Completed | Leaf `#00B935` |
| New/Testing/Informational | Sky `#0788F7` |
| Pending/In Review/Warning | Yellow `#FFEF3C` |
| Deprecated/Error/Critical | Destructive `#ef4444` |
| Inactive/Disabled | Gray `#4b5563` / `#9ca3af` |

---

## CSS Custom Properties

```css
:root {
  /* Primary */
  --ot-black: #000000;
  --ot-white: #FFFFFF;
  --ot-mint: #6CEEAD;
  
  /* Secondary */
  --ot-yellow: #FFEF3C;
  --ot-leaf: #00B935;
  --ot-jade: #008665;
  --ot-sky: #0788F7;
  --ot-indigo: #3B40D8;
  --ot-purple: #976FE6;
  --ot-beige: #D9D9CC;
  
  /* Surfaces (Dark Theme) */
  --background: #0f1117;
  --surface: #13151f;
  --border: #1e2130;
  --border-hover: #2a2d3a;
  --muted: #9ca3af;
  --muted-foreground: #4b5563;
}
```

---

## Design Principles

1. **Mint is precious** - Use only for key actions, active states, and moments of emphasis. Never flood layouts with Mint.

2. **Black and White carry the system** - The majority of the UI should be neutral, letting Mint read as a confident signal.

3. **Secondary colors for meaning** - Use Yellow, Leaf, Sky to communicate status, not decoration.

4. **Tight typography** - Negative letter-spacing on headings creates a modern, confident feel.

5. **Consistent spacing** - Use Tailwind's spacing scale (gap-4, p-6, etc.) rather than arbitrary values.

6. **Subtle interactions** - Border color changes on hover, not dramatic color shifts.

---

## Future Considerations

- Real database integration (Supabase recommended)
- Authentication with Supabase Auth
- Real-time collaboration features
- Export/import functionality
- Advanced filtering and saved views
- Keyboard navigation
- Mobile responsive design
- Dark/light theme toggle
