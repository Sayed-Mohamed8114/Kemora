import { useAuth } from "@/Context/AuthContext";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import styled from "styled-components";
import { Eye, EyeOff, Lock, Mail } from "lucide-react";

export default function LoginForm() {
  const { login } = useAuth();

  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const [userForm, setUserForm] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      const data = await login(userForm);

      toast.success("Logged in correctly, welcome back!");

      const rolesRouter = {
        super_admin: "/dashboard/admin",
        staff: "/staff/tours",
        customer: "/tours",
      };

      setTimeout(() => {
        navigate(rolesRouter[data.user.role] || "/");
      }, 1500);
    } catch {
      toast.error("Invalid email or password.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <StyledForm onSubmit={handleLogin}>
      {/* Email */}
      <Field>
        <label htmlFor="email">Email</label>

        <InputWrapper>
          <MailIcon>
            <Mail size={18} />
          </MailIcon>

          <input
            id="email"
            name="email"
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
        </InputWrapper>
      </Field>

      {/* Password */}
      <Field>
        <label htmlFor="password">Password</label>

        <PasswordWrapper>
          <LockIcon>
            <Lock size={18} />
          </LockIcon>

          <PasswordInput
            id="password"
            name="password"
            value={userForm.password}
            onChange={(e) =>
              setUserForm({
                ...userForm,
                password: e.target.value,
              })
            }
            placeholder="Enter your password"
            type={showPassword ? "text" : "password"}
            autoComplete="current-password"
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

      {/* Submit */}
      <SubmitButton type="submit" disabled={loading}>
        {loading ? "Logging in..." : "Login"}
      </SubmitButton>
    </StyledForm>
  );
}



const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 22px;

  .dark & {
    color: #f3f4f6;
  }
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

const MailIcon = styled.div`
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



const PasswordWrapper = styled.div`
  position: relative;
  width: 100%;
`;

const PasswordInput = styled.input`
  width: 100%;
  box-sizing: border-box;

  padding: 15px 48px 15px 44px;

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

  &::placeholder {
    color: #9ca3af;
  }

  &:hover {
    border-color: #c5cad1;
  }

  &:focus {
    border-color: #b3873f;

    box-shadow: 0 0 0 3px rgba(179, 135, 63, 0.12);
  }

  .dark & {
    background: #181818;
    border-color: #343434;
    color: #f3f4f6;
  }

  .dark &::placeholder {
    color: #6b7280;
  }

  .dark &:hover {
    border-color: #454545;
  }

  .dark &:focus {
    border-color: #c49a52;

    box-shadow: 0 0 0 3px rgba(196, 154, 82, 0.12);
  }
`;

const LockIcon = styled.div`
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

  width: 34px;
  height: 34px;

  margin: 0;
  padding: 0;

  display: flex;
  align-items: center;
  justify-content: center;

  transform: translateY(-50%);

  border: none;
  border-radius: 8px;

  background: transparent;

  color: #9ca3af;

  cursor: pointer;

  box-shadow: none;

  transition:
    background 150ms ease,
    color 150ms ease;

  &:hover {
    background: #f1f3f5;

    color: #374151;

    transform: translateY(-50%);

    box-shadow: none;
  }

  &:active {
    transform: translateY(-50%);
  }

  .dark & {
    color: #6b7280;
  }

  .dark &:hover {
    background: #262626;
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
