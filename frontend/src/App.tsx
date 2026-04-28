import { Routes, Route } from "react-router-dom";
import LoginForm from "./pages/LoginForm";
import HomePage from "./pages/HomePage";
import AddPostPage from "./pages/AddPostPage";
import MyPostsPage from "./pages/MyPostsPage";
import RegisterForm from "./pages/RegisterForm";
import UserProfile from "./pages/UserProfile";
import EditProfile from "./pages/EditProfile";
import CommentsPage from "./pages/CommentsPage";
import EditPost from "./pages/EditPost";
import NavBar from "./components/Navbar";

function App() {
  return (
    <>
    <NavBar /> 
    <Routes>
      <Route path="/" element={<LoginForm />} />
      <Route path="/home" element={<HomePage />} />
      <Route path="/add-post" element={<AddPostPage />} />
      <Route path="/my-posts" element={<MyPostsPage />} />
      <Route path="/register" element={<RegisterForm />} />
      <Route path="/profile" element={<UserProfile />} />
      <Route path="/edit-profile" element={<EditProfile />} />
      <Route path="/posts/:postId/comments" element={<CommentsPage />} />
      <Route path="/edit-post/:postId" element={<EditPost />} />
    </Routes>
    </>
  );
}

export default App;