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

      <div className="space-y-2">
        {history.map((dataset: any, index: number) => (
          <motion.button
            key={dataset.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.2, delay: index * 0.05 }}
            onClick={() => onSelectDataset(dataset)}
            className={`w-full p-3 rounded-lg border text-left transition-all ${
              currentDatasetId === dataset.id
                ? "border-primary bg-primary/5"
                : "border-border hover:border-primary/50 hover:bg-muted/50"
            }`}
          >
            <div className="flex items-start gap-3">
              <div className="p-2 bg-secondary rounded-lg">
                <FileSpreadsheet className="w-4 h-4" />
              </div>

              <div className="flex-1 min-w-0">
                <p className="font-medium text-sm truncate">
                  Dataset #{dataset.id}
                </p>

                <div className="flex items-center gap-2 mt-1 text-xs text-muted-foreground">
                  <Calendar className="w-3 h-3" />
                  <span>
                    {new Date(dataset.uploaded_at).toLocaleString()}
                  </span>
                </div>
              </div>
            </div>
          </motion.button>
        ))}
      </div>

      <p className="text-xs text-muted-foreground mt-4 text-center">
        Last 5 uploads are stored in backend
      </p>
    </motion.div>
  );
};
