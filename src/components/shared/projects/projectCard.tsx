import Link from "next/link";
import ImageSlider from "../imageSlider";
import Tag from "@/components/ui/tag";
import { buttonVariants } from "@/components/ui/button";
import { Link as LinkIcon } from "lucide-react";

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
  liveDemoUrl,
}: ProjectCardProps) => {
  return (
    <div
      className={`max-w-xl overflow-hidden bg-white dark:bg-gray-800 rounded-lg border-2 border-gray-200 dark:border-gray-700 mx-2 ${className}`}
    >
      <ImageSlider urls={imageUrls} className="aspect-video rounded-none" />

      <div className="p-6">
        <div>
          <div className="flex gap-2 flex-wrap">
            {tags.map((tag) => (
              <Tag key={tag} label={tag} />
            ))}
          </div>
          <Link
            href={githubUrl}
            className="block mt-2 text-xl font-semibold text-gray-800 transition-colors duration-300 transform dark:text-gray-100 hover:text-gray-600 dark:hover:text-gray-400 hover:underline"
            tabIndex={0}
            role="link"
            target="_blank"
          >
            {title}
          </Link>
          <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
            {description}
          </p>
        </div>

        <div className="mt-4 flex items-center justify-between">
          <div className="flex items-center">
            {createdBy.map((author) => (
              <Link
                key={author.id}
                href={author.link}
                className="font-semibold text-gray-700 dark:text-gray-200"
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
            })} flex items-center gap-2 text-gray-800 dark:text-gray-100 dark:border-gray-100`}
            href={liveDemoUrl || "#"}
            target="_blank"
          >
            Live{" "}
            <LinkIcon className="h-5 w-5 text-gray-800 dark:text-gray-100" />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;
