import { useNavigate } from "react-router-dom";
import { authLogout } from "../services/auth-service";

const LogoutButton = () => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await authLogout();
      navigate("/");
    } catch (err) {
      console.error("Logout failed", err);
    }
  };

  return (
    <button
      onClick={handleLogout}
      style={{
        padding: "10px 20px",
        borderRadius: "20px",
        border: "none",
        backgroundColor: "#cc3333",
        color: "white",
        fontWeight: "bold",
        cursor: "pointer",
      }}
    >
      Logout
    </button>
  );
};

export default LogoutButton;
