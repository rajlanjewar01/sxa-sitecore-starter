import { 
    Text, 
    Field, 
    LinkField, 
    ImageField, 
    Image as JssImage, 
    Link as JssLink 
} from '@sitecore-jss/sitecore-jss-nextjs';
import { ComponentProps } from 'lib/component-props';
import { useState } from 'react';
import styles from './Navbar.module.scss';

// Type for individual links in the columns
type MenuLink = {
    fields: {
        link: LinkField;
        label: Field<string>;
    };
};

// Type for the columns inside the Mega Menu
type MenuColumn = {
    fields: {
        columnHeader: Field<string>;
        links: MenuLink[];
    };
};

// Type for the top-level Navigation items
type NavItem = {
    id: string;
    fields: {
        label: Field<string>;
        icon: ImageField;
        columns: MenuColumn[];
    };
};

type NavbarProps = ComponentProps & {
    fields: {
        navItems: NavItem[];
    };
};

const AppleNavbar = (props: NavbarProps): JSX.Element => {
    const [activeTabId, setActiveTabId] = useState<string | null>(null);
    const [isOpen, setIsOpen] = useState(false);

    const navItems = props.fields?.navItems;

    const handleMouseEnter = (id: string) => {
        setActiveTabId(id);
        setIsOpen(true);
    };

    const handleMouseLeave = () => {
        setIsOpen(false);
        setActiveTabId(null);
    };

    const activeItem = navItems?.find((item) => item.id === activeTabId);
    const hasSubmenu = activeItem?.fields?.columns?.length > 0;

    return (
        <header className={styles.navWrapper} onMouseLeave={handleMouseLeave}>
            {/* Top Bar */}
            <nav className={styles.navbar}>
                <ul className={styles.navbar__list}>
                    {navItems?.map((item) => (
                        <li 
                            key={item.id} 
                            className={styles.navbar__item}
                            onMouseEnter={() => handleMouseEnter(item.id)}
                        >
                            {/* Render Icon if exists (Apple Logo), otherwise Label */}
                            {item.fields.icon?.value?.src ? (
                                <JssImage field={item.fields.icon} className={styles.navbar__icon} />
                            ) : (
                                <Text field={item.fields.label} encode={false} />
                            )}
                        </li>
                    ))}
                </ul>
            </nav>

            {/* Mega Menu Dropdown */}
            <div className={`${styles.megaMenu} ${isOpen && hasSubmenu ? styles.megaMenu_open : ''}`}>
                <div className={styles.megaMenu__content}>
                    {activeItem?.fields?.columns?.map((col, index) => (
                        <div key={index} className={styles.megaMenu__column}>
                            <Text 
                                tag="h3" 
                                field={col.fields.columnHeader} 
                                className={styles.megaMenu__header} 
                            />
                            <ul className={styles.megaMenu__links}>
                                {col.fields.links?.map((linkItem, linkIndex) => (
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

            {/* Background Blur Overlay */}
            <div className={`${styles.overlay} ${isOpen && hasSubmenu ? styles.overlay_visible : ''}`} />
        </header>
    );
};

export default AppleNavbar;
