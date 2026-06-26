import { useState } from 'react';
import toast from 'react-hot-toast';

const MyBookings = () => {
  const [bookings, setBookings] = useState([
    {
      _id: 'b1',
      facility_name: 'Elite Football Turf',
      booking_date: '2026-07-10',
      time_slot: '04:00 PM - 05:00 PM',
      price: 1500,
      status: 'pending'
    },
    {
      _id: 'b2',
      facility_name: 'Smash Badminton Court',
      booking_date: '2026-07-12',
      time_slot: '09:00 AM - 10:00 AM',
      price: 800,
      status: 'confirmed'
    }
  ]);

  const handleCancelBooking = (id, name) => {
    const isConfirmed = window.confirm(`Are you sure you want to cancel the booking for ${name}?`);
    if (isConfirmed) {
      setBookings(bookings.filter((b) => b._id !== id));
      toast.success('Booking cancelled successfully');
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-6 py-12 space-y-6 bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-50 min-h-screen transition-colors duration-200">
      <div className="space-y-1">
        <h2 className="text-2xl font-extrabold tracking-tight text-slate-900 dark:text-slate-100">My Bookings</h2>
        <p className="text-xs text-slate-500 dark:text-slate-400">Track and manage your scheduled arena configurations</p>
      </div>

      {bookings.length === 0 ? (
        <div className="text-center py-20 border border-dashed border-slate-200 dark:border-slate-900 rounded-xl bg-white dark:bg-slate-900">
          <p className="text-sm text-slate-500 dark:text-slate-400">You have no active bookings at this time.</p>
        </div>
      ) : (
        <div className="overflow-x-auto border border-slate-200 dark:border-slate-900 rounded-xl bg-white dark:bg-slate-900 shadow-xs">
          <table className="w-full text-left text-sm border-collapse">
            <thead>
              <tr className="border-b border-slate-200 dark:border-slate-900 bg-slate-50 dark:bg-slate-900/50 text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                <th className="p-4">Facility Name</th>
                <th className="p-4">Date</th>
                <th className="p-4">Slot</th>
                <th className="p-4">Price</th>
                <th className="p-4">Status</th>
                <th className="p-4 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 dark:divide-slate-900">
              {bookings.map((booking) => (
                <tr key={booking._id} className="text-slate-700 dark:text-slate-300">
                  <td className="p-4 font-semibold text-slate-900 dark:text-slate-100">{booking.facility_name}</td>
                  <td className="p-4">{booking.booking_date}</td>
                  <td className="p-4 font-mono text-xs">{booking.time_slot}</td>
                  <td className="p-4 font-medium">{booking.price} BDT</td>
                  <td className="p-4">
                    <span className={`inline-block px-2 py-0.5 text-xs font-bold uppercase rounded-md ${booking.status === 'confirmed' ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-500/10 dark:text-emerald-400' : 'bg-amber-100 text-amber-800 dark:bg-amber-500/10 dark:text-amber-400'}`}>
                      {booking.status}
                    </span>
                  </td>
                  <td className="p-4 text-right">
                    <button onClick={() => handleCancelBooking(booking._id, booking.facility_name)} className="px-3 py-1.5 bg-rose-50 hover:bg-rose-100 dark:bg-rose-500/10 dark:hover:bg-rose-500/20 text-rose-600 dark:text-rose-400 font-bold text-xs rounded-lg transition-colors cursor-pointer">
                      Cancel
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

export default MyBookings;