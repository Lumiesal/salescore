import { useEffect, useState } from "react";
import { getDashboardSummary, type DashboardSummary } from "../api/dashboardApi";

const initialState: DashboardSummary = {
  totalCustomers: 0,
  totalProducts: 0,
  lowStockProducts: 0,
  totalSales: 0,
  totalRevenue: 0,
};

export default function DashboardPage() {
  const [summary, setSummary] = useState<DashboardSummary>(initialState);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchSummary = async () => {
      try {
        const data = await getDashboardSummary();
        setSummary(data);
      } catch (err) {
        setError("No se pudo cargar el resumen del dashboard");
      } finally {
        setLoading(false);
      }
    };

    fetchSummary();
  }, []);

  if (loading) {
    return <div style={{ padding: "24px" }}>Cargando dashboard...</div>;
  }

  if (error) {
    return <div style={{ padding: "24px" }}>{error}</div>;
  }

  return (
    <div style={{ padding: "24px", fontFamily: "Arial, sans-serif" }}>
      <h1>SalesCore Dashboard</h1>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
          gap: "16px",
          marginTop: "24px",
        }}
      >
        <Card title="Clientes activos" value={summary.totalCustomers} />
        <Card title="Productos activos" value={summary.totalProducts} />
        <Card title="Stock bajo" value={summary.lowStockProducts} />
        <Card title="Total ventas" value={summary.totalSales} />
        <Card title="Ingresos" value={`$ ${summary.totalRevenue.toLocaleString("es-CO")}`} />
      </div>
    </div>
  );
}

type CardProps = {
  title: string;
  value: string | number;
};

function Card({ title, value }: CardProps) {
  return (
    <div
      style={{
        border: "1px solid #ddd",
        borderRadius: "12px",
        padding: "20px",
        boxShadow: "0 2px 10px rgba(0,0,0,0.05)",
        backgroundColor: "#fff",
      }}
    >
      <p style={{ margin: 0, color: "#666", fontSize: "14px" }}>{title}</p>
      <h2 style={{ marginTop: "12px", marginBottom: 0 }}>{value}</h2>
    </div>
  );
}