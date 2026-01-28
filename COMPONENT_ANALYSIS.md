# sekerbura Component Analysis & Fix Guide

## Summary
The `sekerbura` CLI is a component library tool that allows users to install UI components. Currently, only **12 components** are installable, but the `templates.ts` file actually contains **41+ component definitions**. The issue is a **duplicate `drawer` component** entry that's preventing proper compilation.

## Current Installable Components (12)
When you run `sekerbura list`, only these show up:
- button
- card
- input
- textarea
- select
- badge
- alert
- label
- avatar
- checkbox
- switch
- skeleton

## Components Defined in templates.ts (41+)

### Basic Components
- ✅ button
- ✅ card
- ✅ input
- ✅ textarea  
- ✅ select
- ✅ badge
- ✅ alert
- ✅ label
- ✅ avatar
- ✅ checkbox
- ✅ switch
- ✅ skeleton

### Advanced Components (Currently NOT Installable)
- accordion
- dialog
- toggle
- slider
- radioGroup
- alertDialog
- tabs
- popover
- hoverCard
- progress
- tooltip
- separator
- table
- dropdownMenu
- menubar
- pagination
- command
- collapsible
- breadcrumb
- contextMenu
- drawer
- toast
- carousel
- calendar
- timeline
- charts
- form
- combobox
- navigationMenu
- sheet
- scrollArea
- aspectRatio

## The Problem: Duplicate `drawer` Definition

The `drawer` component is defined **TWICE** in `src/templates.ts`:

1. **First definition**: Lines 1925-1976
2. **Second definition**: Lines 2688-2805

In JavaScript objects, when a key is defined twice, only the **last** one is kept. However, this causes issues during TypeScript compilation and may cause the build to hang or fail.

## How to Fix

### Step 1: Remove the First Drawer Definition

Delete lines **1924-1977** in `src/templates.ts`. These lines contain:

```typescript
  drawer: `"use client";
import * as React from "react";
import { Drawer as DrawerPrimitive } from "vaul";
... (entire first drawer component code)
export { Drawer, DrawerPortal, DrawerOverlay, DrawerTrigger, DrawerClose, DrawerContent, DrawerHeader, DrawerFooter, DrawerTitle, DrawerDescription };
`,
```

Keep only the second drawer definition that appears later in the file (around line 2688).

### Step 2: Rebuild the Project

After removing the duplicate, run:

```bash
npm run build
```

This will compile the TypeScript code and generate the dist files.

### Step 3: Test Component Listing

Run:

```bash
npx sekerbura list
```

You should now see ALL 41+ components listed!

### Step 4: Test Component Installation

Try installing the drawer component:

```bash
npx sekerbura add drawer
```

This should now work successfully!

## Why This Happens

The `COMPONENTS_LIST` is generated from the keys of the `TEMPLATES` object:

```typescript
export const COMPONENTS_LIST = Object.keys(TEMPLATES) as ComponentName[];
```

When JavaScript encounters duplicate keys in an object literal, only the last one is kept. However, the TypeScript compiler may get confused during the parsing phase, causing build issues.

## Usage Examples

After fixing, you can install any component like:

```bash
npx sekerbura add tooltip
npx sekerbura add dropdown
npx sekerbura add tabs
npx sekerbura add calendar
# ... and so on for all 41+ components
```

Each component will:
1. Create a `.tsx` file in your components directory
2. Automatically install required dependencies (from the `DEPENDENCIES` object)
3. Provide you with import instructions

## Additional Notes

- All components follow the shadcn/ui design system
- Components use Tailwind CSS for styling
- Most advanced components depend on Radix UI primitives
- The `cn` utility function is required (from `@/lib/utils`)

## Component Dependencies

Here are some notable component dependencies:

- **tooltip**: `@radix-ui/react-tooltip`
- **dropdown**: `@radix-ui/react-dropdown-menu`, `lucide-react`
- **calendar**: `react-day-picker`, `lucide-react`, `date-fns`
- **carousel**: `embla-carousel-react`, `lucide-react`
- **drawer**: `vaul`
- **form**: `react-hook-form`, `@radix-ui/react-label`, `@radix-ui/react-slot`, `zod`, `@hookform/resolvers`
- **charts**: `recharts`, `lucide-react`

The CLI will automatically install these dependencies when you add a component!
