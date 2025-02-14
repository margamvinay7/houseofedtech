"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useCallback } from "react";
import toast, { Toaster } from "react-hot-toast";
import { CreatePostDataSchema, createPostSchema, UserData } from "@/types";
import { useCreatePostMutation } from "@/redux/services/postApi";
import { useGetUser } from "@/hooks/useGetUser";

export default function CreatePostForm() {
  const router = useRouter();
  const user: Partial<UserData> | null = useGetUser();
  const [createPost, { isLoading }] = useCreatePostMutation();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<CreatePostDataSchema>({
    resolver: zodResolver(createPostSchema),
    defaultValues: {
      title: "",
      description: "",
    },
  });

  const handleCreatePost = useCallback(
    async (data: CreatePostDataSchema) => {
      try {
        const res = await createPost({ ...data, userId: user?.id }).unwrap();
        toast.success(res.message || "Post created successfully");
        reset(); // Reset form after submission
        router.push("/");
      } catch (error) {
        console.error("Error creating post:", error);
        toast.error("Failed to create post. Please try again.");
      }
    },
    [createPost, router, user, reset]
  );

  return (
    <div className="min-h-[100vh] flex justify-center items-center flex-col">
      <Toaster position="top-center" />
      <div className="border border-gray-400 p-8 shadow-slate-400 shadow-md rounded-md w-[95vw] sm:w-[50vw] md:w-[25vw] ">
        <div className="flex justify-center mb-5">
          <h2 className="mb-5 text-3xl font-bold text-[rgb(123,80,154)]">
            Create <span className="text-[#D72638]">Post</span>
          </h2>
        </div>
        <form
          onSubmit={handleSubmit(handleCreatePost)}
          className="flex flex-col gap-y-4"
        >
          <label className="text-[rgb(123,80,154)] font-medium" htmlFor="title">
            Title
          </label>
          <input
            id="title"
            {...register("title", { required: "Title is required" })}
            placeholder="Enter title"
            className="outline-none border-b text-black rounded-md  p-2"
            aria-invalid={errors.title ? "true" : "false"}
          />
          {errors.title && (
            <p className="text-red-500 text-sm">{errors.title.message}</p>
          )}

          <label
            className="text-[rgb(123,80,154)] font-medium"
            htmlFor="description"
          >
            Description
          </label>
          <textarea
            id="description"
            {...register("description", {
              required: "Description is required",
            })}
            placeholder="Enter description"
            className="outline-none border-b text-black rounded-md  p-2"
            aria-invalid={errors.description ? "true" : "false"}
          />
          {errors.description && (
            <p className="text-red-500 text-sm">{errors.description.message}</p>
          )}

          <button
            type="submit"
            className="bg-[rgb(58,36,74)] p-2 mt-4 rounded-md text-white disabled:bg-gray-400"
            disabled={isSubmitting || isLoading}
          >
            {isSubmitting || isLoading ? "Creating..." : "Create Post"}
          </button>
        </form>
      </div>
    </div>
  );
}
