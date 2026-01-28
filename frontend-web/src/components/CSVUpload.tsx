import React, { useCallback, useState } from "react";
import { Upload, FileSpreadsheet, AlertCircle, CheckCircle2, Sparkles } from "lucide-react";
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
      if (file) handleFile(file);
    },
    [handleFile]
  );

  const handleFileInput = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (file) handleFile(file);
    },
    [handleFile]
  );

  return (
    <div className="w-full">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <label
          className={`relative upload-zone flex flex-col items-center justify-center min-h-[300px] transition-all duration-300 ${
            isDragging ? "dragging scale-[1.02] shadow-glow-secondary" : ""
          } ${isLoading ? "pointer-events-none" : "cursor-pointer"}`}
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

          {/* Animated gradient background */}
          <div className={`absolute inset-0 bg-gradient-to-br from-secondary/10 via-primary/10 to-accent/10 rounded-2xl transition-opacity ${isDragging ? 'opacity-100 animate-pulse' : 'opacity-0'}`}></div>

          <div className="relative z-10">
            <AnimatePresence mode="wait">
              {isLoading ? (
                /* LOADING STATE */
                <motion.div
                  key="loading"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  className="flex flex-col items-center"
                >
                  <div className="relative mb-8">
                    <div className="w-24 h-24 border-4 border-neutral-light rounded-full"></div>
                    <div className="absolute inset-0 w-24 h-24 border-4 border-t-secondary border-r-primary border-b-accent border-l-transparent rounded-full animate-spin"></div>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <Sparkles className="w-8 h-8 text-primary animate-pulse" />
                    </div>
                  </div>
                  <p className="text-2xl font-bold text-foreground mb-3">
                    Processing CSV File...
                  </p>
                  <p className="text-base text-muted-foreground">
                    Analyzing equipment data and generating visualizations
                  </p>
                </motion.div>
              ) : (
                /* UPLOAD STATE */
                <motion.div
                  key="upload"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  className="flex flex-col items-center"
                >
                  <motion.div
                    animate={{
                      y: isDragging ? -15 : 0,
                      scale: isDragging ? 1.15 : 1,
                      rotate: isDragging ? 5 : 0,
                    }}
                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                    className={`p-8 rounded-2xl mb-8 shadow-lg transition-all ${
                      isDragging
                        ? 'bg-gradient-to-br from-secondary to-secondary-light shadow-glow-secondary'
                        : 'bg-gradient-to-br from-primary/10 to-secondary/10 border-3 border-dashed border-secondary'
                    }`}
                  >
                    {isDragging ? (
                      <FileSpreadsheet className="w-20 h-20 text-white" strokeWidth={2.5} />
                    ) : (
                      <Upload className="w-20 h-20 text-secondary" strokeWidth={2.5} />
                    )}
                  </motion.div>

                  <h3 className="text-3xl font-bold text-foreground mb-4">
                    {isDragging ? "Drop your CSV file here!" : "Upload CSV File"}
                  </h3>

                  <p className="text-lg text-muted-foreground text-center max-w-lg mb-6">
                    {isDragging
                      ? "Release to upload and analyze your equipment data instantly"
                      : "Drag and drop your equipment CSV file or click to browse"}
                  </p>

                  <div className="flex flex-wrap items-center justify-center gap-6 text-sm font-semibold">
                    <div className="flex items-center gap-2 px-4 py-2 bg-secondary/10 rounded-full border-2 border-secondary/20">
                      <CheckCircle2 className="w-5 h-5 text-secondary" />
                      <span className="text-secondary">Supports .csv format</span>
                    </div>
                    <div className="flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full border-2 border-primary/20">
                      <CheckCircle2 className="w-5 h-5 text-primary" />
                      <span className="text-primary">Instant analysis</span>
                    </div>
                    <div className="flex items-center gap-2 px-4 py-2 bg-accent/10 rounded-full border-2 border-accent/20">
                      <CheckCircle2 className="w-5 h-5 text-accent" />
                      <span className="text-accent">Auto visualization</span>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </label>

        {/* ERROR MESSAGE */}
        <AnimatePresence>
          {error && (
            <motion.div
              initial={{ opacity: 0, y: -10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.95 }}
              className="mt-6 p-6 bg-destructive/10 border-3 border-destructive rounded-2xl flex gap-4 items-start shadow-lg"
            >
              <div className="p-3 bg-destructive/20 rounded-xl">
                <AlertCircle className="w-7 h-7 text-destructive" />
              </div>
              <div className="flex-1">
                <p className="text-destructive font-bold text-lg mb-1">Upload Failed</p>
                <p className="text-destructive/80 text-base">{error}</p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
};
