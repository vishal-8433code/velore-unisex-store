import { useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Alert, AlertDescription, AlertTitle } from "../components/ui/alert"
import { CheckCircle, AlertCircle } from "lucide-react"

export default function VeloreSignup() {
  // form state
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    phone: "",
  });
  const [message, setMessage] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  // handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // handle submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage(null);
    setLoading(true); // ✅ Start loading

    try {
      const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/auth/signup`, {
        email: formData.email,
        password: formData.password,
        phone: formData.phone,
      });

      if (response.data.success || response.status === 200) {
        // ✅ Save email to localStorage
        localStorage.setItem("userEmail", formData.email);
        setMessage({
          type: "success",
          text: "Signup successful! Redirecting... to Verify Code",
        });
        setTimeout(() => navigate("/verify"), 1500);
      }
    } catch (error) {
      console.error(error.response?.data || error.message);
      setMessage({
        type: "error",
        text: error.response?.data?.message || "Something went wrong while signup",
      });
    } finally {
      setLoading(false); // ✅ Stop loading
    }

    console.log("Form Submitted:", formData);
  };

  return (
    <>
      <main className="min-h-screen bg-black text-white flex items-center justify-center px-4 py-8">
        <Navbar />
        {/* Card */}
        <section
          className="
            mt-10
            relative w-full max-w-lg
            rounded-2xl border border-zinc-800/70 bg-zinc-950
            shadow-[0_0_0_1px_rgba(255,255,255,0.02),0_20px_60px_-20px_rgba(0,0,0,0.6)]
            px-4 py-6 sm:px-8 sm:py-8 md:px-10 md:py-10
          "
          aria-label="Sign up form"
        >
          <div className="absolute -top-0.5 left-0 right-0 h-1.5 rounded-t-2xl bg-yellow-400" />

          {/* Header */}
          <header className="flex flex-col items-center gap-4 pt-2 sm:pt-0">
            <svg
              aria-hidden="true"
              className="h-12 w-12 text-yellow-400"
              viewBox="0 0 64 64"
              fill="none"
              stroke="currentColor"
              strokeWidth="4"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M8 14l24 38L56 14" />
              <path d="M14 14l18 28L50 14" />
              <path d="M20 14l12 18L44 14" />
            </svg>
            <div className="text-yellow-400 tracking-[0.3em] text-xs sm:text-sm font-medium">
              VELORÉ
            </div>
            <div className="text-center space-y-2">
              <h1 className="text-2xl sm:text-3xl font-semibold tracking-tight text-balance">
                Admin Sign Up
              </h1>
              <p className="text-zinc-400 text-sm sm:text-base">
                Create your admin account securely
              </p>
            </div>
          </header>

          {/* Form */}
          <form onSubmit={handleSubmit} className="mt-6 sm:mt-8 space-y-5">
            {/* Email */}
            <div className="space-y-2">
              <label htmlFor="email" className="block text-sm font-medium">
                Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                autoComplete="email"
                placeholder="velore@admin.com"
                value={formData.email}
                onChange={handleChange}
                className="
                  w-full h-11 sm:h-12
                  rounded-xl border border-zinc-800 bg-zinc-900/60
                  px-4 text-sm sm:text-base
                  placeholder-zinc-500
                  outline-none focus-visible:ring-2 focus-visible:ring-yellow-500/40
                  transition
                "
              />
            </div>

            {/* Password */}
            <div className="space-y-2">
              <label htmlFor="password" className="block text-sm font-medium">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                required
                autoComplete="new-password"
                placeholder="••••••••"
                value={formData.password}
                onChange={handleChange}
                className="
                  w-full h-11 sm:h-12
                  rounded-xl border border-zinc-800 bg-zinc-900/60
                  px-4 text-sm sm:text-base
                  placeholder-zinc-500
                  outline-none focus-visible:ring-2 focus-visible:ring-yellow-500/40
                  transition
                "
              />
            </div>

            {/* Number */}
            <div className="space-y-2">
              <label htmlFor="number" className="block text-sm font-medium">
                Number
              </label>
              <input
                id="phone"
                name="phone"
                type="tel"
                inputMode="numeric"
                pattern="[0-9]*"
                placeholder="1234567890"
                value={formData.phone}
                onChange={handleChange}
                className="
                  w-full h-11 sm:h-12
                  rounded-xl border border-zinc-800 bg-zinc-900/60
                  px-4 text-sm sm:text-base
                  placeholder-zinc-500
                  outline-none focus-visible:ring-2 focus-visible:ring-yellow-500/40
                  transition
                "
              />
            </div>
            {message && (
              <Alert
                variant={message.type === "success" ? "default" : "destructive"}
              >
                {message.type === "success" ? (
                  <CheckCircle className="h-4 w-4" />
                ) : (
                  <AlertCircle className="h-4 w-4" />
                )}
                <AlertTitle>
                  {message.type === "success" ? "Success" : "Error"}
                </AlertTitle>
                <AlertDescription>{message.text}</AlertDescription>
              </Alert>
            )}

            {/* Submit */}
            <button
              type="submit"
              disabled={loading} // ✅ jab loading ho to button disable
              className={`
    w-full h-11 sm:h-12
    rounded-xl bg-yellow-400 text-black
    font-semibold text-sm sm:text-base
    shadow-[0_6px_0_0_rgba(0,0,0,0.2)]
    transition
    ${loading ? "opacity-70 cursor-not-allowed" : "hover:brightness-95"} 
  `}
            >
              {loading ? "Submitting..." : "Sign Up"}
            </button>
          </form>

          {/* Footer */}
          <footer className="mt-6 sm:mt-8 text-center">
            <p className="text-zinc-500 text-xs sm:text-sm">
              Protected area • Authorized personnel only
            </p>
            <p className="mt-3 text-zinc-400 text-xs sm:text-sm">
              Already have an account?{" "}
              <a
                href="/login"
                className="text-yellow-400 hover:underline underline-offset-4"
                aria-label="Go to Sign In page"
              >
                Sign In
              </a>
            </p>
          </footer>
        </section>
      </main>
      <div className="-mt-20">
        <Footer />
      </div>
    </>
  );
}
