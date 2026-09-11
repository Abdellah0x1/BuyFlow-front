import { useEffect, useMemo, useState } from "react";
import { useSellerOrders } from "@/hooks/useSellerOrders";
import { useSellerStore } from "@/store/seller";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { DollarSign, ShoppingBag, TrendingUp, PackageCheck, ArrowUpRight, ArrowDownRight } from "lucide-react";
import { Spinner } from "@/components/Common/Spinner";
import {
    Bar, BarChart, CartesianGrid, XAxis, YAxis,
    Cell,
} from "recharts";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import type { Order, Product } from "@/types";

type TimePeriod = "7d" | "30d" | "90d" | "all";

const PERIOD_LABELS: Record<TimePeriod, string> = {
    "7d": "Last 7 days",
    "30d": "Last 30 days",
    "90d": "Last 90 days",
    "all": "All time",
};

const PERIOD_DAYS: Record<TimePeriod, number> = {
    "7d": 7,
    "30d": 30,
    "90d": 90,
    "all": Infinity,
};

function filterOrdersByPeriod(orders: Order[], period: TimePeriod): Order[] {
    if (period === "all") return orders;
    const now = new Date();
    const cutoff = new Date(now.getTime() - PERIOD_DAYS[period] * 24 * 60 * 60 * 1000);
    return orders.filter(order => new Date(order.orderDate) >= cutoff);
}

function isPaid(order: Order): boolean {
    const status = order.payment?.status?.toLowerCase() || "";
    return status === "succeeded" || status === "paid" || status === "completed";
}

