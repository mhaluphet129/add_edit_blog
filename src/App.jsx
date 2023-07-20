import AdminNewBlogBody from "./components/forms";
import Blog from "./components/blog";
import { Route, Routes, Navigate } from "react-router-dom";
import "./App.css";

function App() {
  return (
    <>
      <Routes>
        <Route path="/admin" element={<Blog />} />
        <Route path="/admin/new-blog" element={<AdminNewBlogBody />} />
        <Route path="/admin/edit/:id" element={<AdminNewBlogBody />} />
        <Route path="*" element={<Navigate to="/admin" />} />
      </Routes>
    </>
  );
}

export default App;
