import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import { DatasetSummary } from '@/types/equipment';
import { formatValue, formatDate } from '@/lib/dataUtils';

export const generatePDFReport = (summary: DatasetSummary): void => {
  const doc = new jsPDF();
  const pageWidth = doc.internal.pageSize.getWidth();
  
  // Title
  doc.setFontSize(20);
  doc.setFont('helvetica', 'bold');
  doc.text('Chemical Equipment Report', pageWidth / 2, 20, { align: 'center' });
  
  // Subtitle with file info
  doc.setFontSize(10);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(100);
  doc.text(`Generated from: ${summary.fileName}`, pageWidth / 2, 28, { align: 'center' });
  doc.text(`Upload Date: ${formatDate(summary.uploadDate)}`, pageWidth / 2, 34, { align: 'center' });
  doc.text(`Report Generated: ${formatDate(new Date().toISOString())}`, pageWidth / 2, 40, { align: 'center' });
  
  // Separator line
  doc.setDrawColor(200);
  doc.line(20, 45, pageWidth - 20, 45);
  
  // Summary Statistics Section
  doc.setFontSize(14);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(0);
  doc.text('Summary Statistics', 20, 55);
  
  doc.setFontSize(10);
  doc.setFont('helvetica', 'normal');
  
  const statsData = [
    ['Total Equipment Count', summary.totalCount.toString()],
    ['Average Flowrate', formatValue(summary.averageFlowrate, 'm³/h')],
    ['Average Pressure', formatValue(summary.averagePressure, 'bar')],
    ['Average Temperature', formatValue(summary.averageTemperature, '°C')],
  ];
  
  autoTable(doc, {
    startY: 60,
    head: [['Metric', 'Value']],
    body: statsData,
    theme: 'striped',
    headStyles: { fillColor: [41, 128, 185], textColor: 255 },
    styles: { fontSize: 10 },
    margin: { left: 20, right: 20 },
  });
  
  // Equipment Type Distribution Section
  const finalY1 = (doc as any).lastAutoTable.finalY || 90;
  
  doc.setFontSize(14);
  doc.setFont('helvetica', 'bold');
  doc.text('Equipment Type Distribution', 20, finalY1 + 15);
  
  const typeData = Object.entries(summary.typeDistribution).map(([type, count]) => [
    type,
    count.toString(),
    `${((count / summary.totalCount) * 100).toFixed(1)}%`,
  ]);
  
  autoTable(doc, {
    startY: finalY1 + 20,
    head: [['Equipment Type', 'Count', 'Percentage']],
    body: typeData,
    theme: 'striped',
    headStyles: { fillColor: [46, 204, 113], textColor: 255 },
    styles: { fontSize: 10 },
    margin: { left: 20, right: 20 },
  });
  
  // Equipment Data Table Section
  const finalY2 = (doc as any).lastAutoTable.finalY || 130;
  
  // Check if we need a new page
  if (finalY2 > 220) {
    doc.addPage();
    doc.setFontSize(14);
    doc.setFont('helvetica', 'bold');
    doc.text('Equipment Data', 20, 20);
  } else {
    doc.setFontSize(14);
    doc.setFont('helvetica', 'bold');
    doc.text('Equipment Data', 20, finalY2 + 15);
  }
  
  const equipmentData = summary.data.map((item) => [
    item.equipmentName,
    item.type,
    formatValue(item.flowrate, 'm³/h'),
    formatValue(item.pressure, 'bar'),
    formatValue(item.temperature, '°C'),
  ]);
  
  autoTable(doc, {
    startY: finalY2 > 220 ? 25 : finalY2 + 20,
    head: [['Equipment Name', 'Type', 'Flowrate', 'Pressure', 'Temperature']],
    body: equipmentData,
    theme: 'striped',
    headStyles: { fillColor: [155, 89, 182], textColor: 255 },
    styles: { fontSize: 8 },
    margin: { left: 20, right: 20 },
    columnStyles: {
      0: { cellWidth: 45 },
      1: { cellWidth: 30 },
      2: { cellWidth: 30 },
      3: { cellWidth: 30 },
      4: { cellWidth: 30 },
    },
  });
  
  // Footer on each page
  const pageCount = doc.getNumberOfPages();
  for (let i = 1; i <= pageCount; i++) {
    doc.setPage(i);
    doc.setFontSize(8);
    doc.setTextColor(150);
    doc.text(
      `Chemical Equipment Parameter Visualizer - Page ${i} of ${pageCount}`,
      pageWidth / 2,
      doc.internal.pageSize.getHeight() - 10,
      { align: 'center' }
    );
  }
  
  // Save the PDF
  const fileName = `equipment_report_${new Date().toISOString().split('T')[0]}.pdf`;
  doc.save(fileName);
};
