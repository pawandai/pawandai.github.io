"use server";

import matter from "gray-matter";
import { join } from "path";
import fs from "fs/promises";

export async function getPostSlugs() {
  const postsDirectory = join(process.cwd(), "src", "_blogs");
  return await fs.readdir(postsDirectory);
}

export async function getPostBySlug(slug: string) {
  const postsDirectory = join(process.cwd(), "src", "_blogs");
  const realSlug = slug.replace(/\.md$/, "");
  const fullPath = join(postsDirectory, `${realSlug}.md`);
  const fileContents = await fs.readFile(fullPath, "utf8");
  const { data, content } = matter(fileContents);

  return {
    category: data.category as string,
    content: content as string,
    createdAt: new Date(),
    id: data.id as string,
    slug: data.slug as string,
    tags: data.tags as string,
    timeToRead: data.timeToRead as string,
    image: data.image as string,
    preview: data.preview,
    title: data.title as string,
    topics: data.topics as string,
  };
}

export async function getAllPosts() {
  const slugs = await getPostSlugs();
  const response = slugs.map(async (slug) => await getPostBySlug(slug));
  // sort posts by date in descending order
  const posts = await Promise.all(response);
  const sortedPosts = posts.sort((post1, post2) =>
    post1.createdAt > post2.createdAt ? -1 : 1
  );
  return sortedPosts;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const deleteBlog = async (slug: string) => {
  const deletedFile = join(process.cwd(), "src", "_blogs", `${slug}.md`);
  fs.unlink(deletedFile);
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const upsertBlog = (data: any) => {
  console.log(data);
  const postsfolder = join(process.cwd(), "src", "_blogs", `${data.slug}.md`);
  if (process.env.NODE_ENV === "development") {
    const dataToBeWritten = matter.stringify(data?.content, data.variables);
    fs.writeFile(postsfolder, dataToBeWritten);
  } else {
    return { name: "This route works in development mode only" };
  }
};
