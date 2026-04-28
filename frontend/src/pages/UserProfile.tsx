import { useEffect, useState } from "react";
import userService, { type User } from "../services/user-service";
import postService, { type Post } from "../services/post-service";
import PostCard from "../components/PostCard";
import { Link } from "react-router-dom";
import LogoutButton from "../components/LogoutButton";

const UserProfile = () => {
  const [user, setUser] = useState<User | null>(null);
  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const userResponse = await userService.getCurrentUser().request;
        setUser(userResponse.data);

        const postsResponse = await postService.fetchPaginatedPosts(
          1,
          userResponse.data._id,
        ).request;

        setPosts(postsResponse.data.posts);
      } catch (err) {
        console.error("Failed to load profile", err);
      }
    };

    fetchProfile();
  }, []);

  if (!user) {
    return <p>Loading profile...</p>;
  }

  return (
  <div style={{ maxWidth: "900px", margin: "30px auto", padding: "20px" }}>
    <div
      style={{
        padding: "25px",
        border: "1px solid #ddd",
        borderRadius: "12px",
        boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
        backgroundColor: "#fff",
        textAlign: "center",
        marginBottom: "30px",
      }}
    >
      <h1>My Profile</h1>

      {user.profile_picture_uri && (
        <img
          src={`http://localhost:3000/uploads/${user.profile_picture_uri}`}
          alt="profile"
          style={{
            width: "120px",
            height: "120px",
            borderRadius: "50%",
            objectFit: "cover",
            marginBottom: "15px",
          }}
        />
      )}

      <h2>{user.userName}</h2>
      <p style={{ color: "#666" }}>{user.email}</p>

      <Link to="/edit-profile">Edit Profile</Link>

      <div style={{ marginTop: "15px" }}>
        <LogoutButton />
      </div>
    </div>

    <h3 style={{ textAlign: "center", marginBottom: "20px" }}>My Posts</h3>

    {posts.length === 0 ? (
      <p style={{ textAlign: "center", color: "#666" }}>
        You have not created any posts yet.
      </p>
    ) : (
      posts.map((post) => (
        <PostCard key={post._id} post={post} username={user.userName} />
      ))
    )}
  </div>
);
};

export default UserProfile;