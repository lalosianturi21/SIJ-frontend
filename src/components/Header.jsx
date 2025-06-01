import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout } from "../store/actions/user"; // pastikan path ini benar

export default function Header({ isSidebarOpen, setIsSidebarOpen }) {
  const [showDropdownPDDikti, setShowDropdownPDDikti] = useState(false);
  const [showDropdownAuth, setShowDropdownAuth] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { userInfo } = useSelector((state) => state.user);

  const handleLogout = () => {
    dispatch(logout());
    navigate("/");
  };

  const toggleDropdownPDDikti = () => {
    setShowDropdownPDDikti((prev) => !prev);
    setShowDropdownAuth(false);
  };

  const toggleDropdownAuth = () => {
    setShowDropdownAuth((prev) => !prev);
    setShowDropdownPDDikti(false);
  };

  return (
    <div className="w-full bg-white flex justify-center items-center mx-auto navbar">
      <div className="fixed top-0 flex justify-between items-center left-0 lg:px-16 px-4 w-full py-4 bg-white shadow-md z-50">
        <a className="flex items-center gap-2 cursor-pointer" href="/" target="_top">
          <img
            src="/images/logo.png" width="50" height="60"
            alt="logo"
          />
          <div className="w-1/2 md:w-full">
            <img
              src="/images/headerlogo.png" width="180" height="60"
              alt="logo"
            />
          </div>
        </a>

        {/* Sidebar toggle */}
        <div className="flex md:hidden items-center">
          <button onClick={() => setIsSidebarOpen(!isSidebarOpen)} className="focus:outline-none">
            {isSidebarOpen ? (
              // close icon
              <svg xmlns="http://www.w3.org/2000/svg" width="35" height="35" viewBox="0 0 16 16">
                <defs>
                  <linearGradient id="x-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stop-color="#B3E5FC" />
                    <stop offset="100%" stop-color="#0288D1" />
                  </linearGradient>
                </defs>
                <path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8 2.146 2.854Z"
                  fill="url(#x-gradient)" />
              </svg>
            ) : (
              // hamburger icon
              <svg xmlns="http://www.w3.org/2000/svg" width="35" height="35" viewBox="0 0 16 16">
                <defs>
                  <linearGradient id="list-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" style={{ stopColor: '#B3E5FC' }} />
                    <stop offset="100%" style={{ stopColor: '#0288D1' }} />
                  </linearGradient>
                </defs>
                <path d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5z"
                  fill="url(#list-gradient)" fillRule="evenodd" />
              </svg>

            )}
          </button>
        </div>

        {/* Menu Desktop */}
        <div className="items-center gap-7 md:flex hidden">
          <ul className="flex gap-7">
            {/* Tentang SIJ */}
            <div className="relative">
              <a href="/about">
                <li className="flex gap-2 items-center cursor-pointer font-medium text-lg">
                  Tentang SIJ
                </li>
              </a>

              {showDropdownPDDikti && (
                <div className="absolute left-0 top-full mt-2 p-6 w-[200px] bg-white rounded-md shadow-lg z-50">
                  <div className="flex flex-col gap-2">
                    <a className="nav-link" href="/profil-lembaga">Profil Lembaga</a>
                    <a className="nav-link" href="/standar-pelayanan">Standar Pelayanan</a>
                    <a href="https://kanalpengetahuandikti.kemdiktisaintek.go.id" target="_blank" className="nav-link">FAQ</a>
                  </div>
                </div>
              )}
            </div>

            {/* Sign Up / Account Dropdown */}
            <div className="relative">
              <li className="flex gap-2 items-center cursor-pointer font-medium text-lg" onClick={toggleDropdownAuth}>
                {userInfo ? userInfo.name : 'Sign Up'}

                <img
                  src="https://pddikti.kemdiktisaintek.go.id/static/media/dropdown-down.1936f1781dd5fc375bc89a8b4c65f3af.svg"
                  alt=""
                  className={`transition-transform duration-300 ${showDropdownAuth ? 'rotate-180' : ''}`}
                />
              </li>
              {showDropdownAuth && (
                <div className="absolute left-0 top-full mt-2 p-6 w-[200px] bg-white rounded-md shadow-lg z-50">
                  <div className="flex flex-col gap-2">
                    {userInfo ? (
                      <>
                        {userInfo.admin && <a className="nav-link" href="/admin">Admin Dashboard</a>}
                        <a className="nav-link" href="/profile">Profile</a>
                        <button className="nav-link text-left" onClick={handleLogout}>Logout</button>
                      </>
                    ) : (
                      <>
                        <a className="nav-link" href="/login">Login</a>
                        <a className="nav-link" href="/register">Register</a>
                      </>
                    )}
                  </div>
                </div>
              )}
            </div>
          </ul>
        </div>
      </div>
    </div>
  );
}
