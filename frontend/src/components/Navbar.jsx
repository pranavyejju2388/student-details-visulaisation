import React from "react";

const Navbar = () => {
  return (
    <nav className="bg-white shadow-md p-4 flex justify-between">
      <input type="text" placeholder="Search..." className="p-2 border rounded-md" />
      <span className="text-gray-600">admin@school.edu</span>
    </nav>
  );
};

export default Navbar;
