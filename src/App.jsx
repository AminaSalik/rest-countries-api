import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Countries from './components/Countries';
import { ThemeProvider } from './components/ThemeContext';
import Country from './components/Country';

function App() {
    return (
        <ThemeProvider>
            <Router>
                <Header />
                <Routes>
                    <Route exact path="/" element={<Countries />} />
                    <Route path="/countries/:name" element={<Country />} />
                </Routes>
            </Router>
        </ThemeProvider>
    );
}

export default App;
