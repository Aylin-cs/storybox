import { useState } from "react";
import postService from "../services/post-service";
import { useNavigate } from "react-router-dom";
import { generateCaption } from "../services/ai-service";
import ImageUploader from "../components/ImageUploader";
import PostForm from "../components/PostForm";

const AddPostPage = () => {
  const [content, setContent] = useState("");
  const [image, setImage] = useState<File | null>(null);
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [loadingAI, setLoadingAI] = useState(false);
  const navigate = useNavigate();

  const handleCreate = async () => {
    if (!content.trim()) {
      alert("Please add text before creating a post");
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
      maxWidth: "900px",
      width: "100%",
      margin: "40px auto",
      display: "flex",
      borderRadius: "16px",
      overflow: "hidden",
      boxShadow: "0 8px 25px rgba(0,0,0,0.12)",
      backgroundColor: "white",
      height: "500px",
    }}
  >
    <ImageUploader
      previewImage={previewImage}
      setPreviewImage={setPreviewImage}
      setImage={setImage}
    />

    <PostForm
      content={content}
      setContent={setContent}
      handleGenerateAI={handleGenerateAI}
      handleCreate={handleCreate}
      loadingAI={loadingAI}
    />
  </div>
);
};

export default AddPostPage;
