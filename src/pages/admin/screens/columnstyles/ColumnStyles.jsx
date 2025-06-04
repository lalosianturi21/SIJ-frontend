import { Link } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { useDataTable } from "../../../../hooks/useDataTable";
import {
    createColumnStyle,
    deleteColumStyle,
    getAllColumnStyles,
} from "../../../../services/index/jurnalsColumnStyles";
import DataTable from "../../components/DataTable";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useState } from "react";

const ColumnStyles = () => {
    const [columnstyleName, setColumnStyleName] = useState("");
    const [columnstyleDescription, setColumnStyleDescription] = useState("");

    const {
        userState,
        currentPage,
        searchKeyword,
        data: columnstylesData,
        isLoading,
        isFetching,
        isLoadingDeleteData,
        queryClient,
        searchKeywordHandler,
        submitSearchKeywordHandler,
        deleteDataHandler,
        setCurrentPage,
    } = useDataTable({
        dataQueryFn: () => getAllColumnStyles(searchKeyword, currentPage),
        dataQueryKey: "columnstyles",
        deleteDataMessage: "Column Style deleted successfully",
        mutateDeleteFn: ({ slug, token }) => deleteColumStyle({ slug, token }),
    });

    const { mutate: mutateCreateColumnStyle, isLoading: isLoadingCreateColumnStyle } =
        useMutation({
            mutationFn: ({ token, name, description }) =>
                createColumnStyle({ token, name, description }),
            onSuccess: () => {
                queryClient.invalidateQueries(["columnstyles"]);
                toast.success("Created Successfully! 🎉", { autoClose: 500 });
                setColumnStyleName("");
                setColumnStyleDescription("");
            },
            onError: (error) => {
                toast.error(error.message);
                console.log(error);
            },
        });

    const handleCreateColumnStyle = () => {
        mutateCreateColumnStyle({
            token: userState.userInfo.token,
            name: columnstyleName,
            description: columnstyleDescription,
        });
    };

    return (
        <>
            <ToastContainer position="top-right" autoClose={3000} hideProgressBar />
            <div className="p-4 md:p-6 min-h-screen text-white">
                <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-6">
                    {/* Form Add Column Style */}
                    <div className="col-span-full md:col-span-4 p-6 rounded-xl border border-gray-600 shadow-lg">
                        <h4 className="text-2xl font-semibold mb-4">Add New Column Style</h4>
                        <div className="space-y-4">
                            <input
                                value={columnstyleName}
                                onChange={(e) => setColumnStyleName(e.target.value)}
                                placeholder="Enter column style title"
                                className="w-full px-4 py-2 bg-transparent text-white border border-gray-500 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                            />
                            <textarea
                                value={columnstyleDescription}
                                onChange={(e) => setColumnStyleDescription(e.target.value)}
                                placeholder="Enter column style description"
                                rows={4}
                                className="w-full px-4 py-2 bg-transparent text-white border border-gray-500 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                            />
                            <button
                                onClick={handleCreateColumnStyle}
                                disabled={isLoadingCreateColumnStyle}
                                className="w-full bg-purple-500 hover:bg-purple-700 text-white font-semibold rounded-md py-2 transition disabled:opacity-50"
                            >
                                {isLoadingCreateColumnStyle ? "Adding..." : "Add Column Style"}
                            </button>

                        </div>
                    </div>

                    {/* DataTable Section */}
                    <div className="col-span-full md:col-span-8 p-6 rounded-xl border border-gray-600 shadow-lg overflow-x-auto">
                        <DataTable
                            pageTitle="Manage Column Styles"
                            dataListName="Column Styles"
                            searchInputPlaceHolder="Search column styles..."
                            searchKeywordOnSubmitHandler={submitSearchKeywordHandler}
                            searchKeywordOnChangeHandler={searchKeywordHandler}
                            searchKeyword={searchKeyword}
                            tableHeaderTitleList={["Title", "Description", "Created At", "Actions"]}
                            isLoading={isLoading}
                            isFetching={isFetching}
                            data={columnstylesData?.data}
                            setCurrentPage={setCurrentPage}
                            currentPage={currentPage}
                            headers={columnstylesData?.headers}
                            userState={userState}
                        >
                            {columnstylesData?.data.map((columnstyle) => (
                                <tr
                                    key={columnstyle._id}
                                    className="border-b border-gray-700 hover:bg-purple-800 transition"
                                >
                                    <td className="px-4 py-3">{columnstyle.name}</td>
                                    <td className="px-4 py-3">{columnstyle.description}</td>
                                    <td className="px-4 py-3">
                                        {new Date(columnstyle.createdAt).toLocaleDateString("en-US", {
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
                                                    slug: columnstyle._id,
                                                    token: userState.userInfo.token,
                                                })
                                            }
                                            className="px-3 py-1 bg-red-500 hover:bg-red-700 text-white rounded-md text-sm font-medium transition disabled:opacity-50"
                                        >
                                            Delete
                                        </button>

                                        <Link
                                            to={`/admin/columnstyles/manage/edit/${columnstyle._id}`}
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

export default ColumnStyles;
