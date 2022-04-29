import React from "react";
import { Button, Modal } from "react-bootstrap";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AddNewPost = () => {
  function MyVerticallyCenteredModal(props) {
    const handleAddPost = (e) => {
      e.preventDefault();
      const title = e.target.title.value;
      const content = e.target.content.value;
      const date = e.target.date.value;
      const blog = { title, content, date };

      // !Send Data to the server
      fetch("http://localhost:5000/blog", {
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
      props.onHide();
      toast("Post Added!");
    };
    return (
      <Modal
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">Add Post</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form
            onSubmit={handleAddPost}
            className="d-flex flex-column w-75 ms-auto me-auto"
          >
            <input
              className="my-1 p-2"
              required
              type="text"
              name="title"
              placeholder="Add Title"
            />
            <textarea
              className="my-1 p-3"
              required
              type="text"
              name="content"
              placeholder="Description"
            />
            <input
              className="my-2 p-2 w-50 mx-auto"
              required
              name="date"
              type="date"
              placeholder="Add Date"
            />
            <input
              className="w-50 mx-auto p-2 fw-bold btn btn-primary"
              type="submit"
              value="Add Post"
            />
          </form>
        </Modal.Body>
      </Modal>
    );
  }

  const [modalShow, setModalShow] = React.useState(false);
  return (
    <div className="text-center">
      <Button variant="primary" onClick={() => setModalShow(true)}>
        Add New Post
      </Button>
      <ToastContainer />

      <MyVerticallyCenteredModal
        show={modalShow}
        onHide={() => setModalShow(false)}
      />
    </div>
  );
};

export default AddNewPost;
