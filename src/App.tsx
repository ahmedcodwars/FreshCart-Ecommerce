import React from "react";

import { Route, Routes } from "react-router-dom"
import Home from "./Pages/Home"
import Categories from "./Pages/Categories"
import Products from "./Pages/Products"
import Brands from "./Pages/Brands"
import ProductDetails from "./Pages/ProductDetails"
import Cart from "./Pages/Cart"
import SignIn from "./Pages/Auth/SignIn"
import ForgetPassword from "./Pages/Auth/ForgetPassword"
import Register from "./Pages/Auth/Register"
import ResetCode from "./Pages/Auth/ResetCode"
import MainLayout from "./Components/MainLayout/MainLayout"
import AuthLayout from "./Components/AuthLayout/AuthLayout"
import { Toaster } from "react-hot-toast"
import ResetPassword from "./Pages/Auth/ResetPassword"
import Wishlist from "./Pages/Wishlist"
import CategoryDetails from "./Pages/CategoryDetails"
import BrandDetails from "./Pages/BrandDetails";

function App() {
  return (
    <>
      <Routes>
        <Route path="/auth" element={<AuthLayout />}>
          <Route path="sign-in" element={<SignIn />} />
          <Route path="register" element={<Register />} />
          <Route path="forget-password" element={<ForgetPassword />} />
          <Route path="reset-code" element={<ResetCode />} />
          <Route path="reset-password" element={<ResetPassword />} />
        </Route>

        <Route element={<MainLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<Products />} />
          <Route path="product/:id" element={<ProductDetails />} />
          <Route path="/categories" element={<Categories />} />
          <Route path="category/:id" element={<CategoryDetails />} />
          <Route path="/brands" element={<Brands />} />
          <Route path="brand/:id" element={<BrandDetails />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/wishlist" element={<Wishlist />} />
        </Route>
      </Routes>

      <Toaster
        position="top-right"
        toastOptions={{
          success: {
            style: { background: "green", color: "#fff" },
          },
          error: {
            style: { background: "red", color: "#fff" },
          },
        }}
      />
    </>
  )
}

export default App
