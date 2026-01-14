import React from 'react';
import { Text, RichText, Image as JssImage } from '@sitecore-jss/sitecore-jss-nextjs';
import styles from '../../scss/Tabs.module.scss';

export interface Product {
	category: string;
	image: string;
	tag?: string;
	title: string;
	chips: string;
	description: string;
	price: string;
	monthlyPrice: string;
}

export const ProductCard = ({
	image,
	tag,
	title,
	chips,
	description,
	price, 
	monthlyPrice,
	buttonColor
}: Product & { buttonColor?: string }) => (
	<div className={styles.tabs__card}>
		<div className={styles['tabs__image-container']}>
			<JssImage field={{ value: { src: image, alt: title } }} className={styles['tabs__product-image']} />
		</div>

		<div className={styles['tabs__card-content']}>
			{tag && 
				<Text tag="p" className={styles.tabs__tag} field={{ value: tag }} />
			}
			<Text tag="h3" className={styles['tabs__product-title']} field={{ value: title }} />
			<Text tag="p" className={styles.tabs__chips} field={{ value: chips }} />

			<RichText className={styles.tabs__description} field={{ value: description }} />

			<div className={styles.tabs__pricing}>
				<Text tag="p" field={{ value: `From ${price} or ${monthlyPrice}` }} />
				<Text tag="p" className={styles.tabs__disclaimer} field={{ value: 'for 12 mo.**' }} />
			</div>

			<div className={styles.tabs__actions}>
				<button 
					className={styles['tabs__learn-more']}
					style={buttonColor ? { backgroundColor: buttonColor } : undefined}
				>
					Learn more
				</button>
				<a href="#" className={styles['tabs__buy-link']}>Buy {'>'}</a>
			</div>
		</div>
	</div>
);
