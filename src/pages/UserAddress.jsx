/* eslint-disable react/no-unescaped-entities */
import { useState, useCallback } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const initialForm = {
  street: "",
  city: "",
  state: "",
  pincode: "",
  country: "India",
  isDefault: false,
};

// ---------------------- Input Component ----------------------
function Input({ id, label, placeholder, value, onChange, error, type = "text", required = true }) {
  const describedBy = error ? `${id}-error` : undefined;
  return (
    <div className="flex flex-col gap-2">
      <label htmlFor={id} className="text-sm font-medium text-zinc-200">
        {label} {required && <span className="text-zinc-400">(required)</span>}
      </label>
      <input
        id={id}
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        aria-invalid={!!error}
        aria-describedby={describedBy}
        className="w-full rounded-lg border border-zinc-800 bg-[#0b0b0b] px-4 py-2 text-zinc-100 placeholder:text-zinc-500 transition
                   hover:border-zinc-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#facc15]"
      />
      {error && <p id={`${id}-error`} className="text-sm text-[#facc15]">{error}</p>}
    </div>
  );
}

// ---------------------- Page Component ----------------------
export default function Page() {
  const navigate = useNavigate();
  const [form, setForm] = useState(initialForm);
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState("");

  const email = localStorage.getItem("userEmail");

  // Stable setField using useCallback
  const setField = useCallback((name, value) => {
    setForm(prev => ({ ...prev, [name]: value }));
    setErrors(prev => ({ ...prev, [name]: "" }));
  }, []);

  // ---------------------- Validation ----------------------
  const validate = () => {
    const nextErrors = {};

    if (!form.street.trim()) nextErrors.street = "Street is required.";
    if (!form.city.trim()) nextErrors.city = "City is required.";
    if (!form.state.trim()) nextErrors.state = "State is required.";
    if (!form.country.trim()) nextErrors.country = "Country is required.";

    if (!form.pincode.trim()) {
      nextErrors.pincode = "Pincode is required.";
    } else if (!/^\d{6}$/.test(form.pincode.replace(/\D/g, ""))) {
      nextErrors.pincode = "Enter a valid 6-digit PIN code.";
    }

    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  // ---------------------- Submit Handler ----------------------
  const handleSubmit = async (e) => {
    e.preventDefault();
    setSuccess("");
    if (!validate()) return;

    setSubmitting(true);
    try {
      const result = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/user-details/create-user-address`, {
        email,
        street: form.street.trim(),
        city: form.city.trim(),
        state: form.state.trim(),
        pincode: form.pincode.trim(),
        country: form.country.trim(),
        isDefault: !!form.isDefault,
      });

      if (result.status === 200 || result.data.success) {
        setSuccess("Address saved successfully.");
        setForm(initialForm);
        navigate("/setting");
      }
    } catch (_err) {
      setErrors(prev => ({ ...prev, submit: "Failed to save address. Please try again." }));
    } finally {
      setSubmitting(false);
    }
  };

  const navigateToSetting = () => navigate("/setting");

  // ---------------------- JSX ----------------------
  return (
    <main className="min-h-screen bg-[#0b0b0b] text-zinc-100">
      <div className="mx-auto flex min-h-screen max-w-xl items-center justify-center px-4 py-10">
        <div className="w-full rounded-2xl border border-zinc-900 bg-black/50 p-6 shadow-lg">

          {/* Header */}
          <header className="mb-6 flex items-center justify-between">
            <h1 className="text-pretty text-2xl font-semibold tracking-tight text-zinc-100">Add New Address</h1>
            <button
              onClick={navigateToSetting}
              className="inline-flex items-center gap-2 rounded-lg border border-zinc-800 bg-transparent px-3 py-1.5 text-sm text-zinc-200 transition
                         hover:border-zinc-700 hover:bg-zinc-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#facc15]"
            >
              <span aria-hidden className="-ml-1">{"←"}</span> Back
            </button>
          </header>

          {/* Success / Submit Error */}
          {success && <div role="status" className="mb-4 rounded-lg border border-[#facc15]/30 bg-[#facc15]/10 px-4 py-3 text-sm text-[#facc15]">{success}</div>}
          {errors.submit && <div role="alert" className="mb-4 rounded-lg border border-yellow-700/40 bg-yellow-900/20 px-4 py-3 text-sm text-[#facc15]">{errors.submit}</div>}

          {/* Form */}
          <form onSubmit={handleSubmit} className="flex flex-col gap-5">
            <Input
              id="street"
              label="Street"
              placeholder="e.g., 221B Baker Street"
              value={form.street}
              onChange={(e) => setField("street", e.target.value)}
              error={errors.street}
            />

            <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
              <Input
                id="city"
                label="City"
                placeholder="e.g., Mumbai"
                value={form.city}
                onChange={(e) => setField("city", e.target.value)}
                error={errors.city}
              />
              <Input
                id="state"
                label="State"
                placeholder="e.g., Maharashtra"
                value={form.state}
                onChange={(e) => setField("state", e.target.value)}
                error={errors.state}
              />
            </div>

            <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
              <Input
                id="pincode"
                label="Pincode"
                placeholder="e.g., 400001"
                value={form.pincode}
                onChange={(e) => setField("pincode", e.target.value)}
                error={errors.pincode}
              />
              <Input
                id="country"
                label="Country"
                placeholder="Country"
                value={form.country}
                onChange={(e) => setField("country", e.target.value)}
                error={errors.country}
              />
            </div>

            {/* isDefault */}
            <div className="flex items-start gap-3 rounded-lg border border-zinc-800 p-4">
              <input
                id="isDefault"
                type="checkbox"
                checked={form.isDefault}
                onChange={(e) => setField("isDefault", e.target.checked)}
                className="mt-1 h-5 w-5 cursor-pointer rounded border-zinc-700 bg-[#0b0b0b] text-[#facc15]
                           focus:outline-none focus-visible:ring-2 focus-visible:ring-[#facc15]"
              />
              <div className="flex-1">
                <label htmlFor="isDefault" className="block text-sm font-medium text-zinc-200">Set as default address</label>
                <p className="text-sm text-zinc-400">Use this address as your default for deliveries and billing.</p>
              </div>
            </div>

            {/* Actions */}
            <div className="mt-2 flex items-center justify-end gap-3">
              <button
                type="button"
                onClick={navigateToSetting}
                className="rounded-lg px-4 py-2 text-sm text-zinc-300 transition hover:text-zinc-200
                           focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#facc15]"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={submitting}
                className="inline-flex items-center justify-center rounded-lg bg-[#facc15] px-5 py-2.5 text-sm font-semibold text-[#0b0b0b] transition
                           hover:bg-[#eab308] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#facc15]
                           disabled:cursor-not-allowed disabled:opacity-80"
              >
                {submitting ? "Saving..." : "Save Address"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </main>
  );
}
