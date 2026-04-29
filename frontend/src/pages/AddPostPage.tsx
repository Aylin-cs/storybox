import { useState } from "react";
import postService from "../services/post-service";
import { useNavigate } from "react-router-dom";
import { generateCaption } from "../services/ai-service";

const AddPostPage = () => {
  const [content, setContent] = useState("");
  const [image, setImage] = useState<File | null>(null);
  const [loadingAI, setLoadingAI] = useState(false);
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

  const handleGenerateAI = async () => {
    if (!content) {
      alert("Please write something first");
      return;
    }

    try {
      setLoadingAI(true);
      const response = await generateCaption(content);
      setContent(response.caption);
    } catch (error) {
      console.error(error);
      alert("Failed to generate caption");
    } finally {
      setLoadingAI(false);
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

      {/* 👇 כפתור AI */}
      <button onClick={handleGenerateAI} disabled={loadingAI}>
        {loadingAI ? "Generating..." : "Generate with AI"}
      </button>

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