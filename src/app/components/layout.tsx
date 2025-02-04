import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import MEDICINE_LOGO from "@/assets/images/province-logo.png";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link href="/" className="flex-shrink-0 flex items-center">
              <Image
                width={189}
                height={36}
                src={MEDICINE_LOGO || "/placeholder.svg"}
                alt="Providence Clinic Logo"
              />
            </Link>
            <nav className="hidden md:flex space-x-8">
              <Link
                href="/scientific"
                className="text-gray-700 hover:text-cyan-600"
              >
                Scientific
              </Link>
              <Link
                href="/medical"
                className="text-gray-700 hover:text-cyan-600"
              >
                Medical
              </Link>
              <Link
                href="/educational"
                className="text-gray-700 hover:text-cyan-600"
              >
                Educational
              </Link>
              <Link
                href="/business"
                className="text-gray-700 hover:text-cyan-600"
              >
                Business
              </Link>
              <Link
                href="/contact"
                className="text-gray-700 hover:text-cyan-600"
              >
                Contact
              </Link>
              <Link href="/about" className="text-gray-700 hover:text-cyan-600">
                About Us
              </Link>
            </nav>
            <div className="hidden md:flex items-center space-x-4">
              <Link href="/login">
                <Button variant="outline">Login</Button>
              </Link>
              <Link href="/register">
                <Button>Register</Button>
              </Link>
            </div>
          </div>
        </div>
      </header>
      <main className="flex-grow">{children}</main>
      <footer className="bg-[#52b4e4] text-white py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-lg font-semibold mb-4">Providence Clinic</h3>
              <p className="text-sm">
                Providing quality healthcare services since 1990.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
              <ul className="space-y-2">
                <li>
                  <Link
                    href="/scientific"
                    className="text-sm hover:text-cyan-400"
                  >
                    Scientific
                  </Link>
                </li>
                <li>
                  <Link href="/medical" className="text-sm hover:text-cyan-400">
                    Medical
                  </Link>
                </li>
                <li>
                  <Link
                    href="/educational"
                    className="text-sm hover:text-cyan-400"
                  >
                    Educational
                  </Link>
                </li>
                <li>
                  <Link
                    href="/business"
                    className="text-sm hover:text-cyan-400"
                  >
                    Business
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
              <p className="text-sm">
                123 Medical Street, Health City, HC 12345
              </p>
              <p className="text-sm">Phone: (123) 456-7890</p>
              <p className="text-sm">Email: info@providenceclinic.com</p>
            </div>
          </div>
          <div className="mt-8 border-t border-gray-700 pt-8 text-center">
            <p className="text-sm">
              &copy; 2025 Providence Clinic. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
