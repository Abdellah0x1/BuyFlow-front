import { Spinner } from "@/components/Common/Spinner";
import { useCreateAddress, useUserAddresses, useUpdateAddress } from "@/hooks/useUserAddresses";
import { Home, Pencil, X, Check } from "lucide-react";
import type { Address } from "@/api/address";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

export default function UserAddresses() {
    const { data: addresses, isLoading, error } = useUserAddresses();
    const [editIndex, setEditIndex] = useState<number | null>(null);
    const [editForm, setEditForm] = useState<Address>({
        street: "",
        city: "",
        state: "",
        zipcode: "",
        country: "",
    });
    const [createAddress, setCreateAddress] = useState<boolean>(false);
    const [createForm, setCreateForm] = useState<Address>({
        street: "",
        city: "",
        state: "",
        zipcode: "",
        country: "",
    })
    const createAddressMutation = useCreateAddress();
    const updateAddressMutation = useUpdateAddress();

    const handleEdit = (index: number, address: Address) => {
        setEditIndex(index);
        setEditForm({ ...address });


    };

    const handleCancel = () => {
        setEditIndex(null);
        setEditForm({ street: "", city: "", state: "", zipcode: "", country: "" });
    };

    const handleSave = () => {
        if (editIndex === null || !addresses) return;
        const addressToUpdate = addresses[editIndex];
        if (!addressToUpdate?.addressId) return;

        updateAddressMutation.mutate({ id: String(addressToUpdate.addressId), address: editForm }, {
            onSuccess: () => {
                toast.success("Address updated successfully")
                handleCancel()
            },
            onError: (error) => {
                toast.error(error.message)
            }
        })
    };

    const handleChange = (field: keyof Address, value: string) => {
        setEditForm((prev) => ({ ...prev, [field]: value }));
    };

    function handleCreateAddress(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        createAddressMutation.mutate(createForm, {
            onSuccess: () => {
                setCreateAddress(false);
                setCreateForm({
                    street: "",
                    city: "",
                    state: "",
                    zipcode: "",
                    country: "",
                })
                toast.success("Address added successfully")
            },
            onError: (error) => {
                toast.error("Failed to add address")
            }
        })
    }

    return (
        <div className="space-y-6">
            {/* Header */}
            <div>
                <h2 className="text-xl font-bold text-slate-900 tracking-tight">My Addresses</h2>
                <p className="text-sm text-slate-500 mt-1">
                    Manage your shipping addresses
                </p>
            </div>

            <div className="h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent" />

            <div className="flex flex-col items-stretch gap-6  items-center min-h-[30vh]">
                {isLoading && <Spinner />}

                {error && (
                    <div className="flex flex-col items-center justify-center text-center">
                        <div className="rounded-2xl bg-slate-100 p-5 mb-4">
                            <Home className="h-12 w-12 text-slate-400" />
                        </div>
                        <h3 className="text-xl font-semibold text-slate-800">No addresses saved</h3>
                        <p className="text-sm text-slate-500 mt-2 max-w-sm">
                            Add a shipping address to make checkout faster.
                        </p>
                    </div>
                )}

                {addresses && addresses.length === 0 && !error && !createAddress && (
                    <div className="flex flex-col items-center justify-center text-center">
                        <div className="rounded-2xl bg-slate-100 p-5 mb-4">
                            <Home className="h-12 w-12 text-slate-400" />
                        </div>
                        <h3 className="text-xl font-semibold text-slate-800">No addresses saved</h3>
                        <p className="text-sm text-slate-500 mt-2 max-w-sm">
                            Add a shipping address to make checkout faster.
                        </p>
                    </div>
                )}

                {addresses && addresses.length > 0 && (
                    <div className="w-full space-y-3">
                        {addresses.map((address: Address, index: number) => (
                            <div key={index} className="p-4 bg-gray-50 w-full rounded-md">
                                {editIndex === index ? (
                                    /* ---- Edit Mode ---- */
                                    <div className="space-y-3">
                                        <div className="flex flex-col gap-1">
                                            <label className="text-xs font-semibold text-slate-600">Street</label>
                                            <input
                                                type="text"
                                                value={editForm.street}
                                                onChange={(e) => handleChange("street", e.target.value)}
                                                className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-slate-400"
                                            />
                                        </div>
                                        <div className="flex flex-col gap-1">
                                            <label className="text-xs font-semibold text-slate-600">City</label>
                                            <input
                                                type="text"
                                                value={editForm.city}
                                                onChange={(e) => handleChange("city", e.target.value)}
                                                className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-slate-400"
                                            />
                                        </div>
                                        <div className="flex flex-col gap-1">
                                            <label className="text-xs font-semibold text-slate-600">State</label>
                                            <input
                                                type="text"
                                                value={editForm.state}
                                                onChange={(e) => handleChange("state", e.target.value)}
                                                className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-slate-400"
                                            />
                                        </div>
                                        <div className="flex flex-col gap-1">
                                            <label className="text-xs font-semibold text-slate-600">Zipcode</label>
                                            <input
                                                type="text"
                                                value={editForm.zipcode}
                                                onChange={(e) => handleChange("zipcode", e.target.value)}
                                                className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-slate-400"
                                            />
                                        </div>
                                        <div className="flex flex-col gap-1">
                                            <label className="text-xs font-semibold text-slate-600">Country</label>
                                            <input
                                                type="text"
                                                value={editForm.country}
                                                onChange={(e) => handleChange("country", e.target.value)}
                                                className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-slate-400"
                                            />
                                        </div>
                                        <div className="flex gap-2 pt-2">
                                            <button
                                                onClick={handleSave}
                                                className="flex items-center gap-1 px-3 py-1.5 text-sm font-medium text-white bg-slate-800 rounded-md hover:bg-slate-700 transition-colors"
                                            >
                                                <Check className="h-4 w-4" /> Save
                                            </button>
                                            <button
                                                onClick={handleCancel}
                                                className="flex items-center gap-1 px-3 py-1.5 text-sm font-medium text-slate-600 bg-white border border-slate-300 rounded-md hover:bg-slate-50 transition-colors"
                                            >
                                                <X className="h-4 w-4" /> Cancel
                                            </button>
                                        </div>
                                    </div>
                                ) : (
                                    /* ---- Read-only Mode ---- */
                                    <div className="flex justify-between items-start">
                                        <div className="space-y-1">
                                            <div className="flex gap-4 items-center">
                                                <h3 className="font-semibold">Street:</h3>
                                                <p className="text-sm font-light">{address.street}</p>
                                            </div>
                                            <div className="flex gap-4 items-center">
                                                <h3 className="font-semibold">City:</h3>
                                                <p className="text-sm font-light">{address.city}</p>
                                            </div>
                                            <div className="flex gap-4 items-center">
                                                <h3 className="font-semibold">State:</h3>
                                                <p className="text-sm font-light">{address.state}</p>
                                            </div>
                                            <div className="flex gap-4 items-center">
                                                <h3 className="font-semibold">Zipcode:</h3>
                                                <p className="text-sm font-light">{address.zipcode}</p>
                                            </div>
                                            <div className="flex gap-4 items-center">
                                                <h3 className="font-semibold">Country:</h3>
                                                <p className="text-sm font-light">{address.country}</p>
                                            </div>
                                        </div>
                                        <button
                                            onClick={() => handleEdit(index, address)}
                                            className="flex items-center gap-1 px-3 py-1.5 text-sm font-medium text-slate-600 hover:text-slate-800 hover:bg-slate-200 rounded-md transition-colors"
                                        >
                                            <Pencil className="h-4 w-4" /> Edit
                                        </button>
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                )}
                {!createAddress && <Button className="w-full cursor-pointer" onClick={() => setCreateAddress(true)}> Add new address </Button>}
                {createAddress && <div className="flex flex-col items-stretch gap-5">
                    <form className="space-y-3" onSubmit={e => handleCreateAddress(e)}>
                        <div className="flex flex-col gap-1 items-stretch">
                            <label className="text-xs font-semibold text-slate-600">Street</label>
                            <input
                                type="text"
                                value={createForm.street}
                                onChange={(e) => setCreateForm({ ...createForm, street: e.target.value })}
                                className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-slate-400"
                            />
                        </div>
                        <div className="flex flex-col gap-1">
                            <label className="text-xs font-semibold text-slate-600">City</label>
                            <input
                                type="text"
                                value={createForm.city}
                                onChange={(e) => setCreateForm({ ...createForm, city: e.target.value })}
                                className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-slate-400"
                            />
                        </div>
                        <div className="flex flex-col gap-1">
                            <label className="text-xs font-semibold text-slate-600">State</label>
                            <input
                                type="text"
                                value={createForm.state}
                                onChange={(e) => setCreateForm({ ...createForm, state: e.target.value })}
                                className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-slate-400"
                            />
                        </div>
                        <div className="flex flex-col gap-1">
                            <label className="text-xs font-semibold text-slate-600">Zipcode</label>
                            <input
                                type="text"
                                value={createForm.zipcode}
                                onChange={(e) => setCreateForm({ ...createForm, zipcode: e.target.value })}
                                className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-slate-400"
                            />
                        </div>
                        <div className="flex flex-col gap-1">
                            <label className="text-xs font-semibold text-slate-600">Country</label>
                            <input
                                type="text"
                                value={createForm.country}
                                onChange={(e) => setCreateForm({ ...createForm, country: e.target.value })}
                                className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-slate-400"
                            />
                        </div>
                        <div className="flex gap-4">
                            <Button className="w-1/2 cursor-pointer bg-gray-300 text-gray-700 transition-all hover:bg-gray-400 hover:text-gray-800" onClick={() => setCreateAddress(false)}> cancel </Button>
                            <Button className="w-1/2 cursor-pointer" type="submit"> create </Button>
                        </div>
                    </form>


                </div>
                }
            </div>
        </div>
    );
}
