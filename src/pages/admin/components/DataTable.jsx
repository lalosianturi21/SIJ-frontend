import Pagination from "../../../components/Pagination";

const DataTable = ({
  pageTitle,
  dataListName,
  searchKeywordOnSubmitHandler,
  searchInputPlaceHolder,
  searchKeywordOnChangeHandler,
  searchKeyword,
  tableHeaderTitleList,
  isLoading,
  isFetching,
  data,
  children,
  setCurrentPage,
  currentPage,
  headers,
}) => {
  return (
    <div>
      <h1 className="text-2xl font-semibold">{pageTitle}</h1>

      <div className="w-full px-4 mx-auto">
        <div className="py-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between w-full gap-4 mb-4">
            <h2 className="text-2xl leading-tight text-white">{dataListName}</h2>
            <form
              onSubmit={searchKeywordOnSubmitHandler}
              className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto"
            >
              <input
                type="text"
                id="form-subscribe-filter"
                className="rounded-lg w-full sm:w-64 px-4 py-2 bg-white text-gray-800 border border-gray-300 placeholder-gray-500 shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-600"
                placeholder={searchInputPlaceHolder}
                onChange={searchKeywordOnChangeHandler}
                value={searchKeyword}
              />
              <button
                type="submit"
                className="px-4 py-2 text-white font-semibold bg-purple-600 rounded-md shadow-md hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500"
              >
                Filter
              </button>
            </form>
          </div>

          <div className="px-4 py-4 -mx-4 overflow-x-auto sm:-mx-8 sm:px-8">
            <div className="inline-block min-w-full overflow-hidden rounded-lg shadow">
              <table className="min-w-full leading-normal">
                <thead>
                  <tr>
                    {tableHeaderTitleList.map((title, index) => (
                      <th
                        key={index}
                        scope="col"
                        className="px-5 py-3 text-sm font-normal text-left text-gray-800 uppercase bg-white border-b border-gray-200"
                      >
                        {title}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {isLoading || isFetching ? (
                    <tr>
                      <td colSpan={5} className="text-center text-black py-10 w-full">
                        Loading...
                      </td>
                    </tr>
                  ) : data?.length === 0 ? (
                    <tr>
                      <td colSpan={5} className="text-center py-10 w-full text-white">
                        No records found
                      </td>
                    </tr>
                  ) : (
                    children
                  )}
                </tbody>
              </table>
              {!isLoading && (
                <Pagination
                  onPageChange={(page) => setCurrentPage(page)}
                  currentPage={currentPage}
                  totalPageCount={JSON.parse(headers?.["x-totalpagecount"])}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DataTable;
