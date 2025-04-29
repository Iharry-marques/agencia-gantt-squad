
import React from 'react';
import { ArrowDown, Calendar, Maximize, ZoomIn, ZoomOut } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface GanttControlsProps {
  viewMode: 'Day' | 'Week' | 'Month';
  setViewMode: (mode: 'Day' | 'Week' | 'Month') => void;
  onToday: () => void;
  onFullscreen: () => void;
  onExportCSV: () => void;
}

const GanttControls: React.FC<GanttControlsProps> = ({ 
  viewMode, 
  setViewMode, 
  onToday, 
  onFullscreen, 
  onExportCSV 
}) => {
  return (
    <div className="bg-white border border-gray-200 rounded-lg p-3 mb-4 flex flex-wrap justify-between items-center gap-3">
      <div className="flex items-center space-x-2">
        <div className="flex bg-gray-100 rounded-md p-0.5">
          <button
            onClick={() => setViewMode('Day')}
            className={`zoom-button ${viewMode === 'Day' ? 'zoom-active' : ''}`}
          >
            Dia
          </button>
          <button
            onClick={() => setViewMode('Week')}
            className={`zoom-button ${viewMode === 'Week' ? 'zoom-active' : ''}`}
          >
            Semana
          </button>
          <button
            onClick={() => setViewMode('Month')}
            className={`zoom-button ${viewMode === 'Month' ? 'zoom-active' : ''}`}
          >
            Mês
          </button>
        </div>
      </div>
      
      <div className="flex flex-wrap items-center gap-2">
        <button onClick={onToday} className="control-button">
          <Calendar size={16} />
          <span>Hoje</span>
        </button>
        
        <button onClick={onFullscreen} className="control-button">
          <Maximize size={16} />
          <span>Tela Cheia</span>
        </button>
        
        <button onClick={onExportCSV} className="control-button">
          <ArrowDown size={16} />
          <span>Exportar CSV</span>
        </button>
      </div>
    </div>
  );
};

export default GanttControls;
