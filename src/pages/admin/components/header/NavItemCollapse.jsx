// NavItemCollapse.jsx
import React, { useEffect, useState } from "react";
import { FiChevronDown, FiChevronUp } from "react-icons/fi";

const NavItemCollapse = ({ title, children, icon, name, activeNavName, setActiveNavName }) => {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (activeNavName !== name) setIsOpen(false);
  }, [activeNavName, name]);

  return (
    <div className="w-full transition-all duration-300">
      <button
        className={`w-full flex items-center justify-between px-4 py-3 text-lg rounded-lg transition-colors duration-300 ${
          name === activeNavName ? "bg-purple-700 text-white" : "bg-purple-600 text-white hover:bg-orange-500"
        }`}
        onClick={() => {
          setActiveNavName(name);
          setIsOpen(!isOpen);
        }}
      >
        <div className="flex items-center gap-2">
          {icon}
          <span>{title}</span>
        </div>
        {isOpen ? <FiChevronUp /> : <FiChevronDown />}
      </button>
      {isOpen && <div className="mt-2 bg-white rounded-lg shadow p-3 space-y-2">{children}</div>}
    </div>
  );
};

export default NavItemCollapse;