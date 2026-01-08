import { useState, forwardRef } from 'react';
import { StoreCard } from './StoreCard';
import styles from './scss/StoreLocator.module.scss';

const stores = [
  {
	id: '1',
	name: 'Apple Broadway Plaza',
	address: '1200 S. Main Street, Walnut Creek, CA 94596',
	status: 'Opens at 10:00 a.m.',
	image: 'https://rtlimages.apple.com/cmc/dieter/store/16_9/R014.png?resize=304:171&output-format=jpg&output-quality=85&interpolation=progressive-bicubic'
  },
  {
	id: '2',
	name: 'Apple Cherry Creek',
	address: '3000 E 1st Avenue, Denver, CO 80206',
	status: 'Opens at 10:00 a.m.',
	image: 'https://rtlimages.apple.com/cmc/dieter/store/16_9/R345.png?resize=304:171&output-format=jpg&output-quality=85&interpolation=progressive-bicubic'
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

export const StoreLocator = forwardRef<HTMLElement | null, StoreLocatorProps>(
({ isOpen }, ref) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredStores, setFilteredStores] = useState(stores);

  if (!isOpen) return null;

  const handleSearch = (e: React.FormEvent) => {
	e.preventDefault();
	
	// Filter logic: Case-insensitive check on name or address
	const results = stores.filter(store => 
	  store.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
	  store.address.toLowerCase().includes(searchTerm.toLowerCase())
	);
	
	setFilteredStores(results);
  };

  return (
	<section className={styles.storeLocator} ref={ref as any}>
	  <div className={styles.container}>
		{/* Top Header Section */}
		<div className={styles.header}>
		  <h2 className={styles.title}>Find a store</h2>
		  <form className={styles.searchWrapper} onSubmit={handleSearch}>
			<span className={styles.searchIcon}></span>
			<input 
			  type="text" 
			  placeholder="Search by location, ZIP, or store name" 
			  className={styles.searchInput}
			  value={searchTerm}
			  onChange={(e) => setSearchTerm(e.target.value)}
			/>
		  </form>
		  <a href="#" className={styles.listLink}>Complete store list &gt;</a>
		</div>

		<div className={styles.resultsHeader}>
		  <h1>Stores in United States</h1>
		</div>

		{/* Conditional Rendering: Cards vs No Result */}
		{filteredStores.length > 0 ? (
		  <div className={styles.cardGrid}>
			{filteredStores.map((store) => (
			  <StoreCard key={store.id} {...store} />
			))}
		  </div>
		) : (
		  <div className={styles.noResults}>
			<p>No results available for "{searchTerm}"</p>
		  </div>
		)}
	  </div>
	</section>
  );
});
