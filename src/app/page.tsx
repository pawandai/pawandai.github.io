"use client";

import { useRef } from "react";
import Link from "next/link";
import data from "@/data/index.json";
import { useIsomorphicLayoutEffect } from "@/lib/utils";
import Header from "@/components/shared/header";
import { Button } from "@/components/ui/button";
import { MapPin } from "lucide-react";
import { stagger } from "@/animations";
import Container from "@/components/ui/container";
import Socials from "@/components/shared/socials";
import Profile from "@/components/shared/image/profile";
import Typography from "@/components/ui/typography";

export default function Home() {
  // Refs
  const workRef = useRef<HTMLDivElement>(null);
  const aboutRef = useRef<HTMLDivElement>(null);
  const contactRef = useRef<HTMLDivElement>(null);
  const textOne = useRef<HTMLHeadingElement>(null);
  const textTwo = useRef<HTMLHeadingElement>(null);
  const textThree = useRef<HTMLHeadingElement>(null);

  // Handling Scroll
  const handleWorkScroll = () => {
    window.scrollTo({
      top: workRef?.current?.offsetTop,
      left: 0,
      behavior: "smooth",
    });
  };

  const handleAboutScroll = () => {
    window.scrollTo({
      top: aboutRef?.current?.offsetTop,
      left: 0,
      behavior: "smooth",
    });
  };

  const handleContactScroll = () => {
    window.scrollTo({
      top: contactRef?.current?.offsetTop,
      left: 0,
      behavior: "smooth",
    });
  };

  useIsomorphicLayoutEffect(() => {
    stagger(
      [textOne.current, textTwo.current],
      { y: 40, x: -10, transform: "scale(0.95) skew(10deg)" },
      { y: 0, x: 0, transform: "scale(1)" }
    );
  }, []);

  return (
    <>
      <Header
        handleWorkScroll={handleWorkScroll}
        handleAboutScroll={handleAboutScroll}
        handleContactScroll={handleContactScroll}
      />
      <Container className="relative">
        <div className="gradient-circle" />
        <div className="gradient-circle-bottom" />

        <div className="container mx-auto mb-10">
          {/* Hero Section */}
          <div className="flex flex-col-reverse px-2 md:flex-row items-center justify-between">
            <div className="lg:mt-20 mt-10 flex-1">
              <div className="my-5">
                <h1
                  ref={textOne}
                  className="text-3xl md:text-4xl  xl:text-5xl p-1 md:p-2 text-bold w-4/5 sm:w-full lg:w-4/5"
                >
                  {data.headerTaglineOne}
                </h1>
                <h1
                  ref={textTwo}
                  className="text-3xl md:text-4xl  xl:text-5xl p-1 md:p-2 text-bold w-full lg:w-4/5"
                >
                  {data.headerTaglineTwo}
                </h1>
                <h1
                  ref={textThree}
                  className="text-3xl md:text-4xl  xl:text-5xl p-1 md:p-2 text-bold w-full lg:w-4/5"
                >
                  {data.headerTaglineThree}
                </h1>
              </div>
              <p className="flex items-center gap-2">
                <MapPin className="h-6 w-6" />
                <span className="font-medium">{data.location}</span>
              </p>
              <Socials className="my-2 lg:my-5" />

              <div className="flex items-center gap-2">
                <div className="flex h-6 w-6 items-center justify-center">
                  <span className="relative flex h-3 w-3">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75"></span>
                    <span className="relative inline-flex h-3 w-3 rounded-full bg-emerald-500"></span>
                  </span>
                </div>
                <Typography>Available</Typography>
              </div>
            </div>
            <Profile />
          </div>

          {/* Education and Work Section */}
          <Container
            ref={workRef}
            className="relative py-8 mt-4 sm:py-4 md:mt-12 px-4"
          >
            <div className="absolute inset-0 bg-muted/40 z-0 rounded-xl" />
            <div className="relative z-[5] grid gap-8">
              <div className="grid gap-8">
                <Typography variant="h3">Work and Education</Typography>
                <div className="flex flex-col md:flex-row justify-between">
                  {/* Education */}
                  <div className="flex flex-auto flex-col gap-4 relative pl-6 after:absolute after:inset-y-0 after:left-0 after:w-px after:bg-muted-foreground/40">
                    <Typography variant="subtitle" className="font-semibold">
                      Education
                    </Typography>
                    <div className="flex flex-col gap-2 text-sm relative">
                      <div className="aspect-square w-3 bg-primary rounded-full absolute left-0 translate-x-[-29.5px] z-10 top-1" />
                      <div className="font-medium">2019 - 2021</div>
                      <div className="font-medium">High School, ISc</div>
                      <div className="text-muted-foreground">
                        National Academy of Science and Technology, Dhangadhi
                      </div>
                    </div>
                    <div className="flex flex-col gap-2 text-sm relative">
                      <div className="aspect-square w-3 bg-primary rounded-full absolute left-0 translate-x-[-29.5px] z-10 top-1" />
                      <div className="font-medium">2022 - 2026</div>
                      <div className="font-medium">
                        Bachelors in Engineering
                      </div>
                      <div className="text-muted-foreground">
                        IOE Purwanchal Campus, Dharan
                      </div>
                    </div>
                  </div>
                  {/* Work Experience */}
                  <div className="flex flex-auto flex-col gap-4 relative pl-6 after:absolute after:inset-y-0 after:left-0 after:w-px after:bg-muted-foreground/40 mt-8 md:mt-0">
                    <Typography variant="subtitle" className="font-semibold">
                      Work
                    </Typography>
                    <div className="flex flex-col gap-2 text-sm relative">
                      <div className="aspect-square w-3 bg-primary rounded-full absolute left-0 translate-x-[-29.5px] z-10 top-1" />
                      <div className="font-medium">Oct 2023 - Jan 2024</div>
                      <div className="font-medium">Frontend Developer</div>
                      <div className="text-muted-foreground">
                        at Native Plug, Kathmandu
                      </div>
                    </div>
                    <div className="flex flex-col gap-2 text-sm relative">
                      <div className="aspect-square w-3 bg-primary rounded-full absolute left-0 translate-x-[-29.5px] z-10 top-1" />
                      <div className="font-medium">Jul 2023 - Present</div>
                      <div className="font-medium">React Native Developer</div>
                      <div className="text-muted-foreground">
                        at Startek, Australia
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Container>
          {/* This button should not go into production */}
          {process.env.NODE_ENV === "development" && (
            <div className="fixed bottom-5 right-5">
              <Link href="/edit">
                <Button>Edit Data</Button>
              </Link>
            </div>
          )}
          <div className="mt-10 lg:mt-40 p-2 lg:p-0" ref={aboutRef}>
            <h1 className="md:m-10 text-2xl text-bold">About.</h1>
            <p className="md:m-10 mt-2 text-xl lg:text-3xl w-full lg:w-3/5">
              {data.aboutpara}
            </p>
          </div>
          {/* Contact Section */}
          <div ref={contactRef}>
            This is contact section which will be added later
          </div>
        </div>
      </Container>
    </>
  );
}
