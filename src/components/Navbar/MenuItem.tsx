import { Text, Image as JssImage } from '@sitecore-jss/sitecore-jss-nextjs';
import { NavItem } from './types';
import { useNav } from './NavContext';
import styles from './Navbar.module.scss';

export const MenuItem = ({ item }: { item: NavItem }) => {
  const { setActiveTabId, setIsOpen, activeTabId } = useNav();
  const hasIcon = !!item.fields.icon?.value?.src;

  const handleMouseEnter = () => {
    if (window.innerWidth > 1024) {
      setActiveTabId(item.id);
      const hasColumns = (item.fields?.columns?.length ?? 0) > 0;
      setIsOpen(hasColumns);
    }
  };

  const handleClick = () => {
    if (window.innerWidth <= 1024) {
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
        <span className={styles.mobileChevron}></span>
      </div>
    </li>
  );
};
