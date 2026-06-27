import { useEffect, useState } from 'react';
import { Link } from 'react-router';
import axios from 'axios';
import Loading from '../components/Loading';

const AllFacilities = () => {
    const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';
  const [facilities, setFacilities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState('all');

  useEffect(() => {
    let isMounted = true;
    const fetchFacilities = async () => {
      setLoading(true);
      try {
        let url = `${API_URL}/facilities?search=${searchTerm}`;
        if (selectedType !== 'all') {
          url += `&type=${selectedType}`;
        }
        const response = await axios.get(url);
        if (isMounted) {
          setFacilities(response.data || []);
        }
      } catch (error) {
        console.error("Error fetching facilities:", error);
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    const delayDebounceFn = setTimeout(() => {
      fetchFacilities();
    }, 200);

    return () => {
      isMounted = false;
      clearTimeout(delayDebounceFn);
    };
  }, [searchTerm, selectedType]);

  if (loading) return <Loading />;

  return (
    <div className="max-w-7xl mx-auto w-full px-6 py-12 space-y-8 bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 min-h-screen transition-colors duration-200">
      <div className="flex flex-col md:flex-row items-center justify-between gap-4 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-4 rounded-xl shadow-xs">
        <div className="grow w-full md:w-auto">
          <input 
            type="text" 
            value={searchTerm} 
            onChange={(e) => setSearchTerm(e.target.value)} 
            placeholder="Search facilities by name..." 
            className="w-full px-4 py-2.5 rounded-lg bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 focus:border-emerald-500 focus:outline-none text-sm text-slate-800 dark:text-slate-200" 
          />
        </div>
        <div className="w-full md:w-48">
          <select 
            value={selectedType} 
            onChange={(e) => setSelectedType(e.target.value)} 
            className="w-full px-4 py-2.5 rounded-lg border border-slate-200 dark:border-slate-800 focus:border-emerald-500 focus:outline-none text-sm text-slate-700 dark:text-slate-300 bg-white dark:bg-slate-950"
          >
            <option value="all">All Sports</option>
            <option value="football">Football</option>
            <option value="badminton">Badminton</option>
            <option value="swimming">Swimming</option>
            <option value="tennis">Tennis</option>
            <option value="cricket">Cricket</option>
            <option value="basketball">Basketball</option>
          </select>
        </div>
      </div>

      {facilities.length === 0 ? (
        <div className="text-center py-20 border border-dashed border-slate-200 dark:border-slate-800 rounded-xl bg-white dark:bg-slate-900">
          <p className="text-slate-500 dark:text-slate-400 text-sm font-medium">No venues found matching your active filter criteria.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {facilities.map((facility) => (
            <div key={facility._id} className="border border-slate-200 dark:border-slate-800 rounded-xl bg-white dark:bg-slate-900 overflow-hidden flex flex-col h-full shadow-xs hover:shadow-md dark:hover:shadow-emerald-500/5 transition-all duration-200">
              <div className="relative aspect-video w-full overflow-hidden bg-slate-100 dark:bg-slate-950">
                <img src={facility.image} alt={facility.name} className="w-full h-full object-cover" />
                <span className="absolute top-3 right-3 px-2.5 py-1 bg-slate-900 dark:bg-emerald-500 text-xs font-bold text-white dark:text-slate-950 rounded-md">
                  {facility.price_per_hour} BDT/hr
                </span>
              </div>
              <div className="p-5 flex flex-col grow space-y-4">
                <div className="space-y-1">
                  <span className="text-xs font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400">
                    {facility.facility_type}
                  </span>
                  <h3 className="text-lg font-bold text-slate-900 dark:text-slate-50">{facility.name}</h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400">📍 {facility.location}</p>
                </div>
                <p className="text-sm text-slate-600 dark:text-slate-400 line-clamp-2 grow">{facility.description}</p>
                <div className="pt-2">
                  {/* এখানে পাথ ম্যাপ সুনির্দিষ্টভাবে /facility/ করা হয়েছে */}
                  <Link to={`/facility/${facility._id}`} className="w-full inline-flex items-center justify-center px-4 py-2.5 bg-slate-900 hover:bg-slate-800 dark:bg-slate-100 dark:hover:bg-slate-200 text-white dark:text-slate-950 font-bold text-sm rounded-lg transition-colors">
                    Book Now
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AllFacilities;