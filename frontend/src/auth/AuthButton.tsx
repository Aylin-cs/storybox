interface AuthButtonProps {
  label: string;
}

const AuthButton = ({ label }: AuthButtonProps) => {
  return (
    <button
      type="submit"
      style={{
        width: "100%",
        padding: "10px",
        backgroundColor: "#0d6efd",
        color: "white",
        border: "none",
        borderRadius: "6px",
        fontSize: "15px",
        fontWeight: "500",
        cursor: "pointer",
        marginTop: "8px",
      }}
    >
      {label}
    </button>
  );
};

export default AuthButton;