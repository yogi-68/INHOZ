import React, { useRef, useEffect } from 'react';
import { FaExclamationTriangle } from 'react-icons/fa';

const DangerDetection = ({ vitals }) => {
  const videoRef = useRef(null);

  useEffect(() => {
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
      navigator.mediaDevices.getUserMedia({ video: true })
        .then(stream => {
          if (videoRef.current) {
            videoRef.current.srcObject = stream;
          }
        })
        .catch(err => console.error("Error accessing the camera:", err));
    }
  }, []);

  const dangerConditions = [
    { condition: vitals.temperature > 39, message: 'High fever detected' },
    { condition: vitals.pulse > 120 || vitals.pulse < 50, message: 'Abnormal pulse rate' },
    { condition: vitals.heartRate > 120 || vitals.heartRate < 50, message: 'Abnormal heart rate' },
    { condition: vitals.spO2 < 90, message: 'Low blood oxygen levels' },
    { condition: vitals.ivLevel < 10, message: 'IV level critically low' },
    { condition: vitals.systolicBP > 180 || vitals.diastolicBP > 120, message: 'Hypertensive crisis' },
    { condition: vitals.systolicBP < 90 || vitals.diastolicBP < 60, message: 'Hypotension detected' },
  ];

  const detectedDangers = dangerConditions.filter(condition => condition.condition);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-xl font-semibold mb-4">Patient Monitoring</h3>
        <video ref={videoRef} autoPlay playsInline muted className="w-full h-auto rounded-lg" />
      </div>
      <div className={`p-6 rounded-lg ${detectedDangers.length === 0 ? 'bg-green-100' : 'bg-red-100'}`}>
        <div className="flex items-center mb-4">
          <FaExclamationTriangle className={`text-2xl mr-2 ${detectedDangers.length === 0 ? 'text-green-500' : 'text-red-500'}`} />
          <h3 className="text-xl font-semibold">
            Patient Status: {detectedDangers.length === 0 ? 'Stable' : 'Requires Attention'}
          </h3>
        </div>
        {detectedDangers.length === 0 ? (
          <p>All vitals are within normal ranges.</p>
        ) : (
          <ul className="list-disc list-inside">
            {detectedDangers.map((danger, index) => (
              <li key={index}>{danger.message}</li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default DangerDetection;
