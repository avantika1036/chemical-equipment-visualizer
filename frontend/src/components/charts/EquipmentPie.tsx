import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";
import { Pie } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);

export default function EquipmentPie() {
  const data = {
    labels: ["Pump", "Reactor", "Heat Exchanger", "Valve"],
    datasets: [
      {
        data: [5, 3, 4, 3],
        backgroundColor: [
          "#38bdf8",
          "#818cf8",
          "#22c55e",
          "#facc15",
        ],
        borderWidth: 0,
      },
    ],
  };

  return (
    <div className="h-full">
      <Pie data={data} />
    </div>
  );
}
