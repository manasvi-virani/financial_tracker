// components/Navbar.tsx
import React from "react";
import { UserCircle } from "lucide-react"; 
import { NavLink } from "react-router-dom";
import style from "./layout.module.css"; // Assuming you have a CSS module for styles
import { useAppSelector } from "../../hooks";
// import { useAppDispatch } from "../../hooks";

const Navbar: React.FC = () => {
  const useData = useAppSelector((state)=>state.user);
  console.log('useData', useData)
  return (
    <nav className={`${style.navbar}`}>
      {/* Left: Logo & Name */}
      <div className="flex items-center space-x-2">
        <img
          src="assets/logo.jpg" // <-- replace with your actual logo path
          alt="Logo"
          className="h-10 w-10"
        />
        <span className="text-xl font-semibold text-gray-800">Finance Tracker</span>
      </div>

      {/* Center: Tabs */}
      <div className="hidden md:flex space-x-6">
        <NavLink to="/" className={`${style.nav_link}`}>
          Dashboard
        </NavLink>
        <NavLink to="/transactions" className={`${style.nav_link}`}>
          Transactions
        </NavLink>
        <NavLink to="/accounts" className={`${style.nav_link}`}>
          Account
        </NavLink>
        <NavLink to="/settings" className={`${style.nav_link}`}>
          Settings
        </NavLink>
      </div>

      {/* Right: User Profile */}
      <div className="flex items-center space-x-2">
        {/* You can replace this with actual user name/photo */}
        <UserCircle className="h-8 w-8 " />
        <span className=" font-medium hidden sm:inline">Hi, User</span>
      </div>
    </nav>
  );
};

export default Navbar;
