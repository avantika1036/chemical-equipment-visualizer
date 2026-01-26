import {
  Chart as ChartJS,
  LinearScale,
  PointElement,
  Tooltip,
  Legend,
} from "chart.js";
import { Scatter } from "react-chartjs-2";

ChartJS.register(LinearScale, PointElement, Tooltip, Legend);

export default function PressureFlowScatter() {
  const data = {
    datasets: [
      {
        label: "Operating Points",
        data: [
          { x: 80, y: 4.2 },
          { x: 95, y: 5.1 },
          { x: 110, y: 6.0 },
          { x: 130, y: 6.8 },
          { x: 150, y: 7.5 },
        ],
        backgroundColor: "#60a5fa",
      },
    ],
  };

  const options = {
    scales: {
      x: {
        title: {
          display: true,
          text: "Flowrate (m³/h)",
          color: "#cbd5f5",
        },
        ticks: { color: "#cbd5f5" },
      },
      y: {
        title: {
          display: true,
          text: "Pressure (bar)",
          color: "#cbd5f5",
        },
        ticks: { color: "#cbd5f5" },
      },
    },
    plugins: {
      legend: {
        labels: { color: "#e5e7eb" },
      },
    },
  };

  return <Scatter data={data} options={options} />;
}
