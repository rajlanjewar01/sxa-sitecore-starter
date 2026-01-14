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
	<div className={styles.card}>
		<div className={styles.imageContainer}>
			<JssImage field={{ value: { src: image, alt: title } }} className={styles.productImage} />
		</div>

		<div className={styles.cardContent}>
			{tag && 
				<Text tag="p" className={styles.tag} field={{ value: tag }} />
			}
			<Text tag="h3" className={styles.productTitle} field={{ value: title }} />
			<Text tag="p" className={styles.chips} field={{ value: chips }} />

			<RichText className={styles.description} field={{ value: description }} />

			<div className={styles.pricing}>
				<Text tag="p" field={{ value: `From ${price} or ${monthlyPrice}` }} />
				<Text tag="p" className={styles.disclaimer} field={{ value: 'for 12 mo.**' }} />
			</div>

			<div className={styles.actions}>
				<button 
					className={styles.learnMore}
					style={buttonColor ? { backgroundColor: buttonColor } : undefined}
				>
					Learn more
				</button>
				<a href="#" className={styles.buyLink}>Buy {'>'}</a>
			</div>
		</div>
	</div>
);
