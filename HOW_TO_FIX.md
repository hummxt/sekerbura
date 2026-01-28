# How to Fix sekerbura Components - Step-by-Step Guide

## Problem Summary
The `sekerbura` CLI currently only shows 12 components when you run `sekerbura list`, but the `templates.ts` file actually contains **41+ component definitions**. The issue is that there's a **duplicate `drawer` component** entry causing build/compilation issues.

##  Fix Steps

### Step 1: Remove Duplicate `drawer` Entry

Open `src/templates.ts` and find the FIRST drawer definition (around **line 1925**).

**Delete these lines (approximately lines 1924-1977):**

```typescript
  drawer: `"use client";
import * as React from "react";
import { Drawer as DrawerPrimitive } from "vaul";
import { cn } from "@/lib/utils";

const Drawer = ({ shouldScaleBackground = true, ...props }: React.ComponentProps<typeof DrawerPrimitive.Root>) => (
  <DrawerPrimitive.Root shouldScaleBackground={shouldScaleBackground} {...props} />
);
Drawer.displayName = "Drawer";

const DrawerTrigger = DrawerPrimitive.Trigger;
const DrawerPortal = DrawerPrimitive.Portal;
const DrawerClose = DrawerPrimitive.Close;

const DrawerOverlay = React.forwardRef<React.ElementRef<typeof DrawerPrimitive.Overlay>, React.ComponentPropsWithoutRef<typeof DrawerPrimitive.Overlay>>(({ className, ...props }, ref) => (
  <DrawerPrimitive.Overlay ref={ref} className={cn("fixed inset-0 z-50 bg-black/80", className)} {...props} />
));
DrawerOverlay.displayName = DrawerPrimitive.Overlay.displayName;

const DrawerContent = React.forwardRef<React.ElementRef<typeof DrawerPrimitive.Content>, React.ComponentPropsWithoutRef<typeof DrawerPrimitive.Content>>(({ className, children, ...props },  ref) => (
  <DrawerPortal>
    <DrawerOverlay />
    <DrawerPrimitive.Content ref={ref} className={cn("fixed inset-x-0 bottom-0 z-50 mt-24 flex h-auto flex-col rounded-t-[10px] border border-zinc-200 bg-white", className)} {...props}>
      <div className="mx-auto mt-4 h-2 w-[100px] rounded-full bg-zinc-100" />
      {children}
    </DrawerPrimitive.Content>
  </DrawerPortal>
));
DrawerContent.displayName = "DrawerContent";

const DrawerHeader = ({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) => (
  <div className={cn("grid gap-1.5 p-4 text-center sm:text-left", className)} {...props} />
);
DrawerHeader.displayName = "DrawerHeader";

const DrawerFooter = ({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) => (
  <div className={cn("mt-auto flex flex-col gap-2 p-4", className)} {...props} />
);
DrawerFooter.displayName = "DrawerFooter";

const DrawerTitle = React.forwardRef<React.ElementRef<typeof DrawerPrimitive.Title>, React.ComponentPropsWithoutRef<typeof DrawerPrimitive.Title>>(({ className, ...props }, ref) => (
  <DrawerPrimitive.Title ref={ref} className={cn("text-lg font-semibold leading-none tracking-tight", className)} {...props} />
));
DrawerTitle.displayName = DrawerPrimitive.Title.displayName;

const DrawerDescription = React.forwardRef<React.ElementRef<typeof DrawerPrimitive.Description>, React.ComponentPropsWithoutRef<typeof DrawerPrimitive.Description>>(({ className, ...props }, ref) => (
  <DrawerPrimitive.Description ref={ref} className={cn("text-sm text-zinc-500", className)} {...props} />
));
DrawerDescription.displayName = DrawerPrimitive.Description.displayName;

export { Drawer, DrawerPortal, DrawerOverlay, DrawerTrigger, DrawerClose, DrawerContent, DrawerHeader, DrawerFooter, DrawerTitle, DrawerDescription };
`,
```

**Keep the SECOND drawer definition** that appears later in the file (around line 2688).

### Step 2: Build the Project

After removing the duplicate drawer entry, rebuild the project:

```bash
npm run build
```

This should complete successfully without hanging.

### Step 3: Verify All Components Are Now Available

Test the component listing:

```bash
npx sekerbura list
```

You should now see all **41+ components** including:

- button, card, input, textarea, select, badge, alert, label, avatar, checkbox, switch, skeleton
- accordion, dialog, toggle, slider, radioGroup, alertDialog, tabs
- popover, hoverCard, progress, **tooltip**, separator, table, dropdownMenu
- menubar, pagination, command, collapsible, breadcrumb, contextMenu
- **drawer**, toast, carousel, calendar, timeline, charts, form, combobox, navigationMenu
- sheet, scrollArea, aspectRatio

### Step 4: Test Component Installation

Try installing a component that wasn't available before:

```bash
npx sekerbura add tooltip
```

Or:

```bash
npx sekerbura add drawer
```

These should now work!

##  Why This Happens

In JavaScript/TypeScript objects, when a key is defined twice:

```javascript
const myObject = {
  key: "value1",
  key: "value2"  // This overwrites the first one
}
```

Only the **last** value is kept. However, during TypeScript compilation, the parser may get confused when processing duplicate keys in large objects, causing:
- Build hangs
- Incomplete component lists
- Type errors

## ✅ Expected Result

After fixing the duplicate:

1. **Build works:** `npm run build` completes successfully
2. **All components visible:** `npx sekerbura list` shows 41+ components
3. **All components installable:** `npx sekerbura add <any-component>` works

## 📝 Complete Component List (41+)

### Basic Components (12)
✅ button, card, input, textarea, select, badge, alert, label, avatar, checkbox, switch, skeleton

### Layout & Navigation (8)
accordion, tabs, breadcrumb, separator, navigationMenu, menubar, collapsible, aspectRatio

### Overlays & Modals (6)
dialog, alertDialog, sheet, drawer, popover, hoverCard

### Interactive (7)
toggle, slider, radioGroup, progress, tooltip, dropdown dropdownMenu, contextMenu

### Forms (2)
form, combobox

### Data Display (4)
table, calendar, timeline, charts

### Utilities (3)
scrollArea, command, pagination

### Feedback (2)
toast, carousel

##  Troubleshooting

If you still don't see all components after the fix:

1. **Clear the dist folder:**
   ```bash
   rd /s /q dist
   ```

2. **Rebuild:**
   ```bash
   npm run build
   ```

3. **Check templates.ts has only ONE drawer entry:**
   - Search for `drawer: \`` in the file
   - You should only find ONE occurrence

4. **Verify DEPENDENCIES and TEMPLATES match:**
   - All keys in `DEPENDENCIES` object should have matching keys in `TEMPLATES` object

## 🎉 Success!

Once fixed, you can install ANY Shadcn-style component with:

```bash
npx sekerbura add <component-name>
```

All dependencies will be automatically installed, and the component file will be created in your project!
