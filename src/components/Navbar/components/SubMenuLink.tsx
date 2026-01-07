import { Link as JssLink, LinkField } from '@sitecore-jss/sitecore-jss-nextjs';
import styles from '../scss/Navbar.module.scss';

interface SubMenuLinkProps {
	field: LinkField;
	isMain?: boolean;
}

export const SubMenuLink = ({ field, isMain }: SubMenuLinkProps) => (
	<li className={styles.megaMenu__item}>
		<JssLink 
			field={field} 
			className={isMain ? styles.megaMenu__linkMain : styles.megaMenu__linkSub} 
		/>
	</li>
);
