import Link from "next/link";
import { AlertTriangle } from "lucide-react";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-4 text-center bg-white text-gray-900 dark:bg-gray-950 dark:text-gray-100">
      <AlertTriangle className="w-16 h-16 text-yellow-500 dark:text-yellow-400 mb-4" />
      <h1 className="text-5xl font-bold">404</h1>
      <h2 className="mt-2 text-xl font-semibold">Page Not Found</h2>
      <p className="mt-2 text-gray-600 dark:text-gray-400">
        Sorry, we couldn’t find the page you’re looking for.
      </p>

      <Link
        href="/"
        className="mt-6 underline underline-offset-4 text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 transition-colors"
      >
        Return Home
      </Link>
    </div>
  );
}
