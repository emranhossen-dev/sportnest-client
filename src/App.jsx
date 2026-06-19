import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import NotFound from './pages/NotFound';

const App = () => {
    const [currentPath, setCurrentPath] = useState(window.location.pathname);

    useEffect(() => {
        const handleLocationChange = () => setCurrentPath(window.location.pathname);
        window.addEventListener('popstate', handleLocationChange);
        return () => window.removeEventListener('popstate', handleLocationChange);
    }, []);

    const routeMap = () => {
        if (currentPath === '/') {
            return <div className="p-8 text-center text-xl font-bold">Welcome to SportNest Home (Testing Phase)</div>;
        }
        return <NotFound />;
    };

    return (
        <div className="flex flex-col min-h-screen">
            <Navbar />
            <main className="flex-grow">{routeMap()}</main>
            <Footer />
        </div>
    );
};

export default App;