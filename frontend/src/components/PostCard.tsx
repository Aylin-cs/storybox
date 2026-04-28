import { type Post } from "../services/post-service";
import { Link } from "react-router-dom";
interface Props {
  post: Post;
  username: string;
}

const PostCard = ({ post, username }: Props) => {
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
    </div>
  );
};

export default PostCard;
