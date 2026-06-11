# Assessments Module — Figma Design Spec

A complete layout + content reference for rebuilding the **Assessments** screen in Figma.

---

## 1. Design Tokens

### Colors
| Token | Hex | Usage |
|-------|-----|-------|
| App background | `#0f1117` | Page / canvas background |
| Surface | `#13151f` | Cards, stat tiles, table container |
| Surface (locked) | `#13151f` @ 60% opacity | Locked assessment cards |
| Border | `#1e2130` | Card borders, dividers, table rows |
| Border (hover) | `#2a2d3a` | Card hover border |
| Input background | `#1e2130` | Search field, filter button |
| Input border | `#2a2d3a` | Search / filter border |
| Text primary | `#ffffff` | Headings, card titles, values |
| Text secondary | `#9ca3af` | Body copy, labels, sub-text |
| Text muted | `#4b5563` | Meta text, icons, placeholders |
| Primary / Accent | `#6CEEAD` | CTA button, active tab, "Plus" tier, links |
| Primary hover | `#5dd99c` | CTA button hover |

### Status & Category Colors
| Color | Hex | Meaning |
|-------|-----|---------|
| Green | `#00B935` | Completed / Compliance |
| Yellow | `#FFEF3C` | In Progress / Operational Risk |
| Blue | `#0788F7` | In Review / Third-Party Risk / Data Discovery |
| Red | `#ef4444` | Overdue / Incident Management |
| Purple | `#976FE6` | Security / Premium tier |
| Mint | `#6CEEAD` | Privacy / Plus tier |
| Indigo | `#3B40D8` | AI Governance |
| Sand | `#D9D9CC` | Regulatory |
| Teal | `#008665` | GRC |

### Tier Badges
| Tier | Label | Text color | Background |
|------|-------|-----------|------------|
| lite | OT Lite | `#9ca3af` | `rgba(156,163,175,0.1)` |
| plus | OT Plus | `#6CEEAD` | `rgba(108,238,173,0.1)` |
| premium | OT Premium | `#976FE6` | `rgba(151,111,230,0.1)` |

### Typography
- **Font family:** Geist (sans) — system fallback
- **Module title (H1):** 20px / medium (500) / letter-spacing -0.03em / white
- **Section headers:** 14px / medium / uppercase / tracking-wider / `#9ca3af`
- **Card title:** 14px / medium / white / leading-snug
- **Body / description:** 12px / regular / `#9ca3af` / leading-relaxed
- **Stat value:** 24px / semibold
- **Stat label:** 12px / `#9ca3af`
- **Meta text:** 12px / `#4b5563`

### Spacing & Radius
- Card padding: 16px
- Stat tile padding: 12px
- Page padding: 24px horizontal
- Card grid gap: 12px
- Border radius: 8px (cards, tiles, buttons), full (status pills, dots)

---

## 2. Layout Structure

```
┌─────────────────────────────────────────────────────────────┐
│ HEADER (px 24, pt 24)                                         │
│  ┌─────────────────────────────┐   ┌───────────────────────┐ │
│  │ "Assessments" (H1)          │   │ [+ Start assessment]  │ │
│  │ "{n} types available on …"  │   │  (primary button)     │ │
│  └─────────────────────────────┘   └───────────────────────┘ │
│                                                               │
│  KPI ROW — 4 columns, gap 12                                  │
│  ┌────────┐ ┌────────┐ ┌────────┐ ┌────────┐                 │
│  │ Total  │ │Complete│ │In Prog.│ │Overdue │                 │
│  │  24    │ │  11    │ │   8    │ │   3    │                 │
│  └────────┘ └────────┘ └────────┘ └────────┘                 │
│                                                               │
│  TABS (bottom border divider)                                 │
│  [▣ Assessment Types]  [≡ All Assessments (n)]               │
└─────────────────────────────────────────────────────────────┘
┌─────────────────────────────────────────────────────────────┐
│ CONTENT (scrollable, px 24, py 20)                            │
│   → Tab A: Assessment Types   (card grid)                     │
│   → Tab B: All Assessments    (search + table)                │
└─────────────────────────────────────────────────────────────┘
```

