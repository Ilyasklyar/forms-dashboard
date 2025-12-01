"use client";

import { useToastStore } from "@/lib/store/toast";
import { useEffect } from "react";

export default function ToastClient() {
  const { message, type, hideToast } = useToastStore();

  useEffect(() => {
    if (message) {
      const timer = setTimeout(() => hideToast(), 3000);
      return () => clearTimeout(timer);
    }
  }, [message, hideToast]);

  if (!message) return null;

  return (
    <div
      className={`fixed top-4 right-4 px-4 py-2 rounded shadow text-white ${
        type === "success" ? "bg-green-700" : "bg-red-700"
      }`}
    >
      {message}
    </div>
  );
}
