import { Input } from "@/components/ui/input";
import { useAuthStore } from "@/store/authStore"
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Link, Navigate } from "react-router";
import { ArrowLeft } from "lucide-react";

export function Profile() {
    const [edit, setEdit] = useState(false);
    const user = useAuthStore(state => state.user);
    const [formData, setFormData] = useState({
        username: user?.username,
        email: user?.email,
    })

    if (!user) {
        return <Navigate to="/" replace />
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        })
    }

    return <div className="max-w-7xl mx-auto ">
        <Link to="/" className="mt-10 absolute top-10 left-10 bg-brand px-2 rounded-md text-white transition-all duration-300 flex items-center ">
            <ArrowLeft size={15} /> Back
        </Link>

        <div className=" p-6 mt-10 border border-gray-100 rounded-md relative">
            <Button className="absolute top-4 right-4 bg-brand text-white hover:bg-brand hover:text-white cursor-pointer" onClick={() => setEdit(prev => !prev)}>{edit ? "Cancel" : "Edit"}</Button>

            <h1 className="font-4xl font-bold text-brand text-center mb-10">Your profile</h1>
            <div className="md:grid md:grid-cols-3 gap-10 space-y-4">
                {/* profile */}
                <div className="space-y-2">
                    <p>Username:</p>
                    <Input name="username" disabled={!edit} value={formData.username} onChange={handleChange} />
                </div>

                <div className="space-y-2">
                    <p>Email:</p>
                    <Input name="email" disabled={!edit} value={formData.email} onChange={handleChange} />
                </div>

                {
                    edit && <Button className="w-full bg-brand text-white hover:bg-brand hover:text-white cursor-pointer md:col-start-2">Update profile</Button>
                }
            </div>
        </div>
    </div>
}