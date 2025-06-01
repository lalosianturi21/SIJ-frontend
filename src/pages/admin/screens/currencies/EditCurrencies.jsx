import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  getSingleCurrency,
  updateCurrency,
} from "../../../../services/index/jurnalsCurrencies";

const EditCurrencies = () => {
  const queryClient = useQueryClient();
  const [currencyName, setCurrencyName] = useState("");
  const [currencySymbol, setCurrencySymbol] = useState("");
  const navigate = useNavigate();
  const { slug } = useParams();
  const userState = useSelector((state) => state.user);

  const { isLoading, isError } = useQuery({
    queryFn: () => getSingleCurrency({ slug }),
    queryKey: ["currencies", slug],
    onSuccess: (data) => {
      setCurrencyName(data?.name);
      setCurrencySymbol(data?.symbol); // ✅ tambahkan ini
    },
    refetchOnWindowFocus: false,
  });

  const { mutate: mutateUpdateCurrency, isLoading: isLoadingUpdateCurrency } =
    useMutation({
      mutationFn: ({ name, symbol, slug, token }) => {
        return updateCurrency({ name, symbol, slug, token });
      },
      onSuccess: (data) => {
        queryClient.invalidateQueries(["currencies", slug]);
        toast.success("Currency is updated");

        // Tambahkan delay sebelum navigate agar toast sempat tampil
        setTimeout(() => {
          navigate(`/admin/currencies/manage`, { replace: true });
        }, 1000); // delay 1 detik
      },

      onError: (error) => {
        toast.error(error.message);
        console.log(error);
      },
    });

  const handleUpdateCurrency = () => {
    if (!currencyName) return;
    mutateUpdateCurrency({
      name: currencyName,
      symbol: currencySymbol,
      slug,
      token: userState.userInfo.token,
    });
  };

  return (
    <>
      <ToastContainer position="top-right" autoClose={3000} hideProgressBar />
      <div className="max-w-3xl mx-auto py-8 px-6 border-2 border-white rounded-lg shadow-lg">
        <h4 className="text-2xl font-semibold text-white">Update Currency</h4>
        <p className="mt-2 text-gray-500 text-sm">
          Edit the name and description of the currency below:
        </p>

        {/* Currency Name */}
        <div className="mt-6">
          <label htmlFor="currency-name" className="block text-sm font-medium text-white">
            Currency Name
          </label>
          <input
            id="currency-name"
            value={currencyName}
            onChange={(e) => setCurrencyName(e.target.value)}
            placeholder="Enter currency name"
            className="w-full mt-2 px-4 py-3 text-white bg-transparent border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
        </div>

        {/* Currency Description */}
        <div className="mt-4">
          <label htmlFor="currency-symbol" className="block text-sm font-medium text-white">
            Currency Symbol
          </label>
          <input
            id="currency-symbol"
            value={currencySymbol}
            onChange={(e) => setCurrencySymbol(e.target.value)}
            placeholder="Enter currency symbol"
            className="w-full mt-2 px-4 py-3 text-white bg-transparent border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
        </div>

        {/* Submit Button */}
        <button
          disabled={isLoadingUpdateCurrency || isLoading || isError}
          type="button"
          onClick={handleUpdateCurrency}
          className={`mt-6 w-full py-3 px-6 text-white font-semibold rounded-lg transition duration-300 ease-in-out ${isLoadingUpdateCurrency || isLoading || isError
              ? "bg-gray-500 cursor-not-allowed"
              : "bg-purple-500 hover:bg-purple-600 focus:ring-2 focus:ring-purple-500"
            }`}
        >
          {isLoadingUpdateCurrency || isLoading ? "Updating..." : "Update Currency"}
        </button>
      </div>
    </>
  );
};

export default EditCurrencies;
