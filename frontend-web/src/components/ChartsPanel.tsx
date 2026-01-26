import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  PointElement,
  LineElement,
  Filler,
} from 'chart.js';
import { Bar, Pie, Line } from 'react-chartjs-2';
import { motion } from 'framer-motion';
import { DatasetSummary, EquipmentData } from '@/types/equipment';

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  PointElement,
  LineElement,
  Filler
);

// Chart colors from design system
const chartColors = {
  primary: 'hsl(215, 80%, 45%)',
  accent: 'hsl(25, 95%, 53%)',
  success: 'hsl(142, 76%, 36%)',
  purple: 'hsl(280, 65%, 60%)',
  info: 'hsl(199, 89%, 48%)',
};

const chartColorsPalette = [
  chartColors.primary,
  chartColors.accent,
  chartColors.success,
  chartColors.purple,
  chartColors.info,
];

interface ChartsPanelProps {
  summary: DatasetSummary;
}

export const ChartsPanel: React.FC<ChartsPanelProps> = ({ summary }) => {
  // Type Distribution Pie Chart
  const typeDistributionData = {
    labels: Object.keys(summary.typeDistribution),
    datasets: [
      {
        data: Object.values(summary.typeDistribution),
        backgroundColor: chartColorsPalette.slice(0, Object.keys(summary.typeDistribution).length),
        borderWidth: 2,
        borderColor: 'hsl(0, 0%, 100%)',
      },
    ],
  };

  // Parameters by Equipment Bar Chart (top 10)
  const top10Equipment = summary.data.slice(0, 10);
  const parametersBarData = {
    labels: top10Equipment.map((e) => e.equipmentName.substring(0, 15)),
    datasets: [
      {
        label: 'Flowrate (m³/h)',
        data: top10Equipment.map((e) => e.flowrate),
        backgroundColor: chartColors.primary,
        borderRadius: 4,
      },
      {
        label: 'Pressure (bar)',
        data: top10Equipment.map((e) => e.pressure),
        backgroundColor: chartColors.accent,
        borderRadius: 4,
      },
      {
        label: 'Temperature (°C)',
        data: top10Equipment.map((e) => e.temperature),
        backgroundColor: chartColors.success,
        borderRadius: 4,
      },
    ],
  };

  // Parameter Distribution Line Chart
  const sortedByFlowrate = [...summary.data].sort((a, b) => a.flowrate - b.flowrate);
  const lineChartData = {
    labels: sortedByFlowrate.slice(0, 15).map((_, i) => `#${i + 1}`),
    datasets: [
      {
        label: 'Flowrate',
        data: sortedByFlowrate.slice(0, 15).map((e) => e.flowrate),
        borderColor: chartColors.primary,
        backgroundColor: 'rgba(37, 99, 235, 0.1)',
        fill: true,
        tension: 0.4,
        pointRadius: 4,
        pointBackgroundColor: chartColors.primary,
      },
      {
        label: 'Pressure',
        data: sortedByFlowrate.slice(0, 15).map((e) => e.pressure),
        borderColor: chartColors.accent,
        backgroundColor: 'rgba(249, 115, 22, 0.1)',
        fill: true,
        tension: 0.4,
        pointRadius: 4,
        pointBackgroundColor: chartColors.accent,
      },
    ],
  };

  // Average by Type Bar Chart
  const typeAverages: Record<string, { flowrate: number; pressure: number; temperature: number; count: number }> = {};
  summary.data.forEach((item) => {
    if (!typeAverages[item.type]) {
      typeAverages[item.type] = { flowrate: 0, pressure: 0, temperature: 0, count: 0 };
    }
    typeAverages[item.type].flowrate += item.flowrate;
    typeAverages[item.type].pressure += item.pressure;
    typeAverages[item.type].temperature += item.temperature;
    typeAverages[item.type].count += 1;
  });

  const typeLabels = Object.keys(typeAverages);
  const typeAvgData = {
    labels: typeLabels,
    datasets: [
      {
        label: 'Avg Flowrate (m³/h)',
        data: typeLabels.map((t) => typeAverages[t].flowrate / typeAverages[t].count),
        backgroundColor: chartColors.primary,
        borderRadius: 4,
      },
      {
        label: 'Avg Pressure (bar)',
        data: typeLabels.map((t) => typeAverages[t].pressure / typeAverages[t].count),
        backgroundColor: chartColors.accent,
        borderRadius: 4,
      },
      {
        label: 'Avg Temperature (°C)',
        data: typeLabels.map((t) => typeAverages[t].temperature / typeAverages[t].count),
        backgroundColor: chartColors.success,
        borderRadius: 4,
      },
    ],
  };

  const commonOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'bottom' as const,
        labels: {
          padding: 20,
          usePointStyle: true,
          font: {
            family: 'Inter',
            size: 12,
          },
        },
      },
    },
  };

  const barOptions = {
    ...commonOptions,
    scales: {
      x: {
        grid: {
          display: false,
        },
        ticks: {
          font: {
            family: 'Inter',
            size: 11,
          },
        },
      },
      y: {
        grid: {
          color: 'rgba(0, 0, 0, 0.05)',
        },
        ticks: {
          font: {
            family: 'Inter',
            size: 11,
          },
        },
      },
    },
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Type Distribution */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.2 }}
        className="chart-container"
      >
        <h3 className="text-lg font-semibold mb-4">Equipment Type Distribution</h3>
        <div className="h-[300px]">
          <Pie data={typeDistributionData} options={commonOptions} />
        </div>
      </motion.div>

      {/* Averages by Type */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.3 }}
        className="chart-container"
      >
        <h3 className="text-lg font-semibold mb-4">Average Parameters by Type</h3>
        <div className="h-[300px]">
          <Bar data={typeAvgData} options={barOptions} />
        </div>
      </motion.div>

      {/* Equipment Parameters */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.4 }}
        className="chart-container"
      >
        <h3 className="text-lg font-semibold mb-4">Top 10 Equipment Parameters</h3>
        <div className="h-[300px]">
          <Bar data={parametersBarData} options={barOptions} />
        </div>
      </motion.div>

      {/* Parameter Trends */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.5 }}
        className="chart-container"
      >
        <h3 className="text-lg font-semibold mb-4">Parameter Distribution (Sorted by Flowrate)</h3>
        <div className="h-[300px]">
          <Line data={lineChartData} options={barOptions} />
        </div>
      </motion.div>
    </div>
  );
};
