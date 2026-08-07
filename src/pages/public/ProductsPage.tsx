import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Link, useSearchParams } from "react-router"
import { Input } from "@/components/ui/input"
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
        const currentCategoryId = searchParams.get("category") || undefined;
        const page = searchParams.get("page") || "0";
        fetchProducts(Number(page), "productId", "desc", currentCategoryId);
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
        <div className="max-w-7xl mx-auto px-4 py-8 sm:px-10 w-full flex flex-col flex-grow">

            {/* Page Header / Breadcrumbs Area */}
            <div className="mb-8 border-b border-b-gray-100 pb-4 ">
                <h1 className="text-2xl font-semibold">{query ? `Search Results for "${query}"` : "All Products"}</h1>
                <p className="text-muted-foreground">Showing {products?.length} of {totalElements} Products</p>
            </div>

            <div className={`flex ${isMobile ? "flex-col" : "flex-row"} gap-8 w-full`}>
                <aside className={`border-r border-r-gray-100 ${isMobile ? "w-full" : "w-1/4 sticky top-18"} pr-10 overflow-y-scroll h-full`}>
                    <form onChange={handleChange}>
                        <div className="space-y-2">
                            <h2 className="text-lg font-semibold">Category</h2>
                            <RadioGroup name="category">
                                {
                                    categories?.map((category) => (
                                        <div key={category.categoryId} className="flex items-center gap-2">
                                            <RadioGroupItem value={category.categoryId} id={String(category.categoryId)} />
                                            <Label htmlFor={String(category.categoryId)}>{category.categoryName}</Label>
                                        </div>
                                    ))
                                }
                            </RadioGroup>
                        </div>
                        <div className="space-y-2 w-full mt-10">
                            <h2 className="text-lg font-semibold">Price Range</h2>
                            <Input type="range" min={0} max={1000} />
                        </div>
                    </form>

                </aside>

                <main className="w-3/4 mx-auto grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4  gap-10">
                    {isLoading ? <Spinner /> : (
                        products?.map((product) => (
                            <Link to={`/products/${product.productId}`} key={product.productId} className="col-span-1 flex flex-col  gap-4 min-w-[200px] overflow-hidden border transition-all duration-300 hover:border-brand rounded-md ">
                                <div className="h-52">
                                    <img src={product.images[0].url} alt={product.productName} className="w-full h-full object-cover" />
                                </div>
                                <div className="p-2">
                                    <h2 className="font-semibold ">{product.productName}</h2>
                                    <p className="text-muted-foreground line-clamp-2">{product.description.slice(0, 50)}</p>
                                    <span className="text-red-400 font-semibold">{product.price}$</span>
                                </div>
                            </Link>
                        ))
                    )}
                    <PaginationBar className="col-span-1 md:col-span-4" totalPages={totalPages} currentPage={pageNumber + 1} />
                </main>
            </div>
        </div>
    )
}