// Types for Chemical Equipment data
export interface EquipmentData {
  id: string;
  equipmentName: string;
  type: string;
  flowrate: number;
  pressure: number;
  temperature: number;
}

export interface DatasetSummary {
  id: string;
  fileName: string;
  uploadDate: string;
  totalCount: number;
  averageFlowrate: number;
  averagePressure: number;
  averageTemperature: number;
  typeDistribution: Record<string, number>;
  data: EquipmentData[];
}

export interface ChartData {
  labels: string[];
  datasets: {
    label: string;
    data: number[];
    backgroundColor?: string | string[];
    borderColor?: string | string[];
    borderWidth?: number;
    fill?: boolean;
    tension?: number;
  }[];
}
