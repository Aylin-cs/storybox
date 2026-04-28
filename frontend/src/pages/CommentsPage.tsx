import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import commentsService, { type Comment } from "../services/comments-service";

const CommentsPage = () => {
  const { postId } = useParams();
  const [comments, setComments] = useState<Comment[]>([]);
  const [content, setContent] = useState("");

  const loadComments = async () => {
    if (!postId) return;

    try {
      const response = await commentsService.fetchCommentsByPostId(postId).request;
      setComments(response.data);
    } catch (err) {
      console.error("Failed to load comments", err);
    }
  };

  useEffect(() => {
    loadComments();
  }, [postId]);

  const handleAddComment = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!postId || !content.trim()) return;

    try {
      await commentsService.addComment(postId, content).request;
      setContent("");
      loadComments();
    } catch (err) {
      console.error("Failed to add comment", err);
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Comments</h2>

      <form onSubmit={handleAddComment}>
        <input
          type="text"
          placeholder="Write a comment..."
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
        <button type="submit">Post</button>
      </form>

      <div style={{ marginTop: "20px" }}>
        {comments.map((comment) => (
          <div
            key={comment._id}
            style={{
              border: "1px solid #ccc",
              padding: "10px",
              marginBottom: "10px",
            }}
          >
            <p>{comment.content}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CommentsPage;