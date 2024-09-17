import { join } from "path";
import fs from "fs/promises";
import matter from "gray-matter";
import { NextResponse } from "next/server";
import { Post } from "@/types";
// import { Post } from "@/types";

export async function GET(
  request: Request,
  { params }: { params: { slug: string } }
) {
  const { slug } = params;
  const postsDirectory = join(process.cwd(), "src", "_blogs");
  const realSlug = slug.replace(/\.md$/, "");
  const fullPath = join(postsDirectory, `${realSlug}.md`);
  const fileContents = await fs.readFile(fullPath, "utf8");
  const { data, content } = matter(fileContents);

  return NextResponse.json({ ...data, content });
}

export async function generateStaticParams() {
  const posts: Post[] = await fetch(
    "https://pawandai-github.vercel.app/api/blog"
  ).then((res) => res.json());

  return posts.map((post) => ({
    slug: post.slug,
  }));
}
