import { useRef, useEffect } from 'react';
import styles from '../scss/SearchModal.module.scss';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SearchModal = ({ isOpen, onClose }: SearchModalProps) => {
  // 1. Initialize the ref with null
  const inputRef = useRef<HTMLInputElement>(null);

  // 2. Use useEffect to focus the input when the modal opens
  useEffect(() => {
	if (isOpen && inputRef.current) {
	  inputRef.current.focus();
	}
  }, [isOpen]);

  if (!isOpen) return null;

  const quickLinks = [
	'Find a Store',
	'Apple Vision Pro',
	'AirPods',
	'Apple Intelligence',
	'Apple Trade In'
  ];

  return (
	<div className={styles.searchOverlay} onClick={onClose}>
	  <div className={styles.searchContainer} onClick={(e) => e.stopPropagation()}>
		<div className={styles.searchBar}>
		  <span className={styles.searchIcon}>🔍</span>
		  <input 
			ref={inputRef} // 3. Attach the ref to the input element
			type="text" 
			placeholder="Search apple.com" 
			className={styles.searchInput}
		  />
		  <button className={styles.closeButton} onClick={onClose}>
			✕
		  </button>
		</div>
		
		<div className={styles.quickLinks}>
		  <h4>Quick Links</h4>
		  <ul>
		   {quickLinks.map((link) => (
				<li key={link} className={styles.quickLinkItem}>
				  <span className={styles.arrowIcon}>
					<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="7" y1="17" x2="17" y2="7"></line><polyline points="7 7 17 7 17 17"></polyline></svg>
				  </span>
				  {link}
				</li>
			  ))}
		  </ul>
		</div>
	  </div>
	</div>
  );
};
