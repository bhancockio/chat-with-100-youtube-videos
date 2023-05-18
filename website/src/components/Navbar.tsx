import Link from "next/link";
import React from "react";

function Navbar() {
  return (
    <nav className="flex items-center justify-between bg-red-500 px-12 py-4">
      <div className="text-2xl font-bold text-white">
        Chat With Alex Hormozi
      </div>
    </nav>
  );
}

export default Navbar;
