import { useEffect, useState } from "react";
import postService, { type Post } from "../services/post-service";
import userService from "../services/user-service";
import PostCard from "../components/PostCard";
import { Link } from "react-router-dom";

type PostWithUser = Post & {
  username: string;
};

const MyPostsPage = () => {
  const [posts, setPosts] = useState<PostWithUser[]>([]);

  useEffect(() => {
    const fetchPosts = async () => {
      const response = await postService.fetchMyPosts().request;
      const postsData = response.data;

      const postsWithUsers = await Promise.all(
        postsData.map(async (post: Post) => {
          const userResponse = await userService.getUserById(post.ownerId)
            .request;
          return {
            ...post,
            username: userResponse.data.userName,
          };
        }),
      );

      setPosts(postsWithUsers);
    };

    fetchPosts();
  }, []);

  const handleDelete = async (postId: string) => {
    try {
      await postService.deletePost(postId);
      setPosts((prevPosts) => prevPosts.filter((post) => post._id !== postId));
    } catch (err) {
      console.error("Failed to delete post", err);
    }
  };

  return (
    <div style={{ maxWidth: "900px", margin: "30px auto", padding: "20px" }}>
      <h1
        style={{
          textAlign: "center",
          marginTop: "20px",
          marginBottom: "20px",
          fontSize: "48px",
          color: "#333",
        }}
      >
        My Posts
      </h1>

      <div style={{ textAlign: "center", marginBottom: "28px" }}>
        <Link
          to="/add-post"
          style={{
            textDecoration: "none",
            color: "#6a0dad",
            fontWeight: "bold",
            fontSize: "20px",
          }}
        >
          Add New Post
        </Link>
      </div>
      {posts.length === 0 ? (
        <p style={{ textAlign: "center", color: "#666" }}>
          You have not created any posts yet.
        </p>
      ) : (
        posts.map((post) => (
          <PostCard
            key={post._id}
            post={post}
            username={post.username}
            onDelete={handleDelete}
          />
        ))
      )}
    </div>
  );
};

export default MyPostsPage;
