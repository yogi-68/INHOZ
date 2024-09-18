
import React, { useState, useEffect } from 'react';
import { FaHeartbeat, FaLungs, FaThermometer, FaArrowRight } from 'react-icons/fa';

const generateRandomPatient = (id) => ({
  id,
  name: `Patient ${id}`,
  photo: `https://randomuser.me/api/portraits/men/${id}.jpg`,
});

const generateRandomVitals = () => ({
  temperature: (Math.random() * (40 - 35) + 35).toFixed(1),
  heartRate: Math.floor(Math.random() * (120 - 60) + 60),
  bloodOxygen: Math.floor(Math.random() * (100 - 95) + 95),
});

const patients = Array.from({ length: 8 }, (_, i) => generateRandomPatient(i + 1));

const PatientDetails = ({ isDarkMode, setActiveTab, setSelectedPatient }) => {
  const [patientVitals, setPatientVitals] = useState(patients.map(() => generateRandomVitals()));

  useEffect(() => {
    const interval = setInterval(() => {
      setPatientVitals(patients.map(() => generateRandomVitals()));
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  const handlePatientClick = (patient) => {
    setSelectedPatient(patient);
    setActiveTab('vitals');
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {patients.map((patient, index) => (
        <div
          key={patient.id}
          className={`${
            isDarkMode ? 'bg-gray-700 hover:bg-gray-600' : 'bg-white hover:bg-gray-50'
          } p-6 rounded-lg shadow-md transition-all duration-300 transform hover:-translate-y-1 hover:shadow-lg cursor-pointer`}
          onClick={() => handlePatientClick(patient)}
        >
          <img src={patient.photo} alt={patient.name} className="w-24 h-24 rounded-full mx-auto mb-4 border-4 border-blue-500" />
          <h3 className="text-xl font-semibold text-center mb-4">{patient.name}</h3>
          <div className="grid grid-cols-3 gap-4 text-center">
            <div>
              <FaHeartbeat className="text-2xl text-red-500 mx-auto mb-2" />
              <p className="font-medium">Heart Rate</p>
              <p className="text-lg">{patientVitals[index].heartRate} bpm</p>
            </div>
            <div>
              <FaLungs className="text-2xl text-blue-500 mx-auto mb-2" />
              <p className="font-medium">SpO2</p>
              <p className="text-lg">{patientVitals[index].bloodOxygen}%</p>
            </div>
            <div>
              <FaThermometer className="text-2xl text-green-500 mx-auto mb-2" />
              <p className="font-medium">Temp</p>
              <p className="text-lg">{patientVitals[index].temperature}°C</p>
            </div>
          </div>
          <button
            className="mt-4 w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition-colors duration-200 flex items-center justify-center"
          >
            View Vitals <FaArrowRight className="ml-2" />
          </button>
        </div>
      ))}
    </div>
  );
};

export default PatientDetails;