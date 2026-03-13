import { useEffect, useState } from "react";
import type { ChangeEvent, CSSProperties, FormEvent } from "react";
import {
  createProduct,
  getProducts,
  type Product,
  type ProductRequest,
} from "../api/productsApi";
import { getCategories, type Category } from "../api/categoriesApi";

const initialForm: ProductRequest = {
  name: "",
  sku: "",
  description: "",
  price: 0,
  stock: 0,
  minStock: 0,
  active: true,
  categoryId: 0,
};

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [form, setForm] = useState<ProductRequest>(initialForm);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [formError, setFormError] = useState("");

  const fetchData = async () => {
    try {
      const [productsData, categoriesData] = await Promise.all([
        getProducts(),
        getCategories(),
      ]);

      const activeCategories = categoriesData.filter((cat) => cat.active);

      setProducts(productsData);
      setCategories(activeCategories);

      if (activeCategories.length > 0) {
        setForm((prev) => ({
          ...prev,
          categoryId: prev.categoryId || activeCategories[0].id,
        }));
      }
    } catch (err) {
      setError("No se pudieron cargar los productos o categorías");
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
        type === "number"
          ? Number(value)
          : name === "categoryId"
          ? Number(value)
          : value,
    }));
  };

  const handleCheckboxChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: checked,
    }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setFormError("");

    if (!form.name || !form.sku || !form.categoryId) {
      setFormError("Nombre, SKU y categoría son obligatorios");
      return;
    }

    if (form.price <= 0) {
      setFormError("El precio debe ser mayor que cero");
      return;
    }

    try {
      setSaving(true);
      await createProduct(form);

      const firstCategoryId = categories.length > 0 ? categories[0].id : 0;

      setForm({
        ...initialForm,
        categoryId: firstCategoryId,
      });

      await fetchData();
    } catch (err) {
      setFormError("No se pudo crear el producto");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return <div>Cargando productos...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div>
      <h1 style={{ marginTop: 0 }}>Productos</h1>

      <div style={cardContainerStyle}>
        <h2 style={{ marginTop: 0 }}>Crear producto</h2>

        <form onSubmit={handleSubmit} style={formGridStyle}>
          <div>
            <label style={labelStyle}>Nombre</label>
            <input
              name="name"
              value={form.name}
              onChange={handleChange}
              style={inputStyle}
              placeholder="Camiseta oversize"
            />
          </div>

          <div>
            <label style={labelStyle}>SKU</label>
            <input
              name="sku"
              value={form.sku}
              onChange={handleChange}
              style={inputStyle}
              placeholder="CAM-003"
            />
          </div>

          <div>
            <label style={labelStyle}>Descripción</label>
            <input
              name="description"
              value={form.description}
              onChange={handleChange}
              style={inputStyle}
              placeholder="Camiseta negra premium"
            />
          </div>

          <div>
            <label style={labelStyle}>Precio</label>
            <input
              name="price"
              type="number"
              value={form.price}
              onChange={handleChange}
              style={inputStyle}
            />
          </div>

          <div>
            <label style={labelStyle}>Stock inicial</label>
            <input
              name="stock"
              type="number"
              value={form.stock}
              onChange={handleChange}
              style={inputStyle}
            />
          </div>

          <div>
            <label style={labelStyle}>Stock mínimo</label>
            <input
              name="minStock"
              type="number"
              value={form.minStock}
              onChange={handleChange}
              style={inputStyle}
            />
          </div>

          <div>
            <label style={labelStyle}>Categoría</label>
            <select
              name="categoryId"
              value={form.categoryId}
              onChange={handleChange}
              style={inputStyle}
            >
              {categories.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </select>
          </div>

          <div style={checkboxWrapperStyle}>
            <label style={checkboxLabelStyle}>
              <input
                type="checkbox"
                name="active"
                checked={form.active}
                onChange={handleCheckboxChange}
              />
              Activo
            </label>
          </div>

          <div style={buttonWrapperStyle}>
            <button type="submit" style={buttonStyle} disabled={saving}>
              {saving ? "Guardando..." : "Guardar producto"}
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
              <th style={thStyle}>SKU</th>
              <th style={thStyle}>Precio</th>
              <th style={thStyle}>Stock</th>
              <th style={thStyle}>Mínimo</th>
              <th style={thStyle}>Estado</th>
              <th style={thStyle}>Categoría</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product.id}>
                <td style={tdStyle}>{product.id}</td>
                <td style={tdStyle}>{product.name}</td>
                <td style={tdStyle}>{product.sku}</td>
                <td style={tdStyle}>
                  $ {product.price.toLocaleString("es-CO")}
                </td>
                <td style={tdStyle}>{product.stock}</td>
                <td style={tdStyle}>{product.minStock}</td>
                <td style={tdStyle}>
                  {product.active ? "Activo" : "Inactivo"}
                </td>
                <td style={tdStyle}>{product.category.name}</td>
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
  gap: "10px",
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