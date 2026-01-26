import { useState } from "react";
import FileUpload from "../components/FileUpload";
import StatCard from "../components/StatCard";
import DataTable from "../components/DataTable";

import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  LinearScale,
  PointElement,
  CategoryScale,
} from "chart.js";

import { Pie, Scatter } from "react-chartjs-2";

ChartJS.register(
  ArcElement,
  Tooltip,
  Legend,
  LinearScale,
  PointElement,
  CategoryScale
);

export default function Dashboard() {
  const [data, setData] = useState<any[]>([]);

  const total = data.length;

  const avg = (key: string) =>
    data.length
      ? (
          data.reduce((sum, d) => sum + Number(d[key]), 0) / data.length
        ).toFixed(2)
      : "0";

  const typeCounts = data.reduce((acc: any, d) => {
    const type = d.type?.trim() || "Unknown";
    acc[type] = (acc[type] || 0) + 1;
    return acc;
  }, {});

  return (
    <div>
      <h1 className="text-3xl font-bold mb-1">Equipment Analytics</h1>
      <p className="text-white/60 mb-6">
        Operational insights from uploaded datasets
      </p>

      {/* upload */}
      <FileUpload onDataLoaded={setData} />

      {/* stats */}
      <div className="grid grid-cols-4 gap-6 mb-10">
        <StatCard title="Total Equipment" value={total} />
        <StatCard title="Avg Flowrate" value={`${avg("flowrate")} m³/h`} />
        <StatCard title="Avg Pressure" value={`${avg("pressure")} bar`} />
        <StatCard title="Avg Temperature" value={`${avg("temperature")} °C`} />
      </div>

      {/* charts */}
      <div className="grid grid-cols-5 gap-6">
        <div className="col-span-3 rounded-xl bg-white/5 border border-white/10 backdrop-blur-xl p-6 h-[360px]">
          <h3 className="mb-4 font-semibold">Equipment Type Distribution</h3>

          <Pie
            data={{
              labels: Object.keys(typeCounts),
              datasets: [
                {
                  data: Object.values(typeCounts),
                  backgroundColor: [
                    "#7dd3fc",
                    "#a5b4fc",
                    "#86efac",
                    "#fde047",
                    "#fca5a5",
                  ],
                },
              ],
            }}
          />
        </div>

        <div className="col-span-2 rounded-xl bg-white/5 border border-white/10 backdrop-blur-xl p-6 h-[360px]">
          <h3 className="mb-4 font-semibold">Pressure vs Flowrate</h3>

          <Scatter
            data={{
              datasets: [
                {
                  label: "Operating Points",
                  data: data.map((d) => ({
                    x: Number(d.flowrate),
                    y: Number(d.pressure),
                  })),
                  backgroundColor: "#93c5fd",
                },
              ],
            }}
          />
        </div>
      </div>

      {/* raw csv table */}
      <DataTable data={data} />
    </div>
  );
}
