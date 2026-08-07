import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState, useEffect, useRef } from "react";
import { useNavigate, Link } from "react-router";
import { searchProductByKeyword } from "@/api/products";
import type { Product } from "@/types";

export default function HeroBanner() {
    const [query, setQuery] = useState("");
    const [results, setResults] = useState<Product[]>([]);
    const [isSearching, setIsSearching] = useState(false);
    const [showDropdown, setShowDropdown] = useState(false);

    const navigate = useNavigate();
    const dropdownRef = useRef<HTMLDivElement>(null);

    // Handle click outside to close the dropdown
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setShowDropdown(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    // Debounce search query
    useEffect(() => {
        console.log("--> query changed:", query);
        if (!query.trim()) {
            setResults([]);
            setShowDropdown(false);
            return;
        }

        const timer = setTimeout(async () => {
            console.log("--> debounce finished, calling API...");
            setIsSearching(true);
            setShowDropdown(true);
            const res = await searchProductByKeyword(query.trim());
            if (res.success && res.data) {
                setResults(res.data);
            } else {
                setResults([]);
            }
            setIsSearching(false);
        }, 300); // 300ms delay

        return () => clearTimeout(timer);
    }, [query]);

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        if (query.trim()) {
            setShowDropdown(false);
            navigate(`/products?q=${encodeURIComponent(query.trim())}`);
        }
    };

    return (
        <section className="min-h-[70vh] max-w-7xl mx-auto flex-grow flex flex-col justify-center relative overflow-hidden border-b border-border">
            <div className="py-12 px-10 sm:py-6 sm:px-4 flex flex-col gap-10">
                <p className="text-5xl font-semibold text-center">Discover Quality Products From
                    <br />
                    <span className="font-semibold text-5xl text-brand">Verified Sellers</span></p>

                <div className="relative w-full" ref={dropdownRef}>
                    <form onSubmit={handleSearch}>
                        <div className="flex items-center gap-2">
                            <Input
                                value={query}
                                className="border border-gray-300 rounded-lg p-6 focus-visible:ring-1 focus-visible:ring-brand"
                                onChange={e => setQuery(e.target.value)}
                                onFocus={() => {
                                    if (query.trim() && results.length > 0) setShowDropdown(true);
                                }}
                                placeholder="Search by product name"
                            />
                            <Button type="submit" className="text-white bg-brand hover:bg-brand-dark p-6 px-5 transition-all duration-300 cursor-pointer">Search</Button>
                        </div>
                    </form>

                    {/* Live Search Results Dropdown */}
                    {showDropdown && query.trim() && (
                        <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-gray-200 rounded-lg shadow-lg z-50 max-h-96 overflow-y-auto">
                            {isSearching ? (
                                <div className="p-4 text-center text-muted-foreground">Searching...</div>
                            ) : results.length > 0 ? (
                                <ul className="flex flex-col">
                                    {results.map((product) => (
                                        <li key={product.productId} className="border-b border-gray-100 last:border-0 hover:bg-gray-50 transition-colors">
                                            <Link
                                                to={`/products/${product.productId}`}
                                                className="flex items-center gap-4 p-3"
                                                onClick={() => setShowDropdown(false)}
                                            >
                                                {product.images && product.images.length > 0 ? (
                                                    <img src={product.images[0].url} alt={product.productName} className="w-12 h-12 object-cover rounded" />
                                                ) : (
                                                    <div className="w-12 h-12 bg-gray-200 rounded flex-shrink-0" />
                                                )}
                                                <div className="flex flex-col overflow-hidden">
                                                    <span className="font-medium truncate">{product.productName}</span>
                                                    <span className="text-sm text-red-400 font-semibold">${product.price}</span>
                                                </div>
                                            </Link>
                                        </li>
                                    ))}
                                </ul>
                            ) : (
                                <div className="p-4 text-center text-muted-foreground">No products found.</div>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </section>
    );
}
