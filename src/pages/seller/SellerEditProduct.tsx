import { Link, useParams } from "react-router"
import { useProduct } from "@/hooks/useProduct.ts"
import { useState } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { updateProduct, uploadProductImages, deleteProductImage } from "@/api/products";
import type { Product } from "@/types";
import { X, Upload } from "lucide-react";

export function EditProduct() {
    const { id } = useParams();
    const [isEditing, setIsEditing] = useState(false);
    const [removedImageIds, setRemovedImageIds] = useState<number[]>([]);

    const { data: product, isLoading, error } = useProduct(id!);
    const [formData, setFormData] = useState({
        productName: product?.productName,
        description: product?.description,
        quantity: product?.quantity,
        price: product?.price,
        discount: product?.discount,
        specialPrice: product?.specialPrice,
        images: [] as File[]
    })

    console.log("Product ", product)

    async function handleSubmit(e: React.SubmitEvent) {
        e.preventDefault();


        if (product?.productName !== formData.productName ||
            product?.description !== formData.description ||
            product?.quantity !== formData.quantity ||
            product?.price !== formData.price ||
            product?.discount !== formData.discount ||
            product?.specialPrice !== formData.specialPrice) {
            const res = await updateProduct(product?.productId!, formData);
            if (!res.success) {
                toast.error(res.error);
                return;
            }
        }

        // 2. Delete removed images
        for (const imageId of removedImageIds) {
            const deleteRes = await deleteProductImage(product?.productId!, imageId);
            if (!deleteRes.success) {
                toast.error(deleteRes.error);
                return;
            }
        }

        if (formData.images.length > 0) {
            const uploadRes = await uploadProductImages(product?.productId!, formData.images);
            if (!uploadRes.success) {
                toast.error(uploadRes.error);
                return;
            }
        }

        toast.success("Product updated successfully");
        setIsEditing(false);
    }

    function uploadImage(images: FileList | null) {
        if (!images) return;
        const totalImages = formData.images.length + images.length;
        if (totalImages > 5) {
            toast.error("Maximum 5 images are allowed");
            return;
        }
        setFormData({ ...formData, images: [...formData.images, ...images] });
    }

    function removeImage(imageId: number) {
        if (!isEditing) return;
        setRemovedImageIds(prev => [...prev, imageId]);
    }

    function removeNewImage(index: number) {
        setFormData(prev => ({
            ...prev,
            images: prev.images.filter((_, i) => i !== index)
        }));
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
        <form onSubmit={handleSubmit} className="bg-white rounded-xl p-8 border border-gray-200 mx-auto mt-8 mb-12">
            <div className="flex justify-between items-center">
                <h1 className="text-2xl font-semibold mb-8 text-brand ">Edit Product</h1>
                <div className="flex gap-2">
                    {isEditing ? (
                        <>
                            <Button type="submit" className="bg-brand text-white cursor-pointer">Save</Button>
                            <button type="button" onClick={() => setIsEditing(false)} className="bg-gray-300 text-black hover:bg-gray-400 cursor-pointer px-3 py-1 rounded-lg text-sm font-medium">Cancel</button>
                        </>
                    ) : (
                        <button type="button" onClick={() => setIsEditing(true)} className="bg-brand text-white cursor-pointer px-3 py-1 rounded-lg text-sm font-medium">Edit</button>
                    )}
                </div>
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
                    <div className="space-y-2">
                        <Label>Product SpecialPrice :</Label>
                        <Input type="number" onChange={e => setFormData({ ...formData, specialPrice: e.target.value })} disabled={!isEditing} defaultValue={product?.specialPrice} />
                    </div>
                    <div className="space-y-2">
                        <Label>Product Images</Label>
                        <div className={`relative w-full  justify-center border-2 border-dashed ${isEditing ? "border-gray-300 " : "border-gray-200 bg-gray-50"} rounded-lg p-10 text-center text-gray-500`}>
                            <input onChange={(e) => uploadImage(e.target.files)} accept="image/*" type="file" className="absolute top-0 right-0 left-0 bottom-0 z-10 cursor-pointer w-full h-full opacity-0" disabled={!isEditing} multiple />
                            <div className="flex flex-col items-center gap-2 pointer-events-none">
                                <Upload className="w-8 h-8 text-gray-400" />
                                <p className="text-sm text-gray-500">Click to upload images</p>
                                <p className="text-xs text-gray-400">PNG, JPG, JPEG</p>
                            </div>
                        </div>
                        {/* add show images */}
                        <div className="flex gap-4 mt-2 ">
                            {product?.images?.filter((img: Product["images"][0]) => !removedImageIds.includes(img.id)).map((image: Product["images"][0]) => (
                                <div key={image.id} className={`relative ${isEditing ? "" : "cursor-not-allowed "}`}>
                                    {!isEditing &&
                                        <div className="bg-gray-200  top-0 right-0 left-0 bottom-0" />
                                    }
                                    <img src={image.url} alt="" className="w-20 h-20 object-cover rounded-md" />
                                    <button type="button" onClick={() => removeImage(image.id)} className="absolute top-0 right-0 cursor-pointer">
                                        <X className=" text-red-500 w-4" />
                                    </button>
                                </div>
                            ))}
                            {formData.images.map((image, index) => (
                                <div key={index} className="relative">
                                    <img src={URL.createObjectURL(image)} alt="" className="w-20 h-20 object-cover rounded-md" />
                                    <button type="button" onClick={() => removeNewImage(index)} className="absolute top-0 right-0 cursor-pointer">
                                        <X className=" text-red-500 w-4" />
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </form>
    </div>
}