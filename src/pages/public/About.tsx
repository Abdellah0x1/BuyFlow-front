import { ShieldCheck, Truck, Users, Heart, ArrowRight, Hexagon } from "lucide-react";
import { Link } from "react-router";

const values = [
    {
        icon: ShieldCheck,
        title: "Trust & Transparency",
        description: "Every seller is verified. Every transaction is secure. We believe trust is earned through consistency.",
    },
    {
        icon: Users,
        title: "Community First",
        description: "We empower small businesses and independent sellers to reach customers they never could alone.",
    },
    {
        icon: Truck,
        title: "Reliable Delivery",
        description: "Fast, trackable shipping with real-time updates. Your order, always within reach.",
    },
    {
        icon: Heart,
        title: "Quality Obsessed",
        description: "We curate products that meet high standards — because you deserve better, not more.",
    },
];

const stats = [
    { value: "10K+", label: "Products Listed" },
    { value: "2K+", label: "Verified Sellers" },
    { value: "50K+", label: "Happy Customers" },
    { value: "99%", label: "Satisfaction Rate" },
];

export default function About() {
    return (
        <div className="flex-grow flex flex-col">
            {/* Hero — White tile */}
            <section className="bg-canvas">
                <div className="max-w-[980px] mx-auto px-6 py-[80px] text-center">
                    <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-hairline text-caption-apple text-ink-muted-48 mb-8 animate-[fadeInUp_0.5s_ease-out]">
                        <Hexagon size={12} />
                        Our Story
                    </div>
                    <h1 className="text-hero-display text-ink animate-[fadeInUp_0.6s_ease-out] max-[640px]:text-[34px] max-[640px]:leading-[1.15] max-[1068px]:text-display-lg">
                        Built for Sellers.
                        <br />
                        <span className="text-brand">
                            Designed for Buyers.
                        </span>
                    </h1>
                    <p className="text-body-apple text-ink-muted-48 max-w-2xl mx-auto mt-5 animate-[fadeInUp_0.7s_ease-out]">
                        BuyFlow is a modern marketplace connecting verified sellers with discerning buyers.
                        We strip away the noise and focus on what matters — quality products, honest sellers,
                        and a seamless shopping experience.
                    </p>
                </div>
            </section>

            {/* Stats — Parchment tile */}
            <section className="bg-canvas-parchment border-y border-divider-soft">
                <div className="max-w-[980px] mx-auto px-6 py-14">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                        {stats.map((stat) => (
                            <div key={stat.label} className="text-center">
                                <div className="text-display-lg text-ink">{stat.value}</div>
                                <div className="text-caption-apple text-ink-muted-48 mt-1">{stat.label}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Values — White tile */}
            <section className="bg-canvas">
                <div className="max-w-[980px] mx-auto px-6 py-[80px]">
                    <div className="text-center mb-14">
                        <h2 className="text-display-lg text-ink">What We Stand For</h2>
                        <p className="text-body-apple text-ink-muted-48 mt-3 max-w-lg mx-auto">
                            The principles that guide every decision we make.
                        </p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                        {values.map((item) => {
                            const Icon = item.icon;
                            return (
                                <div
                                    key={item.title}
                                    className="group p-7 rounded-[18px] border border-hairline bg-canvas hover:border-brand/30 transition-all duration-200"
                                >
                                    <div className="p-2.5 rounded-[11px] bg-canvas-parchment text-ink-muted-48 w-fit mb-4 group-hover:bg-brand group-hover:text-white transition-all duration-200">
                                        <Icon size={22} strokeWidth={1.5} />
                                    </div>
                                    <h3 className="text-body-strong text-ink mb-1.5">{item.title}</h3>
                                    <p className="text-body-apple text-ink-muted-48">{item.description}</p>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* Mission — Dark tile */}
            <section className="bg-surface-tile-1">
                <div className="max-w-[980px] mx-auto px-6 py-[80px] text-center">
                    <blockquote className="text-lead-airy text-white max-w-2xl mx-auto">
                        "We're not trying to be the biggest marketplace.
                        <br className="hidden sm:block" />
                        We're trying to be the most{" "}
                        <span className="text-brand-on-dark">
                            trusted
                        </span>{" "}
                        one."
                    </blockquote>
                    <p className="text-caption-apple text-white/50 mt-6">— The BuyFlow Team</p>
                </div>
            </section>

            {/* CTA — Parchment tile */}
            <section className="bg-canvas-parchment">
                <div className="max-w-[980px] mx-auto px-6 py-[80px] text-center">
                    <h2 className="text-display-lg text-ink">
                        Ready to explore?
                    </h2>
                    <p className="text-body-apple text-ink-muted-48 mt-3 mb-10 max-w-md mx-auto">
                        Discover thousands of quality products from verified sellers.
                    </p>
                    <Link
                        to="/products"
                        className="inline-flex items-center gap-2 bg-brand hover:bg-brand-light text-white text-body-apple rounded-full px-7 py-3 transition-all duration-200 active-scale"
                    >
                        Browse Products
                        <ArrowRight size={16} />
                    </Link>
                </div>
            </section>
        </div>
    );
}
