import { register } from "@/Services/user";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import styled from "styled-components";
import { Eye, EyeOff, Lock, Mail, User } from "lucide-react";

export default function RegisterForm() {
  const [loading, setLoading] = useState(false);

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

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
    <StyledForm onSubmit={handleSubmit}>
      {/* Full Name */}
      <Field>
        <label htmlFor="name">Full Name</label>

        <InputWrapper>
          <IconWrapper>
            <User size={18} />
          </IconWrapper>

          <input
            id="name"
            name="name"
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
        </InputWrapper>
      </Field>

      {/* Email */}
      <Field>
        <label htmlFor="email">Email</label>

        <InputWrapper>
          <IconWrapper>
            <Mail size={18} />
          </IconWrapper>

          <input
            id="email"
            name="email"
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
        </InputWrapper>
      </Field>

      {/* Password */}
      <Field>
        <label htmlFor="password">Password</label>

        <PasswordWrapper>
          <IconWrapper>
            <Lock size={18} />
          </IconWrapper>

          <PasswordInput
            id="password"
            name="password"
            value={formData.password}
            onChange={(e) =>
              setFormData({
                ...formData,
                password: e.target.value,
              })
            }
            placeholder="Create a password"
            type={showPassword ? "text" : "password"}
            autoComplete="new-password"
            required
          />

          <PasswordToggle
            type="button"
            onClick={() => setShowPassword((prev) => !prev)}
            aria-label={
              showPassword ? "Hide password" : "Show password"
            }
          >
            {showPassword ? (
              <EyeOff size={18} />
            ) : (
              <Eye size={18} />
            )}
          </PasswordToggle>
        </PasswordWrapper>
      </Field>

      {/* Confirm Password */}
      <Field>
        <label htmlFor="confirmPassword">Confirm Password</label>

        <PasswordWrapper>
          <IconWrapper>
            <Lock size={18} />
          </IconWrapper>

          <PasswordInput
            id="confirmPassword"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={(e) =>
              setFormData({
                ...formData,
                confirmPassword: e.target.value,
              })
            }
            placeholder="Confirm your password"
            type={showConfirmPassword ? "text" : "password"}
            autoComplete="new-password"
            required
          />

          <PasswordToggle
            type="button"
            onClick={() =>
              setShowConfirmPassword((prev) => !prev)
            }
            aria-label={
              showConfirmPassword
                ? "Hide confirm password"
                : "Show confirm password"
            }
          >
            {showConfirmPassword ? (
              <EyeOff size={18} />
            ) : (
              <Eye size={18} />
            )}
          </PasswordToggle>
        </PasswordWrapper>
      </Field>

      {/* Submit */}
      <SubmitButton type="submit" disabled={loading}>
        {loading ? "Creating Account..." : "Create Account"}
      </SubmitButton>
    </StyledForm>
  );
}

const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 22px;
`;

const Field = styled.div`
  display: flex;
  flex-direction: column;
  gap: 9px;

  label {
    font-size: 0.85rem;
    font-weight: 600;
    color: #4b5563;
  }

  .dark & label {
    color: #d1d5db;
  }
`;

const InputWrapper = styled.div`
  position: relative;
  width: 100%;

  input {
    width: 100%;
    box-sizing: border-box;

    padding: 15px 16px 15px 44px;

    border: 1px solid #d8dce2;
    border-radius: 12px;

    background: #ffffff;
    color: #1f2937;

    font-size: 0.95rem;

    outline: none;

    transition:
      border-color 200ms ease,
      box-shadow 200ms ease,
      background 200ms ease;
  }

  input::placeholder {
    color: #9ca3af;
  }

  input:hover {
    border-color: #c5cad1;
  }

  input:focus {
    border-color: #b3873f;

    box-shadow: 0 0 0 3px rgba(179, 135, 63, 0.12);
  }

  .dark & input {
    background: #181818;
    border-color: #343434;
    color: #f3f4f6;
  }

  .dark & input::placeholder {
    color: #6b7280;
  }

  .dark & input:hover {
    border-color: #454545;
  }

  .dark & input:focus {
    border-color: #c49a52;

    box-shadow: 0 0 0 3px rgba(196, 154, 82, 0.12);
  }
`;

const PasswordWrapper = styled(InputWrapper)``;

const PasswordInput = styled.input`
  padding-left: 44px !important;
  padding-right: 48px !important;
`;

const IconWrapper = styled.div`
  position: absolute;

  left: 14px;
  top: 50%;

  display: flex;
  align-items: center;
  justify-content: center;

  transform: translateY(-50%);

  color: #9ca3af;

  pointer-events: none;

  z-index: 2;

  .dark & {
    color: #6b7280;
  }
`;

const PasswordToggle = styled.button`
  position: absolute;

  right: 9px;
  top: 50%;

  width: 34px !important;
  height: 34px;

  margin: 0 !important;
  padding: 0 !important;

  display: flex;
  align-items: center;
  justify-content: center;

  transform: translateY(-50%);

  border: none;

  border-radius: 8px;

  background: transparent !important;

  color: #9ca3af;

  cursor: pointer;

  box-shadow: none !important;

  transition:
    background 150ms ease,
    color 150ms ease;

  &:hover {
    background: #f1f3f5 !important;
    color: #374151;

    transform: translateY(-50%);

    box-shadow: none !important;
  }

  &:active {
    transform: translateY(-50%);
  }

  .dark & {
    color: #6b7280;
  }

  .dark &:hover {
    background: #262626 !important;
    color: #e5e7eb;
  }
`;

const SubmitButton = styled.button`
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

  &:hover:not(:disabled) {
    background: #9f7737;

    transform: translateY(-1px);

    box-shadow: 0 8px 24px rgba(179, 135, 63, 0.22);
  }

  &:active:not(:disabled) {
    transform: translateY(0);
  }

  &:disabled {
    opacity: 0.65;
    cursor: not-allowed;
  }

  .dark & {
    background: #c49a52;
  }

  .dark &:hover:not(:disabled) {
    background: #b3873f;
  }

  @media (max-width: 520px) {
    padding: 13px 14px;
  }
`;
