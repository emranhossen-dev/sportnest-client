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
    <div className="max-w-7xl mx-auto px-6 py-12 space-y-8 bg-slate-50 text-slate-900 min-h-screen">
      <div className="flex flex-col md:flex-row items-center justify-between gap-4 bg-white border border-slate-200 p-4 rounded-xl shadow-xs">
        <div className="grow w-full md:w-auto">
          <input type="text" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} placeholder="Search facilities by name..." className="w-full px-4 py-2.5 rounded-lg border border-slate-200 focus:border-emerald-500 focus:outline-none text-sm text-slate-800" />
        </div>
        <div className="w-full md:w-48">
          <select value={selectedType} onChange={(e) => setSelectedType(e.target.value)} className="w-full px-4 py-2.5 rounded-lg border border-slate-200 focus:border-emerald-500 focus:outline-none text-sm text-slate-700 bg-white">
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
        <div className="text-center py-20 border border-dashed border-slate-200 rounded-xl bg-white">
          <p className="text-slate-500 text-sm font-medium">No venues found matching your active filter criteria.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredFacilities.map((facility) => (
            <div key={facility._id} className="border border-slate-200 rounded-xl bg-white overflow-hidden flex flex-col h-full shadow-xs hover:shadow-md transition-shadow">
              <div className="relative aspect-video w-full overflow-hidden bg-slate-100">
                <img src={facility.image} alt={facility.name} className="w-full h-full object-cover" />
                <span className="absolute top-3 right-3 px-2.5 py-1 bg-slate-900 text-xs font-bold text-white rounded-md">
                  {facility.price_per_hour} BDT/hr
                </span>
              </div>
              <div className="p-5 flex flex-col grow space-y-4">
                <div className="space-y-1">
                  <span className="text-xs font-bold uppercase tracking-wider text-emerald-600">{facility.facility_type}</span>
                  <h3 className="text-lg font-bold text-slate-900">{facility.name}</h3>
                  <p className="text-xs text-slate-500">📍 {facility.location}</p>
                </div>
                <p className="text-sm text-slate-600 line-clamp-2 grow">{facility.description}</p>
                <div className="pt-2">
                  <Link to={`/facility/${facility._id}`} className="w-full inline-flex items-center justify-center px-4 py-2.5 bg-slate-900 hover:bg-slate-800 text-white font-bold text-sm rounded-lg transition-colors">
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