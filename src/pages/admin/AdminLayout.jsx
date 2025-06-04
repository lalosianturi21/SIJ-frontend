// AdminLayout.jsx
import { Outlet, useNavigate } from "react-router-dom";
import Header from "./components/header/Header";
import { useQuery } from "@tanstack/react-query";
import { getUserProfile } from "../../services/index/users";
import { useSelector } from "react-redux";
import { toast } from "react-hot-toast";

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
        <h3 className="text-2xl text-black">Loading...</h3>
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