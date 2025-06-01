import React, { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import { getAllLanguages } from '../../services/index/jurnalsLanguages';
import ErrorMessage from "../../components/ErrorMessage";
import MainLayout from '../../components/MainLayout';
import { useSearchParams } from "react-router-dom";
import Search from "../../components/Search";
import Pagination from "../../components/Pagination";
import LanguageTable from "../../components/LanguageTable";
import TableSkeleton from "../../components/skeleton/TableSkeleton";

let isFirstRun = true;



const LanguagePage = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const searchParamsValue = Object.fromEntries([...searchParams]);
  const currentPage = parseInt(searchParamsValue?.page) || 1;
  const searchKeyword = searchParamsValue?.search || "";

  const { data, isLoading, isError, refetch } = useQuery({
    queryFn: () => getAllLanguages(searchKeyword, currentPage, 12),
    queryKey: ["languages"],
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
  }, [currentPage, searchKeyword, refetch]);

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
            <span className="cursor-pointer font-semibold">Bahasa</span>
          </div>
        </div>

        <div className="mx-auto items-center justify-center max-w-7xl flex py-3">
          <div className="w-full lg:p-[32px] md:p-[16px] p-3 bg-linear-main shadow-inner-shadow-1 rounded-md text-neutral-10 bottom-0">
            <div className="text-heading-s sm:text-heading-m font-semibold">Hasil Pencarian Semua</div>
          </div>
        </div>

        <Search className="w-full max-w-xl" onSearchKeyword={handleSearch} />

        <div className="mx-auto items-center justify-center max-w-7xl flex my-10 relative z-10">
          <div className="lg:p-[32px] md:p-[16px] py-2 bg-white shadow-inner-shadow-1 rounded-md w-full">
            <div className="mx-auto items-center justify-center max-w-7xl flex py-3">
              <div className="lg:p-[24px] md:p-[12px] p-3 bg-gradient-to-r from-linear-main-1 to-linear-main-2 shadow-inner-shadow-1 rounded-md text-neutral-10 w-full justify-center">
                <div className="text-lg sm:text-2xl text-black font-semibold flex text-center justify-center gap-3 items-center">
                  LIST BAHASA
                </div>
              </div>
            </div>
            <div className="py-1 overflow-x-auto">
              <table className="w-full">
                <thead className="bg-primary-border w-full rounded-t-lg">
                  <tr className="text-m font-semibold text-left">
                    <th className="px-4 rounded-tl-md">No</th>
                    <th className="px-4">Nama</th>
                  </tr>
                </thead>
                <tbody className="text-s font-medium">
                  {isLoading ? (
                    <TableSkeleton count={5} />
                  ) : isError ? (
                    <ErrorMessage message="Couldn't fetch the languages data" />
                  ) : data?.data.length === 0 ? (
                    <tr>
                      <td colSpan={7} className="text-center text-orange-500 py-4">
                        No Language Found!
                      </td>
                    </tr>
                  ) : (
                    data?.data.map((language, index) => (
                      <LanguageTable
                        key={language._id}
                        language={language}
                        index={index}
                        startIndex={(currentPage - 1) * 12}
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

export default LanguagePage;
