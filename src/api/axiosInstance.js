import axios from "axios";

const API = axios.create({
    baseURL: "/api",
    headers: {
        "Content-Type": "application/json",
    },
});

API.interceptors.request.use((config) => {
    const token = localStorage.getItem("adminToken");

    console.log("TOKEN:", token);

    // Skip login API
    if (token && config.url !== "/users/auth") {
        config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
});

export default API;