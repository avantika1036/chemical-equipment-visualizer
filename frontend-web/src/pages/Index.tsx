import React, { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FileSpreadsheet, RefreshCw, FileDown } from "lucide-react";

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
    <div className="min-h-screen bg-neutral-lightest">
      <Header />

      <main className="container mx-auto px-8 py-8">
        <AnimatePresence mode="wait">
          {!currentDataset ? (
            /* ================= UPLOAD ================= */
            <motion.div
              key="upload"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="grid grid-cols-1 lg:grid-cols-3 gap-8"
            >
              <div className="lg:col-span-2">
                <h2 className="text-4xl font-bold mb-6 text-primary">
                  📊 Upload Equipment Data
                </h2>

                <CSVUpload
                  onUploadComplete={handleUploadComplete}
                />
              </div>

              <UploadHistory
                history={history}
                onSelectDataset={handleSelectDataset}
                currentDatasetId={currentDataset?.id}
                onClearHistory={handleClearHistory}
              />
            </motion.div>
          ) : (
            /* ================= DASHBOARD ================= */
            <motion.div
              key="dashboard"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              {/* HEADER */}
              <div className="flex justify-between items-start mb-8">
                <div>
                  <h2 className="text-3xl font-bold flex items-center gap-3 text-primary mb-2">
                    <FileSpreadsheet className="w-8 h-8" />
                    {currentDataset.fileName}
                  </h2>
                  <p className="text-base text-neutral-medium font-medium">
                    Uploaded{" "}
                    {new Date(
                      currentDataset.uploadDate
                    ).toLocaleString()}
                  </p>
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
                    className="border-2 border-primary text-primary hover:bg-primary hover:text-white text-lg font-bold px-6 py-6 rounded-xl transition-all"
                  >
                    <RefreshCw className="w-5 h-5 mr-2" />
                    Upload New File
                  </Button>
                </div>
              </div>

              {/* ✅ STATS */}
              <StatsPanel summary={currentDataset} />

              {/* TABS */}
              <Tabs defaultValue="charts" className="mt-10">
                <TabsList className="mb-8 bg-white border-2 border-neutral-light p-1.5 rounded-2xl shadow-card h-auto w-full grid grid-cols-2 gap-2">
                  <TabsTrigger 
                    value="charts"
                    className="text-lg font-bold px-8 py-5 data-[state=active]:gradient-header data-[state=active]:text-white data-[state=inactive]:text-neutral-dark rounded-xl transition-all hover:bg-neutral-lightest"
                  >
                    📊 Charts & Analytics
                  </TabsTrigger>
                  <TabsTrigger 
                    value="table"
                    className="text-lg font-bold px-8 py-5 data-[state=active]:gradient-header data-[state=active]:text-white data-[state=inactive]:text-neutral-dark rounded-xl transition-all hover:bg-neutral-lightest"
                  >
                    📋 Data Table
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="charts">
                  <ChartsPanel summary={currentDataset} />
                </TabsContent>

                <TabsContent value="table">
                  <DataTable data={currentDataset.data} />
                </TabsContent>
              </Tabs>

              {history.length > 1 && (
                <div className="mt-10">
                  <UploadHistory
                    history={history}
                    onSelectDataset={handleSelectDataset}
                    currentDatasetId={currentDataset.id}
                    onClearHistory={handleClearHistory}
                  />
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </div>
  );
};

export default Index;
