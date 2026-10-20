import axios, { AxiosRequestConfig } from "axios";
const apiUrl = import.meta.env.VITE_API_URL;
export const api = axios.create({
  baseURL: apiUrl,
  headers: {
    "Content-Type": "application/json",
  },
});
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});
export const getData = async (url: string, queryObj?: Object) => {
  try {
    const response = await api.get(url, queryObj ? { params: queryObj } : undefined)
    return response.data
  } catch (error) {
    console.log(error)
  }
}


export const postData = async (
  url: string,
  data: object,
  config?: AxiosRequestConfig
) => {
  const response = await api.post(url, data, config);
  return response.data;
};
export const putData = async (url: string, data: Object) => {
  try {
    const response = await api.put(url, data)
    return response.data
  } catch (error) {
    console.log(error)
  }
}
export const patchData = async (url: string, data: Object) => {
  try {
    const response = await api.patch(url, data)
    return response.data
  } catch (error) {
    console.log(error)
  }
}
export const deleteData = async (url: string) => {
  try {
    const response = await api.delete(url)
    return response.data
  } catch (error) {
    console.log(error)
  }
}