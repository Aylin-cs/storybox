import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { authRegister } from "../services/auth-service";
import AuthCard from "../auth/AuthCard";
import AuthButton from "../auth/AuthButton";
import AuthSwitchLink from "../auth/AuthSwitchLink";
import InputField from "../components/InputField";
import Form from "../components/Form";

const RegisterForm = () => {
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await authRegister({
        userName,
        email,
        password,
      });

      navigate("/");
    } catch (err) {
      console.error("Registration failed", err);
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <AuthCard title="StoryBox" subtitle="Create a new account.">
        <InputField
          type="text"
          placeholder="Username"
          value={userName}
          onChange={(e) => setUserName(e.target.value)}
        />

        <InputField
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <InputField
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <AuthButton label="Sign up" />

        <AuthSwitchLink
          text="Already have an account?"
          linkText="Log in"
          to="/"
        />
      </AuthCard>
    </Form>
  );
};

export default RegisterForm;
