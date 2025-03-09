"use client";

import data from "@/data/index.json";
import { Button, buttonVariants } from "@/components/ui/button";
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
import { ExternalLink, Menu } from "lucide-react";

interface HeaderProps {
  handleWorkScroll?: () => void;
  handleAboutScroll?: () => void;
  handleContactScroll?: () => void;
  handleProjectsScroll?: () => void;
  handleSkillsScroll?: () => void;
  isBlog?: boolean;
  page?: string;
  className?: string;
}

const Header = ({
  handleWorkScroll,
  // handleAboutScroll,
  handleContactScroll,
  handleProjectsScroll,
  handleSkillsScroll,
  className,
}: HeaderProps) => {
  const { theme } = useTheme();

  const { showBlog, showResume } = data;

  return (
    <div
      className={`mt-6 py-4 backdrop-blur-md bg-transparent sticky ${
        theme === "light" ? "bg-white/90" : "bg-slate-800/90"
      } dark:text-white top-0 z-20 ${className} border-b border-gray-200 dark:border-gray-700`}
    >
      {/* Desktop Navbar */}
      <div className="hidden md:flex items-center justify-center mx-auto">
        <div className="flex gap-2">
          <Link href="/" className={buttonVariants({ variant: "ghost" })}>
            Home
          </Link>
          <Button variant="ghost" onClick={handleWorkScroll}>
            Work
          </Button>
          <Button variant="ghost" onClick={handleSkillsScroll}>
            Skills
          </Button>
          <Button variant="ghost" onClick={handleProjectsScroll}>
            Projects
          </Button>
          {/* <Button variant="ghost" onClick={handleAboutScroll}>
              About
            </Button> */}
          {showBlog && (
            <Link
              href="https://blog.pawanawasthi.com.np/"
              target="_blank"
              className={`${buttonVariants({
                variant: "outline",
              })} border-2 border-purple-600`}
            >
              Blog &nbsp; <ExternalLink className="h-4 w-4" />
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
              className={`${buttonVariants({
                variant: "outline",
              })} dark:border dark:border-black`}
            >
              Resume
            </Link>
          )}
          {/* {mounted && theme && data.darkMode && (
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
          )} */}
        </div>
      </div>

      {/* Mobile Navbar */}
      <div className="md:hidden sm:px-10 px-2 flex items-center gap-2 justify-between">
        <Button variant="outline" onClick={handleContactScroll}>
          Contact
        </Button>
        <div className="flex items-center justify-center gap-4">
          {/* {mounted && theme && data.darkMode && (
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
          )} */}
          <Sheet>
            <SheetTrigger asChild>
              <Menu className="h-6 w-6" />
            </SheetTrigger>
            <SheetContent
              className="bg-white dark:bg-gray-900 !z-[110]"
              side="left"
            >
              <SheetHeader>
                <SheetTitle>{"<pawandai />"}</SheetTitle>
              </SheetHeader>
              <div className="py-4">
                <div className="flex flex-col items-center justify-center gap-2">
                  <SheetClose asChild>
                    <Button variant="ghost" onClick={handleWorkScroll}>
                      Work
                    </Button>
                  </SheetClose>
                  <SheetClose asChild>
                    <Button variant="ghost" onClick={handleSkillsScroll}>
                      Skills
                    </Button>
                  </SheetClose>
                  <SheetClose asChild>
                    <Button variant="ghost" onClick={handleProjectsScroll}>
                      Projects
                    </Button>
                  </SheetClose>
                  {/* <SheetClose asChild>
                      <Button variant="ghost" onClick={handleAboutScroll}>
                        About
                      </Button>
                    </SheetClose> */}
                  {showBlog && (
                    <Link
                      href="https://blog.pawanawasthi.com.np/"
                      target="_blank"
                      className={`${buttonVariants({
                        variant: "outline",
                      })} border-2 border-purple-600`}
                    >
                      Blog &nbsp; <ExternalLink className="h-4 w-4" />
                    </Link>
                  )}
                  <SheetClose asChild>
                    <Button variant="ghost" onClick={handleContactScroll}>
                      Contact
                    </Button>
                  </SheetClose>
                  {showResume && (
                    <SheetClose asChild>
                      <Link
                        href="/resume.pdf"
                        target="_blank"
                        download="Pawan_Awasthi_resume"
                        className={`${buttonVariants({
                          variant: "outline",
                        })} dark:border dark:border-black`}
                      >
                        Resume
                      </Link>
                    </SheetClose>
                  )}
                  {/* {mounted && theme && data.darkMode && (
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
                  )} */}
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </div>
  );
};

export default Header;
