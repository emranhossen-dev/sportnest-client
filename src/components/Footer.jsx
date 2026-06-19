
const Footer = () => {
    return (
        <footer className="bg-slate-900 text-slate-400 border-t border-slate-800 px-6 py-12">
            <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
                <div>
                    <h3 className="text-white text-lg font-bold mb-4">SportNest</h3>
                    <p className="text-sm leading-relaxed">Your ultimate destination for premier booking and sports stadium management pipelines.</p>
                </div>
                <div>
                    <h4 className="text-white text-sm font-semibold mb-4">Contact System</h4>
                    <p className="text-sm">Email: support@sportnest.com</p>
                    <p className="text-sm">Location: Dhaka, Bangladesh</p>
                </div>
                <div>
                    <h4 className="text-white text-sm font-semibold mb-4">Follow Operations</h4>
                    <div className="flex space-x-4">
                        <a href="#" className="hover:text-white transition-colors">
                            <svg className="h-5 w-5 fill-current" viewBox="0 0 24 24">
                                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                            </svg>
                        </a>
                    </div>
                </div>
            </div>
            <div className="text-center mt-12 pt-6 border-t border-slate-800 text-xs">
                &copy; 2026 SportNest Platform Systems. All rights preserved.
            </div>
        </footer>
    );
};

export default Footer;