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
import { DatasetSummary } from '@/types/equipment';

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

  /* ✅ FIX — SAFE VARIABLES */
  const safeTypeDistribution =
    summary?.typeDistribution && typeof summary.typeDistribution === 'object'
      ? summary.typeDistribution
      : {};

  const safeData = Array.isArray(summary?.data)
    ? summary.data
    : [];

  /* ================= TYPE DISTRIBUTION ================= */

  const typeDistributionData = {
    labels: Object.keys(safeTypeDistribution),
    datasets: [
      {
        data: Object.values(safeTypeDistribution),
        backgroundColor: chartColorsPalette.slice(
          0,
          Object.keys(safeTypeDistribution).length
        ),
        borderWidth: 2,
        borderColor: 'hsl(0, 0%, 100%)',
      },
    ],
  };

  /* ================= TOP 10 ================= */

  const top10Equipment = safeData.slice(0, 10);

  const parametersBarData = {
    labels: top10Equipment.map((e) =>
      e.equipmentName?.substring(0, 15)
    ),
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

  /* ================= LINE ================= */

  const sortedByFlowrate = [...safeData].sort(
    (a, b) => a.flowrate - b.flowrate
  );

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
      },
      {
        label: 'Pressure',
        data: sortedByFlowrate.slice(0, 15).map((e) => e.pressure),
        borderColor: chartColors.accent,
        backgroundColor: 'rgba(249, 115, 22, 0.1)',
        fill: true,
        tension: 0.4,
      },
    ],
  };

  const commonOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'bottom' as const,
      },
    },
  };

  const barOptions = {
    ...commonOptions,
    scales: {
      x: { grid: { display: false } },
      y: { grid: { color: 'rgba(0,0,0,0.05)' } },
    },
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

      <motion.div className="chart-container">
        <h3 className="text-lg font-semibold mb-4">
          Equipment Type Distribution
        </h3>
        <div className="h-[300px]">
          <Pie data={typeDistributionData} options={commonOptions} />
        </div>
      </motion.div>

      <motion.div className="chart-container">
        <h3 className="text-lg font-semibold mb-4">
          Average Parameters by Type
        </h3>
        <div className="h-[300px]">
          <Bar data={parametersBarData} options={barOptions} />
        </div>
      </motion.div>

      <motion.div className="chart-container">
        <h3 className="text-lg font-semibold mb-4">
          Top 10 Equipment Parameters
        </h3>
        <div className="h-[300px]">
          <Bar data={parametersBarData} options={barOptions} />
        </div>
      </motion.div>

      <motion.div className="chart-container">
        <h3 className="text-lg font-semibold mb-4">
          Parameter Distribution (Sorted by Flowrate)
        </h3>
        <div className="h-[300px]">
          <Line data={lineChartData} options={barOptions} />
        </div>
      </motion.div>

    </div>
  );
};
