import React, { useState } from 'react';
import { FaUserInjured, FaHeartbeat, FaHistory, FaRobot, FaUserMd, FaCog, FaChevronRight, FaChevronLeft, FaSun, FaMoon } from 'react-icons/fa';

const Navbar = ({ activeTab, setActiveTab, isDarkMode, toggleDarkMode }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const tabs = [
    { id: 'patients', label: 'Patients', icon: FaUserInjured },
    { id: 'vitals', label: 'Vitals', icon: FaHeartbeat },
    { id: 'history', label: 'History', icon: FaHistory },
    { id: 'medibot', label: 'Medibot', icon: FaRobot },
    { id: 'doctors', label: "Doctor's History", icon: FaUserMd },
    { id: 'settings', label: 'Settings', icon: FaCog },
  ];

  return (
    <nav className={`bg-white text-gray-800 h-screen fixed left-0 transition-all duration-300 ${isExpanded ? 'w-64' : 'w-20'} shadow-lg z-50`}>
      <div className="p-4 text-center">
        <img src="https://randomuser.me/api/portraits/men/1.jpg" alt="Doctor" className="w-16 h-16 rounded-full mx-auto mb-2 border-4 border-blue-500" />
        {isExpanded && (
          <div>
            <p className="font-semibold text-lg">Dr. John Doe</p>
            <p className="text-sm text-gray-600">Cardiologist</p>
          </div>
        )}
      </div>
      <ul className="py-4">
        {tabs.map((tab) => (
          <li key={tab.id} className="mb-2 px-3">
            <button
              className={`w-full text-left py-3 px-4 flex items-center rounded-lg transition-all duration-200 ${
                activeTab === tab.id
                  ? 'bg-blue-100 text-blue-600 shadow-md'
                  : 'hover:bg-gray-100'
              }`}
              onClick={() => setActiveTab(tab.id)}
            >
              <tab.icon className={`text-xl ${activeTab === tab.id ? 'text-blue-600' : 'text-gray-600'}`} />
              {isExpanded && (
                <span className={`ml-4 font-medium ${activeTab === tab.id ? 'text-blue-600' : 'text-gray-700'}`}>
                  {tab.label}
                </span>
              )}
            </button>
          </li>
        ))}
      </ul>
      <div className="absolute bottom-20 left-0 w-full px-4 py-2 flex items-center justify-center">
        <button
          onClick={toggleDarkMode}
          className={`text-xl p-2 rounded-full transition-colors duration-200 ${
            isDarkMode ? 'bg-gray-200 text-yellow-500 hover:bg-gray-300' : 'bg-gray-800 text-yellow-300 hover:bg-gray-700'
          }`}
        >
          {isDarkMode ? <FaSun /> : <FaMoon />}
        </button>
      </div>
      <button
        className="absolute bottom-4 left-0 w-full px-4 py-2 flex items-center justify-center text-gray-600 hover:text-blue-600 transition-colors duration-200"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        {isExpanded ? <FaChevronLeft /> : <FaChevronRight />}
      </button>
    </nav>
  );
};

export default Navbar;
