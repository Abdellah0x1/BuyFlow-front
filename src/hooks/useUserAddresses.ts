import { getUserAddresses, createAddress, type Address, updateAddress } from "@/api/address";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

export const useUserAddresses = () => {
    return useQuery({
        queryKey: ["user-addresses"],
        queryFn: async () => {
            const res = await getUserAddresses();
            if (res.success) return res.data;
            throw new Error(res.error);
        },
    });
};

export const useCreateAddress = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (address: Address) => createAddress(address),
        onSuccess: (res) => {
            if (res.success) {
                queryClient.invalidateQueries({ queryKey: ["user-addresses"] });
            }
        },
    });
};


export const useUpdateAddress = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: ({ id, address }: { id: string, address: Address }) => updateAddress(id, address),
        onSuccess: (res) => {
            if (res.success) queryClient.invalidateQueries({ queryKey: ["user-addresses"] })

        }
    })
}