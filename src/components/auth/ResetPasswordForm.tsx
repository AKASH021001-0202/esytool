import { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import Label from "../form/Label";
import Input from "../form/input/InputField";
import { EyeCloseIcon, EyeIcon } from "../../icons";

const BASE_URL = import.meta.env.VITE_BACKEND_URL || "http://localhost:5000";

export default function ResetPasswordForm() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!password || !confirmPassword) {
      toast.error("Please fill in all fields.");
      return;
    }

    if (password !== confirmPassword) {
      toast.error("Passwords do not match.");
      return;
    }

    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
    if (!passwordRegex.test(password)) {
      toast.error("Password must be at least 8 characters long and include at least one letter and one number.");
      return;
    }

    if (!token) {
      toast.error("Invalid or missing reset token.");
      return;
    }

    try {
      setLoading(true);
      await axios.post(`${BASE_URL}/reset-password`, { newPassword: password, token });
      toast.success("Password reset successful! Redirecting to login...");
      setTimeout(() => navigate("/signin"), 3000);
    } catch (error:any) {
      const errMsg = error.response?.data?.message || "Something went wrong. Please try again.";
      toast.error(errMsg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col flex-1 w-full max-w-md m-auto">
      <ToastContainer />
      <h1 className="mb-2 font-semibold text-gray-800 text-title-sm dark:text-white/90 sm:text-title-md">
        Reset Password
      </h1>
      <p className="text-sm text-gray-500 dark:text-gray-400">
        Enter your new password to reset your account.
      </p>
      <form onSubmit={handleSubmit} className="space-y-5 mt-5">
        <div>
          <Label>New Password<span className="text-error-500">*</span></Label>
          <div className="relative">
            <Input
              type={showPassword ? "text" : "password"}
              placeholder="Enter new password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <span
              onClick={() => setShowPassword(!showPassword)}
              className="absolute cursor-pointer right-4 top-1/2 -translate-y-1/2"
            >
              {showPassword ? <EyeIcon className="size-5" /> : <EyeCloseIcon className="size-5" />}
            </span>
          </div>
        </div>
        <div>
          <Label>Confirm Password<span className="text-error-500">*</span></Label>
          <div className="relative">
            <Input
              type={showConfirmPassword ? "text" : "password"}
              placeholder="Confirm new password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
            <span
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className="absolute cursor-pointer right-4 top-1/2 -translate-y-1/2"
            >
              {showConfirmPassword ? <EyeIcon className="size-5" /> : <EyeCloseIcon className="size-5" />}
            </span>
          </div>
        </div>
        <button
          type="submit"
          disabled={loading}
          className="w-full px-4 py-3 text-white font-medium bg-brand-500 rounded-lg hover:bg-brand-600 disabled:bg-gray-400"
        >
          {loading ? "Resetting..." : "Reset Password"}
        </button>
      </form>
    </div>
  );
}