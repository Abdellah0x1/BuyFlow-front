import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Link, useSearchParams } from "react-router"
import { useCategoryStore } from "@/store/categoryStore"
import { useEffect } from "react"
import { Spinner } from "@/components/Common/Spinner"
import { useProductsStore } from "@/store/products"
import { useIsMobile } from "@/hooks/use-mobile"
import { PaginationBar } from "@/components/Common/PaginatinBar"

export default function ProductsPage() {
    const [searchParams, setSearchParams] = useSearchParams()
    const query = searchParams.get("q")
    const { categories, fetchCategories } = useCategoryStore();
    const { products, isLoading, totalElements, fetchProducts, totalPages, pageNumber } = useProductsStore();
    const isMobile = useIsMobile();



    useEffect(() => {
        fetchCategories();
    }, [fetchCategories]);

    useEffect(() => {
        const currentCategoryId = searchParams.get("category") || "all";
        const page = searchParams.get("page") || "0";
        fetchProducts(Number(page), "productId", "desc", currentCategoryId === "all" ? undefined : currentCategoryId);
    }, [fetchProducts, searchParams]);

    function handleChange(e: React.ChangeEvent<HTMLFormElement>) {
        const newParams = new URLSearchParams(searchParams);

        const target = e.target as HTMLFormElement;

        if (target.name === "category") {
            newParams.set("category", target.value);
        }

        setSearchParams(newParams);
    }

    return (
        <div className="max-w-[1440px] mx-auto px-6 py-[48px] sm:px-10 w-full flex flex-col flex-grow">

            {/* Page Header */}
            <div className="mb-10 pb-5 border-b border-divider-soft">
                <h1 className="text-display-lg text-ink">{query ? `Search Results for "${query}"` : "All Products"}</h1>
                <p className="text-body-apple text-ink-muted-48 mt-2">Showing {products?.length} of {totalElements} Products</p>
            </div>

            <div className={`flex ${isMobile ? "flex-col" : "flex-row"} gap-10 w-full`}>
                {/* Sidebar */}
                <aside className={`${isMobile ? "w-full" : "w-[220px] sticky top-14 self-start"} shrink-0`}>
                    <div className="rounded-[18px] border border-hairline bg-canvas p-6">
                        <form onChange={handleChange}>
                            <div className="space-y-3">
                                <h2 className="text-body-strong text-ink mb-4">Category</h2>
                                <RadioGroup name="category">
                                    <div className="flex items-center gap-2">
                                        <RadioGroupItem value="all" id="all" />
                                        <Label htmlFor="all" className="text-body-apple text-ink-muted-80">All</Label>
                                    </div>
                                    {
                                        categories?.map((category) => (
                                            <div key={category.categoryId} className="flex items-center gap-2">
                                                <RadioGroupItem value={category.categoryId} id={String(category.categoryId)} />
                                                <Label htmlFor={String(category.categoryId)} className="text-body-apple text-ink-muted-80">{category.categoryName}</Label>
                                            </div>
                                        ))
                                    }
                                </RadioGroup>
                            </div>
                        </form>
                    </div>
                </aside>

                {/* Product Grid */}
                <main className="flex-1 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
                    {isLoading ? (
                        <div className="col-span-full flex items-center justify-center py-20">
                            <Spinner />
                        </div>
                    ) : (
                        products?.map((product) => (
                            <Link
                                to={`/products/${product.productId}`}
                                key={product.productId}
                                className="group flex flex-col rounded-[18px] border border-hairline bg-canvas overflow-hidden hover:border-brand/40 transition-all duration-200 active-scale"
                            >
                                {/* Product Image */}
                                <div className="aspect-square bg-canvas-parchment overflow-hidden">
                                    <img
                                        src={product.images[0].url}
                                        alt={product.productName}
                                        className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-300"
                                    />
                                </div>
                                {/* Product Info */}
                                <div className="p-5">
                                    <h2 className="text-body-strong text-ink line-clamp-1">{product.productName}</h2>
                                    <p className="text-caption-apple text-ink-muted-48 line-clamp-2 mt-1">{product.description.slice(0, 60)}</p>
                                    <span className="text-body-apple text-brand font-semibold mt-2 block">${product.price}</span>
                                </div>
                            </Link>
                        ))
                    )}
                    <PaginationBar className="col-span-full mt-8" totalPages={totalPages} currentPage={pageNumber + 1} />
                </main>
            </div>
        </div>
    )
}