
import React from 'react';

interface HeaderProps {
  activeTab: 'equipe' | 'cliente';
  setActiveTab: (tab: 'equipe' | 'cliente') => void;
}

const Header: React.FC<HeaderProps> = ({ activeTab, setActiveTab }) => {
  return (
    <header className="bg-white shadow-md border-b border-gray-200">
      <div className="container mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-3">
            <img src="/lovable-uploads/9ae2674c-6fc6-4ca8-8b8b-647d57cffc61.png" alt="Suno Logo" className="h-14" />
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Suno</h1>
              <span className="text-sm text-gray-500">Dashboard Gantt</span>
            </div>
          </div>
        </div>
        
        <nav className="flex mt-4 border-b border-gray-200">
          <button 
            className={`header-tab ${activeTab === 'equipe' ? 'header-tab-active' : ''}`}
            onClick={() => setActiveTab('equipe')}
          >
            Por Equipe
          </button>
          <button 
            className={`header-tab ${activeTab === 'cliente' ? 'header-tab-active' : ''}`}
            onClick={() => setActiveTab('cliente')}
          >
            Por Cliente
          </button>
        </nav>
      </div>
    </header>
  );
};

export default Header;
