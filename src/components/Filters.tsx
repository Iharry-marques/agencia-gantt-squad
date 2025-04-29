
import React, { useState, useEffect } from 'react';
import { filterData } from '@/lib/mockData';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";

interface FiltersProps {
  data: any[];
  activeTab: 'equipe' | 'cliente';
  filters: {
    group: string;
    subgroup: string;
    client: string;
    type: string;
    status: string;
  };
  setFilters: (filters: any) => void;
}

const Filters: React.FC<FiltersProps> = ({ data, activeTab, filters, setFilters }) => {
  const [mainGroups, setMainGroups] = useState<string[]>([]);
  const [subgroups, setSubgroups] = useState<string[]>([]);
  const [clients, setClients] = useState<string[]>([]);
  const [types, setTypes] = useState<string[]>([]);
  const [statuses, setStatuses] = useState<string[]>([]);
  
  // Extract unique values for filters when data changes
  useEffect(() => {
    if (data && data.length > 0) {
      // Use the real data for filters
      setMainGroups(['Todos', ...filterData.groups]);
      setClients(['Todos', ...filterData.clients]);
      setTypes(['Todos', ...filterData.types]);
      setStatuses(['Todos', ...filterData.statuses]);
      
      // If a main group is selected, load its subgroups
      if (filters.group && filters.group !== 'Todos') {
        const subgroupsForMainGroup = filterData.subgroups[filters.group] || [];
        setSubgroups(['Todos', ...subgroupsForMainGroup]);
      } else {
        setSubgroups([]);
      }
    }
  }, [data, filters.group]);
  
  const handleFilterChange = (key: string, value: string) => {
    // If changing the main group, reset any subgroup selection
    if (key === 'group') {
      setFilters({
        ...filters,
        [key]: value === 'Todos' ? '' : value,
        subgroup: '' // Reset subgroup when changing group
      });
    } else {
      setFilters({
        ...filters,
        [key]: value === 'Todos' ? '' : value
      });
    }
  };
  
  return (
    <div className="filter-container mb-6 bg-white shadow-md rounded-lg border border-gray-200">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold text-gray-900">Filtros</h2>
        
        {/* Reset Filters Button */}
        <Button 
          variant="outline"
          className="px-4 py-2 text-sm"
          onClick={() => setFilters({
            group: '',
            subgroup: '',
            client: '',
            type: '',
            status: ''
          })}
        >
          Limpar Filtros
        </Button>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Group/Team Filter */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            {activeTab === 'equipe' ? 'Equipe/Grupo' : 'Grupo'}
          </label>
          <select 
            className="w-full border border-gray-300 rounded-md p-2 text-sm"
            value={filters.group || 'Todos'}
            onChange={(e) => handleFilterChange('group', e.target.value)}
          >
            {mainGroups.map((group) => (
              <option key={group} value={group}>
                {group}
              </option>
            ))}
          </select>
        </div>
        
        {/* Subgroup Filter - Only show if a group is selected */}
        {filters.group && filters.group !== 'Todos' && subgroups.length > 0 && (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Subgrupo
            </label>
            <select 
              className="w-full border border-gray-300 rounded-md p-2 text-sm"
              value={filters.subgroup || 'Todos'}
              onChange={(e) => handleFilterChange('subgroup', e.target.value)}
            >
              {subgroups.map((subgroup) => (
                <option key={subgroup} value={subgroup}>
                  {subgroup}
                </option>
              ))}
            </select>
          </div>
        )}
        
        {/* Client Filter */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Cliente
          </label>
          <select 
            className="w-full border border-gray-300 rounded-md p-2 text-sm"
            value={filters.client || 'Todos'}
            onChange={(e) => handleFilterChange('client', e.target.value)}
          >
            {clients.map((client) => (
              <option key={client} value={client}>
                {client}
              </option>
            ))}
          </select>
        </div>
        
        {/* Type Filter */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Tipo
          </label>
          <select 
            className="w-full border border-gray-300 rounded-md p-2 text-sm"
            value={filters.type || 'Todos'}
            onChange={(e) => handleFilterChange('type', e.target.value)}
          >
            {types.map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>
        </div>
        
        {/* Status Filter */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Status
          </label>
          <select 
            className="w-full border border-gray-300 rounded-md p-2 text-sm"
            value={filters.status || 'Todos'}
            onChange={(e) => handleFilterChange('status', e.target.value)}
          >
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
