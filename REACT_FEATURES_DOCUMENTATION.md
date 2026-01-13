# React Features Documentation

This comprehensive guide explores all the React features implemented in our Sitecore JSS Next.js application. Each section demonstrates practical usage with code examples from our actual components.

## Table of Contents

1. [Hooks](#hooks)
   - [useState](#usestate)
   - [useEffect](#useeffect)
   - [useMemo](#usememo)
   - [useRef](#useref)
   - [useContext](#usecontext)

2. [Custom Hooks](#custom-hooks)
3. [Context API](#context-api)
4. [Conditional Rendering](#conditional-rendering)
5. [Refs and Forward Refs](#refs-and-forward-refs)
6. [Form Handling](#form-handling)
7. [Class Components](#class-components)
8. [Higher-Order Components](#higher-order-components)
9. [Event Handling](#event-handling)
10. [Component Composition](#component-composition)
11. [Lists and Keys](#lists-and-keys)
12. [Styling Approaches](#styling-approaches)
13. [Sitecore JSS Integration](#sitecore-jss-integration)
14. [Next.js Integration](#nextjs-integration)

---

## Hooks

React Hooks are functions that let you "hook into" React state and lifecycle features from function components.

### useState

`useState` is a Hook that lets you add React state to function components.

**Example from Navbar component:**
```tsx
const [activeTabId, setActiveTabId] = useState<string | null>(null);
const [isOpen, setIsOpen] = useState(false);
const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
const [isSearchOpen, setIsSearchOpen] = useState(false);
const [isStoreLocatorOpen, setIsStoreLocatorOpen] = useState(false);
```

**Example from StoreLocator component:**
```tsx
const [searchTerm, setSearchTerm] = useState('');
const [filteredStores, setFilteredStores] = useState(stores);
```

**Features demonstrated:**
- Multiple state variables in one component
- TypeScript typing for state
- State updates triggering re-renders

### useEffect

`useEffect` lets you perform side effects in function components.

**Example from useMediaQuery custom hook:**
```tsx
useEffect(() => {
    const media = window.matchMedia(query);

    if (media.matches !== matches) {
        setMatches(media.matches);
    }

    const listener = () => setMatches(media.matches);

    media.addEventListener('change', listener);

    return () => media.removeEventListener('change', listener);
}, [matches, query]);
```

**Example from ThemeContext:**
```tsx
useEffect(() => {
    const savedTheme = localStorage.getItem('apple-nav-theme') as Theme;
    if (savedTheme) setTheme(savedTheme);
}, []);
```

**Features demonstrated:**
- Dependency arrays
- Cleanup functions
- localStorage integration
- Media query listeners

### useMemo

`useMemo` returns a memoized value that only recalculates when dependencies change.

**Example from Navbar component:**
```tsx
const activeItem = useMemo(() =>
    navItems.find((item) => item.id === activeTabId),
    [navItems, activeTabId]
);
```

**Example from Tabs component:**
```tsx
const filteredProducts = useMemo(() => {
    if (activeTab === 'All products') return products;
    return products.filter(product => product.category === activeTab);
}, [activeTab, products]);
```

**Features demonstrated:**
- Performance optimization
- Complex computations
- Array filtering and finding

### useRef

`useRef` returns a mutable ref object that persists across renders.

**Example from Navbar component:**
```tsx
const storeLocatorRef = useRef<HTMLElement | null>(null);

// Usage in JSX
<StoreLocator isOpen={isStoreLocatorOpen} ref={storeLocatorRef} />

// Usage in effect
setTimeout(() => {
    storeLocatorRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
}, 0);
```

**Features demonstrated:**
- DOM manipulation
- Accessing component refs
- TypeScript typing

### useContext

`useContext` lets you read and subscribe to React context.

**Example from Navbar component:**
```tsx
const { theme, toggleTheme } = useTheme();
```

---

## Custom Hooks

Custom hooks are JavaScript functions that start with "use" and can call other hooks.

### useMediaQuery

A custom hook for responsive design that tracks media query matches.

```tsx
export const useMediaQuery = (query: string): boolean => {
    const [matches, setMatches] = useState(false);

    useEffect(() => {
        const media = window.matchMedia(query);

        if (media.matches !== matches) {
            setMatches(media.matches);
        }

        const listener = () => setMatches(media.matches);

        media.addEventListener('change', listener);

        return () => media.removeEventListener('change', listener);
    }, [matches, query]);

    return matches;
};

// Usage
const isDesktop = useMediaQuery('(min-width: 1025px)');
```

### useTheme

A custom hook that provides theme context and toggle functionality.

```tsx
export const useTheme = () => {
    const context = useContext(ThemeContext);
    if (!context) throw new Error('useTheme must be used within a ThemeProvider');
    return context;
};
```

---

## Context API

Context provides a way to pass data through the component tree without having to pass props down manually at every level.

### ThemeContext Implementation

**Context Creation:**
```tsx
const ThemeContext = createContext<ThemeContextType | undefined>(undefined);
```

**Provider Component:**
```tsx
export const ThemeProvider = ({ children }: { children: ReactNode }) => {
    const [theme, setTheme] = useState<Theme>('light');

    useEffect(() => {
        const savedTheme = localStorage.getItem('apple-nav-theme') as Theme;
        if (savedTheme) setTheme(savedTheme);
    }, []);

    const toggleTheme = () => {
        const finalTheme = theme === 'light' ? 'dark' : 'light';
        setTheme(finalTheme);
        localStorage.setItem('apple-nav-theme', finalTheme);
    };

    return (
        <ThemeContext.Provider value={{ theme, toggleTheme }}>
            <div className={`theme-container ${theme === 'dark' ? 'dark-mode' : ''}`}>
                {children}
            </div>
        </ThemeContext.Provider>
    );
};
```

**Consumer Hook:**
```tsx
export const useTheme = () => {
    const context = useContext(ThemeContext);
    if (!context) throw new Error('useTheme must be used within a ThemeProvider');
    return context;
};
```

**Features demonstrated:**
- Global state management
- localStorage persistence
- Error boundaries for context usage
- CSS class application based on context

---

## Conditional Rendering

React allows you to render different components or elements based on conditions.

### Conditional Rendering Patterns

**Ternary Operator:**
```tsx
{theme === 'light' ? '🌙' : '☀️'}
```

**Short-circuit Evaluation:**
```tsx
{tag && <Text tag="p" className={styles.tag} field={{ value: tag }} />}
```

**Conditional Component Rendering:**
```tsx
{filteredStores.length > 0 ? (
    <div className={styles.cardGrid}>
        {filteredStores.map((store) => (
            <StoreCard key={store.id} {...store} />
        ))}
    </div>
) : (
    <div className={styles.noResults}>
        <p>No stores found matching your search.</p>
    </div>
)}
```

**Dynamic Class Names:**
```tsx
<header className={`${styles.navWrapper} ${isMobileMenuOpen ? styles.navWrapper_expanded : ''}`}>
```

---

## Refs and Forward Refs

Refs provide a way to access DOM nodes or React elements created in the render method.

### useRef Example

```tsx
const storeLocatorRef = useRef<HTMLElement | null>(null);

// Scroll to element
storeLocatorRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
```

### forwardRef Example

```tsx
export const StoreLocator = forwardRef<HTMLElement | null, StoreLocatorProps>(
    ({ isOpen }, ref) => {
        if (!isOpen) return null;

        return (
            <section className={styles.storeLocator} ref={ref as any}>
                {/* content */}
            </section>
        );
    }
);
```

---

## Form Handling

Handling user input through forms and controlled components.

### Controlled Input Example

```tsx
const [searchTerm, setSearchTerm] = useState('');

<input
    type="text"
    placeholder="Search by location, ZIP, or store name"
    className={styles.searchInput}
    value={searchTerm}
    onChange={(e) => setSearchTerm(e.target.value)}
/>
```

### Form with Debounced Search

```tsx
useEffect(() => {
    const timer = setTimeout(() => {
        const results = stores.filter(store =>
            store.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            store.address.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setFilteredStores(results);
    }, 300); // 300ms debounce

    return () => clearTimeout(timer);
}, [searchTerm]);
```

---

## Class Components

Traditional React class components with state and lifecycle methods.

### Class Component Example

```tsx
class StyleguideLayoutTabs extends React.Component<
    StyleguideLayoutTabsProps,
    StyleguideLayoutTabsState
> {
    constructor(props: StyleguideLayoutTabsProps) {
        super(props);

        this.state = {
            activeTabIndex: 0,
        };

        this.setActiveTab = this.setActiveTab.bind(this);
    }

    setActiveTab(index: number) {
        this.setState({ activeTabIndex: index });
    }

    render() {
        // component logic
    }
}
```

---

## Higher-Order Components

Functions that take a component and return a new component with additional props or behavior.

### withDatasourceCheck

```tsx
const ContentBlock = ({ fields }: ContentBlockProps): JSX.Element => (
    <div className="contentBlock">
        <Text tag="h2" className="contentTitle" field={fields.heading} />
        <RichText className="contentDescription" field={fields.content} />
    </div>
);

export default withDatasourceCheck()<ContentBlockProps>(ContentBlock);
```

### withPlaceholder

```tsx
const tabsComponentWithPlaceholderInjected = withPlaceholder({
    placeholder: 'jss-tabs',
    prop: 'tabsPlaceholder',
})(StyleguideLayoutTabs);
```

### withSitecoreContext

```tsx
const tabsWithPlaceholderAndSitecoreContext = withSitecoreContext()<StyleguideLayoutTabsProps>(
    tabsComponentWithPlaceholderInjected
);
```

---

## Event Handling

Handling user interactions through event handlers.

### Click Handlers

```tsx
<button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
    <span className={isMobileMenuOpen ? styles.hamburger_iconOpen : styles.hamburger_icon} />
</button>
```

### Mouse Events

```tsx
<header onMouseLeave={handleMouseLeave}>
```

### Form Events

```tsx
<input onChange={(e) => setSearchTerm(e.target.value)} />
```

---

## Component Composition

Building complex UIs by combining smaller components.

### Component Props Passing

```tsx
<MenuItem
    key={item.id}
    item={item}
    isDesktop={isDesktop}
    activeTabId={activeTabId}
    setActiveTabId={setActiveTabId}
    setIsOpen={setIsOpen}
    onSearchClick={() => setIsSearchOpen(true)}
    onStoreClick={item.id === 'store-link' ? handleStoreClick : undefined}
/>
```

### Children as Props

```tsx
<ThemeProvider>
    <NavbarContent navItems={fields?.navItems || []} />
    <EntertainmentCarousel />
</ThemeProvider>
```

---

## Lists and Keys

Rendering lists of components with proper keys for React's reconciliation.

### Array Mapping

```tsx
{navItems.map((item) => (
    <MenuItem key={item.id} item={item} />
))}

{tabsList.map((tab) => (
    <li key={tab} role="presentation">
        <button onClick={() => handleTabClick(tab)}>
            <Text field={{ value: tab }} />
        </button>
    </li>
))}
```

### Conditional Lists

```tsx
{filteredStores.map((store) => (
    <StoreCard key={store.id} {...store} />
))}
```

---

## Styling Approaches

Various methods for styling React components.

### CSS Modules

```tsx
import styles from './Tabs.module.scss';

<div className={styles.card}>
    <div className={styles.imageContainer}>
```

### Dynamic Class Names

```tsx
const containerClass = `${styles.sectionContainer} ${variant === 'featured' ? styles.variantFeatured : ''}`;
```

### CSS Variables

```tsx
:root {
    --text-primary: #{$color-text-primary-light};
    --tab-bg-active: #{$black};
}

.tabButton {
    background-color: var(--tab-bg-inactive);
    &.active {
        background-color: var(--tab-bg-active);
    }
}
```

---

## Sitecore JSS Integration

Integration with Sitecore JSS for content management.

### Field Components

```tsx
import { Text, RichText, Image as JssImage } from '@sitecore-jss/sitecore-jss-nextjs';

// Real Sitecore fields
<Text tag="h2" field={fields.heading} />
<RichText field={fields.content} />

// Simulated fields for development
<Text tag="h1" field={{ value: categoryTitle }} />
<JssImage field={{ value: { src: image, alt: title } }} />
```

### Component Props Interface

```tsx
type ContentBlockProps = ComponentProps & {
    fields: {
        heading: Field<string>;
        content: Field<string>;
    };
};
```

### Placeholders

```tsx
manifest.addComponent({
    name: 'Styleguide-Layout-Tabs',
    placeholders: ['jss-tabs'],
});
```

---

## Next.js Integration

Integration with Next.js framework features.

### Custom App Component

```tsx
function App({ Component, pageProps }: AppProps<SitecorePageProps>): JSX.Element {
    const { dictionary, ...rest } = pageProps;

    return (
        <I18nProvider lngDict={dictionary} locale={pageProps.locale}>
            <Component {...rest} />
        </I18nProvider>
    );
}
```

### Router Events

```tsx
Router.events.on('routeChangeStart', () => NProgress.start());
Router.events.on('routeChangeComplete', () => NProgress.done());
Router.events.on('routeChangeError', () => NProgress.done());
```

### getInitialProps

```tsx
ErrorPage.getInitialProps = ({ res, err }) => {
    const statusCode = res ? res.statusCode : err ? err.statusCode : 404;
    return { statusCode };
};
```

---

## Summary Table

| Feature Category | Specific Features | Components Using | Key Benefits |
|------------------|-------------------|------------------|--------------|
| **Hooks** | useState, useEffect, useMemo, useRef, useContext | Navbar, Tabs, StoreLocator, ThemeContext | State management, side effects, performance optimization |
| **Custom Hooks** | useMediaQuery, useTheme | Navbar, ThemeContext | Reusable logic, cleaner components |
| **Context API** | createContext, Provider, useContext | ThemeContext | Global state, prop drilling elimination |
| **Conditional Rendering** | Ternary, &&, dynamic classes | All components | Dynamic UI based on state |
| **Refs** | useRef, forwardRef | Navbar, StoreLocator | DOM access, imperative actions |
| **Form Handling** | Controlled inputs, debounced search | StoreLocator | User input management |
| **Class Components** | State, lifecycle, binding | Styleguide components | Legacy patterns, complex state |
| **HOCs** | withDatasourceCheck, withPlaceholder | ContentBlock, Styleguide | Code reuse, cross-cutting concerns |
| **Event Handling** | onClick, onChange, onMouseLeave | All interactive components | User interaction |
| **Lists & Keys** | Array.map, key props | Navbar, Tabs, StoreLocator | Dynamic content rendering |
| **Styling** | CSS Modules, CSS Variables | All components | Scoped styles, theming |
| **Sitecore JSS** | Field components, placeholders | ContentBlock, Tabs, Styleguide | CMS integration |
| **Next.js** | Router events, getInitialProps | _app.tsx, _error.tsx | SSR, routing, error handling |

This documentation covers all major React features implemented in our application, providing practical examples and demonstrating best practices for modern React development with Sitecore JSS and Next.js.</content>
<parameter name="filePath">c:\Users\raj.lanjewar\Desktop\xm cloud\nextjs\REACT_FEATURES_DOCUMENTATION.md