import React from "react";
import logoUrl from "../assets/imgs/logos/visitour.png";

const AdminNav = ({ save }) => {
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
            <li>
              <a className="nav-link text-white" href="/">
                Home
              </a>
            </li>
            <li onClick={save}>
              <a className="nav-link text-white primary-btn" href="#">
                Save
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </>
  );
};

export default AdminNav;
