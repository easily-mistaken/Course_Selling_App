import { Link } from "react-router-dom";
import { BookOpen, LogIn, UserPlus } from "lucide-react";

export default function Navbar() {
  return (
    <nav className="bg-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center space-x-2">
              <BookOpen className="h-8 w-8 text-indigo-600" />
              <span className="text-xl font-bold text-gray-800">LearnHub</span>
            </Link>
          </div>

          <div className="flex items-center space-x-4">
            <Link
              to="/signin"
              className="flex items-center space-x-1 px-4 py-2 rounded-md text-gray-600 hover:text-indigo-600"
            >
              <LogIn className="h-5 w-5" />
              <span>Sign In</span>
            </Link>
            <Link
              to="/signup"
              className="flex items-center space-x-1 px-4 py-2 rounded-md bg-indigo-600 text-white hover:bg-indigo-700"
            >
              <UserPlus className="h-5 w-5" />
              <span>Sign Up</span>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
