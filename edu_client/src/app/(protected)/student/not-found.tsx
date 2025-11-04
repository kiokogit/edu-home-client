import Link from "next/link";

// app/not-found.tsx
export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-center p-6">
      <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-4">
        404 - Page Not Found
      </h3>
      <p className="text-gray-600 dark:text-gray-400 mb-6">
        Oops! There's likelihood you got lost on the way.
      </p>
      <Link
        href="/student/dashboard"
        className="px-4 py-2 rounded-lg bg-green-600 text-white hover:bg-green-700 transition"
      >
        Go Home
      </Link>
    </div>
  );
}
