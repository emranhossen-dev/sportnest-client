import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

const Navbar = () => {
    const { user, logoutUser } = useContext(AuthContext);

    const navigate = (path) => {
        window.history.pushState({}, '', path);
        window.dispatchEvent(new PopStateEvent('popstate'));
    };

    return (
        <nav className="bg-slate-900 text-white sticky top-0 z-50 shadow-md px-6 py-4 flex items-center justify-between">
            <div className="flex items-center space-x-2 cursor-pointer" onClick={() => navigate('/')}>
                <span className="text-xl font-bold tracking-wider text-emerald-400">SportNest</span>
            </div>
            <div className="flex items-center space-x-6 text-sm font-medium">
                <button onClick={() => navigate('/')} className="hover:text-emerald-400 transition-colors bg-transparent border-none cursor-pointer">Home</button>
                <button onClick={() => navigate('/facilities')} className="hover:text-emerald-400 transition-colors bg-transparent border-none cursor-pointer">All Facilities</button>
                
                {user ? (
                    <div className="flex items-center space-x-4">
                        <button onClick={() => navigate('/my-bookings')} className="hover:text-emerald-400 transition-colors bg-transparent border-none cursor-pointer">My Bookings</button>
                        <button onClick={() => navigate('/add-facility')} className="hover:text-emerald-400 transition-colors bg-transparent border-none cursor-pointer">Add Facility</button>
                        <button onClick={() => navigate('/manage-facilities')} className="hover:text-emerald-400 transition-colors bg-transparent border-none cursor-pointer">Manage Facilities</button>
                        <button onClick={logoutUser} className="bg-emerald-500 hover:bg-emerald-600 px-4 py-2 rounded-lg font-semibold transition-colors border-none cursor-pointer">Logout</button>
                    </div>
                ) : (
                    <button onClick={() => navigate('/login')} className="bg-emerald-500 hover:bg-emerald-600 px-4 py-2 rounded-lg font-semibold transition-colors border-none cursor-pointer">Login</button>
                )}
            </div>
        </nav>
    );
};

export default Navbar;