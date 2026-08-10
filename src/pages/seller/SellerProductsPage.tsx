import { useEffect } from "react";
import { AddProductModal } from "../../components/seller/AddProductModal";
import { useSellerStore } from "@/store/seller";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Edit, Trash, Search } from "lucide-react";
import { Input } from "@/components/ui/input";

export default function SellerProductsPage() {
    const { products, isLoading, fetchSellerProducts } = useSellerStore();

    useEffect(() => {
        fetchSellerProducts();
    }, [fetchSellerProducts]);

    return (
        <div className="flex flex-col gap-8 w-full">
            {/* Header */}
            <div className="flex justify-between items-start md:items-center flex-col md:flex-row gap-4">
                <div className="space-y-1">
                    <h1 className="text-3xl font-bold tracking-tight text-slate-900">Products</h1>
                    <p className="text-slate-500">
                        Manage your store's inventory, pricing, and details.
                    </p>
                </div>
                <AddProductModal />
            </div>

            {/* Toolbar */}
            <div className="flex items-center justify-between bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
                <div className="relative w-full max-w-sm">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                    <Input
                        type="search"
                        placeholder="Search products..."
                        className="pl-9 w-full bg-slate-50/50 border-slate-200 focus-visible:ring-brand"
                    />
                </div>
            </div>

            {/* Table */}
            <div className="rounded-xl border border-slate-200 bg-white shadow-sm overflow-hidden">
                <Table>
                    <TableHeader className="bg-slate-50/80">
                        <TableRow className="hover:bg-transparent">
                            <TableHead className="w-[300px] font-semibold text-slate-600">Product</TableHead>
                            <TableHead className="font-semibold text-slate-600">Price</TableHead>
                            <TableHead className="font-semibold text-slate-600">Stock</TableHead>
                            <TableHead className="font-semibold text-slate-600">Status</TableHead>
                            <TableHead className="text-right font-semibold text-slate-600">Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {isLoading ? (
                            <TableRow>
                                <TableCell colSpan={5} className="h-24 text-center">
                                    Loading products...
                                </TableCell>
                            </TableRow>
                        ) : products.length === 0 ? (
                            <TableRow>
                                <TableCell colSpan={5} className="h-24 text-center text-muted-foreground">
                                    No products found. Add your first product!
                                </TableCell>
                            </TableRow>
                        ) : (
                            products.map((product) => (
                                <TableRow key={product.productId}>
                                    <TableCell>
                                        <div className="flex items-center gap-3">
                                            <div className="h-10 w-10 shrink-0 overflow-hidden rounded-md border bg-gray-100">
                                                {product.images && product.images[0] ? (
                                                    <img src={product.images[0].url} alt={product.productName} className="h-full w-full object-cover" />
                                                ) : (
                                                    <div className="h-full w-full bg-muted" />
                                                )}
                                            </div>
                                            <div className="flex flex-col">
                                                <span className="font-medium">{product.productName}</span>
                                                <span className="text-xs text-muted-foreground truncate w-[200px]">
                                                    {product.description}
                                                </span>
                                            </div>
                                        </div>
                                    </TableCell>
                                    <TableCell>
                                        <div className="flex flex-col">
                                            <span className="font-medium">${product.price.toFixed(2)}</span>
                                            {product.discount > 0 && (
                                                <span className="text-xs text-green-600">{product.discount}% OFF</span>
                                            )}
                                        </div>
                                    </TableCell>
                                    <TableCell>
                                        {product.quantity > 0 ? (
                                            <span className="text-sm font-medium">{product.quantity} in stock</span>
                                        ) : (
                                            <span className="text-sm font-medium text-destructive">Out of stock</span>
                                        )}
                                    </TableCell>
                                    <TableCell>
                                        <Badge variant={product.quantity > 0 ? "default" : "destructive"}>
                                            {product.quantity > 0 ? "Active" : "Hidden"}
                                        </Badge>
                                    </TableCell>
                                    <TableCell className="text-right">
                                        <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-blue-600">
                                            <Edit className="h-4 w-4" />
                                        </Button>
                                        <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-destructive">
                                            <Trash className="h-4 w-4" />
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            ))
                        )}
                    </TableBody>
                </Table>
            </div>
        </div>
    );
}