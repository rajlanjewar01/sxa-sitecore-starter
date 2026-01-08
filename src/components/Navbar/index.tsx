import { useMemo, useState, useRef } from 'react';
import { ComponentProps } from 'lib/component-props';
import { NavItem } from './types';
import { MenuItem } from './components/MenuItem';
import { SubMenu } from './components/SubMenu';
import { SearchModal } from './components/SearchModal';
import { StoreLocator } from './components/StoreLocator';
import HeroBanner from './components/HeroBanner';
import { useMediaQuery } from './hooks/useMediaQuery'; 
import { ThemeProvider, useTheme } from './context/ThemeContext';

import styles from './scss/Navbar.module.scss';

type NavbarProps = ComponentProps & {
	fields: { navItems: NavItem[] };
};

const NavbarContent = ({ navItems }: { navItems: NavItem[] }) => {
	const { theme, toggleTheme } = useTheme();

	const [activeTabId, setActiveTabId] = useState<string | null>(null);
	const [isOpen, setIsOpen] = useState(false);
	const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
	const [isSearchOpen, setIsSearchOpen] = useState(false);
	const [isStoreLocatorOpen, setIsStoreLocatorOpen] = useState(false);
	const storeLocatorRef = useRef<HTMLElement | null>(null);

	const isDesktop = useMediaQuery('(min-width: 1025px)');

	const activeItem = useMemo(() => 
		navItems.find((item) => item.id === activeTabId), 
		[navItems, activeTabId]
	);

	const handleMouseLeave = () => {
		if (isDesktop) {
			setIsOpen(false);
			setActiveTabId(null);
		}
	};

	const handleStoreClick = () => {
		setIsStoreLocatorOpen(!isStoreLocatorOpen);
		setIsOpen(false);
		setIsSearchOpen(false);
		if (!isDesktop) setIsMobileMenuOpen(false);

		if (!isStoreLocatorOpen) {
			// Scroll to the store locator section when it opens
			setTimeout(() => {
				storeLocatorRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
			}, 0);
		}
	};

	return (
	<>
		<header 
			className={`
				${styles.navWrapper} 
				${isMobileMenuOpen ? styles.navWrapper_expanded : ''}
			`} 
			onMouseLeave={handleMouseLeave}
		>
			<nav className={styles.navbar}>
				{isMobileMenuOpen && activeTabId && (
					<button className={styles.backButton} onClick={() => setActiveTabId(null)}>
						<div className={styles.backArrow} />
					</button>
				)}

				<button className={styles.hamburger} onClick={() => {
						setIsMobileMenuOpen(!isMobileMenuOpen);
						if (isMobileMenuOpen) setActiveTabId(null);
					}}>
					<span className={isMobileMenuOpen ? styles.hamburger_iconOpen : styles.hamburger_icon} />
					<span className={isMobileMenuOpen ? styles.hamburger_iconOpen : styles.hamburger_icon} />
				</button>

				<div className={`
					${styles.menuSlider} 
					${isMobileMenuOpen ? styles.menuSlider_visible : ''} 
					${activeTabId ? styles.menuSlider_viewSub : ''}
				`}>

					<ul className={styles.navbar__list}>
						{navItems.map((item) => (
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
						))}

						<li className={styles.navbar__item} onClick={toggleTheme}>
							<div className={styles.themeToggle}>
								{theme === 'light' ? '🌙' : '☀️'}
							</div>
						</li>
					</ul>

					<div className={styles.mobileSubView}>
						{activeItem && <SubMenu columns={activeItem.fields.columns} />}
					</div>
				</div>
			</nav>

			<SearchModal isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />

			<div className={`${styles.megaMenu} ${isOpen && isDesktop ? styles.megaMenu_open : ''}`}>
				{activeItem && <SubMenu columns={activeItem.fields.columns} />}
			</div>

			<div 
				className={`${styles.overlay} ${isOpen && isDesktop ? styles.overlay_visible : ''}`}
				onMouseEnter={handleMouseLeave}
			/>
		</header>

		<StoreLocator isOpen={isStoreLocatorOpen} ref={storeLocatorRef} />

		{!isStoreLocatorOpen && <HeroBanner />}
	</>
	);
};

const AppleNavbar = ({ fields }: NavbarProps): JSX.Element => {
	return (
		<ThemeProvider>
			<NavbarContent navItems={fields?.navItems || []} />
		</ThemeProvider>
	);
};

export default AppleNavbar;
