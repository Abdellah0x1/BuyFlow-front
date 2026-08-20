import { ShoppingBag } from "lucide-react";

export default function UserOrders() {
    return (
        <div className="space-y-6">
            {/* Header */}
            <div>
                <h2 className="text-xl font-bold text-slate-900 tracking-tight">My Orders</h2>
                <p className="text-sm text-slate-500 mt-1">
                    Your order history will appear here
                </p>
            </div>

            <div className="h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent" />

            {/* Empty state */}
            <div className="flex flex-col items-center justify-center min-h-[40vh] text-center">
                <div className="rounded-2xl bg-slate-100 p-5 mb-4">
                    <ShoppingBag className="h-12 w-12 text-slate-400" />
                </div>
                <h3 className="text-xl font-semibold text-slate-800">No orders yet</h3>
                <p className="text-sm text-slate-500 mt-2 max-w-sm">
                    When you place your first order, it will appear here with all the details.
                </p>
            </div>
        </div>
    );
}
