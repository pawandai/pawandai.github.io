"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import type SwiperType from "swiper";

import "swiper/css";
import "swiper/css/pagination";

import { Button } from "@/components/ui/button";
import { FC, useState, useEffect, useMemo } from "react";
import Image from "next/image";
import { Avatar } from "@/components/ui/avatar";

interface AboutMeProps {}

const AboutMe: FC<AboutMeProps> = () => {
  const urls = useMemo(
    () => [
      "/placeholder.png",
      "/placeholder.png",
      "/placeholder.png",
      "/placeholder.png",
      "/placeholder.png",
    ],
    []
  );
  const [swiper, setSwiper] = useState<SwiperType | null>(null);
  const [activeIndex, setActiveIndex] = useState<number>(0);

  const [slideConfig, setSlideConfig] = useState({
    isBeginning: true,
    isEnd: activeIndex === (urls.length ?? 0) - 1,
  });

  useEffect(() => {
    swiper?.on("slideChange", ({ activeIndex }) => {
      setActiveIndex(activeIndex);
      setSlideConfig({
        isBeginning: activeIndex === 0,
        isEnd: activeIndex === (urls.length ?? 0) - 1,
      });
    });
  }, [swiper, urls]);

  return (
    <section className="py-10 mt-10 rounded-xl border overflow-hidden bg-white dark:bg-gray-800 dark:border-gray-700">
      <div className="max-w-6xl h-fit mx-auto px-6">
        <h3 className="text-2xl font-bold text-center mb-8 text-gray-900 dark:text-gray-100">
          About Me
        </h3>
        <main className="flex flex-col lg:flex-row items-center justify-center group relative gap-8">
          {/* Image Slider */}
          <div className="flex-1 text-center">
            <Swiper
              pagination={{
                renderBullet: (_, className) => {
                  return `<span class="swiper-pagination-bullet ${className} rounded-full transition-all"></span>`;
                },
              }}
              onSwiper={(swiper) => setSwiper(swiper)}
              spaceBetween={30}
              slidesPerView={1}
              modules={[Pagination, Navigation]}
              className="w-full max-w-md flex items-center justify-center"
            >
              {urls.map((url, i) => (
                <SwiperSlide key={i}>
                  <Image
                    src={url}
                    alt="pawan images"
                    height={1700}
                    width={1700}
                    className="rounded-2xl"
                  />
                </SwiperSlide>
              ))}
            </Swiper>
          </div>

          {/* Navigation Buttons */}
          <div className="flex justify-center items-center space-x-4 lg:hidden">
            <Button
              size="icon"
              disabled={slideConfig.isBeginning}
              className="p-2 rounded-full bg-gray-300 hover:bg-gray-400 dark:bg-gray-700 dark:hover:bg-gray-600 transition"
              onClick={(event) => {
                event.preventDefault();
                swiper?.slidePrev();
              }}
              aria-label="Previous Image"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-6 h-6 text-gray-900 dark:text-gray-100"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15 19l-7-7 7-7"
                />
              </svg>
            </Button>
            <Button
              size="icon"
              disabled={slideConfig.isEnd}
              className="p-2 rounded-full bg-gray-300 hover:bg-gray-400 dark:bg-gray-700 dark:hover:bg-gray-600 transition"
              onClick={(event) => {
                event.preventDefault();
                swiper?.slideNext();
              }}
              aria-label="Next Image"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-6 h-6 text-gray-900 dark:text-gray-100"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </Button>
          </div>

          {/* Description */}
          <div className="flex-1 max-w-md">
            <Avatar></Avatar>
            <div className="mb-4">
              <p className="text-xl font-semibold text-gray-900 dark:text-gray-100">
                Pawan Awasthi
              </p>
              <p className="text-gray-500 dark:text-gray-400">
                Software Engineer | Full Stack Developer
              </p>
            </div>

            <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed text-center lg:text-left">
              “I&apos;m an engineering student with a strong focus on building
              secure, efficient systems, particularly in Python, JavaScript, and
              C#. My recent project shows my strength in database management
              (MySQL) and understanding of user roles and permissions, as well
              as secure authentication methods.”
            </p>

            {/* Navigation */}
            <div className="lg:flex items-center space-x-4 mt-6 hidden">
              <Button
                size="icon"
                disabled={slideConfig.isBeginning}
                className="p-2 rounded-full bg-gray-300 hover:bg-gray-400 dark:bg-gray-700 dark:hover:bg-gray-600 transition"
                onClick={(event) => {
                  event.preventDefault();
                  swiper?.slidePrev();
                }}
                aria-label="Previous Image"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-6 h-6 text-gray-900 dark:text-gray-100"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15 19l-7-7 7-7"
                  />
                </svg>
              </Button>
              <Button
                size="icon"
                disabled={slideConfig.isEnd}
                className="p-2 rounded-full bg-gray-300 hover:bg-gray-400 dark:bg-gray-700 dark:hover:bg-gray-600 transition"
                onClick={(event) => {
                  event.preventDefault();
                  swiper?.slideNext();
                }}
                aria-label="Next Image"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-6 h-6 text-gray-900 dark:text-gray-100"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </Button>
            </div>
          </div>
        </main>
      </div>
    </section>
  );
};

export default AboutMe;
