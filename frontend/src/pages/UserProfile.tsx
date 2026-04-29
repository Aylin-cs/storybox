import { useEffect, useState } from "react";
import userService, { type User } from "../services/user-service";
import postService, { type Post } from "../services/post-service";
import PostCard from "../components/PostCard";
import UserProfileHeader from "../components/UserProfileHeader";

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
  ? user.profile_picture_uri.startsWith("http")
    ? user.profile_picture_uri
    : `http://localhost:3000/${user.profile_picture_uri.replace(/^\/+/, "")}`
  : "https://via.placeholder.com/120";
  return (
    <div style={{ maxWidth: "900px", margin: "30px auto", padding: "20px" }}>
      <UserProfileHeader user={user} profileImage={profileImage} />

      <h4 style={{ marginTop: "30px", marginBottom: "25px", color: "#333" }}>Posts</h4>

      {posts.length === 0 ? (
        <p style={{ color: "#666" }}>
          This user hasn't posted anything yet.
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
