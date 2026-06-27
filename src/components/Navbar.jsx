import { useContext, useState } from 'react';
import { Link, NavLink } from 'react-router';
import { AuthContext } from '../context/AuthContext';

const Navbar = () => {
  const { user, logout, theme, toggleTheme } = useContext(AuthContext);
  const [isOpen, setIsOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const activeStyle = "text-emerald-600 dark:text-emerald-400 font-semibold transition-colors duration-200";
  const inactiveStyle = "text-slate-600 dark:text-slate-300 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors duration-200";

  return (
    <nav className="sticky top-0 z-50 bg-white/90 dark:bg-slate-950/90 border-b border-slate-200 dark:border-slate-900 px-6 py-4 backdrop-blur-md">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <Link to="/" className="text-2xl font-black tracking-wider text-slate-900 dark:text-slate-100">
          SportNest
        </Link>

        {/* --- desktop menu --- */}
        <div className="hidden md:flex items-center gap-8">
          <NavLink to="/" className={({ isActive }) => isActive ? activeStyle : inactiveStyle}>Home</NavLink>
          <NavLink to="/facilities" className={({ isActive }) => isActive ? activeStyle : inactiveStyle}>All Facilities</NavLink>
          
          {user && (
            <>
              <NavLink to="/my-bookings" className={({ isActive }) => isActive ? activeStyle : inactiveStyle}>My Bookings</NavLink>
              <NavLink to="/add-facility" className={({ isActive }) => isActive ? activeStyle : inactiveStyle}>Add Facility</NavLink>
              <NavLink to="/manage-facilities" className={({ isActive }) => isActive ? activeStyle : inactiveStyle}>Manage My Facilities</NavLink>
            </>
          )}
        </div>

        {/* --- desktop action buttons --- */}
        <div className="hidden md:flex items-center gap-4">
          <button onClick={toggleTheme} className="p-2 rounded-lg border border-slate-200 dark:border-slate-800 hover:bg-slate-100 dark:hover:bg-slate-900 transition-colors text-slate-700 dark:text-slate-300 cursor-pointer">
            {theme === 'dark' ? (
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364-6.364l-.707.707M6.343 17.657l-.707.707m12.728 0l-.707-.707M6.343 6.364l-.707-.707M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            ) : (
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
              </svg>
            )}
          </button>

          {user ? (
            <div className="relative">
              <button onClick={() => setIsOpen(!isOpen)} className="flex items-center gap-2 focus:outline-none cursor-pointer">
                {user.image ? (
                  <img src={user.image} alt={user.name} className="w-10 h-10 rounded-full border border-slate-200 dark:border-slate-800 object-cover" />
                ) : (
                  <div className="w-10 h-10 rounded-full border border-slate-200 dark:border-slate-800 bg-slate-100 dark:bg-slate-900 flex items-center justify-center font-bold text-slate-700 dark:text-slate-300">
                    {user.name?.[0]}
                  </div>
                )}
              </button>
              {isOpen && (
                <div className="absolute right-0 mt-2 w-56 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-2 shadow-xl">
                  <div className="px-4 py-2.5 border-b border-slate-100 dark:border-slate-800 mb-1">
                    <p className="text-sm font-semibold text-slate-800 dark:text-slate-200">{user.name}</p>
                    <p className="text-xs text-slate-500 dark:text-slate-400 truncate">{user.email}</p>
                  </div>
                  <Link to="/my-bookings" onClick={() => setIsOpen(false)} className="block px-4 py-2 text-sm text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 rounded-lg transition-colors">My Bookings</Link>
                  <Link to="/add-facility" onClick={() => setIsOpen(false)} className="block px-4 py-2 text-sm text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 rounded-lg transition-colors">Add Facility</Link>
                  <Link to="/manage-facilities" onClick={() => setIsOpen(false)} className="block px-4 py-2 text-sm text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 rounded-lg transition-colors">Manage My Facilities</Link>
                  <button onClick={() => { logout(); setIsOpen(false); }} className="w-full text-left block px-4 py-2 text-sm text-rose-600 dark:text-rose-400 hover:bg-rose-500/10 rounded-lg transition-colors mt-1 cursor-pointer">
                    Logout
                  </button>
                </div>
              )}
            </div>
          ) : (
            <Link to="/login" className="px-5 py-2.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 dark:bg-emerald-500 dark:hover:bg-emerald-600 text-white dark:text-slate-950 font-bold transition-colors shadow-sm">
              Login
            </Link>
          )}
        </div>

        {/* --- mobile menu action toggle --- */}
        <div className="flex md:hidden items-center gap-3">
          <button onClick={toggleTheme} className="p-2 rounded-lg border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 cursor-pointer">
            {theme === 'dark' ? (
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364-6.364l-.707.707M6.343 17.657l-.707.707m12.728 0l-.707-.707M6.343 6.364l-.707-.707M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            ) : (
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
              </svg>
            )}
          </button>

          <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="p-2 rounded-lg border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 focus:outline-none cursor-pointer">
            {isMobileMenuOpen ? (
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* --- responsive mobile drawer --- */}
      {isMobileMenuOpen && (
        <div className="md:hidden mt-4 pt-4 border-t border-slate-200 dark:border-slate-900 space-y-4 flex flex-col animate-fadeIn">
          <NavLink to="/" onClick={() => setIsMobileMenuOpen(false)} className={({ isActive }) => isActive ? activeStyle : inactiveStyle}>Home</NavLink>
          <NavLink to="/facilities" onClick={() => setIsMobileMenuOpen(false)} className={({ isActive }) => isActive ? activeStyle : inactiveStyle}>All Facilities</NavLink>
          
          {user && (
            <>
              <NavLink to="/my-bookings" onClick={() => setIsMobileMenuOpen(false)} className={({ isActive }) => isActive ? activeStyle : inactiveStyle}>My Bookings</NavLink>
              <NavLink to="/add-facility" onClick={() => setIsMobileMenuOpen(false)} className={({ isActive }) => isActive ? activeStyle : inactiveStyle}>Add Facility</NavLink>
              <NavLink to="/manage-facilities" onClick={() => setIsMobileMenuOpen(false)} className={({ isActive }) => isActive ? activeStyle : inactiveStyle}>Manage My Facilities</NavLink>
            </>
          )}

          <div className="pt-2 border-t border-slate-100 dark:border-slate-900">
            {user ? (
              <div className="space-y-3">
                <div className="flex items-center gap-3 px-1">
                  {user.image ? (
                    <img src={user.image} alt={user.name} className="w-10 h-10 rounded-full border border-slate-200 dark:border-slate-800 object-cover" />
                  ) : (
                    <div className="w-10 h-10 rounded-full bg-slate-100 dark:bg-slate-900 flex items-center justify-center font-bold text-slate-700 dark:text-slate-300">
                      {user.name?.[0]}
                    </div>
                  )}
                  <div className="truncate">
                    <p className="text-sm font-semibold text-slate-800 dark:text-slate-200">{user.name}</p>
                    <p className="text-xs text-slate-500 dark:text-slate-400 truncate">{user.email}</p>
                  </div>
                </div>
                <button onClick={() => { logout(); setIsMobileMenuOpen(false); }} className="w-full text-center py-2.5 text-sm text-rose-600 dark:text-rose-400 bg-rose-500/10 rounded-xl font-bold cursor-pointer">
                  Logout
                </button>
              </div>
            ) : (
              <Link to="/login" onClick={() => setIsMobileMenuOpen(false)} className="block w-full text-center py-2.5 rounded-xl bg-emerald-600 dark:bg-emerald-500 text-white dark:text-slate-950 font-bold shadow-sm">
                Login
              </Link>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;