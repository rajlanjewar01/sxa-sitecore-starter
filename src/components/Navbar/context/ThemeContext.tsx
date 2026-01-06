import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

type Theme = 'light' | 'dark';

interface ThemeContextType {
	theme: Theme;
	toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
	const [theme, setTheme] = useState<Theme>('light');

	// Load saved theme on mount
	useEffect(() => {
		const savedTheme = localStorage.getItem('apple-nav-theme') as Theme;
		if (savedTheme) setTheme(savedTheme);
	}, []);

	const toggleTheme = () => {
		const finalTheme = theme === 'light' ? 'dark' : 'light';
		setTheme(finalTheme);
		localStorage.setItem('apple-nav-theme', finalTheme);
	};

	return (
		<ThemeContext.Provider value={{ theme, toggleTheme }}>
			<div className={`theme-container ${theme === 'dark' ? 'dark-mode' : ''}`}>
				{children}
			</div>
		</ThemeContext.Provider>
	);
};

export const useTheme = () => {
	const context = useContext(ThemeContext);
	if (!context) throw new Error('useTheme must be used within a ThemeProvider');
	return context;
};
