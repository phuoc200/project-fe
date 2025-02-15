"use client";

import { useState } from "react";
import { useRouter } from "next/navigation"; // Sử dụng Next.js router để điều hướng
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Layout from "../components/layout";
import AuthLayout from "../components/auth-layout";
import { Disc, Facebook, Twitter } from "lucide-react";
import Link from "next/link";

export default function AdminLoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const router = useRouter(); // Khai báo router để điều hướng

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null); // Reset lỗi trước khi gửi request

    try {
      const response = await fetch("http://localhost:5134/api/Auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();

      if (response.ok) {
        console.log("Login thành công:", data);
        // localStorage.setItem("token", data.data.token);
        // localStorage.setItem("role", data.data.role);

        // Chuyển hướng dựa vào Role
        // if (data.data.role === "Admin") {
        //   router.push("/admin/dashboard"); // Điều hướng đến trang Admin
        // } else {
        //   router.push("/user/dashboard"); // Điều hướng đến trang User
        // }
        if (data) {
          router.push("/admin/dashboard"); // Điều hướng đến trang Admin
        }
      } else {
        setError(data.message || "Đăng nhập thất bại");
      }
    } catch (error) {
      setError("Lỗi kết nối, vui lòng thử lại sau.");
      console.error("Lỗi đăng nhập:", error);
    }
  };

  return (
    <AuthLayout>
      <h2 className="text-3xl font-bold mb-6 text-center">Welcome Back</h2>
      {error && <p className="text-red-500 text-center mb-4">{error}</p>}
      <form onSubmit={handleSubmit} className="w-full max-w-md">
        <div className="mb-4">
          <input
            type="text"
            placeholder="Username"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div className="mb-6">
          <input
            type="password"
            placeholder="Password"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition duration-200"
        >
          Log In
        </button>
      </form>
      <div className="mt-4 text-center">
        <Link href="/reset-password" className="text-blue-600 hover:underline">
          Forgot password?
        </Link>
      </div>
      <div className="mt-6">
        <p className="text-center text-gray-600 mb-4">Or login with</p>
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
        Don't have an account?{" "}
        <Link href="/register" className="text-blue-600 hover:underline">
          Sign up
        </Link>
      </p>
    </AuthLayout>
  );
}
