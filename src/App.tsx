import React, { useState } from 'react';
// Styles
import './App.scss';
// Components
import { Home } from './pages/Home/Home';
import { Button } from './components/UI/Button/Button';

export const ThemeContext = React.createContext('light');

const App: React.FC = () => {
    const [theme, setTheme] = useState('light');

    const toggleTheme = () => {
        setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
    };

    return (
        <ThemeContext.Provider value={theme}>
            <div className={`${theme} wrapper`}>
                <div className="container">
                    <Button className="theme-btn" text="" onClick={toggleTheme}>
                        {theme === 'light' ? <i className="icon-sun"></i> : <i className="icon-moon"></i>}
                    </Button>

                    <Home />
                </div>
            </div>
        </ThemeContext.Provider>
    );
};

export default App;
