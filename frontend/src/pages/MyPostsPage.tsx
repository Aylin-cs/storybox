import { useEffect, useState } from "react";
import postService, { type Post } from "../services/post-service";
import userService from "../services/user-service";
import PostCard from "../components/PostCard";

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
          const userResponse = await userService.getUserById(post.ownerId).request;
          return {
            ...post,
            username: userResponse.data.userName,
          };
        })
      );

      setPosts(postsWithUsers);
    };

    fetchPosts();
  }, []);

  return (
    <div style={{ padding: "20px" }}>
      <h1>My Posts</h1>

      {posts.map((post) => (
        <PostCard key={post._id} post={post} username={post.username} />
      ))}
    </div>
  );
};

export default MyPostsPage;