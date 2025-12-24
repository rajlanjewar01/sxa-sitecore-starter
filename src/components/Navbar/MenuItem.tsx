import { Text, Image as JssImage } from '@sitecore-jss/sitecore-jss-nextjs';
import { NavItem } from './types';
import styles from './Navbar.module.scss';

interface MenuItemProps {
  item: NavItem;
  onMouseEnter: () => void; // Updated to match the call in index.tsx
  onClick?: () => void;     // Added this prop
}

export const MenuItem = ({ item, onMouseEnter, onClick }: MenuItemProps) => {
  const hasIcon = !!item.fields.icon?.value?.src;

  return (
    <li 
      className={styles.navbar__item}
      onMouseEnter={onMouseEnter}
      onClick={onClick} // This triggers the state change in index.tsx
    >
      <div className={styles.navbar__itemContent}>
        {hasIcon ? (
          <JssImage field={item.fields.icon} className={styles.navbar__icon} />
        ) : (
          <Text field={item.fields.label} encode={false} />
        ) /* If it's mobile and has children, you could add a chevron icon here */}
        
        {/* Optional: Add a chevron icon for items that have submenus on mobile */}
        <span className={styles.mobileChevron}></span>
      </div>
    </li>
  );
};
