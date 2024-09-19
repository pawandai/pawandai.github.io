import { join } from "path";
import fs from "fs/promises";
import matter from "gray-matter";
import { NextApiResponse } from "next";
import { getApiUrl } from "@/lib/utils";

export async function GET(
  request: Request,
  { params }: { params: { slug: string } },
  res: NextApiResponse
) {
  const { slug } = params;
  const postsDirectory = join(process.cwd(), "src", "_blogs");
  const realSlug = slug.replace(/\.md$/, "");
  const fullPath = join(postsDirectory, `${realSlug}.md`);

  try {
    const fileContents = await fs.readFile(fullPath, "utf8");
    const { data, content } = matter(fileContents);
    const dataToSend = { ...data, content };
    return res.status(200).json(dataToSend);
  } catch (error) {
    console.error("Failed to read file:", error);
    return res.status(404).json({ error: "Blog post not found" });
  }
}

export async function generateStaticParams() {
  const url = getApiUrl();
  try {
    const response = await fetch(`${url}/api/blog`);
    console.error("here is the response ", response);

    if (!response.ok) {
      if (response.status === 404) {
        console.error("API endpoint not found (404)");
      } else {
        console.error(`HTTP error! status: ${response.status}`);
      }
      return [];
    }

    const contentType = response.headers.get("content-type");
    if (!contentType || !contentType.includes("application/json")) {
      console.error("Received non-JSON response");
      return [];
    }

    const posts = await response.json();
    return posts.map((post: { slug: string }) => ({
      params: { slug: post.slug },
    }));
  } catch (error) {
    console.error("Failed to fetch blog data:", error);
    return [];
  }
}
