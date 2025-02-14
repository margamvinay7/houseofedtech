"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAppSelector } from "@/redux/hooks";
import { UserData } from "@/types";

export function useGetUser() {
  const router = useRouter();
  const user: Partial<UserData> = useAppSelector(
    (state) => state.userFeature.user
  );

  useEffect(() => {
    if (!user || Object.keys(user).length === 0) {
      router.push("/login");
    }
  }, [user, router]);

  return user && Object.keys(user).length > 0 ? user : null;
}
