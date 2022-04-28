import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

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
    <div>
      <h1>BlogView</h1>
      <h2>{blog.title}</h2>
    </div>
  );
};

export default BlogView;
