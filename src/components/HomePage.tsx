"use client";

import {
  useGetPostsQuery,
  useDeletePostMutation,
} from "@/redux/services/postApi";
import toast, { Toaster } from "react-hot-toast";
import { useGetUser } from "@/hooks/useGetUser";
import Link from "next/link";
import { useCallback } from "react";
import { UserData } from "@/types";

// home page
export default function Home() {
  const user: Partial<UserData> | null = useGetUser();

  //@ts-expect-error have some errors in types
  const { data: posts, isLoading } = useGetPostsQuery(user?.id, {
    skip: !user?.id,
  });

  const [deletePost] = useDeletePostMutation();

  const handleDelete = useCallback(
    async (postId: string) => {
      try {
        const res = await deletePost(postId).unwrap();
        toast.success(res.message || "Post deleted successfully");
      } catch (error) {
        console.error("Error deleting post:", error);
        toast.error("Error deleting post. Please try again.");
      }
    },
    [deletePost]
  );

  if (isLoading) {
    return (
      <div className="p-6 border rounded shadow-lg animate-pulse">
        <div className="h-6 bg-gray-300 rounded w-48 mb-2"></div>
        <div className="h-4 bg-gray-300 rounded w-64 mb-4"></div>
        <div className="h-4 bg-gray-300 rounded w-32"></div>
      </div>
    );
  }

  return (
    <div className="border border-gray-300 shadow-md shadow-amber-200 m-4 rounded-md p-2 h-[calc(100vh-180px)]">
      <Toaster
        position="top-center"
        reverseOrder={false}
        gutter={8}
        containerClassName=""
        containerStyle={{}}
        toastOptions={{
          className: "",
          duration: 5000,
          removeDelay: 1000,
          style: {
            background: "#363636",
            color: "#fff",
          },
          success: {
            duration: 3000,
            iconTheme: {
              primary: "green",
              secondary: "black",
            },
          },
        }}
      />

      {/* Posts Section */}
      <div className=" font-bold text-xl border-b-4 mb-5 p-4 border-gray-300">
        Posts
      </div>
      <ul className="grid grid-cols-1 gap-5 md:grid-cols-3 p-5">
        {/* @ts-expect-error have some errors in types */}
        {posts?.posts?.map((post) => (
          <li
            key={post.id}
            className="border border-gray-300 shadow-md shadow-pink-500 rounded-md p-3 "
          >
            <p className="text-xl font-semibold border-b py-2 border-gray-200">
              {post.title}
            </p>

            <p className="text-gray-300 my-2">{post.description}</p>
            <p className="flex justify-between">
              <button className="bg-[rgb(58,36,74)] w-24 p-1 px-3 rounded-md">
                <Link
                  href={`/updatePost/${post.id}`}
                  className="text-white w-24"
                >
                  Update
                </Link>
              </button>
              <button
                onClick={() => handleDelete(post.id)}
                className="bg-red-500 w-24 p-1 px-3 rounded-md"
              >
                Delete
              </button>
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
}
