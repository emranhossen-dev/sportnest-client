import { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import axios from 'axios';
import toast from 'react-hot-toast';
import { AuthContext } from '../context/AuthContext';
import Loading from '../components/Loading';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

const ManageMyFacilities = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const [facilities, setFacilities] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user?.email) {
      setLoading(false);
      return;
    }
    let isMounted = true;
    const fetchMyFacilities = async () => {
      try {
        setLoading(true);
        const res = await axios.get(
          `${API_URL}/facilities?owner_email=${user.email}`,
          { withCredentials: true }
        );
        if (isMounted) setFacilities(res.data || []);
      } catch (err) {
        console.error(err);
        toast.error('Failed to load your facilities');
      } finally {
        if (isMounted) setLoading(false);
      }
    };
    fetchMyFacilities();
    return () => {
      isMounted = false;
    };
  }, [user?.email]);

  const handleDelete = async (id, name) => {
    const isConfirmed = window.confirm(`Are you sure you want to permanently delete ${name}?`);
    if (!isConfirmed) return;

    try {
      const res = await axios.delete(
        `${API_URL}/facilities/${id}?owner_email=${user.email}`,
        { withCredentials: true }
      );
      if (res.data.deletedCount > 0) {
        toast.success('Facility removed successfully');
        setFacilities(facilities.filter((f) => f._id !== id));
      } else {
        toast.error('Could not delete facility');
      }
    } catch (err) {
      console.error(err);
      toast.error('Failed to delete facility');
    }
  };

  const handleUpdate = (id) => {
    navigate(`/update-facility/${id}`);
  };

  if (loading) return <Loading />;

  return (
    <div className="max-w-7xl mx-auto px-6 py-12 space-y-6 bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-50 min-h-screen transition-colors duration-200">
      <div className="space-y-1">
        <h2 className="text-2xl font-extrabold tracking-tight text-slate-900 dark:text-slate-100">Manage My Facilities</h2>
        <p className="text-xs text-slate-500 dark:text-slate-400">Update or remove your listed sports infrastructures</p>
      </div>

      {facilities.length === 0 ? (
        <div className="text-center py-20 border border-dashed border-slate-200 dark:border-slate-800 rounded-xl bg-white dark:bg-slate-900">
          <p className="text-slate-500 dark:text-slate-400 text-sm font-medium">You haven't added any facilities yet.</p>
        </div>
      ) : (
        <div className="overflow-x-auto border border-slate-200 dark:border-slate-900 rounded-xl bg-white dark:bg-slate-900 shadow-sm">
          <table className="w-full text-left text-sm border-collapse">
            <thead>
              <tr className="border-b border-slate-200 dark:border-slate-900 bg-slate-50 dark:bg-slate-900/50 text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                <th className="p-4">Facility</th>
                <th className="p-4">Type</th>
                <th className="p-4">Location</th>
                <th className="p-4">Price / Hr</th>
                <th className="p-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 dark:divide-slate-900">
              {facilities.map((facility) => (
                <tr key={facility._id} className="text-slate-700 dark:text-slate-300">
                  <td className="p-4 font-semibold text-slate-900 dark:text-slate-100">{facility.name}</td>
                  <td className="p-4 capitalize">{facility.facility_type}</td>
                  <td className="p-4 text-xs text-slate-500 dark:text-slate-400">{facility.location}</td>
                  <td className="p-4 font-medium">{facility.price_per_hour} BDT</td>
                  <td className="p-4 text-right space-x-2">
                    <button
                      onClick={() => handleUpdate(facility._id)}
                      className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 font-bold text-xs rounded-lg transition-colors cursor-pointer"
                    >
                      Update
                    </button>
                    <button
                      onClick={() => handleDelete(facility._id, facility.name)}
                      className="px-3 py-1.5 bg-rose-50 hover:bg-rose-100 dark:bg-rose-500/10 dark:hover:bg-rose-500/20 text-rose-600 dark:text-rose-400 font-bold text-xs rounded-lg transition-colors cursor-pointer"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default ManageMyFacilities;
