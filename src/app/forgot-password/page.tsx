"use client";

import { useState } from "react";
import Link from "next/link";
import AuthLayout from "../components/auth-layout";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [step, setStep] = useState(1);
  const [message, setMessage] = useState<string | null>(null);

  const handleRequestOTP = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch(
        "http://localhost:5000/api/auth/forgot-password",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(email),
        }
      );
      const data = await response.json();
      if (response.ok) {
        setMessage("OTP has been sent to your email.");
        setStep(2);
      } else {
        setMessage(data.message || "Something went wrong.");
      }
    } catch (error) {
      setMessage("Failed to send OTP. Try again.");
    }
  };

  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch(
        "http://localhost:5000/api/auth/reset-password",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ token: otp, newPassword }),
        }
      );
      const data = await response.json();
      if (response.ok) {
        setMessage("Password has been updated. You can now login.");
        setStep(3);
      } else {
        setMessage(data.message || "Invalid OTP or error occurred.");
      }
    } catch (error) {
      setMessage("Failed to reset password. Try again.");
    }
  };

  return (
    <AuthLayout>
      <h2 className="text-3xl font-bold mb-6 text-center">
        {step === 1 ? "Forgot Password" : "Reset Password"}
      </h2>
      {message && <p className="text-green-500 text-center mb-4">{message}</p>}
      {step === 1 && (
        <form onSubmit={handleRequestOTP} className="w-full max-w-md">
          <div className="mb-6">
            <input
              type="email"
              placeholder="Enter your email"
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
            Send OTP
          </button>
        </form>
      )}

      {step === 2 && (
        <form onSubmit={handleResetPassword} className="w-full max-w-md">
          <div className="mb-4">
            <input
              type="text"
              placeholder="Enter OTP"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              required
            />
          </div>
          <div className="mb-6">
            <input
              type="password"
              placeholder="New Password"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition duration-200"
          >
            Reset Password
          </button>
        </form>
      )}

      {step === 3 && (
        <p className="text-center text-gray-600">
          Password reset successfully.{" "}
          <Link href="/login" className="text-blue-600 hover:underline">
            Log in
          </Link>
        </p>
      )}
    </AuthLayout>
  );
}
