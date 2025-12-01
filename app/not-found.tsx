import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen gap-4">
      <h1 className="text-4xl font-bold">404</h1>
      <p className="text-xl text-gray-600">Page Not Found</p>
      <p className="text-gray-500">
        {`The page you're looking for doesn't exist.`}
      </p>
      <Link href={`/forms}`} className="text-grey-600 hover:underline">
        Go Forms
      </Link>
    </div>
  );
}
