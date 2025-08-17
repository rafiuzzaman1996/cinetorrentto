"use client"

import React from "react"
import Autoplay from "embla-carousel-autoplay"
import Image from "next/image"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import { Card, CardContent } from "./ui/card"

interface FeaturedContentItem {
  img: string;
  id: number;
  // Add other known properties here as needed
}

interface FeaturedCarouselProps {
  featuredContent: FeaturedContentItem[];
}

const FeaturedCarousel: React.FC<FeaturedCarouselProps> = ({ featuredContent }) => {
  return (
    <Carousel
      className="w-full"
      opts={{
        loop: false,
      }}
      plugins={[
        Autoplay({
          delay: 3000,
          stopOnInteraction: false,
        }),
      ]}
    >
      <CarouselContent className="flex gap-4">
        {featuredContent.map((item, index) => (
          <CarouselItem
            key={index}
            className="flex-none w-full sm:w-1/2 md:w-1/4" // 4 items on md+, 2 on sm, 1 on mobile
          >
          <Card className="h-48 flex items-center justify-center">
            <CardContent className="flex items-center justify-center p-2">
             <Image
            src={item.img}
            alt={`Featured ${index + 1}`}
            width={600}
            height={80}
            className="h-60 object-cover"
          />
            </CardContent>
          </Card>

          </CarouselItem>
        ))}
      </CarouselContent>

      {/* Arrows */}
      <CarouselPrevious
        className="hidden md:flex absolute -left-5 top-1/2 -translate-y-1/2
           bg-black/30 text-white dark:bg-black/30 dark:text-white
           rounded-full p-2"
      />
      <CarouselNext
        className="hidden md:flex absolute -right-5 top-1/2 -translate-y-1/2
           bg-black/30 text-white dark:bg-black/30 dark:text-white
           rounded-full p-4"
      />
    </Carousel>
  )
}

export default FeaturedCarousel