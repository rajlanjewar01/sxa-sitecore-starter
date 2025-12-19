import {
	Text,
	Image as JssImage,
	Link as JssLink,
  } from '@sitecore-jss/sitecore-jss-nextjs';
  import { useState, useEffect } from 'react';
  import styles from './Navbar.module.scss';
  import { ComponentProps } from 'lib/component-props';
  
  // --- Types ---
  type NavItem = {
	id: string;
	fields: {
	  label: { value: string };
	  icon: any;
	  columns: any[];
	};
  };
  
  type NavbarProps = ComponentProps & {
	fields: {
	  navItems: NavItem[];
	};
  };
  
  const AppleNavbar = (props: NavbarProps): JSX.Element => {
	const [activeTabId, setActiveTabId] = useState<string | null>(null);
	const [isMegaMenuOpen, setIsMegaMenuOpen] = useState(false);
	const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
	const navItems = props.fields?.navItems || [];
  
	// Prevent background scrolling when mobile menu is open
	useEffect(() => {
	  document.body.style.overflow = isMobileMenuOpen ? 'hidden' : 'unset';
	}, [isMobileMenuOpen]);
  
	const handleMouseEnter = (id: string) => {
	  // Only trigger Mega Menu on desktop widths
	  if (window.innerWidth > 1024) {
		setActiveTabId(id);
		setIsMegaMenuOpen(true);
	  }
	};
  
	const handleMouseLeave = () => {
	  setIsMegaMenuOpen(false);
	  setActiveTabId(null);
	};
  
	const activeItem = navItems.find((item) => item.id === activeTabId);
	const hasSubmenu = activeItem?.fields?.columns?.length > 0;
  
	// Labels that stay visible on Tablet per image_577221.png
	const tabletVisibleLabels = ['Store', 'Mac', 'iPad', 'Watch', 'Vision', 'Support'];
  
	return (
	  <header 
		className={`${styles.navWrapper} ${isMobileMenuOpen ? styles.navWrapper_mobileOpen : ''}`} 
		onMouseLeave={handleMouseLeave}
	  >
		<nav className={styles.navbar}>
		  <ul className={styles.navbar__list}>
			
			{/* 1. Apple Logo - Always Visible */}
			<li className={styles.navbar__item}>
			  <JssImage field={navItems[0]?.fields?.icon} className={styles.navbar__icon} />
			</li>
  
			{/* 2. Dynamic Navigation Links */}
			{navItems.slice(1, -2).map((item) => {
			  const label = item.fields.label?.value;
			  const isTabletLink = tabletVisibleLabels.includes(label);
  
			  return (
				<li
				  key={item.id}
				  onMouseEnter={() => handleMouseEnter(item.id)}
				  className={`
					${styles.navbar__item} 
					${isTabletLink ? styles.navbar__item_tablet : styles.navbar__item_desktopOnly}
				  `}
				>
				  <Text field={item.fields.label} encode={false} />
				</li>
			  );
			})}
  
			{/* 3. Utility Group (Search, Bag, Hamburger) */}
			<div className={styles.navbar__utilities}>
			  <li className={styles.navbar__item}>
				<JssImage field={navItems.find(i => i.id === 'search-link')?.fields?.icon} className={styles.navbar__icon} />
			  </li>
			  <li className={styles.navbar__item}>
				<JssImage field={navItems.find(i => i.id === 'shop-link')?.fields?.icon} className={styles.navbar__icon} />
			  </li>
			  
			  {/* Hamburger Toggle - Explicitly hidden on Desktop by SCSS */}
			  <li className={styles.navbar__toggler} onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
				<div className={`${styles.navbar__hamburger} ${isMobileMenuOpen ? styles.navbar__hamburger_active : ''}`}>
				  <span></span>
				  <span></span>
				</div>
			  </li>
			</div>
		  </ul>
		</nav>
  
		{/* Desktop Mega Menu Dropdown */}
		<div className={`${styles.megaMenu} ${isMegaMenuOpen && hasSubmenu ? styles.megaMenu_open : ''}`}>
		  <div className={styles.megaMenu__content}>
			{activeItem?.fields?.columns?.map((col, index) => (
			  <div key={index} className={styles.megaMenu__column}>
				<Text tag="h3" field={col.fields.columnHeader} className={styles.megaMenu__header} />
				<ul className={styles.megaMenu__links}>
				  {col.fields.links?.map((linkItem: any, linkIndex: number) => (
					<li key={linkIndex}>
					  <JssLink
						field={linkItem.fields.link}
						className={index === 0 ? styles.megaMenu__linkMain : styles.megaMenu__linkSub}
					  />
					</li>
				  ))}
				</ul>
			  </div>
			))}
		  </div>
		</div>
  
		{/* Mobile/Tablet Vertical Menu Overlay */}
		<div className={`${styles.mobileOverlay} ${isMobileMenuOpen ? styles.mobileOverlay_visible : ''}`}>
		  <ul className={styles.mobileOverlay__list}>
			{navItems.slice(1, -2).map((item) => (
			  <li key={item.id} className={styles.mobileOverlay__item}>
				<Text field={item.fields.label} encode={false} />
			  </li>
			))}
		  </ul>
		</div>
  
		{/* Dimmed Background Overlay */}
		<div className={`${styles.overlay} ${isMegaMenuOpen && hasSubmenu ? styles.overlay_visible : ''}`} />
	  </header>
	);
  };
  
  export default AppleNavbar;