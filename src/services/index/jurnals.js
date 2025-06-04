import axios from "axios";

export const getAllJurnals = async (searchKeyword = "", page= 1, limit = 10, ranks = []) => {
    try {
        const { data, headers } = await axios.get(
            `/api/jurnals?searchKeyword=${searchKeyword}&page=${page}&limit=${limit}&ranks=${ranks.join(",")}`
        );
        return { data, headers };
    } catch (error) {
        if(error.response && error.response.data.message)
            throw new Error(error.response.data.message);
        throw new Error(error.message);
    }
};

export const getSingleJurnal = async ({ slug }) => {
    try {
        const { data } = await axios.get(`/api/jurnals/${slug}`);
        return data;
    } catch (error) {
        if(error.response && error.response.data.message)
            throw new Error(error.response.data.message);
        throw new Error(error.message);
    }
};

export const deleteJurnal = async ({ slug, token }) => {
    try {
        const config = {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        };

        const { data } = await axios.delete(`/api/jurnals/${slug}`, config);
        return data;
    } catch (error) {
        if (error.response && error.response.data.message)
            throw new Error(error.response.data.message);
        throw new Error(error.message);
    }
};

export const updateJurnal = async ({ updatedData, slug, token }) => {
    try {
        const config = {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        };
        const { data } = await axios.put(`/api/jurnals/${slug}`, updatedData, config);
        return data;
    } catch (error) {
        if (error.response && error.response.data.message)
            throw new Error(error.response.data.message);
        throw new Error(error.message);
    }
};

export const createJurnal = async ({ token }) => {
    try {
        const config = {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        };

        const { data } = await axios.post(`/api/jurnals`, {}, config);
        return data;
    } catch (error) {
        if(error.response && error.response.data.message)
            throw new Error(error.response.data.message);
        throw new Error(error.message);
    }
};

export const exportJurnalCSV = async (token) => {
  try {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,  // Include Bearer token in headers
      },
      responseType: "arraybuffer", // Ensure we handle binary data
    };

    const response = await axios.get("/api/jurnals/export", config);  // Pass the config with the token

    return response; // Return the response containing CSV data
  } catch (error) {
    if (error.response && error.response.data.message) {
      throw new Error(error.response.data.message);
    }
    throw new Error(error.message);
  }
};
