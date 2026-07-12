import React, { useState, useEffect } from 'react';
import { fetchAvailableTests, bookLabTest } from '../../services/labService';

function LabTests() {
  const [tests, setTests] = useState([]);
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('');
  const [selectedTest, setSelectedTest] = useState(null); // Modal state
  const [bookingData, setBookingData] = useState({ bookingDate: '', bookingTime: '', notes: '' });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  // Static array for premium category tab indicators
  const categoriesList = [
    { id: '', name: 'All Categories' },
    { id: 'blood', name: 'Blood Test' },
    { id: 'urine', name: 'Urine Test' },
    { id: 'imaging', name: 'Imaging (X-Ray, etc)' },
    { id: 'cardiac', name: 'Cardiac' }
  ];

  // Fetch tests from backend
  const loadTests = async () => {
    try {
      const response = await fetchAvailableTests({ search, category });
      if (response.success) {
        setTests(response.data);
      }
    } catch (error) {
      console.error("Error loading tests", error);
    }
  };

  useEffect(() => {
    loadTests();
  }, [search, category]);

  // Handle Booking Submission
  const handleBookingSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');
    try {
      const payload = {
        testId: selectedTest._id,
        bookingDate: bookingData.bookingDate,
        bookingTime: bookingData.bookingTime,
        notes: bookingData.notes
      };
      const response = await bookLabTest(payload);
      if (response.success) {
        setMessage('Test Booked Successfully!'); // Removed emoji
        setTimeout(() => {
          setSelectedTest(null); // Close Modal
          setBookingData({ bookingDate: '', bookingTime: '', notes: '' });
          setMessage('');
        }, 2000);
      }
    } catch (error) {
      setMessage('Booking failed. Please try again.'); // Removed emoji
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 py-12 px-4 max-w-7xl mx-auto font-sans antialiased">
      {/* Header */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-extrabold text-slate-900 tracking-tight">
          Diagnostic <span className="text-teal-600 font-semibold">Lab Tests</span>
        </h1>
        <p className="text-slate-500 mt-3 text-lg max-w-md mx-auto">
          Book professional lab tests from the comfort of your home.
        </p>
      </div>

      {/* Premium Search & Categories Tab Bar */}
      <div className="space-y-6 mb-10 bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
        {/* Search Field */}
        <div className="relative flex items-center">
          <svg className="w-5 h-5 text-slate-400 absolute left-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <input 
            type="text" 
            placeholder="Search for blood test, urine test..." 
            className="w-full pl-12 pr-4 py-3.5 rounded-xl border border-slate-200 bg-slate-50/50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 transition-all text-sm placeholder:text-slate-400"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        {/* Premium Categories Filter UI */}
        <div className="border-t border-slate-50 pt-4">
          <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-3">Filter by Category</p>
          <div className="flex flex-wrap gap-2">
            {categoriesList.map((cat) => (
              <button
                key={cat.id}
                type="button"
                onClick={() => setCategory(cat.id)}
                className={`px-4 py-2 rounded-xl text-xs font-semibold tracking-wide transition-all duration-200 border ${
                  category === cat.id
                    ? 'bg-teal-600 border-teal-600 text-white shadow-sm shadow-teal-600/10'
                    : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50 hover:border-slate-300'
                }`}
              >
                {cat.name}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Grid List */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {tests.map((test) => (
          <div key={test._id} className="bg-white p-6 rounded-2xl border border-slate-100 flex flex-col justify-between hover:shadow-lg hover:border-slate-200/60 transition-all duration-300">
            <div>
              <span className="text-[10px] font-bold uppercase tracking-widest text-teal-700 bg-teal-50 border border-teal-100 px-2.5 py-1 rounded-lg">{test.category}</span>
              <h3 className="text-xl font-bold text-slate-900 mt-4 leading-snug">{test.name}</h3>
              <p className="text-slate-500 text-sm mt-2 line-clamp-2 leading-relaxed">{test.description}</p>
              
              <div className="mt-5 space-y-2.5 text-xs text-slate-600 bg-slate-50 p-3 rounded-xl border border-slate-100">
                <div className="flex items-center gap-2">
                  <svg className="w-4 h-4 text-slate-400 shrink-0" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <p><span className="font-semibold text-slate-700">Turnaround:</span> {test.turnaroundTime}</p>
                </div>
                <div className="flex items-start gap-2">
                  <svg className="w-4 h-4 text-slate-400 shrink-0 mt-0.5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                  </svg>
                  <p><span className="font-semibold text-slate-700">Instruction:</span> {test.preparationInstructions}</p>
                </div>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between">
              <div className="flex flex-col">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Total Price</span>
                <span className="text-2xl font-extrabold text-slate-900">Rs. {test.price}</span>
              </div>
              <button 
                onClick={() => setSelectedTest(test)}
                className="bg-teal-600 text-white px-5 py-2.5 rounded-xl text-sm font-semibold hover:bg-teal-700 active:scale-[0.98] transition-all shadow-sm shadow-teal-600/10"
              >
                Book Now
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* ============ BOOKING MODAL ============ */}
      {selectedTest && (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-xl border border-slate-100 relative animate-in fade-in zoom-in-95 duration-200">
            <h3 className="text-2xl font-bold text-slate-900 mb-1">Book Appointment</h3>
            <p className="text-sm text-teal-600 font-medium mb-5">{selectedTest.name}</p>

            {message && (
              <div className={`p-3 rounded-xl mb-5 text-xs font-semibold text-center flex items-center justify-center gap-2 border ${
                message.includes('Successfully') 
                  ? 'bg-emerald-50 text-emerald-700 border-emerald-100' 
                  : 'bg-rose-50 text-rose-700 border-rose-100'
              }`}>
                {message.includes('Successfully') ? (
                  <svg className="w-4 h-4 text-emerald-600" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                ) : (
                  <svg className="w-4 h-4 text-rose-600" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                  </svg>
                )}
                {message}
              </div>
            )}

            <form onSubmit={handleBookingSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1.5">Preferred Date</label>
                <input 
                  type="date" 
                  required
                  className="w-full p-2.5 rounded-xl border border-slate-200 bg-slate-50/50 focus:bg-white focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 focus:outline-none text-sm text-slate-700"
                  value={bookingData.bookingDate}
                  onChange={(e) => setBookingData({...bookingData, bookingDate: e.target.value})}
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1.5">Preferred Time</label>
                <input 
                  type="time" 
                  required
                  className="w-full p-2.5 rounded-xl border border-slate-200 bg-slate-50/50 focus:bg-white focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 focus:outline-none text-sm text-slate-700"
                  value={bookingData.bookingTime}
                  onChange={(e) => setBookingData({...bookingData, bookingTime: e.target.value})}
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1.5">Symptoms / Notes (Optional)</label>
                <textarea 
                  rows="3"
                  placeholder="Any specific condition or requirements..."
                  className="w-full p-2.5 rounded-xl border border-slate-200 bg-slate-50/50 focus:bg-white focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 focus:outline-none text-sm text-slate-700 resize-none placeholder:text-slate-400"
                  value={bookingData.notes}
                  onChange={(e) => setBookingData({...bookingData, notes: e.target.value})}
                ></textarea>
              </div>

              <div className="flex gap-3 pt-3">
                <button 
                  type="button" 
                  onClick={() => setSelectedTest(null)}
                  className="flex-1 py-2.5 rounded-xl border border-slate-200 font-semibold text-sm text-slate-600 hover:bg-slate-50 transition-colors"
                >
                  Cancel
                </button>
                <button 
                  type="submit" 
                  disabled={loading}
                  className="flex-1 py-2.5 bg-teal-600 text-white font-semibold text-sm rounded-xl hover:bg-teal-700 transition-colors disabled:opacity-50 shadow-sm shadow-teal-600/10"
                >
                  {loading ? 'Processing...' : 'Confirm'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default LabTests;