import { Plus, X } from "lucide-react"
import { Dialog } from "radix-ui"
import { Input } from "../ui/input"
import { Label } from "../ui/label"
import { Button } from "../ui/button"
import { ImageUploader } from "../Common/ImageUploader"
import { useState } from "react"


export function AddProductModal() {

    const [images, setImages] = useState<File[]>([])
    const [formData, setFormData] = useState({
        name: "",
        description: "",
        price: "",
    })

    return <Dialog.Root>
        <Dialog.Trigger className="flex gap-2 bg-brand text-white items-center px-2 py-2 rounded-md cursor-pointer">
            <Plus className="w-4 h-4" />
            Add product
        </Dialog.Trigger>
        <Dialog.Portal >
            <Dialog.Overlay className="fixed inset-0 bg-black/50" />
            <Dialog.Content className=" min-w-sm p-6 rounded-md bg-white fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                <Dialog.Title className="font-bold text-center">Add Product</Dialog.Title>
                <Dialog.Description className="text-sm text-muted-foreground">Add a new product to your store.</Dialog.Description>

                <form className="mt-4 space-y-4">

                    <div className="space-y-2">
                        <Label htmlFor="name">Product Name</Label>
                        <Input value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} required id="name" placeholder="Product Name" className="border" />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="description">Product Description</Label>
                        <Input value={formData.description} onChange={(e) => setFormData({ ...formData, description: e.target.value })} required id="description" placeholder="Product Description" className="border" />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="price">Product Price</Label>
                        <Input value={formData.price} onChange={(e) => setFormData({ ...formData, price: e.target.value })} required type="number" min={1} id="price" placeholder="Product Price" className="border" />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="images">Product Images</Label>
                        <ImageUploader accept="/images" maxFiles={4} onChange={(files: File[]) => setImages(files)} files={images} />
                    </div>
                    <Button type="submit" className="w-full bg-brand">Save</Button>
                </form>

                <Dialog.Close className="absolute top-4 right-4 cursor-pinter ">
                    <X className="w-4 h-4" />
                </Dialog.Close>
            </Dialog.Content>
        </Dialog.Portal>
    </Dialog.Root>
}