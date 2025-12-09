import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import AdminLogin from "./pages/AdminLogin";
import Dashboard from "./pages/Dashboard";
import Vendors from "./pages/Vendors";
import AddVendor from "./pages/AddVendor";
import EditVendor from "./pages/EditVendor";
import Categories from "./pages/Categories";
import Products from "./pages/Products";
import AddProduct from "./pages/AddProduct";
import EditProduct from "./pages/EditProduct";
import Header from "./components/Header";
import AdminRoute from "./components/AdminRoute";
export default function App(){ return (<div><Header/><div className="container"><Routes><Route path="/admin/login" element={<AdminLogin/>}/><Route path="/" element={<Navigate to="/dashboard" replace/>}/><Route path="/dashboard" element={<AdminRoute><Dashboard/></AdminRoute>}/><Route path="/vendors" element={<AdminRoute><Vendors/></AdminRoute>}/><Route path="/vendors/add" element={<AdminRoute><AddVendor/></AdminRoute>}/><Route path="/vendors/edit/:id" element={<AdminRoute><EditVendor/></AdminRoute>}/><Route path="/categories" element={<AdminRoute><Categories/></AdminRoute>}/><Route path="/products" element={<AdminRoute><Products/></AdminRoute>}/><Route path="/products/add" element={<AdminRoute><AddProduct/></AdminRoute>}/><Route path="/products/edit/:id" element={<AdminRoute><EditProduct/></AdminRoute>}/></Routes></div></div>); }