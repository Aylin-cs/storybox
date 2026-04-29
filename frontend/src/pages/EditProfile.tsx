import { useEffect, useState } from "react";
import userService from "../services/user-service";
import { useNavigate } from "react-router-dom";

const EditProfile = () => {
  const [userName, setUserName] = useState("");
  const [image, setImage] = useState<File | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await userService.getCurrentUser().request;
        setUserName(response.data.userName);
      } catch (err) {
        console.error(err);
      }
    };

    fetchUser();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const formData = new FormData();
      formData.append("userName", userName);

      if (image) {
        formData.append("profile_picture", image);
      }

      await userService.updateMe(formData).request;

      navigate("/profile");
    } catch (err) {
      console.error("Failed to update profile", err);
    }
  };

  return (
    <div
      style={{
        maxWidth: "500px",
        margin: "40px auto",
        padding: "35px",
        border: "1px solid #ddd",
        borderRadius: "14px",
        boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
        backgroundColor: "#fff",
        textAlign: "center",
      }}
    >
      <h1
        style={{
          marginBottom: "25px",
          fontSize: "30px",
          fontWeight: "bold",
        }}
      >
        Edit Profile
      </h1>

      <div style={{ marginBottom: "25px" }}>
        <img
          src={
            image
              ? URL.createObjectURL(image)
              : "https://cdn-icons-png.flaticon.com/512/847/847969.png"
          }
          alt="Profile Preview"
          style={{
            width: "120px",
            height: "120px",
            borderRadius: "50%",
            objectFit: "cover",
            border: "3px solid #ddd",
          }}
        />
      </div>

      <form
        onSubmit={handleSubmit}
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <div style={{ marginBottom: "20px" }}>
          <input
            type="text"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
            placeholder="Username"
            style={{
              width: "240%px",
              padding: "12px 12px 12px 6px",
              borderRadius: "8px",
              border: "1px solid #ccc",
              fontSize: "16px",
              fontWeight: "normal",
              textAlign: "left",
            }}
          />
        </div>

        <div style={{ marginBottom: "25px" }}>
          <label
            style={{
              display: "inline-block",
              padding: "10px 18px",
              backgroundColor: "#333",
              color: "white",
              borderRadius: "8px",
              cursor: "pointer",
              fontWeight: "bold",
            }}
          >
            Upload New Photo
            <input
              type="file"
              accept="image/*"
              style={{ display: "none" }}
              onChange={(e) =>
                setImage(e.target.files ? e.target.files[0] : null)
              }
            />
          </label>
        </div>

        <button
          type="submit"
          style={{
            width: "100%",
            padding: "14px",
            backgroundColor: "#ff9900",
            color: "white",
            border: "none",
            borderRadius: "8px",
            cursor: "pointer",
            fontSize: "16px",
            fontWeight: "bold",
          }}
        >
          Save Changes
        </button>
      </form>
    </div>
  );
};

export default EditProfile;
