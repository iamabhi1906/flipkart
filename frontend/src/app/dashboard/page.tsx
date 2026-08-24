"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAppDispatch, useAppSelector } from "@/store";
import { getUserThunk } from "@/features/users/user.action";

export default function DashboardPage() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const userRaw = useAppSelector((state: any) => state.users?.user);
  const user = userRaw?.data || userRaw;

  useEffect(() => {
    dispatch(getUserThunk());
  }, [dispatch]);

  useEffect(() => {
    if (user) {
      if (user.role === "vendor") {
        router.replace("/vendor");
      } else if (user.role === "admin") {
        router.replace("/admin");
      } else {
        router.replace("/account");
      }
    } else {
      router.replace("/account");
    }
  }, [user, router]);

  return null;
}

