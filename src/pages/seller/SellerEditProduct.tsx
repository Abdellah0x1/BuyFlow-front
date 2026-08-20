import { Link, useParams } from "react-router"
import { useProduct } from "@/hooks/useProduct.ts"
import { useState } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { updateProduct } from "@/api/products";

export function EditProduct() {
    const { id } = useParams();
    const [isEditing, setIsEditing] = useState(false);

    const { data: product, isLoading, error } = useProduct(id!);
    const [formData, setFormData] = useState({
        productName: product?.productName || "",
        description: product?.description || "",
        quantity: product?.quantity || 0,
        price: product?.price || 0,
        discount: product?.discount || 0,
        specialPrice: product?.specialPrice || 0
    })


    async function handleSubmit(e: React.SubmitEvent) {
        e.preventDefault();
        if (!isEditing) return;


        const res = await updateProduct(product?.id!, formData);
        if (res.success) {
            toast.success("Product updated successfully");
            setIsEditing(false);
        }
        else {
            toast.error(res.error);
        }
    }

    if (error) {
        toast.error(error.message);
        return <div className="flex items-center justify-center">
            <p className="text-xl text-red-500">{error.message} </p>
        </div>
    }


    if (isLoading) return <div className="flex items-center justify-center">
        <div className="rounded-full animate-spin h-20 w-20 border-b-2 border-b-brand ">

        </div>
    </div>

    return <div className="space-y-6">
        <Link to="/seller/products" className="flex gap-2 text-gray-400">
            <ArrowLeft /> Back button
        </Link>
        <form className="bg-white rounded-xl p-8 border border-gray-200 mx-auto mt-8 mb-12">
            <div className="flex justify-between items-center">
                <h1 className="text-2xl font-semibold mb-8 text-brand">Edit Product</h1>
                <Button onClick={() => setIsEditing(!isEditing)} className="bg-brand text-white cursor-pointer">{isEditing ? "Save" : "Edit"}</Button>
            </div>
            <div className="space-y-6">
                <h2 className="text-xl">Basic info</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                        <Label>Product Name :</Label>
                        <Input onChange={e => setFormData({ ...formData, productName: e.target.value })} disabled={!isEditing} defaultValue={product?.productName} />
                    </div>
                    <div className="space-y-2">
                        <Label>Product Description :</Label>
                        <Input onChange={e => setFormData({ ...formData, description: e.target.value })} disabled={!isEditing} defaultValue={product?.description} />
                    </div>
                    <div className="space-y-2">
                        <Label>Product Price :</Label>
                        <Input type="number" onChange={e => setFormData({ ...formData, price: e.target.value })} disabled={!isEditing} defaultValue={product?.price} />
                    </div>
                    <div className="space-y-2">
                        <Label>Product Quantity :</Label>
                        <Input type="number" onChange={e => setFormData({ ...formData, quantity: e.target.value })} disabled={!isEditing} defaultValue={product?.quantity} />
                    </div>
                    <div className="space-y-2">
                        <Label>Product Discount :</Label>
                        <Input type="number" onChange={e => setFormData({ ...formData, discount: e.target.value })} disabled={!isEditing} defaultValue={product?.discount} />
                    </div>
                </div>
            </div>
        </form>
    </div>
}