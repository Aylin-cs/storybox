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
    <p
      style={{
        textAlign: "center",
        marginTop: "18px",
        fontSize: "14px",
        color: "#666",
      }}
    >
      {text}{" "}
      <Link
        to={to}
        style={{
          color: "#0d6efd",
          textDecoration: "none",
          fontWeight: "600",
        }}
      >
        {linkText}
      </Link>
    </p>
  );
};

export default AuthSwitchLink;