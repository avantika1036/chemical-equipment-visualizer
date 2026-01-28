import React, { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { ArrowUpDown, ArrowUp, ArrowDown, Search, Table2 } from "lucide-react";
import { EquipmentData } from "@/types/equipment";
import { Input } from "@/components/ui/input";
import { formatValue } from "@/lib/dataUtils";

interface DataTableProps {
  data: EquipmentData[];
}

type SortField = keyof EquipmentData;
type SortDirection = "asc" | "desc";

export const DataTable: React.FC<DataTableProps> = ({ data }) => {
  const [sortField, setSortField] = useState<SortField>("equipmentName");
  const [sortDirection, setSortDirection] = useState<SortDirection>("asc");
  const [searchQuery, setSearchQuery] = useState("");

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortDirection("asc");
    }
  };

  const filteredAndSortedData = useMemo(() => {
    let result = [...data];

    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(
        (item) =>
          item.equipmentName.toLowerCase().includes(query) ||
          item.type.toLowerCase().includes(query)
      );
    }

    result.sort((a, b) => {
      const aVal = a[sortField];
      const bVal = b[sortField];

      if (typeof aVal === "string" && typeof bVal === "string") {
        return sortDirection === "asc"
          ? aVal.localeCompare(bVal)
          : bVal.localeCompare(aVal);
      }

      if (typeof aVal === "number" && typeof bVal === "number") {
        return sortDirection === "asc" ? aVal - bVal : bVal - aVal;
      }

      return 0;
    });

    return result;
  }, [data, sortField, sortDirection, searchQuery]);

  const SortIcon = ({ field }: { field: SortField }) => {
    if (sortField !== field) {
      return <ArrowUpDown className="w-4 h-4 text-white/60" />;
    }
    return sortDirection === "asc" ? (
      <ArrowUp className="w-4 h-4 text-white" />
    ) : (
      <ArrowDown className="w-4 h-4 text-white" />
    );
  };

  const columns: { key: SortField; label: string; unit?: string }[] = [
    { key: "equipmentName", label: "Equipment Name" },
    { key: "type", label: "Type" },
    { key: "flowrate", label: "Flowrate", unit: "m³/h" },
    { key: "pressure", label: "Pressure", unit: "bar" },
    { key: "temperature", label: "Temperature", unit: "°C" },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="relative"
    >
      {/* Section Header */}
      <div className="mb-6">
        <h3 className="text-2xl font-bold text-foreground flex items-center gap-3 mb-2">
          <div className="p-2 rounded-lg bg-gradient-to-br from-primary to-primary-light">
            <Table2 className="w-6 h-6 text-white" />
          </div>
           Equipment Data Table
        </h3>
        <p className="text-muted-foreground text-sm ml-14">
          View, search, and sort all equipment parameters
        </p>
      </div>

      <div className="relative group">
        {/* Gradient glow */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity"></div>

        <div className="relative bg-white rounded-2xl shadow-card hover:shadow-card-hover border-3 border-neutral-light transition-all p-6">
          {/* Search */}
          <div className="mb-6 relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-medium" />
            <Input
              placeholder=" Search equipment or type..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-12 h-14 text-base border-3 border-neutral-light rounded-xl focus:border-primary"
            />
          </div>

          {/* Table */}
          <div className="overflow-x-auto rounded-xl border-3 border-neutral-light">
            <table className="data-grid">
              <thead>
                <tr>
                  {columns.map((col) => (
                    <th
                      key={col.key}
                      onClick={() => handleSort(col.key)}
                      className="cursor-pointer hover:opacity-90 transition-opacity"
                      style={{
                        background: 'linear-gradient(180deg, #0A4D8C 0%, #083A6B 100%)',
                      }}
                    >
                      <div className="flex items-center gap-2 justify-between">
                        <span className="text-white font-bold uppercase tracking-wide">
                          {col.label}
                        </span>
                        <SortIcon field={col.key} />
                      </div>
                    </th>
                  ))}
                </tr>
              </thead>

              <tbody>
                {filteredAndSortedData.map((row, index) => (
                  <motion.tr
                    key={`${row.equipmentName}-${index}`}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.03 }}
                    className="hover:bg-primary/5 transition-colors"
                  >
                    <td className="font-semibold text-base">{row.equipmentName}</td>
                    <td>
                      <span className="inline-flex items-center px-3 py-1.5 rounded-full text-sm font-bold bg-secondary/10 text-secondary border-2 border-secondary/20">
                        {row.type}
                      </span>
                    </td>
                    <td className="font-mono text-base font-semibold text-secondary">
                      {formatValue(row.flowrate, "m³/h")}
                    </td>
                    <td className="font-mono text-base font-semibold text-primary">
                      {formatValue(row.pressure, "bar")}
                    </td>
                    <td className="font-mono text-base font-semibold text-accent">
                      {formatValue(row.temperature, "°C")}
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Count */}
          <div className="mt-5 flex items-center justify-between text-sm">
            <span className="text-muted-foreground font-medium">
              Showing <span className="font-bold text-foreground">{filteredAndSortedData.length}</span> of{" "}
              <span className="font-bold text-foreground">{data.length}</span> entries
            </span>
            {searchQuery && (
              <span className="text-secondary font-semibold">
                🔍 Filtered by: "{searchQuery}"
              </span>
            )}
          </div>

          {/* Decorative bottom border */}
          <div className="absolute bottom-0 left-0 right-0 h-1.5 bg-gradient-to-r from-primary via-secondary to-accent rounded-b-2xl"></div>
        </div>
      </div>
    </motion.div>
  );
};
