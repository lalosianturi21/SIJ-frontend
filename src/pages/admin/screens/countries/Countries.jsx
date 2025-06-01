import { Link } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { useDataTable } from "../../../../hooks/useDataTable";
import {
    createCountry,
    deleteCountry,
    getAllCountries,
} from "../../../../services/index/jurnalsCountries";
import DataTable from "../../components/DataTable";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useState } from "react";

const Countries = () => {
    const [countryName, setCountryName] = useState("");

    const {
        userState,
        currentPage,
        searchKeyword,
        data: countriesData,
        isLoading,
        isFetching,
        isLoadingDeleteData,
        queryClient,
        searchKeywordHandler,
        submitSearchKeywordHandler,
        deleteDataHandler,
        setCurrentPage,
    } = useDataTable({
        dataQueryFn: () => getAllCountries(searchKeyword, currentPage),
        dataQueryKey: "countries",
        deleteDataMessage: "Country deleted successfully",
        mutateDeleteFn: ({ slug, token }) => deleteCountry({ slug, token }),
    });

    const { mutate: mutateCreateCountry, isLoading: isLoadingCreateCountry } =
        useMutation({
            mutationFn: ({ token, name}) =>
                createCountry({ token, name}),
            onSuccess: () => {
                queryClient.invalidateQueries(["countries"]);
                toast.success("Created Successfully! 🎉", { autoClose: 3000 });
                setCountryName("");
            },
            onError: (error) => {
                toast.error(error.message);
                console.log(error);
            },
        });

    const handleCreateCountry = () => {
        mutateCreateCountry({
            token: userState.userInfo.token,
            name: countryName,
        });
    };

    return (
        <>
            <ToastContainer position="top-right" autoClose={3000} hideProgressBar />
            <div className="p-4 md:p-6 min-h-screen text-white">
                <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-6">
                    {/* Form Add Country */}
                    <div className="col-span-full md:col-span-4 p-6 rounded-xl border border-gray-600 shadow-lg">
                        <h4 className="text-2xl font-semibold mb-4">Add New Country</h4>
                        <div className="space-y-4">
                            <input
                                value={countryName}
                                onChange={(e) => setCountryName(e.target.value)}
                                placeholder="Enter country title"
                                className="w-full px-4 py-2 bg-transparent text-white border border-gray-500 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                            />
                            <button
                                onClick={handleCreateCountry}
                                disabled={isLoadingCreateCountry}
                                className="w-full bg-purple-500 hover:bg-purple-700 text-white font-semibold rounded-md py-2 transition disabled:opacity-50"
                            >
                                {isLoadingCreateCountry ? "Adding..." : "Add Country"}
                            </button>

                        </div>
                    </div>

                    {/* DataTable Section */}
                    <div className="col-span-full md:col-span-8 p-6 rounded-xl border border-gray-600 shadow-lg overflow-x-auto">
                        <DataTable
                            pageTitle="Manage Countries"
                            dataListName="Countries"
                            searchInputPlaceHolder="Search countries..."
                            searchKeywordOnSubmitHandler={submitSearchKeywordHandler}
                            searchKeywordOnChangeHandler={searchKeywordHandler}
                            searchKeyword={searchKeyword}
                            tableHeaderTitleList={["Title", "Created At", "Actions"]}
                            isLoading={isLoading}
                            isFetching={isFetching}
                            data={countriesData?.data}
                            setCurrentPage={setCurrentPage}
                            currentPage={currentPage}
                            headers={countriesData?.headers}
                            userState={userState}
                        >
                            {countriesData?.data.map((country) => (
                                <tr
                                    key={country._id}
                                    className="border-b border-gray-700 hover:bg-purple-800 transition"
                                >
                                    <td className="px-4 py-3">{country.name}</td>
                                    <td className="px-4 py-3">
                                        {new Date(country.createdAt).toLocaleDateString("en-US", {
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
                                                    slug: country._id,
                                                    token: userState.userInfo.token,
                                                })
                                            }
                                            className="px-3 py-1 bg-red-500 hover:bg-red-700 text-white rounded-md text-sm font-medium transition disabled:opacity-50"
                                        >
                                            Delete
                                        </button>

                                        <Link
                                            to={`/admin/countries/manage/edit/${country._id}`}
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

export default Countries;   
