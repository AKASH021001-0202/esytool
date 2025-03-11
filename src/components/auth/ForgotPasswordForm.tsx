import { useState, ChangeEvent, FormEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ChevronLeftIcon } from "../../icons";
import Label from "../form/Label";
import Input from "../form/input/InputField";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios"; // Removed { AxiosError }




export default function ForgotPasswordForm() {
  const [email, setEmail] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const navigate = useNavigate();

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };


  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!email) {
      toast.error("Please enter your email address.");
      return;
    }

    try {
      setLoading(true);
      const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/forget-password`, { email });

      toast.success(response.data.message || "Password reset link sent! Check your email.");
      setEmail("");
      setTimeout(() => {
        navigate("/reset-password");
      }, 3000);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        toast.error(error.response?.data?.message || "Something went wrong. Please try again.");
      } else {
        toast.error("Something went wrong. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col flex-1">
      <ToastContainer />
      <div className="w-full max-w-md pt-10 m-auto">
        <Link
          to="/signin"
          className="inline-flex items-center text-sm text-gray-500 transition-colors hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
          aria-label="Back to Sign In"
        >
          <ChevronLeftIcon className="size-5" />
          Back to Sign In
        </Link>
      </div>
      <div className="flex flex-col justify-center flex-1 w-full max-w-md mx-auto">
        <div>
          <div className="mb-5 sm:mb-8">
            <h1 className="mb-2 font-semibold text-gray-800 text-title-sm dark:text-white/90 sm:text-title-md">
              Forgot Password
            </h1>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Enter your email to receive a password reset link.
            </p>
          </div>
          <form onSubmit={handleSubmit}>
            <div className="space-y-5">
              <div>
                <Label htmlFor="email">
                  Email<span className="text-error-500">*</span>
                </Label>
                <Input
                  type="email"
                  id="email"
                  name="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={handleInputChange}
                  required
                  aria-required="true"
                />
              </div>
              <div>
                <button
                  type="submit"
                  disabled={loading}
                  className="flex items-center justify-center w-full px-4 py-3 text-sm font-medium text-white transition rounded-lg bg-brand-500 shadow-theme-xs hover:bg-brand-600 disabled:bg-gray-400"
                >
                  {loading ? "Sending..." : "Send Reset Link"}
                </button>
              </div>
            </div>
          </form>
          <div className="mt-5">
            <p className="text-sm font-normal text-center text-gray-700 dark:text-gray-400 sm:text-start">
              Remember your password?&nbsp;
              <Link
                to="/signin"
                className="text-brand-500 hover:text-brand-600 dark:text-brand-400"
              >
                Sign In
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}