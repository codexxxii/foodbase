"use client";

import { useQuery } from "@tanstack/react-query";
import { authCheck } from "@/server/actions";
import { useRouter } from "next/navigation";

export default function AuthCallback() {
  const { data } = useQuery({
    queryKey: ["auth-check"],
    queryFn: authCheck,
    retry: true,
    retryDelay: 500,
  });

  const router = useRouter();

  if (data?.success) {
    router.push("/");
  }

  return (
    <div className="w-full h-screen flex flex-col justify-center items-center">
      <div className="w-7 h-7 rounded-full border-2 border-gray-400 mb-2 border-r-transparent! animate-spin" />
      <p className="text-xl font-semibold">Signing you in</p>
      <p className="text-gray-400 text-sm">
        You will be redirected automatically
      </p>
    </div>
  );
}
