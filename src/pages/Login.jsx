import { useState } from "react"
import { Label } from "../components/ui/label"
import { Input } from "../components/ui/input"
import { Button } from "../components/ui/button"
import { cn } from "../lib/utils"
import Navbar from "../components/Navbar.jsx"
import Footer from "../components/Footer.jsx"

function VeloreMark({ className }) {
  // Triple-stroke "V" emblem
  return (
    <svg
      viewBox="0 0 64 64"
      aria-hidden="true"
      className={cn("h-12 w-12 text-[#facc15]", className)}
      fill="none"
      stroke="currentColor"
      strokeWidth="5.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M8 16l24 40L56 16" />
      <path d="M16 16l16 28L48 16" />
      <path d="M24 16l8 16 8-16" />
    </svg>
  )
}

export default function LoginCard() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  return (
    <>
    <div className="w-svw h-svh flex justify-center items-center p-4 bg-black">
      <Navbar/>
      <section
        aria-label="Admin login"
        className="
      mt-8
          relative 
          w-full 
          max-w-md              /* mobile par full width, max 400-500px */
          sm:max-w-lg           /* tablet thoda bada */
          md:max-w-xl           /* medium screens */
          lg:w-1/2              /* large screens 50% */
          xl:w-1/3              /* desktop screens 33% */
          rounded-2xl 
          border border-neutral-800 
          bg-[#0b0b0b] 
          p-6 sm:p-8 
          shadow-[0_12px_36px_rgba(0,0,0,0.5)]
        "
      >
        <div aria-hidden="true" className="absolute inset-x-0 -top-[1px] mx-3 h-1.5 rounded-t-xl bg-[#facc15]" />

        <div className="flex flex-col items-center text-center">
          <VeloreMark />
          <div className="mt-2 text-sm tracking-[0.18em] text-[#facc15]">VELORÉ</div>

          <h1 className="mt-6 text-2xl sm:text-3xl font-semibold text-white">Admin Login</h1>
          <p className="mt-2 max-w-sm text-sm text-neutral-300">
            Access your admin dashboard securely
          </p>
        </div>

        <form
          className="mt-8 space-y-6"
          onSubmit={(e) => {
            e.preventDefault()
            // demo only
          }}
        >
          <div className="space-y-2 text-left">
            <Label htmlFor="email" className="text-neutral-200">
              Email
            </Label>
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="h-12 rounded-md border-0 bg-[#151515] text-neutral-100 placeholder:text-neutral-500 focus-visible:ring-[#facc15]"
              placeholder="vishal@velore.com"
            />
          </div>

          <div className="space-y-2 text-left">
            <Label htmlFor="password" className="text-neutral-200">
              Password
            </Label>
            <Input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="h-12 rounded-md border-0 bg-[#151515] text-neutral-100 placeholder:text-neutral-500 focus-visible:ring-[#facc15]"
              placeholder="••••••••"
            />
          </div>

          <Button
            type="submit"
            className="h-12 w-full rounded-md bg-[#facc15] font-semibold text-black hover:bg-[#eab308]"
          >
            Sign In
          </Button>

          <div className="text-center text-sm text-neutral-300">
            {"Don't have an account? "}
            <a
              href="/signup"
              className="rounded font-medium text-[#facc15] underline-offset-4 hover:underline focus:outline-none focus-visible:ring-2 focus-visible:ring-[#facc15] focus-visible:ring-offset-2 focus-visible:ring-offset-[#0b0b0b]"
            >
              Sign up
            </a>
          </div>
        </form>

        <p className="mt-8 text-center text-sm text-neutral-400">
          Protected area • Authorized personnel only
        </p>
      </section>
    </div>
    <div className="-mt-24"><Footer/></div>
    </>
  )
}
