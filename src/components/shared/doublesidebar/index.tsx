import Container from "@/components/ui/container";
import { Separator } from "@/components/ui/separator";
import { CalendarDaysIcon, ClockIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { ReactNode, useMemo } from "react";
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
        <div>
          <MenuOptions className="p-2 pl-4" defaultOpen={true}>
            <SimilarBlogs similarPosts={similarPosts} />
          </MenuOptions>
          <MenuOptions>
            <SimilarBlogs similarPosts={similarPosts} />
          </MenuOptions>
        </div>

        {/* Blog Content */}
        <div className="space-y-8">
          <div>
            {children}
            <Image
              src="/projects/task_manager/tasks.jpeg"
              alt="Blog Cover Image"
              width={1200}
              height={600}
              className="rounded-lg object-cover w-full aspect-[4/2]"
            />
            <div className="mt-4 space-y-2">
              <div className="text-2xl font-bold">
                The Future of Web Development
              </div>
              <p className="text-muted-foreground">
                Explore the latest trends and technologies shaping the future of
                web development.
              </p>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <div className="flex items-center gap-2">
                  <CalendarDaysIcon className="w-4 h-4 mr-1" />
                  <span>May 15, 2023</span>
                </div>
                <Separator orientation="vertical" />
                <div className="flex items-center gap-2">
                  <ClockIcon className="w-4 h-4 mr-1" />
                  <span>10 min read</span>
                </div>
              </div>
            </div>
          </div>
          <div className="prose prose-lg">
            <h2>The Evolving Landscape of Web Development</h2>
            <p>
              In the ever-changing world of technology, the field of web
              development has undergone a remarkable transformation. From the
              early days of static websites to the rise of dynamic, interactive
              applications, the landscape of web development has continuously
              evolved, driven by advancements in programming languages,
              frameworks, and user expectations.
            </p>
            <p>
              One of the most significant trends in web development is the
              increasing focus on responsive design and mobile-first approaches.
              As more users access the web through their smartphones and
              tablets, developers must ensure that their applications provide a
              seamless and optimized experience across various devices and
              screen sizes.
            </p>
            <h2>The Rise of JavaScript Frameworks and Libraries</h2>
            <p>
              The popularity of JavaScript has skyrocketed in recent years, with
              the emergence of powerful frameworks and libraries that have
              transformed the way web applications are built. Frameworks like
              React, Angular, and Vue.js have become essential tools in the web
              arsenal, providing a structured and efficient way to build complex
              user interfaces.
            </p>
            <p>
              These frameworks not only simplify the development process but
              also promote the adoption of best practices, such as
              component-based architecture and state management. As a result,
              web applications have become more modular, scalable, and
              maintainable, allowing developers to focus on delivering
              innovative features and functionalities.
            </p>
            <h2>The Emergence of Serverless and Headless Architectures</h2>
            <p>
              Another significant trend in web development is the rise of
              serverless and headless architectures. Serverless computing,
              enabled by platforms like AWS Lambda and Google Cloud Functions,
              allows developers to focus on writing application logic without
              worrying about the underlying infrastructure.
            </p>
            <p>
              Headless content management systems (CMS), on the other hand,
              decouple the content from the presentation layer, providing a more
              flexible and scalable approach to building web applications. This
              separation allows developers to choose the most appropriate
              technologies for the front-end and back-end, leading to increased
              efficiency and faster time-to-market.
            </p>
            <h2>The Importance of Accessibility and Inclusivity</h2>
            <p>
              As the web becomes more ubiquitous, the importance of
              accessibility and inclusivity in web development has become
              increasingly crucial. Developers must ensure that their
              applications are designed with the needs of all users in mind,
              including those with disabilities or other accessibility
              requirements.
            </p>
            <p>
              By adhering to web accessibility standards and guidelines, such as
              WCAG (Web Content Accessibility Guidelines), developers can create
              inclusive experiences that cater to a diverse user base. This not
              only benefits individuals with disabilities but also improves the
              overall usability and user experience for all users.
            </p>
            <h2>The Future of Web Development</h2>
            <p>
              As we look to the future, the web development landscape will
              continue to evolve, driven by emerging technologies, changing user
              behaviors, and the ever-increasing demand for innovative and
              engaging web experiences. Developers will need to stay informed
              about the latest trends, tools, and best practices to ensure that
              their web applications remain competitive and relevant.
            </p>
            <p>
              Whether the rise of WebAssembly, the integration of artificial
              intelligence and machine learning, or the advancements in edge
              computing and the Internet of Things, the future of web
              development promises to be both exciting and challenging. By
              embracing these changes and continuously learning, web developers
              can position themselves at the forefront of this dynamic and
              ever-evolving field.
            </p>
          </div>
        </div>

        {/* Topics */}
        <div className="hidden lg:block">
          <div className="sticky top-24 space-y-4">
            <div className="text-lg font-semibold">Topics</div>
            <nav className="space-y-2">
              <Link
                href="#"
                className="block text-sm text-muted-foreground hover:text-foreground"
                prefetch={false}
              >
                Web Development Trends
              </Link>
              <Link
                href="#"
                className="block text-sm text-muted-foreground hover:text-foreground"
                prefetch={false}
              >
                JavaScript Frameworks
              </Link>
              <Link
                href="#"
                className="block text-sm text-muted-foreground hover:text-foreground"
                prefetch={false}
              >
                Serverless Architecture
              </Link>
              <Link
                href="#"
                className="block text-sm text-muted-foreground hover:text-foreground"
                prefetch={false}
              >
                Headless CMS
              </Link>
              <Link
                href="#"
                className="block text-sm text-muted-foreground hover:text-foreground"
                prefetch={false}
              >
                Web Accessibility
              </Link>
            </nav>
          </div>
        </div>
      </Container>
    </>
  );
};

export default DoubleSidebar;
