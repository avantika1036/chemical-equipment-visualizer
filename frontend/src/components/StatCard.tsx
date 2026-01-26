interface StatCardProps {
  title: string;
  value?: string | number;
}

export default function StatCard({ title, value }: StatCardProps) {
  return (
    <div className="rounded-xl bg-white/5 border border-white/10 backdrop-blur-xl p-6">
      <p className="text-sm text-white/60 mb-2">{title}</p>
      {value && (
        <p className="text-2xl font-semibold text-white">{value}</p>
      )}
    </div>
  );
}
