"use client";

import { useRef } from "react";
import Link from "next/link";
import data from "@/data/index.json";
import Header from "@/components/shared/header";
import { Button } from "@/components/ui/button";
import { MapPin } from "lucide-react";
import { stagger } from "@/animations";
import Container from "@/components/ui/container";
import Socials from "@/components/shared/socials";
import Profile from "@/components/shared/image/profile";
import Typography from "@/components/ui/typography";
import { useIsomorphicLayoutEffect } from "@/lib/lib";
import Contact from "@/components/shared/contact";
import Footer from "@/components/shared/footer";
import { Separator } from "@/components/ui/separator";
import ScrollToTop from "@/components/shared/scrollToTop";
import Projects from "@/components/shared/projects";
import Image from "next/image";
import { SKILLS } from "@/constants";

export default function Home() {
  // Refs
  const workRef = useRef<HTMLDivElement>(null);
  const aboutRef = useRef<HTMLDivElement>(null);
  const contactRef = useRef<HTMLDivElement>(null);
  const projectsRef = useRef<HTMLDivElement>(null);
  const skillsRef = useRef<HTMLDivElement>(null);
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

  const handleProjectsScroll = () => {
    window.scrollTo({
      top: projectsRef?.current?.offsetTop,
      left: 0,
      behavior: "smooth",
    });
  };

  const handleSkillsScroll = () => {
    window.scrollTo({
      top: skillsRef?.current?.offsetTop,
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
        handleProjectsScroll={handleProjectsScroll}
        handleSkillsScroll={handleSkillsScroll}
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
                  className="text-3xl md:text-4xl xl:text-5xl p-1 md:p-2 font-bold w-4/5 sm:w-full lg:w-4/5 text-gray-900 dark:text-gray-100"
                >
                  {data.headerTaglineOne}
                </h1>
                <h1
                  ref={textTwo}
                  className="text-3xl md:text-4xl xl:text-5xl p-1 md:p-2 font-bold w-full lg:w-4/5 text-gray-900 dark:text-gray-100"
                >
                  {data.headerTaglineTwo}
                </h1>
                <h1
                  ref={textThree}
                  className="text-3xl md:text-4xl xl:text-5xl p-1 md:p-2 font-bold w-full lg:w-4/5 text-gray-900 dark:text-gray-100"
                >
                  {data.headerTaglineThree}
                </h1>
              </div>
              <p className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
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
                <Typography className="text-gray-900 dark:text-gray-100">
                  Open To Offers
                </Typography>
              </div>
            </div>
            <Profile />
          </div>

          {/* Education and Work Section */}
          <Container
            ref={workRef}
            className="relative py-8 mt-4 sm:py-4 md:mt-12 px-4"
          >
            <div className="relative z-[5] grid gap-8">
              <div className="grid gap-8">
                <Typography
                  variant="h3"
                  className="text-gray-900 dark:text-gray-100"
                >
                  Work and Education
                </Typography>
                <div className="flex flex-col md:flex-row justify-between border p-8 rounded-xl border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800">
                  {/* Education */}
                  <div className="flex flex-auto flex-col gap-4 relative pl-6 after:absolute after:inset-y-0 after:left-0 after:w-[2px] after:bg-gray-300 dark:after:bg-gray-700">
                    <Typography
                      variant="subtitle"
                      className="font-semibold text-gray-900 dark:text-gray-100"
                    >
                      Education
                    </Typography>
                    <div className="flex flex-col gap-2 text-sm relative">
                      <div className="aspect-square w-3 bg-gray-300 dark:bg-gray-700 rounded-full absolute left-0 translate-x-[-29.5px] z-10 top-1" />
                      <div className="font-semibold text-gray-900 dark:text-gray-100">
                        2019 - 2021
                      </div>
                      <div className="font-semibold text-gray-900 dark:text-gray-100">
                        High School, ISc
                      </div>
                      <div className="text-gray-600 dark:text-gray-400">
                        National Academy of Science and Technology, Dhangadhi
                      </div>
                    </div>
                    <div className="flex flex-col gap-2 text-sm relative">
                      <div className="aspect-square w-3 bg-gray-300 dark:bg-gray-700 rounded-full absolute left-0 translate-x-[-29.5px] z-10 top-1" />
                      <div className="font-semibold text-gray-900 dark:text-gray-100">
                        2022 - 2026
                      </div>
                      <div className="font-semibold text-gray-900 dark:text-gray-100">
                        Bachelors in Engineering
                      </div>
                      <div className="text-gray-600 dark:text-gray-400">
                        IOE Purwanchal Campus, Dharan
                      </div>
                    </div>
                  </div>
                  {/* Work Experience */}
                  <div className="flex flex-auto flex-col gap-4 relative pl-6 after:absolute after:inset-y-0 after:left-0 after:w-[2px] after:bg-gray-300 dark:after:bg-gray-700 mt-8 md:mt-0">
                    <Typography
                      variant="subtitle"
                      className="font-semibold text-gray-900 dark:text-gray-100"
                    >
                      Work
                    </Typography>
                    <div className="flex flex-col gap-2 text-sm relative">
                      <div className="aspect-square w-3 bg-gray-300 dark:bg-gray-700 rounded-full absolute left-0 translate-x-[-29.5px] z-10 top-1" />
                      <div className="font-semibold text-gray-900 dark:text-gray-100">
                        Oct 2023 - Jan 2024
                      </div>
                      <div className="font-semibold text-gray-900 dark:text-gray-100">
                        Frontend Developer
                      </div>
                      <div className="text-gray-600 dark:text-gray-400">
                        at Native Plug, Kathmandu
                      </div>
                    </div>
                    <div className="flex flex-col gap-2 text-sm relative">
                      <div className="aspect-square w-3 bg-gray-300 dark:bg-gray-700 rounded-full absolute left-0 translate-x-[-29.5px] z-10 top-1" />
                      <div className="font-semibold text-gray-900 dark:text-gray-100">
                        Jul 2023 - Present
                      </div>
                      <div className="font-semibold text-gray-900 dark:text-gray-100">
                        React Native Developer
                      </div>
                      <div className="text-gray-600 dark:text-gray-400">
                        at Startek, Australia
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Container>

          {/* Skills Section */}
          <Container className="mt-16" ref={skillsRef}>
            <h2 className="text-center text-2xl font-semibold text-gray-900 dark:text-gray-100">
              Skills
            </h2>
            <div className="flex flex-wrap justify-center gap-4 select-none">
              {SKILLS.map((skill, index) => (
                <div
                  key={index}
                  className="flex flex-col items-center gap-2 p-4 border rounded-lg border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 aspect-square group"
                >
                  <Image
                    src={skill.icon}
                    alt={skill.name.slice(0, 2).toUpperCase()}
                    width={100}
                    height={100}
                    className="group-hover:scale-110 transition-all ease-in-out duration-300"
                  />
                  <Typography variant="subtitle">{skill.name}</Typography>
                </div>
              ))}
            </div>
          </Container>

          {/* This button should not go into production */}
          {process.env.NODE_ENV === "development" && (
            <div className="fixed z-20 bottom-5 right-5">
              <Link href="/edit">
                <Button>Edit Data</Button>
              </Link>
            </div>
          )}

          {/* About section */}
          {/* <Container ref={aboutRef}>
            <AboutMe />
          </Container> */}

          {/* Projects Section */}
          <Container ref={projectsRef} className="mt-16 mx-2 sm:mx-0">
            <h2 className="text-center text-2xl font-semibold text-gray-900 dark:text-gray-100">
              Projects
            </h2>
            <Projects />
          </Container>

          {/* Contact Section */}
          <div ref={contactRef} className="mt-12">
            <Contact />
          </div>
        </div>
      </Container>
      <Separator />
      <Footer />
      <ScrollToTop />
    </>
  );
}
