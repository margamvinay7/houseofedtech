"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { signUpSchema, SignUpDataSchema } from "@/types";
import API from "@/lib/api";
import toast, { Toaster } from "react-hot-toast";
import Link from "next/link";
export default function SignupForm() {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignUpDataSchema>({
    resolver: zodResolver(signUpSchema),
  });

  const onSubmit = async (data: SignUpDataSchema) => {
    try {
      setLoading(true);
      const res = await API.post("/signUp", data);
      toast.success(res.data?.message || "Signup successful!");

      setTimeout(() => {
        router.push("/login");
      }, 2000); // Redirect after a short delay
    } catch (error: unknown) {
      toast.error(`Signup failed${error}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[100vh] flex justify-center items-center flex-col">
      <Toaster position="top-center" />
      <div className="border border-gray-400 p-8 shadow-slate-400 shadow-md rounded-md w-[95vw] sm:w-[50vw] md:w-[25vw]">
        <div className="flex justify-center mb-5">
          <h2 className="mb-5 text-3xl font-bold text-[rgb(123,80,154)]">
            Sign <span className="text-[#D72638]">Up</span>
          </h2>
        </div>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col gap-y-4"
        >
          <input
            {...register("name", { required: "Name is required" })}
            placeholder="Name"
            className="outline-none border-b rounded-md text-black p-2"
            disabled={loading}
          />
          {errors.name && (
            <p className="text-red-500 text-sm">{errors.name.message}</p>
          )}

          <input
            {...register("email", { required: "Email is required" })}
            type="email"
            placeholder="Email"
            className="outline-none border-b rounded-md text-black p-2"
            disabled={loading}
          />
          {errors.email && (
            <p className="text-red-500 text-sm">{errors.email.message}</p>
          )}

          <input
            {...register("password", { required: "Password is required" })}
            type="password"
            placeholder="Password"
            className="outline-none border-b rounded-md text-black p-2"
            disabled={loading}
          />
          {errors.password && (
            <p className="text-red-500 text-sm">{errors.password.message}</p>
          )}

          <button
            type="submit"
            className="bg-[rgb(58,36,74)] p-2 mt-4 rounded-md text-white disabled:bg-gray-400"
            disabled={loading}
          >
            {loading ? "Signing Up..." : "Sign Up"}
          </button>
        </form>
        <div className="flex justify-center gap-x-1 mt-2">
          <span>Already have an account?</span>
          <Link href="/login">
            <span className="font-medium underline text-[rgb(123,80,154)]">
              Log&nbsp;
              <span className="text-red-500 underline">In</span>
            </span>
          </Link>
        </div>
      </div>
    </div>
  );
}
