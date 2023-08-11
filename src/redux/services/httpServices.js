import axios from "axios";

const BASE_URL = "https://api.openweathermap.org/data/2.5/";
const BASE_URL2 = "https://api.opencagedata.com/geocode/v1/"
const TIME_OUT = 5000;
export const API_KEY = "e5f1e0e91073e047bfd37039ad433153"
export const key = "f7d25c709c43481ea5d4b45a455b18a9"
export const axiosInstance = axios.create({
  baseURL: BASE_URL,
  timeout: TIME_OUT,
});

export const axiosInstance2 = axios.create({
  baseURL: BASE_URL2,
  timeout: TIME_OUT
});

export const httpService = {
  async GET(apiConfig) {
    const { uri, params, ...rest } = apiConfig;
    try {
      const res = await axiosInstance.get(uri, {
        params,
        ...rest,
      });
      return res.data;
    } catch (error) {
      throw error;
    }
  },
}

export const httpService2 = {
  async GET(apiConfig) {
    const { uri, params, ...rest } = apiConfig;
    try {
      const res = await axiosInstance2.get(uri, {
        params,
        ...rest,
      });
      return res.data;
    } catch (error) {
      throw error;
    }
  },
}