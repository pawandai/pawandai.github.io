"use client";

import Image from "next/image";
import Link from "next/link";
import {
  Menu,
  Twitter,
  Linkedin,
  Github,
  Sun,
  Moon,
  ExternalLink,
  ArrowRight,
  X,
  ChevronLeft
} from "lucide-react";
import { Button, buttonVariants } from "@/components/ui/button";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import {
  fadeIn,
  fadeInUp,
  staggerContainer,
  slideInLeft,
  slideInRight,
  springScale,
  rotateIn
} from "@/utils/animations";

// Sample project data
const projectsData = [
  {
    id: 1,
    title: "AI Chatbot",
    description: "A conversational AI chatbot powered by machine learning",
    image: "/placeholder.svg?height=400&width=400&text=Project 1",
    link: "#"
  },
  {
    id: 2,
    title: "Data Visualization Dashboard",
    description: "Interactive dashboard for complex data visualization",
    image: "/placeholder.svg?height=400&width=400&text=Project 2",
    link: "#"
  },
  {
    id: 3,
    title: "E-commerce Platform",
    description: "Full-stack e-commerce solution with payment integration",
    image: "/placeholder.svg?height=400&width=400&text=Project 3",
    link: "#"
  },
  {
    id: 4,
    title: "Personal Finance App",
    description: "Mobile app for tracking personal expenses and budgeting",
    image: "/placeholder.svg?height=400&width=400&text=Project 4",
    link: "#"
  },
  {
    id: 5,
    title: "Social Media Analytics",
    description: "Tool for analyzing social media engagement and metrics",
    image: "/placeholder.svg?height=400&width=400&text=Project 5",
    link: "#"
  },
  {
    id: 6,
    title: "Fitness Tracking System",
    description: "Wearable integration for comprehensive fitness data",
    image: "/placeholder.svg?height=400&width=400&text=Project 6",
    link: "#"
  }
];

const AnimatedSection = ({
  children,
  id,
  className
}: {
  children: React.ReactNode;
  id: string;
  className: string;
}) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  return (
    <motion.section
      id={id}
      ref={ref}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={fadeInUp}
      className={`scroll-mt-16 ${className}`}
    >
      {children}
    </motion.section>
  );
};

