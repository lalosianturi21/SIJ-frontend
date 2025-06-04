import { Link } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { useDataTable } from "../../../../hooks/useDataTable";
import {
    createRank,
    deleteRank,
    getAllRanks,
} from "../../../../services/index/jurnalsRanks";
import DataTable from "../../components/DataTable";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useState } from "react";

const Ranks = () => {
    const [rankName, setRankName] = useState("");
    const [rankDescription, setRankDescription] = useState("");

    const {
        userState,
        currentPage,
        searchKeyword,
        data: ranksData,
        isLoading,
        isFetching,
        isLoadingDeleteData,
        queryClient,
        searchKeywordHandler,
        submitSearchKeywordHandler,
        deleteDataHandler,
        setCurrentPage,
    } = useDataTable({
        dataQueryFn: () => getAllRanks(searchKeyword, currentPage),
        dataQueryKey: "ranks",
        deleteDataMessage: "Rank deleted successfully",
        mutateDeleteFn: ({ slug, token }) => deleteRank({ slug, token }),
    });

    const { mutate: mutateCreateRank, isLoading: isLoadingCreateRank } =
        useMutation({
            mutationFn: ({ token, name, description }) =>
                createRank({ token, name, description }),
            onSuccess: () => {
                queryClient.invalidateQueries(["ranks"]);
                toast.success("Created Successfully! 🎉", { autoClose: 500 });
                setRankName("");
                setRankDescription("");
            },
            onError: (error) => {
                toast.error(error.message);
                console.log(error);
            },
        });

    const handleCreateRank = () => {
        mutateCreateRank({
            token: userState.userInfo.token,
            name: rankName,
            description: rankDescription,
        });
    };

    return (
        <>
            <ToastContainer position="top-right" autoClose={3000} hideProgressBar />
            <div className="p-4 md:p-6 min-h-screen text-white">
                <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-6">
                    {/* Form Add Rank */}
                    <div className="col-span-full md:col-span-4 p-6 rounded-xl border border-gray-600 shadow-lg">
                        <h4 className="text-2xl font-semibold mb-4">Add New Rank</h4>
                        <div className="space-y-4">
                            <input
                                value={rankName}
                                onChange={(e) => setRankName(e.target.value)}
                                placeholder="Enter rank title"
                                className="w-full px-4 py-2 bg-transparent text-white border border-gray-500 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                            />
                            <textarea
                                value={rankDescription}
                                onChange={(e) => setRankDescription(e.target.value)}
                                placeholder="Enter rank description"
                                rows={4}
                                className="w-full px-4 py-2 bg-transparent text-white border border-gray-500 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                            />
                            <button
                                onClick={handleCreateRank}
                                disabled={isLoadingCreateRank}
                                className="w-full bg-purple-500 hover:bg-purple-700 text-white font-semibold rounded-md py-2 transition disabled:opacity-50"
                            >
                                {isLoadingCreateRank ? "Adding..." : "Add Rank"}
                            </button>

                        </div>
                    </div>

                    {/* DataTable Section */}
                    <div className="col-span-full md:col-span-8 p-6 rounded-xl border border-gray-600 shadow-lg overflow-x-auto">
                        <DataTable
                            pageTitle="Manage Ranks"
                            dataListName="Ranks"
                            searchInputPlaceHolder="Search ranks..."
                            searchKeywordOnSubmitHandler={submitSearchKeywordHandler}
                            searchKeywordOnChangeHandler={searchKeywordHandler}
                            searchKeyword={searchKeyword}
                            tableHeaderTitleList={["Title", "Description", "Created At", "Actions"]}
                            isLoading={isLoading}
                            isFetching={isFetching}
                            data={ranksData?.data}
                            setCurrentPage={setCurrentPage}
                            currentPage={currentPage}
                            headers={ranksData?.headers}
                            userState={userState}
                        >
                            {ranksData?.data.map((rank) => (
                                <tr
                                    key={rank._id}
                                    className="border-b border-gray-700 hover:bg-purple-800 transition"
                                >
                                    <td className="px-4 py-3">{rank.name}</td>
                                    <td className="px-4 py-3">{rank.description}</td>
                                    <td className="px-4 py-3">
                                        {new Date(rank.createdAt).toLocaleDateString("en-US", {
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
                                                    slug: rank._id,
                                                    token: userState.userInfo.token,
                                                })
                                            }
                                            className="px-3 py-1 bg-red-500 hover:bg-red-700 text-white rounded-md text-sm font-medium transition disabled:opacity-50"
                                        >
                                            Delete
                                        </button>

                                        <Link
                                            to={`/admin/ranks/manage/edit/${rank._id}`}
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

export default Ranks;
