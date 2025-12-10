import { useState } from "react";
import { useAuthStore } from "../store/useAuthStore";
import { Link } from "react-router-dom";
import { Menu, Plus } from 'lucide-react';

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const { logout } = useAuthStore();

  const navItems = [
    { label: "Home", href: "/" },
    { label: "Profile", href: "/profile" },
    { label: "Entries", href: "/entries" }
  ];

  return (
    <nav className="mx-4 px-6 py-4 rounded-full text-white text-sm flex items-center justify-between relative">

      {/* Logo */}
      <Link to="/" className="flex items-center gap-3">
        <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
          <circle cx="4.706" cy="16" r="4.706" fill="#D9D9D9" />
          <circle cx="16.001" cy="4.706" r="4.706" fill="#D9D9D9" />
          <circle cx="16.001" cy="27.294" r="4.706" fill="#D9D9D9" />
          <circle cx="27.294" cy="16" r="4.706" fill="#D9D9D9" />
        </svg>
        <h1 className="fancy-font text-xl">My Diary</h1>
      </Link>

      {/* Menu */}
      <div
        className={`
    flex flex-col md:flex-row md:items-center gap-6 
    absolute md:static left-0 top-[70px] w-full md:w-auto 
    transition-all duration-300 z-50

    bg-[#0D0D0D] md:bg-transparent
    ${open ? "opacity-100 visible py-6" : "opacity-0 invisible md:opacity-100 md:visible"}
  `}
      >

        {navItems.map((item) => (
          <Link
            key={item.label}
            to={item.href}
            className="relative overflow-hidden h-6 group block text-center md:text-left"
          >
            <span className="block group-hover:-translate-y-full transition-transform duration-300">
              {item.label}
            </span>
            <span className="block absolute top-full left-0 group-hover:translate-y-[-100%] transition-transform duration-300">
              {item.label}
            </span>
          </Link>
        ))}

        <button
          onClick={logout}
          className="bg-white hover:shadow-[0px_0px_30px_14px] shadow-[0px_0px_30px_7px] hover:shadow-white/50 shadow-white/50 text-black px-4 py-2 rounded-full hover:bg-slate-100 transition duration-300 md:ml-6"
        >
          Logout
        </button>
      </div>

      {/* Toggle Button */}
      <button className="md:hidden text-gray-300" onClick={() => setOpen(!open)}>
        <Menu />
      </button>
    </nav>
  );
};

export default Navbar;
