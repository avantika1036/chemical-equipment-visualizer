import { ReactNode } from "react";

export default function DashboardLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <div className="flex min-h-screen bg-gradient-to-br from-[#0b1220] via-[#0a0f1c] to-black text-white">
      
      {/* Sidebar */}
      <aside className="w-64 border-r border-white/10 p-6">
        <h1 className="text-2xl font-bold mb-8">ChemEquip</h1>

        <nav className="space-y-4 text-white/70">
          <p className="hover:text-white cursor-pointer">Dashboard</p>
          <p className="hover:text-white cursor-pointer">Analytics</p>
          <p className="hover:text-white cursor-pointer">Reports</p>
        </nav>
      </aside>

      {/* Main */}
      <main className="flex-1 p-10">{children}</main>
    </div>
  );
}
