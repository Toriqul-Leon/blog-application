import React, { useState } from "react";
import "./commentStyle.css";

const Comment = ({
  comment,
  replies,
  currentUserId,
  activeComment,
  handleComment,
  setActiveComment,
  parentId = null,
}) => {
  const createdAt = new Date(comment.createdAt).toLocaleDateString();
  const [textArea, setTextArea] = useState();
  const canReply = Boolean(currentUserId);
  const isReplying =
    activeComment &&
    activeComment.type === "replying" &&
    activeComment.id === comment.id;
  const replyId = parentId ? parentId : comment.id;

  return (
    <div className="comment">
      <div className="comment-image-container ">
        <img
          src="https://cdn2.iconfinder.com/data/icons/random-outline-3/48/random_14-512.png"
          alt=""
        />
      </div>
      <div className="comment-right-part ">
        <div className="comment-content d-flex flex-column">
          <div className="comment-author">{comment.username}</div>
          <small>{createdAt}</small>
          <div className="comment-text">
            {" "}
            <p>{comment.body}</p>
          </div>
          <div className="comment-actions">
            {canReply && (
              <div
                onClick={() =>
                  setActiveComment({ id: comment.id, type: "replying" })
                }
                className="comment-action"
              >
                <p>Reply</p>
              </div>
            )}
          </div>
          {isReplying && (
            <form
              onSubmit={(e) => handleComment(e, replyId)}
              className="comment-box ml-2 p-3"
            >
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
          )}
          {replies.length > 0 && (
            <div className="replies">
              {replies.map((reply) => {
                return (
                  <Comment
                    setActiveComment={setActiveComment}
                    activeComment={activeComment}
                    parentId={comment.id}
                    currentUserId={currentUserId}
                    comment={reply}
                    key={comment.id}
                    replies={[]}
                    handleComment={handleComment}
                  ></Comment>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Comment;
