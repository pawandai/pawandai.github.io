"use client";

import Image from "next/image";
import Link from "next/link";
import {
  Twitter,
  Linkedin,
  Github,
  Sun,
  Moon,
  ExternalLink,
  ArrowRight,
  X,
  Loader2,
  MapPin,
  Paperclip,
} from "lucide-react";
import { Button, buttonVariants } from "@/components/ui/button";
import { useState, useEffect, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  fadeIn,
  fadeInUp,
  staggerContainer,
  slideInLeft,
  slideInRight,
  springScale,
} from "@/utils/animations";
import ProjectCard from "@/components/ProjectCard";
import Typography from "@/components/ui/typography";

const projectsData = [
  {
    id: 1,
    title: "Stock Price Prediction with LSTM",
    imageUrls: [
      "/projects/stock_prediction/stock_price_1.png",
      "/projects/stock_prediction/stock_price_2.jpeg",
    ],
    tags: ["Data Scraping", "Deep Learning", "LSTM", "NLP"],
    description:
      "This research project aims to predict stock prices for select companies by combining historical financial data with sentiment analysis derived from news headlines. Leveraging a Long Short-Term Memory (LSTM) neural network and natural language processing (NLP), the application forecasts the next day's closing price while providing insights into model performance through error metrics and visualizations.",
    createdBy: [
      { id: 1, name: "pawandai", link: "https://github.com/pawandai" },
    ],
    createdAt: "6 Mar 2025",
    liveDemoUrl: "https://github.com/pawandai/stock-price-prediction",
    githubUrl: "https://github.com/pawandai/stock-price-prediction",
  },
  {
    id: 2,
    title: "Destination Australia",
    imageUrls: ["/projects/destination_aus/destination_aus.png"],
    tags: ["React", "React Native", "Google Cloud"],
    description:
      "This project's main goal is to help students from Nepal in Australia.",
    createdBy: [
      { id: 1, name: "pawandai", link: "https://github.com/pawandai" },
    ],
    createdAt: "In Development",
    liveDemoUrl: "https://destinationaus.com/",
    githubUrl: "https://destinationaus.com/",
  },
  {
    id: 3,
    title: "Autonomous Navigation with Deep Q Learning",
    imageUrls: [
      "/projects/autonomous_nav_bot/autonomous_nav_1.png",
      "/projects/autonomous_nav_bot/autonomous_nav_2.jpg",
      "/projects/autonomous_nav_bot/autonomous_nav_3.jpg",
      "/projects/autonomous_nav_bot/autonomous_nav_4.jpg",
    ],
    tags: ["DQL", "Simulation", "Python"],
    description:
      "This research project aims to development a simulation of an autonomous navigation bot using Deep Q Learning (DQL) that can navigate through unknown indoor environments while avoiding obstacles and reaching designated goals.",
    createdBy: [
      { id: 1, name: "pawandai", link: "https://github.com/pawandai" },
    ],
    createdAt: "12 Aug 2025",
    liveDemoUrl: "https://github.com/BEI078/autonomous-navigation-bot",
    githubUrl: "https://github.com/BEI078/autonomous-navigation-bot",
  },
];

const experienceData = [
  {
    id: 1,
    role: "Application Developer",
    company: "Startek Australia",
    period: "2024 - Present",
    description:
      "Developed the “Destination Australia” mobile application, ensuring smooth user experiences and performance. Built Web Blog pages and tools like PR Points Calculator, Explore Australia, University Finder, and English Class Tests. Utilized Firebase for database and authentication in React Native Application. Helped hundreds of foreign students and individuals living in Australia settle in Australia.",
  },
  {
    id: 2,
    role: "Software Developer",
    company: "Dev Distruct Pvt. Ltd.",
    period: "Jan 2025 - Apr 2025",
    description:
      "Developed a fast and scalable backend in Flask and MongoDB. Ensuring the responsiveness and performance of frontend in React and Typescript. Developed an AI-powered coding Platform using Python and Typescript. Collaborated with cross-functional teams of Senior Engineers and learned a lot from them.",
  },
  {
    id: 3,
    role: "Frontend Developer Intern",
    company: "Native Plug",
    period: "Oct 2023 - Jan 2024",
    description:
      "As a React Developer Intern at Native Plug, I involved in implementing UI components using React.js and Tailwind CSS",
  },
];

