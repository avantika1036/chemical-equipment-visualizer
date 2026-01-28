import React, { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FileSpreadsheet, RefreshCw, FileDown, BarChart3 } from "lucide-react";

import { Header } from "@/components/Header";
import { CSVUpload } from "@/components/CSVUpload";
import { DataTable } from "@/components/DataTable";
import { StatsPanel } from "@/components/StatsPanel";
import { ChartsPanel } from "@/components/ChartsPanel";
import { UploadHistory } from "@/components/UploadHistory";

import { api } from "@/lib/api";
import { Button } from "@/components/ui/button";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";

/* ================= BACKEND NORMALIZER ================= */

const normalizeDataset = (apiData: any) => {
  const typeDist =
    apiData.type_distribution ??
    apiData.typeDistribution ??
    {};

  return {
    id: apiData.id,

    fileName:
      apiData.fileName ||
      apiData.file?.split("/").pop() ||
      "dataset.csv",

    uploadDate:
      apiData.uploadDate ||
      apiData.uploaded_at,

    total_equipment:
      apiData.total_equipment ?? apiData.totalEquipment ?? 0,

    avg_flowrate:
      apiData.avg_flowrate ?? apiData.avgFlowrate ?? 0,

    avg_pressure:
      apiData.avg_pressure ?? apiData.avgPressure ?? 0,

    avg_temperature:
      apiData.avg_temperature ?? apiData.avgTemperature ?? 0,

    // 🔥 THIS FIXES ChartsPanel crash
    type_distribution: typeDist,
    typeDistribution: typeDist,

    data: apiData.data || [],
  };
};


