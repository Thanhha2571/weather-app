import axios from "axios";

const BASE_URL = "https://api.openweathermap.org/data/2.5/";
const TIME_OUT = 5000;
export const API_KEY = "e5f1e0e91073e047bfd37039ad433153"

export const axiosInstance = axios.create({
  baseURL: BASE_URL,
  timeout: TIME_OUT,
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