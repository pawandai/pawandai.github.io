import { join } from "path";
import fs from "fs/promises";
import matter from "gray-matter";
import { Post } from "@/types";
import { NextResponse } from "next/server";
import { getApiUrl } from "@/lib/utils";
import { fetchApi } from "@/lib/fetchApi";

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
  const url = getApiUrl();
  const posts = await fetchApi(`${url}/api/blog`);

  return posts.map((post: Post) => ({
    slug: post.slug,
  }));
}
