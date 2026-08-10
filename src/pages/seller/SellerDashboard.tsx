import { useEffect, useMemo } from "react";
import { useSellerOrders } from "@/hooks/useSellerOrders";
import { useSellerStore } from "@/store/seller";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { DollarSign, ShoppingBag, Package, TrendingUp } from "lucide-react";
import { Spinner } from "@/components/Common/Spinner";
import { Area, AreaChart, CartesianGrid, XAxis, YAxis, PieChart, Pie, Cell } from "recharts";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import type { Order } from "@/types";

export default function SellerDashboard() {
    const { data: orders = [], isLoading: ordersLoading } = useSellerOrders();
    const { fetchSellerProducts, products, isLoading: productsLoading } = useSellerStore();

    useEffect(() => {
        fetchSellerProducts();
    }, [fetchSellerProducts]);

    const isLoading = ordersLoading || productsLoading;

    // Derived Statistics
    const { totalRevenue, totalOrders, aov } = useMemo(() => {
        let revenue = 0;

        orders.forEach((order: Order) => {
            if (order.payment?.status?.toLowerCase() === 'succeeded' || order.payment?.status?.toLowerCase() === 'paid') {
                revenue += order.payment.amount;
            }
        });

        return {
            totalRevenue: revenue,
            totalOrders: orders.length,
            aov: orders.length > 0 ? revenue / orders.length : 0,
        };
    }, [orders]);

    // Chart Data for Revenue Over Time
    const revenueData = useMemo(() => {
        const dataMap = new Map<string, number>();

        // Let's create a map of dates to revenue
        [...orders].sort((a, b) => new Date(a.orderDate).getTime() - new Date(b.orderDate).getTime()).forEach(order => {
            const dateStr = new Date(order.orderDate).toLocaleDateString(undefined, { month: 'short', day: 'numeric' });
            const amount = (order.payment?.status?.toLowerCase() === 'succeeded' || order.payment?.status?.toLowerCase() === 'paid')
                ? order.payment.amount
                : 0;

            dataMap.set(dateStr, (dataMap.get(dateStr) || 0) + amount);
        });

        return Array.from(dataMap.entries()).map(([date, amount]) => ({
            date,
            revenue: amount
        }));
    }, [orders]);

    const chartConfig = {
        revenue: {
            label: "Revenue",
            color: "var(--color-brand, #4f46e5)",
        },
    };

    // Chart Data for Payment Status
    const paymentStatusData = useMemo(() => {
        let succeeded = 0;
        let pending = 0;
        let failed = 0;

        orders.forEach((order: Order) => {
            const status = order.payment?.status?.toLowerCase() || '';
            if (status === 'succeeded' || status === 'paid') succeeded++;
            else if (status === 'failed' || status === 'cancelled') failed++;
            else pending++;
        });

        return [
            { name: 'Completed', value: succeeded, color: '#10b981' },
            { name: 'Pending', value: pending, color: '#f59e0b' },
            { name: 'Failed', value: failed, color: '#ef4444' },
        ].filter(item => item.value > 0);
    }, [orders]);

    const pieChartConfig = {
        completed: { label: "Completed", color: "#10b981" },
        pending: { label: "Pending", color: "#f59e0b" },
        failed: { label: "Failed", color: "#ef4444" }
    };

    if (isLoading) {
        return <div className="flex items-center justify-center min-h-[60vh]">
            <Spinner size={50} />
        </div>
    }

    return (
        <div className="p-6 max-w-7xl mx-auto space-y-8 animate-in fade-in duration-500">
            <div>
                <h1 className="text-3xl font-bold tracking-tight text-slate-900">Dashboard</h1>
                <p className="text-muted-foreground mt-1">
                    Here's a quick overview of how your store is doing.
                </p>
            </div>

            {/* KPI Cards */}
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
                        <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
                        <DollarSign className="w-4 h-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">${totalRevenue.toFixed(2)}</div>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
                        <CardTitle className="text-sm font-medium">Orders</CardTitle>
                        <ShoppingBag className="w-4 h-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{totalOrders}</div>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
                        <CardTitle className="text-sm font-medium">Avg Order Value</CardTitle>
                        <TrendingUp className="w-4 h-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">${aov.toFixed(2)}</div>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
                        <CardTitle className="text-sm font-medium">Products in Store</CardTitle>
                        <Package className="w-4 h-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{products?.length || 0}</div>
                    </CardContent>
                </Card>
            </div>

            {/* Charts Section */}
            <div className="grid gap-4 md:grid-cols-7">
                <Card className="md:col-span-4">
                    <CardHeader>
                        <CardTitle>Revenue Overview</CardTitle>
                        <CardDescription>Your revenue over time.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        {revenueData.length > 0 ? (
                            <ChartContainer config={chartConfig} className="h-[300px] w-full">
                                <AreaChart data={revenueData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                                    <defs>
                                        <linearGradient id="fillRevenue" x1="0" y1="0" x2="0" y2="1">
                                            <stop offset="5%" stopColor="var(--color-revenue)" stopOpacity={0.8} />
                                            <stop offset="95%" stopColor="var(--color-revenue)" stopOpacity={0.1} />
                                        </linearGradient>
                                    </defs>
                                    <CartesianGrid vertical={false} strokeDasharray="3 3" />
                                    <XAxis
                                        dataKey="date"
                                        tickLine={false}
                                        axisLine={false}
                                        tickMargin={8}
                                    />
                                    <YAxis
                                        tickLine={false}
                                        axisLine={false}
                                        tickFormatter={(value) => `$${value}`}
                                    />
                                    <ChartTooltip content={<ChartTooltipContent />} />
                                    <Area
                                        type="monotone"
                                        dataKey="revenue"
                                        stroke="var(--color-revenue)"
                                        fillOpacity={1}
                                        fill="url(#fillRevenue)"
                                    />
                                </AreaChart>
                            </ChartContainer>
                        ) : (
                            <div className="h-[300px] flex items-center justify-center text-muted-foreground bg-muted/20 rounded-xl">
                                No revenue data available yet.
                            </div>
                        )}
                    </CardContent>
                </Card>

                <Card className="md:col-span-3">
                    <CardHeader>
                        <CardTitle>Payment Status</CardTitle>
                        <CardDescription>Breakdown of your recent orders.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        {paymentStatusData.length > 0 ? (
                            <ChartContainer config={pieChartConfig} className="h-[300px] w-full">
                                <PieChart>
                                    <ChartTooltip content={<ChartTooltipContent hideLabel />} />
                                    <Pie
                                        data={paymentStatusData}
                                        dataKey="value"
                                        nameKey="name"
                                        cx="50%"
                                        cy="50%"
                                        innerRadius={60}
                                        outerRadius={80}
                                        stroke="none"
                                        paddingAngle={2}
                                    >
                                        {paymentStatusData.map((entry, index) => (
                                            <Cell key={`cell-${index}`} fill={entry.color} />
                                        ))}
                                    </Pie>
                                </PieChart>
                            </ChartContainer>
                        ) : (
                            <div className="h-[300px] flex items-center justify-center text-muted-foreground bg-muted/20 rounded-xl">
                                No orders yet.
                            </div>
                        )}
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}