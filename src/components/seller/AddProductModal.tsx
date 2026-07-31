import { Plus, X } from "lucide-react"
import { Dialog } from "radix-ui"
import { Input } from "../ui/input"
import { Label } from "../ui/label"
import { Button } from "../ui/button"
import { ImageUploader } from "../Common/ImageUploader"
import { useEffect, useState } from "react"
import { Spinner } from "../Common/Spinner"
import { Alert } from "../ui/alert"
import { useCategoryStore } from "@/store/categoryStore"
import { createProduct } from "@/api/products"
import { toast } from "sonner"


export function AddProductModal() {

    const [open, setOpen] = useState<boolean>(false);
    const [images, setImages] = useState<File[]>([])
    const [formData, setFormData] = useState({
        productName: "",
        description: "",
        price: 1,
        quantity: 1,
        discount: 0,
    })
    const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
    const [error, setError] = useState<string>("");

    const categories = useCategoryStore(state => state.categories);
    const [categoryId, setCategoryId] = useState<number>();
    const fetchCategories = useCategoryStore(state => state.fetchCategories);

    useEffect(() => {
        fetchCategories();
    }, [fetchCategories])


    async function handleSave(e: React.SubmitEvent) {
        e.preventDefault();
        setIsSubmitting(true);

        if (!formData.productName || !formData.description || !formData.price) {
            setError("All fields are required");
            setIsSubmitting(false);
            return;
        }

        if (formData.productName.length < 3) {
            setError("Product name must be at least 3 characters long");
            setIsSubmitting(false);
            return;
        }

        if (formData.description.length < 10) {
            setError("Product description must be at least 10 characters long");
            setIsSubmitting(false);
            return;
        }

        if (formData.price < 1) {
            setError("Product price must be at least 1");
            setIsSubmitting(false);
            return;
        }

        if (formData.quantity < 1) {
            setError("Product quantity must be at least 1");
            setIsSubmitting(false);
            return;
        }

        if (formData.discount < 0 || formData.discount > 100) {
            setError("Product discount must be between 0 and 100");
            setIsSubmitting(false);
            return;
        }

        if (images.length < 0) {
            setError("Product images are required");
            setIsSubmitting(false);
            return;
        }

        try {
            const res = await createProduct(categoryId!, formData, images);
            if (res.success) {
                toast.success("Product created successfully")
                setOpen(false);
                setImages([])
                setError("")
                setFormData({
                    productName: "",
                    description: "",
                    price: 1,
                    quantity: 1,
                    discount: 0,
                })
            } else if (res.error) {
                toast.error(res.error)
            }
        } catch (error) {
            toast.error("Something went wrong")
        } finally {
            setIsSubmitting(false);
        }
    }

    return <Dialog.Root open={open} onOpenChange={setOpen}>
        <Dialog.Trigger className="flex gap-2 bg-brand text-white items-center px-2 py-2 rounded-md cursor-pointer">
            <Plus className="w-4 h-4" />
            Add product
        </Dialog.Trigger>
        <Dialog.Portal >
            <Dialog.Overlay className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0" />
            <Dialog.Content className="fixed left-[50%] top-[50%] z-50 w-full max-w-md max-h-[90vh] overflow-y-auto translate-x-[-50%] translate-y-[-50%] p-6 rounded-xl bg-white shadow-2xl border duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95">
                <Dialog.Title className="text-xl font-bold text-center">Add Product</Dialog.Title>
                <Dialog.Description className="text-sm text-center text-muted-foreground mt-1">Add a new product to your store.</Dialog.Description>

                <form className="mt-4 space-y-4" onSubmit={handleSave}>
                    {error && <Alert className="border-red-500 bg-red-50 text-red-700">{error}</Alert>}

                    <div className="space-y-2">
                        <Label htmlFor="name">Product Name</Label>
                        <Input value={formData.productName} onChange={(e) => setFormData({ ...formData, productName: e.target.value })} required id="name" placeholder="Product Name" className="border" />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="description">Product Description</Label>
                        <Input value={formData.description} onChange={(e) => setFormData({ ...formData, description: e.target.value })} required id="description" placeholder="Product Description" className="border" />
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="category">Product Category</Label>
                        <select value={categoryId || ""} required onChange={(e) => setCategoryId(Number(e.target.value))} className="border p-2 w-full rounded-md">
                            <option value={""} disabled>Select Category</option>
                            {categories.map(category => (
                                <option key={category.categoryId} value={String(category.categoryId)}>{category.categoryName}</option>
                            ))}
                        </select>
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="price">Product Price</Label>
                        <Input min={1} value={formData.price} onChange={(e) => setFormData({ ...formData, price: Number(e.target.value) })} required type="number" id="price" placeholder="Product Price" className="border" />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="quantity">Product Quantity</Label>
                        <Input min={1} value={formData.quantity} onChange={(e) => setFormData({ ...formData, quantity: Number(e.target.value) })} required type="number" id="quantity" placeholder="Product Quantity" className="border" />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="discount">Product Discount (%)</Label>
                        <Input min={0} max={100} value={formData.discount} onChange={(e) => setFormData({ ...formData, discount: Number(e.target.value) })} required type="number" id="discount" placeholder="Product Discount" className="border" />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="images">Product Images</Label>
                        <ImageUploader accept="/images" maxFiles={4} onChange={(files: File[]) => setImages(files)} files={images} />
                    </div>
                    <Button type="submit" disabled={isSubmitting} className="w-full bg-brand">
                        {isSubmitting ? <Spinner /> : "Save"}
                    </Button>
                </form>
                <Dialog.Close className="absolute top-4 right-4 cursor-pinter ">
                    <X className="w-4 h-4" />
                </Dialog.Close>
            </Dialog.Content>
        </Dialog.Portal>
    </Dialog.Root>
}