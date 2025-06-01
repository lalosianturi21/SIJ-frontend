import axios from "axios";

export const getAllColumnStyles = async (
  searchKeyword = "",
  page = 1,
  limit = 1000
) => {
  try {
    const { data, headers } = await axios.get(
      `/api/jurnal-columnstyles?searchKeyword=${searchKeyword}&page=${page}&limit=${limit}`
    );
    return { data, headers };
  } catch (error) {
    if (error.response && error.response.data.message)
      throw new Error(error.response.data.message);
    throw new Error(error.message);
  }
};

export const getAllCountries = async (
  searchKeyword = "",
  page = 1,
  limit = 1000
) => {
  try {
    const { data, headers } = await axios.get(
      `/api/jurnal-countries?searchKeyword=${searchKeyword}&page=${page}&limit=${limit}`
    );
    return { data, headers };
  } catch (error) {
    if (error.response && error.response.data.message)
      throw new Error(error.response.data.message);
    throw new Error(error.message);
  }
};

export const getAllCurrencies = async (
  searchKeyword = "",
  page = 1,
  limit = 1000
) => {
  try {
    const { data, headers } = await axios.get(
      `/api/jurnal-currencies?searchKeyword=${searchKeyword}&page=${page}&limit=${limit}`
    );
    return { data, headers };
  } catch (error) {
    if (error.response && error.response.data.message)
      throw new Error(error.response.data.message);
    throw new Error(error.message);
  }
};

export const getAllInstitutions = async (
  searchKeyword = "",
  page = 1,
  limit = 1000
) => {
  try {
    const { data, headers } = await axios.get(
      `/api/jurnal-institutions?searchKeyword=${searchKeyword}&page=${page}&limit=${limit}`
    );
    return { data, headers };
  } catch (error) {
    if (error.response && error.response.data.message)
      throw new Error(error.response.data.message);
    throw new Error(error.message);
  }
};

export const getAllLanguages = async (
  searchKeyword = "",
  page = 1,
  limit = 1000
) => {
  try {
    const { data, headers } = await axios.get(
      `/api/jurnal-languages?searchKeyword=${searchKeyword}&page=${page}&limit=${limit}`
    );
    return { data, headers };
  } catch (error) {
    if (error.response && error.response.data.message)
      throw new Error(error.response.data.message);
    throw new Error(error.message);
  }
};

export const getAllPublishPeriods = async (
  searchKeyword = "",
  page = 1,
  limit = 1000
) => {
  try {
    const { data, headers } = await axios.get(
      `/api/jurnal-publishperiods?searchKeyword=${searchKeyword}&page=${page}&limit=${limit}`
    );
    return { data, headers };
  } catch (error) {
    if (error.response && error.response.data.message)
      throw new Error(error.response.data.message);
    throw new Error(error.message);
  }
};

export const getAllRanks = async (
  searchKeyword = "",
  page = 1,
  limit = 1000
) => {
  try {
    const { data, headers } = await axios.get(
      `/api/jurnal-ranks?searchKeyword=${searchKeyword}&page=${page}&limit=${limit}`
    );
    return { data, headers };
  } catch (error) {
    if (error.response && error.response.data.message)
      throw new Error(error.response.data.message);
    throw new Error(error.message);
  }
};

export const getAllTracks = async (
  searchKeyword = "",
  page = 1,
  limit = 1000
) => {
  try {
    const { data, headers } = await axios.get(
      `/api/jurnal-tracks?searchKeyword=${searchKeyword}&page=${page}&limit=${limit}`
    );
    return { data, headers };
  } catch (error) {
    if (error.response && error.response.data.message)
      throw new Error(error.response.data.message);
    throw new Error(error.message);
  }
};