import React, { useEffect, useState } from "react";

import axios from "axios";

import AdminNav from "../partials/admin_nav";
import AdminSideNav from "../partials/admin_side_nav";

const Blog = () => {
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    (async () => {
      let { data } = await axios.get(`${appUrl}/blog/get-blogs`);

      if (data.success) {
        setBlogs(data.blogs);
        // res.render("admin/admin", {
        //   blogs: data.blogs,
        //   admin: req.session.admin,
        // });
      }
    })();
  }, []);
  return (
    <>
      <AdminNav
        extra={
          <>
            <li>
              <a className="nav-link text-white" href="https://visitour.ph">
                Home
              </a>
            </li>
            <li>
              <a className="nav-link text-white" href="/admin/new-blog">
                Add New
              </a>
            </li>
          </>
        }
      />
      <div className="admin-new-blog-body">
        <AdminSideNav />
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
              {blogs.map((blog) => (
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
                        // href={`/admin/edit/${blog._id}`}
                      >
                        Delete
                      </a>
                      {/* <!-- <a className="blog-admin-content-table-btn" href="">Quick Edit</a> -->
                  <!-- <a id="red" className="blog-admin-content-table-btn" href="">Delete</a> -->
                  <!-- <a className="blog-admin-content-table-btn" href="">Duplicate</a> --> */}
                    </div>
                  </td>
                  {blog.publishmentStatus == "draft" && (
                    <td className="orange-warning">{blog.publishmentStatus}</td>
                  )}
                  {blog.publishmentStatus == "published" && (
                    <td className="green-warning">{blog.publishmentStatus}</td>
                  )}
                  {!["draft", "published"].includes(blog.publishmentStatus) && (
                    <td className="red-warning">Unknown</td>
                  )}

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
