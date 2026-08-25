import { getUserOrder } from "@/api/order"
import { useQuery } from "@tanstack/react-query"

export const useUserOrders = () => {
    return useQuery({
        queryKey: ['user-orders'],
        queryFn: async () => {
            const res = await getUserOrder();
            if (res.success) return res.data;
            throw new Error(res.message)
        }
    })
}