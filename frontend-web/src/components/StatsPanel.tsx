import React from "react";
import { motion } from "framer-motion";
import {
  Gauge,
  Thermometer,
  Activity,
  Layers,
} from "lucide-react";

interface StatsPanelProps {
  summary: any;
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
        <p className="text-sm font-medium text-muted-foreground mb-1">
          {label}
        </p>
        <p className="text-2xl font-bold text-foreground">
          {value}
        </p>
        {subtext && (
          <p className="text-xs text-muted-foreground mt-1">
            {subtext}
          </p>
        )}
      </div>

      <div className={`p-3 rounded-lg ${colorClass}`}>
        {icon}
      </div>
    </div>
  </motion.div>
);

export const StatsPanel: React.FC<StatsPanelProps> = ({ summary }) => {
  if (!summary) return null;

  const rows = summary.data || [];

  // ✅ SAFE FALLBACK LOGIC
  const totalEquipment =
    summary.total_equipment && summary.total_equipment > 0
      ? summary.total_equipment
      : rows.length;

  const avg = (key: string) => {
    if (!rows.length) return 0;
    const sum = rows.reduce(
      (acc: number, r: any) => acc + Number(r[key] || 0),
      0
    );
    return sum / rows.length;
  };

  const avgFlowrate =
    summary.avg_flowrate && summary.avg_flowrate > 0
      ? summary.avg_flowrate
      : avg("flowrate");

  const avgPressure =
    summary.avg_pressure && summary.avg_pressure > 0
      ? summary.avg_pressure
      : avg("pressure");

  const avgTemperature =
    summary.avg_temperature && summary.avg_temperature > 0
      ? summary.avg_temperature
      : avg("temperature");

  const typeDistribution =
    summary.type_distribution ||
    summary.typeDistribution ||
    {};

  const typeCount = Object.keys(typeDistribution).length;

  const stats = [
    {
      icon: <Layers className="w-5 h-5 text-primary" />,
      label: "Total Equipment",
      value: totalEquipment.toString(),
      subtext: `${typeCount} equipment types`,
      colorClass: "bg-primary/10",
    },
    {
      icon: <Activity className="w-5 h-5 text-info" />,
      label: "Avg. Flowrate",
      value: avgFlowrate.toFixed(2),
      subtext: "m³/h",
      colorClass: "bg-info/10",
    },
    {
      icon: <Gauge className="w-5 h-5 text-accent" />,
      label: "Avg. Pressure",
      value: avgPressure.toFixed(2),
      subtext: "bar",
      colorClass: "bg-accent/10",
    },
    {
      icon: <Thermometer className="w-5 h-5 text-destructive" />,
      label: "Avg. Temperature",
      value: avgTemperature.toFixed(2),
      subtext: "°C",
      colorClass: "bg-destructive/10",
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
