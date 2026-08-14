import api from "./axios";


const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

export async function getUserNotifications() {
    const res = await api.get(`${BACKEND_URL}/notifications`);
    return res.data;
}


export async function readAllNotifications() {
    const res = await api.patch(`${BACKEND_URL}/read-all`)
    return res.data;
}