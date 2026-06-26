import { useContext, useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router';
import { AuthContext } from '../context/AuthContext';
import Loading from '../components/Loading';
import toast from 'react-hot-toast';

const FacilityDetails = () => {
  const { id } = useParams();
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  
  const [facility, setFacility] = useState(null);
  const [loading, setLoading] = useState(true);
  const [bookingDate, setBookingDate] = useState('');
  const [selectedSlot, setSelectedSlot] = useState('');
  const [hours, setHours] = useState(1);

  useEffect(() => {
    fetch('/facilities.json')
      .then((res) => res.json())
      .then((data) => {
        const found = data.find((f) => f._id === id);
        setFacility(found);
        if (found && found.available_slots.length > 0) {
          setSelectedSlot(found.available_slots[0]);
        }
        setLoading(false);
      });
  }, [id]);

  if (loading) return <Loading />;
  if (!facility) return <div className="text-center py-20 text-slate-500 bg-slate-50 min-h-screen">Facility not found.</div>;

  const totalPrice = hours * facility.price_per_hour;

  const handleBookingSubmit = (e) => {
    e.preventDefault();
    if (!user) {
      toast.error('Please login to book a facility');
      navigate('/login');
      return;
    }

    if (!bookingDate) {
      toast.error('Please select a booking date');
      return;
    }

    toast.success(`Successfully booked ${facility.name}!`);
  };

  return (
    <div className="max-w-7xl mx-auto px-6 py-12 grid grid-cols-1 lg:grid-cols-3 gap-12 bg-slate-50 text-slate-900 min-h-screen">
      <div className="lg:col-span-2 space-y-6">
        <div className="relative aspect-video rounded-2xl overflow-hidden border border-slate-200 bg-slate-100">
          <img src={facility.image} alt={facility.name} className="w-full h-full object-cover" />
        </div>
        <div className="space-y-3">
          <span className="inline-block px-2.5 py-0.5 bg-emerald-100 text-emerald-800 text-xs font-bold uppercase tracking-wider rounded-md">
            {facility.facility_type}
          </span>
          <h1 className="text-2xl font-extrabold text-slate-900">{facility.name}</h1>
          <p className="text-xs text-slate-500">📍 {facility.location}</p>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 py-4 border-y border-slate-200">
            <div className="p-4 rounded-xl bg-white border border-slate-200">
              <p className="text-xs text-slate-400 font-bold uppercase">Price</p>
              <p className="text-base font-bold text-emerald-600">{facility.price_per_hour} BDT/hr</p>
            </div>
            <div className="p-4 rounded-xl bg-white border border-slate-200">
              <p className="text-xs text-slate-400 font-bold uppercase">Capacity</p>
              <p className="text-base font-bold text-slate-800">{facility.capacity} Players</p>
            </div>
            <div className="p-4 rounded-xl bg-white border border-slate-200 col-span-2 sm:col-span-1">
              <p className="text-xs text-slate-400 font-bold uppercase">Total Bookings</p>
              <p className="text-base font-bold text-slate-800">{facility.booking_count} Matches</p>
            </div>
          </div>
          <div className="space-y-2 pt-2">
            <h3 className="text-md font-bold text-slate-800">Description</h3>
            <p className="text-sm text-slate-600 leading-relaxed">{facility.description}</p>
          </div>
        </div>
      </div>

      <div className="lg:col-span-1">
        <div className="sticky top-24 rounded-xl border border-slate-200 bg-white p-6 shadow-sm space-y-5">
          <div className="border-b border-slate-100 pb-3">
            <h3 className="text-lg font-bold text-slate-900">Reserve Slot</h3>
          </div>

          <form onSubmit={handleBookingSubmit} className="space-y-4">
            <div className="space-y-1">
              <label className="text-xs font-semibold text-slate-500">Facility Name</label>
              <input type="text" value={facility.name} readOnly className="w-full px-3 py-2 rounded-lg bg-slate-50 border border-slate-200 text-sm text-slate-400 cursor-not-allowed focus:outline-none" />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-semibold text-slate-500">Select Date</label>
              <input type="date" value={bookingDate} onChange={(e) => setBookingDate(e.target.value)} className="w-full px-3 py-2 rounded-lg border border-slate-200 focus:border-emerald-500 focus:outline-none text-sm text-slate-800" />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-semibold text-slate-500">Available Slots</label>
              <select value={selectedSlot} onChange={(e) => setSelectedSlot(e.target.value)} className="w-full px-3 py-2 rounded-lg border border-slate-200 focus:border-emerald-500 focus:outline-none text-sm text-slate-700 bg-white">
                {facility.available_slots.map((slot, index) => (
                  <option key={index} value={slot}>{slot}</option>
                ))}
              </select>
            </div>

            <div className="space-y-1">
              <label className="text-xs font-semibold text-slate-500">Duration (Hours)</label>
              <input type="number" min="1" max="5" value={hours} onChange={(e) => setHours(e.target.value)} className="w-full px-3 py-2 rounded-lg border border-slate-200 focus:border-emerald-500 focus:outline-none text-sm text-slate-800" />
            </div>

            <div className="border-t border-slate-100 pt-3 flex items-center justify-between">
              <span className="text-sm font-semibold text-slate-500">Total Bill:</span>
              <span className="text-xl font-bold text-emerald-600">{totalPrice} BDT</span>
            </div>

            <button type="submit" className="w-full py-2.5 bg-slate-900 hover:bg-slate-800 text-white font-bold rounded-lg transition-colors text-sm shadow-xs">
              Confirm Booking
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default FacilityDetails;