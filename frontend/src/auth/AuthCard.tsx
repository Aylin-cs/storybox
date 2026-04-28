import { type ReactNode } from "react";

interface AuthCardProps {
  children: ReactNode;
  title: string;
  subtitle?: string;
}

const AuthCard = ({ children, title, subtitle }: AuthCardProps) => {
  return (
    <div
      style={{
        width: "350px",
        padding: "30px",
        border: "1px solid #ddd",
        borderRadius: "6px",
        boxShadow: "0 10px 30px rgba(0,0,0,0.15)",
        backgroundColor: "white",
      }}
    >
      <h2 style={{ textAlign: "center", marginBottom: "15px" }}>{title}</h2>

      {subtitle && (
        <p style={{ textAlign: "center", color: "#666" }}>{subtitle}</p>
      )}

      {children}
    </div>
  );
};

export default AuthCard;