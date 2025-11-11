import { useState, useEffect } from 'react';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';
const API_BASE = `${API_URL}/api`;

function EntryForm({ onEntryAdded, onCancel, editEntry = null }) {
  const [formData, setFormData] = useState({
    date: editEntry ? editEntry.date : new Date().toISOString().split('T')[0],
    description: editEntry ? editEntry.description : '',
    category: editEntry ? editEntry.category : '',
    amount: editEntry ? editEntry.amount : '',
    type: editEntry ? editEntry.type : 'Debit',
    cash_from: editEntry ? editEntry.cash_from || '' : '',
    cash_to: editEntry ? editEntry.cash_to || '' : ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Update form when editEntry changes
  useEffect(() => {
    if (editEntry) {
      setFormData({
        date: editEntry.date,
        description: editEntry.description,
        category: editEntry.category,
        amount: editEntry.amount,
        type: editEntry.type,
        cash_from: editEntry.cash_from || '',
        cash_to: editEntry.cash_to || ''
      });
    } else {
      setFormData({
        date: new Date().toISOString().split('T')[0],
        description: '',
        category: '',
        amount: '',
        type: 'Debit',
        cash_from: '',
        cash_to: ''
      });
    }
  }, [editEntry]);

  const categories = [
    'Office Supplies',
    'Transportation',
    'Tea',
    'Other'
  ];

  const employees = [
    'Hiba',
    'Abu',
    'Rose',
    'Aneena',
    'Nuhman',
    'Rasheed',
    'Favas',
    'Ilyas',
    'Rashid',
    'Fahad',
    'Anees',
    "Saleem",
    "Others"

  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const url = editEntry 
        ? `${API_BASE}/entries/${editEntry.id}`
        : `${API_BASE}/entries`;
      const method = editEntry ? 'PUT' : 'POST';

      console.log('🌐 API URL:', API_URL);
      console.log('🔗 Full URL:', url);
      console.log('📤 Sending data:', formData);

      const response = await fetch(url, {
        method: method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      console.log('📥 Response status:', response.status, response.statusText);

      // Check if response is ok before parsing JSON
      if (!response.ok) {
        const errorText = await response.text();
        console.error('❌ Response error:', errorText);
        try {
          const errorJson = JSON.parse(errorText);
          setError(errorJson.error || errorJson.message || `Server error: ${response.status}`);
        } catch {
          setError(`Server error: ${response.status} ${response.statusText}`);
        }
        setLoading(false);
        return;
      }

      const result = await response.json();
      console.log('✅ Response data:', result);

      if (result.success) {
        // Reset form only if not editing
        if (!editEntry) {
          setFormData({
            date: new Date().toISOString().split('T')[0],
            description: '',
            category: '',
            amount: '',
            type: 'Debit',
            cash_from: '',
            cash_to: ''
          });
        }
        onEntryAdded();
        if (onCancel) onCancel();
      } else {
        const errorMsg = result.error || result.message || (editEntry ? 'Failed to update entry' : 'Failed to add entry');
        setError(errorMsg);
        console.error('API Error:', result);
      }
    } catch (err) {
      console.error('❌ Network error:', err);
      setError(`Network error: ${err.message}. Please check if the backend server is running and CORS is configured correctly.`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl p-8 mb-8 border border-gray-200/50">
      <div className="flex items-center gap-3 mb-6">
        <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
          editEntry ? 'bg-blue-500' : 'bg-gradient-to-br from-blue-500 to-purple-500'
        }`}>
          <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
        </div>
        <h2 className="text-2xl font-semibold tracking-tight bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent">
          {editEntry ? 'Edit Entry' : 'Add New Entry'}
        </h2>
      </div>
      
      {error && (
        <div className="bg-red-50 border-l-4 border-red-500 text-red-700 px-4 py-3 rounded-lg mb-6 shadow-sm">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label htmlFor="date" className="block text-sm font-medium text-gray-700 mb-2">
              Date *
            </label>
            <input
              type="date"
              id="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all bg-white hover:border-gray-300"
            />
          </div>

          <div>
            <label htmlFor="type" className="block text-sm font-medium text-gray-700 mb-2">
              Type *
            </label>
            <select
              id="type"
              name="type"
              value={formData.type}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all bg-white hover:border-gray-300"
            >
              <option value="Debit">Debit (Cash Out)</option>
              <option value="Credit">Credit (Cash In)</option>
            </select>
          </div>

          <div>
            <label htmlFor="amount" className="block text-sm font-medium text-gray-700 mb-2">
              Amount *
            </label>
            <input
              type="number"
              id="amount"
              name="amount"
              value={formData.amount}
              onChange={handleChange}
              step="0.01"
              min="0.01"
              required
              placeholder="0.00"
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all bg-white hover:border-gray-300"
            />
          </div>

          <div>
            <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-2">
              Category *
            </label>
            <select
              id="category"
              name="category"
              value={formData.category}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all bg-white hover:border-gray-300"
            >
              <option value="">Select category</option>
              {categories.map(cat => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
          </div>

          <div>
            <label htmlFor="cash_from" className="block text-sm font-medium text-gray-700 mb-2">
              Cash From (Employee)
            </label>
            <select
              id="cash_from"
              name="cash_from"
              value={formData.cash_from}
              onChange={handleChange}
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all bg-white hover:border-gray-300"
            >
              <option value="">Select employee</option>
              {employees.map(employee => (
                <option key={employee} value={employee}>{employee}</option>
              ))}
            </select>
          </div>

          <div>
            <label htmlFor="cash_to" className="block text-sm font-medium text-gray-700 mb-2">
              Cash To (Employee)
            </label>
            <select
              id="cash_to"
              name="cash_to"
              value={formData.cash_to}
              onChange={handleChange}
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all bg-white hover:border-gray-300"
            >
              <option value="">Select employee</option>
              {employees.map(employee => (
                <option key={employee} value={employee}>{employee}</option>
              ))}
            </select>
          </div>

          <div className="md:col-span-2">
            <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-2">
              Description
            </label>
            <input
              type="text"
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Enter description (optional)"
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all bg-white hover:border-gray-300"
            />
          </div>
        </div>

        <div className="flex gap-4 pt-6">
          <button
            type="submit"
            disabled={loading}
            className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-xl hover:from-blue-700 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-xl transition-all duration-200 font-medium"
          >
            {loading ? (editEntry ? 'Updating...' : 'Adding...') : (editEntry ? 'Update Entry' : 'Add Entry')}
          </button>
          {onCancel && (
            <button
              type="button"
              onClick={onCancel}
              className="px-6 py-3 border-2 border-gray-300 rounded-xl text-gray-700 hover:bg-gray-50 hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition-all duration-200 font-medium"
            >
              Cancel
            </button>
          )}
        </div>
      </form>
    </div>
  );
}

export default EntryForm;


