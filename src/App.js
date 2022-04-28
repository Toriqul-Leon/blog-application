import { Route, Routes } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import BlogView from "./pages/BlogView/BlogView";
import AddNewPost from "./pages/Home/AddNewPost/AddNewPost";
import BlogList from "./pages/Home/BlogList/BlogList";

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<BlogList />} />
        <Route path="/home" element={<BlogList />} />
        <Route path="/addPost" element={<AddNewPost />} />
        <Route path="/blog/:id" element={<BlogView />} />
      </Routes>
    </div>
  );
}

export default App;