---

## 3. KPI Cards (Summary Stats)

Row of 4 equal-width tiles. Each tile:
- Surface `#13151f`, border `#1e2130`, radius 8px, padding 12px
- Label (12px, `#9ca3af`) on top, value (24px, semibold) below

| Card | Value source | Value color |
|------|--------------|-------------|
| Total | count of all visible instances | `#ffffff` |
| Completed | status = Completed | `#00B935` |
| In Progress | status = In Progress or In Review | `#FFEF3C` |
| Overdue | status = Overdue | `#ef4444` |

---

## 4. Tabs

Two tabs separated by a bottom border (`#1e2130`). Active tab = `#6CEEAD` text with a 2px `#6CEEAD` underline indicator; inactive = `#9ca3af`.

1. **Assessment Types** — grid icon (LayoutGrid), default active
2. **All Assessments** — list icon (List) + a count chip (`#1e2130` bg, `#9ca3af` text)

---

## 5. Tab A — Assessment Types

Cards grouped by **category**. Each group has a header: a colored dot (category color) + uppercase category name (`#9ca3af`).

**Card grid:** 1 col mobile → 2 col md → 3 col xl, gap 12px.

### Available type card
- Surface `#13151f`, border `#1e2130`, radius 8px, padding 16px, hover border `#2a2d3a`
- Top row: tier badge (left) + "{n} questions" meta (right)
- Title (14px white) → description (12px `#9ca3af`, clamp 2 lines)
- Footer row: clock icon + estimated time (left) · "Start ›" link (right, turns `#6CEEAD` on hover)

### Locked type card (above current tier)
- Same layout at 50% opacity
- Lock icon pinned top-right
- Title/description rendered in `#4b5563`
- Each locked tier group has a header: lock icon + "Unlocked with OT Plus/Premium", and an **Upgrade** button (tier-colored) when it's the next tier up

---

## 6. Tab B — All Assessments

### Search & filter bar
- Search input (max-width ~384px): `#1e2130` bg, `#2a2d3a` border, search icon left, placeholder "Search assessments…"
- Filter icon button beside it (same styling)

### Table
Container: `#13151f` surface, `#1e2130` border, radius 8px, overflow hidden.

| Column | Content |
|--------|---------|
| Assessment | clipboard icon + type name (white, medium) |
| Subject | `#9ca3af` |
| Assigned To | `#9ca3af` |
| Due Date | `#9ca3af` |
| Score | 16px progress bar + % (green ≥80, yellow ≥60, red <60); `—` if none |
| Status | pill with icon — colors per status table below |

Header row: 12px uppercase `#9ca3af` labels, bottom border. Rows: hover `#1a1d2a`, bottom border `#1e2130`, clickable. Empty state: centered "No assessments match your search" (`#4b5563`).

### Status pill styles
| Status | Background | Text | Icon |
|--------|-----------|------|------|
| Completed | `#00B935`/10 | `#00B935` | CheckCircle |
| In Progress | `#FFEF3C`/10 | `#FFEF3C` | Clock |
| In Review | `#0788F7`/10 | `#0788F7` | Clock |
| Not Started | `#4b5563`/10 | `#9ca3af` | Circle |
| Overdue | `#ef4444`/10 | `#ef4444` | AlertCircle |

---

## 7. Icons (lucide-react)
Lock, ChevronRight, Search, Filter, Plus, Clock, CheckCircle2, AlertCircle, Circle, Sparkles, ClipboardList, LayoutGrid, List. Standard sizes: 14px (meta/status), 16px (buttons/tabs).

---

## 8. Recommended Figma Frame Setup
- **Frame:** 1440 × auto, fill `#0f1117`
- Build the 4 KPIs and the type card as **Components** with variants (tier, status) so you can reuse them
- Use Auto Layout: vertical stacks for sections, horizontal for the KPI row and tabs, grid (wrap) for the card grids
- Create color + text styles from the token tables above first, then apply them
