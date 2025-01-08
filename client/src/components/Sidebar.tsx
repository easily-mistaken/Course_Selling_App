import { Link } from "react-router-dom";
import { Home, BookOpen, ShoppingCart, Settings } from "lucide-react";

export default function Sidebar() {
  const menuItems = [
    { icon: Home, label: "Home", path: "/" },
    { icon: BookOpen, label: "Courses", path: "/courses" },
    { icon: ShoppingCart, label: "Purchases", path: "/purchases" },
    { icon: Settings, label: "Settings", path: "/settings" },
  ];

  return (
    <aside className="w-64 bg-white shadow-lg h-screen fixed left-0 top-16">
      <div className="py-4">
        <ul className="space-y-2">
          {menuItems.map((item) => (
            <li key={item.label}>
              <Link
                to={item.path}
                className="flex items-center space-x-3 px-6 py-3 text-gray-600 hover:bg-indigo-50 hover:text-indigo-600"
              >
                <item.icon className="h-5 w-5" />
                <span>{item.label}</span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </aside>
  );
}
