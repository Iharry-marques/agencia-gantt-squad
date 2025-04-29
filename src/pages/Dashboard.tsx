
import React, { useEffect, useState } from 'react';
import Header from '@/components/Header';
import Filters from '@/components/Filters';
import GanttControls from '@/components/GanttControls';
import GanttChart from '@/components/GanttChart';
import { loadData } from '@/lib/mockData';
import { exportToCSV } from '@/lib/exportUtils';
import { useToast } from '@/components/ui/use-toast';

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState<'equipe' | 'cliente'>('equipe');
  const [viewMode, setViewMode] = useState<'Day' | 'Week' | 'Month'>('Week');
  const [data, setData] = useState<any[]>([]);
  const [filters, setFilters] = useState({
    group: '',
    client: '',
    type: '',
    status: ''
  });
  const { toast } = useToast();
  
  // Carregar dados iniciais
  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await loadData();
        setData(result);
      } catch (error) {
        console.error('Erro ao carregar dados:', error);
        toast({
          title: 'Erro',
          description: 'Não foi possível carregar os dados. Tente novamente.',
          variant: 'destructive'
        });
      }
    };
    
    fetchData();
  }, []);
  
  // Função para levar para a data atual
  const handleToday = () => {
    // Em um cenário real, chamaria um método do Frappe Gantt
    toast({
      title: 'Navegação',
      description: 'Navegado para a data atual.'
    });
  };
  
  // Função para ativar modo tela cheia
  const handleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch((err) => {
        toast({
          title: 'Erro',
          description: `Não foi possível ativar o modo de tela cheia: ${err.message}`,
          variant: 'destructive'
        });
      });
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      }
    }
  };
  
  // Função para exportar dados em CSV
  const handleExportCSV = () => {
    const filteredData = data.filter(item => {
      if (filters.group) {
        const groupParts = item.group_subgroup?.split(' / ');
        if (!(groupParts && groupParts.length > 0 && groupParts[0] === filters.group)) {
          return false;
        }
      }
      
      if (filters.client && item.client !== filters.client) {
        return false;
      }
      
      if (filters.type && item.tipo !== filters.type) {
        return false;
      }
      
      if (filters.status && item.PipelineStepTitle !== filters.status) {
        return false;
      }
      
      return true;
    });
    
    exportToCSV(filteredData, `gantt-somos-creators-${new Date().toISOString().slice(0, 10)}`);
    
    toast({
      title: 'Exportação concluída',
      description: 'Os dados foram exportados em formato CSV.'
    });
  };
  
  return (
    <div className="min-h-screen bg-gray-50">
      <Header activeTab={activeTab} setActiveTab={setActiveTab} />
      
      <main className="container mx-auto px-4 py-6">
        <Filters 
          data={data} 
          activeTab={activeTab} 
          filters={filters} 
          setFilters={setFilters} 
        />
        
        <GanttControls 
          viewMode={viewMode} 
          setViewMode={setViewMode} 
          onToday={handleToday} 
          onFullscreen={handleFullscreen} 
          onExportCSV={handleExportCSV} 
        />
        
        <GanttChart 
          data={data} 
          activeTab={activeTab} 
          filters={filters} 
          viewMode={viewMode} 
        />
      </main>
      
      <footer className="mt-auto py-4 bg-white border-t border-gray-200">
        <div className="container mx-auto px-4 text-center text-gray-500 text-sm">
          SOMOS • CREATORS | Dashboard Gantt © {new Date().getFullYear()}
        </div>
      </footer>
    </div>
  );
};

export default Dashboard;
