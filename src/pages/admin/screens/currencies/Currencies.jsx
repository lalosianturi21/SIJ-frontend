import { Link } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { useDataTable } from "../../../../hooks/useDataTable";
import {
    createCurrency,
    deleteCurrency,
    getAllCurrencies,
} from "../../../../services/index/jurnalsCurrencies";
import DataTable from "../../components/DataTable";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useState } from "react";

const Currencies = () => {
    const [currencyName, setCurrencyName] = useState("");
    const [currencySymbol, setCurrencySymbol] = useState("");

    const {
        userState,
        currentPage,
        searchKeyword,
        data: currenciesData,
        isLoading,
        isFetching,
        isLoadingDeleteData,
        queryClient,
        searchKeywordHandler,
        submitSearchKeywordHandler,
        deleteDataHandler,
        setCurrentPage,
    } = useDataTable({
        dataQueryFn: () => getAllCurrencies(searchKeyword, currentPage),
        dataQueryKey: "currencies",
        deleteDataMessage: "Currency deleted successfully",
        mutateDeleteFn: ({ slug, token }) => deleteCurrency({ slug, token }),
    });

    const { mutate: mutateCreateCurrency, isLoading: isLoadingCreateCurrency } =
        useMutation({
            mutationFn: ({ token, name, symbol }) =>
                createCurrency({ token, name, symbol }),
            onSuccess: () => {
                queryClient.invalidateQueries(["currencies"]);
                toast.success("Created Successfully! 🎉", { autoClose: 500 });
                setCurrencyName("");
                setCurrencySymbol("");
            },
            onError: (error) => {
                toast.error(error.message);
                console.log(error);
            },
        });

    const handleCreateCurrency = () => {
        mutateCreateCurrency({
            token: userState.userInfo.token,
            name: currencyName,
            symbol: currencySymbol,
        });
    };

    return (
        <>
            <ToastContainer position="top-right" autoClose={3000} hideProgressBar />
            <div className="p-4 md:p-6 min-h-screen text-white">
                <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-6">
                    {/* Form Add Currency */}
                    <div className="col-span-full md:col-span-4 p-6 rounded-xl border border-gray-600 shadow-lg">
                        <h4 className="text-2xl font-semibold mb-4">Add New Currency</h4>
                        <div className="space-y-4">
                            <input
                                value={currencyName}
                                onChange={(e) => setCurrencyName(e.target.value)}
                                placeholder="Enter currency title"
                                className="w-full px-4 py-2 bg-transparent text-white border border-gray-500 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                            />
                            <input
                                value={currencySymbol}
                                onChange={(e) => setCurrencySymbol(e.target.value)}
                                placeholder="Enter currency Smybol"
                                className="w-full px-4 py-2 bg-transparent text-white border border-gray-500 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                            />
                            <button
                                onClick={handleCreateCurrency}
                                disabled={isLoadingCreateCurrency}
                                className="w-full bg-purple-500 hover:bg-purple-700 text-white font-semibold rounded-md py-2 transition disabled:opacity-50"
                            >
                                {isLoadingCreateCurrency ? "Adding..." : "Add Currency"}
                            </button>

                        </div>
                    </div>

                    {/* DataTable Section */}
                    <div className="col-span-full md:col-span-8 p-6 rounded-xl border border-gray-600 shadow-lg overflow-x-auto">
                        <DataTable
                            pageTitle="Manage Currencies"
                            dataListName="Currencies"
                            searchInputPlaceHolder="Search currencies..."
                            searchKeywordOnSubmitHandler={submitSearchKeywordHandler}
                            searchKeywordOnChangeHandler={searchKeywordHandler}
                            searchKeyword={searchKeyword}
                            tableHeaderTitleList={["Title", "Symbol", "Created At", "Actions"]}
                            isLoading={isLoading}
                            isFetching={isFetching}
                            data={currenciesData?.data}
                            setCurrentPage={setCurrentPage}
                            currentPage={currentPage}
                            headers={currenciesData?.headers}
                            userState={userState}
                        >
                            {currenciesData?.data.map((currency) => (
                                <tr
                                    key={currency._id}
                                    className="border-b border-gray-700 hover:bg-purple-800 transition"
                                >
                                    <td className="px-4 py-3">{currency.name}</td>
                                    <td className="px-4 py-3">{currency.symbol}</td>
                                    <td className="px-4 py-3">
                                        {new Date(currency.createdAt).toLocaleDateString("en-US", {
                                            day: "numeric",
                                            month: "short",
                                            year: "numeric",
                                        })}
                                    </td>
                                    <td className="px-4 py-3 flex space-x-3">
                                        <button
                                            disabled={isLoadingDeleteData}
                                            onClick={() =>
                                                deleteDataHandler({
                                                    slug: currency._id,
                                                    token: userState.userInfo.token,
                                                })
                                            }
                                            className="px-3 py-1 bg-red-500 hover:bg-red-700 text-white rounded-md text-sm font-medium transition disabled:opacity-50"
                                        >
                                            Delete
                                        </button>

                                        <Link
                                            to={`/admin/currencies/manage/edit/${currency._id}`}
                                            className="px-3 py-1 bg-yellow-500 hover:bg-yellow-600 text-black rounded-md text-sm font-medium transition"
                                        >
                                            Edit
                                        </Link>
                                    </td>
                                </tr>
                            ))}
                        </DataTable>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Currencies;
