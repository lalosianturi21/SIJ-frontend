import { useState } from "react";

const SearchBar = ({ className = "", onSearchKeyword }) => {
  const [searchKeyword, setSearchKeyword] = useState("");
  
    const handleSubmit = (e) => {
      e.preventDefault();
     onSearchKeyword(searchKeyword);
    };

  return (
    <div className='max-w-7xl flex justify-center mx-auto'>
      <div className='px-1 md:px-6 lg:px-16 md:w-11/12 w-full '>
        <form
          onSubmit={handleSubmit}
          className="flex shadow-shadow-2 rounded-2xl custom-ul-material-tailwind"
        >
          <div className='custom-width-material-tailwind rounded-s-2xl relative hidden md:flex w-1/5 bg-gradient-to-r from-linear-1-1 to-linear-1-2 items-center justify-center cursor-pointer'>
            <button
              type="submit"
              className="w-full h-full bg-linear-main text-center outline-none border-none text-lg font-medium font-inter text-black flex items-center justify-center px-3 py-2.5 rounded-[7px]"
            >
              <span className="text-white">Search</span>
            </button>
          </div>

          <div className="search-input flex justify-between w-full md:w-4/5 md:p-6 gap-5 bg-white px-3 py-5 border md:rounded-e-2xl rounded-2xl md:rounded-s-none items-center">
            <input
              type="text"
              className="w-full outline-none md:text-base text-xs"
              placeholder="Keyword: [Nama]"
              value={searchKeyword}
              onChange={(e) => setSearchKeyword(e.target.value)}
            />
            <button type="submit" className="cursor-pointer">
              <img src="/images/search.svg" alt="cari" />
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default SearchBar;