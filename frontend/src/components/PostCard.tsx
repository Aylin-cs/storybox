import { type Post } from "../services/post-service";
import { Link } from "react-router-dom";
import { useState } from "react";
import likeService from "../services/like-service";

interface Props {
  post: Post;
  username: string;
  onDelete?: (postId: string) => void;
}

const PostCard = ({ post, username, onDelete }: Props) => {
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
    <div
      style={{
        maxWidth: "650px",
        margin: "25px auto",
        border: "1px solid #ddd",
        borderRadius: "14px",
        overflow: "hidden",
        backgroundColor: "#fff",
        boxShadow: "0 4px 10px rgba(0,0,0,0.08)",
      }}
    >
      <div
        style={{
          padding: "14px 18px",
          borderBottom: "1px solid #eee",
          fontWeight: "bold",
          fontSize: "18px",
          color: "#333",
          textAlign: "center",
        }}
      >
        {username}
      </div>

      {post.image_uri && (
        <img
          src={`http://localhost:3000/uploads/${post.image_uri}`}
          alt="post"
          style={{
            width: "100%",
            height: "360px",
            objectFit: "cover",
            display: "block",
          }}
        />
      )}

      <div style={{ padding: "18px", textAlign: "center" }}>
        <p
          style={{
            marginBottom: "18px",
            lineHeight: "1.6",
            fontSize: "16px",
            color: "#444",
          }}
        >
          <strong>{username}</strong> {post.content}
        </p>

        <div
          style={{
            display: "flex",
            gap: "15px",
            alignItems: "center",
            justifyContent: "center",
            marginBottom: "15px",
            flexWrap: "wrap",
          }}
        >
          <button
            onClick={handleLike}
            style={{
              padding: "8px 14px",
              borderRadius: "20px",
              border: "none",
              backgroundColor: liked ? "#ff9900" : "#333",
              color: "white",
              cursor: "pointer",
              fontWeight: "bold",
            }}
          >
            {liked ? "Unlike" : "Like"} ({likesCount})
          </button>

          <Link
            to={`/posts/${post._id}/comments`}
            style={{
              textDecoration: "none",
              padding: "8px 14px",
              borderRadius: "20px",
              backgroundColor: "#f2f2f2",
              color: "#333",
              fontWeight: "bold",
            }}
          >
            Comments ({post.comment_count || 0})
          </Link>
        </div>

        {onDelete && (
          <div
            style={{
              display: "flex",
              gap: "12px",
              justifyContent: "center",
              flexWrap: "wrap",
            }}
          >
            <Link
              to={`/edit-post/${post._id}`}
              style={{
                textDecoration: "none",
                padding: "8px 14px",
                borderRadius: "20px",
                backgroundColor: "#333",
                color: "white",
                fontWeight: "bold",
              }}
            >
              Edit
            </Link>

            <button
              onClick={() => onDelete(post._id)}
              style={{
                padding: "8px 14px",
                borderRadius: "20px",
                border: "none",
                backgroundColor: "#cc3333",
                color: "white",
                cursor: "pointer",
                fontWeight: "bold",
              }}
            >
              Delete
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default PostCard;