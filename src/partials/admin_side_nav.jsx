import React from "react";
import { useNavigate } from "react-router-dom";

const SideNav = ({ index, setIndex }) => {
  const navigate = useNavigate();
  return (
    <div className="blogs-admin-side-nav">
      <a
        href="#"
        className="fnc-btn publish"
        onClick={() => navigate("/admin/new-blog")}
      >
        <i class="fa-solid fa-file-circle-plus"></i> New Blog
      </a>

      {[
        { label: "Published", icon: "fa-regular fa-newspaper" },
        { label: "Draft", icon: "fa-regular fa-edit" },
      ].map((e, i) => (
        <p
          className={`blogs-admin-side-nav-btn ${i == index ? "active" : ""}`}
          onClick={() => setIndex(i)}
          style={{
            cursor: "pointer",
          }}
        >
          <i className={e.icon}></i> {e.label}
        </p>
      ))}
    </div>
  );
};

export default SideNav;
