"use client";

import Image from "next/image";
import Link from "next/link";
import { Button, buttonVariants } from "@/components/ui/button";
import { ArrowRight, Edit, Trash2 } from "lucide-react";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Post } from "@/types";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import BlogEditor from "./editor";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { getApiUrl } from "@/lib/utils";

type BlogCardProps = {
  post?: Post;
  thumbnail: string;
  title: string;
  slug: string;
  preview: string;
  refresh?: () => void;
};

export function BlogCard({
  thumbnail,
  title,
  slug,
  preview,
  post,
  refresh,
}: BlogCardProps) {
  const url = getApiUrl();
  async function handleDeletePost() {
    try {
      await fetch(`${url}/api/blog`, {
        method: "DELETE",
        body: JSON.stringify(slug),
      });
      if (refresh) refresh();
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <main className="group relative select-none rounded-lg border-2 dark:border-2 dark:border-black mx-2 group w-full p-2 flex flex-col justify-between">
      <div>
        <AspectRatio ratio={16 / 9} className="overflow-hidden rounded-lg">
          <Image
            src={thumbnail}
            alt={title}
            fill
            className="transition-all ease-in-out duration-500 mb-4 object-cover group-hover:scale-105"
          />
        </AspectRatio>
        <Link
          href={`/blog/${slug}`}
          className={`${buttonVariants({
            variant: "link",
          })} text-xl font-semibold my-2 px-1 text-clip`}
        >
          {title}
        </Link>
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
      {process.env.NODE_ENV === "development" && (
        <Dialog>
          <DialogTrigger asChild>
            <Button
              size="lg"
              variant="outline"
              className="mb-2 dark:border dark:border-black"
            >
              <Edit className="h-6 w-6 mr-2" />
              Edit
            </Button>
          </DialogTrigger>
          <DialogContent className="bg-white">
            <BlogEditor post={post!} />
          </DialogContent>
        </Dialog>
      )}
      {process.env.NODE_ENV === "development" && (
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button size="lg" variant="destructive">
              <Trash2 className="h-6 w-6 mr-2" />
              Delete
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent className="bg-white">
            <AlertDialogHeader>
              <AlertDialogTitle>Am I sure?</AlertDialogTitle>
              <AlertDialogDescription>
                This action cannot be undone. This will permanently delete the
                post.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction onClick={handleDeletePost}>
                <Trash2 className="h-6 w-6 mr-2" />
                Delete
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      )}
    </main>
  );
}
