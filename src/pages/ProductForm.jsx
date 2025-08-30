import React, { useEffect, useMemo, useState } from "react"
import { useForm } from "react-hook-form"
import axios from "axios"
import { useNavigate } from "react-router-dom"

/**
 * CreateProductForm.jsx
 * - No props needed. It posts directly to BACKEND_URL.
 * - Optional global override: set window.CREATE_PRODUCT_API_URL to change endpoint at runtime.
 */
const BACKEND_URL = "/api/products" // change if your backend uses a different path

export default function CreateProductForm() {
  // Options
  const categories = useMemo(
    () => ["hoodies", "shirts", "pants", "sweaters", "blazers", "jackets", "joggers"],
    []
  )
  const navigate = useNavigate()
  const navigateToDashboard = () => {
    navigate("/admin-dashboard")
  }
  const colors = useMemo(() => ["black", "white", "cream", "navy", "olive", "indigo"], [])
  const sizeOptions = useMemo(() => ["XS", "S", "M", "L", "XL"], [])

  // Toast state
  const [toast, setToast] = useState(null) // { type: 'success'|'error', message: string }

  // Image preview (derived from file input)
  const [imagePreviewUrl, setImagePreviewUrl] = useState(null)

  const {
    register,
    handleSubmit,
    watch,
    reset,
    getValues,
    resetField,
    formState: { errors, isSubmitting },
  } = useForm({
    mode: "onTouched",
    defaultValues: {
      name: "",
      description: "",
      price: undefined,
      originalPrice: undefined,
      category: "",
      color: "",
      sizes: [],
      gender: "",
      sku: "",
      stock: undefined,
      isNew: false,
      isSale: false,
      imageFile: undefined,
    },
  })

  // Watches
  const watchIsSale = watch("isSale")
  const selectedSizes = watch("sizes") || []
  const fileList = watch("imageFile")

  // Image preview effect
  useEffect(() => {
    if (!fileList || !fileList[0]) {
      setImagePreviewUrl(null)
      return
    }
    const file = fileList[0]
    const url = URL.createObjectURL(file)
    setImagePreviewUrl(url)
    return () => URL.revokeObjectURL(url)
  }, [fileList])

  // Helpers
  const clearImage = () => {
    resetField("imageFile")
    setImagePreviewUrl(null)
  }

  // Custom validator: originalPrice > price when on sale
  const validateOriginalPrice = (value) => {
    const isSale = getValues("isSale")
    const price = getValues("price")
    if (!isSale || value === undefined || value === null || value === "") return true
    const op = Number(value)
    if (isNaN(op) || isNaN(Number(price))) return true
    return op > Number(price) || "Original price should be greater than price when on sale."
  }

  const showToast = (type, message) => {
    setToast({ type, message })
    window.clearTimeout(showToast._t)
    showToast._t = window.setTimeout(() => setToast(null), 3000)
  }

  const onSubmit = async (values) => {
    try {
      const apiUrl = (typeof window !== "undefined" && window.CREATE_PRODUCT_API_URL) || BACKEND_URL

      // Build multipart/form-data for robust backend compatibility (supports optional image)
      const fd = new FormData()
      fd.append("name", values.name.trim())
      fd.append("description", (values.description || "").trim())
      fd.append("price", typeof values.price === "number" ? String(values.price) : "")
      fd.append(
        "originalPrice",
        typeof values.originalPrice === "number" ? String(values.originalPrice) : ""
      )
      fd.append("category", values.category)
      fd.append("color", values.color)
      fd.append("gender", values.gender)
      fd.append("sku", values.sku.trim())
      fd.append("stock", typeof values.stock === "number" ? String(values.stock) : "")
      fd.append("isNew", values.isNew ? "true" : "false")
      fd.append("isSale", values.isSale ? "true" : "false")
      fd.append("sizes", JSON.stringify(values.sizes || []))
      if (values.imageFile && values.imageFile[0]) {
        fd.append("imageFile", values.imageFile[0])
      }

      const res = await axios.post(apiUrl, fd, {
        headers: { "Content-Type": "multipart/form-data" },
      })

      showToast("success", "Product created successfully.")
      console.log("[CreateProductForm] response:", res?.data ?? res)
      reset()
      setImagePreviewUrl(null)
    } catch (err) {
      console.error("[CreateProductForm] submit error:", err)
      const msg =
        err?.response?.data?.message ||
        err?.message ||
        "Failed to create product. Please try again."
      showToast("error", msg)
    }
  }

  const handleReset = () => {
    reset()
    setImagePreviewUrl(null)
  }

  return (
    <div className="cpf">
      {/* Page backdrop */}
      <div className="cpf-page">
        {/* Toast container */}
        <div className="cpf-toast-container" aria-live="polite" aria-atomic="true">
          {toast && (
            <div
              className={`cpf-toast ${toast.type === "error" ? "cpf-toast-error" : "cpf-toast-success"}`}
              role="status"
            >
              <span className="cpf-toast-dot" />
              <span className="cpf-toast-msg">{toast.message}</span>
              <button
                type="button"
                className="cpf-toast-close"
                onClick={() => setToast(null)}
                aria-label="Close notification"
              >
                ×
              </button>
            </div>
          )}
        </div>

        <div className="cpf-container" role="region" aria-label="Create Product Form">
          <header className="cpf-header">
            <h2 className="cpf-title">Create Product</h2>
            <p className="cpf-subtitle">
              Add a new item to your catalog. Fields marked with an asterisk are required.
            </p>
          </header>

          <form onSubmit={handleSubmit(onSubmit)} className="cpf-form" noValidate>
            {/* Name */}
            <div className="cpf-field">
              <label htmlFor="name" className="cpf-label cpf-required">
                Name
              </label>
              <input
                id="name"
                type="text"
                className={`cpf-input ${errors.name ? "cpf-input-error" : ""}`}
                placeholder="e.g., Alpine Wool Hoodie"
                aria-required="true"
                aria-invalid={!!errors.name}
                {...register("name", { required: "Name is required." })}
              />
              {errors.name && <p className="cpf-error">{errors.name.message}</p>}
            </div>

            {/* SKU */}
            <div className="cpf-field">
              <label htmlFor="sku" className="cpf-label cpf-required">
                SKU
              </label>
              <input
                id="sku"
                type="text"
                className={`cpf-input ${errors.sku ? "cpf-input-error" : ""}`}
                placeholder="e.g., HD-ALP-001"
                aria-required="true"
                aria-invalid={!!errors.sku}
                {...register("sku", { required: "SKU is required." })}
              />
              {errors.sku && <p className="cpf-error">{errors.sku.message}</p>}
            </div>

            {/* Price (₹) */}
            <div className="cpf-field">
              <label htmlFor="price" className="cpf-label cpf-required">
                Price
              </label>
              <div className="cpf-money">
                <span className="cpf-currency">₹</span>
                <input
                  id="price"
                  type="number"
                  inputMode="decimal"
                  min="0"
                  step="1"
                  className={`cpf-input cpf-money-input ${errors.price ? "cpf-input-error" : ""}`}
                  placeholder="0"
                  aria-required="true"
                  aria-invalid={!!errors.price}
                  {...register("price", {
                    valueAsNumber: true,
                    required: "Valid price is required.",
                    validate: (v) =>
                      typeof v === "number" && v > 0 ? true : "Valid price is required.",
                  })}
                />
              </div>
              {errors.price && <p className="cpf-error">{errors.price.message}</p>}
            </div>

            {/* Is Sale + Original Price (₹) */}
            <div className="cpf-field">
              <div className="cpf-row-between">
                <label htmlFor="isSale" className="cpf-label">
                  Is Sale
                </label>
                <input id="isSale" type="checkbox" className="cpf-checkbox" {...register("isSale")} />
              </div>

              {watchIsSale && (
                <div className="cpf-nested">
                  <label htmlFor="originalPrice" className="cpf-label">
                    Original Price
                  </label>
                  <div className="cpf-money">
                    <span className="cpf-currency">₹</span>
                    <input
                      id="originalPrice"
                      type="number"
                      inputMode="decimal"
                      min="0"
                      step="1"
                      className={`cpf-input cpf-money-input ${
                        errors.originalPrice ? "cpf-input-error" : ""
                      }`}
                      placeholder="0"
                      aria-invalid={!!errors.originalPrice}
                      {...register("originalPrice", {
                        valueAsNumber: true,
                        validate: validateOriginalPrice,
                      })}
                    />
                  </div>
                  {errors.originalPrice && (
                    <p className="cpf-error">{errors.originalPrice.message}</p>
                  )}
                </div>
              )}
            </div>

            {/* Category */}
            <div className="cpf-field">
              <label htmlFor="category" className="cpf-label cpf-required">
                Category
              </label>
              <div className="cpf-select">
                <select
                  id="category"
                  className={`cpf-select-el ${errors.category ? "cpf-input-error" : ""}`}
                  aria-required="true"
                  aria-invalid={!!errors.category}
                  {...register("category", { required: "Category is required." })}
                >
                  <option value="">Select a category</option>
                  {categories.map((c) => (
                    <option key={c} value={c}>
                      {c.charAt(0).toUpperCase() + c.slice(1)}
                    </option>
                  ))}
                </select>
                <ChevronIcon />
              </div>
              {errors.category && <p className="cpf-error">{errors.category.message}</p>}
            </div>

            {/* Color */}
            <div className="cpf-field">
              <label htmlFor="color" className="cpf-label cpf-required">
                Color
              </label>
              <div className="cpf-select">
                <select
                  id="color"
                  className={`cpf-select-el ${errors.color ? "cpf-input-error" : ""}`}
                  aria-required="true"
                  aria-invalid={!!errors.color}
                  {...register("color", { required: "Color is required." })}
                >
                  <option value="">Select a color</option>
                  {colors.map((c) => (
                    <option key={c} value={c}>
                      {c.charAt(0).toUpperCase() + c.slice(1)}
                    </option>
                  ))}
                </select>
                <ChevronIcon />
              </div>
              {errors.color && <p className="cpf-error">{errors.color.message}</p>}
            </div>

            {/* Gender */}
            <div className="cpf-field">
              <label htmlFor="gender" className="cpf-label cpf-required">
                Gender
              </label>
              <div className="cpf-select">
                <select
                  id="gender"
                  className={`cpf-select-el ${errors.gender ? "cpf-input-error" : ""}`}
                  aria-required="true"
                  aria-invalid={!!errors.gender}
                  {...register("gender", { required: "Gender is required." })}
                >
                  <option value="">Select a gender</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                </select>
                <ChevronIcon />
              </div>
              {errors.gender && <p className="cpf-error">{errors.gender.message}</p>}
            </div>

            {/* Stock */}
            <div className="cpf-field">
              <label htmlFor="stock" className="cpf-label">Stock</label>
              <input
                id="stock"
                type="number"
                inputMode="numeric"
                min="0"
                step="1"
                className="cpf-input"
                placeholder="e.g., 25"
                {...register("stock", { valueAsNumber: true })}
              />
            </div>

            {/* Sizes (checkbox chips) */}
            <div className="cpf-field cpf-col-span-2">
              <div className="cpf-row-between">
                <label className="cpf-label">Sizes</label>
                <span className="cpf-meta">Multi-select</span>
              </div>
              <div className="cpf-chips">
                {sizeOptions.map((s) => {
                  const active = selectedSizes.includes(s)
                  return (
                    <label key={s} className={`cpf-chip ${active ? "cpf-chip-active" : ""}`}>
                      <input
                        type="checkbox"
                        value={s}
                        className="cpf-sr-only"
                        aria-label={`Size ${s}`}
                        {...register("sizes")}
                      />
                      {s}
                    </label>
                  )
                })}
              </div>
            </div>

            {/* Description */}
            <div className="cpf-field cpf-col-span-2">
              <label htmlFor="description" className="cpf-label">Description</label>
              <textarea
                id="description"
                className="cpf-input cpf-textarea"
                placeholder="Optional details, materials, care instructions, fit, etc."
                {...register("description")}
              />
            </div>

            {/* Is New */}
            <div className="cpf-field">
              <div className="cpf-row-between">
                <label htmlFor="isNew" className="cpf-label">Is New</label>
                <input id="isNew" type="checkbox" className="cpf-checkbox" {...register("isNew")} />
              </div>
            </div>

            {/* Image upload */}
            <div className="cpf-field cpf-col-span-2">
              <label htmlFor="image" className="cpf-label">Image</label>
              <div className="cpf-upload">
                <div className="cpf-upload-row">
                  <input id="image" type="file" accept="image/*" className="cpf-file" {...register("imageFile")} />
                  {!!fileList && !!fileList[0] && (
                    <button
                      type="button"
                      onClick={clearImage}
                      className="cpf-btn cpf-btn-ghost"
                      disabled={isSubmitting}
                    >
                      Clear image
                    </button>
                  )}
                </div>

                {imagePreviewUrl && (
                  <div className="cpf-preview">
                    <p className="cpf-meta">Preview</p>
                    <img
                      src={imagePreviewUrl || "/placeholder.svg"}
                      alt="Uploaded preview"
                      className="cpf-preview-img"
                    />
                  </div>
                )}
              </div>
            </div>

            {/* Actions */}
            <div className="cpf-actions">
              <button
                type="button"
                onClick={handleReset}
                className="cpf-btn cpf-btn-ghost"
                disabled={isSubmitting}
              >
                Reset
              </button>
              <button
                type="submit"
                className="cpf-btn cpf-btn-primary"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Submitting..." : "Create Product"}
              </button>
              <button
  className="
    px-6 py-3 
    rounded-xl 
    font-semibold 
    text-black 
    bg-yellow-400 
    shadow-[0_4px_0_0_rgba(0,0,0,0.3)] 
    transition-all 
    duration-200
    hover:bg-yellow-500 
    hover:shadow-[0_6px_0_0_rgba(0,0,0,0.4)]
    active:translate-y-0.5
    focus:outline-none 
    focus:ring-2 
    focus:ring-offset-2 
    focus:ring-yellow-500 
    focus:ring-offset-black
  "
  onClick={navigateToDashboard}
>
  Logout
</button>

            </div>
          </form>
        </div>
      </div>

      {/* Scoped styles: single-file, responsive, premium dark + yellow (unchanged) */}
      <style>{`
        /* Color System (5 total): black, off-white/gray, yellow, border-neutral, error red */
        .cpf {
          --cpf-bg: #0b0b0b;
          --cpf-panel-from: rgba(24, 24, 27, 0.85);
          --cpf-panel-to: rgba(0, 0, 0, 0.85);
          --cpf-text: #f5f5f5;
          --cpf-muted: #a1a1aa;
          --cpf-border: rgba(255, 255, 255, 0.08);
          --cpf-yellow: #f5c518;
          --cpf-yellow-2: rgba(245, 197, 24, 0.45);
          --cpf-error: #ef4444;
          --cpf-shadow: rgba(0,0,0,0.35);
          font-family: ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Inter, Helvetica, Arial, "Apple Color Emoji", "Segoe UI Emoji";
        }

        /* Page backdrop */
        .cpf-page {
          min-height: 100dvh;
          background: radial-gradient(1200px 600px at 20% -10%, rgba(245, 197, 24, 0.08), transparent 60%),
                      radial-gradient(900px 500px at 80% 110%, rgba(245, 197, 24, 0.05), transparent 60%),
                      var(--cpf-bg);
          display: grid;
          place-items: center;
          padding: 24px;
          position: relative;
        }

        /* Toast */
        .cpf-toast-container {
          position: fixed;
          top: 16px;
          right: 16px;
          z-index: 50;
          display: grid;
          gap: 8px;
        }
        .cpf-toast {
          display: flex;
          align-items: center;
          gap: 10px;
          padding: 10px 12px;
          border-radius: 12px;
          border: 1px solid var(--cpf-border);
          background: rgba(17, 17, 17, 0.9);
          box-shadow: 0 10px 20px var(--cpf-shadow);
          color: var(--cpf-text);
          min-width: 220px;
        }
        .cpf-toast-success {
          border-color: rgba(245, 197, 24, 0.35);
        }
        .cpf-toast-error {
          border-color: color-mix(in oklab, var(--cpf-error), white 10%);
        }
        .cpf-toast-dot {
          width: 8px;
          height: 8px;
          border-radius: 999px;
          background: var(--cpf-yellow);
          display: inline-block;
          flex-shrink: 0;
        }
        .cpf-toast-error .cpf-toast-dot {
          background: var(--cpf-error);
        }
        .cpf-toast-msg {
          font-size: 13px;
          color: #f4f4f5;
          flex: 1;
        }
        .cpf-toast-close {
          background: transparent;
          border: 0;
          color: #d4d4d8;
          font-size: 16px;
          line-height: 1;
          cursor: pointer;
        }
        .cpf-toast-close:hover {
          color: var(--cpf-yellow);
        }

        /* Container */
        .cpf-container {
          width: 100%;
          max-width: 880px;
          border: 1px solid var(--cpf-border);
          border-radius: 18px;
          background: linear-gradient(135deg, var(--cpf-panel-from), var(--cpf-panel-to));
          backdrop-filter: blur(10px);
          box-shadow: 0 10px 30px var(--cpf-shadow);
          position: relative;
          overflow: hidden;
        }
        .cpf-container::before {
          content: "";
          position: absolute;
          inset: 0;
          pointer-events: none;
          background: linear-gradient(90deg, transparent, rgba(245, 197, 24, 0.18), transparent);
          height: 1px;
          top: 0;
        }

        /* Header */
        .cpf-header {
          padding: 24px 24px 8px 24px;
        }
        .cpf-title {
          color: var(--cpf-yellow);
          font-size: 20px;
          font-weight: 700;
          letter-spacing: 0.2px;
          margin: 0;
        }
        .cpf-subtitle {
          margin: 6px 0 0 0;
          color: var(--cpf-muted);
          font-size: 13px;
          line-height: 1.5;
        }

        /* Form */
        .cpf-form {
          padding: 8px 24px 24px 24px;
          display: grid;
          grid-template-columns: 1fr;
          gap: 18px;
        }

        /* Responsive grid */
        @media (min-width: 768px) {
          .cpf-form {
            grid-template-columns: 1fr 1fr;
            gap: 20px;
          }
          .cpf-col-span-2 {
            grid-column: span 2;
          }
        }

        /* Field */
        .cpf-field {}
        .cpf-label {
          display: inline-block;
          color: #e4e4e7;
          font-size: 13px;
        }
        .cpf-required::after {
          content: "*";
          margin-left: 4px;
          color: color-mix(in oklab, var(--cpf-yellow), white 15%);
          opacity: 0.9;
        }

        /* Inputs */
        .cpf-input {
          width: 100%;
          margin-top: 8px;
          padding: 12px 14px;
          color: var(--cpf-text);
          background: rgba(255, 255, 255, 0.06);
          border: 1px solid var(--cpf-border);
          border-radius: 12px;
          outline: none;
          transition: border-color 160ms ease, box-shadow 160ms ease, background-color 160ms ease, transform 160ms ease;
        }
        .cpf-input:hover {
          border-color: rgba(245, 197, 24, 0.3);
        }
        .cpf-input:focus {
          border-color: var(--cpf-yellow);
          box-shadow: 0 0 0 4px var(--cpf-yellow-2);
          background: rgba(255, 255, 255, 0.08);
        }
        .cpf-input::placeholder {
          color: #71717a;
        }
        .cpf-input-error {
          border-color: color-mix(in oklab, var(--cpf-error), white 10%);
        }
        .cpf-input-error:focus {
          box-shadow: 0 0 0 4px rgba(239, 68, 68, 0.25);
        }

        .cpf-textarea {
          min-height: 110px;
          resize: vertical;
          line-height: 1.55;
        }

        /* Money input */
        .cpf-money {
          display: flex;
          align-items: center;
          gap: 8px;
        }
        .cpf-currency {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          padding: 10px 12px;
          border-radius: 10px;
          border: 1px solid var(--cpf-border);
          background: rgba(255, 255, 255, 0.06);
          color: #a1a1aa;
          font-weight: 600;
          min-width: 40px;
          text-align: center;
        }
        .cpf-money-input {
          flex: 1;
        }

        /* Select */
        .cpf-select {
          position: relative;
          display: flex;
          align-items: center;
          border-radius: 12px;
          border: 1px solid var(--cpf-border);
          background: rgba(255, 255, 255, 0.06);
          transition: border-color 160ms ease, box-shadow 160ms ease, background-color 160ms ease;
        }
        .cpf-select:hover {
          border-color: rgba(245, 197, 24, 0.3);
        }
        .cpf-select:focus-within {
          border-color: var(--cpf-yellow);
          box-shadow: 0 0 0 4px var(--cpf-yellow-2);
          background: rgba(255, 255, 255, 0.08);
        }
        .cpf-select-el {
          appearance: none;
          -webkit-appearance: none;
          -moz-appearance: none;
          flex: 1;
          width: 100%;
          padding: 12px 36px 12px 14px;
          color: var(--cpf-text);
          background: transparent;
          border: none;
          outline: none;
          border-radius: 12px;
        }
        .cpf-select-el option {
          background: #000;
          color: #e5e7eb;
        }
        .cpf-select svg {
          position: absolute;
          right: 10px;
          width: 16px;
          height: 16px;
          color: #9ca3af;
          pointer-events: none;
          transition: color 160ms ease;
        }
        .cpf-select:focus-within svg {
          color: var(--cpf-yellow);
        }

        /* Checkbox */
        .cpf-row-between {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 12px;
        }
        .cpf-checkbox {
          width: 18px;
          height: 18px;
          border-radius: 6px;
          appearance: none;
          background: rgba(255,255,255,0.06);
          border: 1px solid var(--cpf-border);
          display: grid;
          place-items: center;
          cursor: pointer;
          transition: border-color 160ms ease, background-color 160ms ease, box-shadow 160ms ease;
        }
        .cpf-checkbox:hover {
          border-color: rgba(245, 197, 24, 0.3);
        }
        .cpf-checkbox:focus-visible {
          outline: none;
          box-shadow: 0 0 0 4px var(--cpf-yellow-2);
          border-color: var(--cpf-yellow);
        }
        .cpf-checkbox:checked {
          background: color-mix(in oklab, var(--cpf-yellow), black 10%);
          border-color: var(--cpf-yellow);
        }
        .cpf-checkbox:checked::after {
          content: "";
          width: 8px;
          height: 8px;
          background: #0a0a0a;
          border-radius: 2px;
        }

        /* Nested block under toggles */
        .cpf-nested {
          margin-top: 10px;
        }

        /* Chips (sizes) */
        .cpf-chips {
          margin-top: 10px;
          display: flex;
          flex-wrap: wrap;
          gap: 10px;
        }
        .cpf-chip {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          padding: 9px 14px;
          font-size: 13px;
          color: #d4d4d8;
          border: 1px solid var(--cpf-border);
          border-radius: 999px;
          background: rgba(255,255,255,0.06);
          cursor: pointer;
          transition: border-color 160ms ease, color 160ms ease, background-color 160ms ease, transform 160ms ease;
          user-select: none;
        }
        .cpf-chip:hover {
          border-color: rgba(245, 197, 24, 0.3);
        }
        .cpf-chip-active {
          color: color-mix(in oklab, var(--cpf-yellow), white 15%);
          border-color: rgba(245, 197, 24, 0.6);
          background: rgba(245, 197, 24, 0.1);
        }
        .cpf-sr-only {
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

        /* Upload */
        .cpf-upload {
          margin-top: 8px;
          border: 1px dashed rgba(255,255,255,0.15);
          border-radius: 14px;
          background: rgba(255,255,255,0.06);
          padding: 14px;
          transition: border-color 160ms ease;
        }
        .cpf-upload:hover {
          border-color: rgba(245, 197, 24, 0.3);
        }
        .cpf-upload-row {
          display: flex;
          flex-direction: column;
          gap: 10px;
        }
        @media (min-width: 640px) {
          .cpf-upload-row {
            flex-direction: row;
            align-items: center;
            justify-content: space-between;
          }
        }
        .cpf-file {
          color: #d4d4d8;
          font-size: 13px;
          background: transparent;
          border: none;
        }
        .cpf-file::file-selector-button {
          margin-right: 12px;
          border: 0;
          border-radius: 10px;
          padding: 8px 12px;
          background: rgba(245, 197, 24, 0.12);
          color: color-mix(in oklab, var(--cpf-yellow), white 10%);
          cursor: pointer;
          transition: background-color 160ms ease, transform 160ms ease;
        }
        .cpf-file::file-selector-button:hover {
          background: rgba(245, 197, 24, 0.2);
        }
        .cpf-preview {
          margin-top: 12px;
        }
        .cpf-preview-img {
          max-height: 190px;
          width: auto;
          border-radius: 10px;
          border: 1px solid var(--cpf-border);
          background: rgba(255,255,255,0.06);
          padding: 4px;
        }

        /* Errors & Meta */
        .cpf-error {
          margin-top: 6px;
          color: var(--cpf-error);
          font-size: 12px;
        }
        .cpf-meta {
          color: #9ca3af;
          font-size: 11px;
        }

        /* Actions */
        .cpf-actions {
          display: flex;
          gap: 10px;
          justify-content: flex-end;
          margin-top: 10px;
          grid-column: 1 / -1;
        }
        .cpf-btn {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          padding: 12px 18px;
          font-size: 13px;
          font-weight: 600;
          border-radius: 12px;
          border: 1px solid transparent;
          cursor: pointer;
          transition: background-color 160ms ease, color 160ms ease, border-color 160ms ease, transform 120ms ease, box-shadow 160ms ease;
          user-select: none;
        }
        .cpf-btn:active {
          transform: translateY(1px);
        }
        .cpf-btn-primary {
          background: color-mix(in oklab, var(--cpf-yellow), white 5%);
          color: #0a0a0a;
          box-shadow: 0 0 0 0 rgba(0,0,0,0);
        }
        .cpf-btn-primary:hover {
          background: color-mix(in oklab, var(--cpf-yellow), white 15%);
        }
        .cpf-btn-ghost {
          color: #d4d4d8;
          background: rgba(255,255,255,0.06);
          border-color: var(--cpf-border);
        }
        .cpf-btn-ghost:hover {
          color: color-mix(in oklab, var(--cpf-yellow), white 15%);
          border-color: rgba(245, 197, 24, 0.3);
          background: rgba(255,255,255,0.08);
        }

        /* Layout fine-tuning on wide screens */
        @media (min-width: 1024px) {
          .cpf-title { font-size: 22px; }
          .cpf-subtitle { font-size: 13px; }
          .cpf-input, .cpf-select-el { font-size: 14px; }
        }
      `}</style>
    </div>
  )
}

/* Inline chevron icon (no external libs) */
function ChevronIcon() {
  return (
    <svg viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
      <path
        fillRule="evenodd"
        d="M5.23 7.21a.75.75 0 0 1 1.06.02L10 11.14l3.71-3.91a.75.75 0 1 1 1.08 1.04l-4.24 4.46a.75.75 0 0 1-1.08 0L5.25 8.27a.75.75 0 0 1-.02-1.06z"
        clipRule="evenodd"
      />
    </svg>
  )
}