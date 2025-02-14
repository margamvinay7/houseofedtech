"use client";

import { useCallback, useEffect, useState } from "react";
import { useParams } from "next/navigation";
import API from "@/lib/api";
import { UserData } from "@/types";
import { CircleUserRound } from "lucide-react";

export default function ProfilePage() {
  const { id } = useParams();
  const [user, setUser] = useState<UserData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch user data with useCallback to prevent re-creating the function
  const getUser = useCallback(async () => {
    if (!id) return;

    try {
      setLoading(true);
      const response = await API.get(`/user/${id}`);
      setUser(response.data?.userData ?? null);
    } catch (err) {
      console.error("Error fetching user:", err);
      setError("Failed to load user data. Please try again later.");
    } finally {
      setLoading(false);
    }
  }, [id]);

  // Fetch user on mount or when ID changes
  useEffect(() => {
    getUser();
  }, [getUser]);

  // Show a skeleton loader while fetching data
  if (loading) {
    return (
      <div className="p-6 border rounded shadow-lg animate-pulse">
        <div className="h-6 bg-gray-300 rounded w-48 mb-2"></div>
        <div className="h-4 bg-gray-300 rounded w-64 mb-4"></div>
        <div className="h-4 bg-gray-300 rounded w-32"></div>
      </div>
    );
  }

  // Handle errors
  if (error) return <p className="text-red-500">{error}</p>;
  if (!user) return <p className="text-gray-500">No user found.</p>;

  return (
    <div className="p-6 m-5  shadow-amber-200 border rounded-lg shadow-md h-[calc(100vh-180px)] ">
      <div className="flex gap-x-3 border-b-4 pb-3 border-gray-200">
        <CircleUserRound className="w-16 h-16" />
        <div>
          <h1 className="text-2xl font-bold ">{user.name}</h1>
          <p className="text-gray-300">{user.email}</p>
          <p className="text-gray-200">
            Joined on {new Date(user.createdAt).toLocaleDateString()}
          </p>
        </div>
      </div>

      {/* Posts Section */}
      <h2 className="mt-4 text-xl font-semibold p-2 px-5 underline underline-offset-4 text-gray-100">
        Tasks
      </h2>
      {user.posts.length > 0 ? (
        <ul className="grid grid-cols-1 gap-5 md:grid-cols-3 p-5">
          {user.posts.map((post) => (
            <li
              key={post.id}
              className="border
              border-gray-300
              shadow-md
              shadow-pink-500
              rounded-md
              p-3"
            >
              <p className="text-xl font-semibold border-b py-2 border-gray-200">
                {post.title}:
              </p>{" "}
              <p className="text-gray-300 my-2">{post.description}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-gray-500">No posts found</p>
      )}
    </div>
  );
}
