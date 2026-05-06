import axios from "axios";
import { toast } from "react-toastify";

const API = axios.create({
    baseURL: import.meta.env.VITE_BACKEND_BASE_URL,
    headers: {
        "Content-Type": "application/json",
    },
});

// REQUEST INTERCEPTOR 
API.interceptors.request.use((config) => {
    const token = localStorage.getItem("adminToken");

    console.log("TOKEN:", token);

    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
});

// // (VERY IMPORTANT)
// API.interceptors.response.use(
//     (response) => response,
//     (error) => {

//         const isAuthAPI = error.config?.url?.includes("/users/auth");

//         if (error.response?.status === 401 && !isAuthAPI) {
//             localStorage.removeItem("adminToken");
//             localStorage.removeItem("adminUser");
//             window.location.href = "/admin/login";
//         }

//         return Promise.reject(error);
//     }
// );

API.interceptors.response.use(

    // SUCCESS
    (response) => response,

    // ERROR
    (error) => {

        const isAuthAPI =
            error.config?.url?.includes("/users/auth/");

        // TOKEN EXPIRED
        if (
            error.response?.status === 401 &&
            !isAuthAPI
        ) {

            const code = error.response?.data?.code;

            if (code === "token_not_valid") {

                // REMOVE ADMIN DATA
                localStorage.removeItem("adminToken");
                localStorage.removeItem("adminUser");

                // MESSAGE
                toast.error("Admin session expired");

                // REDIRECT
                setTimeout(() => {
                    window.location.href = "/admin/login";
                }, 1500);
            }
        }

        return Promise.reject(error);
    }
);

export default API;