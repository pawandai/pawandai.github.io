"use client";

import Container from "@/components/ui/container";
import Image from "next/image";
import Link from "next/link";
import {
  ReactNode,
  RefObject,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import MenuOptions from "./menuoptions";
import Header from "../header";
import { Post } from "@/types";
import { blogPosts } from "@/constants";
import { Badge } from "@/components/ui/badge";

interface DoubleSidebarProps {
  children: ReactNode;
  className?: string;
  selectedPost: Post;
}

type SectionRefs = {
  [key: string]: RefObject<HTMLDivElement>;
};

const SimilarBlogs = ({ similarPosts }: { similarPosts: Post[] }) => {
  return (
    <div className="bg-background flex-1 mt-16">
      <h2 className="text-2xl font-semibold mb-4">Similar Posts</h2>
      {similarPosts.length > 0 ? (
        <ul className="space-y-6">
          {similarPosts.map((post) => (
            <li key={post.id} className="bg-card">
              <Link
                href={`/blog/${post.slug}`}
                className="text-lg font-normal p-1 hover:underline"
              >
                {post.title}
              </Link>
              <div className="flex flex-wrap gap-2 my-2">
                {post.tags.map((tag) => (
                  <Badge
                    key={tag}
                    variant="secondary"
                    className="hover:bg-secondary/50 select-none"
                  >
                    {tag}
                  </Badge>
                ))}
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-muted-foreground">No similar posts found.</p>
      )}
    </div>
  );
};

const DoubleSidebar = ({
  className,
  children,
  selectedPost,
}: DoubleSidebarProps) => {
  const [activeSection, setActiveSection] = useState<string>("");

  const introductionRef = useRef<HTMLDivElement>(null);
  const characterDevelopmentRef = useRef<HTMLDivElement>(null);
  const narrativeStructureRef = useRef<HTMLDivElement>(null);
  const sensoryDetailsRef = useRef<HTMLDivElement>(null);
  const emotionalConnectionRef = useRef<HTMLDivElement>(null);
  const conclusionRef = useRef<HTMLDivElement>(null);

  const sectionsRef: SectionRefs = useMemo(
    () => ({
      introduction: introductionRef,
      "character-development": characterDevelopmentRef,
      "narrative-structure": narrativeStructureRef,
      "sensory-details": sensoryDetailsRef,
      "emotional-connection": emotionalConnectionRef,
      conclusion: conclusionRef,
    }),
    []
  );

  // Handle scroll event
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 150; // Adjust the offset as needed
      let currentSection = "";

      for (const [id, ref] of Object.entries(sectionsRef)) {
        if (ref.current) {
          const sectionTop = ref.current.offsetTop;
          const sectionBottom = sectionTop + ref.current.offsetHeight;

          if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
            currentSection = id;
            break;
          }
        }
      }

      if (currentSection !== activeSection) {
        setActiveSection(currentSection);
        window.history.replaceState(null, "", `#${currentSection}`);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [activeSection, sectionsRef]);

  const scrollToSection = (id: string) => {
    sectionsRef[id]?.current?.scrollIntoView({ behavior: "smooth" });
  };

  // Find similar posts based on category and tags
  const similarPosts = useMemo(() => {
    if (!selectedPost?.category && selectedPost?.tags.length === 0) {
      return [];
    }
    return blogPosts.filter((post) => {
      if (selectedPost?.category && post.category === selectedPost?.category) {
        return true;
      }
      if (
        selectedPost?.tags.length > 0 &&
        selectedPost?.tags.every((tag) => post.tags.includes(tag))
      ) {
        return true;
      }
      return false;
    });
  }, [selectedPost?.category, selectedPost?.tags]);

  return (
    <>
      <Header isBlog={true} />
      <Container
        className={`grid lg:grid-cols-[240px_1fr_240px] md:grid-cols-[240px_1fr] grid-cols-1 gap-8 p-8 ${className}`}
      >
        {/* Left Sidebar */}
        <div>
          <MenuOptions className="p-2 pl-4" defaultOpen={true}>
            <SimilarBlogs similarPosts={similarPosts} />
          </MenuOptions>
          <MenuOptions>
            <SimilarBlogs similarPosts={similarPosts} />
          </MenuOptions>
        </div>

        {/* Blog Content */}
        <article className="prose prose-gray dark:prose-invert">
          <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl">
            The Art of Storytelling: Crafting Captivating Blog Posts
          </h1>
          {children}
          <Image
            src="/projects/task_manager/tasks.jpeg"
            alt="Blog Cover Image"
            width={1200}
            height={600}
            className="rounded-lg object-cover w-full aspect-[4/2]"
          />
          <p className="text-muted-foreground">
            Unlock the power of words and captivate your audience with these
            expert tips.
          </p>
          <section
            id="introduction"
            ref={sectionsRef.introduction}
            className="scroll-mt-20 h-[80vh]"
          >
            <h2>Introduction</h2>
            <p>
              Storytelling is a timeless art form that has the power to
              captivate, inspire, and connect us. In the world of blogging, the
              ability to craft compelling narratives can be the difference
              between a forgettable post and one that leaves a lasting
              impression on your readers.
            </p>
            <p>
              In this blog post, we&apos;ll explore the essential elements of
              storytelling and how you can leverage them to create unforgettable
              blog content.
            </p>
          </section>
          <section
            id="character-development"
            ref={sectionsRef["character-development"]}
            className="scroll-mt-20 h-[80vh]"
          >
            <h2>Character Development</h2>
            <p>
              Memorable stories are often driven by well-developed characters.
              Whether you&apos;re writing a personal narrative or covering a
              topic, introducing relatable characters can help your readers
              connect with the content on a deeper level.
            </p>
            <p>
              Consider introducing a protagonist, antagonist, or even supporting
              characters that your readers can empathize with. Provide insights
              into their motivations, struggles, and personal growth, allowing
              your audience to feel invested in their journey.
            </p>
          </section>
          <section
            id="narrative-structure"
            ref={sectionsRef["narrative-structure"]}
            className="scroll-mt-20 h-[80vh]"
          >
            <h2>Narrative Structure</h2>
            <p>
              A well-crafted narrative structure can guide your readers through
              a seamless and engaging experience. Incorporate elements of a
              classic story arc, such as an engaging introduction, rising
              action, a climactic moment, and a satisfying resolution.
            </p>
            <p>
              Experiment with different narrative techniques, such as
              flashbacks, foreshadowing, or even a non-linear timeline, to keep
              your readers on the edge of their seats.
            </p>
          </section>
          <section
            id="sensory-details"
            ref={sectionsRef["sensory-details"]}
            className="scroll-mt-20 h-[80vh]"
          >
            <h2>Sensory Details</h2>
            <p>
              Bring your blog posts to life by incorporating vivid sensory
              details. Describe the sights, sounds, smells, tastes, and textures
              that your characters experience, allowing your readers to immerse
              themselves in the story.
            </p>
            <p>
              These sensory details can help to create a more immersive and
              memorable reading experience, transporting your audience to the
              world you&apos;ve created.
            </p>
          </section>
          <section
            id="emotional-connection"
            ref={sectionsRef["emotional-connection"]}
            className="scroll-mt-20 h-[80vh]"
          >
            <h2>Emotional Connection</h2>
            <p>
              The most powerful stories are those that evoke a strong emotional
              response from the reader. Tap into universal human emotions, such
              as joy, fear, sadness, or wonder, to create a deeper connection
              with your audience.
            </p>
            <p>
              By eliciting an emotional response, you can leave a lasting
              impression and inspire your readers to reflect on the message or
              takeaway of your blog post.
            </p>
          </section>
          <section
            id="conclusion"
            ref={sectionsRef.conclusion}
            className="scroll-mt-20 h-[80vh]"
          >
            <h2>Conclusion</h2>
            <p>
              Storytelling is a powerful tool that can elevate your blog content
              and captivate your audience. By incorporating character
              development, narrative structure, sensory details, and emotional
              connection, you can craft blog posts that inspire, educate, and
              entertain your readers.
            </p>
            <p>
              Remember, the art of storytelling is a journey, and with practice
              and dedication, you can hone your skills to become a master of the
              craft.
            </p>
          </section>
        </article>

        {/* Topics (Right Sidebar) */}
        <div className="hidden lg:block">
          <div className="sticky top-24 space-y-4">
            <h3 className="text-lg font-semibold mb-4">Topics</h3>
            <nav className="space-y-2">
              <Link
                href="#introduction"
                className={`block ${
                  activeSection === "introduction"
                    ? "text-foreground font-semibold"
                    : "text-muted-foreground"
                } hover:text-foreground transition-colors`}
                onClick={(e) => {
                  e.preventDefault();
                  scrollToSection("introduction");
                }}
              >
                Introduction
              </Link>
              <Link
                href="#character-development"
                className={`block ${
                  activeSection === "character-development"
                    ? "text-foreground font-semibold"
                    : "text-muted-foreground"
                } hover:text-foreground transition-colors`}
                onClick={(e) => {
                  e.preventDefault();
                  scrollToSection("character-development");
                }}
              >
                Character Development
              </Link>
              <Link
                href="#narrative-structure"
                className={`block ${
                  activeSection === "narrative-structure"
                    ? "text-foreground font-semibold"
                    : "text-muted-foreground"
                } hover:text-foreground transition-colors`}
                onClick={(e) => {
                  e.preventDefault();
                  scrollToSection("narrative-structure");
                }}
              >
                Narrative Structure
              </Link>
              <Link
                href="#sensory-details"
                className={`block ${
                  activeSection === "sensory-details"
                    ? "text-foreground font-semibold"
                    : "text-muted-foreground"
                } hover:text-foreground transition-colors`}
                onClick={(e) => {
                  e.preventDefault();
                  scrollToSection("sensory-details");
                }}
              >
                Sensory Details
              </Link>
              <Link
                href="#emotional-connection"
                className={`block ${
                  activeSection === "emotional-connection"
                    ? "text-foreground font-semibold"
                    : "text-muted-foreground"
                } hover:text-foreground transition-colors`}
                onClick={(e) => {
                  e.preventDefault();
                  scrollToSection("emotional-connection");
                }}
              >
                Emotional Connection
              </Link>
              <Link
                href="#conclusion"
                className={`block ${
                  activeSection === "conclusion"
                    ? "text-foreground font-semibold"
                    : "text-muted-foreground"
                } hover:text-foreground transition-colors`}
                onClick={(e) => {
                  e.preventDefault();
                  scrollToSection("conclusion");
                }}
              >
                Conclusion
              </Link>
            </nav>
          </div>
        </div>
      </Container>
    </>
  );
};

export default DoubleSidebar;
