import { Link } from "react-router-dom";
import LogoutButton from "./LogoutButton";
import { type User } from "../services/user-service";

type Props = {
  user: User;
  profileImage: string;
};

const UserProfileHeader = ({ user, profileImage }: Props) => {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        marginBottom: "35px",
        position: "relative",
        maxWidth: "650px",
        marginLeft: "0",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", width: "100%" }}>
        <img
          src={profileImage}
          alt="profile"
          onError={(e) => {
            e.currentTarget.src =
              "https://cdn-icons-png.flaticon.com/512/847/847969.png";
          }}
          style={{
            width: "120px",
            height: "120px",
            borderRadius: "50%",
            objectFit: "cover",
            marginRight: "20px",
            border: "3px solid #ddd",
          }}
        />

        <div>
          <h2 style={{ marginBottom: "8px" }}>{user.userName}</h2>

          <p style={{ color: "#666", marginBottom: "12px" }}>{user.email}</p>

          <Link
            to="/edit-profile"
            style={{
              display: "inline-block",
              padding: "8px 16px",
              borderRadius: "6px",
              backgroundColor: "#222",
              color: "white",
              textDecoration: "none",
              fontWeight: "bold",
            }}
          >
            Edit Profile
          </Link>
        </div>
      </div>

      <div style={{ marginLeft: "80px", marginTop: "-30px" }}>
        <LogoutButton />
      </div>
    </div>
  );
};

export default UserProfileHeader;
