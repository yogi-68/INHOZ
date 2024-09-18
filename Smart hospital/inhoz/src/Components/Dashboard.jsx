import React, { useState } from 'react';
import Navbar from './Navbar';
import PatientDetails from './PatientDetails';
import Vitals from './Vitals';
import PatientHistory from './PatientHistory';
import DoctorDashboard from './DoctorDashboard';
import Settings from './Settings';
// Import other components as needed

const Dashboard = ({ onLogout }) => {
  const [activeTab, setActiveTab] = useState('patients');
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [selectedPatient, setSelectedPatient] = useState(null);

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'patients':
        return <PatientDetails setActiveTab={setActiveTab} setSelectedPatient={setSelectedPatient} />;
      case 'vitals':
        return <Vitals isDarkMode={isDarkMode} selectedPatient={selectedPatient} />;
      case 'history':
        return <PatientHistory />;
      case 'doctors':
        return <DoctorDashboard />;
      case 'settings':
        return <Settings onLogout={onLogout} />;
      default:
        return <div>Select a tab</div>;
    }
  };

  return (
    <div className={`flex min-h-screen ${isDarkMode ? 'bg-gray-900 text-white' : 'bg-gray-100 text-gray-900'}`}>
      <Navbar 
        activeTab={activeTab} 
        setActiveTab={setActiveTab} 
        isDarkMode={isDarkMode} 
        toggleDarkMode={toggleDarkMode}
      />
      <div className="flex-1 ml-20 p-6">
        <h1 className="text-3xl font-bold mb-6">
          {activeTab.charAt(0).toUpperCase() + activeTab.slice(1)} Dashboard
        </h1>
        {renderContent()}
      </div>
    </div>
  );
};

export default Dashboard;
