import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../store/actions/user"; // pastikan path benar
import { useNavigate } from "react-router-dom";

export default function SidebarMobile({ setIsSidebarOpen, setIsDetailSidebarOpen }) {
  const [showDropdownAuth, setShowDropdownAuth] = useState(false);
  const { userInfo } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    setIsSidebarOpen(false);
    navigate("/");
  };

  const toggleDropdownAuth = () => {
    setShowDropdownAuth((prev) => !prev);
  };

  return (
    <div className="fixed z-[49] h-full w-[75%] bg-white right-0 top-0 p-5 shadow-2xl md:hidden transition-all duration-300">
      <div className="mt-[100px]">
        <ul className="font-medium text-lg">
          {/* Tentang SIJ */}
          <li className="inline-flex gap-2 items-center mb-5 cursor-pointer" onClick={() => setIsDetailSidebarOpen(true)}>
            <div>Tentang SIJ</div>
            <img
              src="https://pddikti.kemdiktisaintek.go.id/static/media/dropdown-down.1936f1781dd5fc375bc89a8b4c65f3af.svg"
              alt=""
              style={{ transform: "rotate(270deg)" }}
            />
          </li>

          {/* Kebijakan Privasi */}
          <li className="mb-5">
            <a className="cursor-pointer" href="/privacy-policy" onClick={() => setIsSidebarOpen(false)}>
              Kebijakan Privasi
            </a>
          </li>

          {/* Sign Up / Account */}
          <li className="mb-5">
            <div
              className="flex items-center justify-between cursor-pointer hover:text-blue-600 transition"
              onClick={toggleDropdownAuth}
            >
              <span>{userInfo ? "Account" : "Sign Up"}</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className={`h-5 w-5 transform transition-transform duration-300 ${showDropdownAuth ? "rotate-180" : "rotate-0"
                  }`}
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M5.23 7.21a.75.75 0 011.06.02L10 11.584l3.71-4.354a.75.75 0 111.14.976l-4.25 5a.75.75 0 01-1.14 0l-4.25-5a.75.75 0 01.02-1.06z"
                  clipRule="evenodd"
                />
              </svg>
            </div>

            {showDropdownAuth && (
              <div className="mt-3 p-3 bg-gray-100 rounded-md shadow-md text-base space-y-2">
                {userInfo ? (
                  <>
                    {userInfo.admin && (
                      <a
                        href="/admin"
                        onClick={() => setIsSidebarOpen(false)}
                        className="block nav-link"
                      >
                        Admin Dashboard
                      </a>
                    )}
                    <a
                      href="/profile"
                      onClick={() => setIsSidebarOpen(false)}
                      className="block nav-link"
                    >
                      Profile
                    </a>
                    <button
                      onClick={handleLogout}
                      className="block text-left nav-link"
                    >
                      Logout
                    </button>
                  </>
                ) : (
                  <>
                    <a
                      href="/login"
                      onClick={() => setIsSidebarOpen(false)}
                      className="block nav-link"
                    >
                      Login
                    </a>
                    <a
                      href="/register"
                      onClick={() => setIsSidebarOpen(false)}
                      className="block nav-link"
                    >
                      Register
                    </a>
                  </>
                )}
              </div>
            )}
          </li>

        </ul>
      </div>
    </div>
  );
}
