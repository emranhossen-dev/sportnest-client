import { useContext, useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router';
import { AuthContext } from '../context/AuthContext';
import axios from 'axios';
import Loading from '../components/Loading';
import toast from 'react-hot-toast';

const FacilityDetails = () => {
    const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';
    const { id } = useParams();
    const { user } = useContext(AuthContext);
    const navigate = useNavigate();

    const [facility, setFacility] = useState(null);
    const [loading, setLoading] = useState(true);
    const [bookingDate, setBookingDate] = useState('');
    const [selectedSlot, setSelectedSlot] = useState('');
    const [hours, setHours] = useState(1);

    useEffect(() => {
        let isMounted = true;
        const fetchFacilityDetails = async () => {
            try {
                setLoading(true);
                const response = await axios.get(`${API_URL}/facilities/${id}`);
                if (isMounted) {
                    setFacility(response.data);
                    if (response.data && response.data.available_slots && response.data.available_slots.length > 0) {
                        setSelectedSlot(response.data.available_slots[0]);
                    }
                }
            } catch (error) {
                console.error("Error fetching facility details:", error);
            } finally {
                if (isMounted) {
                    setLoading(false);
                }
            }
        };
        if (id) {
            fetchFacilityDetails();
        }
    }, [id]);

    if (loading) return <Loading />;
    if (!facility) return <div className="text-center py-20 text-slate-500 bg-slate-50 dark:bg-slate-950 min-h-screen">Facility not found.</div>;

    const totalPrice = Number(hours) * facility.price_per_hour;

    const handleBookingSubmit = async (e) => {
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

        if (!selectedSlot) {
            toast.error('Please select a time slot');
            return;
        }

        const bookingData = {
            facility_id: facility._id,
            facility_name: facility.name,   
            user_email: user.email,
            booking_date: bookingDate,
            time_slot: selectedSlot,
            hours: Number(hours),
            total_price: totalPrice,
            status: 'pending'
        };

        try {
            const response = await axios.post(`${API_URL}/bookings`, bookingData, { withCredentials: true });
            if (response.data.insertedId) {
                toast.success(`Successfully booked ${facility.name}!`);
                navigate('/my-bookings');
            }
        } catch (error) {
            console.error(error);
            toast.error('Failed to process booking');
        }
    };

    return (
        <div className="max-w-7xl mx-auto w-full px-6 py-12 grid grid-cols-1 lg:grid-cols-3 gap-12 bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 min-h-screen transition-colors duration-200">
            <div className="lg:col-span-2 space-y-6">
                <div className="relative aspect-video rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-800 bg-slate-100 dark:bg-slate-900">
                    <img src={facility.image} alt={facility.name} className="w-full h-full object-cover" />
                </div>
                <div className="space-y-3">
                    <span className="inline-block px-2.5 py-0.5 bg-emerald-100 dark:bg-emerald-500/10 text-emerald-800 dark:text-emerald-400 text-xs font-bold uppercase tracking-wider rounded-md">
                        {facility.facility_type}
                    </span>
                    <h1 className="text-2xl font-extrabold text-slate-900 dark:text-slate-50">{facility.name}</h1>
                    <p className="text-xs text-slate-500 dark:text-slate-400">📍 {facility.location}</p>

                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 py-4 border-y border-slate-200 dark:border-slate-800">
                        <div className="p-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
                            <p className="text-xs text-slate-400 dark:text-slate-500 font-bold uppercase">Price</p>
                            <p className="text-base font-bold text-emerald-600 dark:text-emerald-400">{facility.price_per_hour} BDT/hr</p>
                        </div>
                        <div className="p-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
                            <p className="text-xs text-slate-400 dark:text-slate-500 font-bold uppercase">Capacity</p>
                            <p className="text-base font-bold text-slate-800 dark:text-slate-200">{facility.capacity} Players</p>
                        </div>
                        <div className="p-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 col-span-2 sm:col-span-1">
                            <p className="text-xs text-slate-400 dark:text-slate-500 font-bold uppercase">Total Bookings</p>
                            <p className="text-base font-bold text-slate-800 dark:text-slate-200">{facility.booking_count || 0} Matches</p>
                        </div>
                    </div>

                    <div className="space-y-2 pt-2">
                        <h3 className="text-md font-bold text-slate-800 dark:text-slate-200">Description</h3>
                        <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">{facility.description}</p>
                    </div>
                </div>
            </div>

            <div className="lg:col-span-1">
                <div className="sticky top-24 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 shadow-sm space-y-5">
                    <div className="border-b border-slate-100 dark:border-slate-800 pb-3">
                        <h3 className="text-lg font-bold text-slate-900 dark:text-slate-50">Reserve Slot</h3>
                    </div>

                    <form onSubmit={handleBookingSubmit} className="space-y-4">
                        <div className="space-y-1">
                            <label className="text-xs font-semibold text-slate-500 dark:text-slate-400">Facility Name</label>
                            <input type="text" value={facility.name} readOnly className="w-full px-3 py-2 rounded-lg bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-sm text-slate-400 dark:text-slate-500 cursor-not-allowed focus:outline-none" />
                        </div>

                        <div className="space-y-1">
                            <label className="text-xs font-semibold text-slate-500 dark:text-slate-400">Select Date</label>
                            <input type="date" value={bookingDate} onChange={(e) => setBookingDate(e.target.value)} className="w-full px-3 py-2 rounded-lg bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 focus:border-emerald-500 focus:outline-none text-sm text-slate-800 dark:text-slate-200" />
                        </div>

                        <div className="space-y-1">
                            <label className="text-xs font-semibold text-slate-500 dark:text-slate-400">Available Slots</label>
                            <select value={selectedSlot} onChange={(e) => setSelectedSlot(e.target.value)} className="w-full px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-800 focus:border-emerald-500 focus:outline-none text-sm text-slate-700 dark:text-slate-300 bg-white dark:bg-slate-950">
                                {facility.available_slots?.map((slot, index) => (
                                    <option key={index} value={slot}>{slot}</option>
                                ))}
                            </select>
                        </div>

                        <div className="space-y-1">
                            <label className="text-xs font-semibold text-slate-500 dark:text-slate-400">Duration (Hours)</label>
                            <input type="number" min="1" max="5" value={hours} onChange={(e) => setHours(e.target.value)} className="w-full px-3 py-2 rounded-lg bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 focus:border-emerald-500 focus:outline-none text-sm text-slate-800 dark:text-slate-200" />
                        </div>

                        <div className="border-t border-slate-100 dark:border-slate-800 pt-3 flex items-center justify-between">
                            <span className="text-sm font-semibold text-slate-500 dark:text-slate-400">Total Bill:</span>
                            <span className="text-xl font-bold text-emerald-600 dark:text-emerald-400">{totalPrice} BDT</span>
                        </div>

                        <button type="submit" className="w-full py-2.5 bg-slate-900 hover:bg-slate-800 dark:bg-emerald-500 dark:hover:bg-emerald-600 text-white dark:text-slate-950 font-bold rounded-lg transition-colors text-sm shadow-xs cursor-pointer">
                            Confirm Booking
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default FacilityDetails;