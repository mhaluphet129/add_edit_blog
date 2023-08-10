import React from "react";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import logoUrl from "../assets/imgs/logos/visitour.png";

const AdminNav = ({ extra }) => {
  const navigate = useNavigate();
  return (
    <>
      <div style={{ width: "100vw" }}>
        <nav
          style={{
            padding: "1rem",
            backgroundColor: "#222",
            borderBottom: "#525252 solid 1px",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            height: 50,
          }}
        >
          <a
            style={{
              display: "flex",
              alignItems: "center",
              fontSize: "2rem",
              color: "#fff",
            }}
            className="blogs-logo"
            href="/blogs"
            target=""
            rel="noopener noreferrer"
          >
            <img height="40" src={logoUrl} alt="" />
            Visitour
            <span
              style={{
                fontSize: "1.5rem",
                margin: ".5rem .5rem 0",
                fontWeight: 300,
              }}
            >
              BLOGS admin
            </span>
          </a>

          <ul
            className="nav-links"
            style={{
              display: "flex",
              alignItems: "center",
            }}
          >
            {extra}
            <li>
              <a
                className="nav-link text-white logout-btn"
                href="#"
                onClick={() => {
                  Swal.fire({
                    title: "Are you sure you want to logout ?",
                    showCancelButton: true,
                    showConfirmButton: false,
                    showDenyButton: true,
                    denyButtonText: "Logout",
                  }).then((result) => {
                    if (result.isDenied) {
                      Cookies.remove("user");
                      navigate("/admin/login");
                    }
                  });
                }}
              >
                LOGOUT <i class="fa-solid fa-arrow-right-from-bracket"></i>
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </>
  );
};

export default AdminNav;
