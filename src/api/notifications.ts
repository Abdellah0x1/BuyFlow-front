import api from "./axios";



export async function getUserNotifications() {
    const res = await api.get(`/notifications`);
    return res.data;
}


export async function readAllNotifications() {
    const res = await api.patch(`/read-all`)
    return res.data;
}