import axios from "axios";

const authInstance = axios.create({
  baseURL: "https://gregmvp-backend.onrender.com/api/v1",
  timeout: 50000,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

export { authInstance };
