import Link from "next/link";
import { getServerSession } from "next-auth/next";
import LogoutButton from "./logout-button";
import { authOptions } from "@/lib/utils/authOptions";

export const Navbar = async () => {
  const session = await getServerSession(authOptions);

  return (
    <header className="w-full">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 border-b shadow-sm">
        <Link href="/forms" className="text-2xl font-extrabold">
          LOGO APP
        </Link>

        {session && <LogoutButton />}
      </div>
    </header>
  );
};
