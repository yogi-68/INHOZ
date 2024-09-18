import React, { useState, useEffect } from 'react';
import { FaThermometer, FaHeartbeat, FaLungs, FaFilePdf } from 'react-icons/fa';
import { GiMedicalDrip, GiHeartBeats } from 'react-icons/gi';
import { MdBloodtype } from 'react-icons/md';
import DangerDetection from './DangerDetection';
import jsPDF from 'jspdf';
import 'jspdf-autotable';

const generateRandomVitals = () => ({
  temperature: (Math.random() * (40 - 35) + 35).toFixed(1),
  pulse: Math.floor(Math.random() * (120 - 60) + 60),
  heartRate: Math.floor(Math.random() * (120 - 60) + 60),
  spO2: Math.floor(Math.random() * (100 - 90) + 90),
  ivLevel: Math.floor(Math.random() * 100),
  systolicBP: Math.floor(Math.random() * (180 - 90) + 90),
  diastolicBP: Math.floor(Math.random() * (120 - 60) + 60),
});

const getStatus = (vital, value) => {
  switch (vital) {
    case 'temperature':
      return value > 37.5 ? 'Fever' : 'Normal';
    case 'pulse':
    case 'heartRate':
      return value > 100 ? 'Elevated' : value < 60 ? 'Low' : 'Normal';
    case 'spO2':
      return value < 95 ? 'Low' : 'Normal';
    case 'ivLevel':
      return value < 20 ? 'Low' : 'Normal';
    case 'bloodPressure':
      const [systolic, diastolic] = value;
      if (systolic >= 140 || diastolic >= 90) return 'High';
      if (systolic <= 90 || diastolic <= 60) return 'Low';
      return 'Normal';
    default:
      return 'Normal';
  }
};

const VitalCard = ({ icon: Icon, title, value, unit, status }) => (
  <div className="bg-white p-6 rounded-lg shadow-md">
    <div className="flex items-center mb-4">
      <Icon className="text-blue-500 text-3xl mr-3" />
      <h3 className="text-xl font-semibold">{title}</h3>
    </div>
    <p className="text-4xl font-bold mb-2">{value} <span className="text-2xl">{unit}</span></p>
    <p className={`text-sm font-medium ${status === 'Normal' ? 'text-green-500' : 'text-red-500'}`}>
      Status: {status}
    </p>
  </div>
);

const Vitals = ({ isDarkMode, selectedPatient }) => {
  const [vitals, setVitals] = useState(generateRandomVitals());

  useEffect(() => {
    const interval = setInterval(() => {
      setVitals(generateRandomVitals());
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  const generatePDF = () => {
    const doc = new jsPDF();
    
    // Add title
    doc.setFontSize(20);
    doc.text('Patient Vitals Report', 105, 15, null, null, 'center');
    
    // Add patient name and date
    doc.setFontSize(12);
    doc.text(`Patient: ${selectedPatient.name}`, 20, 30);
    doc.text(`Date: ${new Date().toLocaleString()}`, 20, 40);
    
    // Create table data
    const tableData = [
      ['Vital', 'Value', 'Status'],
      ['Temperature', `${vitals.temperature}°C`, getStatus('temperature', vitals.temperature)],
      ['Pulse', `${vitals.pulse} bpm`, getStatus('pulse', vitals.pulse)],
      ['Heart Rate', `${vitals.heartRate} bpm`, getStatus('heartRate', vitals.heartRate)],
      ['SpO2', `${vitals.spO2}%`, getStatus('spO2', vitals.spO2)],
      ['IV Level', `${vitals.ivLevel}%`, getStatus('ivLevel', vitals.ivLevel)],
      ['Blood Pressure', `${vitals.systolicBP}/${vitals.diastolicBP} mmHg`, getStatus('bloodPressure', [vitals.systolicBP, vitals.diastolicBP])],
    ];
    
    // Add table to PDF
    doc.autoTable({
      startY: 50,
      head: [tableData[0]],
      body: tableData.slice(1),
      theme: 'grid',
      styles: { fontSize: 10, cellPadding: 5 },
      headStyles: { fillColor: [66, 135, 245], textColor: 255 },
      alternateRowStyles: { fillColor: [240, 240, 240] },
    });
    
    // Add footer
    doc.setFontSize(10);
    doc.text('This report is for informational purposes only and should be reviewed by a healthcare professional.', 20, doc.internal.pageSize.height - 20);
    
    // Save the PDF
    doc.save('patient_vitals_report.pdf');
  };

  return (
    <div className={`${isDarkMode ? 'text-white' : 'text-gray-800'}`}>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-bold relative">
          Vitals for {selectedPatient.name}
          <span className="absolute bottom-0 left-0 w-1/2 h-1 bg-blue-500"></span>
        </h2>
        <button
          onClick={generatePDF}
          className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded inline-flex items-center transition duration-300"
        >
          <FaFilePdf className="mr-2" />
          Download Report
        </button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
        <VitalCard icon={FaThermometer} title="Temperature" value={vitals.temperature} unit="°C" status={getStatus('temperature', vitals.temperature)} />
        <VitalCard icon={GiHeartBeats} title="Pulse" value={vitals.pulse} unit="bpm" status={getStatus('pulse', vitals.pulse)} />
        <VitalCard icon={FaHeartbeat} title="Heart Rate" value={vitals.heartRate} unit="bpm" status={getStatus('heartRate', vitals.heartRate)} />
        <VitalCard icon={FaLungs} title="SpO2" value={vitals.spO2} unit="%" status={getStatus('spO2', vitals.spO2)} />
        <VitalCard icon={GiMedicalDrip} title="IV Level" value={vitals.ivLevel} unit="%" status={getStatus('ivLevel', vitals.ivLevel)} />
        <VitalCard icon={MdBloodtype} title="Blood Pressure" value={`${vitals.systolicBP}/${vitals.diastolicBP}`} unit="mmHg" status={getStatus('bloodPressure', [vitals.systolicBP, vitals.diastolicBP])} />
      </div>
      <DangerDetection vitals={vitals} />
    </div>
  );
};

export default Vitals;
