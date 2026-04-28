import { type Post } from "../services/post-service";
import { Link } from "react-router-dom";
import { useState } from "react";
import likeService from "../services/like-service";

interface Props {
  post: Post;
  username: string;
}

const PostCard = ({ post, username }: Props) => {
  const [likesCount, setLikesCount] = useState(post.likes?.length || 0);
  const [liked, setLiked] = useState(false);

  const handleLike = async () => {
    try {
      const response = await likeService.toggleLike(post._id).request;

      setLikesCount(response.data.likesCount);
      setLiked(response.data.liked);
    } catch (err) {
      console.error("Failed to like post", err);
    }
  };
  return (
    <div style={{ border: "1px solid black", margin: "10px", padding: "10px" }}>
      <strong>{username}</strong>

      <p>{post.content}</p>

      {post.image_uri && (
        <img
          src={`http://localhost:3000/uploads/${post.image_uri}`}
          alt="post"
          style={{ width: "100%", maxHeight: "300px", objectFit: "cover" }}
        />
      )}
      <Link to={`/posts/${post._id}/comments`}>
        View Comments ({post.comment_count || 0})
      </Link>

      <br />
      <button onClick={handleLike}>
        {liked ? "Unlike" : "Like"} ({likesCount})
      </button>
    </div>
  );
};

export default PostCard;
