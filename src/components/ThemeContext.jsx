
import React, { createContext, useState, useEffect } from 'react';

const ThemeContext = createContext();

const ThemeProvider = ({ children }) => {
    const [isLightTheme, setIsLightTheme] = useState(() => {
        return localStorage.getItem('theme') === 'light';
    });

    useEffect(() => {
        document.body.classList.toggle('light-theme', isLightTheme);
        localStorage.setItem('theme', isLightTheme ? 'light' : 'dark');
    }, [isLightTheme]);

    const toggleTheme = () => {
        setIsLightTheme(prevTheme => !prevTheme);
    };

    return (
        <ThemeContext.Provider value={{ isLightTheme, toggleTheme }}>
            {children}a
        </ThemeContext.Provider>
    );
};

export { ThemeProvider, ThemeContext };