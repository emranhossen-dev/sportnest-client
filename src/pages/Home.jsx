import { useEffect, useState } from 'react';
import { Link } from 'react-router';
import Loading from '../components/Loading';

const Home = () => {
  const [facilities, setFacilities] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/facilities.json')
      .then((res) => res.json())
      .then((data) => {
        setFacilities(data.slice(0, 6));
        setLoading(false);
      });
  }, []);

  if (loading) return <Loading />;

  return (
    <div className="space-y-24 pb-24">
      <section className="relative min-h-[85vh] flex items-center justify-center px-6 overflow-hidden bg-[radial-gradient(ellipse_at_top,var(--tw-gradient-stops))] from-emerald-950/30 via-slate-950 to-slate-950">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#0f172a_1px,transparent_1px),linear-gradient(to_bottom,#0f172a_1px,transparent_1px)] bg-size-[4rem_4rem] mask-[radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]"></div>
        <div className="relative max-w-4xl mx-auto text-center space-y-8">
          <h1 className="text-4xl sm:text-6xl font-black tracking-tight leading-none">
            Your Ultimate Arena <br />
            <span className="text-transparent bg-clip-text bg-linear-to-r from-emerald-400 to-teal-500">Awaits Your Game</span>
          </h1>
          <p className="text-lg text-slate-400 max-w-2xl mx-auto">
            Book professional football turfs, badminton courts, and swimming lanes in seconds. Experience seamless sports scheduling today.
          </p>
          <div>
            <Link to="/facilities" className="inline-block px-8 py-4 bg-emerald-500 hover:bg-emerald-600 text-slate-950 font-bold rounded-xl transition-all shadow-xl shadow-emerald-500/20 transform hover:-translate-y-0.5">
              Explore Facilities
            </Link>
          </div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-6">
        <div className="text-center space-y-3 mb-16">
          <h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl">Featured Facilities</h2>
          <p className="text-slate-400 max-w-md mx-auto text-sm">
            Top-rated arenas and courts available for reservation right now.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {facilities.map((facility) => (
            <div key={facility._id} className="group relative rounded-2xl bg-slate-900/50 border border-slate-800/60 overflow-hidden backdrop-blur-md flex flex-col h-full transition-all duration-300 hover:border-slate-700/80 hover:shadow-2xl hover:shadow-emerald-500/5">
              <div className="relative aspect-video w-full overflow-hidden bg-slate-800">
                <img src={facility.image} alt={facility.name} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                <span className="absolute top-4 right-4 px-3 py-1 bg-slate-950/80 backdrop-blur-md text-xs font-semibold text-emerald-400 rounded-full border border-slate-800">
                  ${facility.price_per_hour}/hr
                </span>
              </div>
              <div className="p-6 flex flex-col grow space-y-4">
                <div className="space-y-2">
                  <span className="text-xs font-bold uppercase tracking-widest text-emerald-500">{facility.facility_type}</span>
                  <h3 className="text-xl font-bold text-slate-100">{facility.name}</h3>
                  <p className="text-xs text-slate-400 flex items-center gap-1">
                    <span>📍</span> {facility.location}
                  </p>
                </div>
                <p className="text-sm text-slate-400 line-clamp-2 grow">{facility.description}</p>
                <div className="pt-2">
                  <Link to={`/facility/${facility._id}`} className="w-full inline-flex items-center justify-center px-5 py-3 bg-slate-800 hover:bg-emerald-500 hover:text-slate-950 font-bold text-sm text-slate-200 rounded-xl transition-all duration-200">
                    Book Now
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-6">
        <div className="rounded-3xl bg-linear-to-r from-emerald-950/40 to-slate-900/40 border border-emerald-500/10 p-8 md:p-12 backdrop-blur-sm grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div className="space-y-6">
            <h2 className="text-3xl font-extrabold tracking-tight">Why Choose SportNest?</h2>
            <p className="text-slate-400 text-sm leading-relaxed">
              We connect passion with premium spaces. Whether you want a casual weekend match or intensive team practices, our portal streamlines availability and payments.
            </p>
            <ul className="space-y-3 text-sm text-slate-300">
              <li className="flex items-center gap-2">✓ Verified Professional Grade Arenas</li>
              <li className="flex items-center gap-2">✓ Instant Real-time Slot Lock System</li>
              <li className="flex items-center gap-2">✓ Hassle-free 100% Secure Bookings</li>
            </ul>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800 text-center space-y-2">
              <p className="text-3xl font-black text-emerald-400">15k+</p>
              <p className="text-xs text-slate-400 uppercase tracking-wider">Active Players</p>
            </div>
            <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800 text-center space-y-2">
              <p className="text-3xl font-black text-emerald-400">120+</p>
              <p className="text-xs text-slate-400 uppercase tracking-wider">Sports Facilities</p>
            </div>
            <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800 text-center space-y-2">
              <p className="text-3xl font-black text-emerald-400">98%</p>
              <p className="text-xs text-slate-400 uppercase tracking-wider">Success Rate</p>
            </div>
            <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800 text-center space-y-2">
              <p className="text-3xl font-black text-emerald-400 font-sans">24/7</p>
              <p className="text-xs text-slate-400 uppercase tracking-wider">Support Open</p>
            </div>
          </div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-6 text-center">
        <div className="max-w-2xl mx-auto space-y-6 rounded-2xl bg-slate-900/30 border border-slate-800 p-8 md:p-12 backdrop-blur-md">
          <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">Ready to Own a Venue?</h2>
          <p className="text-sm text-slate-400 leading-relaxed">
            List your playground, indoor courts, or commercial swimming complexes with us to manage schedules dynamically and maximize your slot utilization rates.
          </p>
          <div className="pt-2">
            <Link to="/add-facility" className="inline-block px-6 py-3 bg-slate-800 hover:bg-slate-700 text-slate-200 hover:text-white font-bold text-sm rounded-xl transition-all">
              Become a Provider
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;