// Admin.jsx
import React, { useEffect, useState } from "react";
import { getAllJurnals } from "../../../services/index/jurnals";
import { getAllRanks } from "../../../services/index/jurnalsRanks";
import { getAllTracks } from "../../../services/index/jurnalsTracks";
import { getAllInstitutions } from "../../../services/index/jurnalsInstitutions";
import { getAllCurrencies } from "../../../services/index/jurnalsCurrencies";
import { getAllCountries } from "../../../services/index/jurnalsCountries";
import { getAllLanguages } from "../../../services/index/jurnalsLanguages";
import { getAllColumnStyles } from "../../../services/index/jurnalsColumnStyles";
import { getAllPublishPeriods } from "../../../services/index/jurnalsPublishPeriods";

const Admin = () => {
  const [totalJurnals, setTotalJurnals] = useState(0);
  const [totalRanks, setTotalRanks] = useState(0);
  const [totalTracks, setTotalTracks] = useState(0);
  const [totalInstitutions, setTotalInstitutions] = useState(0);
  const [totalCurrencies, setTotalCurrencies] = useState(0);
  const [totalCountries, setTotalCountries] = useState(0);
  const [totalLanguages, setTotalLanguages] = useState(0);
  const [totalColumnStyles, setTotalColumnStyles] = useState(0);
  const [totalPublishPeriods, setTotalPublishPeriods] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const jurnalsResponse = await getAllJurnals("", 1);
        setTotalJurnals(jurnalsResponse?.headers?.["x-total-count"] || jurnalsResponse?.data?.length || 0);

        const ranksResponse = await getAllRanks("", 1);
        setTotalRanks(ranksResponse?.headers?.["x-total-count"] || ranksResponse?.data?.length || 0);

        const tracksResponse = await getAllTracks("", 1);
        setTotalTracks(tracksResponse?.headers?.["x-total-count"] || tracksResponse?.data?.length || 0);

        const institutionsResponse = await getAllInstitutions("", 1);
        setTotalInstitutions(institutionsResponse?.headers?.["x-total-count"] || institutionsResponse?.data?.length || 0);

        const currenciesResponse = await getAllCurrencies("", 1);
        setTotalCurrencies(currenciesResponse?.headers?.["x-total-count"] || currenciesResponse?.data?.length || 0);

        const countriesResponse = await getAllCountries("", 1);
        setTotalCountries(countriesResponse?.headers?.["x-total-count"] || countriesResponse?.data?.length || 0);

        const languagesResponse = await getAllLanguages("", 1);
        setTotalLanguages(languagesResponse?.headers?.["x-total-count"] || languagesResponse?.data?.length || 0);

        const columnStylesResponse = await getAllColumnStyles("", 1);
        setTotalColumnStyles(columnStylesResponse?.headers?.["x-total-count"] || columnStylesResponse?.data?.length || 0);

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
    <div className="p-6">
      <h1 className="text-3xl font-bold text-white mb-6">Admin Dashboard</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        <div className="bg-purple-500 rounded-lg p-6 shadow text-center">
          <h2 className="text-xl font-semibold text-gray-200">Total Jurnals</h2>
          <p className="text-2xl font-bold mt-2 text-white">{isLoading ? "Loading..." : totalJurnals}</p>
        </div>
        <div className="bg-purple-500 rounded-lg p-6 shadow text-center">
          <h2 className="text-xl font-semibold text-gray-200">Total Ranks</h2>
          <p className="text-2xl font-bold mt-2 text-white">{isLoading ? "Loading..." : totalRanks}</p>
        </div>
        <div className="bg-purple-500 rounded-lg p-6 shadow text-center">
          <h2 className="text-xl font-semibold text-gray-200">Total Tracks</h2>
          <p className="text-2xl font-bold mt-2 text-white">{isLoading ? "Loading..." : totalTracks}</p>
        </div>
        <div className="bg-purple-500 rounded-lg p-6 shadow text-center">
          <h2 className="text-xl font-semibold text-gray-200">Total Institutions</h2>
          <p className="text-2xl font-bold mt-2 text-white">{isLoading ? "Loading..." : totalInstitutions}</p>
        </div>
         <div className="bg-purple-500 rounded-lg p-6 shadow text-center">
          <h2 className="text-xl font-semibold text-gray-200">Total Countries</h2>
          <p className="text-2xl font-bold mt-2 text-white">{isLoading ? "Loading..." : totalCountries}</p>
        </div>
         <div className="bg-purple-500 rounded-lg p-6 shadow text-center">
          <h2 className="text-xl font-semibold text-gray-200">Total Languages</h2>
          <p className="text-2xl font-bold mt-2 text-white">{isLoading ? "Loading..." : totalLanguages}</p>
        </div>
         <div className="bg-purple-500 rounded-lg p-6 shadow text-center">
          <h2 className="text-xl font-semibold text-gray-200">Total Currencies</h2>
          <p className="text-2xl font-bold mt-2 text-white">{isLoading ? "Loading..." : totalCurrencies}</p>
        </div>
         <div className="bg-purple-500 rounded-lg p-6 shadow text-center">
          <h2 className="text-xl font-semibold text-gray-200">Total Column Styles</h2>
          <p className="text-2xl font-bold mt-2 text-white">{isLoading ? "Loading..." : totalColumnStyles}</p>
        </div>
         <div className="bg-purple-500 rounded-lg p-6 shadow text-center">
          <h2 className="text-xl font-semibold text-gray-200">Total Publish Periods</h2>
          <p className="text-2xl font-bold mt-2 text-white">{isLoading ? "Loading..." : totalPublishPeriods}</p>
        </div>
      </div>
    </div>
  );
};

export default Admin;
