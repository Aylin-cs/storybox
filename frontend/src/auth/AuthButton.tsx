interface AuthButtonProps {
  label: string;
}

const AuthButton = ({ label }: AuthButtonProps) => {
  return (
    <button
      type="submit"
      style={{
        width: "100%",
        padding: "12px",
        backgroundColor: "#0d6efd",
        color: "white",
        border: "none",
        borderRadius: "4px",
        fontSize: "16px",
        cursor: "pointer",
        marginTop: "10px",
      }}
    >
      {label}
    </button>
  );
};

export default AuthButton;