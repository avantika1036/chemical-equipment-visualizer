import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FileSpreadsheet, RefreshCw, FileDown } from 'lucide-react';
import { Header } from '@/components/Header';
import { CSVUpload } from '@/components/CSVUpload';
import { DataTable } from '@/components/DataTable';
import { StatsPanel } from '@/components/StatsPanel';
import { ChartsPanel } from '@/components/ChartsPanel';
import { UploadHistory } from '@/components/UploadHistory';
import { DatasetSummary } from '@/types/equipment';
import { getHistory, clearHistory } from '@/lib/dataUtils';
import { generatePDFReport } from '@/lib/pdfGenerator';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const Index = () => {
  const [currentDataset, setCurrentDataset] = useState<DatasetSummary | null>(null);
  const [history, setHistory] = useState<DatasetSummary[]>([]);

  useEffect(() => {
    setHistory(getHistory());
  }, []);

  const handleUploadComplete = useCallback((summary: DatasetSummary) => {
    setCurrentDataset(summary);
    setHistory(getHistory());
  }, []);

  const handleSelectDataset = useCallback((summary: DatasetSummary) => {
    setCurrentDataset(summary);
  }, []);

  const handleClearHistory = useCallback(() => {
    clearHistory();
    setHistory([]);
    setCurrentDataset(null);
  }, []);

  const handleNewUpload = useCallback(() => {
    setCurrentDataset(null);
  }, []);

  const handleDownloadPDF = useCallback(() => {
    if (currentDataset) {
      generatePDFReport(currentDataset);
    }
  }, [currentDataset]);

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="container mx-auto px-4 py-8">
        <AnimatePresence mode="wait">
          {!currentDataset ? (
            <motion.div
              key="upload"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="grid grid-cols-1 lg:grid-cols-3 gap-8"
            >
              {/* Upload Section */}
              <div className="lg:col-span-2">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4 }}
                  className="mb-6"
                >
                  <h2 className="text-2xl font-bold text-foreground mb-2">
                    Upload Equipment Data
                  </h2>
                  <p className="text-muted-foreground">
                    Upload a CSV file containing your chemical equipment parameters for
                    analysis and visualization.
                  </p>
                </motion.div>
                <CSVUpload onUploadComplete={handleUploadComplete} />

                {/* Sample Data Info */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.2 }}
                  className="mt-6 p-4 bg-muted/50 rounded-lg border border-border"
                >
                  <div className="flex items-start gap-3">
                    <FileSpreadsheet className="w-5 h-5 text-primary mt-0.5" />
                    <div>
                      <h4 className="font-medium text-sm mb-1">Expected CSV Format</h4>
                      <p className="text-xs text-muted-foreground">
                        Your CSV should have the following columns:
                      </p>
                      <code className="text-xs mt-2 block bg-background p-2 rounded border font-mono">
                        Equipment Name, Type, Flowrate, Pressure, Temperature
                      </code>
                    </div>
                  </div>
                </motion.div>
              </div>

              {/* History Section */}
              <div>
                <UploadHistory
                  history={history}
                  onSelectDataset={handleSelectDataset}
                  currentDatasetId={currentDataset?.id}
                  onClearHistory={handleClearHistory}
                />
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="dashboard"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              {/* Dataset Header */}
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <FileSpreadsheet className="w-5 h-5 text-primary" />
                    <h2 className="text-xl font-bold text-foreground">
                      {currentDataset.fileName}
                    </h2>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Uploaded {new Date(currentDataset.uploadDate).toLocaleString()}
                  </p>
                </div>
                <div className="flex gap-2">
                  <Button onClick={handleDownloadPDF} variant="default">
                    <FileDown className="w-4 h-4 mr-2" />
                    Download PDF Report
                  </Button>
                  <Button onClick={handleNewUpload} variant="outline">
                    <RefreshCw className="w-4 h-4 mr-2" />
                    Upload New File
                  </Button>
                </div>
              </div>

              {/* Stats Panel */}
              <div className="mb-8">
                <StatsPanel summary={currentDataset} />
              </div>

              {/* Tabbed Content */}
              <Tabs defaultValue="charts" className="w-full">
                <TabsList className="mb-6">
                  <TabsTrigger value="charts">Charts & Analytics</TabsTrigger>
                  <TabsTrigger value="table">Data Table</TabsTrigger>
                </TabsList>

                <TabsContent value="charts">
                  <ChartsPanel summary={currentDataset} />
                </TabsContent>

                <TabsContent value="table">
                  <DataTable data={currentDataset.data} />
                </TabsContent>
              </Tabs>

              {/* History Sidebar for Desktop */}
              {history.length > 1 && (
                <div className="mt-8">
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

      {/* Footer */}
      <footer className="border-t border-border mt-16 py-6">
        <div className="container mx-auto px-4 text-center text-sm text-muted-foreground">
          <p>Chemical Equipment Parameter Visualizer • Hybrid Web + Desktop Application</p>
          <p className="mt-1 text-xs">
            Built with React + Chart.js • Compatible with Django REST API Backend
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
