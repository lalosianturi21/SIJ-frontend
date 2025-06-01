import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  getSinglePublishPeriod,
  updatePublishPeriod,
} from "../../../../services/index/jurnalsPublishPeriods";

const EditPublishPeriods = () => {
  const queryClient = useQueryClient();
  const [publishperiodMonth, setPublishPeriodMonth] = useState("");
  const navigate = useNavigate();
  const { slug } = useParams();
  const userState = useSelector((state) => state.user);

  const { isLoading, isError } = useQuery({
    queryFn: () => getSinglePublishPeriod({ slug }),
    queryKey: ["publishperiods", slug],
    onSuccess: (data) => {
      setPublishPeriodMonth(data?.month);
    },
    refetchOnWindowFocus: false,
  });

  const { mutate: mutateUpdatePublishPeriod, isLoading: isLoadingUpdatePublishPeriod } =
    useMutation({
      mutationFn: ({ month, slug, token }) => {
        return updatePublishPeriod({ month, slug, token });
      },
      onSuccess: (data) => {
        queryClient.invalidateQueries(["publishperiods", slug]);
        toast.success("Publish Period is updated");

        // Tambahkan delay sebelum navigate agar toast sempat tampil
        setTimeout(() => {
          navigate(`/admin/publishperiods/manage`, { replace: true });
        }, 1000); // delay 1 detik
      },

      onError: (error) => {
        toast.error(error.message);
        console.log(error);
      },
    });

  const handleUpdatePublishPeriod = () => {
    if (!publishperiodMonth) return;
    mutateUpdatePublishPeriod({
      month: publishperiodMonth,
      slug,
      token: userState.userInfo.token,
    });
  };

  return (
    <>
      <ToastContainer position="top-right" autoClose={3000} hideProgressBar />
      <div className="max-w-3xl mx-auto py-8 px-6 border-2 border-white rounded-lg shadow-lg">
        <h4 className="text-2xl font-semibold text-white">Update Publish Periods</h4>
        <p className="mt-2 text-gray-500 text-sm">
          Edit the name of the publish period below:
        </p>

        {/* Publish Period Month */}
        <div className="mt-6">
          <label htmlFor="publishperiod-month" className="block text-sm font-medium text-white">
            Publish Periods Month
          </label>
          <input
            id="publishperiod-month"
            value={publishperiodMonth}
            onChange={(e) => setPublishPeriodMonth(e.target.value)}
            placeholder="Enter publish period month"
            className="w-full mt-2 px-4 py-3 text-white bg-transparent border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
        </div>


        {/* Submit Button */}
        <button
          disabled={isLoadingUpdatePublishPeriod || isLoading || isError}
          type="button"
          onClick={handleUpdatePublishPeriod}
          className={`mt-6 w-full py-3 px-6 text-white font-semibold rounded-lg transition duration-300 ease-in-out ${isLoadingUpdatePublishPeriod || isLoading || isError
              ? "bg-gray-500 cursor-not-allowed"
              : "bg-purple-500 hover:bg-purple-600 focus:ring-2 focus:ring-purple-500"
            }`}
        >
          {isLoadingUpdatePublishPeriod || isLoading ? "Updating..." : "Update Publish Periods"}
        </button>
      </div>
    </>
  );
};

export default EditPublishPeriods;