const Index = () => {
  const [currentDataset, setCurrentDataset] =
    useState<any | null>(null);

  const [history, setHistory] = useState<any[]>([]);

  /* ================= LOAD HISTORY ================= */

  const loadHistory = useCallback(() => {
    api
      .get("history/")
      .then((res) => {
        const mapped = res.data.map(normalizeDataset);
        setHistory(mapped);
      })
      .catch(() => console.error("Failed to load history"));
  }, []);

  useEffect(() => {
    loadHistory();
  }, [loadHistory]);

  /* ================= AFTER UPLOAD ================= */

  const handleUploadComplete = useCallback(
    (apiResponse: any) => {
      const normalized = normalizeDataset(apiResponse);
      setCurrentDataset(normalized);
      loadHistory();
    },
    [loadHistory]
  );

  /* ================= SELECT HISTORY ================= */

  const handleSelectDataset = useCallback((dataset: any) => {
    setCurrentDataset(dataset);
  }, []);

  /* ================= CLEAR ================= */

  const handleClearHistory = useCallback(() => {
    setHistory([]);
    setCurrentDataset(null);
  }, []);

  /* ================= NEW UPLOAD ================= */

  const handleNewUpload = useCallback(() => {
    setCurrentDataset(null);
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="container mx-auto px-6 py-8">
        <AnimatePresence mode="wait">
          {!currentDataset ? (
            /* ================= UPLOAD VIEW ================= */
            <motion.div
              key="upload"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}
              className="grid grid-cols-1 lg:grid-cols-3 gap-8"
            >
              {/* Upload Section */}
              <div className="lg:col-span-2">
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2, duration: 0.4 }}
                >
                  <div className="flex items-center gap-3 mb-4">
                    <div className="p-2 rounded-lg bg-gradient-to-br from-secondary to-secondary-light">
                      <FileSpreadsheet className="w-6 h-6 text-white" />
                    </div>
                    <h2 className="text-3xl font-bold text-foreground">
                      Upload Equipment Data
                    </h2>
                  </div>
                  <p className="text-muted-foreground mb-6 text-base">
                    Upload your CSV file to analyze and visualize equipment parameters
                  </p>

                  <CSVUpload onUploadComplete={handleUploadComplete} />
                </motion.div>
              </div>

              {/* History Sidebar */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3, duration: 0.4 }}
              >
                <UploadHistory
                  history={history}
                  onSelectDataset={handleSelectDataset}
                  currentDatasetId={currentDataset?.id}
                  onClearHistory={handleClearHistory}
                />
              </motion.div>
            </motion.div>
          ) : (
            /* ================= DASHBOARD VIEW ================= */
            <motion.div
              key="dashboard"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}
              className="space-y-8"
            >
              {/* HEADER CARD */}
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1, duration: 0.3 }}
                className="bg-gradient-to-r from-primary via-primary-light to-secondary rounded-2xl p-6 shadow-lg text-white"
              >
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div className="flex items-start gap-4">
                    <div className="p-3 bg-white/20 rounded-xl backdrop-blur-sm">
                      <FileSpreadsheet className="w-7 h-7 text-white" />
                    </div>
                    <div>
                      <h2 className="text-2xl font-bold mb-1">
                        {currentDataset.fileName}
                      </h2>
                      <p className="text-white/80 text-sm font-medium">
                        Uploaded{" "}
                        {new Date(currentDataset.uploadDate).toLocaleString()}
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-3">
                  <Button
                    onClick={async () => {
                      try {
                        const response = await api.get(`pdf/${currentDataset.id}/`, {
                          responseType: 'blob'
                        });
                        const url = window.URL.createObjectURL(response.data);
                        const link = document.createElement('a');
                        link.href = url;
                        link.download = `${currentDataset.fileName.replace('.csv', '')}_report.pdf`;
                        document.body.appendChild(link);
                        link.click();
                        document.body.removeChild(link);
                        window.URL.revokeObjectURL(url);
                      } catch (error) {
                        console.error('Failed to download PDF:', error);
                      }
                    }}
                    className="gradient-button-accent hover:shadow-glow-accent text-lg font-bold px-6 py-6 rounded-xl"
                  >
                    <FileDown className="w-5 h-5 mr-2" />
                    Download PDF Report
                  </Button>
                    <Button
                      onClick={handleNewUpload}
                      variant="outline"
                      className="h-12 px-6 text-base font-semibold bg-white/20 border-2 border-white/40 text-white hover:bg-white hover:text-primary backdrop-blur-sm transition-all hover:scale-105"
                    >
                      <RefreshCw className="w-5 h-5 mr-2" />
                      Upload New File
                    </Button>
                  </div>
                </div>
              </motion.div>

              {/* STATS PANEL */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.3 }}
              >
                <StatsPanel summary={currentDataset} />
              </motion.div>

              {/* TABS SECTION */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.3 }}
              >
                <Tabs defaultValue="charts" className="mt-10">
                <TabsList className="mb-8 bg-white border-2 border-neutral-light p-1.5 rounded-2xl shadow-card h-auto w-full grid grid-cols-2 gap-2">
                  <TabsTrigger 
                    value="charts"
                    className="text-lg font-bold px-8 py-5 data-[state=active]:gradient-header data-[state=active]:text-white data-[state=inactive]:text-neutral-dark rounded-xl transition-all hover:bg-neutral-lightest"
                  >
                      <BarChart3 className="w-5 h-5 mr-2" />
                      Charts & Analytics
                    </TabsTrigger>
                    <TabsTrigger
                      value="table"
                      className="h-full text-base font-semibold rounded-lg data-[state=active]:gradient-button-primary data-[state=active]:text-white transition-all"
                    >
                      <FileSpreadsheet className="w-5 h-5 mr-2" />
                      Data Table
                    </TabsTrigger>
                  </TabsList>

                  <TabsContent value="charts" className="mt-6">
                    <ChartsPanel summary={currentDataset} />
                  </TabsContent>

                  <TabsContent value="table" className="mt-6">
                    <DataTable data={currentDataset.data} />
                  </TabsContent>
                </Tabs>
              </motion.div>

              {/* HISTORY SECTION (if multiple datasets) */}
              {history.length > 1 && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4, duration: 0.3 }}
                  className="pt-4"
                >
                  <div className="mb-4">
                    <h3 className="text-2xl font-bold text-foreground flex items-center gap-2">
                      📜 Recent Uploads
                    </h3>
                    <p className="text-muted-foreground text-sm mt-1">
                      Switch between your uploaded datasets
                    </p>
                  </div>
                  <UploadHistory
                    history={history}
                    onSelectDataset={handleSelectDataset}
                    currentDatasetId={currentDataset.id}
                    onClearHistory={handleClearHistory}
                  />
                </motion.div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </div>
  );
};

export default Index;
