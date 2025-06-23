import React from "react";

const NavBar = () => {
  return (
    <nav className="bg-black text-white px-6 py-4 flex justify-between items-center">
      {/* Logo */}
      <div className="text-2xl font-extrabold tracking-wide">
        UBIQUE
      </div>

      {/* Links */}
      <div className="space-x-6 text-sm font-semibold">
        <a href="/shop" className="text-orange-500 hover:text-orange-400">
          SHOP
        </a>
        <a href="/login" className="hover:text-gray-300">
          LOGIN
        </a>
      </div>
    </nav>
  );
};

export default NavBar;
