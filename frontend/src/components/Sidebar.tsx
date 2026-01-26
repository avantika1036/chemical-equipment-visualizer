export default function Sidebar() {
  return (
    <aside className="w-64 bg-slate-900 border-r border-white/10 p-6">
      <h1 className="text-2xl font-bold mb-10">ChemEquip</h1>

      <nav className="space-y-4 text-white/80">
        <p className="hover:text-white cursor-pointer">Dashboard</p>
        <p className="hover:text-white cursor-pointer">Analytics</p>
        <p className="hover:text-white cursor-pointer">Reports</p>
      </nav>
    </aside>
  );
}
