import React, { useState, useMemo } from 'react';
import styles from '../../scss/Tabs.module.scss';
import { Text, Field } from '@sitecore-jss/sitecore-jss-nextjs';
import { ComponentProps } from 'lib/component-props';
import { ProductCard, Product } from './ProductCard';


type TabsProps = ComponentProps & {
	fields: {
		categoryTitle: Field<string>;
		tabs?: string[];
		products: Product[];
		defaultTab?: string;
		backgroundColor?: string;
		params?: { [key: string]: string };
	};
};
// interface TabsProps {
// 	categoryTitle?: string;
// 	tabs?: string[];
// 	products?: Product[];
// 	defaultTab?: string;
// }

export const Tabs = ({ fields }: TabsProps): JSX.Element => {
	const [activeTab, setActiveTab] = useState(fields.defaultTab || fields.tabs?.[0] || '');
	const variant = fields.params?.Variant?.toLowerCase() || 'default';
	const allProducts = fields.products || [];
	// filter products
	const filteredProducts = useMemo(() => {
		if (activeTab === 'All products') return allProducts;
		return allProducts.filter(product => product.category === activeTab);
	}, [activeTab, allProducts]);

	const handleTabClick = (tab: string) => {
		setActiveTab(tab);
	};

	// 3. Apply variant-specific classes/dynamic class
	const containerClass = `${styles.tabs} ${variant === 'featured' ? styles['tabs--featured'] : ''} ${variant === 'darkmode' ? styles['tabs--darkmode'] : ''}`;

	return (
		<section className={containerClass}>
			<Text tag="h1" field={fields.categoryTitle } className={styles.tabs__heading} />
			
			<nav className={styles.tabs__nav}>
				<ul className={styles.tabs__list} role="tablist">
					{fields.tabs?.map((tab) => (
						<li key={tab}>
							<button
								className={`${styles.tabs__button} ${activeTab === tab ? styles['tabs__button--active'] : ''}`}
								onClick={() => handleTabClick(tab)}
							>
								<Text field={{ value: tab }} />
							</button>
						</li>
					))}
				</ul>
			</nav>

			{/* change behavior based on the variant */}
			<div className={`${styles.tabs__grid} ${variant === 'featured' ? styles['tabs__grid--featured'] : ''}`}>
				{filteredProducts.map((product, id) => (
					<ProductCard 
						key={id} 
						{...product}
						isFeatured={variant === 'featured' && id === 0}
						buttonColor={fields.backgroundColor}
					/>
				))}
			</div>
		</section>
	);
};
