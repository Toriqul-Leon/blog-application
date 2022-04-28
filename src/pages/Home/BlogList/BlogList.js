import React, { useEffect, useState } from "react";
import AddNewPost from "../AddNewPost/AddNewPost";
import "./BlogList.css";

const BlogList = () => {
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/blogs")
      .then((res) => res.json())
      .then((data) => setBlogs(data));
  }, []);

  return (
    <div className="blog-container">
      <h1>Blog List</h1>
      {blogs.map((blog) => {
        return (
          <div key={blog._id} className="blogs">
            <h5 className="blog-list">{blog.title}</h5>

            {/* <p>{blog.content}</p>
            <small>{blog.date}</small> */}
          </div>
        );
      })}
      <AddNewPost></AddNewPost>
    </div>
  );
};

export default BlogList;
