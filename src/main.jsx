import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import Layout from "./Layout.jsx";

import About from "./pages/About.jsx";
import Cart from "./pages/Cart.jsx";
import Contact from "./pages/Contact.jsx"
import Login from "./pages/Login.jsx"
import Product from "./pages/Product.jsx"
import Shop from "./pages/Shop.jsx"
import Verify from "./pages/Verify.jsx"
import AdminLogin from "./pages/AdminLogin.jsx"
import AdminDashboard from "./pages/AdminDashboard.jsx";
import ProductForm from "./pages/ProductForm.jsx"
import Signup from "./pages/Sign-up.jsx"
import EditProduct from "./pages/EditProduct.jsx";
import Setting from "./pages/Setting.jsx";
import VerifyCode from "./pages/VerifyCode.jsx";
import UserAddress from "./pages/UserAddress.jsx"

import { BrowserRouter, Routes, Route } from "react-router-dom";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<App />} />
          <Route path="/about" element={<About />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/verify" element={<VerifyCode />} />
          <Route path="/login" element={<Login />} />
          <Route path="/product" element={<Product />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="/setting" element={<Setting />} />
          <Route path="/add-address" element={<UserAddress />} />
          {/* <Route path="/verify" element={<Verify />} /> */}
          <Route path="/admin-login" element={<AdminLogin />} />
          <Route path="/admin-dashboard" element={<AdminDashboard />} />
          <Route path="/create-product" element={<ProductForm />} />
          <Route path="/edit-product" element={<EditProduct />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  </StrictMode>
);
