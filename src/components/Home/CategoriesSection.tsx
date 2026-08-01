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
        <section className="max-w-7xl mx-auto w-full py-12 px-4 sm:px-10 border-b border-border">
            <h2 className="text-2xl font-semibold mb-8 text-foreground text-center sm:text-left">Shop by Category</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                {categories.map((category) => {
                    const Icon = category.icon;
                    return (
                        <Link
                            key={category.name}
                            to={category.path}
                            className="flex flex-col items-center justify-center p-6 gap-3 rounded-xl border border-border bg-background hover:border-brand hover:shadow-sm transition-all duration-300 group"
                        >
                            <div className="p-3 rounded-full bg-brand/10 text-brand group-hover:bg-brand group-hover:text-white transition-colors duration-300">
                                <Icon size={28} strokeWidth={1.5} />
                            </div>
                            <span className="font-medium text-sm text-foreground group-hover:text-brand transition-colors duration-300">
                                {category.name}
                            </span>
                        </Link>
                    );
                })}
            </div>
        </section>
    );
}
