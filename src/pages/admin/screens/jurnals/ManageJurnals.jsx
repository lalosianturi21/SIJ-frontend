import { images, stables } from "../../../../constants";
import { deleteJurnal, getAllJurnals } from "../../../../services/index/jurnals";
import Pagination from "../../../../components/Pagination";
import { toast } from "react-hot-toast";
import { Link } from "react-router-dom";
import { useDataTable } from "../../../../hooks/useDataTable";
import DataTable from "../../components/DataTable";

const ManageJurnals = () => {
  const {
    userState,
    currentPage,
    searchKeyword,
    data: jurnalsData,
    isLoading,
    isFetching,
    isLoadingDeleteData,
    queryClient,
    searchKeywordHandler,
    submitSearchKeywordHandler,
    deleteDataHandler,
    setCurrentPage,
  } = useDataTable({
    dataQueryFn: () => getAllJurnals(searchKeyword, currentPage),
    dataQueryKey: "jurnals",
    deleteDataMessage: "Jurnal is deleted",
    mutateDeleteFn: ({ slug, token }) => {
      return deleteJurnal({
        slug,
        token,
      });
    },
  });

  return (
    <DataTable
      pageTitle="Manage Jurnals"
      dataListName="Jurnals"
      searchInputPlaceHolder="Jurnal title..."
      searchKeywordOnSubmitHandler={submitSearchKeywordHandler}
      searchKeywordOnChangeHandler={searchKeywordHandler}
      searchKeyword={searchKeyword}
      tableHeaderTitleList={["Cover", "Name", "Link", "Price", "Rating Average", "Contact", "email", "tracks", "column styles", "countries", "currencies", "Institutions", "Languages", "publish periods", "ranks", "Created At", "Actions"]}
      isLoading={isLoading}
      isFetching={isFetching}
      data={jurnalsData?.data}
      setCurrentPage={setCurrentPage}
      currentPage={currentPage}
      headers={jurnalsData?.headers}
      userState={userState}
      tableClassName="table-auto w-full border-collapse border  rounded-lg shadow-lg overflow-hidden"
    >
      {jurnalsData?.data.map((jurnal) => (
        <tr className="border-b hover:bg-purple-600 transition duration-200">
          <td className="px-5 py-5 text-sm border-b ">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <a href="/" >
                  <img
                    src={
                      jurnal?.cover
                        ? jurnal?.cover
                        : images.samplePostImage
                    }
                    alt={jurnal.name}
                    className="mx-auto object-cover rounded-lg w-10 aspect-square"
                  />
                </a>
              </div>

            </div>
          </td>
          <td className="px-5 py-5 text-sm border-b ">
            <div className="">
              <p className="text-white whitespace-no-wrap"> {jurnal.name}</p>
            </div>
          </td>
          <td className="px-5 py-5 text-sm border-b ">
            <div className="">
              <p className="text-white whitespace-no-wrap"> {jurnal.url}</p>
            </div>
          </td>
          <td className="px-5 py-5 text-sm border-b ">
            <div className="">
              <p className="text-white whitespace-no-wrap">{jurnal.apc}</p>
            </div>
          </td>
          <td className="px-5 py-5 text-sm border-b ">
            <div className="">
              <p className="text-white whitespace-no-wrap">{jurnal.rating_avg}</p>
            </div>
          </td>
          <td className="px-5 py-5 text-sm border-b ">
            <div className="">
              <p className="text-white whitespace-no-wrap">{jurnal.contact}</p>
            </div>
          </td>
          <td className="px-5 py-5 text-sm border-b ">
            <div className="">
              <p className="text-white whitespace-no-wrap">{jurnal.email}</p>
            </div>
          </td>
          <td className="px-5 py-5 text-sm  border-b ">
            <p className="text-white whitespace-no-wrap">
              {jurnal.tracks.length > 0
                ? jurnal.tracks
                  .slice(0, 3)
                  .map(
                    (track, index) =>
                      `${track.name}${jurnal.tracks.slice(0, 3).length === index + 1
                        ? ""
                        : ", "
                      }`
                  )
                : "Untracked"}
            </p>
          </td>
          <td className="px-5 py-5 text-sm  border-b ">
            <p className="text-white whitespace-no-wrap">
              {jurnal.columnstyles.length > 0
                ? jurnal.columnstyles
                  .slice(0, 3)
                  .map(
                    (columnstyle, index) =>
                      `${columnstyle.name}${jurnal.columnstyles.slice(0, 3).length === index + 1
                        ? ""
                        : ", "
                      }`
                  )
                : "Unstyled"}
            </p>
          </td>
          <td className="px-5 py-5 text-sm  border-b ">
            <p className="text-white whitespace-no-wrap">
              {jurnal.countries.length > 0
                ? jurnal.countries
                  .slice(0, 3)
                  .map(
                    (country, index) =>
                      `${country.name}${jurnal.countries.slice(0, 3).length === index + 1
                        ? ""
                        : ", "
                      }`
                  )
                : "Uncountried"}
            </p>
          </td>
          <td className="px-5 py-5 text-sm  border-b ">
            <p className="text-white whitespace-no-wrap">
              {jurnal.currencies.length > 0
                ? jurnal.currencies
                  .slice(0, 3)
                  .map(
                    (currency, index) =>
                      `${currency.name}${jurnal.currencies.slice(0, 3).length === index + 1
                        ? ""
                        : ", "
                      }`
                  )
                : "uncurrencyed"}
            </p>
          </td>
          <td className="px-5 py-5 text-sm  border-b ">
            <p className="text-white whitespace-no-wrap">
              {jurnal.institutions.length > 0
                ? jurnal.institutions
                  .slice(0, 3)
                  .map(
                    (institution, index) =>
                      `${institution.name}${jurnal.institutions.slice(0, 3).length === index + 1
                        ? ""
                        : ", "
                      }`
                  )
                : "Uninstitutioned"}
            </p>
          </td>
          <td className="px-5 py-5 text-sm  border-b ">
            <p className="text-white whitespace-no-wrap">
              {jurnal.languages.length > 0
                ? jurnal.languages
                  .slice(0, 3)
                  .map(
                    (language, index) =>
                      `${language.name}${jurnal.languages.slice(0, 3).length === index + 1
                        ? ""
                        : ", "
                      }`
                  )
                : "Unlanguageed"}
            </p>
          </td>
          <td className="px-5 py-5 text-sm  border-b ">
            <p className="text-white whitespace-no-wrap">
              {jurnal.publishperiods.length > 0
                ? jurnal.publishperiods.map((publishperiod, index) =>
                  `${publishperiod.month}${index === jurnal.publishperiods.length - 1 ? "" : ", "}`
                )
                : "publishperioded"}
            </p>

          </td>
          <td className="px-5 py-5 text-sm  border-b ">
            <p className="text-white whitespace-no-wrap">
              {jurnal.ranks.length > 0
                ? jurnal.ranks
                  .slice(0, 3)
                  .map(
                    (rank, index) =>
                      `${rank.name}${jurnal.ranks.slice(0, 3).length === index + 1
                        ? ""
                        : ", "
                      }`
                  )
                : "Unranked"}
            </p>
          </td>
          <td className="px-5 py-5 text-sm border-b ">
            <p className="text-white whitespace-no-wrap">
              {new Date(jurnal.createdAt).toLocaleDateString("en-US", {
                day: "numeric",
                month: "short",
                year: "numeric",
              })}
            </p>
          </td>
          <td className="px-6 py-4 text-sm flex space-x-3">
            <button
              disabled={isLoadingDeleteData}
              type="button"
              className="px-3 py-2 bg-red-500 hover:bg-red-600 text-white text-xs font-semibold rounded-lg transition duration-200 disabled:opacity-70"
              onClick={() => {
                deleteDataHandler({
                  slug: jurnal?.slug,
                  token: userState.userInfo.token,
                });
              }}
            >
              Delete
            </button>
            <Link
              to={`/admin/jurnals/manage/edit/${jurnal?.slug}`}
              className="editbutton px-3 py-2 text-white text-xs font-semibold rounded-lg transition duration-200 bg-yellow-500 hover:bg-yellow-600 space-button"
            >
              Edit
            </Link>
          </td>
        </tr>
      ))}
    </DataTable>
  );
};

export default ManageJurnals;
