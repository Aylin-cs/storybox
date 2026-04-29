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
        width: "100%",
        maxWidth: "320px",
        padding: "28px",
        border: "1px solid #ddd",
        borderRadius: "8px",
        boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
        backgroundColor: "white",
      }}
    >
      <h2
        style={{
          textAlign: "center",
          marginBottom: "12px",
          fontSize: "2rem",
        }}
      >
        {title}
      </h2>

      {subtitle && (
        <p
          style={{
            textAlign: "center",
            color: "#666",
            marginBottom: "20px",
          }}
        >
          {subtitle}
        </p>
      )}

      {children}
    </div>
  );
};

export default AuthCard;