import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import axios from "axios";
import Cookies from "js-cookie";

import AdminNav from "../partials/admin_nav";
import AdminSideNav from "../partials/admin_side_nav";

const Blog = () => {
  const [blogs, setBlogs] = useState([]);
  const [index, setIndex] = useState(0);
  const [trigger, setTrigger] = useState(0);
  const navigate = useNavigate();

  const deleteBlog = (id) => {
    (async (_) => {
      let { data } = await _.get(`${appUrl}/blog/delete-blog`, {
        params: {
          _id: id,
        },
      });

      if (data?.success) {
        Swal.fire({
          title: data.message,
          html: "will be redirected to blog list",
          timer: 1500,
          timerProgressBar: true,
        }).then((result) => {
          if (
            result.dismiss === Swal.DismissReason.timer ||
            result.isConfirmed
          ) {
            setTrigger(trigger + 1);
            navigate("/admin");
          }
        });
      } else
        Swal.fire({
          title: "Error in deleting the blog",
          icon: "error",
          confirmButtonText: "Confirm",
        }).then((result) => {
          if (result.isConfirmed) {
            setTrigger(trigger + 1);
            navigate("/admin");
          }
        });
    })(axios);
  };

  useEffect(() => {
    document.title = "Visitour Blogs | Blogs";
    const user = JSON.parse(Cookies.get("user") ?? `{}`);
    if (Object.keys(user).length == 0) return navigate("/admin/login");

    (async () => {
      let { data } = await axios.get(`${appUrl}/blog/get-blogs`);

      if (data.success) {
        setBlogs(data.blogs);
      }
    })();
  }, [trigger]);

  return (
    <>
      <AdminNav />
      <div className="admin-new-blog-body">
        <AdminSideNav index={index} setIndex={setIndex} />
        <section id="blogs-admin">
          <table className="blog-admin-content-table">
            <thead>
              <tr>
                <th>Title</th>
                <th>Status</th>
                <th>Author</th>
                <th>Category</th>
                <th>Date</th>
              </tr>
            </thead>
            <tbody>
              {blogs
                .filter((e) => {
                  if (index == 0) return e.publishmentStatus == "published";
                  else if (index == 1) return e.publishmentStatus == "draft";
                })
                .map((blog) => (
                  <tr>
                    <td>
                      <div className="blog-admin-content-table-title-container">
                        <a href="/admin">{blog.title}</a>
                      </div>
                      <div className="blog-admin-content-table-btn-container">
                        <a
                          className="blog-admin-content-table-btn"
                          href={`/blogs/${blog.slug}`}
                        >
                          View
                        </a>
                        |
                        <a
                          className="blog-admin-content-table-btn"
                          href={`/admin/edit/${blog._id}`}
                        >
                          Edit
                        </a>
                        |
                        <a
                          className="blog-admin-content-table-btn red-warning"
                          href="#"
                          onClick={() => {
                            Swal.fire({
                              title: "Delete Confirmation?",
                              showCancelButton: true,
                              confirmButtonText: "CONFIRM",
                            }).then((result) => {
                              if (result.isConfirmed) deleteBlog(blog._id);
                            });
                          }}
                        >
                          Delete
                        </a>
                        {/* <!-- <a className="blog-admin-content-table-btn" href="">Quick Edit</a> -->
                  <!-- <a id="red" className="blog-admin-content-table-btn" href="">Delete</a> -->
                  <!-- <a className="blog-admin-content-table-btn" href="">Duplicate</a> --> */}
                      </div>
                    </td>
                    {blog.publishmentStatus == "draft" && (
                      <td className="orange-warning">
                        {blog.publishmentStatus}
                      </td>
                    )}
                    {blog.publishmentStatus == "published" && (
                      <td className="green-warning">
                        {blog.publishmentStatus}
                      </td>
                    )}
                    {!["draft", "published"].includes(
                      blog.publishmentStatus
                    ) && <td className="red-warning">Unknown</td>}

                    <td>{blog.author}</td>
                    <td>{blog.category}</td>
                    <td>{new Date(blog.date).toLocaleDateString()}</td>
                  </tr>
                ))}
            </tbody>
          </table>
        </section>
      </div>
    </>
  );
};

export default Blog;
