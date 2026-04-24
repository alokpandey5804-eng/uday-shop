# Design Brief

## Direction
Uday — Professional e-commerce platform with Flipkart-inspired commerce hierarchy, blue primary action cues, and silver surface stratification.

## Tone
Clean, purposeful, commerce-confident. Professional retail interface that prioritizes product discovery and checkout clarity over decoration.

## Differentiation
Strong blue primary (#1a73e8 OKLCH) as universal action/CTA signal; distinctive header elevation creates immediate category separation; consistent card-based surface treatment builds visual rhythm.

## Color Palette

| Token      | OKLCH           | Role                            |
| ---------- | --------------- | ------------------------------- |
| background | 0.99 0.005 230  | Main content area (light cream) |
| foreground | 0.15 0.015 230  | Dark text/primary labels        |
| card       | 1.0 0.0 0       | Product cards, modals (white)   |
| primary    | 0.55 0.15 255   | Action CTAs, headers, focus     |
| secondary  | 0.95 0.01 230   | Secondary UI (light silver)     |
| muted      | 0.94 0.008 230  | Disabled, tertiary states       |
| accent     | 0.55 0.15 255   | Highlights, active indicators   |
| destructive| 0.55 0.22 25    | Destructive actions, errors     |

## Typography
- Display: Space Grotesk — bold product headings, hero text (600–700 weight)
- Body: Plus Jakarta Sans — product descriptions, labels, UI copy (400–600 weight)
- Mono: JetBrains Mono — price values, codes (400 weight)

## Elevation & Depth
Subtle box shadows on cards (`shadow-xs`/`shadow-sm`) create depth without visual noise; header uses primary background fill with bottom border for clear separation; footer uses light muted background with top border.

## Structural Zones

| Zone    | Background            | Border              | Notes                           |
| ------- | --------------------- | ------------------- | ------------------------------- |
| Header  | primary (blue)        | none                | White text, navigation, logo    |
| Content | background (cream)    | —                   | Product grid, alternating card  |
| Sidebar | secondary (light)     | border right        | Filters, categories (light blue) |
| Footer  | secondary (light)     | border top          | Links, copyright               |

## Spacing & Rhythm
Grid gap 1rem (16px); card padding 1rem; section gaps 2rem (32px); consistent 8px baseline rhythm for compact, aligned layouts.

## Component Patterns
- Buttons: blue background, white text, 6px radius, no shadow (primary=active)
- Cards: white background, 6px radius, subtle shadow, light border
- Inputs: light gray border, 6px radius, blue focus ring, 4px focus offset
- Badges: light muted background, dark text, rounded pill (24px)

## Motion
Entrance: fade-in 200ms on page load; Hover: 150ms background/border transition on buttons; Decorative: none (productivity focus).

## Constraints
- No gradients; solid OKLCH colors only
- Max shadow depth: `shadow-sm` for elevated feel
- Blue reserved for primary CTAs only; no scattered accent colors
- 6px border-radius on all interactive elements (consistency)
- Dark mode uses cool blue primary (0.72 0.16 255) with dim backgrounds

## Signature Detail
Strong blue header with white typography creates instant retail authority and CTA clarity; consistent card elevation structure makes product browsing intuitive.
