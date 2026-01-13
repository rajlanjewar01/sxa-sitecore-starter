import React, { useState, useMemo } from 'react';
import { Text, ComponentParams, ComponentRendering } from '@sitecore-jss/sitecore-jss-nextjs';
import styles from '../../scss/Tabs.module.scss';
import { ProductCard, Product } from './ProductCard';

interface TabsProps {
	rendering: ComponentRendering;
	params: ComponentParams;
	fields: {
		categoryTitle: { value: string };
		tabs: { value: string }[]; // Assuming Sitecore sends an array of items
		products: Product[];
	};
	// Supporting your existing manual props for Storybook
	categoryTitle?: string;
	tabs?: string[];
	products?: Product[];
	defaultTab?: string;
}

export const Tabs = (props: TabsProps): JSX.Element => {
	// 1. Extract variant from Sitecore Params (usually set in Rendering Parameters)
	const variant = props.params?.Variant?.toLowerCase() || 'default';
	
	// 2. Handle both Sitecore Fields and Manual Props (for Storybook/Dev)
	const categoryTitle = props.fields?.categoryTitle?.value || props.categoryTitle || '';
	const tabsList = props.tabs || []; // Adjust based on how Sitecore passes the list
	const allProducts = props.products || [];

	const [activeTab, setActiveTab] = useState(props.defaultTab || tabsList[0]);

	const filteredProducts = useMemo(() => {
		if (activeTab === 'All products') return allProducts;
		return allProducts.filter(product => product.category === activeTab);
	}, [activeTab, allProducts]);

	const handleTabClick = (tab: string) => {
		setActiveTab(tab);
	};

	// 3. Apply variant-specific classes
	const containerClass = `${styles.sectionContainer} ${variant === 'featured' ? styles.variantFeatured : ''}`;

	return (
		<section className={containerClass}>
			<Text tag="h1" className={styles.mainTitle} field={{ value: categoryTitle }} />
			
			<nav className={styles.tabsNav}>
				<ul className={styles.tabsList} role="tablist">
					{tabsList.map((tab) => (
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

			{/* The grid can also change behavior based on the variant */}
			<div className={`${styles.productGrid} ${variant === 'featured' ? styles.featuredGrid : ''}`}>
				{filteredProducts.map((product, idx) => (
					<ProductCard 
						key={idx} 
						{...product} 
						isFeatured={variant === 'featured' && idx === 0} // Example: highlight first item
					/>
				))}
			</div>
		</section>
	);
};
