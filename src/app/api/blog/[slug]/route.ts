import matter from "gray-matter";
import fs from "fs/promises";
import { join } from "path";
import { NextResponse } from "next/server";

export async function GET(
  req: Request,
  { params }: { params: { slug: string } }
) {
  const { slug } = params;
  const postsDirectory = join(process.cwd(), "src", "_blogs");
  const realSlug = slug.replace(/\.md$/, "");
  const fullPath = join(postsDirectory, `${realSlug}.md`);
  const fileContents = await fs.readFile(fullPath, "utf8");
  const { data, content } = matter(fileContents);
  const dataToBeSent = { ...data, content };
  return NextResponse.json(dataToBeSent);
}

export async function POST(
  req: Request,
  { params }: { params: { slug: string } }
) {
  const deletedFile = join(process.cwd(), "src", "_blogs", `${params.slug}.md`);
  fs.unlink(deletedFile);
  return NextResponse.json({ message: "Post deleted successfully" });
}

export async function generateStaticParams() {
  const postsDirectory = join(process.cwd(), "src", "_blogs");
  const slugs = await fs.readdir(postsDirectory);
  return slugs.map((post: string) => ({
    slug: post.replace(/\.md$/, ""),
  }));
}
