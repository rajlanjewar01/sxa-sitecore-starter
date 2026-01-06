# ThemeContext Implementation Explanation

## 📚 Overview
Your `ThemeContext` is a React Context API implementation that manages theme state (light/dark mode) across your application. It allows multiple components to share and update the same theme state without prop drilling.

---

## 🔧 Step-by-Step: Creating the Context

### Step 1: Define Types and Interface
```typescript
type Theme = 'light' | 'dark';

interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
}
```
- **Purpose**: TypeScript types ensure type safety
- `Theme`: Only allows 'light' or 'dark' values
- `ThemeContextType`: Defines what data/functions the context will provide

### Step 2: Create the Context
```typescript
const ThemeContext = createContext<ThemeContextType | undefined>(undefined);
```
- **Purpose**: Creates the context container
- `undefined` is the default value (used if context is accessed outside provider)
- The context itself doesn't hold data yet - it's just a "channel" for sharing

### Step 3: Create the Provider Component
```typescript
export const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const [theme, setTheme] = useState<Theme>('light');
  // ... rest of logic
}
```
- **Purpose**: Wraps your app/components and provides theme state
- Uses `useState` to manage the actual theme value
- `children` prop allows wrapping other components

### Step 4: Add Persistence Logic
```typescript
useEffect(() => {
  const savedTheme = localStorage.getItem('apple-nav-theme') as Theme;
  if (savedTheme) setTheme(savedTheme);
}, []);
```
- **Purpose**: Loads saved theme when component mounts
- Checks `localStorage` for previously saved theme
- Only runs once on mount (empty dependency array `[]`)

### Step 5: Create Toggle Function
```typescript
const toggleTheme = () => {
  const finalTheme = theme === 'light' ? 'dark' : 'light';
  setTheme(finalTheme);
  localStorage.setItem('apple-nav-theme', finalTheme);
};
```
- **Purpose**: Switches between light and dark themes
- Updates state AND saves to localStorage for persistence

### Step 6: Provide the Context Value
```typescript
return (
  <ThemeContext.Provider value={{ theme, toggleTheme }}>
    <div className={`theme-container ${theme === 'dark' ? 'dark-mode' : ''}`}>
      {children}
    </div>
  </ThemeContext.Provider>
);
```
- **Purpose**: Makes `theme` and `toggleTheme` available to all child components
- Wraps children in a div with theme class for CSS styling

### Step 7: Create Custom Hook
```typescript
export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) throw new Error('useTheme must be used within a ThemeProvider');
  return context;
};
```
- **Purpose**: Easy way for components to access theme
- Includes error handling if used outside provider
- Returns `{ theme, toggleTheme }`

---

## 🎯 How It's Used in Your Codebase

### Usage Location 1: `index.tsx` (Navbar Component)

#### Step 1: Import the Provider and Hook
```typescript
import { ThemeProvider, useTheme } from './context/ThemeContext';
```

#### Step 2: Wrap Components with Provider (Line 105)
```typescript
const AppleNavbar = ({ fields }: NavbarProps): JSX.Element => {
  return (
    <ThemeProvider>  {/* 👈 Provider wraps everything */}
      <NavbarContent navItems={fields?.navItems || []} />
      <HeroBanner />
    </ThemeProvider>
  );
};
```
- **Why here?**: This is the top-level component
- Both `NavbarContent` and `HeroBanner` are children, so they can access the context

#### Step 3: Use the Hook Inside NavbarContent (Line 17)
```typescript
const NavbarContent = ({ navItems }: { navItems: NavItem[] }) => {
  const { theme, toggleTheme } = useTheme();  // 👈 Extract theme and toggle function
  
  // ... rest of component
}
```
- **What happens**: `useTheme()` connects to the nearest `ThemeProvider` above it
- Gets current `theme` value and `toggleTheme` function

#### Step 4: Use Theme in UI (Lines 78-82)
```typescript
<li className={styles.navbar__item} onClick={toggleTheme}>
  <div className={styles.themeToggle}>
    {theme === 'light' ? '🌙' : '☀️'}  {/* 👈 Shows moon in light mode, sun in dark */}
  </div>
</li>
```
- **Purpose**: Theme toggle button in navbar
- Shows 🌙 when light (clicking will switch to dark)
- Shows ☀️ when dark (clicking will switch to light)
- `onClick={toggleTheme}` calls the toggle function

---

### Usage Location 2: `HeroBanner.tsx`

#### Step 1: Import the Hook
```typescript
import { useTheme } from '../context/ThemeContext';
```

#### Step 2: Use the Hook (Line 6)
```typescript
const HeroBanner = () => {
  useTheme();  // 👈 Connects to context
  
  return (
    // ... JSX
  );
};
```
- **Why call it?**: Even though you're not using `theme` or `toggleTheme` directly here, calling `useTheme()` ensures:
  1. Component subscribes to theme changes (will re-render when theme changes)
  2. Error is thrown if component is used outside ThemeProvider (safety check)
  3. Future-proof: easy to add theme-based styling later

#### Potential Enhancement:
If you want HeroBanner to react to theme changes, you could use it like:
```typescript
const HeroBanner = () => {
  const { theme } = useTheme();  // Extract theme
  
  return (
    <section className={`${styles.heroBanner} ${theme === 'dark' ? styles.dark : ''}`}>
      {/* ... */}
    </section>
  );
};
```

---

## 🔄 Data Flow Diagram

```
ThemeProvider (index.tsx line 105)
    │
    ├─ Provides: { theme: 'light', toggleTheme: function }
    │
    ├─ NavbarContent (index.tsx line 16)
    │   │
    │   └─ useTheme() → Gets { theme, toggleTheme }
    │   │
    │   └─ Uses theme to show 🌙/☀️ icon (line 80)
    │   └─ Uses toggleTheme in onClick (line 78)
    │
    └─ HeroBanner (HeroBanner.tsx line 5)
        │
        └─ useTheme() → Subscribes to theme changes
```

---

## 🎓 Key Concepts

### 1. **Context Provider Pattern**
- Provider wraps components that need access
- Only children of Provider can use the context
- Provider holds the actual state

### 2. **Custom Hook Pattern**
- `useTheme()` is a convenience wrapper around `useContext(ThemeContext)`
- Provides error handling and cleaner API
- Follows React hooks naming convention (`use*`)

### 3. **State Management**
- State lives in `ThemeProvider` component
- Multiple components can read/write the same state
- Changes propagate to all components using the hook

### 4. **Persistence**
- `localStorage` saves theme preference
- Theme persists across page refreshes
- Loaded on component mount

---

## ✅ Benefits of This Approach

1. **No Prop Drilling**: Don't need to pass `theme` through multiple component layers
2. **Centralized State**: Single source of truth for theme
3. **Easy to Use**: Just call `useTheme()` in any component
4. **Type Safe**: TypeScript ensures correct usage
5. **Persistent**: Theme preference saved in browser

---

## 🚀 How to Add Theme to More Components

Simply import and use:
```typescript
import { useTheme } from './context/ThemeContext';

const MyComponent = () => {
  const { theme, toggleTheme } = useTheme();
  
  return (
    <div className={theme === 'dark' ? 'dark-styles' : 'light-styles'}>
      <button onClick={toggleTheme}>Toggle Theme</button>
    </div>
  );
};
```

Make sure `MyComponent` is rendered inside `<ThemeProvider>`!

