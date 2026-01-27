export function mapDatasetFromBackend(apiData: any) {
  return {
    id: apiData.id,
    fileName: apiData.file?.split("/").pop() ?? "dataset.csv",
    uploadDate: apiData.uploaded_at,

    totalCount: apiData.total_equipment,
    averageFlowrate: apiData.avg_flowrate,
    averagePressure: apiData.avg_pressure,
    averageTemperature: apiData.avg_temperature,

    typeDistribution: apiData.type_distribution,

    // TEMP until backend sends row-level data
    data: apiData.rows ?? [],
  };
}
