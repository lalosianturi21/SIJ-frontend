import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  getSingleCountry,
  updateCountry,
} from "../../../../services/index/jurnalsCountries";

const EditCountries = () => {
  const queryClient = useQueryClient();
  const [countryName, setCountryName] = useState("");
  const navigate = useNavigate();
  const { slug } = useParams();
  const userState = useSelector((state) => state.user);

  const { isLoading, isError } = useQuery({
    queryFn: () => getSingleCountry({ slug }),
    queryKey: ["countries", slug],
    onSuccess: (data) => {
      setCountryName(data?.name);
    },
    refetchOnWindowFocus: false,
  });

  const { mutate: mutateUpdateCountry, isLoading: isLoadingUpdateCountry } =
    useMutation({
      mutationFn: ({ name, slug, token }) => {
        return updateCountry({ name, slug, token });
      },
      onSuccess: (data) => {
        queryClient.invalidateQueries(["countries", slug]);
        toast.success("Country is updated");

        // Tambahkan delay sebelum navigate agar toast sempat tampil
        setTimeout(() => {
          navigate(`/admin/countries/manage`, { replace: true });
        }, 1000); // delay 1 detik
      },

      onError: (error) => {
        toast.error(error.message);
        console.log(error);
      },
    });

  const handleUpdateCountry = () => {
    if (!countryName) return;
    mutateUpdateCountry({
      name: countryName,
      slug,
      token: userState.userInfo.token,
    });
  };

  return (
    <>
      <ToastContainer position="top-right" autoClose={3000} hideProgressBar />
      <div className="max-w-3xl mx-auto py-8 px-6 border-2 border-white rounded-lg shadow-lg">
        <h4 className="text-2xl font-semibold text-white">Update Country</h4>
        <p className="mt-2 text-gray-500 text-sm">
          Edit the name of the country below:
        </p>

        {/* Country Name */}
        <div className="mt-6">
          <label htmlFor="country-name" className="block text-sm font-medium text-white">
            Country Name
          </label>
          <input
            id="country-name"
            value={countryName}
            onChange={(e) => setCountryName(e.target.value)}
            placeholder="Enter country name"
            className="w-full mt-2 px-4 py-3 text-white bg-transparent border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
        </div>


        {/* Submit Button */}
        <button
          disabled={isLoadingUpdateCountry || isLoading || isError}
          type="button"
          onClick={handleUpdateCountry}
          className={`mt-6 w-full py-3 px-6 text-white font-semibold rounded-lg transition duration-300 ease-in-out ${isLoadingUpdateCountry || isLoading || isError
              ? "bg-gray-500 cursor-not-allowed"
              : "bg-purple-500 hover:bg-purple-600 focus:ring-2 focus:ring-purple-500"
            }`}
        >
          {isLoadingUpdateCountry || isLoading ? "Updating..." : "Update Country"}
        </button>
      </div>
    </>
  );
};

export default EditCountries;
