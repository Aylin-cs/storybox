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
    <div style={{ padding: "20px" }}>
      <h1>Edit Profile</h1>

      <form onSubmit={handleSubmit}>
        <div>
          <input
            type="text"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
            placeholder="Username"
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

export default EditProfile;