// frontend/src/components/admin/ProductManagement.jsx
import React, { useState, useEffect } from "react";
import "../../styles/ProductManagement.css";
import { adminFetch, getAssetUrl } from "../../utils/api";

const ProductManagement = () => {
  const [products, setProducts] = useState([]);
  const [newProduct, setNewProduct] = useState({
    name: "",
    description: "",
    category: "",
    sizes: "",
    material: "", // ✅ ADD THIS
    image: null,
  });
  const [editingProduct, setEditingProduct] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  // Fetch products from backend
  const fetchProducts = async () => {
    setIsLoading(true);
    setError("");
    try {
      const res = await adminFetch("/api/admin/products");
      const data = await res.json();
      if (data.success) {
        setProducts(data.products);
      } else {
        setError("Failed to fetch products");
      }
    } catch (err) {
      setError("Error connecting to server");
      console.error("Fetch products error:", err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "image") {
      setNewProduct({ ...newProduct, image: files[0] });
    } else {
      setNewProduct({ ...newProduct, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    const formData = new FormData();
    formData.append("name", newProduct.name);
    formData.append("description", newProduct.description);
    formData.append("material", newProduct.material);
    formData.append("category", newProduct.category);
    formData.append("sizes", newProduct.sizes);
    if (newProduct.image) formData.append("image", newProduct.image);

    try {
      if (editingProduct) {
        // update
        const res = await adminFetch(
          `/api/admin/products/${editingProduct.id}`,
          { method: "PUT", body: formData }
        );
        const updated = await res.json();
        if (updated.success) {
          setProducts(
            products.map((p) =>
              p.id === updated.product.id ? updated.product : p
            )
          );
          setEditingProduct(null);
        } else {
          setError("Failed to update product");
        }
      } else {
        // add
        const res = await adminFetch("/api/admin/products", {
          method: "POST",
          body: formData,
        });
        const saved = await res.json();
        if (saved.success) {
          setProducts([...products, saved.product]);
        } else {
          setError("Failed to add product");
        }
      }

      setNewProduct({
        name: "",
        description: "",
        material: "",
        category: "",
        sizes: "",
        image: null,
      });
    } catch (err) {
      setError("Error saving product");
      console.error("Save product error:", err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this product?")) return;
    setIsLoading(true);
    setError("");
    try {
      const res = await adminFetch(`/api/admin/products/${id}`, { method: "DELETE" });
      const deleted = await res.json();
      if (deleted.success) {
        setProducts(products.filter((p) => p.id !== id));
      } else {
        setError("Failed to delete product");
      }
    } catch (err) {
      setError("Error deleting product");
      console.error("Delete product error:", err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleEdit = (product) => {
    setEditingProduct(product);
    setNewProduct({
      ...product,
      sizes: Array.isArray(product.sizes) ? product.sizes.join(", ") : product.sizes || "",
       material: product.material || "",
      image: null,
    });
  };

  const handleCancelEdit = () => {
    setEditingProduct(null);
    setNewProduct({
      name: "",
      description: "",
      material: "",
      category: "",
      sizes: "",
      image: null,
    });
  };

  return (
    <div className="pm-container">
      <h2 className="pm-title">Product Management</h2>

      {error && (
        <div className="pm-error">
          {error}
          <button onClick={() => setError("")} className="pm-error-close">×</button>
        </div>
      )}

      {/* Form */}
      <form onSubmit={handleSubmit} className="pm-form">
        <input type="text" name="name" placeholder="Product Name" value={newProduct.name} onChange={handleChange} className="pm-input" required />
        <textarea name="description" placeholder="Description" value={newProduct.description} onChange={handleChange} className="pm-input" rows="3" />
        <input
          type="text"
          name="material"
          placeholder="Material (e.g. Steel, Plastic)"
          value={newProduct.material}
          onChange={handleChange}
          className="pm-input"
        />
        <input type="text" name="category" placeholder="Category" value={newProduct.category} onChange={handleChange} className="pm-input" />
        <input type="text" name="sizes" placeholder="Sizes (comma separated: S, M, L)" value={newProduct.sizes} onChange={handleChange} className="pm-input" />
        <div className="pm-file-input-container">
          <label className="pm-file-label">
            {newProduct.image ? newProduct.image.name : "Choose Image"}
            <input type="file" name="image" onChange={handleChange} className="pm-file-input" accept="image/*" />
          </label>
        </div>

        <div className="pm-form-actions">
          <button type="submit" className={`pm-btn ${editingProduct ? 'pm-btn-yellow' : 'pm-btn-green'}`} disabled={isLoading}>
            {isLoading ? "Processing..." : (editingProduct ? "Update" : "Add")} Product
          </button>
          {editingProduct && (
            <button type="button" onClick={handleCancelEdit} className="pm-btn pm-btn-gray" disabled={isLoading}>
              Cancel
            </button>
          )}
        </div>
      </form>

      {/* Products List */}
      <h3>Products List</h3>
      {isLoading && !products.length ? (
        <div className="pm-loading">Loading products...</div>
      ) : products.length === 0 ? (
        <div className="pm-empty">No products found</div>
      ) : (
        <div className="pm-table-container">
          <table className="pm-table">
            <thead>
              <tr>
                <th>Image</th>
                <th>Name</th>
                <th>Material</th>
                <th>Category</th>
                <th>Sizes</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {products.map((p) => (
                <tr key={p.id}>
                  <td>
                    {p.image && <img src={getAssetUrl(p.image)} alt={p.name} className="pm-img" />}
                  </td>
                  <td>
                    <div className="pm-product-name">{p.name}</div>
                    <div className="pm-product-desc">{p.description}</div>
                  </td>
                  <td>{p.material || "N/A"}</td>
                  <td>{p.category}</td>
                  <td>{Array.isArray(p.sizes) ? p.sizes.join(", ") : p.sizes || "N/A"}</td>
                  <td>
                    <div className="pm-actions">
                      <button onClick={() => handleEdit(p)} className="pm-btn pm-btn-yellow" disabled={isLoading}>Edit</button>
                      <button onClick={() => handleDelete(p.id)} className="pm-btn pm-btn-red" disabled={isLoading}>Delete</button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default ProductManagement;
