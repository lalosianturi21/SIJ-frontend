import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import React, { useState, useEffect } from "react";
import { getSingleJurnal, updateJurnal } from "../../../../services/index/jurnals";
import { useParams, useNavigate } from "react-router-dom";
import JurnalDetailSkeleton from "../../../jurnalDetail/JurnalDetailPageSkeleton";
import ErrorMessage from "../../../../components/ErrorMessage";
import { HiOutlineCamera } from "react-icons/hi";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useSelector } from "react-redux";
import MultiSelectTagDropdown from "../../components/select-dropdown/MultiSelectTagDropdown";
import SingleSelectTagDropdown from "../../components/select-dropdown/SingleSelectTagDropdown";

import {
  getAllRanks,
  getAllColumnStyles,
  getAllCountries,
  getAllCurrencies,
  getAllInstitutions,
  getAllLanguages,
  getAllTracks,
  getAllPublishPeriods,
} from "../../../../services/index/alljurnals"; // sesuaikan import sesuai pathmu

import {
  rankToOption,
  filteredRanks,
  columnstyleToOption,
  filteredColumnStyles,
  countryToOption,
  filteredCountries,
  currencyToOption,
  filteredCurrencies,
  institutionToOption,
  filteredInstitutions,
  languageToOption,
  filteredLanguages,
  trackToOption,
  filteredTracks,
  publishperiodToOption,
  filteredPublishPeriods,
} from "../../../../utils/multiSelectTagUtils";

const promiseRanks = async (inputValue) => {
  const { data: ranksData } = await getAllRanks();
  return filteredRanks(inputValue, ranksData);
};

const promiseColumnStyles = async (inputValue) => {
  const { data: columnstylesData } = await getAllColumnStyles();
  return filteredColumnStyles(inputValue, columnstylesData);
};

const promiseCountries = async (inputValue) => {
  const { data: countriesData } = await getAllCountries();
  return filteredCountries(inputValue, countriesData);
};

const promiseCurrencies = async (inputValue) => {
  const { data: currenciesData } = await getAllCurrencies();
  return filteredCurrencies(inputValue, currenciesData);
};

const promiseInstitutions = async (inputValue) => {
  const { data: institutionsData } = await getAllInstitutions();
  return filteredInstitutions(inputValue, institutionsData);
};

const promiseLanguages = async (inputValue) => {
  const { data: languagesData } = await getAllLanguages();
  return filteredLanguages(inputValue, languagesData);
};

const promiseTracks = async (inputValue) => {
  const { data: tracksData } = await getAllTracks();
  return filteredTracks(inputValue, tracksData);
};

const promisePublishPeriods = async (inputValue) => {
  const { data: publishPeriodsData } = await getAllPublishPeriods();
  return filteredPublishPeriods(inputValue, publishPeriodsData);
};

