import { Input } from "@/components/ui/input";
import { useState, useEffect, useRef } from "react";
import { useNavigate, Link } from "react-router";
import { searchProductByKeyword } from "@/api/products";
import type { Product } from "@/types";
import { Search, ArrowRight, ShieldCheck, Truck, Star } from "lucide-react";

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
        if (!query.trim()) {
            setResults([]);
            setShowDropdown(false);
            return;
        }

        const timer = setTimeout(async () => {
            setIsSearching(true);
            setShowDropdown(true);
            const res = await searchProductByKeyword(query.trim());
            if (res.success && res.data) {
                setResults(res.data);
            } else {
                setResults([]);
            }
            setIsSearching(false);
        }, 300);

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
        <div className="bg-canvas">
            <section className="relative min-h-[70vh] max-w-[980px] mx-auto flex flex-col justify-center items-center px-6 sm:px-4">
                <div className="py-[80px] sm:py-[60px] flex flex-col items-center gap-6 w-full">

                    {/* Badge */}
                    <div
                        className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-hairline text-caption-apple text-ink-muted-48 animate-[fadeInUp_0.5s_ease-out]"
                    >
                        Trusted Marketplace
                    </div>

                    {/* Headline */}
                    <div className="text-center space-y-4 animate-[fadeInUp_0.6s_ease-out]">
                        <h1 className="text-hero-display text-ink max-[640px]:text-[34px] max-[640px]:leading-[1.15] max-[1068px]:text-display-lg">
                            Discover Quality Products
                            <br />
                            <span className="text-brand">
                                From Verified Sellers
                            </span>
                        </h1>
                        <p className="text-body-apple text-ink-muted-48 max-w-2xl mx-auto">
                            Curated collections, seamless shopping, and trusted sellers — all in one place.
                        </p>
                    </div>

                    {/* Search */}
                    <div className="relative w-full max-w-2xl animate-[fadeInUp_0.7s_ease-out]" ref={dropdownRef}>
                        <form onSubmit={handleSearch}>
                            <div className="relative flex items-center">
                                <Search className="absolute left-5 text-ink-muted-48" size={18} />
                                <Input
                                    value={query}
                                    className="w-full border border-hairline bg-canvas rounded-full h-11 pl-12 pr-28 text-body-apple text-ink placeholder:text-ink-muted-48 focus-visible:ring-1 focus-visible:ring-brand/40 focus-visible:border-brand/30 transition-all duration-200"
                                    onChange={e => setQuery(e.target.value)}
                                    onFocus={() => {
                                        if (query.trim() && results.length > 0) setShowDropdown(true);
                                    }}
                                    placeholder="Search products..."
                                />
                                <button
                                    type="submit"
                                    className="absolute right-1.5 bg-brand hover:bg-brand-light text-white rounded-full px-5 py-2 text-caption-apple font-medium transition-all duration-200 active-scale flex items-center gap-1.5"
                                >
                                    Search
                                    <ArrowRight size={14} />
                                </button>
                            </div>
                        </form>

                        {/* Live Search Results Dropdown */}
                        {showDropdown && query.trim() && (
                            <div className="absolute top-full left-0 right-0 mt-2 bg-canvas border border-hairline rounded-[18px] shadow-product z-50 max-h-96 overflow-y-auto">
                                {isSearching ? (
                                    <div className="p-5 text-center text-ink-muted-48 text-caption-apple">
                                        <div className="inline-flex items-center gap-2">
                                            <div className="w-4 h-4 border-2 border-brand/30 border-t-brand rounded-full animate-spin" />
                                            Searching...
                                        </div>
                                    </div>
                                ) : results.length > 0 ? (
                                    <ul className="flex flex-col py-1">
                                        {results.map((product) => (
                                            <li key={product.productId} className="border-b border-divider-soft last:border-0">
                                                <Link
                                                    to={`/products/${product.productId}`}
                                                    className="flex items-center gap-4 px-4 py-3 hover:bg-canvas-parchment transition-colors duration-150"
                                                    onClick={() => setShowDropdown(false)}
                                                >
                                                    {product.images && product.images.length > 0 ? (
                                                        <img src={product.images[0].url} alt={product.productName} className="w-11 h-11 object-cover rounded-[8px] border border-hairline" />
                                                    ) : (
                                                        <div className="w-11 h-11 bg-canvas-parchment rounded-[8px] flex-shrink-0" />
                                                    )}
                                                    <div className="flex flex-col overflow-hidden min-w-0">
                                                        <span className="text-body-strong truncate text-ink">{product.productName}</span>
                                                        <span className="text-caption-apple text-brand font-semibold">${product.price}</span>
                                                    </div>
                                                </Link>
                                            </li>
                                        ))}
                                    </ul>
                                ) : (
                                    <div className="p-5 text-center text-ink-muted-48 text-caption-apple">No products found.</div>
                                )}
                            </div>
                        )}
                    </div>

                    {/* Trust indicators */}
                    <div className="flex flex-wrap items-center justify-center gap-6 sm:gap-8 pt-2 animate-[fadeInUp_0.8s_ease-out]">
                        <div className="flex items-center gap-2 text-ink-muted-48 text-caption-apple">
                            <ShieldCheck size={15} />
                            <span>Verified Sellers</span>
                        </div>
                        <div className="w-px h-3.5 bg-hairline hidden sm:block" />
                        <div className="flex items-center gap-2 text-ink-muted-48 text-caption-apple">
                            <Truck size={15} />
                            <span>Fast Delivery</span>
                        </div>
                        <div className="w-px h-3.5 bg-hairline hidden sm:block" />
                        <div className="flex items-center gap-2 text-ink-muted-48 text-caption-apple">
                            <Star size={15} />
                            <span>Top Rated</span>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
