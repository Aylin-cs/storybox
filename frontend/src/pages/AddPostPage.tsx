import { useState } from "react";
import postService from "../services/post-service";
import { useNavigate } from "react-router-dom";

const AddPostPage = () => {
  const [content, setContent] = useState("");
  const [image, setImage] = useState<File | null>(null);
  const navigate = useNavigate();

  const handleCreate = async () => {
    try {
      await postService.createPost({ content, image });
      alert("Post created!");
      navigate("/home");
    } catch (error) {
      console.log(error);
      alert("Failed to create post");
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Create Post</h2>

      <textarea
        placeholder="Write something..."
        value={content}
        onChange={(e) => setContent(e.target.value)}
      />

      <br />

      <input
        type="file"
        accept="image/*"
        onChange={(e) => setImage(e.target.files?.[0] || null)}
      />

      <br />

      <button onClick={handleCreate}>Create</button>
    </div>
  );
};

export default AddPostPage;