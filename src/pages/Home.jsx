import { useEffect, useState } from 'react';
import { Link } from 'react-router';
import axios from 'axios';
import Loading from '../components/Loading';

const Home = () => {
  const [facilities, setFacilities] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFacilities = async () => {
      try {
        const response = await axios.get('http://localhost:5000/facilities');
        setFacilities(response.data.slice(0, 6));
        setLoading(false);
      } catch (error) {
        console.error("Error fetching facilities:", error);
        setLoading(false);
      }
    };

    fetchFacilities();
  }, []);

  if (loading) return <Loading />;

  return (
    <div className="space-y-16 pb-16 bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-50 transition-colors duration-200">
      <section className="bg-slate-100 dark:bg-slate-900/40 py-20 px-6 text-center border-b border-slate-200 dark:border-slate-900">
        <div className="max-w-3xl mx-auto space-y-6">
          <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-slate-900 dark:text-slate-100">
            SportNest Facility Booking System
          </h1>
          <p className="text-md text-slate-600 dark:text-slate-400 max-w-xl mx-auto">
            Book football turfs, badminton courts, cricket cages, and swimming lanes instantly. Real-time availability matching your sports spirit.
          </p>
          <div>
            <Link to="/facilities" className="inline-block px-6 py-3 bg-emerald-600 hover:bg-emerald-700 dark:bg-emerald-500 dark:hover:bg-emerald-600 text-white dark:text-slate-950 font-bold rounded-lg transition-colors shadow-md">
              Explore Facilities
            </Link>
          </div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-6">
        <div className="text-center space-y-2 mb-12">
          <h2 className="text-2xl font-bold tracking-tight sm:text-3xl text-slate-900 dark:text-slate-100">Featured Facilities</h2>
          <p className="text-slate-500 dark:text-slate-400 max-w-sm mx-auto text-sm">
            Top-rated professional venues available for reservation today.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {facilities.map((facility) => (
            <div key={facility._id} className="border border-slate-200 dark:border-slate-900 rounded-xl bg-white dark:bg-slate-900 overflow-hidden flex flex-col h-full shadow-xs hover:shadow-md transition-shadow">
              <div className="relative aspect-video w-full overflow-hidden bg-slate-100 dark:bg-slate-800">
                <img src={facility.image} alt={facility.name} className="w-full h-full object-cover" />
                <span className="absolute top-3 right-3 px-2.5 py-1 bg-slate-900 dark:bg-slate-950 text-xs font-bold text-white dark:text-emerald-400 rounded-md border border-transparent dark:border-slate-800">
                  {facility.price_per_hour} BDT/hr
                </span>
              </div>
              <div className="p-5 flex flex-col grow space-y-4">
                <div className="space-y-1">
                  <span className="text-xs font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400">{facility.facility_type}</span>
                  <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100">{facility.name}</h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400">📍 {facility.location}</p>
                </div>
                <p className="text-sm text-slate-600 dark:text-slate-400 line-clamp-2 grow">{facility.description}</p>
                <div className="pt-2">
                  <Link to={`/facility/${facility._id}`} className="w-full inline-flex items-center justify-center px-4 py-2.5 bg-slate-900 dark:bg-slate-800 hover:bg-slate-800 dark:hover:bg-slate-700 text-white font-bold text-sm rounded-lg transition-colors">
                    Book Now
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-6">
        <div className="rounded-2xl bg-slate-100 dark:bg-slate-900/30 p-8 md:p-12 border border-slate-200 dark:border-slate-900 grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div className="space-y-4">
            <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100">Why Choose SportNest?</h2>
            <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">
              We provide dynamic slot lock systems, verified playground listings, and a simple management portal optimized for individual players and facility managers.
            </p>
            <ul className="space-y-2 text-sm text-slate-700 dark:text-slate-300 font-medium">
              <li>✓ Verified Sports Complexes</li>
              <li>✓ Real-time Available Slots</li>
              <li>✓ Immediate Reservation Flow</li>
            </ul>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="p-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-900 text-center space-y-1">
              <p className="text-2xl font-bold text-emerald-600 dark:text-emerald-400">15k+</p>
              <p className="text-xs text-slate-500 dark:text-slate-400 uppercase tracking-wider font-semibold">Players</p>
            </div>
            <div className="p-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-900 text-center space-y-1">
              <p className="text-2xl font-bold text-emerald-600 dark:text-emerald-400">120+</p>
              <p className="text-xs text-slate-500 dark:text-slate-400 uppercase tracking-wider font-semibold">Arenas</p>
            </div>
          </div>
        </div>
      </section>

      <section className="max-w-4xl mx-auto px-6 text-center">
        <div className="space-y-4 rounded-xl border border-slate-200 dark:border-slate-900 bg-white dark:bg-slate-900 p-8">
          <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100">List Your Venue With Us</h2>
          <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
            Maximize your playground visibility, automate schedules seamlessly, and capture user analytics efficiently.
          </p>
          <div className="pt-2">
            <Link to="/add-facility" className="inline-block px-5 py-2.5 bg-slate-200 dark:bg-slate-800 hover:bg-slate-300 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 font-bold text-sm rounded-lg transition-colors">
              Become a Provider
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;