import { useLocation } from "react-router-dom";
import { JSX, useEffect } from "react";

const NotFound = (): JSX.Element => {
  const location = useLocation();

  useEffect(() => {
    console.log(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-linear-to-b from-brand-900 via-brand-800 to-slate-900">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-4 text-white">404</h1>
        <p className="text-xl text-brand-200 mb-4">Oops! Page not found</p>
        <a
          href="/"
          className="text-yellow-400 hover:text-yellow-300 underline font-semibold"
        >
          Return to Home
        </a>
      </div>
    </div>
  );
};

export default NotFound;
