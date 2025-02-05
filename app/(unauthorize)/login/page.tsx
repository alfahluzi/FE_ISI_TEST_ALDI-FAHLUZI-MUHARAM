"use client";
import Link from "next/link";
import React, { useState } from "react";
import Input from "../../components/server/Input";
import Button from "../../components/server/Button";
import { redirect } from "next/navigation";

const LoginPage: React.FC = () => {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const [error, setError] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const submitLogin = async () => {
    try {
      const res = await fetch("/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!res.ok) {
        return new Error("Invalid credentials");
      }
      return res.json();
    } catch (err: any) {
      return new Error(err.message);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const result = await submitLogin();
    if (result instanceof Error) {
      setError(result.message);
    } else {
      redirect("/");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen gap-2 text-black">
      <h1 className="text-2xl font-bold mb-4">Login Page</h1>
      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-2 items-center"
      >
        <Input
          type="text"
          name="username"
          placeholder="Username"
          required
          onChange={handleChange}
        />
        <Input
          type="password"
          name="password"
          placeholder="Password"
          required
          onChange={handleChange}
        />
        {error && <p className="text-red-500">{error}</p>}
        <Button type="submit">Sign In</Button>
      </form>
      <span>or</span>
      <Button>
        <Link href="/registration">Register New Account</Link>
      </Button>
    </div>
  );
};

export default LoginPage;
