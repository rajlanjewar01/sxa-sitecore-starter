import { Text, Image as JssImage } from '@sitecore-jss/sitecore-jss-nextjs';
import { NavItem } from '../types';
import styles from '../scss/Navbar.module.scss';

interface MenuItemProps {
  item: NavItem;
  isDesktop: boolean;
  activeTabId: string | null;
  setActiveTabId: (id: string | null) => void;
  setIsOpen: (open: boolean) => void;
  onSearchClick?: () => void;
}

export const MenuItem = ({ 
  item, 
  isDesktop, 
  activeTabId, 
  setActiveTabId, 
  setIsOpen,
  onSearchClick
}: MenuItemProps) => {
  const hasIcon = !!item.fields.icon?.value?.src;
  const isSearch = item.id === 'search-link';

  const handleMouseEnter = () => {
    if (isDesktop && !isSearch) {
      setActiveTabId(item.id);
      const hasColumns = (item.fields?.columns?.length ?? 0) > 0;
      setIsOpen(hasColumns);
    }
  };

  const handleClick = (e: React.MouseEvent) => {
    if (isSearch && onSearchClick) {
      e.preventDefault();
      onSearchClick();
      return;
    }

    if (!isDesktop) {
      setActiveTabId(activeTabId === item.id ? null : item.id);
    }
  };

  return (
    <li 
      className={styles.navbar__item}
      onMouseEnter={handleMouseEnter}
      onClick={handleClick}
    >
      <div className={styles.navbar__itemContent}>
        {hasIcon ? (
          <JssImage field={item.fields.icon} className={styles.navbar__icon} />
        ) : (
          <Text field={item.fields.label} encode={false} />
        )}
        {!isSearch && <span className={styles.mobileChevron}></span>}
      </div>
    </li>
  );
};
