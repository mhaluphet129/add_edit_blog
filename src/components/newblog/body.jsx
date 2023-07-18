import React, { useState } from "react";
import axios from "axios";

import AdminNav from "../../partials/admin_nav";
import SideNav from "../../partials/admin_side_nav";
import MarkDown from "../../partials/markdown";
import Functions from "../../partials/functions";

const AdminNewBlogBody = () => {
  const [formData, setFormData] = useState({
    markdown: null,
    title: null,
    description: null,
    author: null,
    provinceId: null,
    coverPhotoText: null,
    coverPhotoTextBlob: null,
    category: "Tourists Spots",
    publishmentStatus: "draft",
  });
  let missingInput = null;

  const save = () => {
    (async () => {
      if (
        !Object.keys(formData).every((item) => {
          if (
            ["coverPhotoTextBlob", "coverPhotoText"].includes(item) ||
            formData[item] != null
          ) {
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

      for (let items in formData) _formData.append(items, formData[items]);
      const { data } = await axios.post(`${appUrl}/blog/new-blog`, _formData, {
        headers: {
          "Content-Type": `multipart/form-data`,
        },
      });
      if (data.success) {
        Swal.fire({
          title: data.message,
          html: "will be redirected to....",
          timer: 2000,
          timerProgressBar: true,
        }).then((result) => {
          if (result.dismiss === Swal.DismissReason.timer) {
            // redirect here
          }
        });
      }
    })();
  };

  return (
    <>
      <AdminNav save={save} />
      <div
        style={{
          display: "flex",
          background: "#202123",
        }}
      >
        <SideNav />
        <MarkDown
          update={(name, value) =>
            setFormData((e) => {
              return { ...e, [name]: value };
            })
          }
        />
        <Functions
          save={save}
          update={(name, value) =>
            setFormData((e) => {
              return { ...e, [name]: value };
            })
          }
        />
      </div>
    </>
  );
};

export default AdminNewBlogBody;
