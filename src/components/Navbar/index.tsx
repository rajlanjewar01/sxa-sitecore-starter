import { useState, useMemo } from 'react';
import { ComponentProps } from 'lib/component-props';
import { NavItem } from './types';
import { MenuItem } from './MenuItem';
import { SubMenu } from './SubMenu';
import styles from './Navbar.module.scss';

type NavbarProps = ComponentProps & {
  fields: { navItems: NavItem[] };
};

const AppleNavbar = ({ fields }: NavbarProps): JSX.Element => {
  const [activeTabId, setActiveTabId] = useState<string | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navItems = fields?.navItems || [];

  const handleMouseEnter = (item: NavItem) => {
	if (window.innerWidth > 1024) {
	  setActiveTabId(item.id);

	  const hasColumns = (item.fields?.columns?.length ?? 0) > 0;
	  setIsOpen(hasColumns);
	}
  };

  const handleMouseLeave = () => {
	if (window.innerWidth > 1024) {
	  setIsOpen(false);
	  setActiveTabId(null);
	}
  };

  const activeItem = useMemo(() => 
	navItems.find((item) => item.id === activeTabId), 
	[navItems, activeTabId]
  );

  return (
	<header 
		className={`${styles.navWrapper} ${isMobileMenuOpen ? styles.navWrapper_expanded : ''}`} 
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
				onMouseEnter={() => handleMouseEnter(item)}
				onClick={() => {
				  if(window.innerWidth <= 1024) {
					  setActiveTabId(activeTabId === item.id ? null : item.id);
				  }
				}}
			  />
			))}
		  </ul>

		  <div className={styles.mobileSubView}>
			{activeItem && <SubMenu columns={activeItem.fields.columns} />}
		  </div>
		</div>
	  </nav>

	  <div className={`${styles.megaMenu} ${isOpen ? styles.megaMenu_open : ''}`}>
		{activeItem && <SubMenu columns={activeItem.fields.columns} />}
	  </div>

	  <div 
	  className={`${styles.overlay} ${isOpen ? styles.overlay_visible : ''}`}
	  onMouseEnter={handleMouseLeave}
	  />
	</header>
  );
};

export default AppleNavbar;
