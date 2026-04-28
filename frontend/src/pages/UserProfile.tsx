import { useEffect, useState } from "react";
import userService, { type User } from "../services/user-service";
import postService, { type Post } from "../services/post-service";
import PostCard from "../components/PostCard";
import { Link } from "react-router-dom";

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
          userResponse.data._id
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
    <div style={{ padding: "20px" }}>
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
          }}
        />
      )}

      <h2>{user.userName}</h2>
      <p>{user.email}</p>

      <Link to="/edit-profile">Edit Profile</Link>

      <h3>My Posts</h3>

      {posts.map((post) => (
        <PostCard key={post._id} post={post} username={user.userName} />
      ))}
    </div>
  );
};

export default UserProfile;