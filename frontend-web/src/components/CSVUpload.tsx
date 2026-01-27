import React, { useCallback, useState } from "react";
import { Upload, FileSpreadsheet, AlertCircle } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { api } from "@/lib/api";
import { DatasetSummary } from "@/types/equipment";

interface CSVUploadProps {
  onUploadComplete: (summary: DatasetSummary) => void;
}

export const CSVUpload: React.FC<CSVUploadProps> = ({ onUploadComplete }) => {
  const [isDragging, setIsDragging] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleFile = useCallback(
    async (file: File) => {
      if (!file.name.endsWith(".csv")) {
        setError("Please upload a CSV file");
        return;
      }

      setIsLoading(true);
      setError(null);

      try {
        const formData = new FormData();
        formData.append("file", file);

        const response = await api.post("upload/", formData);

        const data = response.data;

        // ✅ NORMALIZE BACKEND → FRONTEND FORMAT
        const normalizedSummary: DatasetSummary = {
          id: data.id,
          fileName: file.name,
          uploadDate: new Date().toISOString(),

          totalCount: data.total_equipment ?? 0,
          averageFlowrate: data.avg_flowrate ?? 0,
          averagePressure: data.avg_pressure ?? 0,
          averageTemperature: data.avg_temperature ?? 0,

          typeDistribution: data.type_distribution ?? {},

          data: data.data ?? [],
        };

        onUploadComplete(normalizedSummary);
      } catch (err) {
        setError("Failed to upload CSV to server");
      } finally {
        setIsLoading(false);
      }
    },
    [onUploadComplete]
  );

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  }, []);

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      setIsDragging(false);

      const file = e.dataTransfer.files[0];
      if (file) {
        handleFile(file);
      }
    },
    [handleFile]
  );

  const handleFileInput = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (file) {
        handleFile(file);
      }
    },
    [handleFile]
  );

  return (
    <div className="w-full">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <label
          className={`upload-zone flex flex-col items-center justify-center min-h-[240px] ${
            isDragging ? "dragging" : ""
          }`}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
        >
          <input
            type="file"
            accept=".csv"
            onChange={handleFileInput}
            className="hidden"
            disabled={isLoading}
          />

          <AnimatePresence mode="wait">
            {isLoading ? (
              <motion.div
                key="loading"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex flex-col items-center"
              >
                <div className="w-12 h-12 border-4 border-primary/30 border-t-primary rounded-full animate-spin mb-4" />
                <p className="text-muted-foreground">
                  Uploading and analyzing CSV...
                </p>
              </motion.div>
            ) : (
              <motion.div
                key="upload"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex flex-col items-center"
              >
                <div className="p-4 bg-primary/10 rounded-full mb-4">
                  {isDragging ? (
                    <FileSpreadsheet className="w-10 h-10 text-primary" />
                  ) : (
                    <Upload className="w-10 h-10 text-primary" />
                  )}
                </div>

                <h3 className="text-lg font-semibold mb-2">
                  {isDragging
                    ? "Drop your CSV file here"
                    : "Upload CSV File"}
                </h3>

                <p className="text-muted-foreground text-sm text-center">
                  Drag and drop your equipment CSV or click to browse
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </label>

        <AnimatePresence>
          {error && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="mt-4 p-4 bg-destructive/10 rounded-lg flex gap-3"
            >
              <AlertCircle className="w-5 h-5 text-destructive" />
              <p className="text-destructive text-sm">{error}</p>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
};
