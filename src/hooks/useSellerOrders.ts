import { getSellerOrders } from "@/api/seller"
import { useQuery } from "@tanstack/react-query"


export const useSellerOrders = () => {
    return useQuery({
        queryKey: ["seller-orders"],
        queryFn: getSellerOrders
    })
}