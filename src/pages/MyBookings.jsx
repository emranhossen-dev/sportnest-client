import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../context/AuthContext';
import axios from 'axios';
import Loading from '../components/Loading';
import toast from 'react-hot-toast';

const MyBookings = () => {
  const { user } = useContext(AuthContext);
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;
    const fetchMyBookings = async () => {
      if (!user?.email) return;
      try {
        setLoading(true);
        const response = await axios.get(`http://localhost:5000/bookings?email=${user.email}`, { withCredentials: true });
        if (isMounted) {
          setBookings(response.data || []);
        }
      } catch (error) {
        console.error("Error fetching bookings:", error);
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    fetchMyBookings();
    return () => {
      isMounted = false;
    };
  }, [user?.email]);

  const handleCancelBooking = async (id) => {
    if (!window.confirm("Are you sure you want to cancel this booking?")) return;

    try {
      const response = await axios.delete(`http://localhost:5000/bookings/${id}`, { withCredentials: true });
      if (response.data.deletedCount > 0) {
        toast.success("Booking cancelled successfully!");
        setBookings(bookings.filter(b => b._id !== id));
      }
    } catch (error) {
      console.error(error);
      toast.error("Failed to cancel booking");
    }
  };

  if (loading) return <Loading />;

  return (
    <div className="max-w-7xl mx-auto w-full px-6 py-12 space-y-8 bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 min-h-screen transition-colors duration-200">
      <div className="space-y-2">
        <h1 className="text-3xl font-black tracking-tight text-slate-900 dark:text-slate-50">My Bookings</h1>
        <p className="text-sm text-slate-500 dark:text-slate-400">Manage your reserved slots and match schedules</p>
      </div>

      {bookings.length === 0 ? (
        <div className="text-center py-20 border border-dashed border-slate-200 dark:border-slate-800 rounded-xl bg-white dark:bg-slate-900">
          <p className="text-slate-500 dark:text-slate-400 text-sm font-medium">You haven't reserved any slots yet.</p>
        </div>
      ) : (
        <div className="border border-slate-200 dark:border-slate-800 rounded-xl bg-white dark:bg-slate-900 overflow-hidden shadow-xs">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-sm">
              <thead>
                <tr className="bg-slate-100 dark:bg-slate-950 text-slate-700 dark:text-slate-400 font-bold border-b border-slate-200 dark:border-slate-800">
                  <th className="p-4">Facility Name</th>
                  <th className="p-4">Date</th>
                  <th className="p-4">Time Slot</th>
                  <th className="p-4">Duration</th>
                  <th className="p-4">Total Price</th>
                  <th className="p-4">Status</th>
                  <th className="p-4 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                {bookings.map((booking) => (
                  <tr key={booking._id} className="hover:bg-slate-50/50 dark:hover:bg-slate-900/50 transition-colors">
                    <td className="p-4 font-semibold text-slate-900 dark:text-slate-100">{booking.facility_name || "Sports Arena"}</td>
                    <td className="p-4 text-slate-600 dark:text-slate-400">{booking.booking_date}</td>
                    <td className="p-4 text-slate-600 dark:text-slate-400">
                      <span className="px-2 py-1 bg-slate-100 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-md text-xs font-medium">
                        {booking.time_slot}
                      </span>
                    </td>
                    <td className="p-4 text-slate-600 dark:text-slate-400">{booking.hours} hrs</td>
                    <td className="p-4 font-bold text-emerald-600 dark:text-emerald-400">{booking.total_price} BDT</td>
                    <td className="p-4">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold uppercase tracking-wider ${
                        booking.status === 'approved' 
                          ? 'bg-emerald-100 dark:bg-emerald-500/10 text-emerald-800 dark:text-emerald-400'
                          : booking.status === 'cancelled'
                          ? 'bg-rose-100 dark:bg-rose-500/10 text-rose-800 dark:text-rose-400'
                          : 'bg-amber-100 dark:bg-amber-500/10 text-amber-800 dark:text-amber-400'
                      }`}>
                        {booking.status}
                      </span>
                    </td>
                    <td className="p-4 text-right">
                      {booking.status === 'pending' && (
                        <button onClick={() => handleCancelBooking(booking._id)} className="px-3 py-1.5 text-xs font-bold text-rose-600 dark:text-rose-400 hover:bg-rose-500/10 rounded-lg transition-colors cursor-pointer">
                          Cancel
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyBookings;