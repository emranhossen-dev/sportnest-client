import { useContext, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router';
import axios from 'axios';
import toast from 'react-hot-toast';
import { AuthContext } from '../context/AuthContext';
import Loading from '../components/Loading';

const UpdateFacility = () => {
  const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';
  const { id } = useParams();
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    facility_type: 'football',
    image: '',
    location: '',
    price_per_hour: '',
    capacity: '',
    available_slots: '',
    description: '',
    owner_email: ''
  });

  useEffect(() => {
    let isMounted = true;

    const fetchFacility = async () => {
      try {
        setLoading(true);
        const res = await axios.get(`${API_URL}/facilities/${id}`);
        const facility = res.data;

        if (!isMounted) return;

        if (user?.email && facility.owner_email !== user.email) {
          toast.error('You are not allowed to edit this facility');
          navigate('/manage-facilities');
          return;
        }

        setFormData({
          name: facility.name || '',
          facility_type: facility.facility_type || 'football',
          image: facility.image || '',
          location: facility.location || '',
          price_per_hour: facility.price_per_hour || '',
          capacity: facility.capacity || '',
          available_slots: Array.isArray(facility.available_slots)
            ? facility.available_slots.join(', ')
            : facility.available_slots || '',
          description: facility.description || '',
          owner_email: facility.owner_email || ''
        });
      } catch (err) {
        console.error(err);
        toast.error('Failed to load facility');
        navigate('/manage-facilities');
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    if (id) fetchFacility();
    return () => {
      isMounted = false;
    };
  }, [id, user?.email, API_URL, navigate]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { name, location, price_per_hour, capacity, available_slots, description } = formData;

    if (!name || !location || !price_per_hour || !capacity || !available_slots || !description) {
      toast.error('Please fill in all required fields');
      return;
    }

    setSaving(true);

    try {
      const updatedData = {
        name,
        facility_type: formData.facility_type,
        image: formData.image,
        location,
        price_per_hour: Number(price_per_hour),
        capacity: Number(capacity),
        available_slots: available_slots.split(',').map((slot) => slot.trim()),
        description,
        owner_email: user?.email
      };

      const res = await axios.put(`${API_URL}/facilities/${id}`, updatedData, {
        withCredentials: true
      });

      if (res.data.modifiedCount > 0 || res.data.matchedCount > 0) {
        toast.success('Facility updated successfully!');
        navigate('/manage-facilities');
      } else {
        toast.error('No changes were saved');
      }
    } catch (err) {
      console.error(err);
      if (err.response?.status === 403) {
        toast.error('You are not allowed to update this facility');
      } else {
        toast.error('Failed to update facility');
      }
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <Loading />;

  return (
    <div className="min-h-[85vh] flex items-center justify-center px-6 bg-slate-50 dark:bg-slate-950 py-12 transition-colors duration-200">
      <div className="w-full max-w-2xl rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-900 p-8 shadow-sm">
        <div className="text-center space-y-2 mb-8">
          <h2 className="text-3xl font-black tracking-tight text-slate-900 dark:text-slate-100">Update Facility</h2>
          <p className="text-sm text-slate-500 dark:text-slate-400">Edit your listed sports ground or arena details</p>
        </div>

        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-1.5">
            <label className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">Facility Name</label>
            <input type="text" name="name" value={formData.name} onChange={handleChange} className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 focus:border-emerald-500 focus:outline-none text-sm text-slate-900 dark:text-slate-100 transition-colors" placeholder="Premium Football Turf" />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">Sport Type</label>
            <select name="facility_type" value={formData.facility_type} onChange={handleChange} className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 focus:border-emerald-500 focus:outline-none text-sm text-slate-700 dark:text-slate-300 bg-white dark:bg-slate-950 transition-colors">
              <option value="football">Football</option>
              <option value="badminton">Badminton</option>
              <option value="swimming">Swimming</option>
              <option value="tennis">Tennis</option>
              <option value="cricket">Cricket</option>
              <option value="basketball">Basketball</option>
            </select>
          </div>

          <div className="space-y-1.5 md:col-span-2">
            <label className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">Image URL</label>
            <input type="text" name="image" value={formData.image} onChange={handleChange} className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 focus:border-emerald-500 focus:outline-none text-sm text-slate-900 dark:text-slate-100 transition-colors" placeholder="https://i.ibb.co/..." />
            {formData.image && (
              <img src={formData.image} alt="Preview" className="mt-2 h-32 w-full object-cover rounded-lg border border-slate-200 dark:border-slate-800" />
            )}
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">Location</label>
            <input type="text" name="location" value={formData.location} onChange={handleChange} className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 focus:border-emerald-500 focus:outline-none text-sm text-slate-900 dark:text-slate-100 transition-colors" placeholder="Mohammadpur, Dhaka" />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">Price Per Hour (BDT)</label>
            <input type="number" name="price_per_hour" value={formData.price_per_hour} onChange={handleChange} className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 focus:border-emerald-500 focus:outline-none text-sm text-slate-900 dark:text-slate-100 transition-colors" placeholder="1500" />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">Capacity (Players)</label>
            <input type="number" name="capacity" value={formData.capacity} onChange={handleChange} className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 focus:border-emerald-500 focus:outline-none text-sm text-slate-900 dark:text-slate-100 transition-colors" placeholder="14" />
          </div>

          <div className="space-y-1.5 md:col-span-2">
            <label className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">Available Time Slots (Comma Separated)</label>
            <input type="text" name="available_slots" value={formData.available_slots} onChange={handleChange} className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 focus:border-emerald-500 focus:outline-none text-sm text-slate-900 dark:text-slate-100 transition-colors" placeholder="06:00 AM - 07:00 AM, 04:00 PM - 05:00 PM" />
          </div>

          <div className="space-y-1.5 md:col-span-2">
            <label className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">Owner Email</label>
            <input type="email" value={formData.owner_email} readOnly className="w-full px-4 py-3 rounded-xl bg-slate-100 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-sm text-slate-400 dark:text-slate-500 cursor-not-allowed focus:outline-none" />
          </div>

          <div className="space-y-1.5 md:col-span-2">
            <label className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">Description</label>
            <textarea name="description" value={formData.description} onChange={handleChange} rows="4" className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 focus:border-emerald-500 focus:outline-none text-sm text-slate-900 dark:text-slate-100 transition-colors resize-none" placeholder="Enter detailed description of your facility rules and perks..."></textarea>
          </div>

          <button type="submit" disabled={saving} className="w-full md:col-span-2 py-3 bg-slate-900 hover:bg-slate-800 dark:bg-emerald-500 dark:hover:bg-emerald-600 text-white dark:text-slate-950 font-bold rounded-xl transition-colors text-sm mt-2 cursor-pointer shadow-xs disabled:opacity-50 disabled:cursor-not-allowed">
            {saving ? 'Saving Changes...' : 'Save Changes'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default UpdateFacility;