import React from "react";
import { motion } from "framer-motion";
import { History, FileSpreadsheet, Calendar, Trash2, Layers } from "lucide-react";
import { Button } from "./ui/button";

interface UploadHistoryProps {
  history: any[];
  onSelectDataset: (dataset: any) => void;
  currentDatasetId?: number;
  onClearHistory: () => void;
}

export const UploadHistory: React.FC<UploadHistoryProps> = ({
  history,
  onSelectDataset,
  currentDatasetId,
  onClearHistory,
}) => {
  if (!history || history.length === 0) return null;

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5 }}
      className="relative group"
    >
      {/* Gradient glow */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity"></div>

      {/* Main Card */}
      <div className="relative gradient-sidebar rounded-2xl p-6 shadow-card-hover border-3 border-primary/30">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-gradient-to-br from-secondary/20 to-secondary-light/20 border-2 border-secondary/30">
              <History className="w-6 h-6 text-secondary-light" />
            </div>
            <h3 className="text-xl font-bold text-white"> Upload History</h3>
          </div>

          <Button
            onClick={onClearHistory}
            className="gradient-button-danger hover:gradient-button-danger h-10 px-4 text-sm font-bold shadow-md hover:shadow-lg transition-all"
          >
            <Trash2 className="w-4 h-4 mr-2" />
            Clear
          </Button>
        </div>

        {/* Description */}
        <p className="text-white/70 text-sm mb-5 font-medium">
          Click on any upload to view its analysis
        </p>

        {/* History List */}
        <div className="space-y-3">
          {history.map((dataset, index) => {
            const typeCount = Object.keys(dataset.type_distribution || {}).length;
            const isActive = currentDatasetId === dataset.id;

            return (
              <motion.button
                key={dataset.id}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.08 }}
                whileHover={{ scale: 1.02, x: 5 }}
                onClick={() => onSelectDataset(dataset)}
                className={`w-full text-left rounded-xl border-2 p-4 transition-all ${
                  isActive
                    ? "border-secondary bg-gradient-to-br from-secondary/20 to-secondary-light/20 shadow-glow-secondary"
                    : "border-white/20 bg-white/5 hover:border-secondary/50 hover:bg-white/10 backdrop-blur-sm"
                }`}
              >
                <div className="flex gap-4">
                  {/* Icon */}
                  <motion.div
                    animate={{ rotate: isActive ? 360 : 0 }}
                    transition={{ duration: 0.5 }}
                    className={`p-3 rounded-xl shrink-0 ${
                      isActive
                        ? "bg-gradient-to-br from-secondary to-secondary-light shadow-lg"
                        : "bg-white/10 border-2 border-white/20"
                    }`}
                  >
                    <FileSpreadsheet
                      className={`w-6 h-6 ${isActive ? "text-white" : "text-secondary-light"}`}
                      strokeWidth={2.5}
                    />
                  </motion.div>

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    {/* File Name */}
                    <p className={`font-bold text-base truncate mb-1 ${
                      isActive ? "text-white" : "text-white/90"
                    }`}>
                      {dataset.fileName}
                    </p>

                    {/* Date */}
                    <div className="flex items-center gap-2 text-sm text-white/60 mb-3">
                      <Calendar className="w-4 h-4" />
                      <span>{new Date(dataset.uploadDate).toLocaleString()}</span>
                    </div>

                    {/* Stats */}
                    <div className="flex items-center gap-4 text-sm">
                      <div className="flex items-center gap-2 px-3 py-1.5 bg-white/10 rounded-lg border border-white/20">
                        <FileSpreadsheet className="w-4 h-4 text-secondary-light" />
                        <span className="font-bold text-white">{dataset.total_equipment}</span>
                        <span className="text-white/60">items</span>
                      </div>

                      <div className="flex items-center gap-2 px-3 py-1.5 bg-white/10 rounded-lg border border-white/20">
                        <Layers className="w-4 h-4 text-primary-light" />
                        <span className="font-bold text-white">{typeCount}</span>
                        <span className="text-white/60">types</span>
                      </div>
                    </div>

                    {/* Active Indicator */}
                    {isActive && (
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: "100%" }}
                        className="mt-3 h-1 bg-gradient-to-r from-secondary via-secondary-light to-secondary rounded-full"
                      />
                    )}
                  </div>
                </div>
              </motion.button>
            );
          })}
        </div>

        {/* Footer Note */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="text-xs text-white/50 mt-6 text-center font-medium"
        >
          💾 Last 5 uploads are stored in backend
        </motion.p>

        {/* Decorative bottom border */}
        <div className="absolute bottom-0 left-0 right-0 h-1.5 bg-gradient-to-r from-primary via-secondary to-accent rounded-b-2xl"></div>
      </div>
    </motion.div>
  );
};
