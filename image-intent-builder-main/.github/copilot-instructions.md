# AI Agent Instructions for Image Intent Builder

## Project Overview
This is a modern React application built with Vite, TypeScript, and shadcn/ui components. It's a business management dashboard with features for inventory, sales, purchases, and analytics.

## Key Architecture Patterns

### Component Structure
- **UI Components** (`src/components/ui/`):
  ```tsx
  // Example button component with variants (from button.tsx)
  const buttonVariants = cva(
    "inline-flex items-center justify-center gap-2...",
    {
      variants: {
        variant: {
          default: "bg-primary text-primary-foreground hover:bg-primary/90",
          destructive: "bg-destructive text-destructive-foreground...",
          // ... other variants
        }
      }
    }
  );
  ```

- **Shared Components** (`src/components/`):
  ```tsx
  // Example navigation structure (from AppSidebar.tsx)
  const menuItems = [
    { title: "Dashboard", url: "/", icon: LayoutDashboard },
    { title: "Inventory", url: "/inventory", icon: Package },
    // ... other menu items
  ];
  ```

- **Page Components** (`src/pages/`): Follow a flat structure with consistent routing in `App.tsx`
- **Custom Hooks** (`src/hooks/`): Centralized hooks for shared functionality

### State Management & Data Flow

#### Database Integration (Supabase)
```typescript
// src/integrations/supabase/client.ts
import { createClient } from '@supabase/supabase-js';
import type { Database } from './types';

export const supabase = createClient<Database>(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY
);
```

#### React Query Usage
```tsx
// Example query pattern
const { data, isLoading } = useQuery({
  queryKey: ['resourceName'],
  queryFn: async () => {
    const { data, error } = await supabase
      .from('table')
      .select('*');
    if (error) throw error;
    return data;
  }
});
```

#### Environment Requirements
```bash
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_PUBLISHABLE_KEY=your_supabase_key
```

### UI/UX Patterns

#### Theme System
```tsx
// ThemeSwitcher.tsx example
export function ThemeSwitcher() {
  const [theme, setTheme] = useState<Theme>("dark");

  const applyTheme = (newTheme: Theme) => {
    const root = document.documentElement;
    root.removeAttribute("data-theme");
    root.classList.remove("dark");
    // ... theme application logic
  };
}
```

#### Layout & Responsive Design
```tsx
// Base layout pattern (App.tsx)
<div className="flex min-h-screen w-full bg-background">
  <AppSidebar />
  <div className="flex-1 flex flex-col">
    <AppHeader />
    <main className="flex-1 overflow-auto">
      {/* Page content */}
    </main>
  </div>
</div>
```

#### Data Visualization
```tsx
// Dashboard charts example
<DashboardCard title="Actual Details & Pie Chart">
  <ResponsiveContainer width="100%" height={200}>
    <PieChart>
      <Pie data={pieData} />
    </PieChart>
  </ResponsiveContainer>
</DashboardCard>
```

#### Toast Notifications
```tsx
// Import toast from either system:
import { toast } from "@/components/ui/toast"
import { toast } from "@/components/ui/sonner"

// Usage
toast({
  title: "Action completed",
  description: "Your changes have been saved"
})
```

## Development Workflow

### Setup Commands
```bash
npm install    # Install dependencies
npm run dev    # Start development server
npm run build  # Production build
npm run lint   # Run ESLint
```

### Component Development Guidelines

#### 1. Using shadcn/ui Components
```tsx
// Example of composing UI components
import { Button } from "@/components/ui/button"
import { toast } from "@/components/ui/toast"

export function ActionButton() {
  return (
    <Button 
      variant="gradient"
      size="lg"
      onClick={() => toast({ title: "Action completed" })}
    >
      Click Me
    </Button>
  );
}
```

#### 2. Page Structure Pattern
```tsx
// Example page structure
export default function PageName() {
  return (
    <div className="p-6 space-y-6">
      <DashboardCard title="Section Title">
        {/* Card content */}
      </DashboardCard>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Responsive grid layout */}
      </div>
    </div>
  );
}
```

#### 3. Common Responsive Patterns
```tsx
// Mobile-first design examples
"w-full md:w-1/2 lg:w-1/3"  // Width breakpoints
"grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3"  // Grid columns
"flex-col md:flex-row"  // Stack to row layout
"hidden md:block"  // Responsive visibility
```

#### 4. Data Fetching Pattern
```tsx
// Example data hook
function useResourceData() {
  return useQuery({
    queryKey: ['resource'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('resource')
        .select('*');
      if (error) throw error;
      return data;
    }
  });
}

### Common Patterns
- Toasts: Import from `@/components/ui/toast` and `use-toast.ts`
- Routing: Add new routes in `App.tsx` following existing pattern
- Database: Use `supabase` client from `@/integrations/supabase/client`

## Integration Points
- Supabase: Database and authentication (`src/integrations/supabase/`)
- React Router: Navigation and routing (`App.tsx`)
- shadcn/ui: UI component library (`components/ui/`)

## Project-Specific Notes
- The project uses a specific folder structure defined by Lovable.dev
- Custom domain setup available through Lovable.dev settings
- Changes can be made via Lovable interface or direct code edits