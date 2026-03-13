import { useEffect, useMemo, useState } from "react";
import type { CSSProperties, ChangeEvent, FormEvent } from "react";
import { getCustomers, type Customer } from "../api/customersApi";
import { getProducts, type Product } from "../api/productsApi";
import { createSale, getSales, type Sale } from "../api/salesApi";

type SaleFormItem = {
  productId: number;
  quantity: number;
};

export default function SalesPage() {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [sales, setSales] = useState<Sale[]>([]);

  const [customerId, setCustomerId] = useState<number>(0);
  const [selectedProductId, setSelectedProductId] = useState<number>(0);
  const [quantity, setQuantity] = useState<number>(1);
  const [items, setItems] = useState<SaleFormItem[]>([]);

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [formError, setFormError] = useState("");

  const fetchData = async () => {
    try {
      const [customersData, productsData, salesData] = await Promise.all([
        getCustomers(),
        getProducts(),
        getSales(),
      ]);

      const activeCustomers = customersData.filter((customer) => customer.active);
      const activeProducts = productsData.filter((product) => product.active);

      setCustomers(activeCustomers);
      setProducts(activeProducts);
      setSales(salesData);

      if (activeCustomers.length > 0) {
        setCustomerId((prev) => prev || activeCustomers[0].id);
      }

      if (activeProducts.length > 0) {
        setSelectedProductId((prev) => prev || activeProducts[0].id);
      }
    } catch (err) {
      setError("No se pudieron cargar los datos de ventas");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const selectedProduct = useMemo(
    () => products.find((product) => product.id === selectedProductId),
    [products, selectedProductId]
  );

  const currentTotal = useMemo(() => {
    return items.reduce((acc, item) => {
      const product = products.find((p) => p.id === item.productId);
      if (!product) return acc;
      return acc + product.price * item.quantity;
    }, 0);
  }, [items, products]);

  const handleAddItem = () => {
    setFormError("");

    if (!selectedProductId) {
      setFormError("Debes seleccionar un producto");
      return;
    }

    if (quantity <= 0) {
      setFormError("La cantidad debe ser mayor que cero");
      return;
    }

    if (!selectedProduct) {
      setFormError("Producto inválido");
      return;
    }

    if (quantity > selectedProduct.stock) {
      setFormError("La cantidad supera el stock disponible");
      return;
    }

    const existing = items.find((item) => item.productId === selectedProductId);

    if (existing) {
      const newQuantity = existing.quantity + quantity;

      if (newQuantity > selectedProduct.stock) {
        setFormError("La suma de cantidades supera el stock disponible");
        return;
      }

      setItems((prev) =>
        prev.map((item) =>
          item.productId === selectedProductId
            ? { ...item, quantity: newQuantity }
            : item
        )
      );
    } else {
      setItems((prev) => [
        ...prev,
        {
          productId: selectedProductId,
          quantity,
        },
      ]);
    }

    setQuantity(1);
  };

  const handleRemoveItem = (productId: number) => {
    setItems((prev) => prev.filter((item) => item.productId !== productId));
  };

  const handleSubmitSale = async (e: FormEvent) => {
    e.preventDefault();
    setFormError("");

    if (!customerId) {
      setFormError("Debes seleccionar un cliente");
      return;
    }

    if (items.length === 0) {
      setFormError("La venta debe tener al menos un item");
      return;
    }

    try {
      setSaving(true);

      await createSale({
        customerId,
        items,
      });

      setItems([]);
      await fetchData();
    } catch (err) {
      setFormError("No se pudo registrar la venta");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return <div>Cargando ventas...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div>
      <h1 style={{ marginTop: 0 }}>Ventas</h1>

      <div style={cardContainerStyle}>
        <h2 style={{ marginTop: 0 }}>Registrar venta</h2>

        <form onSubmit={handleSubmitSale}>
          <div style={formGridStyle}>
            <div>
              <label style={labelStyle}>Cliente</label>
              <select
                value={customerId}
                onChange={(e: ChangeEvent<HTMLSelectElement>) =>
                  setCustomerId(Number(e.target.value))
                }
                style={inputStyle}
              >
                {customers.map((customer) => (
                  <option key={customer.id} value={customer.id}>
                    {customer.fullName}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label style={labelStyle}>Producto</label>
              <select
                value={selectedProductId}
                onChange={(e: ChangeEvent<HTMLSelectElement>) =>
                  setSelectedProductId(Number(e.target.value))
                }
                style={inputStyle}
              >
                {products.map((product) => (
                  <option key={product.id} value={product.id}>
                    {product.name} — stock: {product.stock}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label style={labelStyle}>Cantidad</label>
              <input
                type="number"
                min={1}
                value={quantity}
                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                  setQuantity(Number(e.target.value))
                }
                style={inputStyle}
              />
            </div>

            <div style={buttonWrapperStyle}>
              <button
                type="button"
                style={secondaryButtonStyle}
                onClick={handleAddItem}
              >
                Agregar item
              </button>
            </div>
          </div>

          <div style={{ marginTop: "20px" }}>
            <h3 style={{ marginBottom: "12px" }}>Items de la venta</h3>

            {items.length === 0 ? (
              <p style={{ color: "#666" }}>No hay items agregados.</p>
            ) : (
              <div style={tableContainerStyle}>
                <table style={{ width: "100%", borderCollapse: "collapse" }}>
                  <thead style={{ background: "#f3f3f3" }}>
                    <tr>
                      <th style={thStyle}>Producto</th>
                      <th style={thStyle}>Cantidad</th>
                      <th style={thStyle}>Precio</th>
                      <th style={thStyle}>Subtotal</th>
                      <th style={thStyle}>Acción</th>
                    </tr>
                  </thead>
                  <tbody>
                    {items.map((item) => {
                      const product = products.find((p) => p.id === item.productId);
                      if (!product) return null;

                      const subtotal = product.price * item.quantity;

                      return (
                        <tr key={item.productId}>
                          <td style={tdStyle}>{product.name}</td>
                          <td style={tdStyle}>{item.quantity}</td>
                          <td style={tdStyle}>
                            $ {product.price.toLocaleString("es-CO")}
                          </td>
                          <td style={tdStyle}>
                            $ {subtotal.toLocaleString("es-CO")}
                          </td>
                          <td style={tdStyle}>
                            <button
                              type="button"
                              style={dangerButtonStyle}
                              onClick={() => handleRemoveItem(item.productId)}
                            >
                              Quitar
                            </button>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            )}
          </div>

          <div style={{ marginTop: "16px" }}>
            <strong>Total actual: $ {currentTotal.toLocaleString("es-CO")}</strong>
          </div>

          <div style={{ marginTop: "16px" }}>
            <button type="submit" style={buttonStyle} disabled={saving}>
              {saving ? "Guardando venta..." : "Registrar venta"}
            </button>
          </div>

          {formError && (
            <p style={{ color: "crimson", marginTop: "12px", marginBottom: 0 }}>
              {formError}
            </p>
          )}
        </form>
      </div>

      <div style={tableContainerStyle}>
        <div style={{ padding: "16px 16px 0 16px" }}>
          <h2 style={{ margin: 0 }}>Historial de ventas</h2>
        </div>

        <table style={{ width: "100%", borderCollapse: "collapse", marginTop: "16px" }}>
          <thead style={{ background: "#f3f3f3" }}>
            <tr>
              <th style={thStyle}>ID</th>
              <th style={thStyle}>Cliente</th>
              <th style={thStyle}>Total</th>
              <th style={thStyle}>Estado</th>
              <th style={thStyle}>Fecha</th>
              <th style={thStyle}>Items</th>
            </tr>
          </thead>
          <tbody>
            {sales.map((sale) => (
              <tr key={sale.id}>
                <td style={tdStyle}>{sale.id}</td>
                <td style={tdStyle}>{sale.customerName ?? "Sin cliente"}</td>
                <td style={tdStyle}>
                  $ {sale.total.toLocaleString("es-CO")}
                </td>
                <td style={tdStyle}>{sale.status}</td>
                <td style={tdStyle}>
                  {new Date(sale.createdAt).toLocaleString("es-CO")}
                </td>
                <td style={tdStyle}>{sale.items.length}</td>
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

const secondaryButtonStyle: CSSProperties = {
  padding: "10px 16px",
  borderRadius: "8px",
  border: "1px solid #111",
  background: "#fff",
  color: "#111",
  cursor: "pointer",
};

const dangerButtonStyle: CSSProperties = {
  padding: "8px 12px",
  borderRadius: "8px",
  border: "none",
  background: "crimson",
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