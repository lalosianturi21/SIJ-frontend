import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  getSingleRank,
  updateRank,
} from "../../../../services/index/jurnalsRanks";

const EditRanks = () => {
  const queryClient = useQueryClient();
  const [rankName, setRankName] = useState("");
  const [rankDescription, setRankDescription] = useState("");
  const navigate = useNavigate();
  const { slug } = useParams();
  const userState = useSelector((state) => state.user);

  const { isLoading, isError } = useQuery({
    queryFn: () => getSingleRank({ slug }),
    queryKey: ["ranks", slug],
    onSuccess: (data) => {
      setRankName(data?.name);
      setRankDescription(data?.description); // ✅ tambahkan ini
    },
    refetchOnWindowFocus: false,
  });

  const { mutate: mutateUpdateRank, isLoading: isLoadingUpdateRank } =
    useMutation({
      mutationFn: ({ name, description, slug, token }) => {
        return updateRank({ name, description, slug, token });
      },
      onSuccess: (data) => {
        queryClient.invalidateQueries(["ranks", slug]);
        toast.success("Rank is updated");

        // Tambahkan delay sebelum navigate agar toast sempat tampil
        setTimeout(() => {
          navigate(`/admin/ranks/manage`, { replace: true });
        }, 1000); // delay 1 detik
      },

      onError: (error) => {
        toast.error(error.message);
        console.log(error);
      },
    });

  const handleUpdateRank = () => {
    if (!rankName) return;
    mutateUpdateRank({
      name: rankName,
      description: rankDescription,
      slug,
      token: userState.userInfo.token,
    });
  };

  return (
    <>
      <ToastContainer position="top-right" autoClose={3000} hideProgressBar />
      <div className="max-w-3xl mx-auto py-8 px-6 border-2 border-white rounded-lg shadow-lg">
        <h4 className="text-2xl font-semibold text-white">Update Rank</h4>
        <p className="mt-2 text-gray-500 text-sm">
          Edit the name and description of the rank below:
        </p>

        {/* Rank Name */}
        <div className="mt-6">
          <label htmlFor="rank-name" className="block text-sm font-medium text-white">
            Rank Name
          </label>
          <input
            id="rank-name"
            value={rankName}
            onChange={(e) => setRankName(e.target.value)}
            placeholder="Enter rank name"
            className="w-full mt-2 px-4 py-3 text-white bg-transparent border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
        </div>

        {/* Rank Description */}
        <div className="mt-4">
          <label htmlFor="rank-description" className="block text-sm font-medium text-white">
            Rank Description
          </label>
          <textarea
            id="rank-description"
            value={rankDescription}
            onChange={(e) => setRankDescription(e.target.value)}
            placeholder="Enter rank description"
            rows={4}
            className="w-full mt-2 px-4 py-3 text-white bg-transparent border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
        </div>

        {/* Submit Button */}
        <button
          disabled={isLoadingUpdateRank || isLoading || isError}
          type="button"
          onClick={handleUpdateRank}
          className={`mt-6 w-full py-3 px-6 text-white font-semibold rounded-lg transition duration-300 ease-in-out ${isLoadingUpdateRank || isLoading || isError
              ? "bg-gray-500 cursor-not-allowed"
              : "bg-purple-500 hover:bg-purple-600 focus:ring-2 focus:ring-purple-500"
            }`}
        >
          {isLoadingUpdateRank || isLoading ? "Updating..." : "Update Rank"}
        </button>
      </div>
    </>
  );
};

export default EditRanks;
