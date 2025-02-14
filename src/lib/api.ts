import axios from "axios";

const API = axios.create({
  baseURL: "https://houseofedtech.vercel.app/api",
  headers: { "Content-Type": "application/json" },
});

export const fetcher = (url: string) => API.get(url).then((res) => res.data);
export default API;
