import { useEffect, useState } from 'react';
import { Link } from 'react-router';
import Loading from '../components/Loading';

const AllFacilities = () => {
  const [facilities, setFacilities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState('all');

  useEffect(() => {
    fetch('/facilities.json')
      .then((res) => res.json())
      .then((data) => {
        setFacilities(data);
        setLoading(false);
      });
  }, []);

  const filteredFacilities = facilities.filter((facility) => {
    const matchesSearch = facility.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = selectedType === 'all' || facility.facility_type === selectedType;
    return matchesSearch && matchesType;
  });

  if (loading) return <Loading />;

  return (
    <div className="max-w-7xl mx-auto px-6 py-12 space-y-12">
      <div className="flex flex-col md:flex-row items-center justify-between gap-6 bg-slate-900/30 border border-slate-800/80 p-6 rounded-2xl backdrop-blur-md">
        <div className="w-full md:w-1/2">
          <input type="text" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} placeholder="Search facilities by name..." className="w-full px-4 py-3 rounded-xl bg-slate-950 border border-slate-800 focus:border-emerald-500 focus:outline-none text-sm text-slate-100 transition-colors" />
        </div>
        <div className="w-full md:w-1/4">
          <select value={selectedType} onChange={(e) => setSelectedType(e.target.value)} className="w-full px-4 py-3 rounded-xl bg-slate-950 border border-slate-800 focus:border-emerald-500 focus:outline-none text-sm text-slate-300 transition-colors">
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

      {filteredFacilities.length === 0 ? (
        <div className="text-center py-24 bg-slate-900/10 border border-dashed border-slate-800 rounded-2xl">
          <p className="text-slate-400 font-medium">No sports facilities found matching your criteria.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredFacilities.map((facility) => (
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
      )}
    </div>
  );
};

export default AllFacilities;