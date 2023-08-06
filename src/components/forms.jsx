import React, { useState, useRef, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import axios from "axios";

import AdminNav from "../partials/admin_nav";
import MarkDown from "../partials/markdown";
import Functions from "../partials/functions";

const AdminNewBlogBody = () => {
  const [blog, setBlog] = useState({});
  let missingInput = null;
  const mdRef = useRef();
  let params = useParams();
  let navigate = useNavigate();

  const save = () => {
    (async () => {
      if (
        !Object.keys(blog).every((item) => {
          if (
            ["coverPhotoTextBlob", "coverPhotoText", "date", "__v"].includes(
              item
            ) ||
            blog[item] != ""
          ) {
            if (item == "date") blog.date = new Date(blog.date) ?? new Date();
            missingInput = null;
            return true;
          } else missingInput = item;
          return false;
        })
      ) {
        Swal.fire({
          title: "Missing Input",
          text: `Please provide a valid input in: ${missingInput}`,
          icon: "warning",
          confirmButtonText: "Confirm",
        });
        return;
      }

      let _formData = new FormData();
      for (let items in blog)
        _formData.append(
          items,
          typeof blog[items] == "object" &&
            !["date", "coverPhotoTextBlob"].includes(items)
            ? JSON.stringify(blog[items])
            : blog[items]
        );

      const { data } = await axios.post(`${appUrl}/blog/new-blog`, _formData, {
        headers: {
          "Content-Type": `multipart/form-data`,
        },
      });

      if (data.success) {
        Swal.fire({
          title: data.message,
          html: "will be redirected to blog list",
          timer: 1500,
          timerProgressBar: true,
        }).then((result) => {
          if (result.dismiss === Swal.DismissReason.timer || result.isConfirmed)
            navigate("/admin");
        });
      }
    })();
  };

  useEffect(() => {
    const user = JSON.parse(Cookies.get("user") ?? `{}`);
    if (Object.keys(user).length == 0) navigate("/admin/login");
    (async () => {
      if (params?.id != null || params?.id != undefined) {
        document.title = "Visitour Blogs | Edit Blog";
        let { data } = await axios.get(`${appUrl}/blog/get-blogs-with-filter`, {
          params: {
            _id: params.id,
          },
        });
        if (data.success) {
          if (data.blog?.length == 0) navigate("/admin");
          setBlog(data.blog[0]);
          mdRef.current.value = data.blog[0].markdown;
        } else
          Swal.fire({
            title: "Status Code: 404",
            text: "Link is invalid",
            icon: "error",
            confirmButtonText: "Confirm",
          });
      } else document.title = "Visitour Blogs | New Blog";
    })();
  }, []);

  return (
    <>
      <AdminNav />
      <div
        style={{
          display: "flex",
          background: "#202123",
        }}
      >
        <div className="blogs-admin-side-nav"></div>
        <MarkDown
          update={(name, value) =>
            setBlog((e) => {
              return { ...e, [name]: value };
            })
          }
          innerRef={mdRef}
          status={blog?.publishmentStatus?.toLowerCase()}
        />
        <Functions
          save={save}
          blog={blog}
          id={params?.id ?? null}
          update={(name, value) =>
            setBlog((e) => {
              return { ...e, [name]: value };
            })
          }
        />
      </div>
    </>
  );
};

export default AdminNewBlogBody;
