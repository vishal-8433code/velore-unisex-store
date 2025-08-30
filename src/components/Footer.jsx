import React, { useState } from "react";
import { Instagram, Twitter, Facebook, X } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { useNavigate } from "react-router-dom";

export default function Footer() {
  const [showAdminForm, setShowAdminForm] = useState(false);
const navigate = useNavigate();
const navigateToAdminLogin = () => {
  navigate("/admin-login")
}


  const textColor = "oklch(0.52 0 0)";
  const bgColor = "oklch(0.07 0 0)";
  const Velore = "hsl(44.13deg 100% 47.45%)"

  return (
    <>
      <footer style={{ backgroundColor: bgColor }} className="border-t border-gray-800 mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="col-span-1 md:col-span-2">
              <h2
                style={{ color: Velore }}
                className="text-3xl font-bold font-serif tracking-wider mb-4 cursor-pointer hover:opacity-80 transition-opacity duration-300"
              >
                <button onClick={navigateToAdminLogin}>
                VELORÉ
                </button>
              </h2>
              <p style={{ color: textColor }} className="max-w-md leading-relaxed">
                Redefining premium fashion with luxurious unisex clothing designed for the modern individual who values
                quality and style.
              </p>
            </div>

            {/* Quick Links */}
            <div>
              <h3  className="text-lg font-semibold mb-4 text-white">Quick Links</h3>
              <ul className="space-y-2">
                {["Shop", "About", "Contact", "Size Guide", "Returns"].map((link, index) => (
                  <li key={link}>
                    <a
                      href="#"
                      style={{ color: textColor }}
                      className="hover:opacity-80 transition-opacity duration-300"
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Follow Us */}
            <div>
              <h3  className="text-lg font-semibold mb-4 text-white">Follow Us</h3>
              <div className="flex space-x-4">
                {[
                  { icon: Instagram, label: "Instagram" },
                  { icon: Twitter, label: "Twitter" },
                  { icon: Facebook, label: "Facebook" },
                ].map(({ icon: Icon, label }, index) => (
                  <a
                    key={label}
                    href="#"
                    style={{ color: textColor }}
                    className="hover:opacity-80 p-2 rounded-full transition-opacity duration-300"
                    aria-label={label}
                  >
                    <Icon className="h-5 w-5" />
                  </a>
                ))}
              </div>
            </div>
          </div>

          <div className="border-t border-gray-800 mt-8 pt-8 text-center">
            <p style={{ color: textColor }}>
              © 2024 VELORÉ. All rights reserved. | Crafted with luxury in mind.
            </p>
          </div>
        </div>
      </footer>

      
    </>
  );
}
