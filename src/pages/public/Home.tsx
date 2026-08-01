import HeroBanner from "../../components/Home/HeroSection";
import CategoriesSection from "../../components/Home/CategoriesSection";

export default function Home() {
    return (
        <div className="flex-grow flex flex-col">
            <HeroBanner />
            <CategoriesSection />
        </div>
    );
}