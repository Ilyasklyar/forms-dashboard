import Image from "next/image";
import Link from "next/link";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/utils/authOptions";

export default async function Home() {
  const session = await getServerSession(authOptions);
  const isLoggedIn = !!session;

  const linkHref = isLoggedIn ? "/forms" : "/login";
  const linkLabel = isLoggedIn ? "Go to Forms" : "Go to Login";

  return (
    <main className="flex flex-col items-center justify-center min-h-screen">
      <section className="flex flex-col items-center gap-6 px-10">
        <h1 className="text-4xl font-bold text-center">Forms Dashboard App</h1>

        <Image
          src="/images/hero.webp"
          alt="Forms Dashboard Hero"
          width={660}
          height={370}
          priority
          sizes="(max-width: 768px) 100vw, 660px"
          className="rounded-lg w-full h-auto"
        />

        <Link
          href={linkHref}
          className="px-6 py-3 rounded bg-gray-500 text-white hover:bg-gray-700 disabled:bg-gray-400"
        >
          {linkLabel}
        </Link>
      </section>
    </main>
  );
}
