"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

export type ProductImage = {
    src: string;
    alt?: string;
};

export interface ProductGalleryProps {
    images: ProductImage[];
}

export function ProductGallery({ images }: ProductGalleryProps) {
    const [index, setIndex] = React.useState(0);

    if (!images?.length) return null;

    return (
        <div className="flex flex-col-reverse md:flex-row gap-4 w-full">
            {/* Thumbnails */}
            {images.length > 1 && (
                <div className="flex flex-row md:flex-col gap-3 overflow-x-auto md:overflow-y-auto w-full md:w-20 md:h-[400px] flex-shrink-0 scrollbar-hide pb-2 md:pb-0">
                    {images.map((img, i) => (
                        <button
                            key={i}
                            onClick={() => setIndex(i)}
                            className={cn(
                                "relative flex-shrink-0 w-16 md:w-full aspect-square rounded-[8px] overflow-hidden border-2 transition-all duration-200 active-scale",
                                i === index ? "border-brand" : "border-hairline hover:border-brand/40"
                            )}
                        >
                            <img
                                src={img.src}
                                alt={img.alt ?? `Thumbnail ${i + 1}`}
                                className="w-full h-full object-cover"
                            />
                        </button>
                    ))}
                </div>
            )}

            {/* Main image */}
            <div className="flex-1 relative aspect-[4/5] w-full rounded-[18px] overflow-hidden bg-canvas-parchment">
                <img
                    src={images[index].src}
                    alt={images[index].alt ?? "Main view"}
                    className="w-full h-full object-cover shadow-product"
                />
            </div>
        </div>
    );
}
