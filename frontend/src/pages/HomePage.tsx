import { useEffect, useState } from "react";
import postService, { type Post } from "../services/post-service";
import userService from "../services/user-service";
import PostCard from "../components/PostCard";

type PostWithUser = Post & {
  username: string;
};

const HomePage = () => {
  const [posts, setPosts] = useState<PostWithUser[]>([]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await postService.fetchPaginatedPosts(1).request;
        const postsData = response.data.posts;

        const postsWithUsers = await Promise.all(
          postsData.map(async (post: Post) => {
            try {
              const userResponse = await userService.getUserById(post.ownerId)
                .request;

              return {
                ...post,
                username: userResponse.data.userName || "Unknown user",
              };
            } catch (error) {
              console.error(
                "Failed to fetch user for post:",
                post.ownerId,
                error,
              );

              return {
                ...post,
                username: "Unknown user",
              };
            }
          }),
        );

        setPosts(postsWithUsers);
      } catch (error) {
        console.error("Failed to fetch posts", error);
      }
    };

    fetchPosts();
  }, []);

  return (
    <div style={{ maxWidth: "900px", margin: "30px auto", padding: "20px" }}>
      <h1
        style={{
          textAlign: "center",
          marginBottom: "30px",
          marginTop: "20px",
          fontSize: "48px",
        }}
      >
        Home
      </h1>

      {posts.map((post) => (
        <PostCard key={post._id} post={post} username={post.username} />
      ))}
    </div>
  );
};

export default HomePage;
