import { Text, Field } from '@sitecore-jss/sitecore-jss-nextjs';
import { SubMenuLink } from './SubMenuLink';
import { MenuColumn } from './types'; // Assume types are moved to a shared file
import styles from './Navbar.module.scss';

interface SubMenuProps {
  columns: MenuColumn[];
}

export const SubMenu = ({ columns }: SubMenuProps) => {
  return (
	<div className={styles.megaMenu__content}>
	  {columns.map((col, index) => (
		<div key={index} className={styles.megaMenu__column}>
		  <Text 
			tag="h3" 
			field={col.fields.columnHeader} 
			className={styles.megaMenu__header} 
		  />
		  <ul className={styles.megaMenu__links}>
			{col.fields.links?.map((linkItem, linkIndex) => (
			  <SubMenuLink 
				key={linkIndex}
				field={linkItem.fields.link}
				isMain={index === 0} // First column gets the "Main" style
			  />
			))}
		  </ul>
		</div>
	  ))}
	</div>
  );
};
