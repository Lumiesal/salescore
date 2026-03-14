import { useEffect, useState } from "react";
import type { CSSProperties, ChangeEvent, FormEvent } from "react";
import {
  createUser,
  getUsers,
  type User,
  type UserRequest,
} from "../api/usersApi";

const initialForm: UserRequest = {
  fullName: "",
  email: "",
  password: "",
  role: "SALES",
  active: true,
};

export default function UsersPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [form, setForm] = useState<UserRequest>(initialForm);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [formError, setFormError] = useState("");

  const fetchUsers = async () => {
    try {
      const data = await getUsers();
      setUsers(data);
    } catch (err) {
      setError("No se pudieron cargar los usuarios");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target as HTMLInputElement;

    setForm((prev) => ({
      ...prev,
      [name]:
        type === "checkbox"
          ? (e.target as HTMLInputElement).checked
          : value,
    }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setFormError("");

    if (!form.fullName || !form.email || !form.password) {
      setFormError("Nombre, email y password son obligatorios");
      return;
    }

    try {
      setSaving(true);
      await createUser(form);
      setForm(initialForm);
      await fetchUsers();
    } catch (err) {
      setFormError("No se pudo crear el usuario");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return <div>Cargando usuarios...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div>
      <h1 style={{ marginTop: 0 }}>Usuarios</h1>

      <div style={cardContainerStyle}>
        <h2 style={{ marginTop: 0 }}>Crear usuario</h2>

        <form onSubmit={handleSubmit} style={formGridStyle}>
          <div>
            <label style={labelStyle}>Nombre completo</label>
            <input
              name="fullName"
              value={form.fullName}
              onChange={handleChange}
              style={inputStyle}
              placeholder="Nombre del usuario"
            />
          </div>

          <div>
            <label style={labelStyle}>Email</label>
            <input
              name="email"
              value={form.email}
              onChange={handleChange}
              style={inputStyle}
              placeholder="usuario@email.com"
            />
          </div>

          <div>
            <label style={labelStyle}>Password</label>
            <input
              type="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              style={inputStyle}
              placeholder="********"
            />
          </div>

          <div>
            <label style={labelStyle}>Rol</label>
            <select
              name="role"
              value={form.role}
              onChange={handleChange}
              style={inputStyle}
            >
              <option value="ADMIN">ADMIN</option>
              <option value="MANAGER">MANAGER</option>
              <option value="SALES">SALES</option>
            </select>
          </div>

          <div style={checkboxWrapperStyle}>
            <label style={checkboxLabelStyle}>
              <input
                type="checkbox"
                name="active"
                checked={form.active}
                onChange={handleChange}
              />
              Activo
            </label>
          </div>

          <div style={buttonWrapperStyle}>
            <button type="submit" style={buttonStyle} disabled={saving}>
              {saving ? "Guardando..." : "Guardar usuario"}
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
              <th style={thStyle}>Nombre</th>
              <th style={thStyle}>Email</th>
              <th style={thStyle}>Rol</th>
              <th style={thStyle}>Estado</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id}>
                <td style={tdStyle}>{user.id}</td>
                <td style={tdStyle}>{user.fullName}</td>
                <td style={tdStyle}>{user.email}</td>
                <td style={tdStyle}>{user.role}</td>
                <td style={tdStyle}>{user.active ? "Activo" : "Inactivo"}</td>
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

const checkboxWrapperStyle: CSSProperties = {
  display: "flex",
  alignItems: "end",
};

const checkboxLabelStyle: CSSProperties = {
  display: "flex",
  gap: "8px",
  alignItems: "center",
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