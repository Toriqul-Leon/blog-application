import React from "react";
import "./commentStyle.css";

const Comment = ({ comment, replies }) => {
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
          <small>{comment.createdAt}</small>
          <div className="comment-text"> {comment.body}</div>
          {replies.length > 0 && (
            <div className="replies">
              {replies.map((reply) => {
                return (
                  <Comment
                    comment={reply}
                    key={comment.id}
                    replies={[]}
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
