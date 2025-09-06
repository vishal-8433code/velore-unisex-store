import { useEffect, useMemo, useRef, useState } from "react"
import axios from "axios"
import { useNavigate } from "react-router-dom"

export default function VerifyPage() {
  const DIGITS = 6
  const [values, setValues] = useState(Array(DIGITS).fill(""))
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState("")
  const [email, setEmail] = useState("velore@user.com")
  const [success, setSuccess] = useState("")
  const [resendCount, setResendCount] = useState(0) // ✅ resend counter
  const [timer, setTimer] = useState(0) // ✅ countdown timer (seconds)
  const inputRefs = useRef([])

  const navigate = useNavigate()
  const code = useMemo(() => values.join(""), [values])
  const isComplete = code.length === DIGITS && values.every((v) => v !== "")

  useEffect(() => {
    inputRefs.current?.[0]?.focus()
    const storedEmail = localStorage.getItem("userEmail")
    if (storedEmail) setEmail(storedEmail)
  }, [])

  // ✅ Timer countdown
  useEffect(() => {
    if (timer <= 0) return
    const id = setInterval(() => {
      setTimer((prev) => prev - 1)
    }, 1000)
    return () => clearInterval(id)
  }, [timer])

  const focusIndex = (i) => {
    if (i < 0 || i >= DIGITS) return
    const el = inputRefs.current?.[i]
    if (el) {
      el.focus()
      el.select?.()
    }
  }

  const handleChange = (e, i) => {
    const raw = e.target.value
    const digits = raw.replace(/\D/g, "")
    if (digits.length > 1) {
      setValues((prev) => {
        const next = [...prev]
        let idx = i
        for (const d of digits.split("").slice(0, DIGITS - i)) {
          next[idx] = d
          idx++
        }
        return next
      })
      const nextIndex = Math.min(i + digits.length, DIGITS - 1)
      requestAnimationFrame(() => focusIndex(nextIndex))
      return
    }

    setValues((prev) => {
      const next = [...prev]
      next[i] = digits.slice(-1) || ""
      return next
    })

    if (digits) {
      requestAnimationFrame(() => focusIndex(i + 1))
    }
  }

  const handleKeyDown = (e, i) => {
    if (e.key === "Backspace") {
      if (!values[i]) {
        e.preventDefault()
        setValues((prev) => {
          const next = [...prev]
          if (i > 0) next[i - 1] = ""
          return next
        })
        requestAnimationFrame(() => focusIndex(i - 1))
      } else {
        setValues((prev) => {
          const next = [...prev]
          next[i] = ""
          return next
        })
      }
    } else if (e.key === "ArrowLeft") {
      e.preventDefault()
      focusIndex(i - 1)
    } else if (e.key === "ArrowRight") {
      e.preventDefault()
      focusIndex(i + 1)
    } else if (e.key === "Enter") {
      if (isComplete) onSubmit(e)
    }
  }

  const handlePaste = (e, i) => {
    const text = e.clipboardData.getData("text")
    if (!text) return
    const digits = text.replace(/\D/g, "")
    if (!digits) return
    e.preventDefault()

    setValues((prev) => {
      const next = [...prev]
      let idx = i
      for (const d of digits.split("").slice(0, DIGITS - i)) {
        next[idx] = d
        idx++
      }
      return next
    })
    const lastIndex = Math.min(i + digits.length - 1, DIGITS - 1)
    requestAnimationFrame(() => focusIndex(lastIndex))
  }

  const onSubmit = async (e) => {
    e.preventDefault()
    setError("")
    setSuccess("")

    if (!isComplete) {
      setError("Please enter all 6 digits of the code.")
      return
    }
    if (!/^[0-9]{6}$/.test(code)) {
      setError("OTP must be a 6-digit number.")
      return
    }

    try {
      setSubmitting(true)
      const res = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/auth/verify-code`, {
        otp: code,
        email,
      })

      if (res.data.success) {
        setSuccess("✅ Verification successful!")
        navigate("/login")
      } else {
        setError(res.data.message || "Invalid code, please try again.")
      }
    } catch (err) {
      console.error(err)
      setError("⚠️ Something went wrong, please try again.")
    } finally {
      setSubmitting(false)
    }
  }

  const onResend = async () => {
    setError("")
    setSuccess("")

    try {
      const res = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/auth/resend-otp`, {
        email,
      })
      if (res.data.success) {
        setSuccess("📩 A new code has been sent.")
        setResendCount((c) => c + 1) // ✅ count increase
        setTimer(30) // ✅ start 30s cooldown
      } else {
        setError(res.data.message || "Failed to resend code.")
      }
    } catch (err) {
      console.error(err)
      setError("⚠️ Could not resend the code.")
    }
  }

  const resendDisabled = resendCount >= 2 || timer > 0

  return (
    <main className="page" role="main" aria-labelledby="verify-heading">
      <div className="backdrop" aria-hidden="true">
        <div className="glow" />
      </div>

      <section className="card" aria-label="Verify Code form">
        <header className="header">
          <h1 id="verify-heading" className="title">Verify Your Account</h1>
          <p className="subtitle">Enter the 6-digit code sent to your email</p>
          <p>{email}</p>
        </header>

        <form className="form" onSubmit={onSubmit} noValidate>
          <fieldset className="otp" aria-label="One-time verification code">
            <legend className="sr-only">One-time verification code</legend>
            {Array.from({ length: DIGITS }).map((_, i) => (
              <input
                key={i}
                ref={(el) => (inputRefs.current[i] = el)}
                className="otp-input"
                type="text"
                inputMode="numeric"
                pattern="[0-9]*"
                maxLength={1}
                autoComplete="one-time-code"
                aria-label={`Digit ${i + 1}`}
                value={values[i]}
                onChange={(e) => handleChange(e, i)}
                onKeyDown={(e) => handleKeyDown(e, i)}
                onPaste={(e) => handlePaste(e, i)}
              />
            ))}
          </fieldset>

          {error && <p style={{ color: "red", textAlign: "center" }}>{error}</p>}
        {success && <p style={{ color: "limegreen", textAlign: "center" }}>{success}</p>}

        <button
          type="submit"
          className={`btn primary ${submitting || !isComplete ? "disabled" : ""}`}
          disabled={submitting || !isComplete}
        >
          {submitting ? "Verifying..." : "Verify"}
        </button>

        <button
          type="button"
          className="btn link"
          onClick={onResend}
          disabled={resendDisabled}
        >
          {resendCount >= 2
            ? "Resend Disabled"
            : timer > 0
            ? `Resend in ${timer}s`
            : "Resend Code"}
        </button>
        </form>
      </section>

      {/* tumhara purana <style jsx> yahan same ka same rahega */}
      <style>{`
        /* Color System (4 total):
           1) --black (background)
           2) --card (surface)
           3) --text (off-white)
           4) --yellow (accent)
        */
        .page {
          --black: #0b0b0b;
          --card: #131313;
          --text: #f5f5f5;
          --muted: rgba(245, 245, 245, 0.72); /* derived */
          --yellow: #facc15;

          min-height: 100svh;
          display: grid;
          place-items: center;
          padding: 24px;
          background:
            radial-gradient(600px 400px at 50% 18%, rgba(250, 204, 21, 0.12), transparent 60%),
            linear-gradient(180deg, #0a0a0a 0%, #000 60%);
          color: var(--text);
          font-family: ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial, "Apple Color Emoji",
            "Segoe UI Emoji";
        }

        .backdrop {
          position: fixed;
          inset: 0;
          pointer-events: none;
        }

        .glow {
          position: absolute;
          top: 45%;
          left: 50%;
          transform: translate(-50%, -50%);
          width: min(900px, 90vw);
          height: min(900px, 90vw);
          background: radial-gradient(circle, rgba(250, 204, 21, 0.16), rgba(250, 204, 21, 0) 60%);
          filter: blur(40px);
        }

        .card {
          position: relative;
          width: 100%;
          max-width: 480px;
          background: linear-gradient(180deg, rgba(255, 255, 255, 0.02), rgba(255, 255, 255, 0.01)) var(--card);
          border-radius: 20px;
          padding: clamp(20px, 4.5vw, 32px);
          box-shadow:
            0 30px 80px rgba(0, 0, 0, 0.65),
            0 1px 0 rgba(255, 255, 255, 0.06) inset,
            0 0 0 1px rgba(255, 255, 255, 0.06);
        }

        .header {
          text-align: center;
          margin-bottom: 20px;
        }

        .title {
          font-size: clamp(20px, 2.9vw, 28px);
          line-height: 1.25;
          font-weight: 700;
          letter-spacing: 0.2px;
          text-wrap: balance;
        }

        .subtitle {
          margin-top: 8px;
          font-size: clamp(13px, 1.8vw, 15px);
          color: var(--muted);
          line-height: 1.6;
        }

        .form {
          display: flex;
          flex-direction: column;
          gap: 16px;
          margin-top: 8px;
        }

        .otp {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: clamp(8px, 2vw, 12px);
          margin: 12px 0 8px;
        }

        .otp-input {
          width: clamp(44px, 10vw, 56px);
          height: clamp(52px, 12vw, 64px);
          text-align: center;
          font-size: clamp(18px, 4.2vw, 24px);
          font-weight: 600;
          color: var(--text);
          background: #0f0f0f;
          border: 1px solid rgba(255, 255, 255, 0.08);
          border-radius: 12px;
          outline: none;
          transition: transform 160ms ease, box-shadow 160ms ease, border-color 160ms ease, background 160ms ease;
        }

        .otp-input:hover {
          transform: translateY(-1px);
        }

        .otp-input:focus {
          border-color: rgba(250, 204, 21, 0.6);
          box-shadow: 0 0 0 6px rgba(250, 204, 21, 0.12);
          background: #111111;
        }

        .btn {
          appearance: none;
          border: none;
          cursor: pointer;
          border-radius: 12px;
          padding: 14px 16px;
          font-weight: 700;
          font-size: 15px;
          line-height: 1.2;
          transform: translateZ(0);
          transition: transform 160ms ease, filter 160ms ease, opacity 160ms ease, box-shadow 160ms ease;
          will-change: transform;
        }

        .btn.primary {
          background: var(--black);
          color: var(--yellow);
          box-shadow:
            0 10px 26px rgba(0, 0, 0, 0.5),
            0 0 0 1px rgba(250, 204, 21, 0.24) inset;
        }

        .btn.primary:hover {
          transform: scale(1.02);
          box-shadow:
            0 14px 34px rgba(0, 0, 0, 0.6),
            0 0 0 1px rgba(250, 204, 21, 0.34) inset;
        }

        .btn.primary:active {
          transform: scale(0.995);
        }

        .btn.primary.disabled,
        .btn.primary[disabled] {
          opacity: 0.6;
          cursor: not-allowed;
          transform: none;
        }

        .btn.link {
          align-self: center;
          background: transparent;
          color: var(--yellow);
          padding: 8px 10px;
          border-radius: 10px;
        }

        .btn.link:hover {
          transform: scale(1.02);
          filter: brightness(1.05);
        }

        /* Screen reader helper */
        .sr-only {
          position: absolute;
          width: 1px;
          height: 1px;
          padding: 0;
          margin: -1px;
          overflow: hidden;
          clip: rect(0, 0, 0, 0);
          white-space: nowrap;
          border: 0;
        }

        @media (min-width: 768px) {
          .form {
            gap: 18px;
          }
          .subtitle {
            margin-top: 10px;
          }
        }
      `}</style>
    </main>
  )
}
