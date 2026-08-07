import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { useNavigate } from "react-router";

export default function HeroBanner() {
    const [query, setQuery] = useState("");
    const navigate = useNavigate();

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        if (query.trim()) {
            navigate(`/products?q=${encodeURIComponent(query.trim())}`);
        }
    };

    return (
        <section className="min-h-[70vh] max-w-7xl mx-auto flex-grow flex flex-col justify-center relative overflow-hidden border-b border-border">
            <div className="py-12 px-10 sm:py-6 sm:px-4 flex flex-col gap-10">
                <p className="text-5xl font-semibold text-center">Discover Quality Prodcut From
                    <br />
                    <span className="font-semibold text-5xl text-brand">Verified Sellers</span></p>
                <form onSubmit={handleSearch}>
                    <div className="flex items-center gap-2">
                        <Input value={query} className="border border-gray-300 rounded-lg p-6 focus-visible:ring-1 focus-visible:ring-brand" onChange={e => setQuery(e.target.value)} placeholder="Search by product name" />
                        <Button type="submit" className="text-white bg-brand hover:bg-brand-dark p-6 px-5 transition-all duration-300 cursor-pointer">Search</Button>
                    </div>
                </form>
            </div>
        </section>
    );
}
