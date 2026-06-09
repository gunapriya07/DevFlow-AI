import { useState } from 'react';
import './App.css'
import LoginPage from './LoginPage';
import SignupPage from './SignupPage';
import Dashboard from './Dashboard';

type AppPage = 'login' | 'signup' | 'dashboard';

function App() {
  const [currentPage, setCurrentPage] = useState<AppPage>('login');

  const handleLoginSuccess = () => {
    setCurrentPage('dashboard');
  };

  const handleLogout = () => {
    setCurrentPage('login');
  };

  return (
    <>
      {currentPage === 'login' ? (
        <LoginPage onSwitchToSignup={() => setCurrentPage('signup')} onLoginSuccess={handleLoginSuccess} />
      ) : currentPage === 'signup' ? (
        <SignupPage onSwitchToLogin={() => setCurrentPage('login')} onSignupSuccess={handleLoginSuccess} />
      ) : (
        <Dashboard onLogout={handleLogout} />
      )}
    </>
  )
}

export default App
