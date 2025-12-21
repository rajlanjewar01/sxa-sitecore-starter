import { Text, Image as JssImage } from '@sitecore-jss/sitecore-jss-nextjs';
import { NavItem } from './types';
import styles from './Navbar.module.scss';

interface MenuItemProps {
	item: NavItem;
	onMouseEnter: (id: string) => void;
}

export const MenuItem = ({ item, onMouseEnter }: MenuItemProps) => {
  const hasIcon = !!item.fields.icon?.value?.src;

  return (
	<li 
		className={styles.navbar__item}
		onMouseEnter={() => onMouseEnter(item.id)}
	>
	{hasIcon ? (
		<JssImage field={item.fields.icon} className={styles.navbar__icon} />
	  ) : (
		<Text field={item.fields.label} encode={false} />
	  )}
	</li>
  );
};
