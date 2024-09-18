import React, { useState } from 'react';
import { FaUser, FaEnvelope, FaPhone, FaHospital, FaUserMd, FaEdit, FaSave, FaUserPlus, FaGraduationCap, FaBriefcase, FaTimes } from 'react-icons/fa';

const Settings = ({ onLogout }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [isAddingPatient, setIsAddingPatient] = useState(false);
  const [newPatient, setNewPatient] = useState({ name: '', problem: '' });
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [doctorInfo, setDoctorInfo] = useState({
    name: 'Dr. John Doe',
    email: 'john.doe@hospital.com',
    phone: '+1 (555) 123-4567',
    hospital: 'General Hospital',
    specialization: 'Cardiologist',
    education: 'MD from Harvard Medical School',
    experience: '15 years',
    profilePicture: 'https://randomuser.me/api/portraits/men/1.jpg'
  });
  const [editedInfo, setEditedInfo] = useState({...doctorInfo});

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedInfo(prevInfo => ({
      ...prevInfo,
      [name]: value
    }));
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = () => {
    setDoctorInfo(editedInfo);
    setIsEditing(false);
    // Here you would typically send the updated info to your backend
    console.log('Updated doctor info:', editedInfo);
  };

  const handleAddPatient = () => {
    setIsAddingPatient(true);
  };

  const handleNewPatientChange = (e) => {
    const { name, value } = e.target;
    setNewPatient(prevPatient => ({
      ...prevPatient,
      [name]: value
    }));
  };

  const handleAddNewPatient = () => {
    // Here you would typically send the new patient info to your backend
    console.log('New patient added:', newPatient);
    setIsAddingPatient(false);
    setNewPatient({ name: '', problem: '' });
    setShowSuccessMessage(true);
    setTimeout(() => setShowSuccessMessage(false), 3000);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="bg-white rounded-lg shadow-md p-8">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-3xl font-bold">Doctor Profile</h2>
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline flex items-center"
            onClick={handleAddPatient}
          >
            <FaUserPlus className="mr-2" /> Add New Patient
          </button>
        </div>
        <div className="flex flex-col lg:flex-row">
          <div className="lg:w-1/3 mb-6 lg:mb-0">
            <img
              src={doctorInfo.profilePicture}
              alt="Doctor's profile"
              className="w-48 h-48 rounded-full mx-auto mb-4 border-4 border-blue-500"
            />
            {isEditing && (
              <div className="text-center">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="profilePicture">
                  Profile Picture URL
                </label>
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="profilePicture"
                  type="text"
                  name="profilePicture"
                  value={editedInfo.profilePicture}
                  onChange={handleInputChange}
                />
              </div>
            )}
          </div>
          <div className="lg:w-2/3 lg:pl-6">
            <form onSubmit={(e) => e.preventDefault()}>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
                  <FaUser className="inline mr-2" /> Name
                </label>
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="name"
                  type="text"
                  name="name"
                  value={isEditing ? editedInfo.name : doctorInfo.name}
                  onChange={handleInputChange}
                  readOnly={!isEditing}
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
                  <FaEnvelope className="inline mr-2" /> Email
                </label>
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="email"
                  type="email"
                  name="email"
                  value={isEditing ? editedInfo.email : doctorInfo.email}
                  onChange={handleInputChange}
                  readOnly={!isEditing}
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="phone">
                  <FaPhone className="inline mr-2" /> Phone
                </label>
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="phone"
                  type="tel"
                  name="phone"
                  value={isEditing ? editedInfo.phone : doctorInfo.phone}
                  onChange={handleInputChange}
                  readOnly={!isEditing}
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="hospital">
                  <FaHospital className="inline mr-2" /> Hospital
                </label>
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="hospital"
                  type="text"
                  name="hospital"
                  value={isEditing ? editedInfo.hospital : doctorInfo.hospital}
                  onChange={handleInputChange}
                  readOnly={!isEditing}
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="specialization">
                  <FaUserMd className="inline mr-2" /> Specialization
                </label>
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="specialization"
                  type="text"
                  name="specialization"
                  value={isEditing ? editedInfo.specialization : doctorInfo.specialization}
                  onChange={handleInputChange}
                  readOnly={!isEditing}
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="education">
                  <FaGraduationCap className="inline mr-2" /> Education
                </label>
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="education"
                  type="text"
                  name="education"
                  value={isEditing ? editedInfo.education : doctorInfo.education}
                  onChange={handleInputChange}
                  readOnly={!isEditing}
                />
              </div>
              <div className="mb-6">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="experience">
                  <FaBriefcase className="inline mr-2" /> Experience
                </label>
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="experience"
                  type="text"
                  name="experience"
                  value={isEditing ? editedInfo.experience : doctorInfo.experience}
                  onChange={handleInputChange}
                  readOnly={!isEditing}
                />
              </div>
              <div className="flex items-center justify-between">
                {isEditing ? (
                  <button
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline flex items-center"
                    onClick={handleSave}
                  >
                    <FaSave className="mr-2" /> Save Changes
                  </button>
                ) : (
                  <button
                    className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline flex items-center"
                    onClick={handleEdit}
                  >
                    <FaEdit className="mr-2" /> Edit Profile
                  </button>
                )}
                <button
                  className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                  type="button"
                  onClick={onLogout}
                >
                  Logout
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>

      {/* ... (rest of the component remains the same) ... */}

    </div>
  );
};

export default Settings;