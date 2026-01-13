import React, { useState, useMemo } from 'react';
import { Text } from '@sitecore-jss/sitecore-jss-nextjs';
import styles from '../../scss/Tabs.module.scss';
import { ProductCard, Product } from './ProductCard';

interface TabsProps {
		categoryTitle: string;
		tabs: string[];
		products: Product[];
		defaultTab?: string;
		onTabChange?: (tab: string) => void;
}

export const Tabs = ({ categoryTitle, tabs, products, defaultTab, onTabChange }: TabsProps) => {
	const [activeTab, setActiveTab] = useState(defaultTab || tabs[0]);

	const filteredProducts = useMemo(() => {
			if (activeTab === 'All products') return products;
			return products.filter(product => product.category === activeTab);
	}, [activeTab, products]);

	const handleTabClick = (tab: string) => {
			setActiveTab(tab);
			if (onTabChange) onTabChange(tab);
	};

	return (
			<section className={styles.sectionContainer}>
					<Text tag="h1" className={styles.mainTitle} field={{ value: categoryTitle }} />
					
					<nav className={styles.tabsNav}>
							<ul className={styles.tabsList} role="tablist">
									{tabs.map((tab) => (
											<li key={tab} role="presentation">
													<button
															className={`${styles.tabButton} ${activeTab === tab ? styles.active : ''}`}
															onClick={() => handleTabClick(tab)}
															role="tab"
															aria-selected={activeTab === tab}
													>
															<Text field={{ value: tab }} />
													</button>
											</li>
									))}
							</ul>
					</nav>

					<div className={styles.productGrid}>
							{filteredProducts.map((product, idx) => (
									<ProductCard key={idx} {...product} />
							))}
					</div>
			</section>
	);
};
