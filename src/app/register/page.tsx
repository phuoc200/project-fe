"use client";

import { useState } from "react";
import { Disc, Facebook, Twitter } from "lucide-react";
import Link from "next/link";
import AuthLayout from "../components/auth-layout";
// const handleSubmit = (e: React.FormEvent) => {
//   e.preventDefault();
//   router.push("profile");
// };

export default function RegisterPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  // const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // router.push("profile");
    setLoading(true);
    setError("");
    setSuccess("");

    try {
      const response = await fetch("http://localhost:5134/api/Auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({ name, email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        setSuccess("Đăng ký thành công!");
        console.log("Register success:", data);
      } else {
        setError(data.message || "Có lỗi xảy ra, vui lòng thử lại!");
      }
    } catch (err) {
      setError("Lỗi kết nối, vui lòng kiểm tra lại!");
      console.error("Register error:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthLayout>
      <h2 className="text-3xl font-bold mb-6 text-center">Create an Account</h2>
      {error && <p className="text-red-500 text-center mb-4">{error}</p>}
      {success && <p className="text-green-500 text-center mb-4">{success}</p>}
      <form onSubmit={handleSubmit} className="w-full max-w-md">
        <div className="mb-4">
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Username"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>
        <div className="mb-4">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>
        <div className="mb-6">
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition duration-200"
          disabled={loading}
        >
          {loading ? "Registering..." : "Register"}
        </button>
      </form>
      <div className="mt-6">
        <p className="text-center text-gray-600 mb-4">Or register with</p>
        <div className="flex justify-center space-x-4">
          <button className="p-2 bg-red-600 text-white rounded-full hover:bg-red-700 transition duration-200">
            <Disc />
          </button>
          <button className="p-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition duration-200">
            <Facebook />
          </button>
          <button className="p-2 bg-blue-400 text-white rounded-full hover:bg-blue-500 transition duration-200">
            <Twitter />
          </button>
        </div>
      </div>
      <p className="mt-8 text-center text-gray-600">
        Already have an account?{" "}
        <Link href="/login" className="text-blue-600 hover:underline">
          Log in
        </Link>
      </p>
    </AuthLayout>
  );
}
