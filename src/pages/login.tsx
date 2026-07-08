/* eslint-disable @typescript-eslint/no-unused-vars */
import { useState, useEffect } from "react";
import { toast } from "sonner";
import bgImage from "../assets/image/login1.png";
import { AnimatePresence } from "framer-motion";
import { usePasswordToggle } from "../hooks/usePasswordToggle";
import LottieLoader from "../utils/LottieLoader";
import { useAuth } from "../hooks/useAuth";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [loading, setLoading] = useState(false);
  const [isCheckingAuth, setIsCheckingAuth] = useState(true);
  const [passwordType, ToggleIcon] = usePasswordToggle();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  // console.log(login);

  useEffect(() => {
    const token = localStorage.getItem("accessToken");

    if (token) {
      navigate("/", {
        replace: true,
      });
      return;
    }
    setIsCheckingAuth(false);
  }, [navigate]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!formData.email || !formData.password) {
      toast.error("Please enter email and password.");
      return;
    }

    try {
      setLoading(true);

      await login({
        email: formData.email.trim(),
        password: formData.password.trim(),
      });

      toast.success("Login Successful");

      navigate("/", {
        replace: true,
      });
    } catch (error: any) {
      toast.error(error?.response?.data?.message ?? "Login failed.");
    } finally {
      setLoading(false);
    }
  };

  if (isCheckingAuth) {
    return (
      <AnimatePresence>
        <LottieLoader />
      </AnimatePresence>
    );
  }

  return (
    <div
      className="relative min-h-screen w-full flex items-center justify-center overflow-hidden bg-[#f0f0ee] px-4"
      style={{
        backgroundImage: `url(${bgImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="absolute inset-0 bg-white/19 backdrop-blur-[2px]" />

      <div className="relative z-10 w-full max-w-105">
        <div className="rounded-3xl border border-gray-200/80 bg-white shadow-[0_8px_40px_rgba(0,0,0,0.07)] overflow-hidden">
          <div className="h-0.5 bg-linear-to-r from-gray-900 via-gray-500 to-gray-900" />
          <div className="px-8 py-10">
            {/* Brand */}
            <div className="mb-8 flex items-center justify-center gap-3">
              <img
                src="/logo.png"
                className="h-9 w-auto object-contain"
                alt="ERP SHOP Logo"
              />
              <span className="text-xl font-bold tracking-tight text-slate-900 dark:text-slate-50">
                ERP SHOP
              </span>
            </div>
            <form
              onSubmit={handleSubmit}
              autoComplete="on"
              className="space-y-5"
            >
              {/* Email */}
              <div>
                <label
                  htmlFor="adminemail"
                  className="block text-[11px] font-medium uppercase tracking-widest text-gray-400 mb-2"
                >
                  Email address
                </label>
                <div className="relative">
                  <svg
                    className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                    />
                  </svg>
                  <input
                    type="email"
                    name="email"
                    id="email"
                    value={formData.email}
                    onChange={handleChange}
                    autoComplete="username"
                    disabled={loading}
                    placeholder="Enter your email"
                    className="h-11 w-full rounded-xl border border-gray-200 bg-gray-50 pl-10 pr-4 text-sm text-gray-800 outline-none transition-all placeholder:text-gray-300 focus:border-gray-900 focus:bg-white focus:ring-2 focus:ring-gray-900/8 disabled:opacity-50"
                  />
                </div>
              </div>
              <div>
                <label
                  htmlFor="password"
                  className="block text-[11px] font-medium uppercase tracking-widest text-gray-400 mb-2"
                >
                  Password
                </label>
                <div className="relative">
                  <svg
                    className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                    />
                  </svg>
                  <input
                    type={
                      typeof passwordType === "string"
                        ? passwordType
                        : "password"
                    }
                    name="password"
                    id="password"
                    value={formData.password}
                    onChange={handleChange}
                    autoComplete="current-password"
                    disabled={loading}
                    placeholder="Enter your password"
                    className="h-11 w-full rounded-xl border border-gray-200 bg-gray-50 pl-10 pr-11 text-sm text-gray-800 outline-none transition-all placeholder:text-gray-300 focus:border-gray-900 focus:bg-white focus:ring-2 focus:ring-gray-900/8 disabled:opacity-50"
                  />
                  <span className="absolute right-3.5 top-1/2 -translate-y-1/2 cursor-pointer text-gray-400 hover:text-gray-700 transition-colors">
                    {ToggleIcon}
                  </span>
                </div>
              </div>
              <button
                type="submit"
                disabled={loading}
                className="mt-1 flex h-11 w-full cursor-pointer items-center justify-center gap-2 rounded-xl bg-gray-900 text-[14px] font-medium text-white transition-all hover:bg-black active:scale-[0.99] disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {loading ? (
                  <>
                    <svg
                      className="h-4 w-4 animate-spin"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="3"
                      />
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                      />
                    </svg>
                    <span>Authenticating...</span>
                  </>
                ) : (
                  <>
                    <span>Login</span>
                    <svg
                      className="h-4 w-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M13 7l5 5m0 0l-5 5m5-5H6"
                      />
                    </svg>
                  </>
                )}
              </button>
            </form>
            <div className="mt-8 flex items-center gap-3">
              <div className="flex-1 h-px bg-gray-100" />
              <span className="text-[10px] tracking-[0.25em] uppercase text-gray-600">
                Secure access
              </span>
              <div className="flex-1 h-px bg-gray-100" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
