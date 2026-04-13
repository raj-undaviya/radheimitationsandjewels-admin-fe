import axios from "axios";

const API = axios.create({
    baseURL: "https://radheimitationsandjewels-backend.onrender.com/api",
    headers: {
        "Content-Type": "application/json",
    },
});

// ✅ REQUEST INTERCEPTOR 
API.interceptors.request.use((config) => {
    const token = localStorage.getItem("adminToken");

    console.log("TOKEN:", token);

    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
});

// (VERY IMPORTANT)
API.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response?.status === 401) {
            console.log("Token expired → logging out");

            localStorage.removeItem("adminToken");
            localStorage.removeItem("adminUser");

            window.location.href = "/admin/login"; // redirect
        }

        return Promise.reject(error);
    }
);

export default API;