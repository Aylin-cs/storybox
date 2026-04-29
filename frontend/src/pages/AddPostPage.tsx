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
    if (!content.trim()) {
      alert("Content is required");
      return;
    }
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
    <div
      style={{
        maxWidth: "600px",
        margin: "40px auto",
        padding: "30px",
        border: "1px solid #ccc",
        borderRadius: "12px",
        boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
        backgroundColor: "#fff",
        textAlign: "center",
      }}
    >
      <h2 style={{ marginBottom: "20px" }}>Create Post</h2>

      <textarea
        placeholder="Write something..."
        value={content}
        onChange={(e) => setContent(e.target.value)}
        style={{
          width: "100%",
          minHeight: "120px",
          padding: "10px",
          borderRadius: "8px",
          border: "1px solid #ccc",
          marginBottom: "20px",
          resize: "none",
        }}
      />

      <br />

      {/* AI bottom */}
      <button onClick={handleGenerateAI} disabled={loadingAI}>
        {loadingAI ? "Generating..." : "Generate with AI"}
      </button>

      <br />
      
      <input
        type="file"
        accept="image/*"
        onChange={(e) => setImage(e.target.files?.[0] || null)}
        style={{ marginBottom: "20px" }}
      />

      <br />

      <button
        onClick={handleCreate}
        style={{
          padding: "10px 25px",
          backgroundColor: "#ff9900",
          color: "white",
          border: "none",
          borderRadius: "8px",
          cursor: "pointer",
          fontSize: "16px",
          fontWeight: "bold",
        }}
      >
        Create
      </button>
    </div>
  );
};

export default AddPostPage;
