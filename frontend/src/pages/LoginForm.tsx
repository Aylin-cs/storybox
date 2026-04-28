import { useState } from "react";
import { authLogin } from "../services/auth-service";
import { useNavigate } from "react-router-dom";

import AuthCard from "../auth/AuthCard";
import AuthButton from "../auth/AuthButton";
import AuthSwitchLink from "../auth/AuthSwitchLink";
import InputField from "../components/InputField";
import Form from "../components/Form";

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await authLogin({ email, password });
      navigate("/home");
    } catch {
      setError("Login failed");
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <AuthCard title="StoryBox" subtitle="Log in to continue.">
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

        {error && (
          <p style={{ color: "red", textAlign: "center" }}>{error}</p>
        )}

        <AuthButton label="Log in" />

        <AuthSwitchLink
          text="Don't have an account?"
          linkText="Sign up"
          to="/register"
        />
      </AuthCard>
    </Form>
  );
};

export default LoginForm;