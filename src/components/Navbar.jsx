import { useContext, useState } from 'react';
import { Link, NavLink } from 'react-router';
import { AuthContext } from '../context/AuthContext';

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const [isOpen, setIsOpen] = useState(false);

  const activeStyle = "text-emerald-400 font-semibold transition-colors duration-200";
  const inactiveStyle = "text-slate-300 hover:text-emerald-400 transition-colors duration-200";

  return (
    <nav className="sticky top-0 z-50 backdrop-blur-md bg-slate-950/70 border-b border-slate-800/50 px-6 py-4">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <Link to="/" className="text-2xl font-black tracking-wider text-transparent bg-clip-text bg-linear-to-r from-emerald-400 to-teal-500">
          SportNest
        </Link>

        <div className="hidden md:flex items-center gap-8">
          <NavLink to="/" className={({ isActive }) => isActive ? activeStyle : inactiveStyle}>Home</NavLink>
          <NavLink to="/facilities" className={({ isActive }) => isActive ? activeStyle : inactiveStyle}>All Facilities</NavLink>
          
          {user && (
            <>
              <NavLink to="/my-bookings" className={({ isActive }) => isActive ? activeStyle : inactiveStyle}>My Bookings</NavLink>
              <NavLink to="/add-facility" className={({ isActive }) => isActive ? activeStyle : inactiveStyle}>Add Facility</NavLink>
            </>
          )}
        </div>

        <div className="hidden md:flex items-center gap-4">
          {user ? (
            <div className="relative">
              <button onClick={() => setIsOpen(!isOpen)} className="flex items-center gap-2 focus:outline-none">
                <div className="w-10 h-10 rounded-full border-2 border-emerald-500 bg-slate-800 flex items-center justify-center font-bold text-emerald-400">
                  {user.name[0]}
                </div>
              </button>
              {isOpen && (
                <div className="absolute right-0 mt-2 w-56 rounded-xl bg-slate-900 border border-slate-800 p-2 shadow-2xl backdrop-blur-xl">
                  <div className="px-4 py-2.5 border-b border-slate-800 mb-1">
                    <p className="text-sm font-semibold text-slate-200">{user.name}</p>
                    <p className="text-xs text-slate-400 truncate">{user.email}</p>
                  </div>
                  <Link to="/my-bookings" className="block px-4 py-2 text-sm text-slate-300 hover:bg-slate-800 rounded-lg transition-colors">My Bookings</Link>
                  <Link to="/add-facility" className="block px-4 py-2 text-sm text-slate-300 hover:bg-slate-800 rounded-lg transition-colors">Add Facility</Link>
                  <button onClick={logout} className="w-full text-left block px-4 py-2 text-sm text-rose-400 hover:bg-rose-500/10 rounded-lg transition-colors mt-1">
                    Logout
                  </button>
                </div>
              )}
            </div>
          ) : (
            <Link to="/login" className="px-6 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-slate-950 font-bold transition-all duration-200 shadow-lg shadow-emerald-500/20">
              Login
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;