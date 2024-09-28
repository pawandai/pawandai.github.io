"use client";

import { useEffect, useState } from "react";
import data from "@/data/index.json";
import { Button, buttonVariants } from "@/components/ui/button";
import Image from "next/image";
import { useTheme } from "next-themes";
import Link from "next/link";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Menu } from "lucide-react";

interface HeaderProps {
  handleWorkScroll?: () => void;
  handleAboutScroll?: () => void;
  handleContactScroll?: () => void;
  handleProjectsScroll?: () => void;
  isBlog?: boolean;
  page?: string;
  className?: string;
}

const Header = ({
  handleWorkScroll,
  handleAboutScroll,
  handleContactScroll,
  isBlog,
  className,
}: HeaderProps) => {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  const { showBlog, showResume } = data;

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div
      className={`mt-6 py-4 backdrop-blur-md bg-transparent sticky ${
        theme === "light" && "bg-white/90"
      } dark:text-white top-0 z-20 ${className} border-b`}
    >
      {/* Desktop Navbar */}
      <div className="hidden md:flex items-center justify-center mx-auto">
        {!isBlog ? (
          <div className="flex gap-2">
            <Link href="/" className={buttonVariants({ variant: "ghost" })}>
              Home
            </Link>
            <Button variant="ghost" onClick={handleWorkScroll}>
              Work
            </Button>
            <Button variant="ghost" onClick={handleAboutScroll}>
              About
            </Button>
            {showBlog && (
              <Link
                href="/blog"
                className={buttonVariants({ variant: "ghost" })}
              >
                Blog
              </Link>
            )}

            <Button variant="ghost" onClick={handleContactScroll}>
              Contact
            </Button>
            {showResume && (
              <Link
                href="/resume.pdf"
                target="_blank"
                download="Pawan_Awasthi_resume"
                className={buttonVariants({ variant: "outline" })}
              >
                Resume
              </Link>
            )}
            {mounted && theme && data.darkMode && (
              <Button
                variant="ghost"
                onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              >
                <Image
                  className="h-5 w-5"
                  src={`/images/${theme === "dark" ? "moon.svg" : "sun.svg"}`}
                  alt="Mode Switch"
                  height={500}
                  width={500}
                ></Image>
              </Button>
            )}
          </div>
        ) : (
          <div className="flex gap-2">
            <Link href="/" className={buttonVariants({ variant: "ghost" })}>
              Home
            </Link>
            {showResume && (
              <Link
                href="/resume"
                className={buttonVariants({ variant: "outline" })}
              >
                Resume
              </Link>
            )}

            {mounted && theme && data.darkMode && (
              <Button
                variant="ghost"
                onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              >
                <Image
                  className="h-5 w-5"
                  src={`/images/${theme === "dark" ? "moon.svg" : "sun.svg"}`}
                  alt="Mode Switch"
                  height={500}
                  width={500}
                />
              </Button>
            )}
          </div>
        )}
      </div>

      {/* Mobile Navbar */}
      <div className="md:hidden sm:px-10 px-2 flex items-center gap-2 justify-between">
        <Button variant="outline" onClick={handleWorkScroll}>
          Work
        </Button>
        <div className="flex items-center justify-center gap-4">
          {mounted && theme && data.darkMode && (
            <Button
              variant="ghost"
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            >
              <Image
                className="h-5 w-5"
                src={`/images/${theme === "dark" ? "moon.svg" : "sun.svg"}`}
                alt="Mode Switch"
                height={500}
                width={500}
              ></Image>
            </Button>
          )}
          <Sheet>
            <SheetTrigger asChild>
              <Menu className="h-6 w-6" />
            </SheetTrigger>
            <SheetContent className="bg-white !z-[110]" side="left">
              <SheetHeader>
                <SheetTitle>{"<pawandai />"}</SheetTitle>
              </SheetHeader>
              <div className="py-4">
                {!isBlog ? (
                  <div className="flex flex-col items-center justify-center gap-2">
                    <SheetClose asChild>
                      <Button variant="ghost" onClick={handleWorkScroll}>
                        Work
                      </Button>
                    </SheetClose>
                    <SheetClose asChild>
                      <Button variant="ghost" onClick={handleAboutScroll}>
                        About
                      </Button>
                    </SheetClose>
                    {showBlog && (
                      <SheetClose asChild>
                        <Link
                          href="/blog"
                          className={buttonVariants({ variant: "ghost" })}
                        >
                          Blog
                        </Link>
                      </SheetClose>
                    )}
                    <SheetClose asChild>
                      <Button variant="ghost" onClick={handleContactScroll}>
                        Contact
                      </Button>
                    </SheetClose>
                    {showResume && (
                      <SheetClose asChild>
                        <Link
                          href="/resume"
                          className={buttonVariants({ variant: "outline" })}
                        >
                          Resume
                        </Link>
                      </SheetClose>
                    )}
                    {mounted && theme && data.darkMode && (
                      <Button
                        variant="ghost"
                        onClick={() =>
                          setTheme(theme === "dark" ? "light" : "dark")
                        }
                      >
                        <Image
                          className="h-5 w-5"
                          src={`/images/${
                            theme === "dark" ? "moon.svg" : "sun.svg"
                          }`}
                          alt="Mode Switch"
                          height={500}
                          width={500}
                        ></Image>
                      </Button>
                    )}
                  </div>
                ) : (
                  <div className="flex flex-col gap-2">
                    <SheetClose asChild>
                      <Link
                        href="/"
                        className={buttonVariants({ variant: "ghost" })}
                      >
                        Home
                      </Link>
                    </SheetClose>
                    {showResume && (
                      <SheetClose asChild>
                        <Link
                          href="/resume"
                          className={buttonVariants({ variant: "outline" })}
                        >
                          Resume
                        </Link>
                      </SheetClose>
                    )}

                    {mounted && theme && data.darkMode && (
                      <Button
                        variant="ghost"
                        onClick={() =>
                          setTheme(theme === "dark" ? "light" : "dark")
                        }
                      >
                        <Image
                          className="h-5 w-5"
                          src={`/images/${
                            theme === "dark" ? "moon.svg" : "sun.svg"
                          }`}
                          alt="Mode Switch"
                          height={500}
                          width={500}
                        />
                      </Button>
                    )}
                  </div>
                )}
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </div>
  );
};

export default Header;
