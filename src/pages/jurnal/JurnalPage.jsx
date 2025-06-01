import React, { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import { getAllJurnals } from '../../services/index/jurnals';
import ErrorMessage from "../../components/ErrorMessage";
import MainLayout from '../../components/MainLayout';
import { useSearchParams } from "react-router-dom";
import AsyncSingleSelectDropdown from "../../components/AsyncSingleSelectDropdown"; // ganti import
import Search from "../../components/Search";
import { getAllRanks } from "../../services/index/jurnalsRanks";
import { filteredRanks } from "../../utils/multiSelectTagUtils";
import Pagination from "../../components/Pagination";
import JurnalTable from "../../components/JurnalTable";
import JurnalTableSkeleton from "../../components/skeleton/JurnalTableSkeleton";

let isFirstRun = true;

const promiseOptions = async (search, loadedOptions, { page }) => {
  const { data: ranksData, headers } = await getAllRanks(search, page);
  return {
    options: filteredRanks(search, ranksData),
    hasMore:
      parseInt(headers["x-totalpagecount"]) !==
      parseInt(headers["x-currentpage"]),
    additional: {
      page: page + 1,
    },
  };
};

const JurnalPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [rank, setRank] = useState(""); // hanya satu nilai

  const searchParamsValue = Object.fromEntries([...searchParams]);
  const currentPage = parseInt(searchParamsValue?.page) || 1;
  const searchKeyword = searchParamsValue?.search || "";

  const { data, isLoading, isError, refetch } = useQuery({
    queryFn: () => getAllJurnals(searchKeyword, currentPage, 12, rank ? [rank] : []),
    queryKey: ["jurnals", rank],
    onError: (error) => {
      toast.error(error.message);
      console.error(error);
    },
  });

  useEffect(() => {
    window.scrollTo(0, 0);
    if (isFirstRun) {
      isFirstRun = false;
      return;
    }
    refetch();
  }, [currentPage, searchKeyword, rank, refetch]);

  const handlePageChange = (page) => {
    setSearchParams({ page, search: searchKeyword });
  };

  const handleSearch = ({ searchKeyword }) => {
    setSearchParams({ page: 1, search: searchKeyword });
  };

  return (
    <MainLayout>
      <div className="w-full p-3">
        <div className="mx-auto items-center justify-center max-w-7xl flex mt-[120px]">
          <div className="pb-4 lg:text-l w-full justify-between text-m">
            <span className="cursor-pointer">
              <a href="/" className="hover:underline">Beranda</a>
            </span>
            <span className="cursor-pointer"> &gt; </span>
            <span className="cursor-pointer font-semibold">Beranda</span>
          </div>
        </div>

        <div className="mx-auto items-center justify-center max-w-7xl flex py-3">
          <div className="w-full lg:p-[32px] md:p-[16px] p-3 bg-linear-main shadow-inner-shadow-1 rounded-md text-neutral-10 bottom-0">
            <div className="text-heading-s sm:text-heading-m font-semibold">Hasil Pencarian Semua</div>
          </div>
        </div>

        <Search className="w-full max-w-xl" onSearchKeyword={handleSearch} />

        <div className="mx-auto items-center justify-center max-w-7xl">
          <AsyncSingleSelectDropdown
            placeholder={"Search by rank..."}
            loadOptions={promiseOptions}
            onChange={(selectedValue) => {
              setRank(selectedValue?.value || ""); // ✅ null -> ""
            }}
          />
        </div>
        <div className="mx-auto items-center justify-center max-w-7xl flex my-10 relative z-10">
          <div className="lg:p-[32px] md:p-[16px] py-2 bg-white shadow-inner-shadow-1 rounded-md w-full">
            <div className="mx-auto items-center justify-center max-w-7xl flex py-3">
              <div className="lg:p-[24px] md:p-[12px] p-3 bg-gradient-to-r from-linear-main-1 to-linear-main-2 shadow-inner-shadow-1 rounded-md text-neutral-10 w-full justify-center">
                <div className="text-lg sm:text-2xl text-black font-semibold flex text-center justify-center gap-3 items-center">
                  LIST JURNAL
                </div>
              </div>
            </div>
            <div className="py-1 overflow-x-auto">
              <table className="w-full">
                <thead className="bg-primary-border w-full rounded-t-lg">
                  <tr className="text-m font-semibold text-left">
                    <th className="px-4 rounded-tl-md">Cover</th>
                     <th className="px-2">Nama</th>
                    <th className="px-2">Link</th>
                    <th className="px-2">Harga</th>
                    <th className="px-2">Kontak</th>
                    <th className="px-2">Email</th>
                    <th className="px-2 rounded-tr-md py-4">Aksi</th>
                  </tr>
                </thead>
                <tbody className="text-s font-medium">
                  {isLoading ? (
                    <JurnalTableSkeleton count={5} />
                  ) : isError ? (
                    <ErrorMessage message="Couldn't fetch the jurnals data" />
                  ) : data?.data.length === 0 ? (
                    <tr>
                      <td colSpan={7} className="text-center text-orange-500 py-4">
                        No Jurnal Found!
                      </td>
                    </tr>
                  ) : (
                    data?.data.map((jurnal, index) => (
                      <JurnalTable
                        key={jurnal._id}
                        jurnal={jurnal}
                        index={index}
                        className="w-full md:w-[calc(50%-20px)] lg:w-[calc(33.33%-21px)]"
                      />
                    ))
                  )}
                </tbody>

              </table>
            </div>
          </div>
        </div>

        {!isLoading && (
          <Pagination
            onPageChange={handlePageChange}
            currentPage={currentPage}
            totalPageCount={JSON.parse(data?.headers?.["x-totalpagecount"])}
          />
        )}
      </div>
    </MainLayout>
  );
};

export default JurnalPage;
