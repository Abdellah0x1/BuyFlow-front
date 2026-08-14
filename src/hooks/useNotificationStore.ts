import { getUserNotifications, readAllNotifications } from "@/api/notifications";
import { useNotificationsStore } from "@/store/notificationStore"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export const useNotifications = () => {
    const { setNotifications } = useNotificationsStore();

    return useQuery({
        queryKey: ['notifications'],
        queryFn: async () => {
            const data = await getUserNotifications();
            setNotifications(data)
            return data;
        },
    })
}


export const useReadAllNotifications = () => {
    const queryClient = useQueryClient();
    const { markAllRead } = useNotificationsStore();

    return useMutation({
        mutationFn: readAllNotifications,
        onMutate: () => markAllRead(),
        onSettled: () => queryClient.invalidateQueries({
            queryKey: ['notifications']
        })
    })
}