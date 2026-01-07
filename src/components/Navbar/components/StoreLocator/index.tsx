import { StoreCard } from './StoreCard';
import styles from './scss/StoreLocator.module.scss';

const MOCK_STORES = [
  {
	id: '1',
	name: 'Apple Broadway Plaza',
	address: '1200 S. Main Street, Walnut Creek, CA 94596',
	status: 'Opens at 10:00 a.m.',
	image: 'https://rtlimages.apple.com/cmc/dieter/store/16_9/R014.png?resize=304:171&output-format=jpg&output-quality=85&interpolation=progressive-bicubic' // Use your actual image paths
  },
  {
	id: '2',
	name: 'Apple Cherry Creek',
	address: '3000 E 1st Avenue, Denver, CO 80206',
	status: 'Opens at 10:00 a.m.',
	image: 'https://rtlimages.apple.com/cmc/dieter/store/16_9/R047.png?resize=304:171&output-format=jpg&output-quality=85&interpolation=progressive-bicubic'
  },
  {
	id: '3',
	name: 'Apple Chandler Fashion Center',
	address: '3111 W Chandler Boulevard, Chandler, AZ 85226',
	status: 'Opens at 10:00 a.m.',
	image: 'https://rtlimages.apple.com/cmc/dieter/store/16_9/R026.png?resize=304:171&output-format=jpg&output-quality=85&interpolation=progressive-bicubic'
  }
];

interface StoreLocatorProps {
  isOpen: boolean;
}

export const StoreLocator = ({ isOpen }: StoreLocatorProps) => {
  if (!isOpen) return null;

  return (
	<section className={styles.storeLocator}>
	  <div className={styles.container}>
		{/* Top Header Section */}
		<div className={styles.header}>
		  <h2 className={styles.title}>Find a store</h2>
		  <div className={styles.searchWrapper}>
			<span className={styles.searchIcon}></span>
			<input 
			  type="text" 
			  placeholder="Search by location, ZIP, or store name" 
			  className={styles.searchInput}
			/>
		  </div>
		  <a href="#" className={styles.listLink}>Complete store list &gt;</a>
		</div>

		{/* Results Section */}
		<div className={styles.resultsHeader}>
		  <h1>Stores in United States</h1>
		</div>

		{/* Horizontal Card List */}
		<div className={styles.cardGrid}>
		  {MOCK_STORES.map((store) => (
			<StoreCard key={store.id} {...store} />
		  ))}
		</div>
	  </div>
	</section>
  );
};
