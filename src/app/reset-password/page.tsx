"use client";

import { useState } from "react";
import Link from "next/link";
import AuthLayout from "../components/auth-layout";

export default function ResetPasswordPage() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would implement the SMTP email sending via Google's port 587
    // For now, we'll just show a success message
    setMessage(
      "If an account exists for this email, a password reset link has been sent."
    );
  };

  return (
    <AuthLayout>
      <h2 className="text-3xl font-bold mb-6 text-center">
        Reset Your Password
      </h2>
      {message && <p className="text-green-500 text-center mb-4">{message}</p>}
      <form onSubmit={handleSubmit} className="w-full max-w-md">
        <div className="mb-6">
          <input
            type="email"
            placeholder="Email"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition duration-200"
        >
          Send Reset Link
        </button>
      </form>
      <p className="mt-8 text-center text-gray-600">
        Remember your password?{" "}
        <Link href="/login" className="text-blue-600 hover:underline">
          Log in
        </Link>
      </p>
    </AuthLayout>
  );
}
