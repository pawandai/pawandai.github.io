import { join } from "path";
import fs from "fs/promises";
import matter from "gray-matter";
import { NextResponse } from "next/server";

// URL="http://localhost:3001"

export async function GET(request: { body: { slug: string } }) {
  const { slug } = request?.body;
  const postsDirectory = join(process.cwd(), "src", "_blogs");
  const realSlug = slug.replace(/\.md$/, "");
  const fullPath = join(postsDirectory, `${realSlug}.md`);
  const fileContents = await fs.readFile(fullPath, "utf8");
  const { data, content } = matter(fileContents);

  return NextResponse.json({ ...data, content });
}
