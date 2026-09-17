import { useNotificationsStore } from "@/store/notificationStore";
import { useEffect } from "react";
import type { Notification } from "@/types";



export const useNotificationSSE = () => {
    const { notifications, setNotifications } = useNotificationsStore();

    useEffect(() => {
        const baseUrl = import.meta.env.VITE_BACKEND_URL;
        const eventSource = new EventSource(`${baseUrl}/notifications/subscribe`, { withCredentials: true })

        eventSource.addEventListener('Connected', (event) => {
            console.log(event.data)
        })

        eventSource.addEventListener('notification', event => {
            const newNoitf: Notification = JSON.parse(event.data);
            setNotifications([newNoitf, ...notifications])
        })



        eventSource.onerror = () => {
            console.error("SSE connection lost, reconnecting...")
        }
        return () => eventSource.close();
    }, [notifications, setNotifications])
}