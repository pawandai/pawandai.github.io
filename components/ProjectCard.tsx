import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import { Link as LinkIcon } from "lucide-react";
import Tag from "./ui/tag";
import ImageSlider from "./ImageSlider";

interface ProjectCardProps {
  title: string;
  imageUrls: string[];
  className?: string;
  tags: string[];
  description: string;
  createdBy: { id: number; name: string; link: string }[];
  createdAt: string;
  liveDemoUrl?: string;
  githubUrl: string;
}

const ProjectCard = ({
  createdAt,
  createdBy,
  description,
  githubUrl,
  imageUrls,
  tags,
  title,
  className,
  liveDemoUrl
}: ProjectCardProps) => {
  return (
    <div
      className={`overflow-hidden bg-purple-100/30 dark:bg-purple-800/20 rounded-lg border border-gray-200 dark:border-gray-700 h-full flex flex-col ${className}`}
    >
      <div className="relative w-full">
        <ImageSlider urls={imageUrls} className="aspect-video rounded-none" />
      </div>

      <div className="p-6 flex-1 flex flex-col">
        <div className="flex-1">
          <div className="flex gap-2 flex-wrap mb-2">
            {tags.slice(0, 3).map((tag) => (
              <Tag key={tag} label={tag} />
            ))}
          </div>
          <Link
            href={githubUrl}
            className="block mb-3 text-xl font-semibold text-gray-800 transition-colors duration-300 transform dark:text-gray-100 hover:text-gray-600 dark:hover:text-gray-400 hover:underline"
            tabIndex={0}
            role="link"
            target="_blank"
          >
            {title}
          </Link>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            {description}
          </p>
        </div>

        <div className="mt-4 flex items-center justify-between">
          <div className="flex items-center">
            {createdBy.map((author) => (
              <Link
                key={author.id}
                href={author.link}
                className="font-semibold text-gray-700 dark:text-gray-200 text-sm"
                tabIndex={0}
                role="link"
                target="_blank"
              >
                {author.name} {createdBy.length > 1 ? " | " : ""}
              </Link>
            ))}

            <span className="mx-2 text-xs text-gray-600 dark:text-gray-300">
              {createdAt}
            </span>
          </div>
          <Link
            className={`${buttonVariants({
              variant: "outline",
              size: "sm"
            })} flex items-center gap-2 text-gray-800 dark:text-gray-100 dark:border-gray-500`}
            href={liveDemoUrl || "#"}
            target="_blank"
          >
            Live{" "}
            <LinkIcon className="h-4 w-4 text-gray-800 dark:text-gray-100" />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;
