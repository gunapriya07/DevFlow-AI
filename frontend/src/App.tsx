import { useState } from 'react';
import './App.css'
import LoginPage from './LoginPage';
import SingupPage from './SingupPage';

function App() {
  const [currentPage, setCurrentPage] = useState<'login' | 'signup'>('login');

  return (
    <>
      {currentPage === 'login' ? (
        <LoginPage onSwitchToSignup={() => setCurrentPage('signup')} />
      ) : (
        <SingupPage onSwitchToLogin={() => setCurrentPage('login')} />
      )}
    </>
  )
}

export default App
