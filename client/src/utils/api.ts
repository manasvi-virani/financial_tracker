import axios, { type AxiosRequestHeaders } from "axios";

const BASE_URL = import.meta.env.VITE_API_BASE_URL; 
const axiosInstance = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

const axiosInstanceWithToken = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${localStorage.getItem("token") || ""}`,
  },
});

export const getHttps = async <T>(endpoint: string, headers?: AxiosRequestHeaders): Promise<T> => {
  const response = await axiosInstance.get(endpoint, { headers });
  return response.data;
};

export const postHttps = async <T>(
  endpoint: string,
  body: object,
  headers?: AxiosRequestHeaders
): Promise<T> => {
  const response = await axiosInstance.post(endpoint, body, { headers });
  return response.data;
};


export const getHttpsWithAuth = async <T>(endpoint: string, headers?: AxiosRequestHeaders): Promise<T> => {
  const response = await axiosInstanceWithToken.get(endpoint, { headers });
  return response.data;
};

export const postHttpsWithAuth = async <T>(
  endpoint: string,
  body: object,
  headers?: AxiosRequestHeaders
): Promise<T> => {
  const response = await axiosInstanceWithToken.post(endpoint, body, { headers });
  return response.data;
};

