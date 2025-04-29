
export const exportToCSV = (data: any[], filename: string) => {
  // Filtrar e preparar dados
  if (!data || data.length === 0) {
    console.warn('Nenhum dado para exportar');
    return;
  }
  
  // Criar cabeçalhos baseados nas chaves do primeiro objeto
  const headers = Object.keys(data[0]);
  
  // Converter objetos em linhas CSV
  const rows = data.map(item => 
    headers.map(header => {
      let cell = item[header] === null || item[header] === undefined ? '' : item[header];
      
      // Formatar strings que contêm vírgulas ou quebras de linha
      if (typeof cell === 'string' && (cell.includes(',') || cell.includes('\n'))) {
        cell = `"${cell.replace(/"/g, '""')}"`;
      }
      
      return cell;
    }).join(',')
  );
  
  // Juntar cabeçalhos e linhas
  const csvContent = [headers.join(','), ...rows].join('\n');
  
  // Criar blob e link para download
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  
  link.setAttribute('href', url);
  link.setAttribute('download', `${filename}.csv`);
  link.style.display = 'none';
  
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};
