import Papa from "papaparse";

type Props = {
  onDataLoaded: (data: any[]) => void;
};

export default function FileUpload({ onDataLoaded }: Props) {
  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    Papa.parse(file, {
      header: true,
      skipEmptyLines: true,
      complete: (results) => {
        const cleaned = (results.data as any[]).map((row) => ({
          equipment: row.equipment || row.Equipment,
          type: row.type || row.Type || row["Equipment Type"],
          flowrate: Number(row.flowrate || row.Flowrate),
          pressure: Number(row.pressure || row.Pressure),
          temperature: Number(row.temperature || row.Temperature),
        }));

        onDataLoaded(cleaned);
      },
    });
  };

  return (
    <div className="mb-6">
      <input
        type="file"
        accept=".csv"
        onChange={handleFile}
        className="block text-sm text-white
        file:mr-4 file:py-2 file:px-4
        file:rounded-lg
        file:border-0
        file:bg-white/10
        file:text-white
        hover:file:bg-white/20"
      />
    </div>
  );
}
