import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  getSingleColumnStyle,
  updateColumnStyle,
} from "../../../../services/index/jurnalsColumnStyles";

const EditColumnStyles = () => {
  const queryClient = useQueryClient();
  const [columnstyleName, setColumnStyleName] = useState("");
  const [columnstyleDescription, setColumnStyleDescription] = useState("");
  const navigate = useNavigate();
  const { slug } = useParams();
  const userState = useSelector((state) => state.user);

  const { isLoading, isError } = useQuery({
    queryFn: () => getSingleColumnStyle({ slug }),
    queryKey: ["columnstyles", slug],
    onSuccess: (data) => {
      setColumnStyleName(data?.name);
      setColumnStyleDescription(data?.description); // ✅ tambahkan ini
    },
    refetchOnWindowFocus: false,
  });

  const { mutate: mutateUpdateColumnStyle, isLoading: isLoadingUpdateColumnStyle } =
    useMutation({
      mutationFn: ({ name, description, slug, token }) => {
        return updateColumnStyle({ name, description, slug, token });
      },
      onSuccess: (data) => {
        queryClient.invalidateQueries(["columnstyles", slug]);
        toast.success("Column Style is updated");

        // Tambahkan delay sebelum navigate agar toast sempat tampil
        setTimeout(() => {
          navigate(`/admin/columnstyles/manage`, { replace: true });
        }, 1000); // delay 1 detik
      },

      onError: (error) => {
        toast.error(error.message);
        console.log(error);
      },
    });

  const handleUpdateColumnStyle = () => {
    if (!columnstyleName) return;
    mutateUpdateColumnStyle({
      name: columnstyleName,
      description: columnstyleDescription,
      slug,
      token: userState.userInfo.token,
    });
  };

  return (
    <>
      <ToastContainer position="top-right" autoClose={3000} hideProgressBar />
      <div className="max-w-3xl mx-auto py-8 px-6 border-2 border-white rounded-lg shadow-lg">
        <h4 className="text-2xl font-semibold text-white">Update Column Style</h4>
        <p className="mt-2 text-gray-500 text-sm">
          Edit the name and description of the column style below:
        </p>

        {/* Column Style Name */}
        <div className="mt-6">
          <label htmlFor="columnstyle-name" className="block text-sm font-medium text-white">
            Column Style Name
          </label>
          <input
            id="columnstyle-name"
            value={columnstyleName}
            onChange={(e) => setColumnStyleName(e.target.value)}
            placeholder="Enter column style name"
            className="w-full mt-2 px-4 py-3 text-white bg-transparent border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
        </div>

        {/* Column Style Description */}
        <div className="mt-4">
          <label htmlFor="columnstyle-description" className="block text-sm font-medium text-white">
            Column Style Description
          </label>
          <textarea
            id="columnstyle-description"
            value={columnstyleDescription}
            onChange={(e) => setColumnStyleDescription(e.target.value)}
            placeholder="Enter column style description"
            rows={4}
            className="w-full mt-2 px-4 py-3 text-white bg-transparent border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
        </div>

        {/* Submit Button */}
        <button
          disabled={isLoadingUpdateColumnStyle || isLoading || isError}
          type="button"
          onClick={handleUpdateColumnStyle}
          className={`mt-6 w-full py-3 px-6 text-white font-semibold rounded-lg transition duration-300 ease-in-out ${isLoadingUpdateColumnStyle || isLoading || isError
              ? "bg-gray-500 cursor-not-allowed"
              : "bg-purple-500 hover:bg-purple-600 focus:ring-2 focus:ring-purple-500"
            }`}
        >
          {isLoadingUpdateColumnStyle || isLoading ? "Updating..." : "Update Column Style"}
        </button>
      </div>
    </>
  );
};

export default EditColumnStyles;
