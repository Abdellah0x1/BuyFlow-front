import { create } from 'zustand'
import type { Notification } from '@/types';


type NotificationsState = {
    notifications: Notification[],
    unreadCount: number,
    setNotifications: (notification: Notification[]) => void,
    markAllRead: () => void,
}


export const useNotificationsStore = create<NotificationsState>()((set) => ({
    notifications: [],
    unreadCount: 0,
    setNotifications: (notifications: Notification[]) =>
        set({
            notifications,
            unreadCount: notifications.filter(notif => !notif.isRead).length
        }),
    markAllRead: () => {
        set({
            unreadCount: 0,
            notifications: useNotificationsStore.getState().notifications.map(notif => ({ ...notif, isRead: true }))
        })
    }
}))