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

  const profileImage = user.profile_picture_uri
    ? `http://localhost:3000/uploads/${user.profile_picture_uri}`
    : "https://via.placeholder.com/120";
  return (
    <div style={{ maxWidth: "900px", margin: "30px auto", padding: "20px" }}>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          marginBottom: "40px",
          position: "relative",
          paddingBottom: "20px",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", width: "100%" }}>
          <img
            src={profileImage}
            alt="profile"
            style={{
              width: "120px",
              height: "120px",
              borderRadius: "50%",
              objectFit: "cover",
              marginRight: "20px",
            }}
          />

          <div style={{ marginLeft: "15px" }}>
            <h1 style={{ fontSize: "38px", marginBottom: "8px" }}>
              {user.userName}
            </h1>

            <p style={{ color: "#666", marginBottom: "12px" }}>{user.email}</p>

            <Link
              to="/edit-profile"
              style={{
                display: "inline-block",
                padding: "8px 16px",
                borderRadius: "6px",
                backgroundColor: "#333",
                color: "white",
                textDecoration: "none",
                fontWeight: "bold",
              }}
            >
              Edit Profile
            </Link>
          </div>
        </div>

        <LogoutButton />
      </div>

      <h3
        style={{
          textAlign: "center",
          marginTop: "30px",
          marginBottom: "25px",
          fontSize: "36px",
          color: "#555",
        }}
      >
        My Posts
      </h3>

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
