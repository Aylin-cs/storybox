import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import postService from "../services/post-service";

const EditPost = () => {
  const { postId } = useParams();
  const navigate = useNavigate();

  const [content, setContent] = useState("");
  const [image, setImage] = useState<File | null>(null);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        if (!postId) return;

        const response = await postService.fetchPaginatedPosts(1).request;
        const post = response.data.posts.find((p) => p._id === postId);

        if (post) {
          setContent(post.content);
        }
      } catch (err) {
        console.error("Failed to load post", err);
      }
    };

    fetchPost();
  }, [postId]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!postId) return;

    try {
      await postService.updatePost(postId, {
        content,
        image,
      });

      navigate("/my-posts");
    } catch (err) {
      console.error("Failed to update post", err);
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>Edit Post</h1>

      <form onSubmit={handleSubmit}>
        <div>
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Post content"
          />
        </div>

        <div>
          <input
            type="file"
            accept="image/*"
            onChange={(e) =>
              setImage(e.target.files ? e.target.files[0] : null)
            }
          />
        </div>

        <button type="submit">Save Changes</button>
      </form>
    </div>
  );
};

export default EditPost;