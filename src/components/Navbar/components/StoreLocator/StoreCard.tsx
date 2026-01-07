import styles from './scss/StoreLocator.module.scss';

interface StoreCardProps {
	name: string;
	address: string;
	status: string;
	image: string;
}

export const StoreCard = ({ name, address, status, image }: StoreCardProps) => {
	return (
		<div className={styles.card}>
			<div className={styles.imageWrapper}>
				<img src={image} alt={name} className={styles.storeImage} />
			</div>
			<div className={styles.cardContent}>
				<h3 className={styles.storeName}>{name}</h3>
				<p className={styles.storeAddress}>{address}</p>
				<p className={styles.storeStatus}>{status}</p>
			</div>
		</div>
	);
};
