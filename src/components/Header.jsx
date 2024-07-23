import React, { useContext } from 'react';
import { ThemeContext } from './ThemeContext';
import '@fortawesome/fontawesome-free/css/all.min.css';


const Header = () => {
  const { isLightTheme, toggleTheme } = useContext(ThemeContext);

  return (
    <header className={`header ${isLightTheme ? 'light-theme' : ''}`}>
      <h1>Where in the world?</h1>
      <button className={`btn-moon ${isLightTheme ? 'light-theme' : ''}`} onClick={toggleTheme} style={{ color: isLightTheme ? '#000' : '#fff' }}>

        <i className={`fas ${isLightTheme ? 'fa-moon' : 'fa-sun'} icon-moon`} style={{ color: isLightTheme ? '#000' : '#fff' }}></i>

        {isLightTheme ? ' Dark Mode' : ' Light Mode'}

      </button>
    </header>
  );
};

export default Header;
