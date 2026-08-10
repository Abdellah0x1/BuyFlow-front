import { Spinner } from "@/components/Common/Spinner";
import { useSellerOrders } from "@/hooks/useSellerOrders";
import type { Order } from "@/types";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Package } from "lucide-react";

export default function SellerOrders() {
    const {
        data: orders,
        isLoading,
        isError
    } = useSellerOrders()

    if (isLoading) {
        return <div className="flex items-center justify-center min-h-[50vh]">
            <Spinner size={50} />
        </div>
    }

    if (isError) {
        return <div className="flex items-center justify-center min-h-[50vh] text-destructive">
            <p>Something went wrong, please try again later.</p>
        </div>
    }

    if (!orders || orders.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[50vh] text-muted-foreground p-8">
                <Package className="w-16 h-16 mb-4 text-muted-foreground/50" />
                <h3 className="text-xl font-semibold text-foreground">No orders yet</h3>
                <p className="text-sm mt-2">When customers place orders, they will appear here.</p>
            </div>
        )
    }

    return (
        <div className="p-6 max-w-7xl mx-auto space-y-6 animate-in fade-in duration-500">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">Orders</h1>
                    <p className="text-muted-foreground mt-1">
                        Manage your recent orders and track their status.
                    </p>
                </div>
            </div>

            <Card className="border-border/50 shadow-sm overflow-hidden">
                <CardHeader className="bg-muted/10 pb-4 border-b">
                    <CardTitle>Recent Orders</CardTitle>
                    <CardDescription>
                        You have {orders.length} total orders.
                    </CardDescription>
                </CardHeader>
                <CardContent className="p-0">
                    <Table>
                        <TableHeader>
                            <TableRow className="bg-muted/30 hover:bg-muted/30">
                                <TableHead className="pl-6 h-12">Order ID</TableHead>
                                <TableHead>Customer</TableHead>
                                <TableHead>Date</TableHead>
                                <TableHead>Items</TableHead>
                                <TableHead>Amount</TableHead>
                                <TableHead className="pr-6">Status</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {orders.map((order: Order) => {
                                const totalItems = order.orderItems?.reduce((acc, item) => acc + item.quantity, 0) || 0;
                                const formattedDate = new Date(order.orderDate).toLocaleDateString(undefined, {
                                    year: 'numeric',
                                    month: 'short',
                                    day: 'numeric',
                                    hour: '2-digit',
                                    minute: '2-digit'
                                });

                                const getStatusColor = (status: string) => {
                                    const s = status?.toLowerCase() || '';
                                    if (s === 'succeeded' || s === 'completed' || s === 'paid') return 'default';
                                    if (s === 'failed' || s === 'cancelled') return 'destructive';
                                    return 'secondary';
                                };

                                return (
                                    <TableRow key={order.orderId} className="hover:bg-muted/10 transition-colors">
                                        <TableCell className="font-medium pl-6">
                                            #{order.orderId.toString().padStart(4, '0')}
                                        </TableCell>
                                        <TableCell>
                                            <div className="flex flex-col">
                                                <span className="font-medium text-foreground">{order.email.split('@')[0]}</span>
                                                <span className="text-xs text-muted-foreground">{order.email}</span>
                                            </div>
                                        </TableCell>
                                        <TableCell className="text-muted-foreground">{formattedDate}</TableCell>
                                        <TableCell>{totalItems} items</TableCell>
                                        <TableCell className="font-medium">
                                            ${order.payment?.amount?.toFixed(2) || '0.00'}
                                        </TableCell>
                                        <TableCell className="pr-6">
                                            <Badge variant={getStatusColor(order.payment?.status)}>
                                                {order.payment?.status || 'Pending'}
                                            </Badge>
                                        </TableCell>
                                    </TableRow>
                                );
                            })}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>
        </div>
    );
}