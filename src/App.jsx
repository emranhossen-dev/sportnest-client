import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Login from './pages/Login';
import Register from './pages/Register';
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
            return (
                <div className="max-w-4xl mx-auto my-16 p-8 bg-white border border-slate-200 shadow-sm rounded-2xl text-center">
                    <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight mb-4">Welcome to SportNest Testing Hub</h2>
                    <p className="text-slate-600">Explore and configure pristine scheduling environments directly without reload failure patterns.</p>
                </div>
            );
        }
        if (currentPath === '/login') return <Login />;
        if (currentPath === '/register') return <Register />;
        
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