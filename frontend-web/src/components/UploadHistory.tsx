import React from "react";
import { motion } from "framer-motion";
import { History, FileSpreadsheet, Calendar, Trash2 } from "lucide-react";
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
      transition={{ duration: 0.4 }}
      className="chart-container"
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <History className="w-5 h-5 text-primary" />
          <h3 className="text-lg font-semibold">Upload History</h3>
        </div>

        <Button
          variant="ghost"
          size="sm"
          onClick={onClearHistory}
          className="text-muted-foreground hover:text-destructive"
        >
          <Trash2 className="w-4 h-4 mr-1" />
          Clear
        </Button>
      </div>

      {/* History cards */}
      <div className="space-y-3">
        {history.map((dataset, index) => {
          const typeCount = Object.keys(
            dataset.type_distribution || {}
          ).length;

          return (
            <motion.button
              key={dataset.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.25, delay: index * 0.05 }}
              onClick={() => onSelectDataset(dataset)}
              className={`w-full text-left rounded-xl border p-4 transition-all ${
                currentDatasetId === dataset.id
                  ? "border-primary bg-primary/5"
                  : "border-border hover:border-primary/50 hover:bg-muted/40"
              }`}
            >
              <div className="flex gap-4">
                {/* Icon */}
                <div className="p-3 bg-secondary rounded-lg">
                  <FileSpreadsheet className="w-5 h-5" />
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  {/* ✅ FILE NAME */}
                  <p className="font-semibold text-sm truncate">
                    {dataset.fileName}
                  </p>

                  {/* Date */}
                  <div className="flex items-center gap-2 text-xs text-muted-foreground mt-1">
                    <Calendar className="w-3 h-3" />
                    <span>
                      {new Date(dataset.uploadDate).toLocaleString()}
                    </span>
                  </div>

                  {/* Stats */}
                  <div className="flex gap-6 mt-3 text-sm">
                    <span>
                      <b>{dataset.total_equipment}</b>{" "}
                      <span className="text-muted-foreground">
                        items
                      </span>
                    </span>

                    <span>
                      <b>{typeCount}</b>{" "}
                      <span className="text-muted-foreground">
                        types
                      </span>
                    </span>
                  </div>
                </div>
              </div>
            </motion.button>
          );
        })}
      </div>

      <p className="text-xs text-muted-foreground mt-4 text-center">
        Last 5 uploads are stored in backend
      </p>
    </motion.div>
  );
};
