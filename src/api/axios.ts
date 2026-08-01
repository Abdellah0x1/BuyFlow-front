import axios from "axios";
import { useAuthStore } from "../store/authStore";

const api = axios.create({
    baseURL: import.meta.env.VITE_BACKEND_URL,
    withCredentials: true,
    timeout: 10000,
})

api.interceptors.request.use((config) => {
    const user = useAuthStore.getState().user as any;
    const token = user?.jwt || user?.token || user?.accessToken;
    
    console.log("[Axios Request] URL:", config.url, "Method:", config.method);
    console.log("[Axios Request] Found Token in Store:", token ? "Yes" : "No");

    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    
    console.log("[Axios Request] Final Headers:", config.headers);
    return config;
});

export default api;