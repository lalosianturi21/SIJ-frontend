import { Link, useNavigate } from "react-router-dom";
import { useWindowSize } from "@uidotdev/usehooks";
import { useEffect, useState } from "react";
import { AiFillDashboard, AiOutlineClose, AiOutlineMenu } from "react-icons/ai";
import { FaBolt, FaCalendar, FaComments, FaGlobe, FaMoneyBill, FaUniversity, FaUser } from "react-icons/fa";
import { MdDashboard, MdLanguage, MdLeaderboard, MdViewColumn } from "react-icons/md";
import NavItem from "./NavItem";
import NavItemCollapse from "./NavItemCollapse";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useSelector } from "react-redux";
import { createJurnal } from "../../../../services/index/jurnals";
import { ToastContainer, toast } from "react-toastify";
import { images } from "../../../../constants";
import "react-toastify/dist/ReactToastify.css";

const Header = () => {
  const navigate = useNavigate();
  const userState = useSelector((state) => state.user);
  const queryClient = useQueryClient();
  const [isMenuActive, setIsMenuActive] = useState(false);
  const [activeNavName, setActiveNavName] = useState("dashboard");

  const { mutate: mutateCreateJurnal, isLoading: isLoadingCreateJurnal } = useMutation({
    mutationFn: ({ token }) => createJurnal({ token }),
    onSuccess: (data) => {
      queryClient.invalidateQueries(["jurnals"]);
      toast.success("Jurnal created, edit it now! 🎉", { autoClose: 500 });
      navigate(`/admin/jurnals/manage/edit/${data.slug}`);
    },
    onError: (error) => {
      toast.error(error.message || "Failed to create jurnal.");
    },
  });

  const toggleMenuHandler = () => setIsMenuActive((prev) => !prev);

  useEffect(() => {
    setIsMenuActive(false); // Menu tertutup defaultnya
  }, []);

  const handleCreateNewJurnal = () => {
    if (!userState?.userInfo?.token) {
      toast.error("User is not authenticated.");
      return;
    }
    mutateCreateJurnal({ token: userState.userInfo.token });
  };

  return (
    <>
      <ToastContainer position="top-right" autoClose={3000} hideProgressBar />
      <header className="flex bg-black min-h-fit w-full items-center justify-between p-4">
        <Link to="/">
          <img src={images.Logo} alt="logo" className="w-42" />
        </Link>

        {/* Menu icon (selalu terlihat di semua ukuran layar) */}
        <div className="cursor-pointer">
          {isMenuActive ? (
            <AiOutlineClose className="w-6 h-6 text-white" onClick={toggleMenuHandler} />
          ) : (
            <AiOutlineMenu className="w-6 h-6 text-white" onClick={toggleMenuHandler} />
          )}
        </div>

        {/* Sidebar */}
        {isMenuActive && (
          <div className="fixed inset-0 z-120">
            <div className="fixed inset-0 bg-black/50" onClick={toggleMenuHandler} />
            <div className="bg-zinc-900 fixed top-0 bottom-0 left-0 z-50 overflow-y-auto p-4 w-[300px]">
              <Link to="/">
                <img src={images.Logo} alt="logo" className="w-42" />
              </Link>
              <h4 className="mt-10 font-semibold text-gray-400 uppercase">Main Menu</h4>
              <div className="mt-6 flex flex-col space-y-2">
                <NavItem
                  title="Dashboard"
                  link="/admin"
                  icon={<AiFillDashboard className="text-xl" />}
                  name="dashboard"
                  activeNavName={activeNavName}
                  setActiveNavName={setActiveNavName}
                />
                <NavItem
                  title="Comments"
                  link="/admin/comments"
                  icon={<FaComments className="text-xl" />}
                  name="comments"
                  activeNavName={activeNavName}
                  setActiveNavName={setActiveNavName}
                />
                <NavItem
                  title="Ranks"
                  link="/admin/ranks/manage"
                  icon={<MdLeaderboard className="text-xl" />}
                  name="ranks"
                  activeNavName={activeNavName}
                  setActiveNavName={setActiveNavName}
                />

                <NavItem
                  title="Column Styles"
                  link="/admin/columnstyles/manage"
                  icon={<MdViewColumn className="text-xl" />}
                  name="columstyles"
                  activeNavName={activeNavName}
                  setActiveNavName={setActiveNavName}
                />

                 <NavItem
                  title="Countries"
                  link="/admin/countries/manage"
                  icon={<FaGlobe className="text-xl" />}
                  name="countries"
                  activeNavName={activeNavName}
                  setActiveNavName={setActiveNavName}
                />
                
                 <NavItem
                  title="Currencies"
                  link="/admin/currencies/manage"
                  icon={<FaMoneyBill className="text-xl" />}
                  name="currencies"
                  activeNavName={activeNavName}
                  setActiveNavName={setActiveNavName}
                />

                 <NavItem
                  title="Institutions"
                  link="/admin/institutions/manage"
                  icon={<FaUniversity className="text-xl" />}
                  name="institutions"
                  activeNavName={activeNavName}
                  setActiveNavName={setActiveNavName}
                />

                <NavItem
                  title="Languages"
                  link="/admin/languages/manage"
                  icon={<MdLanguage className="text-xl" />}
                  name="languages"
                  activeNavName={activeNavName}
                  setActiveNavName={setActiveNavName}
                />
                
                <NavItem
                  title="Publish Periods"
                  link="/admin/publishperiods/manage"
                  icon={<FaCalendar className="text-xl" />}
                  name="publishperiods"
                  activeNavName={activeNavName}
                  setActiveNavName={setActiveNavName}
                />

                 <NavItem
                  title="Tracks"
                  link="/admin/tracks/manage"
                  icon={<FaBolt className="text-xl" />}
                  name="tracks"
                  activeNavName={activeNavName}
                  setActiveNavName={setActiveNavName}
                />

                <NavItemCollapse
                  title="Jurnal"
                  icon={<MdDashboard className="text-xl" />}
                  name="jurnals"
                  activeNavName={activeNavName}
                  setActiveNavName={setActiveNavName}
                >
                  <Link
                    to="/admin/jurnals/manage"
                    className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-700 hover:text-black rounded-md transition"
                  >
                    <span className="text-lg">📋</span> Manage all Jurnal
                  </Link>
                  <button
                    disabled={isLoadingCreateJurnal}
                    className={`flex items-center gap-1.5 px-4 py-2 text-sm font-medium rounded-md w-full text-left transition ${
                      isLoadingCreateJurnal
                        ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                        : "text-gray-700 hover:text-black"
                    }`}
                    onClick={handleCreateNewJurnal}
                  >
                    <span className="text-lg">✨</span> Add New Jurnal
                  </button>
                </NavItemCollapse>

                <NavItem
                  title="Users"
                  link="/admin/users/manage"
                  icon={<FaUser className="text-xl" />}
                  name="users"
                  activeNavName={activeNavName}
                  setActiveNavName={setActiveNavName}
                />
              </div>
            </div>
          </div>
        )}
      </header>
    </>
  );
};

export default Header;
