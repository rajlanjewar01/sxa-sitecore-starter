import React, { useState, useEffect, useRef, useCallback } from 'react';
import styles from '../scss/EntertainmentCarousel.module.scss';

const ORIGINAL_SLIDES = [
	{ id: 1, genre: 'Comedy', description: 'Kindness makes a comeback.', image: 'https://is1-ssl.mzstatic.com/image/thumb/ctu2ZNuCjL3Nyej1udyVRA/980x522sr.jpg' },
	{ id: 2, genre: 'Drama', description: 'The truth is the top story.', image: 'https://is1-ssl.mzstatic.com/image/thumb/7wrtoO8W3jt5HhU87C5KNw/980x522sr.jpg' },
	{ id: 3, genre: 'Sci-Fi', description: 'The fate of humanity rests on a plan.', image: 'https://is1-ssl.mzstatic.com/image/thumb/S9dLxU_nCvhomqGnI3-d_g/980x522sr.jpg' },
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
	const timerRef = useRef<NodeJS.Timeout | null>(null);

	const updateSize = useCallback(() => {
		if (containerRef.current) setContainerWidth(containerRef.current.offsetWidth);
	}, []);

	useEffect(() => {
		updateSize();
		window.addEventListener('resize', updateSize);
		return () => window.removeEventListener('resize', updateSize);
	}, [updateSize]);

	const nextSlide = useCallback(() => {
		setIsTransitioning(true);
		setCurrentIndex((prev) => prev + 1);
		setProgress(0);
	}, []);

	// Infinite Loop Logic
	useEffect(() => {
		if (currentIndex === SLIDES.length - 1) {
			setTimeout(() => {
				setIsTransitioning(false);
				setCurrentIndex(1);
			}, 700);
		}
		if (currentIndex === 0) {
			setTimeout(() => {
				setIsTransitioning(false);
				setCurrentIndex(SLIDES.length - 2);
			}, 700);
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
		return () => { if (timerRef.current) clearInterval(timerRef.current); };
	}, [isPlaying, nextSlide]);

	const getTransform = () => {
		const isDesktop = window.innerWidth > 1024;
		const cardWidth = isDesktop ? Math.min(980, containerWidth * 0.8) : containerWidth;
		const gap = 20;
		
		const centerOffset = (containerWidth - cardWidth) / 2;
		const position = centerOffset - (currentIndex * (cardWidth + gap));
		return `translateX(${position}px)`;
	};

	return (
		<section className={styles.carouselSection}>
			<h2 className={styles.heading}>Endless entertainment.</h2>
			
			<div 
				className={styles.carouselContainer} 
				ref={containerRef}
			>
				<div 
					className={styles.track}
					style={{ 
						transform: getTransform(),
						transition: isTransitioning ? 'transform 0.8s cubic-bezier(0.4, 0, 0.2, 1)' : 'none'
					}}
				>
					{SLIDES.map((slide, index) => (
						<div 
							key={`${slide.id}-${index}`} 
							className={`${styles.slide} ${index === currentIndex ? styles.active : ''}`}
						>
							<img src={slide.image} alt="Show" className={styles.image} />
							<div className={styles.overlay}>
								<button className={styles.streamButton}>Stream now</button>
								<p className={styles.description}>
									<span>{slide.genre} • </span>{slide.description}
								</p>
							</div>
						</div>
					))}
				</div>

				<div className={styles.controls}>
					<ul className={styles.dots}>
						{ORIGINAL_SLIDES.map((_, index) => {
							const isActive = (currentIndex - 1 + ORIGINAL_SLIDES.length) % ORIGINAL_SLIDES.length === index;
							return (
								<li key={index} className={`${styles.dot} ${isActive ? styles.activeDot : ''}`}
										onClick={() => { setIsTransitioning(true); setCurrentIndex(index + 1); setProgress(0); }}>
									{isActive && <div className={styles.progress} style={{ width: `${progress}%` }} />}
								</li>
							);
						})}
					</ul>
				</div>
			</div>
		</section>
	);
};

export default EntertainmentCarousel;
