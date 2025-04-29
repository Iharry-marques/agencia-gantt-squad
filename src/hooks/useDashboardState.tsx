
import { useState, useEffect } from 'react';
import { loadData } from '@/lib/mockData';
import { useToast } from '@/components/ui/use-toast';

export const useDashboardState = () => {
  const [activeTab, setActiveTab] = useState<'equipe' | 'cliente'>('equipe');
  const [viewMode, setViewMode] = useState<'Day' | 'Week' | 'Month'>('Week');
  const [data, setData] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
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
      setIsLoading(true);
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
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchData();
  }, []);
  
  // Reset filtros
  const resetFilters = () => {
    setFilters({
      group: '',
      client: '',
      type: '',
      status: ''
    });
  };
  
  return {
    activeTab,
    setActiveTab,
    viewMode,
    setViewMode,
    data,
    isLoading,
    filters,
    setFilters,
    resetFilters
  };
};

export default useDashboardState;
