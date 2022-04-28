import React from "react";
import { toast } from "react-toastify";

const CommentBox = () => {
  const handleComment = (e) => {
    e.preventDefault();
    const name = e.target.name.value;
    const comment = e.target.comment.value;

    const blog = { name, comment };

    // !Send Data to the server
    fetch("http://localhost:5000/comment", {
      method: "POST", // or 'PUT'
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(blog),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log("Success:", data);
      });

    toast("Comment Added!");
  };
  return (
    <div className="card w-75 mx-auto">
      <div className="row">
        <div className="col-10 ">
          <form onSubmit={handleComment} className="comment-box ml-2 p-3">
            <h4 className="p-2">Add a comment</h4>
            <div className="comment-area ps-5">
              {" "}
              <input
                className="form-control my-2"
                type="text"
                name="name"
                placeholder="Name"
              />
              <textarea
                className="form-control "
                name="comment"
                placeholder="Comment"
                rows={4}
                defaultValue={""}
              />{" "}
            </div>
            <input
              className="btn btn-success send btn-sm px-4 py-2 ms-5 my-2"
              type="submit"
              value="Comment"
            />
          </form>
        </div>
      </div>
    </div>
  );
};

export default CommentBox;
