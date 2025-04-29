
import React, { useState, useEffect } from 'react';
import { Select } from '@/components/ui/select';

interface FiltersProps {
  data: any[];
  activeTab: 'equipe' | 'cliente';
  filters: {
    group: string;
    client: string;
    type: string;
    status: string;
  };
  setFilters: (filters: any) => void;
}

const Filters: React.FC<FiltersProps> = ({ data, activeTab, filters, setFilters }) => {
  const [groups, setGroups] = useState<string[]>([]);
  const [clients, setClients] = useState<string[]>([]);
  const [statuses, setStatuses] = useState<string[]>([]);
  
  // Extract unique values for filters
  useEffect(() => {
    if (data && data.length > 0) {
      // Extract unique groups
      const uniqueGroups = [...new Set(data.map(item => {
        const groupParts = item.group_subgroup?.split(' / ');
        return groupParts && groupParts.length > 0 ? groupParts[0] : '';
      }))].filter(Boolean);
      
      // Extract unique clients
      const uniqueClients = [...new Set(data.map(item => item.client))].filter(Boolean);
      
      // Extract unique statuses
      const uniqueStatuses = [...new Set(data.map(item => item.PipelineStepTitle))].filter(Boolean);
      
      setGroups(uniqueGroups);
      setClients(uniqueClients);
      setStatuses(uniqueStatuses);
    }
  }, [data]);
  
  const handleFilterChange = (key: string, value: string) => {
    setFilters({
      ...filters,
      [key]: value
    });
  };
  
  return (
    <div className="filter-container">
      <h2 className="text-lg font-medium mb-4">Filtros</h2>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            {activeTab === 'equipe' ? 'Equipe/Grupo' : 'Grupo'}
          </label>
          <select 
            className="w-full border border-gray-300 rounded-md p-2 text-sm"
            value={filters.group}
            onChange={(e) => handleFilterChange('group', e.target.value)}
          >
            <option value="">Todos os grupos</option>
            {groups.map((group) => (
              <option key={group} value={group}>
                {group}
              </option>
            ))}
          </select>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Cliente
          </label>
          <select 
            className="w-full border border-gray-300 rounded-md p-2 text-sm"
            value={filters.client}
            onChange={(e) => handleFilterChange('client', e.target.value)}
          >
            <option value="">Todos os clientes</option>
            {clients.map((client) => (
              <option key={client} value={client}>
                {client}
              </option>
            ))}
          </select>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Tipo
          </label>
          <select 
            className="w-full border border-gray-300 rounded-md p-2 text-sm"
            value={filters.type}
            onChange={(e) => handleFilterChange('type', e.target.value)}
          >
            <option value="">Todos os tipos</option>
            <option value="Tarefa">Tarefa</option>
            <option value="Subtarefa">Subtarefa</option>
          </select>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Status
          </label>
          <select 
            className="w-full border border-gray-300 rounded-md p-2 text-sm"
            value={filters.status}
            onChange={(e) => handleFilterChange('status', e.target.value)}
          >
            <option value="">Todos os status</option>
            {statuses.map((status) => (
              <option key={status} value={status}>
                {status}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
};

export default Filters;
