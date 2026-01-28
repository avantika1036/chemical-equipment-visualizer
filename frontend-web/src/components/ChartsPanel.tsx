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
import { PieChart, BarChart3, TrendingUp, Layers } from 'lucide-react';

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

// EXACT PyQt5 Desktop App Colors
const chartColors = {
  blue: '#0A4D8C',
  teal: '#00A896',
  orange: '#F77F00',
  purple: '#6A4C93',
  red: '#E63946',
  green: '#2A9D8F',
  yellow: '#E9C46A',
  darkBlue: '#264653',
};

const chartColorsPalette = [
  chartColors.blue, chartColors.teal, chartColors.orange, chartColors.purple,
  chartColors.red, chartColors.green, chartColors.yellow, chartColors.darkBlue,
];

interface ChartsPanelProps {
  summary: DatasetSummary;
}

export const ChartsPanel: React.FC<ChartsPanelProps> = ({ summary }) => {
  const safeTypeDistribution =
    summary?.typeDistribution && typeof summary.typeDistribution === 'object'
      ? summary.typeDistribution : {};

  const safeData = Array.isArray(summary?.data) ? summary.data : [];

  const typeDistributionData = {
    labels: Object.keys(safeTypeDistribution),
    datasets: [{
      data: Object.values(safeTypeDistribution),
      backgroundColor: chartColorsPalette.slice(0, Object.keys(safeTypeDistribution).length),
      borderWidth: 3,
      borderColor: '#FFFFFF',
      hoverOffset: 10,
    }],
  };

  const top10Equipment = safeData.slice(0, 10);
  const parametersBarData = {
    labels: top10Equipment.map((e) => e.equipmentName?.substring(0, 12)),
    datasets: [
      { label: 'Flowrate (m³/h)', data: top10Equipment.map((e) => e.flowrate), backgroundColor: chartColors.teal, borderRadius: 6 },
      { label: 'Pressure (bar)', data: top10Equipment.map((e) => e.pressure), backgroundColor: chartColors.blue, borderRadius: 6 },
      { label: 'Temperature (°C)', data: top10Equipment.map((e) => e.temperature), backgroundColor: chartColors.orange, borderRadius: 6 },
    ],
  };

  const sortedByFlowrate = [...safeData].sort((a, b) => a.flowrate - b.flowrate);
  const lineChartData = {
    labels: sortedByFlowrate.slice(0, 20).map((_, i) => `${i + 1}`),
    datasets: [
      {
        label: 'Flowrate',
        data: sortedByFlowrate.slice(0, 20).map((e) => e.flowrate),
        borderColor: chartColors.teal,
        backgroundColor: 'rgba(0, 168, 150, 0.1)',
        fill: true,
        tension: 0.4,
        borderWidth: 3,
        pointRadius: 4,
        pointBackgroundColor: chartColors.teal,
        pointBorderColor: '#FFF',
        pointBorderWidth: 2,
      },
      {
        label: 'Pressure',
        data: sortedByFlowrate.slice(0, 20).map((e) => e.pressure),
        borderColor: chartColors.blue,
        backgroundColor: 'rgba(10, 77, 140, 0.1)',
        fill: true,
        tension: 0.4,
        borderWidth: 3,
        pointRadius: 4,
        pointBackgroundColor: chartColors.blue,
        pointBorderColor: '#FFF',
        pointBorderWidth: 2,
      },
    ],
  };

  const commonOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'bottom' as const,
        labels: { padding: 15, font: { size: 14, weight: 'bold' as const }, usePointStyle: true },
      },
      tooltip: {
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        padding: 12,
        titleFont: { size: 14, weight: 'bold' as const },
        bodyFont: { size: 13 },
        cornerRadius: 8,
      },
    },
  };

  const charts = [
    { icon: <PieChart className="w-6 h-6 text-primary" />, title: "Equipment Types", component: <Pie data={typeDistributionData} options={{...commonOptions, plugins: {...commonOptions.plugins, legend: {...commonOptions.plugins.legend, position: 'right' as const}}}} />, delay: 0 },
    { icon: <BarChart3 className="w-6 h-6 text-secondary" />, title: "Avg Parameters", component: <Bar data={parametersBarData} options={{...commonOptions, scales: { x: { grid: { display: false }}, y: { grid: { color: 'rgba(0,0,0,0.06)'}}}}} />, delay: 0.1 },
    { icon: <Layers className="w-6 h-6 text-accent" />, title: "Top 10 Equipment", component: <Bar data={parametersBarData} options={{...commonOptions, scales: { x: { grid: { display: false }}, y: { grid: { color: 'rgba(0,0,0,0.06)'}}}}} />, delay: 0.2 },
    { icon: <TrendingUp className="w-6 h-6 text-info" />, title: "Parameter Distribution", component: <Line data={lineChartData} options={{...commonOptions, scales: { x: { grid: { display: false }}, y: { grid: { color: 'rgba(0,0,0,0.06)'}}}}} />, delay: 0.3 },
  ];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {charts.map((chart, i) => (
        <motion.div key={i} initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: chart.delay }} className="relative group">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
          <div className="relative bg-white rounded-2xl p-6 shadow-card hover:shadow-card-hover border-3 border-neutral-light group-hover:border-primary-light transition-all">
            <div className="flex items-center gap-3 mb-5">
              <div className="p-2.5 rounded-xl bg-gradient-to-br from-primary/10 to-secondary/10 border-2 border-primary/20">{chart.icon}</div>
              <h3 className="text-xl font-bold">{chart.title}</h3>
            </div>
            <div className="h-[350px]">{chart.component}</div>
            <div className="absolute bottom-0 left-0 right-0 h-1.5 bg-gradient-to-r from-primary via-secondary to-accent rounded-b-2xl"></div>
          </div>
        </motion.div>
      ))}
    </div>
  );
};
