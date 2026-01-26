import React from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, Gauge, Thermometer, Activity, Layers } from 'lucide-react';
import { DatasetSummary } from '@/types/equipment';
import { formatValue } from '@/lib/dataUtils';

interface StatsPanelProps {
  summary: DatasetSummary;
}

interface StatCardProps {
  icon: React.ReactNode;
  label: string;
  value: string;
  subtext?: string;
  colorClass: string;
  delay: number;
}

const StatCard: React.FC<StatCardProps> = ({
  icon,
  label,
  value,
  subtext,
  colorClass,
  delay,
}) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.4, delay }}
    className="stat-card"
  >
    <div className="flex items-start justify-between">
      <div>
        <p className="text-sm font-medium text-muted-foreground mb-1">{label}</p>
        <p className="text-2xl font-bold text-foreground">{value}</p>
        {subtext && (
          <p className="text-xs text-muted-foreground mt-1">{subtext}</p>
        )}
      </div>
      <div className={`p-3 rounded-lg ${colorClass}`}>{icon}</div>
    </div>
  </motion.div>
);

export const StatsPanel: React.FC<StatsPanelProps> = ({ summary }) => {
  const typeCount = Object.keys(summary.typeDistribution).length;

  const stats = [
    {
      icon: <Layers className="w-5 h-5 text-primary" />,
      label: 'Total Equipment',
      value: summary.totalCount.toString(),
      subtext: `${typeCount} equipment types`,
      colorClass: 'bg-primary/10',
    },
    {
      icon: <Activity className="w-5 h-5 text-info" />,
      label: 'Avg. Flowrate',
      value: formatValue(summary.averageFlowrate, ''),
      subtext: 'm³/h',
      colorClass: 'bg-info/10',
    },
    {
      icon: <Gauge className="w-5 h-5 text-accent" />,
      label: 'Avg. Pressure',
      value: formatValue(summary.averagePressure, ''),
      subtext: 'bar',
      colorClass: 'bg-accent/10',
    },
    {
      icon: <Thermometer className="w-5 h-5 text-destructive" />,
      label: 'Avg. Temperature',
      value: formatValue(summary.averageTemperature, ''),
      subtext: '°C',
      colorClass: 'bg-destructive/10',
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {stats.map((stat, index) => (
        <StatCard
          key={stat.label}
          {...stat}
          delay={index * 0.1}
        />
      ))}
    </div>
  );
};
