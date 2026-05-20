import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import BackToTop from "../Components/BackToTop";
import QuotationForm from "../Components/QuotationForm";
import { apiUrl, getAssetUrl } from "../utils/api";
import "../styles/Products.css";

const parseSizes = (sizes) => {
  if (!sizes) return [];
  if (Array.isArray(sizes)) return sizes;
  if (typeof sizes === "string") {
    const trimmed = sizes.trim();
    if (trimmed.startsWith("[")) {
      try {
        return JSON.parse(trimmed);
      } catch (e) { }
    }
    return trimmed.split(",").map((s) => s.trim()).filter(Boolean);
  }
  return [];
};

const Products = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const queryParams = new URLSearchParams(location.search);
  const defaultCategory = queryParams.get("category") || "all";

  const [productsData, setProductsData] = useState({});
  const [activeCategory, setActiveCategory] = useState(defaultCategory);
  const [loading, setLoading] = useState(true);

  // NEW STATES
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [showQuoteForm, setShowQuoteForm] = useState(false);

  useEffect(() => {
    async function loadProducts() {
      try {
        const response = await fetch(
          apiUrl("/api/products")
        );
        if (!response.ok) throw new Error("Failed to load products");

        const { products } = await response.json();

        const grouped = (products || []).reduce((acc, product) => {
          const category = product.category?.trim() || "Uncategorized";
          if (!acc[category]) acc[category] = [];
          acc[category].push(product);
          return acc;
        }, {});

        setProductsData(grouped);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    loadProducts();
  }, []);

  useEffect(() => {
    const param = new URLSearchParams(location.search).get("category");
    setActiveCategory(param || "all");
  }, [location.search]);

  const handleImageError = (e) => {
    if (!e.target.src.includes("no-image.png")) {
      e.target.src = "/images/no-image.png";
    }
  };

  const categories = Object.keys(productsData);

  const filteredProducts =
    activeCategory === "all"
      ? Object.values(productsData).flat()
      : productsData[activeCategory] || [];

  if (loading) {
    return (
      <div className="loading">
        <div className="spinner"></div>
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <div className="products-page">
      {/* CATEGORY TABS */}
      <section className="category-tabs">
        <div className="tabs-container">
          <button
            className={`category-tab ${activeCategory === "all" ? "active" : ""}`}
            onClick={() => navigate("/products?category=all")}
          >
            All
          </button>

          {categories.map((cat) => (
            <button
              key={cat}
              className={`category-tab ${activeCategory === cat ? "active" : ""
                }`}
              onClick={() => navigate(`/products?category=${cat}`)}
            >
              {cat}
            </button>
          ))}
        </div>
      </section>

      {/* PRODUCTS */}
      <section className="product-category">
        <div className="container">
          <h1 className="category-title">
            {activeCategory === "all" ? "All Products" : activeCategory}
          </h1>
          <div className="product-header">
            <p className="product-note-warning">
              Note: Packing and rates may vary. Please request a quotation.
            </p>
          </div>

          <div className="product-grid">
            {filteredProducts.map((product) => (
              <div key={product.id} className="product-card">
                <div className="product-image">
                  <img
                    src={getAssetUrl(product.image)}
                    alt={product.name}
                    onError={handleImageError}
                    loading="lazy"
                  />
                </div>

                <div className="product-info">
                  <h3>{product.name}</h3>

                  <div className="product-actions">
                    <button
                      className="view-btn"
                      onClick={() => setSelectedProduct(product)}
                    >
                      View Details
                    </button>

                    <button
                      className="quote-btn"
                      onClick={() => {
                        setSelectedProduct(product);
                        setShowQuoteForm(true);
                      }}
                    >
                      Get Quotation
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* DETAILS MODAL */}
      {selectedProduct && !showQuoteForm && (
        <div className="modal-overlay">
          <div className="modal">

            {/* Left — image */}
            <div className="img-col">
              <img src={getAssetUrl(selectedProduct.image)} alt={selectedProduct.name} />
            </div>

            {/* Right — info */}
            <div className="info-col">
              <button className="close-btn" onClick={() => setSelectedProduct(null)}>&times;</button>

              <h2 className="product-name">{selectedProduct.name}</h2>
              <div className="divider" />

              <p className="desc">
                {selectedProduct.description || "No description available."}
              </p>

              {selectedProduct.sizes && (
                <>
                  <p className="spec-label">Available Sizes</p>
                  <div className="sizes">
                    {parseSizes(selectedProduct.sizes).map((size, i) => (
                      <span key={i} className="size-tag">{size}</span>
                    ))}
                  </div>
                </>
              )}

              {selectedProduct.material && (
                <>
                  <p className="spec-label">Material</p>
                  <p className="material">{selectedProduct.material}</p>
                </>
              )}

              <div className="cta">
                <button className="btn-primary" onClick={() => setShowQuoteForm(true)}>
                  Request a Quote
                </button>
              </div>
            </div>

          </div>
        </div>
      )}

      {/* QUOTATION FORM */}
      {showQuoteForm && selectedProduct && (
        <QuotationForm
          productName={selectedProduct.name}
          productImage={getAssetUrl(selectedProduct.image)}
          onClose={() => {
            setShowQuoteForm(false);
            setSelectedProduct(null);
          }}
        />
      )}

      <BackToTop />
    </div>
  );
};

export default Products;
