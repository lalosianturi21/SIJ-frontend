// NavItem.jsx
import React from "react";
import { NavLink } from "react-router-dom";

const NavItem = ({ link, title, icon, name, activeNavName, setActiveNavName }) => {
  return (
    <NavLink
      to={link}
      className={`flex items-center gap-2 py-2 px-4 text-lg text-white rounded-lg transition-colors duration-300 ${
        name === activeNavName ? "font-bold text-white bg-zinc-800" : "font-medium text-gray-400 hover:text-white hover:bg-zinc-700"
      }`}
      onClick={() => setActiveNavName(name)}
    >
      {icon}
      {title}
    </NavLink>
  );
};

export default NavItem;