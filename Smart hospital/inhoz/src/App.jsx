import React, { useState } from 'react';
import LogoSplash from './Components/LogoSplash';
import LoginForm from './Components/LoginForm';
import Dashboard from './Components/Dashboard';
import './App.css';

function App() {
  const [currentView, setCurrentView] = useState('splash');

  const handleSplashFinished = () => {
    setCurrentView('login');
  };

  const handleLogin = () => {
    setCurrentView('dashboard');
  };

  const handleLogout = () => {
    setCurrentView('login');
  };

  return (
    <div className="App">
      {currentView === 'splash' && <LogoSplash onFinished={handleSplashFinished} />}
      {currentView === 'login' && <LoginForm onLogin={handleLogin} />}
      {currentView === 'dashboard' && <Dashboard onLogout={handleLogout} />}
    </div>
  );
}

export default App;
