import { ArrowLeft } from "lucide-react"
import { Link, useParams } from "react-router"
import { getProductById } from "@/api/products";
import { useEffect, useState } from "react";
import { type Product } from "@/types";
import { Spinner } from "@/components/Common/Spinner";
import { Button } from "@/components/ui/button";
import { addProductCart } from "@/api/cart";

export default function ProductDetails() {
    const { id } = useParams();
    const [isLoading, setIsLoading] = useState(false);
    const [product, setProduct] = useState<Product | null>(null);
    const [quantity, setQuantity] = useState(1);

    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchProduct = async () => {
            setIsLoading(true);
            const res = await getProductById(id!);
            if (res.success) {
                setProduct(res.data);
            } else {
                setError(res.error);
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
                <div className="flex flex-col gap-10 mt-10 md:flex-row">
                    <div className="md:w-1/3">
                        <img src={product?.images[0].url} alt={product?.productName} className="rounded-md object-cover" />
                    </div>
                    <div className="md:w-2/3">
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
                        <Button onClick={() => addProductCart(String(id), quantity)} className="rounded-full mt-10 w-24 cursor-pointer bg-brand transition-all duration-300 hover:bg-brand-dark">Add To Cart</Button>
                    </div>

                </div>
            }

        </div>
    )
}