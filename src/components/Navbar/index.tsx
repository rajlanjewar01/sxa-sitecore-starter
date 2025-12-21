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

  const navItems = fields?.navItems || [];

  // Logic to find the active item and check for submenu content
  const activeItem = useMemo(() => 
	navItems.find((item) => item.id === activeTabId), 
	[navItems, activeTabId]
  );
  
  const hasSubmenu = (activeItem?.fields?.columns?.length ?? 0) > 0;

  const handleMouseLeave = () => {
	setIsOpen(false);
	setActiveTabId(null);
  };

  return (
	<header className={styles.navWrapper} onMouseLeave={handleMouseLeave}>
	  {/* Main Navigation Bar */}
	  <nav className={styles.navbar}>
		<ul className={styles.navbar__list}>
		  {navItems.map((item) => (
			<MenuItem 
			  key={item.id} 
			  item={item} 
			  onMouseEnter={(id) => {
				setActiveTabId(id);
				setIsOpen(true);
			  }} 
			/>
		  ))}
		</ul>
	  </nav>

	  {/* Mega Menu Dropdown Container */}
	  <div className={`${styles.megaMenu} ${isOpen && hasSubmenu ? styles.megaMenu_open : ''}`}>
		{activeItem && <SubMenu columns={activeItem.fields.columns} />}
	  </div>

	  {/* Background Blur Overlay */}
	  <div className={`${styles.overlay} ${isOpen && hasSubmenu ? styles.overlay_visible : ''}`} />
	</header>
  );
};

export default AppleNavbar;
