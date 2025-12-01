import { Navbar } from "@/components/navbar";
import Toast from "@/components/toast";
import { ReactNode } from "react";

export default function MainLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <Toast />
      <Navbar />
      <main className="mx-auto max-w-7xl flex-1 px-4 py-6">{children}</main>
    </>
  );
}
