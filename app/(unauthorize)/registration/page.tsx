"use client";
import Link from "next/link";
import React, { useState } from "react";
import Input from "../../components/server/Input";
import Button from "../../components/server/Button";
import { redirect } from "next/navigation";

const RegistrationPage: React.FC = () => {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    confirmPassword: "",
  });

  const [error, setError] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    try {
      const res = await fetch("/api/registration", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username: formData.username,
          password: formData.password,
        }),
      });

      if (!res.ok) {
        throw new Error("Failed to register");
      }

      alert("Registration successful");
      return redirect("/login");
    } catch (err: any) {
      setError(err.message);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-2 items-center">
      <div className="flex flex-col items-center justify-center h-screen gap-2 text-black">
        <h1 className="text-2xl font-bold mb-4">Registration Page</h1>
        <Input
          type="text"
          name="username"
          placeholder="username"
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
        <Input
          type="password"
          name="confirmPassword"
          placeholder="Confirm Password"
          required
          onChange={handleChange}
        />
        {error && <p className="text-red-500">{error}</p>}
        <Button type="submit">Submit Registration</Button>
        <span>or</span>
        <Button>
          <Link href="/login">Sign In</Link>
        </Button>
      </div>
    </form>
  );
};

export default RegistrationPage;
