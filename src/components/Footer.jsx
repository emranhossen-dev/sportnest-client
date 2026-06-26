const Footer = () => {
  return (
    <footer className="bg-slate-100 dark:bg-slate-950 border-t border-slate-200 dark:border-slate-900 px-6 py-12 text-slate-600 dark:text-slate-400 transition-colors duration-200">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
        <div>
          <h3 className="text-xl font-bold text-slate-900 dark:text-slate-100 mb-4">SportNest</h3>
          <p className="text-sm leading-relaxed max-w-sm">
            Premium sports facility booking platform. Book turfs, courts, and lanes seamlessly in real-time.
          </p>
        </div>
        <div>
          <h4 className="text-md font-semibold text-slate-800 dark:text-slate-200 mb-4">Contact Info</h4>
          <ul className="space-y-2 text-sm">
            <li>Email: support@sportnest.com</li>
            <li>Phone: +880 1700 000000</li>
            <li>Location: Mohammadpur, Dhaka, Bangladesh</li>
          </ul>
        </div>
        <div>
          <h4 className="text-md font-semibold text-slate-800 dark:text-slate-200 mb-4">Connect With Us</h4>
          <div className="flex items-center gap-4">
            <a href="https://x.com" target="_blank" rel="noreferrer" className="w-9 h-9 rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 flex items-center justify-center hover:border-emerald-600 hover:text-emerald-400 text-slate-600 dark:text-slate-400 transition-colors">
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
              </svg>
            </a>
          </div>
        </div>
      </div>
      <div className="max-w-7xl mx-auto pt-8 border-t border-slate-200 dark:border-slate-900 text-center text-xs tracking-wide">
        &copy; {new Date().getFullYear()} SportNest. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;