export default function SellerAnalytics() {
    const { data: allOrders = [], isLoading: ordersLoading } = useSellerOrders();
    const { fetchSellerProducts, products, isLoading: productsLoading } = useSellerStore();
    const [period, setPeriod] = useState<TimePeriod>("30d");

    useEffect(() => {
        fetchSellerProducts();
    }, [fetchSellerProducts]);

    const isLoading = ordersLoading || productsLoading;

    const orders: Order[] = useMemo(() => filterOrdersByPeriod(allOrders, period), [allOrders, period]);

    // Previous period orders for comparison
    const previousOrders = useMemo(() => {
        if (period === "all") return [];
        const now = new Date();
        const days = PERIOD_DAYS[period];
        const cutoffCurrent = new Date(now.getTime() - days * 24 * 60 * 60 * 1000);
        const cutoffPrevious = new Date(now.getTime() - days * 2 * 24 * 60 * 60 * 1000);
        return allOrders.filter((order: Order) => {
            const date = new Date(order.orderDate);
            return date >= cutoffPrevious && date < cutoffCurrent;
        });
    }, [allOrders, period]);

    // KPI Stats
    const stats = useMemo(() => {
        const revenue = orders.filter(isPaid).reduce((sum: number, o: Order) => sum + (o.payment?.amount || 0), 0);
        const prevRevenue = previousOrders.filter(isPaid).reduce((sum: number, o: Order) => sum + (o.payment?.amount || 0), 0);

        const totalOrders = orders.length;
        const prevTotalOrders = previousOrders.length;

        const aov = totalOrders > 0 ? revenue / totalOrders : 0;
        const prevAov = prevTotalOrders > 0 ? prevRevenue / prevTotalOrders : 0;

        const unitsSold = orders.reduce((sum: number, o: Order) =>
            sum + (o.orderItems?.reduce((s: number, item: Order["orderItems"][0]) => s + item.quantity, 0) || 0), 0);
        const prevUnitsSold = previousOrders.reduce((sum: number, o: Order) =>
            sum + (o.orderItems?.reduce((s: number, item: Order["orderItems"][0]) => s + item.quantity, 0) || 0), 0);

        function pctChange(current: number, prev: number): number | null {
            if (prev === 0) return current > 0 ? 100 : null;
            return ((current - prev) / prev) * 100;
        }

        return {
            revenue,
            revenueChange: pctChange(revenue, prevRevenue),
            totalOrders,
            ordersChange: pctChange(totalOrders, prevTotalOrders),
            aov,
            aovChange: pctChange(aov, prevAov),
            unitsSold,
            unitsSoldChange: pctChange(unitsSold, prevUnitsSold),
        };
    }, [orders, previousOrders]);

    // Revenue over time (bar chart)
    const revenueChartData = useMemo(() => {
        const dataMap = new Map<string, number>();

        [...orders]
            .filter(isPaid)
            .sort((a: Order, b: Order) => new Date(a.orderDate).getTime() - new Date(b.orderDate).getTime())
            .forEach((order: Order) => {
                const dateStr = new Date(order.orderDate).toLocaleDateString(undefined, {
                    month: "short",
                    day: "numeric",
                });
                dataMap.set(dateStr, (dataMap.get(dateStr) || 0) + (order.payment?.amount || 0));
            });

        return Array.from(dataMap.entries()).map(([date, amount]) => ({
            date,
            revenue: Math.round(amount * 100) / 100,
        }));
    }, [orders]);

    // Top selling products
    const topProducts = useMemo(() => {
        const productMap = new Map<number, { name: string; unitsSold: number; revenue: number; image?: string }>();

        orders.forEach((order: Order) => {
            order.orderItems?.forEach((item: Order["orderItems"][0]) => {
                const pid = item.product.productId;
                const existing = productMap.get(pid) || {
                    name: item.product.productName,
                    unitsSold: 0,
                    revenue: 0,
                    image: item.product.images?.[0]?.url,
                };
                existing.unitsSold += item.quantity;
                existing.revenue += item.orderedProductPrice * item.quantity;
                productMap.set(pid, existing);
            });
        });

        return Array.from(productMap.values())
            .sort((a, b) => b.revenue - a.revenue)
            .slice(0, 5);
    }, [orders]);

    // Orders by day of week
    const ordersByDay = useMemo(() => {
        const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
        const counts = new Array(7).fill(0);

        orders.forEach((order: Order) => {
            const day = new Date(order.orderDate).getDay();
            counts[day]++;
        });

        return days.map((name, i) => ({
            day: name.slice(0, 3),
            orders: counts[i],
        }));
    }, [orders]);

    // Inventory status
    const inventoryData = useMemo(() => {
        return [...products]
            .sort((a, b) => a.quantity - b.quantity)
            .map((product: Product) => ({
                productId: product.productId,
                name: product.productName,
                stock: product.quantity,
                price: product.price,
                image: product.images?.[0]?.url,
                status: product.quantity === 0
                    ? "Out of Stock"
                    : product.quantity <= 5
                        ? "Low Stock"
                        : "In Stock",
            }));
    }, [products]);

    const revenueChartConfig = {
        revenue: {
            label: "Revenue",
            color: "#4f46e5",
        },
    };

    const ordersChartConfig = {
        orders: {
            label: "Orders",
            color: "#8b5cf6",
        },
    };

    if (isLoading) {
        return (
            <div className="flex items-center justify-center min-h-[60vh]">
                <Spinner size={50} />
            </div>
        );
    }

    return (
        <div className="p-6 max-w-7xl mx-auto space-y-8 animate-in fade-in duration-500">
            {/* Header */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight text-slate-900">Analytics</h1>
                    <p className="text-muted-foreground mt-1">
                        Detailed insights into your store's performance.
                    </p>
                </div>
                {/* Time Period Filter */}
                <div className="flex gap-1 bg-slate-100 p-1 rounded-lg">
                    {(Object.keys(PERIOD_LABELS) as TimePeriod[]).map((key) => (
                        <button
                            key={key}
                            type="button"
                            onClick={() => setPeriod(key)}
                            className={`px-3 py-1.5 text-sm font-medium rounded-md transition-all cursor-pointer ${period === key
                                    ? "bg-white text-slate-900 shadow-sm"
                                    : "text-slate-500 hover:text-slate-700"
                                }`}
                        >
                            {PERIOD_LABELS[key]}
                        </button>
                    ))}
                </div>
            </div>

            {/* KPI Cards */}
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                <KpiCard
                    title="Revenue"
                    value={`$${stats.revenue.toFixed(2)}`}
                    change={stats.revenueChange}
                    icon={<DollarSign className="w-4 h-4" />}
                    period={period}
                />
                <KpiCard
                    title="Orders"
                    value={stats.totalOrders.toString()}
                    change={stats.ordersChange}
                    icon={<ShoppingBag className="w-4 h-4" />}
                    period={period}
                />
                <KpiCard
                    title="Avg Order Value"
                    value={`$${stats.aov.toFixed(2)}`}
                    change={stats.aovChange}
                    icon={<TrendingUp className="w-4 h-4" />}
                    period={period}
                />
                <KpiCard
                    title="Units Sold"
                    value={stats.unitsSold.toString()}
                    change={stats.unitsSoldChange}
                    icon={<PackageCheck className="w-4 h-4" />}
                    period={period}
                />
            </div>

            {/* Charts Row */}
            <div className="grid gap-4 md:grid-cols-7">
                {/* Revenue Over Time */}
                <Card className="md:col-span-4">
                    <CardHeader>
                        <CardTitle>Revenue Over Time</CardTitle>
                        <CardDescription>Daily revenue for the selected period.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        {revenueChartData.length > 0 ? (
                            <ChartContainer config={revenueChartConfig} className="h-[300px] w-full">
                                <BarChart data={revenueChartData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                                    <defs>
                                        <linearGradient id="fillRevenueBar" x1="0" y1="0" x2="0" y2="1">
                                            <stop offset="5%" stopColor="#4f46e5" stopOpacity={0.9} />
                                            <stop offset="95%" stopColor="#4f46e5" stopOpacity={0.3} />
                                        </linearGradient>
                                    </defs>
                                    <CartesianGrid vertical={false} strokeDasharray="3 3" />
                                    <XAxis
                                        dataKey="date"
                                        tickLine={false}
                                        axisLine={false}
                                        tickMargin={8}
                                        fontSize={12}
                                    />
                                    <YAxis
                                        tickLine={false}
                                        axisLine={false}
                                        tickFormatter={(value) => `$${value}`}
                                        fontSize={12}
                                    />
                                    <ChartTooltip content={<ChartTooltipContent />} />
                                    <Bar
                                        dataKey="revenue"
                                        fill="url(#fillRevenueBar)"
                                        radius={[4, 4, 0, 0]}
                                    />
                                </BarChart>
                            </ChartContainer>
                        ) : (
                            <div className="h-[300px] flex items-center justify-center text-muted-foreground bg-muted/20 rounded-xl">
                                No revenue data for this period.
                            </div>
                        )}
                    </CardContent>
                </Card>

                {/* Orders by Day of Week */}
                <Card className="md:col-span-3">
                    <CardHeader>
                        <CardTitle>Orders by Day</CardTitle>
                        <CardDescription>Which days get the most orders.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        {orders.length > 0 ? (
                            <ChartContainer config={ordersChartConfig} className="h-[300px] w-full">
                                <BarChart data={ordersByDay} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                                    <CartesianGrid vertical={false} strokeDasharray="3 3" />
                                    <XAxis
                                        dataKey="day"
                                        tickLine={false}
                                        axisLine={false}
                                        tickMargin={8}
                                        fontSize={12}
                                    />
                                    <YAxis
                                        tickLine={false}
                                        axisLine={false}
                                        fontSize={12}
                                        allowDecimals={false}
                                    />
                                    <ChartTooltip content={<ChartTooltipContent />} />
                                    <Bar dataKey="orders" radius={[4, 4, 0, 0]}>
                                        {ordersByDay.map((entry, index) => (
                                            <Cell
                                                key={`cell-${index}`}
                                                fill={entry.orders === Math.max(...ordersByDay.map(d => d.orders)) && entry.orders > 0
                                                    ? "#4f46e5"
                                                    : "#c7d2fe"
                                                }
                                            />
                                        ))}
                                    </Bar>
                                </BarChart>
                            </ChartContainer>
                        ) : (
                            <div className="h-[300px] flex items-center justify-center text-muted-foreground bg-muted/20 rounded-xl">
                                No orders for this period.
                            </div>
                        )}
                    </CardContent>
                </Card>
            </div>

            {/* Bottom Row */}
            <div className="grid gap-4 md:grid-cols-2">
                {/* Top Selling Products */}
                <Card>
                    <CardHeader>
                        <CardTitle>Top Selling Products</CardTitle>
                        <CardDescription>Your best performers by revenue.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        {topProducts.length > 0 ? (
                            <div className="space-y-4">
                                {topProducts.map((product, index) => (
                                    <div key={index} className="flex items-center gap-3">
                                        <div className="flex items-center justify-center w-7 h-7 rounded-full bg-slate-100 text-slate-500 text-xs font-bold shrink-0">
                                            {index + 1}
                                        </div>
                                        <div className="h-9 w-9 rounded-md border bg-gray-100 overflow-hidden shrink-0">
                                            {product.image ? (
                                                <img src={product.image} alt={product.name} className="h-full w-full object-cover" />
                                            ) : (
                                                <div className="h-full w-full bg-muted" />
                                            )}
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <p className="text-sm font-medium truncate">{product.name}</p>
                                            <p className="text-xs text-muted-foreground">{product.unitsSold} units sold</p>
                                        </div>
                                        <div className="text-sm font-semibold text-slate-900">
                                            ${product.revenue.toFixed(2)}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className="h-[200px] flex items-center justify-center text-muted-foreground bg-muted/20 rounded-xl">
                                No sales data for this period.
                            </div>
                        )}
                    </CardContent>
                </Card>

                {/* Inventory Status */}
                <Card>
                    <CardHeader>
                        <CardTitle>Inventory Status</CardTitle>
                        <CardDescription>Products sorted by stock level.</CardDescription>
                    </CardHeader>
                    <CardContent className="p-0">
                        {inventoryData.length > 0 ? (
                            <Table>
                                <TableHeader>
                                    <TableRow className="bg-muted/30 hover:bg-muted/30">
                                        <TableHead className="pl-6">Product</TableHead>
                                        <TableHead>Stock</TableHead>
                                        <TableHead>Price</TableHead>
                                        <TableHead className="pr-6">Status</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {inventoryData.map((item) => (
                                        <TableRow key={item.productId} className="hover:bg-muted/10 transition-colors">
                                            <TableCell className="pl-6">
                                                <div className="flex items-center gap-2">
                                                    <div className="h-8 w-8 rounded-md border bg-gray-100 overflow-hidden shrink-0">
                                                        {item.image ? (
                                                            <img src={item.image} alt={item.name} className="h-full w-full object-cover" />
                                                        ) : (
                                                            <div className="h-full w-full bg-muted" />
                                                        )}
                                                    </div>
                                                    <span className="text-sm font-medium truncate max-w-[140px]">{item.name}</span>
                                                </div>
                                            </TableCell>
                                            <TableCell className="text-sm font-medium">{item.stock}</TableCell>
                                            <TableCell className="text-sm">${item.price.toFixed(2)}</TableCell>
                                            <TableCell className="pr-6">
                                                <Badge variant={
                                                    item.status === "Out of Stock"
                                                        ? "destructive"
                                                        : item.status === "Low Stock"
                                                            ? "secondary"
                                                            : "default"
                                                }>
                                                    {item.status}
                                                </Badge>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        ) : (
                            <div className="h-[200px] flex items-center justify-center text-muted-foreground">
                                No products found.
                            </div>
                        )}
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}

// KPI Card component
function KpiCard({
    title,
    value,
    change,
    icon,
    period,
}: {
    title: string;
    value: string;
    change: number | null;
    icon: React.ReactNode;
    period: TimePeriod;
}) {
    const isPositive = change !== null && change >= 0;

    return (
        <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
                <CardTitle className="text-sm font-medium">{title}</CardTitle>
                <div className="text-muted-foreground">{icon}</div>
            </CardHeader>
            <CardContent>
                <div className="text-2xl font-bold">{value}</div>
                {change !== null && period !== "all" && (
                    <p className={`text-xs flex items-center gap-0.5 mt-1 ${isPositive ? "text-emerald-600" : "text-red-500"}`}>
                        {isPositive ? (
                            <ArrowUpRight className="w-3 h-3" />
                        ) : (
                            <ArrowDownRight className="w-3 h-3" />
                        )}
                        {Math.abs(change).toFixed(1)}% vs previous {PERIOD_LABELS[period].toLowerCase()}
                    </p>
                )}
            </CardContent>
        </Card>
    );
}
