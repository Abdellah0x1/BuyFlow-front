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
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

export default api;