const EditJurnal = () => {
  const { slug } = useParams();
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const userState = useSelector((state) => state.user);

  const [initialCover, setInitialCover] = useState(null);
  const [cover, setCover] = useState(null);

  // Controlled states for single select fields
  const [selectedRank, setSelectedRanks] = useState(null);
  const [selectedColumnStyle, setSelectedColumnStyle] = useState(null);
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [selectedCurrency, setSelectedCurrency] = useState(null);
  const [selectedInstitution, setSelectedInstitution] = useState(null);
  const [selectedLanguage, setSelectedLanguage] = useState(null);
  const [selectedTrack, setSelectedTrack] = useState(null);

  // Controlled state for multi select (publish periods)
  const [selectedPublishPeriods, setSelectedPublishPeriods] = useState([]);

  // States to hold only IDs for backend update
  const [ranks, setRanks] = useState([]);
  const [columnstyles, setColumnStyles] = useState([]);
  const [countries, setCountries] = useState([]);
  const [currencies, setCurrencies] = useState([]);
  const [institutions, setInstitutions] = useState([]);
  const [languages, setLanguages] = useState([]);
  const [tracks, setTracks] = useState([]);
  const [publishperiods, setPublishPeriods] = useState([]);

  const [name, setName] = useState("");
  const [url, setUrl] = useState("");
  const [apc, setApc] = useState("");
  const [rating_avg, setRatingAvg] = useState("");
  const [contact, setContact] = useState("");
  const [email, setEmail] = useState("");
  const [jurnalSlug, setJurnalSlug] = useState(slug);

  const { data, isLoading, isError } = useQuery({
    queryFn: () => getSingleJurnal({ slug }),
    queryKey: ["jurnal", slug],
    onSuccess: (data) => {
      setInitialCover(data?.cover);
      setName(data.name);
      setUrl(data.url);
      setApc(data.apc);
      setRatingAvg(data.rating_avg);
      setContact(data.contact);
      setEmail(data.email);
      setJurnalSlug(data.slug || slug);
    },
    refetchOnWindowFocus: false,
  });

  // Set controlled select values when data is ready
  useEffect(() => {
    if (!data) return;

    // Single selects

    setSelectedColumnStyle(data.columnstyles.length > 0 ? columnstyleToOption(data.columnstyles[0]) : null);
    setColumnStyles(data.columnstyles.length > 0 ? [data.columnstyles[0]._id] : []);

    setSelectedCountry(data.countries.length > 0 ? countryToOption(data.countries[0]) : null);
    setCountries(data.countries.length > 0 ? [data.countries[0]._id] : []);

    setSelectedCurrency(data.currencies.length > 0 ? currencyToOption(data.currencies[0]) : null);
    setCurrencies(data.currencies.length > 0 ? [data.currencies[0]._id] : []);

    setSelectedInstitution(data.institutions.length > 0 ? institutionToOption(data.institutions[0]) : null);
    setInstitutions(data.institutions.length > 0 ? [data.institutions[0]._id] : []);


    setSelectedTrack(data.tracks.length > 0 ? trackToOption(data.tracks[0]) : null);
    setTracks(data.tracks.length > 0 ? [data.tracks[0]._id] : []);

    // Multi select (publish periods)
    const publishOptions = data.publishperiods.map(publishperiodToOption);
    setSelectedPublishPeriods(publishOptions);
    setPublishPeriods(publishOptions.map((item) => item.value));

    const languageOptions = data?.languages?.map(languageToOption) || [];
    setSelectedLanguage(languageOptions);
    setLanguages(languageOptions.map((item) => item.value));

    const rankOptions = data?.ranks?.map(rankToOption) || [];
    setSelectedRanks(rankOptions);
    setRanks(rankOptions.map((item) => item.value));

    const trackOptions = data?.tracks?.map(trackToOption) || [];
    setSelectedTrack(trackOptions);
    setTracks(trackOptions.map((item) => item.value));

  }, [data]);

  const { mutate: mutateUpdateJurnalDetail, isLoading: isLoadingUpdateJurnalDetail } = useMutation({
    mutationFn: ({ updatedData, slug, token }) => updateJurnal({ updatedData, slug, token }),
    onSuccess: () => {
      queryClient.invalidateQueries(["jurnal", slug]);
      toast.success("Jurnal is updated! 🎉");
      setTimeout(() => {
        navigate(`/admin/jurnals/manage`, { replace: true });
      }, 1000);
    },
    onError: (error) => {
      toast.error(error.message);
      console.error(error);
    },
  });

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setCover(file);
  };

  const handleUpdateJurnal = async () => {
    let updatedData = new FormData();

    if (cover) {
      updatedData.append("jurnalPicture", cover);
    } else if (initialCover) {
      // Convert old image url to File
      const urlToObject = async (url) => {
        let response = await fetch(url);
        let blob = await response.blob();
        return new File([blob], "previous-image.jpg", { type: blob.type });
      };
      const oldCover = await urlToObject(data?.cover);
      updatedData.append("jurnalPicture", oldCover);
    }

    updatedData.append(
      "document",
      JSON.stringify({
        ranks,
        name,
        slug: jurnalSlug,
        url,
        apc,
        rating_avg,
        contact,
        email,
        columnstyles,
        countries,
        currencies,
        institutions,
        languages,
        tracks,
        publishperiods,
      })
    );

    mutateUpdateJurnalDetail({
      updatedData,
      slug,
      token: userState.userInfo.token,
    });
  };

  return (
    <>
      <ToastContainer position="top-right" autoClose={3000} hideProgressBar />
      <div className="container mx-auto max-w-4xl p-6 bg-edit rounded-lg shadow-lg">
        {isLoading ? (
          <JurnalDetailSkeleton />
        ) : isError ? (
          <ErrorMessage message="Couldn't fetch the jurnal detail" />
        ) : (
          <div className="space-y-6">
            <div className="flex flex-col items-center">
              <label htmlFor="jurnalPicture">
                {cover ? (
                  <img src={URL.createObjectURL(cover)} alt={data?.name} className="rounded-lg w-150 h-68" />
                ) : initialCover ? (
                  <img src={data?.cover} alt={data?.name} className="rounded-lg w-150 h-68" />
                ) : (
                  <div className="upload-image w-190 h-68 bg-gray-200 flex justify-center items-center rounded-lg">
                    <HiOutlineCamera className="text-gray-600 w-10 h-10" />
                  </div>
                )}
              </label>
              <input type="file" className="hidden" id="jurnalPicture" onChange={handleFileChange} />
            </div>

            {/* Name */}
            <div>
              <label className="block text-lg font-semibold">Name</label>
              <input type="text" className="w-full p-2 border rounded-md" value={name} onChange={(e) => setName(e.target.value)} />
            </div>

            {/* URL */}
            <div>
              <label>URL</label>
              <input
                type="text"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                className="w-full p-2 border rounded-md"
              />
            </div>

            {/* APC */}
            <div>
              <label>APC</label>
              <input
                type="number"
                value={apc}
                onChange={(e) => setApc(e.target.value)}
                className="w-full p-2 border rounded-md"
              />
            </div>

            {/* Rating */}
            <div>
              <label>Rating Avg</label>
              <input
                type="number"
                step="0.1"
                value={rating_avg}
                onChange={(e) => setRatingAvg(e.target.value)}
                className="w-full p-2 border rounded-md"
              />
            </div>

            {/* Contact */}
            <div>
              <label>Contact</label>
              <input
                type="text"
                value={contact}
                onChange={(e) => setContact(e.target.value)}
                className="w-full p-2 border rounded-md"
              />
            </div>

            {/* Email */}
            <div>
              <label>Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full p-2 border rounded-md"
              />
            </div>

            {/* Ranks (multiple select) */}
            <div className="relative z-100">
              <label className="block text-lg font-semibold">Ranks</label>
              <MultiSelectTagDropdown loadOptions={promiseRanks} defaultValue={data.ranks.map(rankToOption)} onChange={(newValue) => setRanks(newValue.map((item) => item.value))} />
            </div>

            {/* Column Styles (single select) */}
            <div className="relative z-90">
              <label>Column Styles</label>
              <SingleSelectTagDropdown
                loadOptions={promiseColumnStyles}
                value={selectedColumnStyle}
                onChange={(selected) => {
                  setSelectedColumnStyle(selected);
                  setColumnStyles(selected ? [selected.value] : []);
                }}
              />
            </div>

            {/* Countries (single select) */}
            <div className="relative z-80">
              <label>Countries</label>
              <SingleSelectTagDropdown
                loadOptions={promiseCountries}
                value={selectedCountry}
                onChange={(selected) => {
                  setSelectedCountry(selected);
                  setCountries(selected ? [selected.value] : []);
                }}
              />
            </div>

            {/* Currencies (single select) */}
            <div className="relative z-70">
              <label>Currencies</label>
              <SingleSelectTagDropdown
                loadOptions={promiseCurrencies}
                value={selectedCurrency}
                onChange={(selected) => {
                  setSelectedCurrency(selected);
                  setCurrencies(selected ? [selected.value] : []);
                }}
              />
            </div>

            {/* Institutions (single select) */}
            <div className="relative z-60">
              <label>Institutions</label>
              <SingleSelectTagDropdown
                loadOptions={promiseInstitutions}
                value={selectedInstitution}
                onChange={(selected) => {
                  setSelectedInstitution(selected);
                  setInstitutions(selected ? [selected.value] : []);
                }}
              />
            </div>

            <div className="relative z-50">
              <label className="block text-lg font-semibold">Languages</label>
              <MultiSelectTagDropdown loadOptions={promiseLanguages} defaultValue={data.languages.map(languageToOption)} onChange={(newValue) => setLanguages(newValue.map((item) => item.value))} />
            </div>

            {/* Tracks (single select) */}
            <div className="relative z-40">
              <label className="block text-lg font-semibold">Tracks</label>
              <MultiSelectTagDropdown loadOptions={promiseTracks} defaultValue={data.tracks.map(trackToOption)} onChange={(newValue) => setTracks(newValue.map((item) => item.value))} />
            </div>


            {/* Publish Periods (multi select) */}
            <div>
              <label className="block text-lg font-semibold">Publish Periods</label>
              <MultiSelectTagDropdown loadOptions={promisePublishPeriods} defaultValue={data.publishperiods.map(publishperiodToOption)} onChange={(newValue) => setPublishPeriods(newValue.map((item) => item.value))} />
            </div>

            <div className="flex justify-end mt-6">
              <button
                disabled={isLoadingUpdateJurnalDetail}
                onClick={handleUpdateJurnal}
                className="w-full bg-purple-500 text-white font-semibold p-3 rounded-lg hover:bg-purple-600"
              >
                {isLoadingUpdateJurnalDetail ? "Updating..." : "Update Jurnal"}
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default EditJurnal;
