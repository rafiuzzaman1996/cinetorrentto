"use client"

import Autoplay from "embla-carousel-autoplay"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import { Card, CardContent } from "../../ui/card"
import { FeaturedContentItem } from "./FeaturedContent"
import ImageWithFallback from "../shared/ImageWithFallback"
import Link from "next/link"

interface FeaturedCarouselProps {
  featuredContent: FeaturedContentItem[];
}

const FeaturedCarousel: React.FC<FeaturedCarouselProps> = ({ featuredContent }) => {
  return (
    <Carousel
      className="w-full"
      opts={{
        loop: true,
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
            <Card
              role="region"
              className="group relative overflow-hidden rounded-2xl border-0 shadow-md transition-all duration-500 hover:scale-105"
            >
              <Link
                href={`/content/${item.content.slug}`}
                className="cursor-pointer"
              >
                {/* Background image */}
                <div className="absolute inset-0">
                  <ImageWithFallback
                    src={process.env.NEXT_PUBLIC_IMG_URL + item.content?.poster_image_url}
                    fallbackSrc="/cinetorrentto-placeholder.webp"
                    quality={90}
                    priority={true}
                    width={400}
                    height={400}
                    alt={item.content.title}
                    className="w-[100vw] h-60 md:w-[25vw] md:h-[400px] object-cover object-center transition-transform"
                  />

                  {/* Scrim + gradient for text contrast */}
                  <div className="absolute inset-0 bg-black/20" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                </div>

                {/* Foreground content */}
                <CardContent className="relative z-10 flex h-30 flex-col justify-end p-6 pb-0 text-white md:h-45">
                  <h3 className="text-gray-300 mix-blend-difference text-lg font-semibold leading-tight md:text-lg">
                    {item.content.title}
                  </h3>
                  <p className="text-gray-300 mix-blend-difference text-xs leading-tight text-ellipsis">{item.content.genres?.map(data => data.title).join(',')}</p>
                </CardContent>
              </Link>
              {/* Decorative focus ring on hover */}
              <div className="pointer-events-none absolute inset-0 rounded-2xl ring-0 ring-white/0 transition-all duration-300 group-hover:ring-4 group-hover:ring-white/10" />
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