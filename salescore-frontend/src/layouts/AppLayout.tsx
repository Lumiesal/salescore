import { Link, Outlet, useLocation } from "react-router-dom";

const linkStyle = (active: boolean): React.CSSProperties => ({
  display: "block",
  padding: "12px 16px",
  borderRadius: "10px",
  textDecoration: "none",
  color: active ? "#111" : "#555",
  backgroundColor: active ? "#f0f0f0" : "transparent",
  fontWeight: active ? 600 : 400,
});

export default function AppLayout() {
  const location = useLocation();

  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "240px 1fr",
        minHeight: "100vh",
        background: "#f7f7f7",
      }}
    >
      <aside
        style={{
          background: "#ffffff",
          borderRight: "1px solid #e5e5e5",
          padding: "24px 16px",
        }}
      >
        <h2 style={{ marginTop: 0 }}>SalesCore</h2>

        <nav style={{ display: "grid", gap: "8px", marginTop: "24px" }}>
          <Link to="/" style={linkStyle(location.pathname === "/")}>
            Dashboard
          </Link>

          <Link
            to="/products"
            style={linkStyle(location.pathname === "/products")}
          >
            Productos
          </Link>

          <Link
            to="/customers"
            style={linkStyle(location.pathname === "/customers")}
          >
            Clientes
          </Link>
          <Link
            to="/sales"
            style={linkStyle(location.pathname === "/sales")}
          >
            Ventas
          </Link>
        </nav>
      </aside>

      <main style={{ padding: "24px" }}>
        <Outlet />
      </main>
    </div>
  );
}