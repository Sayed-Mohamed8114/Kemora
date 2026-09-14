import { register } from "@/Services/user";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import styled from "styled-components";

export default function RegisterForm() {
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const navigate = useNavigate();

  const emailRegex =
    /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

  const handleSubmit = async (e) => {
    e.preventDefault();

    const name = formData.name.trim();
    const email = formData.email.trim();

    if (name.length < 5) {
      toast.error("Full name must be at least 5 characters");
      return;
    }

    if (!emailRegex.test(email)) {
      toast.error("Invalid email format");
      return;
    }

    if (formData.password.length < 8) {
      toast.error("Password must be at least 8 characters");
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    try {
      setLoading(true);

      await register({
        name,
        email,
        password: formData.password,
      });

      toast.success(
        "Account created successfully. Please login to access the website.",
      );

      setFormData({
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
      });

      setTimeout(() => {
        navigate("/login");
      }, 1000);
    } catch (error) {
      const message =
        error?.response?.data?.detail ||
        "Something went wrong. Please try again.";

      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>

      <StyledForm onSubmit={handleSubmit}>
        <label>
          Full Name
          <input
            value={formData.name}
            onChange={(e) =>
              setFormData({
                ...formData,
                name: e.target.value,
              })
            }
            placeholder="Enter your full name"
            type="text"
            autoComplete="name"
            required
          />
        </label>

        <label>
          Email
          <input
            value={formData.email}
            onChange={(e) =>
              setFormData({
                ...formData,
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
            value={formData.password}
            onChange={(e) =>
              setFormData({
                ...formData,
                password: e.target.value,
              })
            }
            placeholder="Create a password"
            type="password"
            autoComplete="new-password"
            required
          />
        </label>

        <label>
          Confirm Password
          <input
            value={formData.confirmPassword}
            onChange={(e) =>
              setFormData({
                ...formData,
                confirmPassword: e.target.value,
              })
            }
            placeholder="Confirm your password"
            type="password"
            autoComplete="new-password"
            required
          />
        </label>

        <button type="submit" disabled={loading}>
          {loading ? "Creating Account..." : "Create Account"}
        </button>
      </StyledForm>
    </>
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
      box-shadow 200ms ease,
      opacity 200ms ease;
  }

  button:hover:not(:disabled) {
    background: #9f7737;

    transform: translateY(-1px);

    box-shadow: 0 8px 24px rgba(179, 135, 63, 0.22);
  }

  button:active:not(:disabled) {
    transform: translateY(0);
  }

  button:disabled {
    opacity: 0.65;
    cursor: not-allowed;
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