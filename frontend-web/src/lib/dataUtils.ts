import Papa from 'papaparse';
import { EquipmentData, DatasetSummary } from '@/types/equipment';

// Generate unique ID
export const generateId = (): string => {
  return Math.random().toString(36).substring(2, 15);
};

// Parse CSV file and return equipment data
export const parseCSVFile = (file: File): Promise<EquipmentData[]> => {
  return new Promise((resolve, reject) => {
    Papa.parse(file, {
      header: true,
      skipEmptyLines: true,
      complete: (results) => {
        try {
          const data: EquipmentData[] = results.data.map((row: any) => ({
            id: generateId(),
            equipmentName: row['Equipment Name'] || row['equipment_name'] || row['EquipmentName'] || '',
            type: row['Type'] || row['type'] || row['Equipment Type'] || '',
            flowrate: parseFloat(row['Flowrate'] || row['flowrate'] || row['Flow Rate'] || 0),
            pressure: parseFloat(row['Pressure'] || row['pressure'] || 0),
            temperature: parseFloat(row['Temperature'] || row['temperature'] || row['Temp'] || 0),
          })).filter(item => item.equipmentName); // Filter out empty rows
          
          resolve(data);
        } catch (error) {
          reject(new Error('Failed to parse CSV data'));
        }
      },
      error: (error) => {
        reject(error);
      },
    });
  });
};

// Calculate summary statistics
export const calculateSummary = (
  data: EquipmentData[],
  fileName: string
): DatasetSummary => {
  const totalCount = data.length;
  
  const averageFlowrate = totalCount > 0
    ? data.reduce((sum, item) => sum + item.flowrate, 0) / totalCount
    : 0;
  
  const averagePressure = totalCount > 0
    ? data.reduce((sum, item) => sum + item.pressure, 0) / totalCount
    : 0;
  
  const averageTemperature = totalCount > 0
    ? data.reduce((sum, item) => sum + item.temperature, 0) / totalCount
    : 0;
  
  const typeDistribution: Record<string, number> = {};
  data.forEach((item) => {
    typeDistribution[item.type] = (typeDistribution[item.type] || 0) + 1;
  });

  return {
    id: generateId(),
    fileName,
    uploadDate: new Date().toISOString(),
    totalCount,
    averageFlowrate: Math.round(averageFlowrate * 100) / 100,
    averagePressure: Math.round(averagePressure * 100) / 100,
    averageTemperature: Math.round(averageTemperature * 100) / 100,
    typeDistribution,
    data,
  };
};

// Storage key for history
const HISTORY_KEY = 'equipment_upload_history';
const MAX_HISTORY = 5;

// Save dataset to history
export const saveToHistory = (summary: DatasetSummary): void => {
  const history = getHistory();
  history.unshift(summary);
  
  // Keep only last 5 datasets
  const trimmedHistory = history.slice(0, MAX_HISTORY);
  localStorage.setItem(HISTORY_KEY, JSON.stringify(trimmedHistory));
};

// Get upload history
export const getHistory = (): DatasetSummary[] => {
  try {
    const stored = localStorage.getItem(HISTORY_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch {
    return [];
  }
};

// Clear history
export const clearHistory = (): void => {
  localStorage.removeItem(HISTORY_KEY);
};

// Format number with units
export const formatValue = (value: number, unit: string): string => {
  return `${value.toLocaleString(undefined, { maximumFractionDigits: 2 })} ${unit}`;
};

// Format date
export const formatDate = (dateString: string): string => {
  return new Date(dateString).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
};
