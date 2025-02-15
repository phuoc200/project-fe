"use client";

import * as React from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

interface ProductCarouselProps {
  images: string[];
  title: string;
}

export function ProductCarousel({ images, title }: ProductCarouselProps) {
  const [currentImage, setCurrentImage] = React.useState(0);

  const previousImage = () => {
    setCurrentImage((current) =>
      current === 0 ? images.length - 1 : current - 1
    );
  };

  const nextImage = () => {
    setCurrentImage((current) =>
      current === images.length - 1 ? 0 : current + 1
    );
  };

  return (
    <div className="relative">
      <div className="relative aspect-square overflow-hidden rounded-lg">
        <Image
          src={images[currentImage] || "/placeholder.svg"}
          alt={`${title} - Image ${currentImage + 1}`}
          width={600}
          height={600}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 flex items-center justify-between p-4">
          <Button
            variant="outline"
            size="icon"
            className="h-8 w-8 rounded-full bg-white/70 hover:bg-white/90"
            onClick={previousImage}
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            className="h-8 w-8 rounded-full bg-white/70 hover:bg-white/90"
            onClick={nextImage}
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
      <div className="mt-4 flex gap-4 overflow-x-auto pb-2">
        {images.map((image, index) => (
          <button
            key={index}
            className={cn(
              "relative flex-shrink-0 cursor-pointer rounded-md border-2",
              currentImage === index ? "border-blue-600" : "border-transparent"
            )}
            onClick={() => setCurrentImage(index)}
          >
            <Image
              src={image || "/placeholder.svg"}
              alt={`${title} - Thumbnail ${index + 1}`}
              width={80}
              height={80}
              className="h-20 w-20 rounded-md object-cover"
            />
          </button>
        ))}
      </div>
    </div>
  );
}
