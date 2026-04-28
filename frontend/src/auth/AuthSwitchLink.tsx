import { Link } from "react-router-dom";

interface AuthSwitchLinkProps {
  text: string;
  linkText: string;
  to: string;
}

const AuthSwitchLink = ({
  text,
  linkText,
  to,
}: AuthSwitchLinkProps) => {
  return (
    <p style={{ textAlign: "center", marginTop: "20px" }}>
      {text}{" "}
      <Link
        to={to}
        style={{
          color: "#0d6efd",
          textDecoration: "none",
          fontWeight: "bold",
        }}
      >
        {linkText}
      </Link>
    </p>
  );
};

export default AuthSwitchLink;