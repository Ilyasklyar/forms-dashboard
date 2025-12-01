"use client";

import Button from "@/components/button";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { LoginData, loginSchema } from "@/lib/schemas/login.schema";
import { signIn } from "next-auth/react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { UserRole } from "@/types/roles";

export default function LoginPageUI() {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginData>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginData) => {
    setError(null);

    try {
      const res = await signIn("credentials", {
        email: data.email,
        role: data.role,
        redirect: false,
      });

      if (res?.error) {
        setError("Invalid credentials. Please try again.");
        return;
      }

      if (res?.ok) {
        router.push("/forms");
      }
    } catch (err) {
      setError("Something went wrong. Please try again.");
      console.log("Login error:", err);
    }
  };

  return (
    <div className="flex items-center justify-center h-screen">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="border p-6 rounded-lg w-[320px] flex flex-col"
      >
        <h2 className="text-xl font-semibold text-center">Login</h2>

        <div className="h-6 text-red-700 text-sm">
          {error && (
            <div className="bg-red-50 border border-red-200 px-3 py-2 rounded">
              {error}
            </div>
          )}
        </div>

        <div className="flex flex-col gap-1">
          <label>Email</label>
          <input
            type="email"
            {...register("email")}
            placeholder="Enter your email"
            className="border p-2 rounded disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={isSubmitting}
          />
          <div className="h-6 text-red-600 text-sm">
            {errors.email && errors.email.message}
          </div>
        </div>

        <div className="flex flex-col gap-1">
          <label>Role</label>
          <select
            {...register("role")}
            className="border p-2 rounded disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={isSubmitting}
          >
            <option value="">Select role</option>
            <option value={UserRole.Individual}>Individual</option>
            <option value={UserRole.Admin}>Admin</option>
          </select>
          <div className="h-6 text-red-600 text-sm">
            {errors.role && errors.role.message}
          </div>
        </div>

        <Button
          label={isSubmitting ? "Logging in..." : "Login"}
          type="submit"
          disabled={isSubmitting}
        />
      </form>
    </div>
  );
}
