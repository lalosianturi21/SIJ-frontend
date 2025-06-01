import { Link } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { useDataTable } from "../../../../hooks/useDataTable";
import {
    createLanguage,
    deleteLanguage,
    getAllLanguages,
} from "../../../../services/index/jurnalsLanguages";
import DataTable from "../../components/DataTable";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useState } from "react";

const Languages = () => {
    const [languageName, setLanguageName] = useState("");

    const {
        userState,
        currentPage,
        searchKeyword,
        data: languagesData,
        isLoading,
        isFetching,
        isLoadingDeleteData,
        queryClient,
        searchKeywordHandler,
        submitSearchKeywordHandler,
        deleteDataHandler,
        setCurrentPage,
    } = useDataTable({
        dataQueryFn: () => getAllLanguages(searchKeyword, currentPage),
        dataQueryKey: "languages",
        deleteDataMessage: "Language deleted successfully",
        mutateDeleteFn: ({ slug, token }) => deleteLanguage({ slug, token }),
    });

    const { mutate: mutateCreateLanguage, isLoading: isLoadingCreateLanguage } =
        useMutation({
            mutationFn: ({ token, name}) =>
                createLanguage({ token, name}),
            onSuccess: () => {
                queryClient.invalidateQueries(["languages"]);
                toast.success("Created Successfully! 🎉", { autoClose: 3000 });
                setLanguageName("");
            },
            onError: (error) => {
                toast.error(error.message);
                console.log(error);
            },
        });

    const handleCreateLanguage = () => {
        mutateCreateLanguage({
            token: userState.userInfo.token,
            name: languageName,
        });
    };

    return (
        <>
            <ToastContainer position="top-right" autoClose={3000} hideProgressBar />
            <div className="p-4 md:p-6 min-h-screen text-white">
                <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-6">
                    {/* Form Add Languages */}
                    <div className="col-span-full md:col-span-4 p-6 rounded-xl border border-gray-600 shadow-lg">
                        <h4 className="text-2xl font-semibold mb-4">Add New Language</h4>
                        <div className="space-y-4">
                            <input
                                value={languageName}
                                onChange={(e) => setLanguageName(e.target.value)}
                                placeholder="Enter language title"
                                className="w-full px-4 py-2 bg-transparent text-white border border-gray-500 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                            />
                            <button
                                onClick={handleCreateLanguage}
                                disabled={isLoadingCreateLanguage}
                                className="w-full bg-purple-500 hover:bg-purple-700 text-white font-semibold rounded-md py-2 transition disabled:opacity-50"
                            >
                                {isLoadingCreateLanguage ? "Adding..." : "Add Language"}
                            </button>

                        </div>
                    </div>

                    {/* DataTable Section */}
                    <div className="col-span-full md:col-span-8 p-6 rounded-xl border border-gray-600 shadow-lg overflow-x-auto">
                        <DataTable
                            pageTitle="Manage Languages"
                            dataListName="Languages"
                            searchInputPlaceHolder="Search languages..."
                            searchKeywordOnSubmitHandler={submitSearchKeywordHandler}
                            searchKeywordOnChangeHandler={searchKeywordHandler}
                            searchKeyword={searchKeyword}
                            tableHeaderTitleList={["Title", "Created At", "Actions"]}
                            isLoading={isLoading}
                            isFetching={isFetching}
                            data={languagesData?.data}
                            setCurrentPage={setCurrentPage}
                            currentPage={currentPage}
                            headers={languagesData?.headers}
                            userState={userState}
                        >
                            {languagesData?.data.map((language) => (
                                <tr
                                    key={language._id}
                                    className="border-b border-gray-700 hover:bg-purple-800 transition"
                                >
                                    <td className="px-4 py-3">{language.name}</td>
                                    <td className="px-4 py-3">
                                        {new Date(language.createdAt).toLocaleDateString("en-US", {
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
                                                    slug: language._id,
                                                    token: userState.userInfo.token,
                                                })
                                            }
                                            className="px-3 py-1 bg-red-500 hover:bg-red-700 text-white rounded-md text-sm font-medium transition disabled:opacity-50"
                                        >
                                            Delete
                                        </button>

                                        <Link
                                            to={`/admin/languages/manage/edit/${language._id}`}
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

export default Languages;   
