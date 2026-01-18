# sekerbura - Component CLI Library

A professional, self-contained CLI tool for distributing minimalist React components. Similar to Shadcn/ui but built from scratch with your own branding.

## Installation

```bash
npm install -g sekerbura
```

Or use directly with npx:

```bash
npx sekerbura add button
```

## Quick Start

### 1. Initialize sekerbura (Optional)

```bash
npx sekerbura init
```

This will:
- Create `src/lib/utils.ts` with the `cn()` utility
- Install core dependencies (clsx, tailwind-merge, class-variance-authority)

### 2. Add Components

```bash
npx sekerbura add button
npx sekerbura add card
```

This will:
- Create the component in `src/components/sekerbura/<component>.tsx`
- Auto-detect your project type (Next.js/Vite)
- Install missing dependencies
- Show import instructions

### 3. Use in Your Code

```tsx
import { Button } from "@/components/sekerbura/button";

export default function App() {
  return <Button variant="default">Click me</Button>;
}
```

## Available Components

- **button** - Minimalist button with variants: default, secondary, outline, ghost, destructive, link
- **card** - Clean card component with CardHeader, CardTitle, CardDescription, CardContent, CardFooter
- **input** - Text input field with focus ring and accessibility
- **textarea** - Multi-line text input with resizable option
- **select** - Dropdown select component
- **badge** - Label badges with variants: default, secondary, outline
- **alert** - Alert component with AlertTitle and AlertDescription
- **avatar** - Image wrapper with fallback support
- **checkbox** - Custom styled checkbox
- **switch** - Toggle switch
- **label** - Standard accessible label
- **skeleton** - Loading placeholder animation

View all available components:

```bash
npx sekerbura list
```

## CLI Commands

### `npx sekerbura add <component>`

Add a component to your project.

```bash
npx sekerbura add button
npx sekerbura add card
```

### `npx sekerbura list`

List all available components.

```bash
npx sekerbura list
```

### `npx sekerbura init`

Initialize sekerbura in your project (creates utils, installs dependencies).

```bash
npx sekerbura init
```

## Project Structure

After adding components, your project structure looks like:

```
your-project/
├── src/
│   ├── components/
│   │   └── sekerbura/
│   │       ├── button.tsx
│   │       └── card.tsx
│   ├── lib/
│   │   └── utils.ts        # cn() utility created automatically
│   └── ...
├── package.json
└── ...
```

## Supported Frameworks

- **Next.js** (App Router and Pages Router)
- **Vite** + React
- Any project with Tailwind CSS

## Supported Package Managers

- npm
- yarn
- pnpm

The CLI automatically detects which package manager you're using based on lock files.

## Requirements

- Node.js >= 14.0.0
- Tailwind CSS configured in your project
- React (v16.8+)
- TypeScript (optional but recommended)

## Automatic Dependencies

sekerbura automatically installs and manages these dependencies:

- `clsx` - Utility for constructing className strings
- `tailwind-merge` - Merge Tailwind CSS classes without conflicts
- `class-variance-authority` - Create component variants

## How It Works

1. **Environment Detection** - Detects your project type and structure
2. **Utils Creation** - Creates `lib/utils.ts` with `cn()` utility if needed
3. **Dependency Check** - Identifies missing dependencies
4. **Auto Install** - Installs missing deps using your package manager
5. **Component Generation** - Creates the component file in the correct location
6. **Import Guide** - Shows you how to import and use the component

## License

MIT - Built by Hummat Azim
