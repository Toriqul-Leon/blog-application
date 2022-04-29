import React, { useEffect, useState } from "react";
import "./BlogView.css";
import { useParams } from "react-router-dom";

import Comments from "../Comments/Comments";

const BlogView = () => {
  const { id } = useParams();

  const [blog, setBlog] = useState([]);

  useEffect(() => {
    const url = `http://localhost:5000/blog/${id}`;
    fetch(url)
      .then((res) => res.json())
      .then((data) => setBlog(data));
  }, []);
  return (
    <>
      <div className="blog">
        <h1>BlogView</h1>
        <h2>{blog.title}</h2>
        <small>{blog.date}</small>
        <p>{blog.content}</p>
      </div>

      <Comments></Comments>
    </>
  );
};

export default BlogView;
