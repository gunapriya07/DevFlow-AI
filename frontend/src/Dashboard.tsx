import React, { useState } from 'react';
import Sidebar from './components/Sidebar';
import RepositoryAnalysis from './components/RepositoryAnalysis';
import DependencyChecker from './components/DependencyChecker';
import EnvironmentVariables from './components/EnvironmentVariables';
import SetupValidation from './components/SetupValidation';
import Troubleshooter from './components/Troubleshooter';
import DeveloperDashboard from './components/DeveloperDashboard';

export type DashboardTab = 'overview' | 'repo' | 'dependencies' | 'env' | 'validation' | 'troubleshoot';

interface DashboardProps {
  onLogout: () => void;
}

const Dashboard: React.FC<DashboardProps> = ({ onLogout }) => {
  const [activeTab, setActiveTab] = useState<DashboardTab>('overview');

  const renderContent = () => {
    switch (activeTab) {
      case 'overview':
        return <DeveloperDashboard />;
      case 'repo':
        return <RepositoryAnalysis />;
      case 'dependencies':
        return <DependencyChecker />;
      case 'env':
        return <EnvironmentVariables />;
      case 'validation':
        return <SetupValidation />;
      case 'troubleshoot':
        return <Troubleshooter />;
      default:
        return <DeveloperDashboard />;
    }
  };

  return (
    <div style={styles.container}>
      <Sidebar activeTab={activeTab} onTabChange={setActiveTab} onLogout={onLogout} />
      <div style={styles.mainContent}>
        {renderContent()}
      </div>
    </div>
  );
};

const styles: Record<string, React.CSSProperties> = {
  container: { display: 'flex', minHeight: '100vh', background: '#0d1117' },
  mainContent: { flex: 1, overflow: 'auto', padding: '32px' },
};

export default Dashboard;
