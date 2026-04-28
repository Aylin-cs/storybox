import { Routes, Route } from "react-router-dom";
import LoginForm from "./pages/LoginForm";
import HomePage from "./pages/HomePage";
import AddPostPage from "./pages/AddPostPage";
import MyPostsPage from "./pages/MyPostsPage";
import RegisterForm from "./pages/RegisterForm";

function App() {
  return (
    <Routes>
      <Route path="/" element={<LoginForm />} />
      <Route path="/home" element={<HomePage />} />
      <Route path="/add-post" element={<AddPostPage />} />
      <Route path="/my-posts" element={<MyPostsPage />} />
      <Route path="/register" element={<RegisterForm />} />
    </Routes>
  );
}

export default App;