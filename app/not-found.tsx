"use client";

import { useEffect } from "react";
import Link from "next/link";

export default function NotFound() {
  useEffect(() => {
    console.log("404 Error: User attempted to access non-existent route");
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center bg-nebula">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-4 text-white">404</h1>
        <p className="text-xl text-brand-200 mb-4">Oops! Page not found</p>
        <Link
          href="/"
          className="text-yellow-400 hover:text-yellow-300 underline font-semibold"
        >
          Return to Home
        </Link>
      </div>
    </div>
  );
}
