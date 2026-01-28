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
  gradientClass: string;
  iconBgClass: string;
  delay: number;
}

const StatCard: React.FC<StatCardProps> = ({
  icon,
  label,
  value,
  subtext,
  gradientClass,
  iconBgClass,
  delay,
}) => (
  <motion.div
    initial={{ opacity: 0, y: 30, scale: 0.95 }}
    animate={{ opacity: 1, y: 0, scale: 1 }}
    transition={{ duration: 0.5, delay, ease: "easeOut" }}
    whileHover={{ y: -5, transition: { duration: 0.2 } }}
    className="relative group"
  >
    <div className={`absolute inset-0 ${gradientClass} rounded-2xl blur-lg opacity-50 group-hover:opacity-75 transition-opacity`}></div>
    
    <div className="relative bg-white rounded-2xl p-6 shadow-card hover:shadow-card-hover border-3 border-neutral-light group-hover:border-primary-light transition-all">
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <p className="text-sm font-bold text-neutral-medium uppercase tracking-wider mb-2">
            {label}
          </p>
          <p className="text-4xl font-bold text-foreground mb-1">
            {value}
          </p>
          {subtext && (
            <p className="text-base text-neutral-medium font-semibold">
              {subtext}
            </p>
          )}
        </div>

        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: delay + 0.2, duration: 0.4 }}
          className={`p-4 rounded-2xl ${iconBgClass} shadow-lg group-hover:scale-110 transition-transform`}
        >
          {icon}
        </motion.div>
      </div>

      {/* Decorative gradient line at bottom */}
      <div className={`absolute bottom-0 left-0 right-0 h-1.5 ${gradientClass} rounded-b-2xl`}></div>
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
      icon: <Layers className="w-7 h-7 text-primary" strokeWidth={2.5} />,
      label: "Total Equipment",
      value: totalEquipment.toString(),
      subtext: `${typeCount} equipment types`,
      gradientClass: "bg-gradient-to-br from-primary to-primary-light",
      iconBgClass: "bg-gradient-to-br from-primary/10 to-primary-light/10 border-2 border-primary/20",
    },
    {
      icon: <Activity className="w-7 h-7 text-secondary" strokeWidth={2.5} />,
      label: "Avg. Flowrate",
      value: avgFlowrate.toFixed(2),
      subtext: "m³/h",
      gradientClass: "bg-gradient-to-br from-secondary to-secondary-light",
      iconBgClass: "bg-gradient-to-br from-secondary/10 to-secondary-light/10 border-2 border-secondary/20",
    },
    {
      icon: <Gauge className="w-7 h-7 text-accent" strokeWidth={2.5} />,
      label: "Avg. Pressure",
      value: avgPressure.toFixed(2),
      subtext: "bar",
      gradientClass: "bg-gradient-to-br from-accent to-accent-light",
      iconBgClass: "bg-gradient-to-br from-accent/10 to-accent-light/10 border-2 border-accent/20",
    },
    {
      icon: <Thermometer className="w-7 h-7 text-destructive" strokeWidth={2.5} />,
      label: "Avg. Temperature",
      value: avgTemperature.toFixed(2),
      subtext: "°C",
      gradientClass: "bg-gradient-to-br from-destructive to-destructive-light",
      iconBgClass: "bg-gradient-to-br from-destructive/10 to-destructive-light/10 border-2 border-destructive/20",
    },
  ];

  return (
    <div>
      {/* Section Header */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.4 }}
        className="mb-6"
      >
        <h3 className="text-2xl font-bold text-foreground flex items-center gap-3">
          <div className="p-2 rounded-lg bg-gradient-to-br from-secondary to-secondary-light">
            <BarChart3 className="w-6 h-6 text-white" />
          </div>
           Summary Statistics
        </h3>
        <p className="text-muted-foreground text-sm mt-1 ml-14">
          Key performance indicators for your equipment data
        </p>
      </motion.div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <StatCard
            key={stat.label}
            {...stat}
            delay={index * 0.1}
          />
        ))}
      </div>
    </div>
  );
};

// Import BarChart3 for the header
import { BarChart3 } from "lucide-react";
