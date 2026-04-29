import type { FC } from "react";

type PostFormProps = {
  content: string;
  setContent: (content: string) => void;
  handleGenerateAI: () => void;
  handleCreate: () => void;
  loadingAI: boolean;
};

const PostForm: FC<PostFormProps> = ({
  content,
  setContent,
  handleGenerateAI,
  handleCreate,
  loadingAI,
}) => {
  return (
    <div
      className="p-4 d-flex flex-column"
      style={{
        width: "40%",
        paddingRight: "40px",
        alignItems: "flex-end",
      }}
    >
      <h2
        style={{
          marginBottom: "20px",
          width: "300px",
          textAlign: "left",
          paddingLeft: "0px",
        }}
      >
        Create Post
      </h2>

      <textarea
        className="form-control border-0 shadow-sm"
        placeholder="Write a caption..."
        value={content}
        onChange={(e) => setContent(e.target.value)}
        rows={4}
        style={{
          width: "300px",
          minHeight: "120px",
          resize: "none",
          fontSize: "16px",
          padding: "12px",
          borderRadius: "10px",
        }}
      />

      <div
        className="d-grid gap-2 mt-3"
        style={{
          width: "220px",
          marginRight: "80px",
        }}
      >
        <button
          type="button"
          onClick={handleGenerateAI}
          disabled={loadingAI}
          style={{
            fontSize: "13px",
            fontWeight: "bold",
            padding: "8px",
            borderRadius: "10px",
            width: "100%",
            backgroundColor: "#333",
            color: "white",
            border: "none",
            cursor: "pointer",
          }}
        >
          {loadingAI ? "Generating..." : "Generate with AI"}
        </button>

        <button
          type="button"
          onClick={handleCreate}
          className="btn btn-primary shadow-sm"
          style={{
            fontSize: "16px",
            fontWeight: "bold",
            padding: "10px",
            borderRadius: "10px",
            width: "100%",
          }}
        >
          Share
        </button>
      </div>
    </div>
  );
};

export default PostForm;
