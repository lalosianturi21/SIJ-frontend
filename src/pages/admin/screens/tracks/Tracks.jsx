import { Link } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { useDataTable } from "../../../../hooks/useDataTable";
import {
    createTrack,
    deleteTrack,
    getAllTracks,
} from "../../../../services/index/jurnalsTracks";
import DataTable from "../../components/DataTable";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useState } from "react";

const Tracks = () => {
    const [trackName, setTrackName] = useState("");
    const [trackDescription, setTracksDescription] = useState("");

    const {
        userState,
        currentPage,
        searchKeyword,
        data: tracksData,
        isLoading,
        isFetching,
        isLoadingDeleteData,
        queryClient,
        searchKeywordHandler,
        submitSearchKeywordHandler,
        deleteDataHandler,
        setCurrentPage,
    } = useDataTable({
        dataQueryFn: () => getAllTracks(searchKeyword, currentPage),
        dataQueryKey: "tracks",
        deleteDataMessage: "Track deleted successfully",
        mutateDeleteFn: ({ slug, token }) => deleteTrack({ slug, token }),
    });

    const { mutate: mutateCreateTrack, isLoading: isLoadingCreateTrack } =
        useMutation({
            mutationFn: ({ token, name, description }) =>
                createTrack({ token, name, description }),
            onSuccess: () => {
                queryClient.invalidateQueries(["tracks"]);
                toast.success("Created Successfully! 🎉", { autoClose: 500 });
                setTrackName("");
                setTracksDescription("");
            },
            onError: (error) => {
                toast.error(error.message);
                console.log(error);
            },
        });

    const handleCreateTrack = () => {
        mutateCreateTrack({
            token: userState.userInfo.token,
            name: trackName,
            description: trackDescription,
        });
    };

    return (
        <>
            <ToastContainer position="top-right" autoClose={3000} hideProgressBar />
            <div className="p-4 md:p-6 min-h-screen text-white">
                <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-6">
                    {/* Form Add Track */}
                    <div className="col-span-full md:col-span-4 p-6 rounded-xl border border-gray-600 shadow-lg">
                        <h4 className="text-2xl font-semibold mb-4">Add New Track</h4>
                        <div className="space-y-4">
                            <input
                                value={trackName}
                                onChange={(e) => setTrackName(e.target.value)}
                                placeholder="Enter track title"
                                className="w-full px-4 py-2 bg-transparent text-white border border-gray-500 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                            />
                            <textarea
                                value={trackDescription}
                                onChange={(e) => setTracksDescription(e.target.value)}
                                placeholder="Enter track description"
                                rows={4}
                                className="w-full px-4 py-2 bg-transparent text-white border border-gray-500 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                            />
                            <button
                                onClick={handleCreateTrack}
                                disabled={isLoadingCreateTrack}
                                className="w-full bg-purple-500 hover:bg-purple-700 text-white font-semibold rounded-md py-2 transition disabled:opacity-50"
                            >
                                {isLoadingCreateTrack ? "Adding..." : "Add Track"}
                            </button>

                        </div>
                    </div>

                    {/* DataTable Section */}
                    <div className="col-span-full md:col-span-8 p-6 rounded-xl border border-gray-600 shadow-lg overflow-x-auto">
                        <DataTable
                            pageTitle="Manage Tracks"
                            dataListName="Tracks"
                            searchInputPlaceHolder="Search tracks..."
                            searchKeywordOnSubmitHandler={submitSearchKeywordHandler}
                            searchKeywordOnChangeHandler={searchKeywordHandler}
                            searchKeyword={searchKeyword}
                            tableHeaderTitleList={["Title", "Description", "Created At", "Actions"]}
                            isLoading={isLoading}
                            isFetching={isFetching}
                            data={tracksData?.data}
                            setCurrentPage={setCurrentPage}
                            currentPage={currentPage}
                            headers={tracksData?.headers}
                            userState={userState}
                        >
                            {tracksData?.data.map((track) => (
                                <tr
                                    key={track._id}
                                    className="border-b border-gray-700 hover:bg-purple-800 transition"
                                >
                                    <td className="px-4 py-3">{track.name}</td>
                                    <td className="px-4 py-3">{track.description}</td>
                                    <td className="px-4 py-3">
                                        {new Date(track.createdAt).toLocaleDateString("en-US", {
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
                                                    slug: track._id,
                                                    token: userState.userInfo.token,
                                                })
                                            }
                                            className="px-3 py-1 bg-red-500 hover:bg-red-700 text-white rounded-md text-sm font-medium transition disabled:opacity-50"
                                        >
                                            Delete
                                        </button>

                                        <Link
                                            to={`/admin/tracks/manage/edit/${track._id}`}
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

export default Tracks;
