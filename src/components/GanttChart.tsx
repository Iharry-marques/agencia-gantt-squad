
import React, { useEffect, useRef, useState } from 'react';
import { format } from 'date-fns';
import { pt } from 'date-fns/locale';

// Tipagem para as tasks do Gantt
interface Task {
  id: string;
  name: string;
  start: Date;
  end: Date;
  progress: number;
  dependencies?: string;
  custom_class?: string;
  // Add _data property to Task interface
  _data: TaskData;
}

// Tipagem para os dados brutos da API
interface TaskData {
  id: string;
  name: string;
  start: string;
  end: string;
  progress: string;
  responsible: string;
  group_subgroup: string;
  client: string;
  project: string;
  tipo: string;
  PipelineStepID: string;
  PipelineStepTitle: string;
  creation_date: string;
  modification_date: string;
}

interface GanttChartProps {
  data: TaskData[];
  activeTab: 'equipe' | 'cliente';
  filters: {
    group: string;
    subgroup: string;
    client: string;
    type: string;
    status: string;
  };
  viewMode: 'Day' | 'Week' | 'Month';
}

// Função para gerar cor baseada em uma string
const stringToColor = (str: string): string => {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash);
  }
  
  const hue = Math.abs(hash % 360);
  return `hsl(${hue}, 70%, 60%)`;
};

const GanttChart: React.FC<GanttChartProps> = ({ data, activeTab, filters, viewMode }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const ganttInstance = useRef<any>(null);
  const [tooltipData, setTooltipData] = useState<{ visible: boolean; data?: TaskData; x: number; y: number }>({
    visible: false,
    x: 0,
    y: 0
  });
  
  // Filtrar e transformar dados para o formato do Gantt
  const processData = (): Task[] => {
    if (!data || data.length === 0) return [];
    
    let filteredData = [...data];
    
    // Aplicar filtros
    if (filters.group) {
      filteredData = filteredData.filter(item => {
        const groupParts = item.group_subgroup?.split(' / ');
        return groupParts && groupParts.length > 0 && groupParts[0] === filters.group;
      });
      
      // Apply subgroup filter if selected
      if (filters.subgroup) {
        filteredData = filteredData.filter(item => {
          const subgroupPath = item.group_subgroup?.substring(filters.group.length + 3); // +3 for " / "
          return subgroupPath && subgroupPath.startsWith(filters.subgroup);
        });
      }
    }
    
    if (filters.client) {
      filteredData = filteredData.filter(item => item.client === filters.client);
    }
    
    if (filters.type) {
      filteredData = filteredData.filter(item => item.tipo === filters.type);
    }
    
    if (filters.status) {
      filteredData = filteredData.filter(item => item.PipelineStepTitle === filters.status);
    }
    
    // Transformar para o formato do Gantt
    return filteredData.map(item => {
      // Definir a classe personalizada com base na aba ativa
      const colorKey = activeTab === 'equipe' 
        ? (item.group_subgroup?.split(' / ')[0] || '')
        : item.client;
      
      const customClass = `task-${colorKey.replace(/\s+/g, '-').toLowerCase()}`;
      
      return {
        id: item.id,
        name: item.name,
        start: new Date(item.start),
        end: new Date(item.end),
        progress: parseFloat(item.progress) / 100 || 0,
        custom_class: customClass,
        _data: item // Armazenar dados originais para o tooltip
      };
    });
  };
  
  // Efeito para inicializar o Gantt
  useEffect(() => {
    // Aqui faremos um mock do Frappe Gantt por enquanto
    // Em um cenário real, inicializaríamos o Frappe Gantt aqui
    
    const mockGantt = () => {
      if (containerRef.current) {
        const tasks = processData();
        console.log("Processados para o gantt:", tasks);
        
        // Mockup do gantt - com dados reais usaríamos:
        // const gantt = new Gantt(containerRef.current, tasks, {
        //   on_click: task => {
        //     console.log(task);
        //   },
        //   on_date_change: (task, start, end) => {
        //     console.log(task, start, end);
        //   },
        //   on_progress_change: (task, progress) => {
        //     console.log(task, progress);
        //   },
        //   on_view_change: (mode) => {
        //     console.log(mode);
        //   }
        // });
        
        // ganttInstance.current = gantt;
        // gantt.change_view_mode(viewMode);
      }
    };
    
    mockGantt();
    
    // Limpar
    return () => {
      if (ganttInstance.current) {
        // ganttInstance.current.clear();
      }
    };
  }, [data, filters, activeTab, viewMode]);

  // Função para formatar data
  const formatDate = (dateStr: string): string => {
    try {
      return format(new Date(dateStr), 'dd/MM/yyyy', { locale: pt });
    } catch {
      return dateStr;
    }
  };
  
  return (
    <div className="relative">
      <div className="gantt-container bg-white border border-gray-200 rounded-lg shadow-md">
        <div ref={containerRef} className="svg-container">
          <div className="flex items-center justify-center h-full">
            <div className="text-lg text-gray-500">
              Visualização Gantt será renderizada aqui com os dados carregados
            </div>
          </div>
        </div>
      </div>
      
      {tooltipData.visible && tooltipData.data && (
        <div 
          className="tooltip"
          style={{ 
            left: tooltipData.x + 10, 
            top: tooltipData.y + 10
          }}
        >
          <h3 className="font-medium text-base mb-2">{tooltipData.data.name}</h3>
          <div className="grid grid-cols-2 gap-2 text-sm">
            <div className="text-gray-500">Início:</div> 
            <div>{formatDate(tooltipData.data.start)}</div>
            
            <div className="text-gray-500">Fim:</div> 
            <div>{formatDate(tooltipData.data.end)}</div>
            
            <div className="text-gray-500">Responsável:</div> 
            <div>{tooltipData.data.responsible}</div>
            
            <div className="text-gray-500">Cliente:</div> 
            <div>{tooltipData.data.client}</div>
            
            <div className="text-gray-500">Projeto:</div> 
            <div>{tooltipData.data.project}</div>
            
            <div className="text-gray-500">Status:</div> 
            <div>{tooltipData.data.PipelineStepTitle}</div>
            
            <div className="text-gray-500">Criação:</div> 
            <div>{formatDate(tooltipData.data.creation_date)}</div>
            
            <div className="text-gray-500">Modificação:</div> 
            <div>{formatDate(tooltipData.data.modification_date)}</div>
          </div>
        </div>
      )}
      
      <style>
        {processData().map(task => {
          const colorKey = activeTab === 'equipe' 
            ? (task._data.group_subgroup?.split(' / ')[0] || '')
            : task._data.client;
          
          const color = colorKey === 'Criação' ? '#ffc801' : stringToColor(colorKey);
          return `.gantt .bar.task-${colorKey.replace(/\s+/g, '-').toLowerCase()} .bar-progress { fill: ${color}; }
                 .gantt .bar.task-${colorKey.replace(/\s+/g, '-').toLowerCase()} { fill: ${color}25; stroke: ${color}; }`;
        }).join('\n')}
      </style>
    </div>
  );
};

export default GanttChart;
