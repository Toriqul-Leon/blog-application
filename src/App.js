import { Route, Routes } from "react-router-dom";
import "./App.css";
import BlogView from "./pages/BlogView/BlogView";
import BlogList from "./pages/Home/BlogList/BlogList";

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<BlogList />} />
        <Route path="/home" element={<BlogList />} />
        <Route path="/blogView" element={<BlogView />} />
      </Routes>
    </div>
  );
}

export default App;
