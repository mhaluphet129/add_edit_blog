import React, { useState, useRef, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

import AdminNav from "../partials/admin_nav";
import SideNav from "../partials/admin_side_nav";
import MarkDown from "../partials/markdown";
import Functions from "../partials/functions";
import { toast } from "react-toastify";

const AdminNewBlogBody = () => {
  // const [formData, setFormData] = useState({
  //   markdown: "",
  //   title: "",
  //   description: "",
  //   author: "",
  //   provinceId: "",
  //   coverPhotoText: "",
  //   coverPhotoTextBlob: "",
  //   category: "Tourists Spots",
  //   publishmentStatus: "draft",
  //   date: "",
  // });

  const [blog, setBlog] = useState({});
  const [originalBlog, setOriginalBlog] = useState({});
  let missingInput = null;
  const mdRef = useRef();
  let params = useParams();

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
        toast(
          <p>
            Good job! 👌 <br /> You will be redirected to blog list
          </p>,
          {
            position: "top-center",
            closeButton: false,
            toastId: "0r3x",
            autoClose: 2600
          }
        );

        setTimeout(() => {
          toast.dismiss("0r3x");
          window.location.replace("/admin");
        }, 3000);
        // Swal.fire({
        //   title: data.message,
        //   html: "will be redirected to blog list",
        //   timer: 1500,
        //   timerProgressBar: true,
        // }).then((result) => {
        //   if (result.dismiss === Swal.DismissReason.timer)
        //     window.location.replace("/admin");
        // });
      }
    })();
  };

  useEffect(() => {
    (async () => {
      if (params?.id != null || params?.id != undefined) {
        document.title = "Visitour Blogs | Edit Blog";
        let { data } = await axios.get(`${appUrl}/blog/get-blogs-with-filter`, {
          params: {
            _id: params.id,
          },
        });

        if (data.success) {
          setBlog(data.blog[0]);
          // setFormData(data.blog[0]);
          setOriginalBlog(data.blog[0]);
          mdRef.current = data.blog[0].markdown;
        } else
          Swal.fire({
            title: "Status Code: 500",
            text: `Error in the server`,
            icon: "error",
            confirmButtonText: "Confirm",
          });
      } else document.title = "Visitour Blogs | New Blog";
    })();
  }, []);

  return (
    <>
      <AdminNav
        extra={
          <>
            <li>
              <a className="nav-link text-white" href="/admin">
                Home
              </a>
            </li>
            <li onClick={save}>
              <a className="nav-link text-white primary-btn" href="#">
                Save
              </a>
            </li>
          </>
        }
      />
      <div
        style={{
          display: "flex",
          background: "#202123",
        }}
      >
        <SideNav />
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
