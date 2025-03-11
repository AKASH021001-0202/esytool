import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ChevronLeftIcon, EyeCloseIcon, EyeIcon } from "../../icons";
import Label from "../form/Label";
import Input from "../form/input/InputField";
import Checkbox from "../form/input/Checkbox";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";

export default function SignUpForm() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isChecked, setIsChecked] = useState(false);
  const [formData, setFormData] = useState(() => {
    // Retrieve form data from localStorage on component mount
    const savedFormData = localStorage.getItem("signUpFormData");
    return savedFormData ? JSON.parse(savedFormData) : {
      name: "",
      phone: "",
      email: "",
      password: "",
      confirmPassword: "",
    };
  });
  const [errors, setErrors] = useState({
    passwordMatch: "",
    passwordStrength: "",
    phoneFormat: "",
  });

  useEffect(() => {
    // Save form data to localStorage whenever it changes
    localStorage.setItem("signUpFormData", JSON.stringify(formData));
  }, [formData]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });

    // Validate password match
    if (name === "confirmPassword" || name === "password") {
      setErrors({
        ...errors,
        passwordMatch:
          name === "confirmPassword" && value !== formData.password
            ? "Passwords do not match"
            : "",
      });
    }

    // Validate password strength
    if (name === "password") {
      const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;
      setErrors({
        ...errors,
        passwordStrength: !passwordRegex.test(value)
          ? "Password must be at least 8 characters long and include a letter, number, and special character."
          : "",
      });
    }

    // Validate phone number format
    if (name === "phone") {
      const phoneRegex = /^\d{10}$/;
      setErrors({
        ...errors,
        phoneFormat: !phoneRegex.test(value) ? "Phone number must be 10 digits." : "",
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Check if passwords match
    if (formData.password !== formData.confirmPassword) {
      setErrors({ ...errors, passwordMatch: "Passwords do not match" });
      toast.error("Passwords do not match.");
      return;
    }

    // Check password strength
    if (errors.passwordStrength) {
      toast.error(errors.passwordStrength);
      return;
    }

    // Check phone number format
    if (errors.phoneFormat) {
      toast.error(errors.phoneFormat);
      return;
    }

    // Submit form data
    try {
      console.log("Submitting form data:", formData); // Debugging
      const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/registers`, formData);
      console.log("Registration Response:", response.data); // Debugging

      // Clear form data from localStorage after successful submission
      localStorage.removeItem("signUpFormData");

      // Show success message and redirect
      toast.success("Registration successful! Redirecting to login...");
      setTimeout(() => {
        navigate("/signin");
      }, 3000);
    } catch (error: any) {
      console.error("Registration Error:", error.response?.data || error.message); // Debugging
      toast.error(error.response?.data?.message || "Registration failed. Please try again.");
    }
  };

  return (
    <div className="flex flex-col flex-1 w-full overflow-y-auto lg:w-1/2 no-scrollbar">
      <ToastContainer /> {/* Add ToastContainer to render toast messages */}
      <div className="w-full max-w-md mx-auto mb-5 sm:pt-10">
        <Link
          to="/"
          className="inline-flex items-center text-sm text-gray-500 transition-colors hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
        >
          <ChevronLeftIcon className="size-5" />
          Back to dashboard
        </Link>
      </div>
      <div className="flex flex-col justify-center flex-1 w-full max-w-md mx-auto">
        <div>
          <div className="mb-5 sm:mb-8">
            <h1 className="mb-2 font-semibold text-gray-800 text-title-sm dark:text-white/90 sm:text-title-md">
              Sign Up
            </h1>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Create your account to get started!
            </p>
          </div>
          <div>
            <form onSubmit={handleSubmit}>
              <div className="space-y-5">
                {/* Name */}
                <div>
                  <Label>
                    Name<span className="text-error-500">*</span>
                  </Label>
                  <Input
                    type="text"
                    id="name"
                    name="name"
                    placeholder="Enter your full name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required={true}
                  />
                </div>

                {/* Phone */}
                <div>
                  <Label>
                    Phone<span className="text-error-500">*</span>
                  </Label>
                  <Input
                    type="tel"
                    id="phone"
                    name="phone"
                    placeholder="Enter your phone number"
                    value={formData.phone}
                    onChange={handleInputChange}
                    required={true}
                  />
                  {errors.phoneFormat && (
                    <p className="text-sm text-red-500">{errors.phoneFormat}</p>
                  )}
                </div>

                {/* Email */}
                <div>
                  <Label>
                    Email<span className="text-error-500">*</span>
                  </Label>
                  <Input
                    type="email"
                    id="email"
                    name="email"
                    placeholder="Enter your email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required={true}
                  />
                </div>

                {/* Password */}
                <div>
                  <Label>
                    Password<span className="text-error-500">*</span>
                  </Label>
                  <div className="relative">
                    <Input
                      type={showPassword ? "text" : "password"}
                      id="password"
                      name="password"
                      placeholder="Enter your password"
                      value={formData.password}
                      onChange={handleInputChange}
                      required={true}
                    />
                    <span
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute z-30 -translate-y-1/2 cursor-pointer right-4 top-1/2"
                    >
                      {showPassword ? (
                        <EyeIcon className="fill-gray-500 dark:fill-gray-400 size-5" />
                      ) : (
                        <EyeCloseIcon className="fill-gray-500 dark:fill-gray-400 size-5" />
                      )}
                    </span>
                  </div>
                  {errors.passwordStrength && (
                    <p className="text-sm text-red-500">{errors.passwordStrength}</p>
                  )}
                </div>

                {/* Confirm Password */}
                <div>
                  <Label>
                    Confirm Password<span className="text-error-500">*</span>
                  </Label>
                  <div className="relative">
                    <Input
                      type={showConfirmPassword ? "text" : "password"}
                      id="confirmPassword"
                      name="confirmPassword"
                      placeholder="Confirm your password"
                      value={formData.confirmPassword}
                      onChange={handleInputChange}
                      required={true}
                    />
                    <span
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      className="absolute z-30 -translate-y-1/2 cursor-pointer right-4 top-1/2"
                    >
                      {showConfirmPassword ? (
                        <EyeIcon className="fill-gray-500 dark:fill-gray-400 size-5" />
                      ) : (
                        <EyeCloseIcon className="fill-gray-500 dark:fill-gray-400 size-5" />
                      )}
                    </span>
                  </div>
                  {errors.passwordMatch && (
                    <p className="text-sm text-red-500">{errors.passwordMatch}</p>
                  )}
                </div>

                {/* Checkbox */}
                <div className="flex items-center gap-3">
                  <Checkbox
                    className="w-5 h-5"
                    checked={isChecked}
                    onChange={(checked) => setIsChecked(checked)} 
                  />
                  <p className="inline-block font-normal text-gray-500 dark:text-gray-400">
                    By creating an account means you agree to the{" "}
                    <span className="text-gray-800 dark:text-white/90">
                      Terms and Conditions,
                    </span>{" "}
                    and our{" "}
                    <span className="text-gray-800 dark:text-white">
                      Privacy Policy
                    </span>
                  </p>
                </div>

                {/* Button */}
                <div>
                  <button
                    type="submit"
                    className="flex items-center justify-center w-full px-4 py-3 text-sm font-medium text-white transition rounded-lg bg-brand-500 shadow-theme-xs hover:bg-brand-600"
                  >
                    Sign Up
                  </button>
                </div>
              </div>
            </form>

            <div className="mt-5">
              <p className="text-sm font-normal text-center text-gray-700 dark:text-gray-400 sm:text-start">
                Already have an account?
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
    </div>
  );
}