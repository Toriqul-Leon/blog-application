import React, { useEffect, useState } from "react";
import Comment from "./Comment";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./commentStyle.css";
const Comments = () => {
  const [backendComments, setBackendComments] = useState([]);

  const rootComments = backendComments.filter(
    (backendComments) => backendComments.parentId === null
  );

  const getReplies = (commentId) => {
    return backendComments
      .filter((backendComment) => backendComment.parentId === commentId)
      .sort(
        (a, b) =>
          new Date(a.createdAt.getTime() - new Date(b.createdAt).getTime())
      );
  };

  useEffect(() => {
    fetch("http://localhost:5000/comments")
      .then((res) => res.json())
      .then((data) => setBackendComments(data));
  }, []);
  const [textArea, setTextArea] = useState();
  const handleComment = (e) => {
    e.preventDefault();
    const text = e.target.text.value;
    const author = e.target.author.value;

    const comment = {
      id: Math.random().toString(36).substr(2, 9),
      parentId: null,
      username: author,
      body: text,
      userId: "1",
      createdAt: new Date().toISOString(),
    };

    // !Send Data to the server
    fetch("http://localhost:5000/comment", {
      method: "POST", // or 'PUT'
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(comment),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log("Success:", data);
      });

    toast("Comment Added!");
    e.target.text.value = "";
    e.target.author.value = "";
    setBackendComments([comment, ...backendComments]);
  };

  return (
    <>
      <div className="card w-75 mx-auto">
        <div className="col-10 ">
          <form onSubmit={handleComment} className="comment-box ml-2 p-3">
            <h4 className="p-2">Add a comment</h4>
            <div className="comment-area ps-5">
              {" "}
              <input
                required
                onChange={(e) => setTextArea(e.target.value)}
                className="form-control my-2"
                type="text"
                name="author"
                placeholder="Name"
              />
              <textarea
                required
                onChange={(e) => setTextArea(e.target.value)}
                className="form-control "
                name="text"
                placeholder="Comment"
                rows={4}
                defaultValue={""}
              />{" "}
            </div>
            <input
              disabled={!textArea}
              className="btn btn-success send btn-sm px-4 py-2 ms-5 my-2"
              type="submit"
            />
          </form>
          <ToastContainer />
        </div>
      </div>
      <div className="comments">
        <h3 className="comments-title">Comments</h3>
        <div className="comments-container">
          {rootComments.map((rootComment) => {
            return (
              <Comment
                key={rootComment.id}
                comment={rootComment}
                replies={getReplies(rootComment.id)}
              ></Comment>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default Comments;
