"use client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { loginSchema, LoginDataSchema, Login } from "@/types";
import API from "@/lib/api";
import { useAppDispatch } from "@/redux/hooks";
import { loginReducers } from "@/redux/features/userSlice";
import toast, { Toaster } from "react-hot-toast";
import Link from "next/link";

export default function LoginForm() {
  const [message, setMessage] = useState("");
  const router = useRouter();
  const dispatch = useAppDispatch();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginDataSchema>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginDataSchema) => {
    const res: { data: Login } = await API.post("/login", data);
    console.log("user", res);
    dispatch(loginReducers(res.data.user));
    toast(res.data.message);
    setMessage(res.data.message || "Login failed");
    router.push("/");
  };

  return (
    <div className="min-h-[100vh]  flex justify-center items-center flex-col">
      <Toaster
        position="top-center"
        reverseOrder={false}
        gutter={8}
        toastOptions={{
          className: "",
          duration: 5000,
          removeDelay: 1000,
          style: { background: "#363636", color: "#fff" },
          success: {
            duration: 3000,
            iconTheme: { primary: "green", secondary: "black" },
          },
        }}
      />
      <div className="border border-gray-400 p-8 shadow-slate-400 shadow-md rounded-md w-[95vw] sm:w-[50vw] md:w-[25vw]">
        <div className="flex justify-center mb-5">
          <div className="mb-5 text-3xl font-bold text-[rgb(123,80,154)]">
            Log <span className="text-[#D72638]">In</span>
          </div>
        </div>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col gap-y-4"
        >
          <input
            {...register("email", { required: "Email is required" })}
            placeholder="Email or Username"
            className="outline-none border-b rounded-md text-black p-2"
          />
          {errors.email && (
            <p className="text-red-500">{errors.email.message}</p>
          )}

          <input
            {...register("password", { required: "Password is required" })}
            type="password"
            placeholder="Enter password"
            className="outline-none border-b rounded-md text-black p-2"
          />
          {errors.password && (
            <p className="text-red-500">{errors.password.message}</p>
          )}

          <button
            type="submit"
            className="bg-[rgb(58,36,74)] p-2 mt-4 rounded-md text-white"
          >
            Log In
          </button>
        </form>
        <div className="flex justify-center gap-x-1 mt-3">
          <span>{`Don't have an account?`}</span>
          <Link href="/signup">
            <span className="font-medium underline text-[rgb(123,80,154)]">
              Sign&nbsp;
              <span className="text-[#D72638] underline">Up</span>
            </span>
          </Link>
        </div>
        {message && (
          <p className="text-green-500 text-center mt-3">{message}</p>
        )}
      </div>
    </div>
  );
}
