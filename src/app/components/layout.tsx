"use client";

import type React from "react";

import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import PROVINCE_LOGO from "@/assets/images/province-logo.png";
import { ShoppingCarts } from "./shopping-cart";
import { Input } from "@/components/ui/input";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { User, LogOut } from "lucide-react";
import { useCart } from "@/app/contexts/cart-context";

export default function Layout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [user, setUser] = useState<{ username: string; email: string } | null>(
    null
  );
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const { setIsAuthenticated } = useCart();
  let closeTimeout: NodeJS.Timeout | null = null;

  useEffect(() => {
    const fetchUser = async () => {
      const token = localStorage.getItem("token");
      if (token) {
        try {
          const response = await fetch(
            "http://localhost:5000/api/auth/userinfo",
            {
              headers: { Authorization: `Bearer ${token}` },
            }
          );
          if (response.ok) {
            const data = await response.json();
            setUser(data);
            setIsAuthenticated(true); // Set authentication state in cart context
          }
        } catch (error) {
          console.error("Error fetching user:", error);
        }
      }
    };
    fetchUser();
  }, [setIsAuthenticated]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setUser(null);
    setIsAuthenticated(false); // Update authentication state in cart context
  };

  const handleMouseEnter = () => {
    if (closeTimeout) clearTimeout(closeTimeout); // Hủy timeout nếu có
    setIsDropdownOpen(true);
  };

  const handleMouseLeave = () => {
    closeTimeout = setTimeout(() => {
      setIsDropdownOpen(false);
    }, 500); // Delay 0.5s trước khi đóng menu
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <header className="bg-white shadow-sm relative z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link href="/" className="flex-shrink-0 flex items-center">
              <Image
                width={189}
                height={36}
                src={PROVINCE_LOGO || "/placeholder.svg"}
                alt="Providence Clinic Logo"
              />
            </Link>

            <nav className="hidden md:flex space-x-8">
              {[
                { href: "/educational", label: "Educational" },
                { href: "/business", label: "Business" },
                { href: "/products", label: "Products" },
                { href: "/contact", label: "Contact" },
                { href: "/about", label: "About Us" },
              ].map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`rounded-none border-b-2 border-transparent hover:border-gray-400 py-5 text-[#2a2b2a] font-semibold hover:text-[#2a2b2a] focus:outline-none ${
                    pathname === item.href
                      ? "border-[#000000]"
                      : "border-transparent"
                  }`}
                >
                  {item.label}
                </Link>
              ))}
            </nav>

            <div className="hidden md:flex items-center space-x-4">
              {user ? (
                <div
                  className="relative"
                  onMouseEnter={handleMouseEnter}
                  onMouseLeave={handleMouseLeave}
                >
                  <button className="flex items-center space-x-2 text-[#2a2b2a] font-semibold focus:outline-none">
                    <User className="w-6 h-6" />
                    <span>{user.username}</span>
                  </button>

                  <div
                    className={`absolute right-0 mt-2 w-48 bg-white shadow-lg rounded-lg transition-opacity duration-200 ${
                      isDropdownOpen
                        ? "opacity-100 visible scale-100"
                        : "opacity-0 invisible scale-95"
                    } z-50 transform origin-top-right`}
                  >
                    <div className="block px-6 py-3 text-gray-800 hover:bg-gray-50">
                      <div className="font-medium text-lg">{user.username}</div>
                      <div className="text-sm text-gray-500">{user.email}</div>
                    </div>
                    <button
                      onClick={handleLogout}
                      className="w-full text-left px-6 py-3 text-gray-800 hover:bg-gray-100 flex items-center rounded-b-lg transition-colors"
                    >
                      <LogOut className="w-4 h-4 mr-2" />
                      Logout
                    </button>
                  </div>
                </div>
              ) : (
                <>
                  <Link href="/login">
                    <Button variant="outline">Login</Button>
                  </Link>
                  <Link href="/register">
                    <Button>Register</Button>
                  </Link>
                </>
              )}
              <ShoppingCarts />
            </div>
          </div>
        </div>
      </header>

      <main className="flex-grow">{children}</main>

      <footer className="bg-[#f4f4f4] text-[#2a2b2a] py-8 relative z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap flex-grow justify-between gap-32">
            <div className="flex-1 text-base font-medium mb-4 space-y-4">
              <div className="font-semibold text-base">Providence Clinic</div>
              <p>
                Providence Clinic offers the most comprehensive catalog of
                digital health supplies from spirometers to scales. We are the
                leaders in 4G/LTE/Cellular Connected Devices.
              </p>
              <div className="text-base font-semibold">
                We are happy to provide support for all devices sold here. Call
                a device specialist to learn about your device.
              </div>
              <div>Contact us: mailto:support@providenceclinic.com</div>
              <div>+1 (215) 398-1365</div>
            </div>

            <div className="space-y-4">
              <div className="font-semibold text-base">Important links</div>
              <ul className="space-y-4">
                <li>
                  <Link href="/educational">Educational</Link>
                </li>
                <li>
                  <Link href="/business">Business</Link>
                </li>
                <li>
                  <Link href="/contact">Contact</Link>
                </li>
                <li>
                  <Link href="/about">About us</Link>
                </li>
              </ul>
            </div>

            <div className="flex-1 space-y-4">
              <div className="text-base font-semibold mb-4">Newsletter</div>
              <p>
                Sign up for exclusive offers, original stories, events and more.
              </p>
              <div className="flex items-center gap-2">
                <Input placeholder="Your email" />
                <Button>Subscribe</Button>
              </div>
            </div>
          </div>
          <div className="mt-8 border-t border-gray-700 pt-8 text-center">
            <p>&copy; 2025 Providence Clinic. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
