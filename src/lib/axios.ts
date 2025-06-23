import axios from "axios";

const authInstance = axios.create({
  baseURL: "https://gregmvp-backend.onrender.com/",
  timeout: 50000,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

export { authInstance };
