// components/Layout.tsx
import React from "react";
import Navbar from "./Navbar";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="">
      <Navbar />
      <main className="p-4">{children}</main>
    </div>
  );
};

export default Layout;
