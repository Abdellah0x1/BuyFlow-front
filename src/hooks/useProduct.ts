import { getProductById } from "@/api/products";
import { useQuery } from "@tanstack/react-query";

export function useProduct(id: string | number) {
    return useQuery({
        queryKey: ["product " + id],
        queryFn: async () => {
            const res = await getProductById(Number(id));
            return res.data;
        }

    })
}