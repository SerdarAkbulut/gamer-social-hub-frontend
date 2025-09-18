import axios, { AxiosError, AxiosResponse } from "axios";

axios.defaults.baseURL =
  "https://gamer-social-hub-frontend-yimy-qg6is1oyf.vercel.app/api/";

axios.interceptors.response.use(
  (response) => response,
  (error: AxiosError) => {
    console.log("error interceptor");
    return Promise.reject(error);
  }
);
axios.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    const anonToken = localStorage.getItem("anonToken");

    if (config.headers) {
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      } else if (anonToken) {
        config.headers.Authorization = `Bearer ${anonToken}`;
      }
    }

    return config;
  },
  (error) => Promise.reject(error)
);

const getHeaders = (mediaType?: string) => {
  let headers = { "Content-Type": "application/json" };

  if (mediaType === "multipart") {
    headers = { "Content-Type": "multipart/form-data" };
  } else if (mediaType === "text") {
    headers = { "Content-Type": "text/plain" };
  } else if (mediaType === "xml") {
    headers = { "Content-Type": "application/xml" };
  }

  return headers;
};

const queries = {
  get: (url: string, mediaType?: string) =>
    axios
      .get(url, { headers: getHeaders(mediaType) })
      .then((response: AxiosResponse) => response.data),
  post: (url: string, body: object, mediaType?: string) =>
    axios
      .post(url, body, { headers: getHeaders(mediaType) })
      .then((response: AxiosResponse) => response.data),
  put: (url: string, body: object, mediaType?: string) =>
    axios
      .put(url, body, { headers: getHeaders(mediaType) })
      .then((response: AxiosResponse) => response.data),
  delete: (url: string, mediaType?: string) =>
    axios
      .delete(url, { headers: getHeaders(mediaType) })
      .then((response: AxiosResponse) => response.data),
};
const Category = {
  list: () => queries.get("category"),
};
const request = {
  Category,
};
export default request;
