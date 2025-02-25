"use client";

import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import PROVINCE_LOGO from "@/assets/images/province-logo.png";
import { ShoppingCarts } from "./shopping-cart";
import { Input } from "@/components/ui/input";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { UserCircle } from "lucide-react"; // Import icon

export default function Layout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [user, setUser] = useState<{ name: string; avatar?: string } | null>(
    null
  );

  useEffect(() => {
    // Giả sử dữ liệu user được lấy từ localStorage hoặc API
    const storedUser = JSON.parse(localStorage.getItem("user") || "null");
    setUser(storedUser);
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <header className="bg-white shadow-sm">
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
                  className={`rounded-none border-b-2 border-transparent hover:border-gray-400 py-5 text-[#2a2b2a] font-semibold ${
                    pathname === item.href ? "border-black" : ""
                  }`}
                >
                  {item.label}
                </Link>
              ))}
            </nav>
            <div className="hidden md:flex items-center space-x-4">
              {user ? (
                <Link href="/profile" className="flex items-center space-x-2">
                  {user.avatar ? (
                    <Image
                      src={user.avatar}
                      alt="User Avatar"
                      width={32}
                      height={32}
                      className="rounded-full"
                    />
                  ) : (
                    <UserCircle size={32} className="text-gray-600" />
                  )}
                  <span className="text-sm font-semibold">{user.name}</span>
                </Link>
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
      <footer className="bg-[#f4f4f4] text-[#2a2b2a] py-8">
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
              <div className="text-base font-semibold">
                We only accept returns if certain conditions are met, per our
                return policy requirements.
              </div>
              <div>Contact us: mailto:support@providenceclinic.com</div>
              <div>+1 (215) 398-1365</div>
            </div>
            <div className="space-y-4">
              <div className="font-semibold text-base">Important links</div>
              <ul className="space-y-4">
                <li>
                  <Link href="/educational" className="text-base">
                    Educational
                  </Link>
                </li>
                <li>
                  <Link href="/business" className="text-base">
                    Business
                  </Link>
                </li>
                <li>
                  <Link href="/scientific" className="text-base">
                    Contact
                  </Link>
                </li>
                <li>
                  <Link href="/medical" className="text-base">
                    About us
                  </Link>
                </li>
                <li>
                  <Link href="" className="text-base">
                    International Orders & Customs
                  </Link>
                </li>
              </ul>
            </div>
            <div className="flex-1 space-y-4">
              <div className="text-base font-semibold mb-4">Newsletter</div>
              <p className="text-base">
                Sign up for exclusive offers, original stories, events and more.
              </p>
              <div className="flex items-center gap-2">
                <Input
                  placeholder="Your email"
                  className="text-[#adaead]"
                ></Input>
                <Button>Subscribe</Button>
              </div>
            </div>
          </div>
          <div className="mt-8 border-t border-gray-700 pt-8 text-center">
            <p className="text-base">
              &copy; 2025 Providence Clinic. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
