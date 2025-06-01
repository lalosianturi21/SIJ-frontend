import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  getSingleLanguage,
  updateLanguage,
} from "../../../../services/index/jurnalsLanguages";

const EditLanguages = () => {
  const queryClient = useQueryClient();
  const [languageName, setLanguageName] = useState("");
  const navigate = useNavigate();
  const { slug } = useParams();
  const userState = useSelector((state) => state.user);

  const { isLoading, isError } = useQuery({
    queryFn: () => getSingleLanguage({ slug }),
    queryKey: ["languages", slug],
    onSuccess: (data) => {
      setLanguageName(data?.name);
    },
    refetchOnWindowFocus: false,
  });

  const { mutate: mutateUpdateLanguage, isLoading: isLoadingUpdateLanguage } =
    useMutation({
      mutationFn: ({ name, slug, token }) => {
        return updateLanguage({ name, slug, token });
      },
      onSuccess: (data) => {
        queryClient.invalidateQueries(["languages", slug]);
        toast.success("Language is updated");

        // Tambahkan delay sebelum navigate agar toast sempat tampil
        setTimeout(() => {
          navigate(`/admin/languages/manage`, { replace: true });
        }, 1000); // delay 1 detik
      },

      onError: (error) => {
        toast.error(error.message);
        console.log(error);
      },
    });

  const handleUpdateLanguage = () => {
    if (!languageName) return;
    mutateUpdateLanguage({
      name: languageName,
      slug,
      token: userState.userInfo.token,
    });
  };

  return (
    <>
      <ToastContainer position="top-right" autoClose={3000} hideProgressBar />
      <div className="max-w-3xl mx-auto py-8 px-6 border-2 border-white rounded-lg shadow-lg">
        <h4 className="text-2xl font-semibold text-white">Update Language</h4>
        <p className="mt-2 text-gray-500 text-sm">
          Edit the name of the languag below:
        </p>

        {/* Language Name */}
        <div className="mt-6">
          <label htmlFor="language-name" className="block text-sm font-medium text-white">
            Language Name
          </label>
          <input
            id="language-name"
            value={languageName}
            onChange={(e) => setLanguageName(e.target.value)}
            placeholder="Enter language name"
            className="w-full mt-2 px-4 py-3 text-white bg-transparent border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
        </div>


        {/* Submit Button */}
        <button
          disabled={isLoadingUpdateLanguage || isLoading || isError}
          type="button"
          onClick={handleUpdateLanguage}
          className={`mt-6 w-full py-3 px-6 text-white font-semibold rounded-lg transition duration-300 ease-in-out ${isLoadingUpdateLanguage || isLoading || isError
              ? "bg-gray-500 cursor-not-allowed"
              : "bg-purple-500 hover:bg-purple-600 focus:ring-2 focus:ring-purple-500"
            }`}
        >
          {isLoadingUpdateLanguage || isLoading ? "Updating..." : "Update Language"}
        </button>
      </div>
    </>
  );
};

export default EditLanguages;
