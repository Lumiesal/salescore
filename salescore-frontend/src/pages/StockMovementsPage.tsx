import { useEffect, useState } from "react";
import type { CSSProperties, ChangeEvent, FormEvent } from "react";
import { getProducts, type Product } from "../api/productsApi";
import {
  createStockMovement,
  getStockMovements,
  type StockMovement,
  type StockMovementRequest,
} from "../api/StockMovementsApi.ts";

const initialForm: StockMovementRequest = {
  type: "IN",
  quantity: 1,
  note: "",
  productId: 0,
};

export default function StockMovementsPage() {
  const [movements, setMovements] = useState<StockMovement[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [form, setForm] = useState<StockMovementRequest>(initialForm);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [formError, setFormError] = useState("");

  const fetchData = async () => {
    try {
      const [movementsData, productsData] = await Promise.all([
        getStockMovements(),
        getProducts(),
      ]);

      setMovements(movementsData);
      setProducts(productsData);

      if (productsData.length > 0) {
        setForm((prev) => ({
          ...prev,
          productId: prev.productId || productsData[0].id,
        }));
      }
    } catch (err) {
      setError("No se pudieron cargar los movimientos");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]:
        type === "number" || name === "productId"
          ? Number(value)
          : value,
    }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setFormError("");

    if (!form.productId) {
      setFormError("Debes seleccionar un producto");
      return;
    }

    if (form.quantity <= 0) {
      setFormError("La cantidad debe ser mayor que cero");
      return;
    }

    try {
      setSaving(true);
      await createStockMovement(form);

      setForm((prev) => ({
        ...initialForm,
        productId: prev.productId,
      }));

      await fetchData();
    } catch (err) {
      setFormError("No se pudo registrar el movimiento");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return <div>Cargando movimientos...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div>
      <h1 style={{ marginTop: 0 }}>Movimientos de stock</h1>

      <div style={cardContainerStyle}>
        <h2 style={{ marginTop: 0 }}>Registrar movimiento</h2>

        <form onSubmit={handleSubmit} style={formGridStyle}>
          <div>
            <label style={labelStyle}>Producto</label>
            <select
              name="productId"
              value={form.productId}
              onChange={handleChange}
              style={inputStyle}
            >
              {products.map((product) => (
                <option key={product.id} value={product.id}>
                  {product.name} — stock actual: {product.stock}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label style={labelStyle}>Tipo</label>
            <select
              name="type"
              value={form.type}
              onChange={handleChange}
              style={inputStyle}
            >
              <option value="IN">Entrada</option>
              <option value="OUT">Salida</option>
              <option value="ADJUST">Ajuste</option>
            </select>
          </div>

          <div>
            <label style={labelStyle}>Cantidad</label>
            <input
              type="number"
              name="quantity"
              value={form.quantity}
              onChange={handleChange}
              style={inputStyle}
            />
          </div>

          <div>
            <label style={labelStyle}>Nota</label>
            <input
              name="note"
              value={form.note}
              onChange={handleChange}
              style={inputStyle}
              placeholder="Motivo del movimiento"
            />
          </div>

          <div style={buttonWrapperStyle}>
            <button type="submit" style={buttonStyle} disabled={saving}>
              {saving ? "Guardando..." : "Guardar movimiento"}
            </button>
          </div>
        </form>

        {formError && (
          <p style={{ color: "crimson", marginTop: "12px", marginBottom: 0 }}>
            {formError}
          </p>
        )}
      </div>

      <div style={tableContainerStyle}>
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead style={{ background: "#f3f3f3" }}>
            <tr>
              <th style={thStyle}>ID</th>
              <th style={thStyle}>Producto</th>
              <th style={thStyle}>Tipo</th>
              <th style={thStyle}>Cantidad</th>
              <th style={thStyle}>Nota</th>
              <th style={thStyle}>Fecha</th>
            </tr>
          </thead>
          <tbody>
            {movements.map((movement) => (
              <tr key={movement.id}>
                <td style={tdStyle}>{movement.id}</td>
                <td style={tdStyle}>{movement.productName}</td>
                <td style={tdStyle}>{movement.type}</td>
                <td style={tdStyle}>{movement.quantity}</td>
                <td style={tdStyle}>{movement.note}</td>
                <td style={tdStyle}>
                  {new Date(movement.createdAt).toLocaleString("es-CO")}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

const cardContainerStyle: CSSProperties = {
  marginTop: "20px",
  background: "#fff",
  borderRadius: "12px",
  border: "1px solid #e5e5e5",
  padding: "20px",
  marginBottom: "24px",
};

const formGridStyle: CSSProperties = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
  gap: "16px",
};

const labelStyle: CSSProperties = {
  display: "block",
  marginBottom: "6px",
  fontSize: "14px",
  color: "#444",
};

const inputStyle: CSSProperties = {
  width: "100%",
  padding: "10px 12px",
  borderRadius: "8px",
  border: "1px solid #dcdcdc",
  fontSize: "14px",
  boxSizing: "border-box",
};

const buttonWrapperStyle: CSSProperties = {
  display: "flex",
  alignItems: "end",
};

const buttonStyle: CSSProperties = {
  padding: "10px 16px",
  borderRadius: "8px",
  border: "none",
  background: "#111",
  color: "#fff",
  cursor: "pointer",
};

const tableContainerStyle: CSSProperties = {
  background: "#fff",
  borderRadius: "12px",
  overflow: "hidden",
  border: "1px solid #e5e5e5",
};

const thStyle: CSSProperties = {
  textAlign: "left",
  padding: "14px",
  fontSize: "14px",
  borderBottom: "1px solid #e5e5e5",
};

const tdStyle: CSSProperties = {
  padding: "14px",
  borderBottom: "1px solid #f0f0f0",
  fontSize: "14px",
};