// src/components/ui/button.jsx
export function Button({ children, className = "", ...props }) {
  return (
    <button
      {...props}
      className={`px-4 py-2 rounded-md bg-primary text-white hover:bg-primary/80 transition duration-200 ${className}`}
    >
      {children}
    </button>
  )
}
