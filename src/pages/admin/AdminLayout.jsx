// AdminLayout.jsx
import { Outlet, useNavigate } from "react-router-dom";
import Header from "./components/header/Header";
import { useQuery } from "@tanstack/react-query";
import { getUserProfile } from "../../services/index/users";
import { useSelector } from "react-redux";
import { toast } from "react-hot-toast";
import { FaSpinner } from "react-icons/fa";

const AdminLayout = () => {
  const navigate = useNavigate();
  const userState = useSelector((state) => state.user);

  const {
    isLoading: profileIsLoading,
  } = useQuery({
    queryFn: () => getUserProfile({ token: userState.userInfo.token }),
    queryKey: ["profile"],
    onSuccess: (data) => {
      if (!data?.admin) {
        navigate("/");
        toast.error("You are not allowed to access admin panel");
      }
    },
    onError: (err) => {
      console.log(err);
      navigate("/");
      toast.error("You are not allowed to access admin panel");
    },
  });

  if (profileIsLoading) {
    return (
      <div className="w-full min-h-screen flex justify-center items-center">
        <tr>
          <td colSpan={5} className="text-center py-10 w-full">
            <div className="flex justify-center items-center gap-2">
              <FaSpinner className="animate-spin text-blue-500 text-4xl" />
              <span className="text-black text-sm">Loading...</span>
            </div>
          </td>
        </tr>
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen lg:flex-row">
      <Header />
      <main className="bg-zinc-900 flex-1 p-4 lg:p-6 text-white">
        <Outlet />
      </main>
    </div>
  );
};

export default AdminLayout;