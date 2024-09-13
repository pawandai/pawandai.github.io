"use client";

import Image from "next/image";
import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { AspectRatio } from "@/components/ui/aspect-ratio";

type BlogCardProps = {
  thumbnail: string;
  title: string;
  slug: string;
  preview: string;
  tags: string[];
};

export function BlogCard({ thumbnail, title, slug, preview }: BlogCardProps) {
  return (
    <main className="group select-none rounded-lg border mx-2 group w-full p-2 flex flex-col justify-between">
      <div>
        <AspectRatio ratio={16 / 9} className="overflow-hidden rounded-lg">
          <Image
            src={thumbnail}
            alt={title}
            fill
            className="transition-all ease-in-out duration-500 mb-4 object-cover group-hover:scale-105"
          />
        </AspectRatio>
        <h2 className="text-xl font-semibold my-2 px-2 text-clip">{title}</h2>
        <p className="px-2 mb-2">{preview}...</p>
      </div>
      <div className="flex items-center justify-between">
        <p className="text-muted-foreground text-sm px-2">
          {new Date().getFullYear()}
        </p>
        <Link
          href={`/blog/${slug}`}
          className={`text-primary font-bold ${buttonVariants({
            variant: "link",
            size: "lg",
          })}`}
        >
          Read Full Article &nbsp;
          <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    </main>
  );
}
