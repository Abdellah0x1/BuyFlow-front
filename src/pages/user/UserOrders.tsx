import { ShoppingBag, Package, CreditCard, Calendar } from "lucide-react";
import { useUserOrders } from "@/hooks/useUserOrders";
import { Spinner } from "@/components/Common/Spinner";
import type { Order, OrderItem } from "@/api/order";

function getStatusStyle(status: string) {
    switch (status.toLowerCase()) {
        case "delivered":
            return "bg-emerald-100 text-emerald-700";
        case "shipped":
            return "bg-blue-100 text-blue-700";
        case "processing":
            return "bg-amber-100 text-amber-700";
        case "cancelled":
            return "bg-red-100 text-red-700";
        default:
            return "bg-slate-100 text-slate-700";
    }
}

export default function UserOrders() {
    const { data: orders, isLoading, error } = useUserOrders();

    if (isLoading) {
        return <Spinner />;
    }

    if (error) {
        return (
            <div className="text-red-500 border border-red-200 bg-red-50 p-2 rounded-md">
                {error.message}
            </div>
        );
    }

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
            {orders?.length === 0 && (
                <div className="flex flex-col items-center justify-center min-h-[40vh] text-center">
                    <div className="rounded-2xl bg-slate-100 p-5 mb-4">
                        <ShoppingBag className="h-12 w-12 text-slate-400" />
                    </div>
                    <h3 className="text-xl font-semibold text-slate-800">No orders yet</h3>
                    <p className="text-sm text-slate-500 mt-2 max-w-sm">
                        When you place your first order, it will appear here with all the details.
                    </p>
                </div>
            )}

            {/* Orders list */}
            {orders && orders.length > 0 && (
                <div className="flex flex-col gap-5">
                    {orders.map((order: Order) => (
                        <div
                            key={order.orderId}
                            className="border border-slate-200 rounded-xl overflow-hidden bg-white shadow-sm"
                        >
                            {/* Order header */}
                            <div className="flex flex-wrap items-center justify-between gap-3 px-5 py-4 bg-slate-50 border-b border-slate-200">
                                <div className="flex items-center gap-4">
                                    <div className="flex items-center gap-1.5 text-sm text-slate-600">
                                        <Package className="h-4 w-4" />
                                        <span className="font-semibold text-slate-800">
                                            #{order.orderId}
                                        </span>
                                    </div>
                                    <div className="flex items-center gap-1.5 text-sm text-slate-500">
                                        <Calendar className="h-3.5 w-3.5" />
                                        {new Date(order.orderDate).toLocaleDateString("en-US", {
                                            year: "numeric",
                                            month: "short",
                                            day: "numeric",
                                        })}
                                    </div>
                                </div>
                                <span
                                    className={`px-3 py-1 text-xs font-semibold rounded-full ${getStatusStyle(order.orderStatus)}`}
                                >
                                    {order.orderStatus}
                                </span>
                            </div>

                            {/* Order items */}
                            <div className="divide-y divide-slate-100">
                                {order.orderItems.map((item: OrderItem) => (
                                    <div
                                        key={item.orderItemId}
                                        className="flex items-center gap-4 px-5 py-4"
                                    >
                                        {/* Product image */}
                                        <div className="h-16 w-16 rounded-lg bg-slate-100 overflow-hidden flex-shrink-0">
                                            {item.product.images?.[0]?.url ? (
                                                <img
                                                    src={item.product.images[0].url}
                                                    alt={item.product.productName}
                                                    className="h-full w-full object-cover"
                                                />
                                            ) : (
                                                <div className="h-full w-full flex items-center justify-center">
                                                    <ShoppingBag className="h-6 w-6 text-slate-300" />
                                                </div>
                                            )}
                                        </div>

                                        {/* Product details */}
                                        <div className="flex-1 min-w-0">
                                            <p className="text-sm font-medium text-slate-800 truncate">
                                                {item.product.productName}
                                            </p>
                                            <p className="text-xs text-slate-500 mt-0.5">
                                                Qty: {item.quantity}
                                                {item.discount > 0 && (
                                                    <span className="ml-2 text-emerald-600 font-medium">
                                                        -{item.discount}% off
                                                    </span>
                                                )}
                                            </p>
                                        </div>

                                        {/* Price */}
                                        <p className="text-sm font-semibold text-slate-800">
                                            ${(item.orderedProductPrice * item.quantity).toFixed(2)}
                                        </p>
                                    </div>
                                ))}
                            </div>

                            {/* Order footer */}
                            <div className="flex flex-wrap items-center justify-between gap-3 px-5 py-3 bg-slate-50 border-t border-slate-200">
                                <div className="flex items-center gap-1.5 text-xs text-slate-500">
                                    <CreditCard className="h-3.5 w-3.5" />
                                    {order.payment?.provider ?? "N/A"}
                                    {order.payment?.status && (
                                        <span className="ml-1 capitalize">• {order.payment.status}</span>
                                    )}
                                </div>
                                <p className="text-sm font-bold text-slate-900">
                                    Total: ${order.totalAmount.toFixed(2)}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
