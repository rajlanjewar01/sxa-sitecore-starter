import { useRef, useEffect } from 'react';
import { Text, Field, Link as JssLink, LinkField } from '@sitecore-jss/sitecore-jss-nextjs';
import styles from '../scss/SearchModal.module.scss';

interface SearchModalProps {
	isOpen: boolean;
	onClose: () => void;
	fields?: {
		title: Field<string>;
		placeholder: Field<string>;
		quickLinks?: { text: Field<string>; link?: LinkField }[];
	};
}

export const SearchModal = ({ isOpen, onClose, fields }: SearchModalProps) => {
	// Initialize
	const inputRef = useRef<HTMLInputElement>(null);

	// useEffect to focus the input when the modal opens
	useEffect(() => {
		if (isOpen && inputRef.current) {
			inputRef.current.focus();
		}
	}, [isOpen]);

	if (!isOpen) return null;

	const defaultFields = {
		title: { value: 'Quick Links' },
		placeholder: { value: 'Search apple.com' },
		quickLinks: [
			{ text: { value: 'Find a Store' }, link: { value: { href: '#' } } },
			{ text: { value: 'Apple Vision Pro' }, link: { value: { href: '#' } } },
			{ text: { value: 'AirPods' }, link: { value: { href: '#' } } },
			{ text: { value: 'Apple Intelligence' }, link: { value: { href: '#' } } }
		],
	};

	const modalFields = {
		title: (fields?.title ?? defaultFields.title) as Field<string>,
		placeholder: (fields?.placeholder ?? defaultFields.placeholder) as Field<string>,
		quickLinks: fields?.quickLinks ?? defaultFields.quickLinks
	};

  return (
	<div className={styles.searchOverlay} onClick={onClose}>
		<div className={styles.searchContainer} onClick={(e) => e.stopPropagation()}>
			<div className={styles.searchBar}>
				<span className={styles.searchIcon}>🔍</span>
				<input 
					ref={inputRef} // add ref to input element
					type="text" 
					placeholder={modalFields.placeholder?.value || 'Search'} 
					className={styles.searchInput}
				/>
				<button className={styles.closeButton} onClick={onClose}>
				✕
				</button>
			</div>
		
			<div className={styles.quickLinks}>
				<Text tag="h4" field={modalFields.title} />
				<ul>
				{modalFields.quickLinks?.map((link, index) => {
					const linkField: LinkField | undefined = link.link
						? {
								...link.link,
								value: {
									...(link.link.value || {}),
									text: link.link.value?.text ?? link.text?.value ?? ''
								}
						}
						: undefined;

					return (
					<li key={link.text?.value ?? index} className={styles.quickLinkItem}>
						<span className={styles.arrowIcon}>
							<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="7" y1="17" x2="17" y2="7"></line><polyline points="7 7 17 7 17 17"></polyline></svg>
						</span>
						{linkField ? (
							<JssLink field={linkField} className={styles.quickLink} />
							) : (
							<Text field={link.text} />
						)}
					</li>
					);
					})}
				</ul>
			</div>
		</div>
	</div>
	);
};
