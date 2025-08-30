import React from "react"
import { useForm } from "react-hook-form"
import { useNavigate } from "react-router-dom"
import { VeloreLogo } from '../components/icons/VeloreLogo.jsx';

export default function AdminLogin() {
  const navigate = useNavigate()
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm()

  const [loginFailed, setLoginFailed] = React.useState(false)

  const onSubmit = async (values) => {
    const isAuthorized =
      values.email === "vs1020847@gmail.com" &&
      values.password === "vishal8433"

    if (isAuthorized) {
      setLoginFailed(false)
      navigate("/admin-dashboard")
      return
    }

    // Show a small error alert, then navigate to /home
    setLoginFailed(true)
    // brief delay so the user notices the alert
    setTimeout(() => {
      navigate("/")
    }, 1200)
    reset({ password: "" })
  }

  return (
    <main className="min-h-screen w-full bg-black text-white flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="relative overflow-hidden rounded-2xl border border-neutral-800 bg-neutral-950/70 shadow-xl backdrop-blur-sm">
          {/* Top Accent Border */}
          <div className="h-1 w-full bg-yellow-400" />

          <div className="p-8">
            {/* Velore Logo */}
            <div className="w-full flex items-center justify-center mb-6">
              <div className="flex flex-col items-center">
                {/* Simple premium "V" mark in yellow */}
                <VeloreLogo className="text-yellow-500"/>
                <span className="mt-2 text-sm tracking-widest text-yellow-400/90 uppercase">
                 VELORÉ
                </span>
              </div>
            </div>

            {/* Heading */}
            <div className="text-center mb-6">
              <h1 className="text-2xl font-semibold tracking-tight text-pretty">
                Admin Login
              </h1>
              <p className="mt-1 text-sm text-neutral-400">
                Access your admin dashboard securely
              </p>
            </div>

            {/* Error Alert */}
            {loginFailed && (
              <div
                role="alert"
                className="mb-4 rounded-lg border border-yellow-500/30 bg-yellow-500/10 px-3 py-2 text-sm text-yellow-300"
              >
                Invalid email or password. Redirecting to Home…
              </div>
            )}

            {/* Form */}
            <form onSubmit={handleSubmit(onSubmit)} noValidate>
              <div className="space-y-4">
                {/* Email */}
                <div>
                  <label
                    htmlFor="email"
                    className="mb-1 block text-sm text-neutral-300"
                  >
                    Email
                  </label>
                  <input
                    id="email"
                    type="email"
                    inputMode="email"
                    autoComplete="email"
                    placeholder="velore@admin.com"
                    className="w-full rounded-lg border border-neutral-800 bg-neutral-900/70 px-3 py-2 text-[15px] text-white placeholder-neutral-500 outline-none ring-0 transition focus:border-yellow-400 focus:ring-2 focus:ring-yellow-400"
                    {...register("email", {
                      required: "Email is required",
                      pattern: {
                        value:
                          /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                        message: "Enter a valid email address",
                      },
                    })}
                  />
                  {errors.email && (
                    <p className="mt-1 text-xs text-yellow-400">
                      {errors.email.message}
                    </p>
                  )}
                </div>

                {/* Password */}
                <div>
                  <label
                    htmlFor="password"
                    className="mb-1 block text-sm text-neutral-300"
                  >
                    Password
                  </label>
                  <input
                    id="password"
                    type="password"
                    autoComplete="current-password"
                    placeholder="••••••••"
                    className="w-full rounded-lg border border-neutral-800 bg-neutral-900/70 px-3 py-2 text-[15px] text-white placeholder-neutral-500 outline-none ring-0 transition focus:border-yellow-400 focus:ring-2 focus:ring-yellow-400"
                    {...register("password", {
                      required: "Password is required",
                      minLength: {
                        value: 6,
                        message: "Password must be at least 6 characters",
                      },
                    })}
                  />
                  {errors.password && (
                    <p className="mt-1 text-xs text-yellow-400">
                      {errors.password.message}
                    </p>
                  )}
                </div>

                {/* Submit */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="group relative inline-flex w-full items-center justify-center gap-2 overflow-hidden rounded-lg bg-yellow-400 px-4 py-2.5 text-sm font-medium text-black transition hover:bg-yellow-300 focus:outline-none focus:ring-4 focus:ring-yellow-500/30 disabled:cursor-not-allowed disabled:opacity-60"
                >
                  <span className="relative z-10">
                    {isSubmitting ? "Signing in…" : "Sign In"}
                  </span>
                </button>
              </div>
            </form>

            {/* Footer */}
            <div className="mt-6 text-center">
              <p className="text-xs text-neutral-500">
                Protected area • Authorized personnel only
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}