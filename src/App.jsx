import AdminNewBlogBody from "./components/newblog/body";
import { Route, Routes, Navigate } from "react-router-dom";
import "./App.css";

function App() {
  return (
    <>
      <Routes>
        <Route path="/admin/new-blog" element={<AdminNewBlogBody />} />
        <Route path="/admin/edit/:id" element={<AdminNewBlogBody />} />
        <Route path="*" element={<Navigate to="/admin/new-blog" />} />
      </Routes>
    </>
  );
}

export default App;
