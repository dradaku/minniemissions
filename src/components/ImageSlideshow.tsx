
import { useState, useEffect } from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

const slides = [
  "/lovable-uploads/57da0736-da7d-4394-9d03-06ad41f3acc8.png",
  "/lovable-uploads/fba9d82a-e78f-4745-8e5a-f9ecf2081197.png"
];

export const ImageSlideshow = () => {
  return (
    <div className="w-full max-w-5xl mx-auto px-4">
      <Carousel
        opts={{
          align: "start",
          loop: true,
        }}
        className="relative"
      >
        <CarouselContent>
          {slides.map((slide, index) => (
            <CarouselItem key={index}>
              <div className="relative aspect-[16/9] overflow-hidden rounded-xl">
                <img
                  src={slide}
                  alt={`Slide ${index + 1}`}
                  className="object-cover w-full h-full"
                />
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="absolute -left-12 top-1/2" />
        <CarouselNext className="absolute -right-12 top-1/2" />
      </Carousel>
    </div>
  );
};
