import React from "react"
import "./index.css" // tumhari merged global/tailwind css yahan import hogi

export default function Layout({ children }) {
  return (
    <div className="dark">
      <div className="font-sans antialiased">
        {children}
      </div>
    </div>
  )
}
