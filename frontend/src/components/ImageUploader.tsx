import type { FC } from "react";

type ImageUploaderProps = {
  previewImage: string | null;
  setPreviewImage: (image: string | null) => void;
  setImage: (image: File | null) => void;
};

const ImageUploader: FC<ImageUploaderProps> = ({
  previewImage,
  setPreviewImage,
  setImage,
}) => {
  return (
    <div
      style={{
        width: "60%",
        height: "500px",
        borderRadius: "16px 0 0 16px",
        overflow: "hidden",
        backgroundColor: "#f8f9fa",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
        position: "relative",
      }}
    >
      {previewImage ? (
        <>
          <img
            src={previewImage}
            alt="preview"
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
            }}
          />

          <button
            onClick={() => {
              setImage(null);
              setPreviewImage(null);
            }}
            style={{
              position: "absolute",
              top: "10px",
              right: "10px",
              backgroundColor: "red",
              color: "white",
              border: "none",
              borderRadius: "50%",
              width: "30px",
              height: "30px",
              cursor: "pointer",
              fontWeight: "bold",
            }}
          >
            X
          </button>
        </>
      ) : (
        <label
          style={{
            padding: "12px 18px",
            border: "1px solid #777",
            borderRadius: "10px",
            cursor: "pointer",
            backgroundColor: "white",
            fontWeight: "bold",
          }}
        >
          Upload Image
          <input
            type="file"
            accept="image/*"
            style={{ display: "none" }}
            onChange={(e) => {
              const file = e.target.files?.[0] || null;
              setImage(file);

              if (file) {
                setPreviewImage(URL.createObjectURL(file));
              }
            }}
          />
        </label>
      )}
    </div>
  );
};

export default ImageUploader;