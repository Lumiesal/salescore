import { Link, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

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
  const { user, logout } = useAuth();

  const isAdmin = user?.role === "ADMIN";
  const isManager = user?.role === "MANAGER";
  /* const isSales = user?.role === "SALES"; */

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
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
        }}
      >
        <div>
          <h2 style={{ marginTop: 0 }}>SalesCore</h2>

          <p style={{ fontSize: "14px", color: "#666" }}>
            {user?.fullName}
            <br />
            <strong>{user?.role}</strong>
          </p>

          <nav style={{ display: "grid", gap: "8px", marginTop: "24px" }}>
            {(isAdmin || isManager) && (
              <Link to="/" style={linkStyle(location.pathname === "/")}>
                Dashboard
              </Link>
            )}

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

            {(isAdmin || isManager) && (
              <Link
                to="/stock-movements"
                style={linkStyle(location.pathname === "/stock-movements")}
              >
                Movimientos
              </Link>
            )}

            {isAdmin && (
              <Link
                to="/users"
                style={linkStyle(location.pathname === "/users")}
              >
                Usuarios
              </Link>
            )}
          </nav>
        </div>

        <button
          onClick={logout}
          style={{
            padding: "10px 16px",
            borderRadius: "8px",
            border: "1px solid #ddd",
            background: "#fff",
            cursor: "pointer",
          }}
        >
          Cerrar sesión
        </button>
      </aside>

      <main style={{ padding: "24px" }}>
        <Outlet />
      </main>
    </div>
  );
}