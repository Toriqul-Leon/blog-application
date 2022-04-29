import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import AddNewPost from "../AddNewPost/AddNewPost";
import "./BlogList.css";

const BlogList = () => {
  const [blogs, setBlogs] = useState([]);
  const [pageCount, setPageCount] = useState(0);
  const [page, setPage] = useState(0);
  const [size, setSize] = useState(5);

  useEffect(() => {
    fetch("http://localhost:5000/blogCount")
      .then((res) => res.json())
      .then((data) => {
        const count = data.count;
        const pages = Math.ceil(count / 5);
        setPageCount(pages);
      });
  }, []);
  useEffect(() => {
    fetch(`http://localhost:5000/blogs?page=${page}&size=${size}`)
      .then((res) => res.json())
      .then((data) => setBlogs(data));
  }, [page, size]);

  return (
    <>
      <div className="blog-container">
        <h1 className="fw-bold">Blog List</h1>
        {blogs.map((blog) => {
          return (
            <div key={blog._id} className="blogs ">
              <Link
                to={`/blog/${blog._id}`}
                className="blog-list text-decoration-none"
              >
                {blog.title}
              </Link>
            </div>
          );
        })}
        <AddNewPost></AddNewPost>
      </div>
      <div className="pagination-container">
        <div className="pagination">
          {[...Array(pageCount).keys()].map((number) => {
            return (
              <button
                className={page === number ? "selected" : ""}
                onClick={() => setPage(number)}
              >
                {number + 1}
              </button>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default BlogList;
