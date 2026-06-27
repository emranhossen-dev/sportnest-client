import { useContext, useState } from 'react';
import { AuthContext } from '../context/AuthContext';
import axios from 'axios';
import toast from 'react-hot-toast';

const AddFacility = () => {
  const { user } = useContext(AuthContext);
  const [imageFile, setImageFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    facility_type: 'football',
    location: '',
    price_per_hour: '',
    capacity: '',
    available_slots: '',
    description: ''
  });

  const IMGBB_API_KEY = import.meta.env.VITE_IMGBB_API_KEY;
  const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    setImageFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { name, location, price_per_hour, capacity, available_slots, description } = formData;

    if (!name || !location || !price_per_hour || !capacity || !available_slots || !description || !imageFile) {
      toast.error('Please fill in all fields and select an image');
      return;
    }

    setUploading(true);

    try {
      const imgFormData = new FormData();
      imgFormData.append('image', imageFile);

      const imgbbResponse = await axios.post(
        `https://api.imgbb.com/1/upload?key=${IMGBB_API_KEY}`,
        imgFormData
      );

      const displayUrl = imgbbResponse.data.data.display_url;

      const facilityData = {
        name,
        facility_type: formData.facility_type,
        image: displayUrl,
        location,
        price_per_hour: Number(price_per_hour),
        capacity: Number(capacity),
        available_slots: available_slots.split(',').map(slot => slot.trim()),
        description,
        owner_email: user?.email || 'emranhossen.dev@gmail.com',
        booking_count: 0
      };

      const response = await axios.post(`${API_URL}/facilities`, facilityData);
      
      if (response.data.insertedId) {
        toast.success('Facility added successfully!');
        setFormData({
          name: '',
          facility_type: 'football',
          location: '',
          price_per_hour: '',
          capacity: '',
          available_slots: '',
          description: ''
        });
        setImageFile(null);
        e.target.reset();
      }
    } catch (error) {
      console.error(error);
      toast.error('Failed to publish facility or image upload failed');
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="min-h-[85vh] flex items-center justify-center px-6 bg-slate-50 dark:bg-slate-950 py-12 transition-colors duration-200">
      <div className="w-full max-w-2xl rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-900 p-8 shadow-sm">
        <div className="text-center space-y-2 mb-8">
          <h2 className="text-3xl font-black tracking-tight text-slate-900 dark:text-slate-100">Add New Facility</h2>
          <p className="text-sm text-slate-500 dark:text-slate-400">List your sports ground or arena with SportNest</p>
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

          <div className="space-y-1.5">
            <label className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">Upload Image</label>
            <input type="file" accept="image/*" onChange={handleFileChange} className="w-full px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 focus:border-emerald-500 focus:outline-none text-sm text-slate-900 dark:text-slate-100 transition-colors file:mr-4 file:py-1 file:px-3 file:rounded-md file:border-0 file:text-xs file:font-semibold file:bg-slate-900 file:text-white dark:file:bg-emerald-500 dark:file:text-slate-950 cursor-pointer" />
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
            <label className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">Owner Email (Auto-filled)</label>
            <input type="email" value={user?.email || 'emranhossen.dev@gmail.com'} readOnly className="w-full px-4 py-3 rounded-xl bg-slate-100 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-sm text-slate-400 dark:text-slate-500 cursor-not-allowed focus:outline-none" />
          </div>

          <div className="space-y-1.5 md:col-span-2">
            <label className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">Description</label>
            <textarea name="description" value={formData.description} onChange={handleChange} rows="4" className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 focus:border-emerald-500 focus:outline-none text-sm text-slate-900 dark:text-slate-100 transition-colors resize-none" placeholder="Enter detailed description of your facility rules and perks..."></textarea>
          </div>

          <button type="submit" disabled={uploading} className="w-full md:col-span-2 py-3 bg-slate-900 hover:bg-slate-800 dark:bg-emerald-500 dark:hover:bg-emerald-600 text-white dark:text-slate-950 font-bold rounded-xl transition-colors text-sm mt-2 cursor-pointer shadow-xs disabled:opacity-50 disabled:cursor-not-allowed">
            {uploading ? 'Uploading Image...' : 'Publish Facility'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddFacility;