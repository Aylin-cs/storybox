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
      <h1 style={{ marginBottom: "25px", fontSize: "42px" }}>Edit Profile</h1>

      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: "20px" }}>
          <input
            type="text"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
            placeholder="Username"
            style={{
              width: "100%",
              padding: "12px",
              borderRadius: "8px",
              border: "1px solid #ccc",
            }}
          />
        </div>

        <div style={{ marginBottom: "25px" }}>
          <input
            type="file"
            accept="image/*"
            onChange={(e) =>
              setImage(e.target.files ? e.target.files[0] : null)
            }
          />
        </div>

        <button
          type="submit"
          style={{
            padding: "12px 30px",
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
