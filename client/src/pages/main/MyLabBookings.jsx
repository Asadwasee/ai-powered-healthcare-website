import React, { useState, useEffect } from 'react';
import { fetchMyLabBookings, cancelLabBooking } from '../../services/labService';

function MyLabBookings() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadBookings = async () => {
    try {
      const response = await fetchMyLabBookings();
      if (response.success) {
        setBookings(response.data);
      }
    } catch (error) {
      console.error("Error loading user lab bookings", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadBookings();
  }, []);

  const handleCancel = async (id) => {
    if (window.confirm("Are you sure you want to cancel this lab booking?")) {
      try {
        const response = await cancelLabBooking(id);
        if (response.success) {
          alert("Booking cancelled successfully.");
          loadBookings(); // Reload data
        }
      } catch (error) {
        alert("Could not cancel booking.");
      }
    }
  };

  const getStatusBadge = (status) => {
    const styles = {
      pending: "bg-amber-50 text-amber-700 border-amber-200",
      confirmed: "bg-blue-50 text-blue-700 border-blue-200",
      completed: "bg-emerald-50 text-emerald-700 border-emerald-200",
      cancelled: "bg-rose-50 text-rose-700 border-rose-200",
    };
    return styles[status] || "bg-slate-50 text-slate-700";
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <div className="w-9 h-9 border-3 border-teal-600 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 py-12 px-4 max-w-5xl mx-auto font-sans antialiased">
      <div className="mb-10">
        <span className="text-xs font-bold uppercase tracking-widest text-teal-600 bg-teal-50 px-3 py-1.5 rounded-full border border-teal-100">Patient Dashboard</span>
        <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight mt-4">
          My Lab <span className="text-teal-600 font-medium">Bookings</span>
        </h1>
        <p className="text-slate-500 text-sm mt-1">Monitor, manage, and review your diagnostic test records securely.</p>
      </div>

      {bookings.length === 0 ? (
        <div className="bg-white rounded-2xl p-12 text-center border border-slate-100 shadow-sm max-w-md mx-auto">
          <div className="w-12 h-12 bg-slate-50 border border-slate-100 rounded-xl flex items-center justify-center mx-auto mb-4 text-slate-400">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
            </svg>
          </div>
          <h3 className="text-sm font-bold text-slate-800">No Appointments Recorded</h3>
          <p className="text-slate-500 text-xs mt-1">You haven't booked any laboratory examinations yet.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {bookings.map((booking) => (
            <div key={booking._id} className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-6 hover:shadow-md transition-all duration-200">
              <div className="flex-1">
                <div className="flex items-center gap-3 flex-wrap">
                  <h3 className="text-lg font-bold text-slate-900 tracking-tight">{booking.test?.name}</h3>
                  <span className={`text-[10px] uppercase tracking-wider px-2.5 py-0.5 font-bold rounded-md border ${getStatusBadge(booking.status)}`}>
                    {booking.status}
                  </span>
                </div>
                
                <div className="mt-4 grid grid-cols-2 md:grid-cols-3 gap-x-6 gap-y-2 text-xs text-slate-600">
                  <div className="flex items-center gap-2">
                    <svg className="w-4 h-4 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    <p><span className="font-semibold text-slate-700">Date:</span> {new Date(booking.bookingDate).toLocaleDateString()}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <svg className="w-4 h-4 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <p><span className="font-semibold text-slate-700">Time:</span> {booking.bookingTime}</p>
                  </div>
                  <div className="flex items-center gap-2 col-span-2 md:col-span-1">
                    <svg className="w-4 h-4 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 8h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                    <p><span className="font-semibold text-slate-700">Price:</span> Rs. {booking.test?.price}</p>
                  </div>
                </div>

                {booking.notes && (
                  <div className="flex gap-2 bg-slate-50 p-2.5 rounded-xl mt-3.5 border border-slate-100">
                    <span className="text-[10px] uppercase font-bold text-slate-400 block mt-0.5">Note:</span>
                    <p className="text-xs text-slate-600 italic">{booking.notes}</p>
                  </div>
                )}

                {booking.result && (
                  <div className="mt-4 p-4 bg-emerald-50/60 rounded-xl border border-emerald-100 flex gap-3">
                    <div className="w-8 h-8 rounded-lg bg-emerald-500/10 flex items-center justify-center text-emerald-700 flex-shrink-0">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-[10px] font-bold text-emerald-800 uppercase tracking-wider">Laboratory Report / Result</p>
                      <p className="text-sm text-emerald-900 font-medium mt-0.5">{booking.result}</p>
                    </div>
                  </div>
                )}
              </div>

              {booking.status !== 'cancelled' && booking.status !== 'completed' && (
                <button 
                  onClick={() => handleCancel(booking._id)}
                  className="text-xs font-bold text-rose-600 bg-rose-50 hover:bg-rose-100 px-4 py-2.5 rounded-xl border border-rose-100/70 transition-colors self-start md:self-center active:scale-95"
                >
                  Cancel Booking
                </button>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default MyLabBookings;