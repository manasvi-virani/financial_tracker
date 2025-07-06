// components/Navbar.tsx
import React, { useState } from "react";
import { UserCircle } from "lucide-react";
import { NavLink, useNavigate } from "react-router-dom";
import style from "./layout.module.css"; // Assuming you have a CSS module for styles
import { useAppSelector } from "../../hooks";
import { Popover, PopoverPanel } from "@headlessui/react";
// import { useAppDispatch } from "../../hooks";

const Navbar: React.FC = () => {
  const useData = useAppSelector((state) => state.user);
  const [isHovered, setIsHovered] = useState(false);
const navigate = useNavigate()
  const handelLogout = ()=>{
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setIsHovered(false)
navigate('/login')
}
  console.log("isHovered", isHovered);
  return (
    <nav className={`${style.navbar}`}>
      {/* Left: Logo & Name */}
      <div className="flex items-center space-x-2">
        <img
          src="assets/logo.png" 
          alt="Logo"
          className="h-10 w-10 rounded-xl"
        />
        <span className="text-xl font-semibold ">Finance Tracker</span>
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
        {/* <NavLink to="/settings" className={`${style.nav_link}`}>
          Settings
        </NavLink> */}
      </div>

      {/* Right: User Profile */}

      {/* You can replace this with actual user name/photo */}
      <Popover className="relative" onMouseLeave={() => setIsHovered(false)}>
        {/* <div
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className="flex items-center space-x-2 cursor-pointer"
      > */}
        <div
          className="flex items-center space-x-2"
          onMouseEnter={() => setIsHovered(true)}
        >
          <UserCircle className="h-8 w-8" />
          <span className="font-medium hidden sm:inline">
            Hi, {useData.firstname}
          </span>
        </div>

        {isHovered && (
          <PopoverPanel
            static
            className="absolute z-10 bg-white shadow-md p-4 rounded min-w-max -right-2.5 "
          >
            <div className="text-start text-sm flex flex-col gap-1 text-gray-700">
              <div className="flex gap-1">
                {" "}
                <p className=" ">{useData.firstname}</p>
                <p className="">{useData.lastname}</p>
              </div>
                <p className=" ">{useData.email}</p>
                <p onClick={()=>handelLogout()} className="cursor-pointer hover:underline">Log out</p>
            </div>
          </PopoverPanel>
        )}
        {/* </div> */}
      </Popover>
    </nav>
  );
};

export default Navbar;
