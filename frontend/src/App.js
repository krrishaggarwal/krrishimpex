import { BrowserRouter as Router, Routes, Route, useLocation, Navigate } from "react-router-dom";

import NavBar from "./Components/NavBar";
import Footer from "./Components/Footer";
import Home from "./Pages/Home";
import About from "./Pages/AboutUs";
import Products from "./Pages/Products";
import Certifications from "./Pages/Certifications";
import Infrastructure from "./Pages/Infrastructure";
import Contact from "./Pages/ContactUs";
import ScrollToTop from "./Components/ScrollToTop";

import AdminLogin from "./Pages/Admin/AdminLogin";
import ContactsManagement from "./Pages/Admin/ContactsManagement";
import Dashboard from "./Pages/Admin/Dashboard";
import ProductManagement from "./Pages/Admin/ProductManagement";
import QuotationManagement from "./Pages/Admin/QuotationManagement";

import ProtectedRoute from "./Components/ProtectedRoutes";
import SEO from "./Components/SEO";

const withSeo = (page, seo) => (
  <>
    <SEO {...seo} />
    {page}
  </>
);

// ✅ Layout: hides NavBar & Footer on admin pages
const Layout = ({ children }) => {
  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith("/admin");
  return (
    <>
      {!isAdminRoute && <NavBar />}
      {children}
      {!isAdminRoute && <Footer />}
    </>
  );
};


function App() {
  return (
    <Router>
      <ScrollToTop />
      <Layout>
        <Routes>
          {/* Public Pages */}
          <Route
            path="/"
            element={withSeo(<Home />, {
              title: "Eco-Friendly Disposable Cutlery & Tableware Manufacturer",
              description:
                "Krrish Ecoware Industries manufactures and trades eco-friendly disposable cutlery, paper plates, paper cups, wooden spoons, and food-service products from Delhi, India.",
              path: "/",
            })}
          />
          <Route
            path="/home"
            element={<Navigate to="/" replace />}
          />
          <Route path="/Home" element={<Navigate to="/" replace />} />
          <Route
            path="/about"
            element={withSeo(<About />, {
              title: "About Krrish Ecoware Industries",
              description:
                "Learn about Krrish Ecoware Industries, a Delhi-based disposable products manufacturer and trader serving food-service businesses since 2001.",
              path: "/about",
            })}
          />
          <Route
            path="/products"
            element={withSeo(<Products />, {
              title: "Disposable Cutlery, Paper Plates & Food Packaging Products",
              description:
                "Browse Krrish Ecoware Industries products including disposable cutlery, paper plates, wooden spoons, paper cups, foil containers, and food packaging supplies.",
              path: "/products",
            })}
          />
          <Route
            path="/certifications"
            element={withSeo(<Certifications />, {
              title: "Certifications & Quality Assurance",
              description:
                "View Krrish Ecoware Industries certifications, registrations, and quality assurance credentials for reliable disposable tableware supply.",
              path: "/certifications",
            })}
          />
          <Route
            path="/infrastructure"
            element={withSeo(<Infrastructure />, {
              title: "Manufacturing Infrastructure & Production Capacity",
              description:
                "See the manufacturing facility, production capacity, and operational infrastructure behind Krrish Ecoware Industries disposable product supply.",
              path: "/infrastructure",
            })}
          />
          <Route
            path="/contact"
            element={withSeo(<Contact />, {
              title: "Contact Krrish Ecoware Industries",
              description:
                "Contact Krrish Ecoware Industries in Delhi for quotations, wholesale disposable cutlery, paper plates, tableware, and food packaging requirements.",
              path: "/contact",
            })}
          />

          {/* Admin Login */}
          <Route
            path="/admin"
            element={withSeo(<AdminLogin />, {
              title: "Admin Login",
              description: "Private administration area for Krrish Ecoware Industries.",
              path: "/admin",
              noIndex: true,
            })}
          />

          {/* ✅ Protected Admin Layout */}
          <Route
            path="/admin/dashboard"
            element={
              withSeo(
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>,
                {
                  title: "Admin Dashboard",
                  description: "Private administration dashboard for Krrish Ecoware Industries.",
                  path: "/admin/dashboard",
                  noIndex: true,
                }
              )
            }
          >
            {/* 👇 Nested routes */}
            <Route path="products" element={<ProductManagement />} />
            <Route path="contacts" element={<ContactsManagement />} />
            <Route path="quotations" element={<QuotationManagement />} />

            {/* Optional default page */}
            <Route index element={<ProductManagement />} />
          </Route>
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
