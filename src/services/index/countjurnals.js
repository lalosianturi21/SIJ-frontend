import axios from "axios";

export const getAllJurnals = async () => {
  try {
    const { data, headers } = await axios.get(`/api/jurnals/countjurnals`);
    return { data, headers };
  } catch (error) {
    throw new Error(error.response?.data?.message || error.message);
  }
};


export const getAllColumnStyles = async () => {
  try {
    const { data, headers } = await axios.get(`/api/jurnal-columnstyles/countcolumnstyles`);
    return { data, headers };
  } catch (error) {
    throw new Error(error.response?.data?.message || error.message);
  }
};

export const getAllCountries = async () => {
  try {
    const { data, headers } = await axios.get(`/api/jurnal-countries/countcountries`);
    return { data, headers };
  } catch (error) {
    throw new Error(error.response?.data?.message || error.message);
  }
};

export const getAllCurrencies = async () => {
  try {
    const { data, headers } = await axios.get(`/api/jurnal-currencies/countcurrencies`);
    return { data, headers };
  } catch (error) {
    throw new Error(error.response?.data?.message || error.message);
  }
};

export const getAllInstitutions = async () => {
  try {
    const { data, headers } = await axios.get(`/api/jurnal-institutions/countinstitutions`);
    return { data, headers };
  } catch (error) {
    throw new Error(error.response?.data?.message || error.message);
  }
};

export const getAllLanguages = async () => {
  try {
    const { data, headers } = await axios.get(`/api/jurnal-languages/countlanguages`);
    return { data, headers };
  } catch (error) {
    throw new Error(error.response?.data?.message || error.message);
  }
};

export const getAllPublishPeriods = async () => {
  try {
    const { data, headers } = await axios.get(`/api/jurnal-publishperiods/countpublishperiods`);
    return { data, headers };
  } catch (error) {
    throw new Error(error.response?.data?.message || error.message);
  }
};

export const getAllRanks = async () => {
  try {
    const { data, headers } = await axios.get(`/api/jurnal-ranks/countranks`);
    return { data, headers };
  } catch (error) {
    throw new Error(error.response?.data?.message || error.message);
  }
};

export const getAllTracks = async () => {
  try {
    const { data, headers } = await axios.get(`/api/jurnal-tracks/counttracks`);
    return { data, headers };
  } catch (error) {
    throw new Error(error.response?.data?.message || error.message);
  }
};

