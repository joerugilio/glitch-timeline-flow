
import { useLocation } from "react-router-dom";
import { useEffect } from "react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="text-center p-4">
        <h1 className="text-2xl font-bold mb-2">404</h1>
        <p className="text-lg text-gray-600 mb-2">Oops! Page not found</p>
        <a href="/" className="text-blue-500 hover:text-blue-700 underline text-sm">
          Return to Home
        </a>
      </div>
    </div>
  );
};

export default NotFound;
