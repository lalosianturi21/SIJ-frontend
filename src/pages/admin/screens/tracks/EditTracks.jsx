import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  getSingleTrack,
  updateTrack,
} from "../../../../services/index/jurnalsTracks";

const EditTracks = () => {
  const queryClient = useQueryClient();
  const [trackName, setTrackName] = useState("");
  const [trackDescription, setTrackDescription] = useState("");
  const navigate = useNavigate();
  const { slug } = useParams();
  const userState = useSelector((state) => state.user);

  const { isLoading, isError } = useQuery({
    queryFn: () => getSingleTrack({ slug }),
    queryKey: ["tracks", slug],
    onSuccess: (data) => {
      setTrackName(data?.name);
      setTrackDescription(data?.description); // ✅ tambahkan ini
    },
    refetchOnWindowFocus: false,
  });

  const { mutate: mutateUpdateTrack, isLoading: isLoadingUpdateTrack } =
    useMutation({
      mutationFn: ({ name, description, slug, token }) => {
        return updateTrack({ name, description, slug, token });
      },
      onSuccess: (data) => {
        queryClient.invalidateQueries(["tracks", slug]);
        toast.success("Track is updated");

        // Tambahkan delay sebelum navigate agar toast sempat tampil
        setTimeout(() => {
          navigate(`/admin/tracks/manage`, { replace: true });
        }, 1000); // delay 1 detik
      },

      onError: (error) => {
        toast.error(error.message);
        console.log(error);
      },
    });

  const handleUpdateTrack = () => {
    if (!trackName) return;
    mutateUpdateTrack({
      name: trackName,
      description: trackDescription,
      slug,
      token: userState.userInfo.token,
    });
  };

  return (
    <>
      <ToastContainer position="top-right" autoClose={3000} hideProgressBar />
      <div className="max-w-3xl mx-auto py-8 px-6 border-2 border-white rounded-lg shadow-lg">
        <h4 className="text-2xl font-semibold text-white">Update Track</h4>
        <p className="mt-2 text-gray-500 text-sm">
          Edit the name and description of the track below:
        </p>

        {/* Track Name */}
        <div className="mt-6">
          <label htmlFor="track-name" className="block text-sm font-medium text-white">
            Track Name
          </label>
          <input
            id="track-name"
            value={trackName}
            onChange={(e) => setTrackName(e.target.value)}
            placeholder="Enter track name"
            className="w-full mt-2 px-4 py-3 text-white bg-transparent border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
        </div>

        {/* Track Description */}
        <div className="mt-4">
          <label htmlFor="track-description" className="block text-sm font-medium text-white">
            Track Description
          </label>
          <textarea
            id="track-description"
            value={trackDescription}
            onChange={(e) => setTrackDescription(e.target.value)}
            placeholder="Enter track description"
            rows={4}
            className="w-full mt-2 px-4 py-3 text-white bg-transparent border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
        </div>

        {/* Submit Button */}
        <button
          disabled={isLoadingUpdateTrack || isLoading || isError}
          type="button"
          onClick={handleUpdateTrack}
          className={`mt-6 w-full py-3 px-6 text-white font-semibold rounded-lg transition duration-300 ease-in-out ${isLoadingUpdateTrack || isLoading || isError
              ? "bg-gray-500 cursor-not-allowed"
              : "bg-purple-500 hover:bg-purple-600 focus:ring-2 focus:ring-purple-500"
            }`}
        >
          {isLoadingUpdateTrack || isLoading ? "Updating..." : "Update Track"}
        </button>
      </div>
    </>
  );
};

export default EditTracks;
