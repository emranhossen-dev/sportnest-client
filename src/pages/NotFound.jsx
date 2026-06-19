import React from 'react';

const NotFound = () => {
    const handleGoHome = () => {
        window.history.pushState({}, '', '/');
        window.dispatchEvent(new PopStateEvent('popstate'));
    };

    return (
        <div className="min-h-[80vh] flex flex-col items-center justify-center px-4 text-center">
            <h1 className="text-6xl font-extrabold text-slate-800 tracking-tight">404</h1>
            <p className="text-xl text-slate-600 mt-4 max-w-md">The sports resource path you seek does not exist or has been shifted completely.</p>
            <button onClick={handleGoHome} className="mt-8 bg-emerald-500 hover:bg-emerald-600 text-white font-bold px-6 py-3 rounded-lg transition-all shadow-md border-none cursor-pointer">
                Back Home
            </button>
        </div>
    );
};

export default NotFound;