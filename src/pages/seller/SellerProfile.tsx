import { useEffect, useMemo, useState } from "react";
import { useAuthStore } from "@/store/authStore";
import { useSellerStore } from "@/store/seller";
import { useSellerOrders } from "@/hooks/useSellerOrders";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Pencil, X, Save, User, Mail, Shield, Package, ShoppingBag, DollarSign, CalendarDays } from "lucide-react";
import { Spinner } from "@/components/Common/Spinner";
import type { Order } from "@/types";

export default function SellerProfile() {
    const user = useAuthStore(state => state.user);
    const { fetchSellerProducts, products, isLoading: productsLoading } = useSellerStore();
    const { data: orders = [], isLoading: ordersLoading } = useSellerOrders();
    const [isEditing, setIsEditing] = useState(false);
    const [formData, setFormData] = useState({
        username: user?.username ?? "",
        email: user?.email ?? "",
    });

    useEffect(() => {
        fetchSellerProducts();
    }, [fetchSellerProducts]);

    const isLoading = productsLoading || ordersLoading;

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleCancel = () => {
        setIsEditing(false);
        setFormData({
            username: user?.username ?? "",
            email: user?.email ?? "",
        });
    };

    // Seller stats
    const stats = useMemo(() => {
        const totalProducts = products?.length || 0;
        const totalOrders = orders.length;
        const totalRevenue = orders
            .filter((o: Order) => {
                const s = o.payment?.status?.toLowerCase() || "";
                return s === "succeeded" || s === "paid" || s === "completed";
            })
            .reduce((sum: number, o: Order) => sum + (o.payment?.amount || 0), 0);
        const activeProducts = products?.filter(p => p.quantity > 0).length || 0;

        return { totalProducts, totalOrders, totalRevenue, activeProducts };
    }, [products, orders]);

    if (isLoading) {
        return (
            <div className="flex items-center justify-center min-h-[60vh]">
                <Spinner size={50} />
            </div>
        );
    }

    return (
        <div className="p-6 max-w-4xl mx-auto space-y-8 animate-in fade-in duration-500">
            {/* Header */}
            <div>
                <h1 className="text-3xl font-bold tracking-tight text-slate-900">Seller Profile</h1>
                <p className="text-muted-foreground mt-1">
                    Manage your account information and view store summary.
                </p>
            </div>

            {/* Profile Card */}
            <Card>
                <CardHeader className="flex flex-row items-center justify-between pb-4">
                    <div className="flex items-center gap-4">
                        <div className="h-16 w-16 bg-brand/10 text-brand rounded-2xl flex items-center justify-center font-bold text-2xl">
                            {user?.username?.charAt(0).toUpperCase()}
                        </div>
                        <div>
                            <h2 className="text-xl font-semibold text-slate-900 capitalize">{user?.username}</h2>
                            <p className="text-sm text-muted-foreground">{user?.email}</p>
                            <div className="flex gap-1.5 mt-1.5">
                                {user?.roles?.map((role: string) => (
                                    <Badge key={role} variant="secondary" className="text-xs capitalize">
                                        {role.replace("ROLE_", "").toLowerCase()}
                                    </Badge>
                                ))}
                            </div>
                        </div>
                    </div>
                    <button
                        type="button"
                        onClick={isEditing ? handleCancel : () => setIsEditing(true)}
                        className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium cursor-pointer transition-all ${isEditing
                                ? "border border-red-200 text-red-600 hover:bg-red-50"
                                : "bg-brand text-white hover:bg-brand/90"
                            }`}
                    >
                        {isEditing ? (
                            <><X className="h-4 w-4" /> Cancel</>
                        ) : (
                            <><Pencil className="h-4 w-4" /> Edit</>
                        )}
                    </button>
                </CardHeader>

                <CardContent className="space-y-6">
                    <div className="h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent" />

                    {/* Form Fields */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-slate-700 flex items-center gap-1.5">
                                <User className="h-3.5 w-3.5 text-slate-400" />
                                Username
                            </label>
                            <Input
                                name="username"
                                disabled={!isEditing}
                                value={formData.username}
                                onChange={handleChange}
                                className={`transition-all duration-200 ${isEditing
                                        ? "border-brand/30 focus:border-brand ring-brand/20"
                                        : "bg-slate-50 border-gray-200 text-slate-700"
                                    }`}
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-slate-700 flex items-center gap-1.5">
                                <Mail className="h-3.5 w-3.5 text-slate-400" />
                                Email
                            </label>
                            <Input
                                name="email"
                                disabled={!isEditing}
                                value={formData.email}
                                onChange={handleChange}
                                className={`transition-all duration-200 ${isEditing
                                        ? "border-brand/30 focus:border-brand ring-brand/20"
                                        : "bg-slate-50 border-gray-200 text-slate-700"
                                    }`}
                            />
                        </div>
                    </div>

                    {/* Account Details (read-only) */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-slate-700 flex items-center gap-1.5">
                                <Shield className="h-3.5 w-3.5 text-slate-400" />
                                Roles
                            </label>
                            <Input
                                disabled
                                value={user?.roles?.map((r: string) => r.replace("ROLE_", "").toLowerCase()).join(", ") || "Seller"}
                                className="bg-slate-50 border-gray-200 text-slate-700 capitalize"
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-slate-700 flex items-center gap-1.5">
                                <CalendarDays className="h-3.5 w-3.5 text-slate-400" />
                                Status
                            </label>
                            <div className="flex items-center gap-2 h-8 px-2.5">
                                <span className="h-2 w-2 rounded-full bg-green-500" />
                                <span className="text-sm font-medium text-green-600">Active</span>
                            </div>
                        </div>
                    </div>

                    {/* Save button */}
                    {isEditing && (
                        <div className="flex justify-end pt-2">
                            <Button type="button" className="bg-brand text-white hover:bg-brand/90 cursor-pointer px-6 shadow-md shadow-brand/20">
                                <Save className="h-4 w-4 mr-2" />
                                Update Profile
                            </Button>
                        </div>
                    )}
                </CardContent>
            </Card>

            {/* Store Stats */}
            <div>
                <h2 className="text-xl font-semibold text-slate-900 mb-4">Store Overview</h2>
                <div className="grid gap-4 grid-cols-2 lg:grid-cols-4">
                    <Card>
                        <CardContent className="pt-6">
                            <div className="flex items-center gap-3">
                                <div className="h-10 w-10 rounded-xl bg-indigo-50 flex items-center justify-center">
                                    <Package className="h-5 w-5 text-indigo-600" />
                                </div>
                                <div>
                                    <p className="text-2xl font-bold text-slate-900">{stats.totalProducts}</p>
                                    <p className="text-xs text-muted-foreground">Total Products</p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardContent className="pt-6">
                            <div className="flex items-center gap-3">
                                <div className="h-10 w-10 rounded-xl bg-emerald-50 flex items-center justify-center">
                                    <Package className="h-5 w-5 text-emerald-600" />
                                </div>
                                <div>
                                    <p className="text-2xl font-bold text-slate-900">{stats.activeProducts}</p>
                                    <p className="text-xs text-muted-foreground">Active Products</p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardContent className="pt-6">
                            <div className="flex items-center gap-3">
                                <div className="h-10 w-10 rounded-xl bg-amber-50 flex items-center justify-center">
                                    <ShoppingBag className="h-5 w-5 text-amber-600" />
                                </div>
                                <div>
                                    <p className="text-2xl font-bold text-slate-900">{stats.totalOrders}</p>
                                    <p className="text-xs text-muted-foreground">Total Orders</p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardContent className="pt-6">
                            <div className="flex items-center gap-3">
                                <div className="h-10 w-10 rounded-xl bg-rose-50 flex items-center justify-center">
                                    <DollarSign className="h-5 w-5 text-rose-600" />
                                </div>
                                <div>
                                    <p className="text-2xl font-bold text-slate-900">${stats.totalRevenue.toFixed(2)}</p>
                                    <p className="text-xs text-muted-foreground">Total Revenue</p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
}