import React from 'react';
import { useTheme } from '../context/ThemeContext';
import styles from '../scss/HeroBanner.module.scss';

const HeroBanner = () => {
	const { theme } = useTheme();

	return (
		<section className={`${styles.heroBanner} ${theme === 'dark' ? styles.dark : ''}`}>
			<div className={styles.textContent}>
				<h2 className={styles.subTitle}>iPhone 17</h2>
				<h1 className={styles.mainTitle}>PRO</h1>
			</div>
			<div className={styles.productImageContainer}>
				<img 
					src="/apple-17pro.png" 
					alt="iPhone 17 Pro back camera view in orange finish" 
					className={styles.productImage} 
				/>
			</div>
		</section>
	);
};

export default HeroBanner;
