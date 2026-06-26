import { Link } from 'react-router';

const NotFound = () => {
  return (
    <div className="min-h-[80vh] flex flex-col items-center justify-center text-center px-6 bg-slate-950">
      <div className="space-y-6 max-w-md">
        <h1 className="text-9xl font-black tracking-widest text-transparent bg-clip-text bg-linear-to-r from-emerald-500 to-teal-500">
          404
        </h1>
        <h2 className="text-2xl font-bold text-slate-100">
          Arena Not Found
        </h2>
        <p className="text-sm text-slate-400 leading-relaxed">
          The sports facility or page you are looking for does not exist or has been moved to a different sector.
        </p>
        <div className="pt-4">
          <Link to="/" className="inline-block px-6 py-3 bg-emerald-500 hover:bg-emerald-600 text-slate-950 font-bold rounded-xl transition-all shadow-lg shadow-emerald-500/20 text-sm">
            Back Home
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NotFound;