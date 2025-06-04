import { Link } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { useDataTable } from "../../../../hooks/useDataTable";
import {
    createPublishPeriod,
    deletePublishPeriod,
    getAllPublishPeriods,
} from "../../../../services/index/jurnalsPublishPeriods";
import DataTable from "../../components/DataTable";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useState } from "react";

const PublishPeriods = () => {
    const [publishperiodMonth, setPublishPeriodMonth] = useState("");

    const {
        userState,
        currentPage,
        searchKeyword,
        data: publishperiodsData,
        isLoading,
        isFetching,
        isLoadingDeleteData,
        queryClient,
        searchKeywordHandler,
        submitSearchKeywordHandler,
        deleteDataHandler,
        setCurrentPage,
    } = useDataTable({
        dataQueryFn: () => getAllPublishPeriods(searchKeyword, currentPage),
        dataQueryKey: "publishperiods",
        deleteDataMessage: "Publish Period deleted successfully",
        mutateDeleteFn: ({ slug, token }) => deletePublishPeriod({ slug, token }),
    });

    const { mutate: mutateCreatePublishePeriod, isLoading: isLoadingCreatePublishPeriod } =
        useMutation({
            mutationFn: ({ token, month}) =>
                createPublishPeriod({ token, month}),
            onSuccess: () => {
                queryClient.invalidateQueries(["publishperiods"]);
                toast.success("Created Successfully! 🎉", { autoClose: 500 });
                setPublishPeriodMonth("");
            },
            onError: (error) => {
                toast.error(error.message);
                console.log(error);
            },
        });

    const handleCreatePublishPeriod = () => {
        mutateCreatePublishePeriod({
            token: userState.userInfo.token,
            month: publishperiodMonth,
        });
    };

    return (
        <>
            <ToastContainer position="top-right" autoClose={3000} hideProgressBar />
            <div className="p-4 md:p-6 min-h-screen text-white">
                <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-6">
                    {/* Form Add Publish Periods */}
                    <div className="col-span-full md:col-span-4 p-6 rounded-xl border border-gray-600 shadow-lg">
                        <h4 className="text-2xl font-semibold mb-4">Add New Publish Periods</h4>
                        <div className="space-y-4">
                            <input
                                value={publishperiodMonth}
                                onChange={(e) => setPublishPeriodMonth(e.target.value)}
                                placeholder="Enter publish period month"
                                className="w-full px-4 py-2 bg-transparent text-white border border-gray-500 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                            />
                            <button
                                onClick={handleCreatePublishPeriod}
                                disabled={isLoadingCreatePublishPeriod}
                                className="w-full bg-purple-500 hover:bg-purple-700 text-white font-semibold rounded-md py-2 transition disabled:opacity-50"
                            >
                                {isLoadingCreatePublishPeriod ? "Adding..." : "Add Publish Period"}
                            </button>

                        </div>
                    </div>

                    {/* DataTable Section */}
                    <div className="col-span-full md:col-span-8 p-6 rounded-xl border border-gray-600 shadow-lg overflow-x-auto">
                        <DataTable
                            pageTitle="Manage publish periods"
                            dataListName="Publish Periods"
                            searchInputPlaceHolder="Search publish periods..."
                            searchKeywordOnSubmitHandler={submitSearchKeywordHandler}
                            searchKeywordOnChangeHandler={searchKeywordHandler}
                            searchKeyword={searchKeyword}
                            tableHeaderTitleList={["Month", "Created At", "Actions"]}
                            isLoading={isLoading}
                            isFetching={isFetching}
                            data={publishperiodsData?.data}
                            setCurrentPage={setCurrentPage}
                            currentPage={currentPage}
                            headers={publishperiodsData?.headers}
                            userState={userState}
                        >
                            {publishperiodsData?.data.map((publishperiod) => (
                                <tr
                                    key={publishperiod._id}
                                    className="border-b border-gray-700 hover:bg-purple-800 transition"
                                >
                                    <td className="px-4 py-3">{publishperiod.month}</td>
                                    <td className="px-4 py-3">
                                        {new Date(publishperiod.createdAt).toLocaleDateString("en-US", {
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
                                                    slug: publishperiod._id,
                                                    token: userState.userInfo.token,
                                                })
                                            }
                                            className="px-3 py-1 bg-red-500 hover:bg-red-700 text-white rounded-md text-sm font-medium transition disabled:opacity-50"
                                        >
                                            Delete
                                        </button>

                                        <Link
                                            to={`/admin/publishperiods/manage/edit/${publishperiod._id}`}
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

export default PublishPeriods;   
