import { Input } from "@/components/ui/input";
import { useAuthStore } from "@/store/authStore";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Pencil, X, Save } from "lucide-react";

export function Profile() {
    const [edit, setEdit] = useState(false);
    const user = useAuthStore((state) => state.user);
    const [formData, setFormData] = useState({
        username: user?.username ?? "",
        email: user?.email ?? "",
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleCancel = () => {
        setEdit(false);
        setFormData({
            username: user?.username ?? "",
            email: user?.email ?? "",
        });
    };

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-xl font-bold text-slate-900 tracking-tight">
                        Profile Information
                    </h2>
                    <p className="text-sm text-slate-500 mt-1">
                        Manage your personal details and preferences
                    </p>
                </div>
                <Button
                    variant={edit ? "outline" : "default"}
                    size="sm"
                    className={
                        edit
                            ? "border-red-200 text-red-600 hover:bg-red-50 hover:text-red-700 cursor-pointer"
                            : "bg-brand text-white hover:bg-brand-dark cursor-pointer"
                    }
                    onClick={edit ? handleCancel : () => setEdit(true)}
                >
                    {edit ? (
                        <>
                            <X className="h-4 w-4 mr-1.5" /> Cancel
                        </>
                    ) : (
                        <>
                            <Pencil className="h-4 w-4 mr-1.5" /> Edit
                        </>
                    )}
                </Button>
            </div>

            <div className="h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent" />

            {/* Form fields */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                    <label className="text-sm font-medium text-slate-700">Username</label>
                    <Input
                        name="username"
                        disabled={!edit}
                        value={formData.username}
                        onChange={handleChange}
                        className={`transition-all duration-200 ${
                            edit
                                ? "border-brand/30 focus:border-brand ring-brand/20"
                                : "bg-slate-50 border-gray-200 text-slate-700"
                        }`}
                    />
                </div>

                <div className="space-y-2">
                    <label className="text-sm font-medium text-slate-700">Email</label>
                    <Input
                        name="email"
                        disabled={!edit}
                        value={formData.email}
                        onChange={handleChange}
                        className={`transition-all duration-200 ${
                            edit
                                ? "border-brand/30 focus:border-brand ring-brand/20"
                                : "bg-slate-50 border-gray-200 text-slate-700"
                        }`}
                    />
                </div>
            </div>

            {/* Save button */}
            {edit && (
                <div className="flex justify-end pt-2">
                    <Button className="bg-brand text-white hover:bg-brand-dark cursor-pointer px-6 shadow-md shadow-brand/20">
                        <Save className="h-4 w-4 mr-2" />
                        Update Profile
                    </Button>
                </div>
            )}

            {/* Account info card */}
            {!edit && (
                <div className="mt-4 rounded-xl bg-gradient-to-r from-brand/5 to-brand-light/5 border border-brand/10 p-5">
                    <h3 className="text-sm font-semibold text-slate-800 mb-3">Account Details</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
                        <div>
                            <span className="text-slate-500">Roles</span>
                            <p className="font-medium text-slate-800 mt-0.5 capitalize">
                                {user?.roles?.map((r) => r.replace("ROLE_", "").toLowerCase()).join(", ") || "User"}
                            </p>
                        </div>
                        <div>
                            <span className="text-slate-500">Status</span>
                            <p className="font-medium text-green-600 mt-0.5 flex items-center gap-1.5">
                                <span className="h-2 w-2 rounded-full bg-green-500 inline-block" />
                                Active
                            </p>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}