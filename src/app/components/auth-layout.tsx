import Image from "next/image";
import Link from "next/link";
import type React from "react";
import PROVINCE_LOGO from "@/assets/images/province-logo.png";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen">
      {/* Left side with image */}
      <div className="hidden lg:flex lg:w-1/2 bg-gray-100 items-center justify-center">
        <Image
          src="https://static.vecteezy.com/system/resources/previews/017/415/572/non_2x/medical-team-doctor-nurse-surgeon-and-ppe-coat-png.png"
          alt="Medical devices"
          width={600}
          height={600}
          className="object-cover"
        />
      </div>

      {/* Right side with form */}
      <div className="w-full lg:w-1/2 flex flex-col justify-center items-center p-8 lg:p-16">
        <Link href="/" className="mb-8">
          <Image
            src={PROVINCE_LOGO || "/placeholder.svg"}
            alt="Logo"
            width={150}
            height={50}
            className="mx-auto"
          />
        </Link>
        {children}
      </div>
    </div>
  );
}
