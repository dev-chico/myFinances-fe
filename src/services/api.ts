import axios from "axios";

const storedToken = localStorage.getItem("my-finances-token");
export const api = axios.create({
  baseURL: "http://localhost:3001",
  headers: {
    authorization: storedToken || "",
  },
});
