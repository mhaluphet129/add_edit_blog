import React from "react";
import { Route, Routes, Navigate } from "react-router-dom";

import AdminNewBlogBody from "./components/forms";
import Blog from "./components/blog";
import Login from "./components/login";
import "./App.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
      
      <Routes>
        <Route path="/admin" element={<Blog />} />
        <Route path="/admin/login" element={<Login />} />
        <Route path="/admin/new-blog" element={<AdminNewBlogBody />} />
        <Route path="/admin/edit/:id" element={<AdminNewBlogBody />} />
        <Route path="*" element={<Navigate to="/admin" />} />
      </Routes>
    </>
  );
}

export default App;
