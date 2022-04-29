import React, { useEffect, useState } from "react";
import Comment from "./Comment";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./commentStyle.css";
const Comments = ({ currentUserId }) => {
  const [backendComments, setBackendComments] = useState([]);

  const [activeComment, setActiveComment] = useState(null);

  const rootComments = backendComments.filter(
    (backendComments) => backendComments.parentId === null
  );

  const getReplies = (commentId) => {
    return backendComments
      .filter((backendComment) => backendComment.parentId === commentId)
      .sort(
        (a, b) =>
          new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
      );
  };

  useEffect(() => {
    fetch("http://localhost:5000/comments")
      .then((res) => res.json())
      .then((data) => setBackendComments(data));
  }, []);

  const [textArea, setTextArea] = useState();
  const handleComment = (e, parentId = null) => {
    e.preventDefault();
    const text = e.target.text.value;
    const author = e.target.author.value;

    const comment = {
      id: Math.random().toString(36).substr(2, 9),
      parentId,
      username: author,
      body: text,
      userId: Math.random().toString(36).substr(2, 9),
      createdAt: new Date().toISOString(),
    };

    // !Send Data to the server
    fetch("http://localhost:5000/comment", {
      method: "POST",
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
    setActiveComment(null);
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
      <div className="comments mx-auto w-50">
        <h3 className="comments-title">Comments</h3>
        <div className="comments-container">
          {rootComments.map((rootComment) => {
            return (
              <Comment
                handleComment={handleComment}
                currentUserId={currentUserId}
                activeComment={activeComment}
                setActiveComment={setActiveComment}
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
