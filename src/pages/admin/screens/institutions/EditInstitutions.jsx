import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  getSingleInstitution,
  updateInstitution,
} from "../../../../services/index/jurnalsInstitutions";

const EditInstitutions = () => {
  const queryClient = useQueryClient();
  const [institutionName, setInstitutionName] = useState("");
  const navigate = useNavigate();
  const { slug } = useParams();
  const userState = useSelector((state) => state.user);

  const { isLoading, isError } = useQuery({
    queryFn: () => getSingleInstitution({ slug }),
    queryKey: ["institutions", slug],
    onSuccess: (data) => {
      setInstitutionName(data?.name);
    },
    refetchOnWindowFocus: false,
  });

  const { mutate: mutateUpdateInstitution, isLoading: isLoadingUpdateInstitution } =
    useMutation({
      mutationFn: ({ name, slug, token }) => {
        return updateInstitution({ name, slug, token });
      },
      onSuccess: (data) => {
        queryClient.invalidateQueries(["institutions", slug]);
        toast.success("Institution is updated");

        // Tambahkan delay sebelum navigate agar toast sempat tampil
        setTimeout(() => {
          navigate(`/admin/institutions/manage`, { replace: true });
        }, 1000); // delay 1 detik
      },

      onError: (error) => {
        toast.error(error.message);
        console.log(error);
      },
    });

  const handleUpdateInstitution = () => {
    if (!institutionName) return;
    mutateUpdateInstitution({
      name: institutionName,
      slug,
      token: userState.userInfo.token,
    });
  };

  return (
    <>
      <ToastContainer position="top-right" autoClose={3000} hideProgressBar />
      <div className="max-w-3xl mx-auto py-8 px-6 border-2 border-white rounded-lg shadow-lg">
        <h4 className="text-2xl font-semibold text-white">Update Institution</h4>
        <p className="mt-2 text-gray-500 text-sm">
          Edit the name of the institution below:
        </p>

        {/* Institution Name */}
        <div className="mt-6">
          <label htmlFor="institution-name" className="block text-sm font-medium text-white">
            Institution Name
          </label>
          <input
            id="institution-name"
            value={institutionName}
            onChange={(e) => setInstitutionName(e.target.value)}
            placeholder="Enter institution name"
            className="w-full mt-2 px-4 py-3 text-white bg-transparent border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
        </div>


        {/* Submit Button */}
        <button
          disabled={isLoadingUpdateInstitution || isLoading || isError}
          type="button"
          onClick={handleUpdateInstitution}
          className={`mt-6 w-full py-3 px-6 text-white font-semibold rounded-lg transition duration-300 ease-in-out ${isLoadingUpdateInstitution || isLoading || isError
              ? "bg-gray-500 cursor-not-allowed"
              : "bg-purple-500 hover:bg-purple-600 focus:ring-2 focus:ring-purple-500"
            }`}
        >
          {isLoadingUpdateInstitution || isLoading ? "Updating..." : "Update Institution"}
        </button>
      </div>
    </>
  );
};

export default EditInstitutions;
