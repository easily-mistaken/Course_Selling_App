import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { BookOpen, Home, ShoppingCart, Settings, LogOut, Twitter, Instagram, Youtube, User, PanelLeftClose, PanelLeft } from 'lucide-react';

const SIDEBAR_OPTIONS = [
  { name: "Home", to: "/", icon: <Home className="w-5 h-5" /> },
  { name: "Courses", to: "/courses", icon: <BookOpen className="w-5 h-5" /> },
  { name: "Purchases", to: "/purchases", icon: <ShoppingCart className="w-5 h-5" /> },
  { name: "Settings", to: "/", icon: <Settings className="w-5 h-5" /> },
  { name: "Logout", to: "/signin", icon: <LogOut className="w-5 h-5" /> },
];

export default function Layout({ children }: { children: React.ReactNode }) {
  const navigate = useNavigate();
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  return (
    <div className="w-screen min-h-screen flex flex-col">
      <nav className="flex justify-between items-center px-[5%] py-2 shadow-lg sticky top-0 bg-white z-20">
        <div className="w-12 cursor-pointer" onClick={() => navigate('/')}>
          <BookOpen className="w-full h-full text-indigo-600" />
        </div>
        <div>
          <div className="w-10 cursor-pointer">
            <User className="w-full h-full" />
          </div>
        </div>
      </nav>

      <div className="flex flex-1">
        <aside className={`bg-slate-200 ${isSidebarOpen ? 'w-1/5' : 'w-16'} px-4 py-[2%] text-sm sticky top-16 h-[calc(100vh-40px)] transition-all duration-300`}>
          <h4 className={`font-semibold text-gray-600 ${!isSidebarOpen && 'hidden'}`}>MAIN MENU</h4>
          <ul className="mt-[30%] space-y-9">
            {SIDEBAR_OPTIONS.map((option) => (
              <li
                className="flex items-center space-x-3 cursor-pointer hover:text-indigo-600"
                key={option.name}
                onClick={() => navigate(option.to)}
              >
                <span>{option.icon}</span>
                <span className={!isSidebarOpen ? 'hidden' : ''}>{option.name}</span>
              </li>
            ))}
          </ul>
          <button 
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="absolute bottom-4 left-1/2 -translate-x-1/2 p-2 hover:bg-slate-300 rounded-full transition-colors"
          >
            {isSidebarOpen ? <PanelLeftClose className="w-5 h-5" /> : <PanelLeft className="w-5 h-5" />}
          </button>
        </aside>

        <div className="flex-1 flex flex-col px-[7%]">
          <div className="flex-grow">{children}</div>
          
          <footer className="bg-slate-200 flex justify-between text-sm p-10 rounded-t-lg shadow-xl mt-8">
            <div className="w-20">
              <BookOpen className="w-full h-full text-indigo-600" />
            </div>
            
            <div className="space-y-4">
              <h5 className="font-bold">Quick Links</h5>
              <ul className="space-y-1">
                <li className="text-blue-600 hover:underline cursor-pointer">
                  Terms & Conditions
                </li>
                <li className="text-blue-600 hover:underline cursor-pointer">
                  Privacy Policy
                </li>
                <li className="text-blue-600 hover:underline cursor-pointer">
                  Refunds & Cancellation Policy
                </li>
              </ul>
            </div>

            <div className="space-y-4">
              <div className="space-y-2">
                <h5 className="font-bold">Download App</h5>
                <div className="w-28">
                  <img 
                    src="https://play.google.com/intl/en_us/badges/static/images/badges/en_badge_web_generic.png" 
                    alt="Get it on Google Play"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <h5 className="font-bold">Follow us</h5>
                <ul className="flex gap-2 items-center">
                  <li className="cursor-pointer hover:text-blue-400">
                    <Twitter className="w-5 h-5" />
                  </li>
                  <li className="cursor-pointer hover:text-pink-500">
                    <Instagram className="w-5 h-5" />
                  </li>
                  <li className="cursor-pointer hover:text-red-500">
                    <Youtube className="w-5 h-5" />
                  </li>
                </ul>
              </div>
            </div>
          </footer>
        </div>
      </div>
    </div>
  );
}