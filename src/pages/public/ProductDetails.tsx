import { ArrowLeft, Minus, Plus } from "lucide-react"
import { Link, useParams } from "react-router"
import { getProductById } from "@/api/products";
import { useEffect, useState } from "react";
import { type Product } from "@/types";
import { Spinner } from "@/components/Common/Spinner";
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
        <div className="max-w-[980px] mx-auto flex-grow px-6 py-[48px] w-full">
            <Link to="/products" className="text-body-apple text-brand hover:text-brand-light flex items-center gap-2 transition-colors">
                <ArrowLeft size={18} /> Back to Products
            </Link>

            {isLoading ? <div className="flex items-center justify-center py-20"><Spinner /></div> :
                error ? <div className="mt-10 rounded-[11px] border border-hairline bg-canvas-parchment p-5 text-ink-muted-80 text-body-apple">{error}</div> :
                    <div className="flex flex-col gap-12 mt-10 md:flex-row">
                        {/* Gallery */}
                        <div className="md:w-1/2 max-h-[520px] overflow-hidden">
                            <ProductGallery images={product?.images.map(image => ({ src: image.url })) || []} />
                        </div>

                        {/* Product Info */}
                        <div className="md:w-1/2">
                            <h1 className="text-display-lg text-ink">
                                {product?.productName}
                            </h1>

                            <p className="text-lead text-brand mt-4">
                                ${product?.price}
                            </p>

                            <p className="mt-6 text-body-apple text-ink-muted-80 leading-relaxed">
                                {product?.description}
                            </p>

                            {/* Quantity Selector */}
                            <div className="flex items-center gap-0 mt-8 border border-hairline rounded-full w-fit overflow-hidden">
                                <button
                                    onClick={() => setQuantity((quantity - 1) > 1 ? quantity - 1 : 1)}
                                    className="p-3 px-4 text-ink-muted-48 hover:text-ink hover:bg-canvas-parchment transition-colors active-scale"
                                >
                                    <Minus size={16} />
                                </button>
                                <span className="px-5 text-body-strong text-ink">{quantity}</span>
                                <button
                                    onClick={() => setQuantity(quantity + 1)}
                                    className="p-3 px-4 text-ink-muted-48 hover:text-ink hover:bg-canvas-parchment transition-colors active-scale"
                                >
                                    <Plus size={16} />
                                </button>
                            </div>

                            {/* Add to Cart */}
                            <button
                                onClick={() => addToCart(String(id), quantity)}
                                className="mt-8 bg-brand hover:bg-brand-light text-white text-body-apple rounded-full px-8 py-3 transition-all duration-200 active-scale"
                            >
                                Add to Cart
                            </button>
                        </div>
                    </div>
            }
        </div>
    )
}
