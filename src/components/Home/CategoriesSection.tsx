import { Laptop, Shirt, Home, Dumbbell, BookOpen, Gamepad2 } from "lucide-react";
import { Link } from "react-router";

const categories = [
    { name: "Electronics", icon: Laptop, path: "/products?category=electronics" },
    { name: "Clothing", icon: Shirt, path: "/products?category=clothing" },
    { name: "Home & Garden", icon: Home, path: "/products?category=home-garden" },
    { name: "Sports", icon: Dumbbell, path: "/products?category=sports" },
    { name: "Books", icon: BookOpen, path: "/products?category=books" },
    { name: "Toys", icon: Gamepad2, path: "/products?category=toys" },
];

export default function CategoriesSection() {
    return (
        <section className="bg-canvas-parchment py-[80px] px-6 sm:px-4">
            <div className="max-w-[980px] mx-auto">
                <div className="text-center mb-12">
                    <h2 className="text-display-md text-ink">Shop by Category</h2>
                    <p className="text-body-apple text-ink-muted-48 mt-3">Browse our curated collections</p>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                    {categories.map((category) => {
                        const Icon = category.icon;
                        return (
                            <Link
                                key={category.name}
                                to={category.path}
                                className="group flex flex-col items-center justify-center p-6 gap-4 rounded-[18px] border border-hairline bg-canvas hover:border-brand/40 transition-all duration-200 active-scale"
                            >
                                <div className="p-3 rounded-[11px] bg-canvas-parchment text-ink-muted-48 group-hover:bg-brand group-hover:text-white transition-all duration-200">
                                    <Icon size={24} strokeWidth={1.5} />
                                </div>
                                <span className="text-caption-apple text-ink-muted-80 group-hover:text-ink transition-colors duration-200">
                                    {category.name}
                                </span>
                            </Link>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
