import React from 'react';
import { Text, Image as JssImage, Field, ImageField } from '@sitecore-jss/sitecore-jss-nextjs';
import { ComponentProps } from 'lib/component-props';
import { useTheme } from '../context/ThemeContext';
import styles from '../scss/HeroBanner.module.scss';

type HeroBannerFields = {
	subTitle: Field<string>;
	mainTitle: Field<string>;
	image: ImageField;
};

type HeroBannerProps = ComponentProps & {
	fields?: HeroBannerFields;
};

const fallbackFields: HeroBannerFields = {
	subTitle: { value: 'iPhone 17' },
	mainTitle: { value: 'PRO' },
	image: {
		value: {
			src: '/apple-17pro.png',
			alt: 'iPhone 17 Pro back camera view in orange finish'
		}
	}
};

const HeroBanner = ({ fields }: HeroBannerProps) => {
	const { theme } = useTheme();

	const heroFields = {
		subTitle: fields?.subTitle ?? fallbackFields.subTitle,
		mainTitle: fields?.mainTitle ?? fallbackFields.mainTitle,
		image: fields?.image ?? fallbackFields.image
	};

	return (
		<section className={`${styles.heroBanner} ${theme === 'dark' ? styles.dark : ''}`}>
			<div className={styles.textContent}>
				<Text tag="h2" className={styles.subTitle} field={heroFields.subTitle} />
				<Text tag="h1" className={styles.mainTitle} field={heroFields.mainTitle} />
			</div>
			<div className={styles.productImageContainer}>
				<JssImage 
					field={heroFields.image}
					className={styles.productImage} 
				/>
			</div>
		</section>
	);
};

export default HeroBanner;
