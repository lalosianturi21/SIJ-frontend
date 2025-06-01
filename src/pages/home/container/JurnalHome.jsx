import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { getAllJurnals } from '../../../services/index/jurnals';
import { toast } from 'react-toastify';
import JurnalCard from '../../../components/JurnalCard';
import ErrorMessage from '../../../components/ErrorMessage';
import JurnalHomeSkeleton from './JurnalHomeSkeleton';

const JurnalHome = () => {
    const { data, isLoading, isError } = useQuery({
        queryFn: () => getAllJurnals("", 1, 8),
        queryKey: ["jurnals"],
        onError: (error) => {
            toast.error(error.message);
            console.log(error);
        }
    });

    return (
        <div className="flex-col max-w-7xl justify-center items-center mx-auto mt-8">
            <div className="flex w-full justify-between text-secondary-main items-center">
                <div className="flex items-center gap-4 text-2xl">
                    <h1 className="font-medium">Publikasi</h1>
                </div>
                <a href="/jurnalall" className="cursor-pointer text-lg">
                    <p>Lihat semua</p>
                </a>
            </div>

            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mt-4">
                {isLoading ? (
                    // Tampilkan 8 skeleton card saat loading
                    Array.from({ length: 8 }).map((_, index) => (
                        <JurnalHomeSkeleton key={index} />
                    ))
                ) : isError ? (
                    <ErrorMessage message="Couldn't fetch the jurnal data" />
                ) : (
                    data?.data.map((jurnal) => (
                        <JurnalCard
                            key={jurnal._id}
                            jurnal={jurnal}
                            className="w-full md:w-[calc(50%-20px)] lg:w-[calc(33.33%-21px)]"
                        />
                    ))
                )}
            </div>
        </div>
    );
};

export default JurnalHome;
