import { useEffect, useState } from "react";
import {
  createCustomer,
  getCustomers,
  type Customer,
  type CustomerRequest,
} from "../api/customersApi";

const initialForm: CustomerRequest = {
  fullName: "",
  email: "",
  phone: "",
  address: "",
  active: true,
};

export default function CustomersPage() {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [form, setForm] = useState<CustomerRequest>(initialForm);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [formError, setFormError] = useState("");

  const fetchCustomers = async () => {
    try {
      const data = await getCustomers();
      setCustomers(data);
    } catch (err) {
      setError("No se pudieron cargar los clientes");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCustomers();
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { name, value, type, checked } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError("");

    if (!form.fullName || !form.email) {
      setFormError("Nombre y email son obligatorios");
      return;
    }

    try {
      setSaving(true);
      await createCustomer(form);
      setForm(initialForm);
      await fetchCustomers();
    } catch (err) {
      setFormError("No se pudo crear el cliente");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return <div>Cargando clientes...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div>
      <h1 style={{ marginTop: 0 }}>Clientes</h1>

      <div
        style={{
          marginTop: "20px",
          background: "#fff",
          borderRadius: "12px",
          border: "1px solid #e5e5e5",
          padding: "20px",
          marginBottom: "24px",
        }}
      >
        <h2 style={{ marginTop: 0 }}>Crear cliente</h2>

        <form
          onSubmit={handleSubmit}
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
            gap: "16px",
          }}
        >
          <div>
            <label style={labelStyle}>Nombre completo</label>
            <input
              name="fullName"
              value={form.fullName}
              onChange={handleChange}
              style={inputStyle}
              placeholder="Lucho Ramirez"
            />
          </div>

          <div>
            <label style={labelStyle}>Email</label>
            <input
              name="email"
              value={form.email}
              onChange={handleChange}
              style={inputStyle}
              placeholder="lucho@email.com"
            />
          </div>

          <div>
            <label style={labelStyle}>Teléfono</label>
            <input
              name="phone"
              value={form.phone}
              onChange={handleChange}
              style={inputStyle}
              placeholder="3001234567"
            />
          </div>

          <div>
            <label style={labelStyle}>Dirección</label>
            <input
              name="address"
              value={form.address}
              onChange={handleChange}
              style={inputStyle}
              placeholder="Medellín"
            />
          </div>

          <div
            style={{
              display: "flex",
              alignItems: "end",
              gap: "10px",
            }}
          >
            <label style={{ display: "flex", gap: "8px", alignItems: "center" }}>
              <input
                type="checkbox"
                name="active"
                checked={form.active}
                onChange={handleChange}
              />
              Activo
            </label>
          </div>

          <div
            style={{
              display: "flex",
              alignItems: "end",
            }}
          >
            <button type="submit" style={buttonStyle} disabled={saving}>
              {saving ? "Guardando..." : "Guardar cliente"}
            </button>
          </div>
        </form>

        {formError && (
          <p style={{ color: "crimson", marginTop: "12px", marginBottom: 0 }}>
            {formError}
          </p>
        )}
      </div>

      <div
        style={{
          background: "#fff",
          borderRadius: "12px",
          overflow: "hidden",
          border: "1px solid #e5e5e5",
        }}
      >
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead style={{ background: "#f3f3f3" }}>
            <tr>
              <th style={thStyle}>ID</th>
              <th style={thStyle}>Nombre</th>
              <th style={thStyle}>Email</th>
              <th style={thStyle}>Teléfono</th>
              <th style={thStyle}>Dirección</th>
              <th style={thStyle}>Estado</th>
            </tr>
          </thead>
          <tbody>
            {customers.map((customer) => (
              <tr key={customer.id}>
                <td style={tdStyle}>{customer.id}</td>
                <td style={tdStyle}>{customer.fullName}</td>
                <td style={tdStyle}>{customer.email}</td>
                <td style={tdStyle}>{customer.phone}</td>
                <td style={tdStyle}>{customer.address}</td>
                <td style={tdStyle}>
                  {customer.active ? "Activo" : "Inactivo"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

const labelStyle: React.CSSProperties = {
  display: "block",
  marginBottom: "6px",
  fontSize: "14px",
  color: "#444",
};

const inputStyle: React.CSSProperties = {
  width: "100%",
  padding: "10px 12px",
  borderRadius: "8px",
  border: "1px solid #dcdcdc",
  fontSize: "14px",
  boxSizing: "border-box",
};

const buttonStyle: React.CSSProperties = {
  padding: "10px 16px",
  borderRadius: "8px",
  border: "none",
  background: "#111",
  color: "#fff",
  cursor: "pointer",
};

const thStyle: React.CSSProperties = {
  textAlign: "left",
  padding: "14px",
  fontSize: "14px",
  borderBottom: "1px solid #e5e5e5",
};

const tdStyle: React.CSSProperties = {
  padding: "14px",
  borderBottom: "1px solid #f0f0f0",
  fontSize: "14px",
};