
import { AddProductModal } from "./AddProductModal";

export default function SellerProductsPage() {
    return <div>

        {/* header */}
        <div className="flex justify-between items-center">
            <div className="space-2">
                <h1 className="text-3xl font-bold">Products</h1>
                <p>
                    Manage all your products here
                </p>
            </div>
            <AddProductModal />
        </div>
    </div>
}