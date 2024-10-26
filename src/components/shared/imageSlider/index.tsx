"use client";

import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Navigation } from "swiper/modules";
import type SwiperType from "swiper";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { ChevronLeft, ChevronRight } from "lucide-react";

import "swiper/css";
import "swiper/css/pagination";

interface ImageSliderProps {
  urls: string[];
  className?: string;
}

const ImageSlider = ({ urls, className }: ImageSliderProps) => {
  const [swiper, setSwiper] = useState<SwiperType | null>(null);
  const [activeIndex, setActiveIndex] = useState<number>(0);

  const [slideConfig, setSlideConfig] = useState({
    isBeginning: true,
    isEnd: activeIndex === (urls.length ?? 0) - 1,
  });

  useEffect(() => {
    if (swiper) {
      const handleSlideChange = () => {
        const newIndex = swiper.activeIndex;
        setActiveIndex(newIndex);
        setSlideConfig({
          isBeginning: newIndex === 0,
          isEnd: newIndex === (urls.length ?? 0) - 1,
        });
      };

      swiper.on("slideChange", handleSlideChange);

      return () => {
        swiper.off("slideChange", handleSlideChange);
      };
    }
  }, [swiper, urls.length]);

  const activeStyles =
    "active:scale-[0.97] grid opacity-100 hover:scale-105 absolute top-1/2 -translate-y-1/2 aspect-square h-8 w-8 z-50 place-items-center rounded-full border-2 bg-white border-zinc-300";
  const inActiveStyles = "hidden text-gray-400";

  return (
    <div
      className={`group relative aspect-square bg-zinc-100 overflow-hidden ${className}`}
    >
      <div className="absolute z-10 inset-0 opacity-0 group-hover:opacity-100 transition">
        <button
          className={cn(activeStyles, "right-3 transition", {
            [inActiveStyles]: slideConfig.isEnd,
            "hover:bg-primary-300 text-primary-800 opacity-100":
              !slideConfig.isEnd,
          })}
          onClick={(event) => {
            event.preventDefault();
            swiper?.slideNext();
          }}
          aria-label="Next Image"
        >
          <ChevronRight className="h-4 w-4 text-zinc-700" />
        </button>
        <button
          className={cn(activeStyles, "left-3 transition", {
            [inActiveStyles]: slideConfig.isBeginning,
            "hover:bg-primary-300 text-primary-800 opacity-100":
              !slideConfig.isBeginning,
          })}
          onClick={(event) => {
            event.preventDefault();
            swiper?.slidePrev();
          }}
          aria-label="Previous Image"
        >
          <ChevronLeft className="h-4 w-4 text-zinc-700" />
        </button>
      </div>

      <Swiper
        pagination={{
          renderBullet: (_, className) => {
            return `<span class="rounded-full transition ${className}"></span>`;
          },
        }}
        onSwiper={(swiper) => setSwiper(swiper)}
        spaceBetween={50}
        slidesPerView={1}
        modules={[Pagination, Navigation]}
        className="h-full w-full"
      >
        {urls.map((url, i) => (
          <SwiperSlide key={i}>
            <Image
              fill
              src={url}
              loading="eager"
              className="object-cover object-center"
              alt="Slides"
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default ImageSlider;
