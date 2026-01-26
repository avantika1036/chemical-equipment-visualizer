type Props = {
  data: any[];
};

export default function DataTable({ data }: Props) {
  if (data.length === 0) return null;

  return (
    <div className="mt-8 rounded-xl border border-white/10 bg-white/5 overflow-auto max-h-80">
      <table className="w-full text-sm text-left">
        <thead className="sticky top-0 bg-black/40 text-white/70">
          <tr>
            {Object.keys(data[0]).map((key) => (
              <th key={key} className="px-4 py-2">
                {key}
              </th>
            ))}
          </tr>
        </thead>

        <tbody>
          {data.map((row, i) => (
            <tr key={i} className="border-t border-white/10">
              {Object.values(row).map((val, j) => (
                <td key={j} className="px-4 py-2">
                  {String(val)}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
