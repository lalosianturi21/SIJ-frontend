import React, { useEffect, useState } from "react";
import { getAllInstitutions } from "../services/index/jurnalsInstitutions";
import { getAllCountries } from "../services/index/jurnalsCountries";
import { getAllLanguages } from "../services/index/jurnalsLanguages";
import { getAllPublishPeriods } from "../services/index/jurnalsPublishPeriods";


const Statistic = () => {
    const [totalInstitutions, setTotalInstitutions] = useState(0);
    const [totalCountries, setTotalCountries] = useState(0);
    const [totalLanguages, setTotalLanguages] = useState(0);
    const [totalPublishPeriods, setTotalPublishPeriods] = useState(0);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const institutionsResponse = await getAllInstitutions("", 1);
                setTotalInstitutions(institutionsResponse?.headers?.["x-total-count"] || institutionsResponse?.data?.length || 0);

                const countriesResponse = await getAllCountries("", 1);
                setTotalCountries(countriesResponse?.headers?.["x-total-count"] || countriesResponse?.data?.length || 0);

                const languagesResponse = await getAllLanguages("", 1);
                setTotalLanguages(languagesResponse?.headers?.["x-total-count"] || languagesResponse?.data?.length || 0);

                const publishPeriodsResponse = await getAllPublishPeriods("", 1);
                setTotalPublishPeriods(publishPeriodsResponse?.headers?.["x-total-count"] || publishPeriodsResponse?.data?.length || 0);
            } catch (error) {
                console.error("Error fetching data:", error);
            } finally {
                setIsLoading(false);
            }
        };
        fetchData();
    }, []);

    return (
        <div className="flex-col max-w-7xl justify-center items-center mx-auto mt-8">
            <div className="flex w-full justify-between text-secondary-main items-center">
                <div className="flex items-center gap-4  text-2xl">
                    <h1 className=" font-medium">Statistik</h1>
                </div>
            </div>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mt-4">
                <div className="cursor-pointer flex flex-col justify-center items-center bg-linear-blue p-7 rounded-2xl shadow-inner-shadow-1 transition-all hover:translate-y-[-8px] z-0">
                    <img src="/images/country.png" alt="country" width="50" height="60"></img>
                    <div className="flex items-center gap-1 text-lg font-medium">
                        <p>Negara</p>
                        <span className="relative"><svg width="24" height="24" viewBox="0 0 24 25" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12 21.1426C16.9706 21.1426 21 17.1131 21 12.1426C21 7.17202 16.9706 3.14258 12 3.14258C7.02944 3.14258 3 7.17202 3 12.1426C3 17.1131 7.02944 21.1426 12 21.1426Z" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path><path d="M12 8.14355H12.01V8.15355H12V8.14355Z" stroke="black" strokeWidth="2" strokeLinejoin="round"></path><path d="M12 12.1426V16.1426" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path></svg></span>
                    </div>
                    <p className="text-lg font-semibold">{isLoading ? "Loading..." : totalCountries}</p>
                </div>

                <div className="cursor-pointer flex flex-col justify-center items-center bg-linear-yellow p-7 rounded-2xl shadow-inner-shadow-1 transition-all hover:translate-y-[-8px]">
                    <img src="/images/language.png" width="45" height="50" alt="language"></img>
                    <div className="flex items-center gap-1 text-lg font-medium">
                        <p>Bahasa</p>
                        <span className="relative"><svg width="24" height="24" viewBox="0 0 24 25" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12 21.1426C16.9706 21.1426 21 17.1131 21 12.1426C21 7.17202 16.9706 3.14258 12 3.14258C7.02944 3.14258 3 7.17202 3 12.1426C3 17.1131 7.02944 21.1426 12 21.1426Z" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path><path d="M12 8.14355H12.01V8.15355H12V8.14355Z" stroke="black" strokeWidth="2" strokeLinejoin="round"></path><path d="M12 12.1426V16.1426" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path></svg></span>
                    </div>
                    <p className="text-lg font-semibold">{isLoading ? "Loading..." : totalLanguages}</p>
                </div>

                <div className="cursor-pointer flex flex-col justify-center items-center bg-linear-green p-7 rounded-2xl shadow-inner-shadow-1 transition-all hover:translate-y-[-8px]">
                    <img src="/images/institution.png" width="42" alt="institution"></img>
                    <div className="flex items-center gap-1 text-lg font-medium">
                        <p>Perguruan Tinggi</p>
                        <span className="relative"><svg width="24" height="24" viewBox="0 0 24 25" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12 21.1426C16.9706 21.1426 21 17.1131 21 12.1426C21 7.17202 16.9706 3.14258 12 3.14258C7.02944 3.14258 3 7.17202 3 12.1426C3 17.1131 7.02944 21.1426 12 21.1426Z" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path><path d="M12 8.14355H12.01V8.15355H12V8.14355Z" stroke="black" strokeWidth="2" strokeLinejoin="round"></path><path d="M12 12.1426V16.1426" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path></svg></span>
                    </div>
                    <p className="text-lg font-semibold">{isLoading ? "Loading..." : totalInstitutions}</p>
                </div>

                <div className="cursor-pointer flex flex-col justify-center items-center bg-linear-purple p-7 rounded-2xl shadow-inner-shadow-1 transition-all hover:translate-y-[-8px]">
                    <img src="/images/publishperiod.png" width="42" alt="publish period"></img>
                    <div className="flex items-center gap-1 text-lg font-medium">
                        <p>Publish Period</p>
                        <span className="relative"><svg width="24" height="24" viewBox="0 0 24 25" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12 21.1426C16.9706 21.1426 21 17.1131 21 12.1426C21 7.17202 16.9706 3.14258 12 3.14258C7.02944 3.14258 3 7.17202 3 12.1426C3 17.1131 7.02944 21.1426 12 21.1426Z" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path><path d="M12 8.14355H12.01V8.15355H12V8.14355Z" stroke="black" strokeWidth="2" strokeLinejoin="round"></path><path d="M12 12.1426V16.1426" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path></svg></span>
                    </div>
                    <p className="text-lg font-semibold">{isLoading ? "Loading..." : totalPublishPeriods}</p>
                </div>

            </div>
        </div>
    )
}

export default Statistic;