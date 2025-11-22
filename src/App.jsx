import { useState } from 'react';
import Dashboard from './components/Dashboard';
import EntryForm from './components/EntryForm';
import EntryTable from './components/EntryTable';
import logo from './assets/logo.jpg';

function App() {
  const [refreshTrigger, setRefreshTrigger] = useState(0);
  const [editingEntry, setEditingEntry] = useState(null);
  const [selectedDate, setSelectedDate] = useState('');

  const handleEntryAdded = () => {
    // Trigger refresh of dashboard and table
    setRefreshTrigger(prev => prev + 1);
    setEditingEntry(null); // Clear edit mode after save
  };

  const handleEdit = (entry) => {
    setEditingEntry(entry);
    // Scroll to form
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleCancelEdit = () => {
    setEditingEntry(null);
  };

  const handleDelete = () => {
    // Trigger refresh of dashboard and table
    setRefreshTrigger(prev => prev + 1);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm shadow-lg border-b border-gray-200/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col items-center gap-3">
            <img 
              src={logo} 
              alt="PrintoCards Logo" 
              className="h-14 w-auto object-contain drop-shadow-sm"
            />
            <h1 className="text-2xl font-semibold tracking-tight text-black">
              Petty Cash Manager
            </h1>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Add/Edit Entry Form */}
        <EntryForm 
          onEntryAdded={handleEntryAdded} 
          editEntry={editingEntry}
          onCancel={editingEntry ? handleCancelEdit : null}
        />

        {/* Dashboard Summary */}
        <Dashboard 
          onRefresh={refreshTrigger} 
          selectedDate={selectedDate}
          onDateChange={setSelectedDate}
        />

        {/* Entries Table */}
        <EntryTable 
          refreshTrigger={refreshTrigger} 
          onEdit={handleEdit}
          onDelete={handleDelete}
          selectedDate={selectedDate}
          onDateChange={setSelectedDate}
        />
      </main>

      {/* Footer */}
      <footer className="bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 border-t border-gray-700 mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <p className="text-center text-sm text-gray-300">
            © 2025 PrintoCards And Technologies , Petty Cash Manager
          </p>
        </div>
      </footer>
    </div>
  );
}

export default App;
