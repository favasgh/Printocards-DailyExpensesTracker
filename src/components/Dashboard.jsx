import { useState, useEffect } from 'react';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';
const API_BASE = `${API_URL}/api`;

function Dashboard({ onRefresh, selectedDate, onDateChange }) {
  const [summary, setSummary] = useState({
    totalIn: 0,
    totalOut: 0,
    balance: 0
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchSummary();
  }, [onRefresh, selectedDate]);

  const fetchSummary = async () => {
    try {
      setLoading(true);
      const url = selectedDate 
        ? `${API_BASE}/summary?date=${selectedDate}`
        : `${API_BASE}/summary`;
      const response = await fetch(url);
      const result = await response.json();
      if (result.success) {
        setSummary(result.data);
      }
    } catch (error) {
      console.error('Error fetching summary:', error);
    } finally {
      setLoading(false);
    }
  };


  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="bg-white rounded-lg shadow p-6 animate-pulse">
          <div className="h-4 bg-gray-200 rounded w-1/2 mb-2"></div>
          <div className="h-8 bg-gray-200 rounded w-1/3"></div>
        </div>
        <div className="bg-white rounded-lg shadow p-6 animate-pulse">
          <div className="h-4 bg-gray-200 rounded w-1/2 mb-2"></div>
          <div className="h-8 bg-gray-200 rounded w-1/3"></div>
        </div>
        <div className="bg-white rounded-lg shadow p-6 animate-pulse">
          <div className="h-4 bg-gray-200 rounded w-1/2 mb-2"></div>
          <div className="h-8 bg-gray-200 rounded w-1/3"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
      <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl shadow-lg p-6 border border-green-100 hover:shadow-xl hover:scale-105 transition-all duration-300">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-xs font-medium text-gray-600 uppercase tracking-wider">
            {selectedDate ? 'Daily Cash In' : 'Total Cash In'}
          </h3>
          <div className="w-10 h-10 bg-green-500 rounded-lg flex items-center justify-center">
            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
          </div>
        </div>
        <p className="text-4xl font-bold text-green-600 tracking-tight">
          ₹{summary.totalIn.toFixed(2)}
        </p>
      </div>
      
      <div className="bg-gradient-to-br from-red-50 to-rose-50 rounded-2xl shadow-lg p-6 border border-red-100 hover:shadow-xl hover:scale-105 transition-all duration-300">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-xs font-medium text-gray-600 uppercase tracking-wider">
            {selectedDate ? 'Daily Cash Out' : 'Total Cash Out'}
          </h3>
          <div className="w-10 h-10 bg-red-500 rounded-lg flex items-center justify-center">
            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
            </svg>
          </div>
        </div>
        <p className="text-4xl font-bold text-red-600 tracking-tight">
          ₹{summary.totalOut.toFixed(2)}
        </p>
      </div>
      
      <div className={`bg-gradient-to-br rounded-2xl shadow-lg p-6 border hover:shadow-xl hover:scale-105 transition-all duration-300 ${
        summary.balance >= 0 
          ? 'from-orange-50 to-amber-50 border-orange-100' 
          : 'from-red-50 to-rose-50 border-red-100'
      }`}>
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-xs font-medium text-gray-600 uppercase tracking-wider">
            {selectedDate ? "Day's Balance" : 'Current Balance'}
          </h3>
          <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
            summary.balance >= 0 ? 'bg-orange-500' : 'bg-red-500'
          }`}>
            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
            </svg>
          </div>
        </div>
        <p className={`text-4xl font-bold tracking-tight ${
          summary.balance >= 0 ? 'text-orange-600' : 'text-red-600'
        }`}>
          ₹{summary.balance.toFixed(2)}
        </p>
      </div>
    </div>
  );
}

export default Dashboard;