const stackData = [
  // ...existing code...
];

// Smooth animation settings
const smoothTransition = {
  type: "spring",
  stiffness: 150,
  damping: 25,
  duration: 0.3,
};

// Define section types for expanded state
type ExpandedSection =
  | "about"
  | "projects"
  | "experience"
  | "stack"
  | "contact"
  | null;

export default function Portfolio() {
  const [theme, setTheme] = useState("dark");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [expandedSection, setExpandedSection] = useState<ExpandedSection>(null);

  // New state for in-place expanded sections
  const [expandedStack, setExpandedStack] = useState(false);
  const [expandedContact, setExpandedContact] = useState(false);

  // Refs for expanded sections
  const sectionRefs = {
    about: useRef<HTMLDivElement>(null),
    projects: useRef<HTMLDivElement>(null),
    experience: useRef<HTMLDivElement>(null),
    stack: useRef<HTMLDivElement>(null),
    contact: useRef<HTMLDivElement>(null),
  };

  const contentRefs = {
    about: useRef<HTMLDivElement>(null),
    projects: useRef<HTMLDivElement>(null),
    experience: useRef<HTMLDivElement>(null),
    stack: useRef<HTMLDivElement>(null),
    contact: useRef<HTMLDivElement>(null),
  };

  // Contact form state
  const [contactForm, setContactForm] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<
    "idle" | "success" | "error"
  >("idle");
  const [errorMessage, setErrorMessage] = useState("");

  // Handle form input changes
  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setContactForm((prev) => ({ ...prev, [name]: value }));
  };

  // Submit contact form
  const handleSubmitContact = async (e: React.FormEvent) => {
    e.preventDefault();

    // Basic validation
    if (!contactForm.name || !contactForm.email || !contactForm.message) {
      setSubmitStatus("error");
      setErrorMessage("Please fill out all fields");
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus("idle");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: contactForm.name,
          email: contactForm.email,
          message: contactForm.message,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to send message");
      }

      // Clear form on success
      setContactForm({ name: "", email: "", message: "" });
      setSubmitStatus("success");
    } catch (error) {
      console.error("Error sending message:", error);
      setSubmitStatus("error");
      setErrorMessage("Failed to send message. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  // Helper functions
  const isExpanded = (section: ExpandedSection) => expandedSection === section;

  // Modified toggleSection to ensure About section has priority
  const toggleSection = (section: ExpandedSection) => {
    // If it's about section, always give it highest priority
    if (section === "about") {
      if (expandedSection === section) {
        setExpandedSection(null);
      } else {
        setExpandedSection("about");
      }
      return;
    }

    // Handle stack and contact differently (in-place expansion)
    if (section === "stack") {
      setExpandedStack(!expandedStack);
      return;
    }

    if (section === "contact") {
      setExpandedContact(!expandedContact);
      return;
    }

    // Normal elevation behavior for other sections
    if (expandedSection === section) {
      setExpandedSection(null);
    } else {
      setExpandedSection(section);
    }
  };

  // Scroll to top when expanding a section
  useEffect(() => {
    if (expandedSection && contentRefs[expandedSection]?.current) {
      contentRefs[expandedSection].current.scrollTop = 0;
    }
  }, [expandedSection]);

  // Control body scroll when a section is expanded
  useEffect(() => {
    if (expandedSection) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [expandedSection]);

  // Enhanced escape key handler - now using useCallback for optimization
  useEffect(() => {
    const handleEscKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        // Close expanded sections first
        if (expandedSection) {
          setExpandedSection(null);
          return;
        }

        // Close in-place expanded sections
        if (expandedStack) setExpandedStack(false);
        if (expandedContact) setExpandedContact(false);
      }
    };

    window.addEventListener("keydown", handleEscKey);
    return () => window.removeEventListener("keydown", handleEscKey);
  }, [expandedSection, expandedStack, expandedContact]);

  // Enhanced backdrop click handler for all elevated sections
  const handleBackdropClick = useCallback(
    (e: React.MouseEvent) => {
      if (
        expandedSection &&
        sectionRefs[expandedSection]?.current &&
        !sectionRefs[expandedSection].current.contains(e.target as Node)
      ) {
        setExpandedSection(null);
      }
    },
    [expandedSection, sectionRefs],
  );

  // Initialize theme from localStorage
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

  // Enhanced section expansion component with higher z-index for About
  const ExpandedSectionHeader = ({
    section,
    title,
    className = "",
  }: {
    section: ExpandedSection;
    title: string;
    className?: string;
  }) => (
    <motion.div
      layoutId={`${section}-header`}
      className={`
        flex justify-between items-center backdrop-blur-lg ${
          section === "about" ? "z-[150]" : "z-[100]"
        }
        ${
          isExpanded(section)
            ? "sticky top-0 p-6 border-b border-gray-200 dark:border-gray-800 bg-white/90 dark:bg-black/80"
            : "mb-4"
        }
        ${className}
      `}
    >
      <motion.h2 layoutId={`${section}-title`} className="text-2xl font-mono">
        {title}
      </motion.h2>
      <motion.div layoutId={`${section}-button`}>
        <Button
          variant="ghost"
          size="icon"
          className="hover:bg-purple-100 dark:hover:bg-purple-900/50 z-[100]"
          onClick={() => toggleSection(section)}
        >
          <AnimatePresence mode="wait">
            <motion.span
              key={isExpanded(section) ? "close" : "expand"}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.15 }}
            >
              {isExpanded(section) ? (
                <X className="h-5 w-5" />
              ) : (
                <ArrowRight className="h-5 w-5" />
              )}
            </motion.span>
          </AnimatePresence>
        </Button>
      </motion.div>
    </motion.div>
  );

  // Common overlay container with higher z-index for About
  const ExpandedSectionContainer = ({
    section,
    children,
    className = "",
  }: {
    section: ExpandedSection;
    children: React.ReactNode;
    className?: string;
  }) => (
    <motion.div
      layoutId={`${section}-container`}
      ref={section ? contentRefs[section] : undefined}
      className={`
        bg-transparent rounded-xl overflow-hidden transition-shadow
        ${
          isExpanded(section)
            ? "max-h-[85vh] w-full max-w-6xl mx-auto overflow-y-auto shadow-2xl"
            : ""
        }
        ${className}
      `}
      transition={smoothTransition}
    >
      {children}
    </motion.div>
  );

  // Add special handling for the About Me section
  const aboutRef = useRef<HTMLDivElement>(null);
  const [aboutExpanded, setAboutExpanded] = useState(false);

  // Separate toggle function for About Me to ensure it gets special treatment
  const toggleAbout = () => {
    setAboutExpanded(!aboutExpanded);
    // When expanding About, close any other expanded sections
    if (!aboutExpanded) {
      setExpandedSection(null);
      setExpandedStack(false);
      setExpandedContact(false);
    }
  };

  // Add escape key handler specifically for About
  useEffect(() => {
    const handleEscKey = (e: KeyboardEvent) => {
      if (e.key === "Escape" && aboutExpanded) {
        setAboutExpanded(false);
      }
    };

    window.addEventListener("keydown", handleEscKey);
    return () => window.removeEventListener("keydown", handleEscKey);
  }, [aboutExpanded]);

  // Handle body scroll lock when About is expanded
  useEffect(() => {
    if (aboutExpanded) {
      document.body.style.overflow = "hidden";
    } else if (!expandedSection) {
      // Only restore scroll if no other section is expanded
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [aboutExpanded, expandedSection]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen bg-white dark:bg-gray-950 text-gray-900 dark:text-white p-4 md:p-6 transition-colors duration-200 relative"
      onClick={expandedSection ? handleBackdropClick : undefined}
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
                ),
              )}
            </motion.nav>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Backdrop for expanded sections */}
      <AnimatePresence>
        {expandedSection && (
          <motion.div
            initial={{ opacity: 0, backdropFilter: "blur(0px)" }}
            animate={{ opacity: 1, backdropFilter: "blur(5px)" }}
            exit={{ opacity: 0, backdropFilter: "blur(0px)" }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 bg-black/40 z-[50]"
            onClick={() => setExpandedSection(null)}
          />
        )}
      </AnimatePresence>

      {/* Special About Me Backdrop - Highest z-index */}
      <AnimatePresence>
        {aboutExpanded && (
          <motion.div
            initial={{ opacity: 0, backdropFilter: "blur(0px)" }}
            animate={{ opacity: 1, backdropFilter: "blur(10px)" }}
            exit={{ opacity: 0, backdropFilter: "blur(0px)" }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 bg-black/70 z-[200]"
            onClick={() => setAboutExpanded(false)}
            style={{ pointerEvents: "auto" }}
          />
        )}
      </AnimatePresence>

      <motion.header
        variants={fadeIn}
        initial="hidden"
        animate="visible"
        className="flex justify-between items-center mb-8 z-10 relative"
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
          <div className="hidden lg:block">
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
                size: "lg",
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
            expandedSection || aboutExpanded
              ? "opacity-20 pointer-events-none"
              : "opacity-100"
          } transition-opacity duration-300`}
        >
          {/* About Me Section - COMPLETELY REWRITTEN */}
          <div className="space-y-6">
            <motion.p
              variants={fadeInUp}
              className="text-gray-700 dark:text-gray-300 text-lg leading-relaxed"
            >
              Hello, I'm Pawan Awasthi, a passionate Software Engineer currently
              focused on AI, ML, Data Science, and Database Systems. I'm
              constantly iterating on my craft, whether it's optimizing code,
              designing user experiences, or creating engaging content.
            </motion.p>
            <div className="flex items-center gap-4">
              <Button
                variant="outline"
                onClick={toggleAbout}
                className="rounded-full border-purple-300 dark:border-purple-700 hover:bg-purple-50 dark:hover:bg-purple-900/50"
              >
                More about Me
              </Button>
              <Link
                href="/updated_cv.pdf"
                target="_blank"
                download="Pawan_Awasthi_resume"
                className={`${buttonVariants({
                  variant: "default",
                })} rounded-3xl border-purple-300 dark:border-purple-700 hover:bg-purple-50 dark:hover:bg-purple-900/50`}
              >
                Resume <Paperclip />
              </Link>
            </div>
          </div>

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
            className=""
          >
            <p className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
              <MapPin className="h-6 w-6" />
              <span className="font-medium">Nepal</span>
            </p>
          </motion.div>
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
                  href: "https://x.com/paw1awasthi",
                },
                {
                  icon: <Linkedin className="w-5 h-5" />,
                  href: "https://www.linkedin.com/in/pawandai/",
                },
                {
                  icon: <Github className="w-5 h-5" />,
                  href: "https://github.com/pawandai",
                },
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
          {/* Projects Section */}
          <motion.div
            id="projects"
            layoutId="projects-section"
            ref={sectionRefs.projects}
            className={`
              scroll-mt-16
              ${
                isExpanded("projects")
                  ? "fixed inset-0 z-[100] p-4 md:p-8 flex items-center justify-center pointer-events-auto"
                  : "relative"
              }
            `}
            style={{ pointerEvents: "auto" }}
            transition={smoothTransition}
          >
            <ExpandedSectionContainer
              section="projects"
              className={isExpanded("projects") ? "" : "sm:p-6"}
            >
              <ExpandedSectionHeader section="projects" title="My Projects" />

              <motion.div
                layoutId="projects-grid"
                className={`
                  grid grid-cols-1 ${
                    isExpanded("projects")
                      ? "sm:p-6 pt-4 bg-white/95 dark:bg-black/80"
                      : ""
                  }
                  ${
                    isExpanded("projects")
                      ? "sm:grid-cols-1 lg:grid-cols-2 gap-6"
                      : "sm:grid-cols-1 lg:grid-cols-2 gap-6"
                  }
                `}
                transition={smoothTransition}
              >
                {(isExpanded("projects")
                  ? projectsData
                  : projectsData.slice(0, 2)
                ).map((project) => (
                  <motion.div
                    key={project.id}
                    layoutId={`project-card-${project.id}`}
                    style={{ opacity: 1 }}
                    initial={false}
                    animate={false}
                    transition={smoothTransition}
                    className={`
                      ${
                        isExpanded("projects")
                          ? ""
                          : "relative rounded-lg overflow-hidden"
                      }
                    `}
                    whileHover={{ y: -3 }}
                  >
                    <ProjectCard
                      key={project.id}
                      title={project.title}
                      createdAt={project.createdAt}
                      createdBy={project.createdBy}
                      description={
                        isExpanded("projects")
                          ? project.description
                          : project.description.substring(0, 150) + "..."
                      }
                      githubUrl={project.githubUrl}
                      imageUrls={project.imageUrls}
                      tags={project.tags}
                      liveDemoUrl={project.liveDemoUrl}
                      className={isExpanded("projects") ? "" : "h-full"}
                    />
                  </motion.div>
                ))}
              </motion.div>
            </ExpandedSectionContainer>
          </motion.div>

          {/* Work Experience Section - ADDED ELEVATION EFFECT */}
          <motion.div
            id="experience"
            layoutId="experience-section"
            ref={sectionRefs.experience}
            className={`
              scroll-mt-16 transition-opacity duration-300
              ${
                isExpanded("experience")
                  ? "fixed inset-0 z-[100] p-4 md:p-8 flex items-center justify-center pointer-events-auto"
                  : expandedSection
                    ? "opacity-0 pointer-events-none"
                    : "opacity-100 relative"
              }
            `}
            style={{ pointerEvents: "auto" }}
            transition={smoothTransition}
          >
            <ExpandedSectionContainer
              section="experience"
              className={`${
                isExpanded("experience")
                  ? "bg-white/95 dark:bg-black/80"
                  : "p-2 sm:p-6"
              }`}
            >
              <ExpandedSectionHeader
                section="experience"
                title="Work Experience"
              />

              <motion.div
                layoutId="experience-content"
                className={`
                  ${isExpanded("experience") ? "p-6 pt-4" : ""}
                `}
                transition={smoothTransition}
              >
                <motion.div
                  variants={staggerContainer}
                  initial={false}
                  className="space-y-8"
                >
                  {(isExpanded("experience")
                    ? experienceData
                    : experienceData.slice(0, 3)
                  ).map((job) => (
                    <motion.div
                      key={job.id}
                      layoutId={`experience-item-${job.id}`}
                      whileHover={{ x: 5 }}
                      className="relative pl-8 border-l-2 border-gray-200 dark:border-gray-800"
                      transition={smoothTransition}
                    >
                      <motion.div
                        layoutId={`experience-dot-${job.id}`}
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
              </motion.div>
            </ExpandedSectionContainer>
          </motion.div>

          {/* Stack Section - Fixed to only show first row initially */}
          <div
            id="stack"
            className={`
              scroll-mt-16 bg-gradient-to-r from-purple-500 to-purple-300 
              dark:from-purple-800 dark:to-purple-900 rounded-xl p-6 
              overflow-hidden transition-all duration-300 ease-in-out
              ${
                expandedSection
                  ? "opacity-0 pointer-events-none"
                  : "opacity-100"
              }
            `}
          >
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-mono text-white">My Stack</h2>
              <Button
                variant="ghost"
                size="icon"
                className="text-black dark:text-white hover:bg-purple-700/50"
                onClick={() => setExpandedStack(!expandedStack)}
              >
                {expandedStack ? (
                  <X className="h-5 w-5" />
                ) : (
                  <ArrowRight className="h-5 w-5" />
                )}
              </Button>
            </div>

            {/* First row - Always visible */}
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4 select-none">
              {[
                { name: "Next.js", src: "/skills/nextjs.svg" },
                { name: "Django", src: "/skills/django.svg" },
                { name: "Docker", src: "/skills/docker.svg" },
                { name: "PostgresQL", src: "/skills/postgresql.svg" },
                { name: "Angular", src: "/skills/angular.svg" },
              ].map((tool, i) => (
                <div
                  key={i}
                  className="flex flex-col items-center justify-center gap-2 p-4 border rounded-lg border-purple-400 dark:border-purple-700 bg-white/30 aspect-square group"
                >
                  <Image
                    src={tool.src}
                    alt={tool.name}
                    width={100}
                    height={100}
                    className="group-hover:scale-110 transition-all ease-in-out duration-300"
                  />
                  <Typography
                    variant="subtitle"
                    className="text-gray-700 dark:text-white"
                  >
                    {tool.name}
                  </Typography>
                </div>
              ))}
            </div>

            {/* Additional content - Hidden in collapsed state */}
            <div
              className={`
                overflow-hidden transition-all duration-300 ease-in-out
                ${
                  expandedStack
                    ? "max-h-[2000px] opacity-100 mt-8"
                    : "max-h-0 opacity-0 mt-0"
                }
              `}
            >
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4 select-none">
                {[
                  { name: "MySQL", src: "/skills/mysql.svg" },
                  { name: "MongoDB", src: "/skills/mongodb.svg" },
                  { name: "Azure", src: "/skills/azure.svg" },
                  { name: "Git", src: "/skills/git.svg" },
                  { name: "GraphQL", src: "/skills/graphql.svg" },
                  { name: "Node.js", src: "/skills/nodejs.svg" },
                  { name: "Prisma", src: "/skills/prisma.svg" },
                  { name: "Python", src: "/skills/python.svg" },
                  { name: "Typescript", src: "/skills/typescript.svg" },
                ].map((tool, i) => (
                  <div
                    key={i}
                    className="flex flex-col items-center justify-center gap-2 p-4 border rounded-lg border-purple-400 dark:border-purple-700 bg-white/30 aspect-square group"
                  >
                    <Image
                      src={tool.src}
                      alt={tool.name}
                      width={80}
                      height={80}
                      className="group-hover:scale-110 transition-all ease-in-out duration-300"
                    />
                    <Typography
                      variant="subtitle"
                      className="text-gray-700 dark:text-white"
                    >
                      {tool.name}
                    </Typography>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Contact Section - IN-PLACE EXPANSION */}
          <motion.div
            id="contact"
            layoutId="contact-section"
            className={`
              scroll-mt-16 relative overflow-hidden rounded-xl 
              bg-gradient-to-br from-gray-100 to-purple-100 
              dark:from-gray-900 dark:to-purple-950 p-6 
              transition-all duration-300
              ${
                expandedSection
                  ? "opacity-0 pointer-events-none"
                  : "opacity-100"
              }
            `}
          >
            <div className="flex justify-between items-center mb-4">
              <motion.h2 className="text-2xl font-mono">Contact</motion.h2>
              <Button
                variant="ghost"
                size="icon"
                className="hover:bg-purple-200/50 dark:hover:bg-purple-800/50"
                onClick={() => setExpandedContact(!expandedContact)}
              >
                <AnimatePresence mode="wait">
                  <motion.span
                    key={expandedContact ? "close" : "expand"}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.15 }}
                  >
                    {expandedContact ? (
                      <X className="h-5 w-5" />
                    ) : (
                      <ArrowRight className="h-5 w-5" />
                    )}
                  </motion.span>
                </AnimatePresence>
              </Button>
            </div>

            <motion.p className="max-w-md mb-4 text-gray-700 dark:text-gray-300">
              Interested in working together? Feel free to reach out for
              collaborations or just a friendly hello.
            </motion.p>

            <motion.p className="font-medium mb-2">
              contactpawandai@gmail.com
            </motion.p>

            <AnimatePresence>
              {expandedContact && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3 }}
                  className="overflow-hidden mt-6"
                >
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="space-y-6">
                      <div>
                        <h3 className="text-xl font-bold mb-3">Get In Touch</h3>
                        <p className="text-gray-600 dark:text-gray-400 mb-4">
                          I'm always open to discussing new projects, creative
                          ideas or opportunities to be part of your vision.
                        </p>
                      </div>

                      <div className="space-y-3">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-purple-100 dark:bg-purple-900/50 rounded-full flex items-center justify-center">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                              className="w-5 h-5 text-purple-600"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                              />
                            </svg>
                          </div>
                          <div>
                            <p className="text-sm text-gray-500 dark:text-gray-400">
                              Email
                            </p>
                            <p>contactpawandai@gmail.com</p>
                          </div>
                        </div>

                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-purple-100 dark:bg-purple-900/30 rounded-full flex items-center justify-center">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                              className="w-5 h-5 text-purple-600"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                              />
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                              />
                            </svg>
                          </div>
                          <div>
                            <p className="text-sm text-gray-500 dark:text-gray-400">
                              Location
                            </p>
                            <p>Kathmandu, Nepal</p>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div>
                      <h3 className="text-xl font-bold mb-4">Send a Message</h3>

                      {submitStatus === "success" ? (
                        <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-lg text-green-700 dark:text-green-300">
                          <p>
                            Thank you for your message! I'll get back to you
                            soon.
                          </p>
                        </div>
                      ) : (
                        <form
                          onSubmit={handleSubmitContact}
                          className="space-y-4"
                        >
                          {submitStatus === "error" && (
                            <div className="p-3 bg-red-50 dark:bg-red-900/20 rounded-lg text-red-700 dark:text-red-300 text-sm">
                              {errorMessage}
                            </div>
                          )}

                          <div className="space-y-2">
                            <label className="block text-sm font-medium">
                              Your Name
                            </label>
                            <input
                              type="text"
                              name="name"
                              value={contactForm.name}
                              onChange={handleInputChange}
                              className="w-full p-2 rounded-md outline-none border border-gray-300 dark:border-gray-700 bg-white dark:bg-black/30"
                            />
                          </div>

                          <div className="space-y-2">
                            <label className="block text-sm font-medium">
                              Email Address
                            </label>
                            <input
                              type="email"
                              name="email"
                              value={contactForm.email}
                              onChange={handleInputChange}
                              className="w-full p-2 rounded-md outline-none border border-gray-300 dark:border-gray-700 bg-white dark:bg-black/30"
                            />
                          </div>

                          <div className="space-y-2">
                            <label className="block text-sm font-medium">
                              Message
                            </label>
                            <textarea
                              name="message"
                              value={contactForm.message}
                              onChange={handleInputChange}
                              rows={4}
                              className="w-full p-2 rounded-md outline-none border border-gray-300 dark:border-gray-700 bg-white dark:bg-black/30"
                            />
                          </div>

                          <Button
                            type="submit"
                            className="w-full bg-purple-600 hover:bg-purple-700 text-white"
                            disabled={isSubmitting}
                          >
                            {isSubmitting ? (
                              <>
                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                Sending...
                              </>
                            ) : (
                              "Send Message"
                            )}
                          </Button>
                        </form>
                      )}
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </motion.div>
      </div>

      {/* SPECIAL ABOUT ME OVERLAY - Always on top of everything */}
      <AnimatePresence>
        {aboutExpanded && (
          <motion.div
            ref={aboutRef}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[250] flex items-center justify-center p-4 pointer-events-auto"
            style={{
              pointerEvents: "auto",
            }}
          >
            <motion.div className="bg-white dark:bg-gray-900/60 rounded-xl overflow-hidden max-h-[85vh] w-full max-w-6xl mx-auto overflow-y-auto shadow-2xl shadow-black/30 z-[300]">
              {/* About Header */}
              <div className="sticky top-0 z-[310] flex justify-between items-center bg-transparent dark:bg-gray-900/30 p-6 border-b border-gray-200 dark:border-gray-800 backdrop-blur-lg">
                <h2 className="text-2xl font-mono">About Me</h2>
                <Button
                  variant="ghost"
                  size="icon"
                  className="hover:bg-purple-100 dark:hover:bg-purple-900/50"
                  onClick={toggleAbout}
                >
                  <X className="h-5 w-5" />
                </Button>
              </div>

              {/* About Content */}
              <div className="p-6">
                <div className="flex flex-col md:flex-row gap-8 mb-8">
                  <div className="md:w-1/3">
                    <div className="relative w-full aspect-square rounded-xl overflow-hidden mb-4">
                      <Image
                        src="/images/profile.jpg"
                        alt="Profile"
                        fill
                        className="object-cover"
                      />
                    </div>
                    <h3 className="text-xl font-bold mb-2">Pawan Awasthi</h3>
                    <p className="text-gray-600 dark:text-gray-400 mb-4">
                      SOFTWARE ENGINEER
                    </p>

                    <div className="flex gap-4 mb-6">
                      {[
                        {
                          icon: <Twitter className="w-5 h-5" />,
                          href: "https://x.com/paw1awasthi",
                        },
                        {
                          icon: <Linkedin className="w-5 h-5" />,
                          href: "https://www.linkedin.com/in/pawandai/",
                        },
                        {
                          icon: <Github className="w-5 h-5" />,
                          href: "https://github.com/pawandai",
                        },
                      ].map((social, i) => (
                        <Button
                          key={i}
                          variant="ghost"
                          size="icon"
                          asChild
                          className="rounded-full hover:bg-purple-100 dark:hover:bg-purple-900/50"
                        >
                          <Link href={social.href}>{social.icon}</Link>
                        </Button>
                      ))}
                    </div>
                  </div>

                  <div className="md:w-2/3 space-y-6">
                    <div>
                      <h3 className="text-xl font-bold mb-3">My Journey</h3>
                      <p className="text-gray-700 dark:text-gray-300 mb-4">
                        I'm a passionate Software Engineer and Content Creator
                        currently focused on AI, ML and Data Science. I'm
                        constantly iterating on my craft, whether it's
                        optimizing code, designing user experiences, or creating
                        engaging content.
                      </p>
                      <p className="text-gray-700 dark:text-gray-300">
                        I believe in the power of technology to transform lives
                        and I'm excited to be a part of that journey. With a
                        background in computer science and a keen interest in
                        emerging technologies, I approach each project with
                        curiosity and dedication.
                      </p>
                    </div>

                    <div>
                      <h3 className="text-xl font-bold mb-3">Education</h3>
                      <div className="space-y-4">
                        <div>
                          <div className="flex justify-between">
                            <h4 className="font-bold">
                              Bachelor in Electronics and Information
                              Engineering
                            </h4>
                            <span className="text-sm text-gray-600 dark:text-gray-400">
                              2022 - 2026
                            </span>
                          </div>
                          <p className="text-gray-700 dark:text-gray-300">
                            IOE, Tribhuwan University
                          </p>
                        </div>
                      </div>
                    </div>

                    <div>
                      <h3 className="text-xl font-bold mb-3">
                        Skills & Interests
                      </h3>
                      <div className="flex flex-wrap gap-2">
                        {[
                          "AI/ML",
                          "Data Science",
                          "Python",
                          "JavaScript",
                          "React",
                          "Next.js",
                          "UI/UX Design",
                          "Content Creation",
                        ].map((skill, i) => (
                          <span
                            key={i}
                            className="px-3 py-1 bg-purple-100 dark:bg-purple-900/30 rounded-full text-sm"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