export default function Portfolio() {
  const [theme, setTheme] = useState("dark");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isProjectsExpanded, setIsProjectsExpanded] = useState(false);

  // Reference to the projects section for scrolling
  const projectsSectionRef = useRef<HTMLDivElement>(null);

  // Prevent scrolling on body when projects are expanded
  useEffect(() => {
    if (isProjectsExpanded) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isProjectsExpanded]);

  // Initialize theme from localStorage or system preference
  useEffect(() => {
    const savedTheme =
      localStorage.getItem("theme") ||
      (window.matchMedia("(prefers-color-scheme: dark)").matches
        ? "dark"
        : "light");
    setTheme(savedTheme);
    document.documentElement.classList.toggle("dark", savedTheme === "dark");
  }, []);

  // Toggle theme function
  const toggleTheme = () => {
    const newTheme = theme === "dark" ? "light" : "dark";
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
    document.documentElement.classList.toggle("dark", newTheme === "dark");
  };

  // Scroll to top of projects section when expanded
  useEffect(() => {
    if (isProjectsExpanded && projectsSectionRef.current) {
      projectsSectionRef.current.scrollTop = 0;
    }
  }, [isProjectsExpanded]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen bg-white dark:bg-gray-950 text-gray-900 dark:text-white p-4 md:p-6 transition-colors duration-200"
    >
      {/* Mobile Menu Overlay with Animation */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 bg-purple-950/90 z-50 lg:hidden flex flex-col items-center justify-center"
          >
            <Button
              variant="ghost"
              size="icon"
              className="absolute top-4 right-4 text-white"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              ✕
            </Button>
            <motion.nav
              variants={staggerContainer}
              initial="hidden"
              animate="visible"
              className="flex flex-col items-center gap-6 text-white text-xl"
            >
              {["about", "projects", "experience", "stack", "contact"].map(
                (item, index) => (
                  <motion.div key={item} variants={fadeInUp}>
                    <Link
                      href={`#${item}`}
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      {item.charAt(0).toUpperCase() + item.slice(1)}
                    </Link>
                  </motion.div>
                )
              )}
            </motion.nav>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.header
        variants={fadeIn}
        initial="hidden"
        animate="visible"
        className="flex justify-between items-center mb-8"
      >
        <motion.div
          variants={slideInLeft}
          initial="hidden"
          animate="visible"
          className="flex items-center gap-4"
        >
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="relative w-[60px] h-[60px] rounded-full overflow-hidden bg-purple-100 dark:bg-purple-900 flex items-center justify-center"
          >
            <Image
              src="/images/profile.jpg"
              alt="Profile"
              width={60}
              height={60}
              className="rounded-full"
            />
          </motion.div>
          <div>
            <motion.h1 variants={fadeInUp} className="text-2xl font-mono">
              PAWAN AWASTHI
            </motion.h1>
            <motion.p
              variants={fadeInUp}
              className="text-gray-600 dark:text-gray-400"
            >
              SOFTWARE ENGINEER
            </motion.p>
          </div>
        </motion.div>
        <motion.div
          variants={slideInRight}
          initial="hidden"
          animate="visible"
          className="flex items-center gap-2"
        >
          <motion.div whileTap={{ scale: 0.9 }}>
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleTheme}
              className="rounded-full hover:bg-purple-100 dark:hover:bg-purple-900/50"
            >
              <AnimatePresence mode="wait">
                <motion.div
                  key={theme}
                  initial={{ opacity: 0, rotate: -90 }}
                  animate={{ opacity: 1, rotate: 0 }}
                  exit={{ opacity: 0, rotate: 90 }}
                  transition={{ duration: 0.3 }}
                >
                  {theme === "dark" ? (
                    <Sun className="h-5 w-5" />
                  ) : (
                    <Moon className="h-5 w-5" />
                  )}
                </motion.div>
              </AnimatePresence>
            </Button>
          </motion.div>
          <motion.div whileTap={{ scale: 0.9 }}>
            <Link
              className={`${buttonVariants({
                variant: "outline",
                size: "lg"
              })} hover:bg-purple-100 dark:hover:bg-purple-900/50 border-2 border-purple-900 dark:border-purple-700 ml-2`}
              href="https://blog.pawanawasthi.com.np"
              target="_blank"
            >
              Blog <ExternalLink className="h-5 w-5" />
            </Link>
          </motion.div>
        </motion.div>
      </motion.header>

      <div className="grid grid-cols-1 lg:grid-cols-[350px_1fr] gap-8 relative">
        {/* Left Sidebar */}
        <motion.div
          variants={fadeInUp}
          initial="hidden"
          animate="visible"
          transition={{ delay: 0.2 }}
          className={`space-y-8 lg:sticky lg:top-6 lg:self-start lg:max-h-[calc(100vh-3rem)] ${
            isProjectsExpanded ? "z-0" : "z-10"
          }`}
        >
          <div className="space-y-6">
            <motion.p
              variants={fadeInUp}
              className="text-gray-700 dark:text-gray-300 text-lg leading-relaxed"
            >
              I'm a passionate Software Engineer and Content Creator currently
              focused on AI, ML and Data Science. I love working on projects
              involving real world problems. I'm constantly iterating on my
              craft, whether it's optimizing code, designing user experiences,
              or creating engaging content. I believe in the power of technology
              to transform lives and I'm excited to be a part of that journey.
            </motion.p>
            <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
              <Button
                variant="outline"
                className="rounded-full border-purple-300 dark:border-purple-700 hover:bg-purple-50 dark:hover:bg-purple-900/50"
              >
                More about Me
              </Button>
            </motion.div>
          </div>

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
            className="space-y-4"
          >
            <motion.div variants={staggerContainer} className="flex gap-4">
              {[
                {
                  icon: <Twitter className="w-5 h-5" />,
                  href: "https://x.com/paw1awasthi"
                },
                {
                  icon: <Linkedin className="w-5 h-5" />,
                  href: "https://www.linkedin.com/in/pawandai/"
                },
                {
                  icon: <Github className="w-5 h-5" />,
                  href: "https://github.com/pawandai"
                }
              ].map((social, i) => (
                <motion.div
                  key={i}
                  variants={fadeInUp}
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <Button
                    variant="ghost"
                    size="icon"
                    asChild
                    className="rounded-full hover:bg-purple-100 dark:hover:bg-purple-900/50"
                  >
                    <Link href={social.href}>{social.icon}</Link>
                  </Button>
                </motion.div>
              ))}
            </motion.div>
            <motion.div
              variants={fadeInUp}
              className="text-gray-600 dark:text-gray-400 text-sm"
            >
              <p>&copy; {new Date().getFullYear()} Pawan Dai.</p>
            </motion.div>
          </motion.div>
        </motion.div>

        {/* Right Content */}
        <motion.div
          variants={fadeIn}
          initial="hidden"
          animate="visible"
          transition={{ delay: 0.3 }}
          className="space-y-10 relative"
        >
          {/* Projects Section with Expansion */}
          <AnimatePresence>
            <motion.div
              id="projects"
              key="projects-section"
              ref={projectsSectionRef}
              layout
              transition={{
                layout: {
                  type: "spring",
                  damping: 25,
                  stiffness: 300
                }
              }}
              className={`
                scroll-mt-16 relative
                ${
                  isProjectsExpanded
                    ? "fixed inset-0 z-50 p-6 overflow-y-auto"
                    : "relative z-10"
                }
              `}
            >
              {/* Backdrop blur when expanded */}
              {isProjectsExpanded && (
                <motion.div
                  initial={{ opacity: 0, backdropFilter: "blur(0px)" }}
                  animate={{ opacity: 1, backdropFilter: "blur(8px)" }}
                  exit={{ opacity: 0, backdropFilter: "blur(0px)" }}
                  transition={{ duration: 0.3 }}
                  className="absolute inset-0 bg-black/50 -z-10"
                  onClick={() => setIsProjectsExpanded(false)}
                />
              )}

              {/* Projects content container with elevation */}
              <motion.div
                layout
                className={`
                  bg-white dark:bg-gray-900 rounded-xl p-6
                  ${
                    isProjectsExpanded
                      ? "mx-auto max-w-6xl my-8 overflow-hidden shadow-2xl"
                      : ""
                  }
                `}
              >
                <div className="flex justify-between items-center mb-4">
                  <motion.h2
                    layout="position"
                    variants={slideInLeft}
                    className="text-2xl font-mono"
                  >
                    My Projects
                  </motion.h2>
                  <motion.div
                    layout="position"
                    variants={slideInRight}
                    whileHover={{ x: isProjectsExpanded ? -5 : 5 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Button
                      variant="ghost"
                      size="icon"
                      className="hover:bg-purple-100 dark:hover:bg-purple-900/50"
                      onClick={() => setIsProjectsExpanded(!isProjectsExpanded)}
                    >
                      <span className="sr-only">
                        {isProjectsExpanded
                          ? "Collapse projects"
                          : "View all projects"}
                      </span>
                      {isProjectsExpanded ? (
                        <ChevronLeft className="h-5 w-5" />
                      ) : (
                        <ArrowRight className="h-5 w-5" />
                      )}
                    </Button>
                  </motion.div>
                </div>

                <motion.div
                  layout
                  variants={staggerContainer}
                  className={`grid grid-cols-1 sm:grid-cols-2 ${
                    isProjectsExpanded ? "md:grid-cols-3" : ""
                  } gap-4 md:gap-6`}
                >
                  {(isProjectsExpanded
                    ? projectsData
                    : projectsData.slice(0, 3)
                  ).map((project, i) => (
                    <motion.div
                      key={project.id}
                      layout
                      variants={fadeInUp}
                      whileHover={{ y: -5 }}
                      className={`
                        bg-gray-50 dark:bg-gray-800 rounded-lg overflow-hidden flex flex-col
                        ${isProjectsExpanded ? "h-auto" : "aspect-square"}
                      `}
                    >
                      <div
                        className={`relative ${
                          isProjectsExpanded ? "h-48" : "h-full"
                        }`}
                      >
                        <Image
                          src={project.image}
                          alt={project.title}
                          fill
                          className="object-cover transition-transform duration-300 group-hover:scale-105"
                        />
                        {!isProjectsExpanded && (
                          <motion.div
                            initial={{ opacity: 0 }}
                            whileHover={{ opacity: 1 }}
                            className="absolute inset-0 bg-purple-900/70 flex items-center justify-center"
                          >
                            <motion.div
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}
                            >
                              <Button
                                variant="outline"
                                className="text-white border-white hover:bg-purple-800"
                                onClick={() => setIsProjectsExpanded(true)}
                              >
                                View Project
                              </Button>
                            </motion.div>
                          </motion.div>
                        )}
                      </div>

                      {isProjectsExpanded && (
                        <div className="p-4 flex-1 flex flex-col">
                          <h3 className="text-xl font-bold mb-2 text-gray-900 dark:text-white">
                            {project.title}
                          </h3>
                          <p className="text-gray-600 dark:text-gray-400 mb-4 flex-1">
                            {project.description}
                          </p>
                          <motion.div
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                          >
                            <Button
                              asChild
                              variant="outline"
                              className="w-full border-purple-300 dark:border-purple-700 hover:bg-purple-50 dark:hover:bg-purple-900/50"
                            >
                              <Link href={project.link}>
                                View Details{" "}
                                <ArrowRight className="ml-2 h-4 w-4" />
                              </Link>
                            </Button>
                          </motion.div>
                        </div>
                      )}
                    </motion.div>
                  ))}
                </motion.div>
              </motion.div>
            </motion.div>
          </AnimatePresence>

          {/* Work Experience Section - only visible when projects not expanded */}
          <AnimatedSection
            id="experience"
            className={`transition-opacity duration-300 ${
              isProjectsExpanded ? "opacity-0" : "opacity-100"
            }`}
          >
            <div className="flex justify-between items-center mb-6">
              <motion.h2 variants={slideInLeft} className="text-2xl font-mono">
                Work Experience
              </motion.h2>
              <motion.div
                variants={slideInRight}
                whileHover={{ x: 5 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button
                  variant="ghost"
                  size="icon"
                  className="hover:bg-purple-100 dark:hover:bg-purple-900/50"
                >
                  <span className="sr-only">View all experience</span>→
                </Button>
              </motion.div>
            </div>
            <motion.div variants={staggerContainer} className="space-y-8">
              {[
                {
                  role: "Senior Product Designer",
                  company: "Design Studio X",
                  period: "2022 - Present",
                  description:
                    "Led the redesign of multiple flagship products, resulting in a 40% increase in user engagement and a significant improvement in customer satisfaction scores."
                },
                {
                  role: "UI/UX Designer",
                  company: "Tech Innovations Inc.",
                  period: "2019 - 2022",
                  description:
                    "Collaborated with cross-functional teams to create intuitive user interfaces for web and mobile applications, focusing on accessibility and user-centered design principles."
                },
                {
                  role: "Junior Designer",
                  company: "Creative Agency",
                  period: "2017 - 2019",
                  description:
                    "Assisted in the development of visual identities and digital experiences for various clients across different industries."
                }
              ].map((job, index) => (
                <motion.div
                  key={index}
                  variants={fadeInUp}
                  whileHover={{ x: 5 }}
                  className="relative pl-8 border-l-2 border-gray-200 dark:border-gray-800"
                >
                  <motion.div
                    variants={springScale}
                    initial="initial"
                    animate="animate"
                    className="absolute left-[-9px] top-0 w-4 h-4 rounded-full bg-purple-600 dark:bg-purple-500"
                  ></motion.div>
                  <div className="mb-1 flex flex-col sm:flex-row sm:justify-between sm:items-center">
                    <h3 className="font-bold text-lg">{job.role}</h3>
                    <span className="text-sm text-gray-600 dark:text-gray-400">
                      {job.period}
                    </span>
                  </div>
                  <p className="text-gray-700 dark:text-gray-300 mb-2">
                    {job.company}
                  </p>
                  <p className="text-gray-600 dark:text-gray-400">
                    {job.description}
                  </p>
                </motion.div>
              ))}
            </motion.div>
          </AnimatedSection>

          {/* Stack Section - only visible when projects not expanded */}
          <AnimatedSection
            id="stack"
            className={`bg-gradient-to-r from-purple-600 to-purple-700 dark:from-purple-800 dark:to-purple-900 rounded-xl p-6 transition-opacity duration-300 ${
              isProjectsExpanded ? "opacity-0" : "opacity-100"
            }`}
          >
            <div className="flex justify-between items-center mb-4">
              <motion.h2
                variants={slideInLeft}
                className="text-2xl font-mono text-white"
              >
                My Stack
              </motion.h2>
              <motion.div
                variants={slideInRight}
                whileHover={{ x: 5 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button
                  variant="ghost"
                  size="icon"
                  className="text-white hover:bg-purple-700/50"
                >
                  <span className="sr-only">View all tools</span>→
                </Button>
              </motion.div>
            </div>
            <motion.div
              variants={staggerContainer}
              className="flex flex-wrap gap-4"
            >
              {[
                { name: "Figma", icon: "F" },
                { name: "Adobe XD", icon: "XD" },
                { name: "Sketch", icon: "S" },
                { name: "Photoshop", icon: "Ps" },
                { name: "Illustrator", icon: "Ai" }
              ].map((tool, i) => (
                <motion.div
                  key={i}
                  variants={rotateIn}
                  whileHover={{
                    scale: 1.1,
                    rotate: 5,
                    boxShadow:
                      "0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)"
                  }}
                  whileTap={{ scale: 0.95 }}
                  className="w-16 h-16 bg-white rounded-xl flex items-center justify-center font-bold text-purple-800"
                >
                  {tool.icon}
                </motion.div>
              ))}
            </motion.div>
          </AnimatedSection>

          {/* Contact Section - only visible when projects not expanded */}
          <AnimatedSection
            id="contact"
            className={`relative overflow-hidden rounded-xl bg-gradient-to-br from-gray-100 to-purple-100 dark:from-gray-900 dark:to-purple-950 p-6 transition-opacity duration-300 ${
              isProjectsExpanded ? "opacity-0" : "opacity-100"
            }`}
          >
            <motion.h2 variants={fadeInUp} className="text-2xl font-mono mb-4">
              Contact
            </motion.h2>
            <motion.p
              variants={fadeInUp}
              className="max-w-md mb-4 text-gray-700 dark:text-gray-300"
            >
              Interested in working together? Feel free to reach out for
              collaborations or just a friendly hello.
            </motion.p>
            <motion.p variants={fadeInUp} className="font-medium">
              tony@example.com
            </motion.p>
            <motion.div
              variants={slideInRight}
              whileHover={{ x: 5, scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button
                variant="ghost"
                size="icon"
                className="absolute right-4 top-4 hover:bg-purple-200/50 dark:hover:bg-purple-800/50"
              >
                <span className="sr-only">Contact me</span>→
              </Button>
            </motion.div>
          </AnimatedSection>
        </motion.div>
      </div>
    </motion.div>
  );
}
