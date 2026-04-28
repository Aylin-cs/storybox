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

  return <button onClick={handleLogout}>Logout</button>;
};

export default LogoutButton;