import React, { useState } from "react";

const Search = ({ className = "", onSearchKeyword }) => {
  const [searchKeyword, setSearchKeyword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearchKeyword({ searchKeyword });
  };

  return (
    <div className="flex max-w-7xl mx-auto items-center justify-center my-6">
      <form onSubmit={handleSubmit} className="flex shadow-shadow-2 rounded-2xl item-center w-full">
        <div className="flex bg-white px-6 w-4/5 border-solid border-2 border-linear-1-1 rounded-l-2xl items-center">
          <input
            type="text"
            className="w-full outline-none"
            placeholder="Please enter your search keyword"
            value={searchKeyword}
            onChange={(e) => setSearchKeyword(e.target.value)}
          />
        </div>
        <button
          type="submit"
          className="flex gap-5 items-center w-1/5 justify-around text-l px-16 py-5 rounded-r-2xl font-regular bg-linear-main text-white"
        >
          <svg
            stroke="currentColor"
            fill="currentColor"
            strokeWidth="0"
            viewBox="0 0 1024 1024"
            height="1em"
            width="1em"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M1014.64 969.04L703.71 656.207c57.952-69.408 92.88-158.704 92.88-256.208 0-220.912-179.088-400-400-400s-400 179.088-400 400 179.088 400 400 400c100.368 0 192.048-37.056 262.288-98.144l310.496 312.448c12.496 12.497 32.769 12.497 45.265 0 12.48-12.496 12.48-32.752 0-45.263zM396.59 736.527c-185.856 0-336.528-150.672-336.528-336.528S210.734 63.471 396.59 63.471c185.856 0 336.528 150.672 336.528 336.528S582.446 736.527 396.59 736.527z" />
          </svg>
          Cari
        </button>
      </form>
    </div>
  );
};

export default Search;
