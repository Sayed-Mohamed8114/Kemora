import { useAuth } from "@/Context/AuthContext";
import { useState } from "react";
import { toast } from "sonner";
import styled from "styled-components";

export default function LoginForm() {
  const { login } = useAuth();

  const [userForm, setUserForm] = useState({
    email: "",
    password: "",
  });

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      await login(userForm);

      toast.success("Logged in correctly, welcome back!");
    } catch {
      toast.error("Invalid email or password.");
    }
  };

  return (
    <StyledForm onSubmit={handleLogin}>
      <label>
        Email
        <input
          value={userForm.email}
          onChange={(e) =>
            setUserForm({
              ...userForm,
              email: e.target.value,
            })
          }
          placeholder="Enter your email"
          type="email"
          autoComplete="email"
          required
        />
      </label>

      <label>
        Password
        <input
          value={userForm.password}
          onChange={(e) =>
            setUserForm({
              ...userForm,
              password: e.target.value,
            })
          }
          placeholder="Enter your password"
          type="password"
          autoComplete="current-password"
          required
        />
      </label>

      <button type="submit">
        Login
      </button>
    </StyledForm>
  );
}

const StyledForm = styled.form`
  display: flex;
  flex-direction: column;

  gap: 22px;

  label {
    display: flex;
    flex-direction: column;

    gap: 9px;

    font-size: 0.85rem;
    font-weight: 600;

    color: #4b5563;
  }

  input {
    width: 100%;
    box-sizing: border-box;

    padding: 15px 16px;

    border: 1px solid #d8dce2;

    border-radius: 12px;

    background: #ffffff;
    color: #1f2937;

    font-size: 0.95rem;

    outline: none;

    transition:
      border-color 200ms ease,
      box-shadow 200ms ease;
  }

  input::placeholder {
    color: #9ca3af;
  }

  input:focus {
    border-color: #b3873f;

    box-shadow: 0 0 0 3px rgba(179, 135, 63, 0.12);
  }

  button {
    width: 100%;

    margin-top: 5px;

    padding: 15px;

    border: none;

    border-radius: 12px;

    background: #b3873f;
    color: white;

    font-size: 0.95rem;
    font-weight: 700;

    cursor: pointer;

    transition:
      transform 200ms ease,
      background 200ms ease,
      box-shadow 200ms ease;
  }

  button:hover {
    background: #9f7737;

    transform: translateY(-1px);

    box-shadow: 0 8px 24px rgba(179, 135, 63, 0.22);
  }

  button:active {
    transform: translateY(0);
  }

  .dark & {
    label {
      color: #d1d5db;
    }

    input {
      background: #181818;

      border-color: #343434;

      color: #f3f4f6;
    }

    input::placeholder {
      color: #6b7280;
    }

    input:focus {
      border-color: #c49a52;

      box-shadow: 0 0 0 3px rgba(196, 154, 82, 0.12);
    }
  }

  @media (max-width: 520px) {
    input,
    button {
      padding: 13px 14px;
    }
  }
`;