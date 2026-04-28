import { type ReactNode } from "react";

interface FormProps {
  children: ReactNode;
  onSubmit: (e: React.FormEvent) => void;
}

const Form = ({ children, onSubmit }: FormProps) => {
  return (
    <form
      onSubmit={onSubmit}
      style={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#f8f9fa",
      }}
    >
      {children}
    </form>
  );
};

export default Form;