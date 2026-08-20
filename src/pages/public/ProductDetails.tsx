import { ArrowLeft } from "lucide-react"
import { Link, useParams } from "react-router"
import { getProductById } from "@/api/products";
import { useEffect, useState } from "react";
import { type Product } from "@/types";
import { Spinner } from "@/components/Common/Spinner";
import { Button } from "@/components/ui/button";
import { useCartStore } from "@/store/cardStore";
import { ProductGallery } from "@/components/products/ProductGallery";

export default function ProductDetails() {
    const { id } = useParams();
    const [isLoading, setIsLoading] = useState(false);
    const [product, setProduct] = useState<Product | null>(null);
    const [quantity, setQuantity] = useState(1);

    const [error, setError] = useState<string | null>(null);
    const addToCart = useCartStore(state => state.addToCart);

    useEffect(() => {
        const fetchProduct = async () => {
            setIsLoading(true);
            const res = await getProductById(id!);
            if (res.success) {
                setProduct(res.data);
            } else {
                setError(res.error || "Product not found");
            }
            setIsLoading(false);
        }
        fetchProduct();
    }, [id]);



    return (
        <div className="max-w-7xl mx-auto flex-grow px-4 py-8 w-full">
            <Link to="/products" className="text-muted-foreground hover:text-brand flex gap-2">
                <ArrowLeft /> Back to Products
            </Link>

            {isLoading ? <div className="flex items-center justify-center"><Spinner /></div> :
                error ? <div className="mt-10 rounded-md border border-red-200 bg-red-50 p-4 text-red-600">{error}</div> :
                    <div className="flex flex-col gap-10 mt-10 md:flex-row">
                        <div className="md:w-1/2 max-h-[500px] overflow-hidden">
                            <ProductGallery images={product?.images.map(image => ({ src: image.url })) || []} />
                        </div>
                        <div className="md:w-1/2">
                            <h1 className="text-2xl font-semibold">
                                {product?.productName}
                            </h1>
                            <p className="mt-10 text-muted-foreground">
                                {product?.description}
                            </p>
                            <div className="flex items-center gap-2 mt-10">
                                <button onClick={() => setQuantity(quantity + 1)} className="p-1 px-2 rounded-md bg-gray-100 cursor-pointer">+</button>
                                <span>{quantity}</span>
                                <button onClick={() => setQuantity((quantity - 1) > 1 ? quantity - 1 : 1)} className="p-1 px-2 rounded-md bg-gray-100 cursor-pointer">-</button>
                            </div>
                            <Button onClick={() => addToCart(String(id), quantity)} className="rounded-full mt-10 w-24 cursor-pointer bg-brand transition-all duration-300 hover:bg-brand-dark">Add To Cart</Button>

                        </div>

                    </div>
            }

        </div>
    )
}
