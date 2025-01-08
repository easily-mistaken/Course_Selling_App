import { Backpack, Target } from "lucide-react";

type RoleSelectionProps = {
  onRoleSelect: (role: "student" | "teacher") => void;
};

export default function RoleSelection({ onRoleSelect }: RoleSelectionProps) {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="text-center text-3xl font-extrabold text-gray-900">
          Choose your role
        </h2>
        <p className="mt-2 text-center text-sm text-gray-600">
          Select how you want to use our platform
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <div className="space-y-4">
            <button
              onClick={() => onRoleSelect("student")}
              className="w-full flex items-center justify-center space-x-3 px-4 py-6 border-2 border-gray-300 rounded-lg hover:border-indigo-500 hover:bg-indigo-50 transition-colors"
            >
              <Backpack className="h-8 w-8 text-indigo-600" />
              <div className="text-left">
                <div className="text-lg font-medium text-gray-900">Student</div>
                <div className="text-sm text-gray-500">
                  Learn from our courses
                </div>
              </div>
            </button>

            <button
              onClick={() => onRoleSelect("teacher")}
              className="w-full flex items-center justify-center space-x-3 px-4 py-6 border-2 border-gray-300 rounded-lg hover:border-indigo-500 hover:bg-indigo-50 transition-colors"
            >
              <Target className="h-8 w-8 text-indigo-600" />
              <div className="text-left">
                <div className="text-lg font-medium text-gray-900">Teacher</div>
                <div className="text-sm text-gray-500">
                  Create and sell courses
                </div>
              </div>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
