
import { JSX } from "react";

const LoadingSpinner = (): JSX.Element => {
  return (
    <div className="min-h-screen bg-nebula flex items-center justify-center">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white mx-auto mb-4"></div>
        <p className="text-white text-lg">Loading...</p>
      </div>
    </div>
  );
};

export default LoadingSpinner;
