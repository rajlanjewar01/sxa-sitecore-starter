import React, { useState, useEffect, useRef, useCallback } from 'react';
import styles from '../scss/EntertainmentCarousel.module.scss';

const ORIGINAL_SLIDES = [
	{ id: 1, title: 'Ted Lasso', genre: 'Comedy', description: 'Kindness makes a comeback.', image: 'https://is1-ssl.mzstatic.com/image/thumb/zLbkVwwHwe8I5EtuXc8wWg/980x522sr.jpg' },
	{ id: 2, title: 'The Morning Show', genre: 'Drama', description: 'The news is only half the story.', image: 'https://is1-ssl.mzstatic.com/image/thumb/7wrtoO8W3jt5HhU87C5KNw/980x522sr.jpg' },
	{ id: 3, title: 'Foundation', genre: 'Sci-Fi', description: 'The fate of humanity rests on a plan.', image: 'https://is1-ssl.mzstatic.com/image/thumb/fhmbI8Mv8fXjBW0bVcW2xg/980x522sr.jpg' },
];

const SLIDES = [
	ORIGINAL_SLIDES[ORIGINAL_SLIDES.length - 1],
	...ORIGINAL_SLIDES,
	ORIGINAL_SLIDES[0],
];

const AUTO_PLAY_DURATION = 5000;
const PROGRESS_INTERVAL = 50;

const EntertainmentCarousel = () => {
	const [currentIndex, setCurrentIndex] = useState(1);
	const [isTransitioning, setIsTransitioning] = useState(true);
	const [progress, setProgress] = useState(0);
	const [isPlaying, setIsPlaying] = useState(true);
	const [containerWidth, setContainerWidth] = useState(0);

	const containerRef = useRef<HTMLDivElement>(null);
	const [touchStart, setTouchStart] = useState<number | null>(null);
	const [touchEnd, setTouchEnd] = useState<number | null>(null);
	const timerRef = useRef<NodeJS.Timeout | null>(null);

	// Update width calculation for responsive centering
	const updateWidth = useCallback(() => {
		if (containerRef.current) {
			setContainerWidth(containerRef.current.offsetWidth);
		}
	}, []);

	useEffect(() => {
		updateWidth();
		window.addEventListener('resize', updateWidth);
		return () => window.removeEventListener('resize', updateWidth);
	}, [updateWidth]);

	const nextSlide = useCallback(() => {
		setIsTransitioning(true);
		setCurrentIndex((prev) => prev + 1);
		setProgress(0);
	}, []);

	const prevSlide = useCallback(() => {
		setIsTransitioning(true);
		setCurrentIndex((prev) => prev - 1);
		setProgress(0);
	}, []);

	// Infinite Loop "Jump"
	useEffect(() => {
		if (currentIndex === SLIDES.length - 1) {
			const timer = setTimeout(() => {
				setIsTransitioning(false);
				setCurrentIndex(1);
			}, 700);
			return () => clearTimeout(timer);
		}
		if (currentIndex === 0) {
			const timer = setTimeout(() => {
				setIsTransitioning(false);
				setCurrentIndex(SLIDES.length - 2);
			}, 700);
			return () => clearTimeout(timer);
		}
	}, [currentIndex]);

	// Progress Bar / Auto-play
	useEffect(() => {
		if (isPlaying) {
			timerRef.current = setInterval(() => {
				setProgress((prev) => {
					if (prev >= 100) {
						nextSlide();
						return 0;
					}
					return prev + (PROGRESS_INTERVAL / AUTO_PLAY_DURATION) * 100;
				});
			}, PROGRESS_INTERVAL);
		}
		return () => {
			if (timerRef.current) clearInterval(timerRef.current);
		};
	}, [isPlaying, nextSlide]);

	// Touch handlers
	const onTouchStart = (e: React.TouchEvent) => {
		setTouchEnd(null);
		setTouchStart(e.targetTouches[0].clientX);
	};
	const onTouchMove = (e: React.TouchEvent) => setTouchEnd(e.targetTouches[0].clientX);
	const onTouchEnd = () => {
		if (!touchStart || !touchEnd) return;
		const distance = touchStart - touchEnd;
		if (distance > 50) nextSlide();
		if (distance < -50) prevSlide();
	};

	// Dynamic transform calculation
	const getTransform = () => {
		const isMobile = window.innerWidth <= 1024;
		const cardWidth = isMobile ? containerWidth : Math.min(980, containerWidth * 0.8);
		const gap = 20;
		
		// Centers the card perfectly regardless of viewport size
		const offset = (containerWidth - cardWidth) / 2;
		return `translateX(${offset - (currentIndex * (cardWidth + gap))}px)`;
	};

	return (
		<section className={styles.carouselSection}>
			<h2 className={styles.heading}>Endless entertainment.</h2>
			
			<div 
				className={styles.carouselContainer}
				ref={containerRef}
				onTouchStart={onTouchStart}
				onTouchMove={onTouchMove}
				onTouchEnd={onTouchEnd}
			>
				<div 
					className={styles.track}
					style={{ 
						transform: getTransform(),
						transition: isTransitioning ? 'transform 0.7s cubic-bezier(0.4, 0, 0.2, 1)' : 'none'
					}}
				>
					{SLIDES.map((slide, index) => {
						const isActive = index === currentIndex;
						return (
							<div 
								key={`${slide.id}-${index}`} 
								className={`${styles.slide} ${isActive ? styles.active : ''}`}
							>
								<img src={slide.image} alt={slide.title} className={styles.image} />
								{isActive && (
									<div className={styles.overlay}>
										<button className={styles.streamButton}>Stream now</button>
										<p className={styles.description}>
											<span>{slide.genre} • </span>{slide.description}
										</p>
									</div>
								)}
							</div>
						);
					})}
				</div>

				<div className={styles.controls}>
					<ul className={styles.dots}>
						{ORIGINAL_SLIDES.map((_, index) => {
							const dotActive = (currentIndex - 1 + ORIGINAL_SLIDES.length) % ORIGINAL_SLIDES.length === index;
							return (
								<li 
									key={index}
									className={`${styles.dot} ${dotActive ? styles.activeDot : ''}`}
									onClick={() => {
										setIsTransitioning(true);
										setCurrentIndex(index + 1);
										setProgress(0);
									}}
								>
									{dotActive && (
										<div 
											className={styles.progressInner} 
											style={{ width: `${progress}%` }} 
										/>
									)}
								</li>
							);
						})}
					</ul>
					<button 
						className={styles.playToggle} 
						onClick={() => setIsPlaying(!isPlaying)}
					>
						{isPlaying ? 'Pause' : 'Play'}
					</button>
				</div>
			</div>
		</section>
	);
};

export default EntertainmentCarousel;
