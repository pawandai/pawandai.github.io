"use server";

import matter from "gray-matter";
import { join } from "path";
import fsPromises from "fs/promises";
import { remark } from "remark";
import html from "remark-html";
import { Post } from "@/types";

export async function getPostSlugs() {
  const postsDirectory = join(process.cwd(), "src", "_blogs");
  return await fsPromises.readdir(postsDirectory);
}

export async function getPostBySlug(slug: string, fields: string[] = []) {
  const postsDirectory = join(process.cwd(), "src", "_blogs");
  const realSlug = slug.replace(/\.md$/, "");
  const fullPath = join(postsDirectory, `${realSlug}.md`);
  const fileContents = await fsPromises.readFile(fullPath, "utf8");
  const { data, content } = matter(fileContents);

  const item: Post = {
    category: "blog",
    content: "",
    createdAt: new Date(),
    id: "",
    slug: "",
    tags: "",
    timeToRead: "",
    title: "",
    topics: "",
  };

  // Ensure only the minimal needed data is exposed
  fields.forEach((field) => {
    if (field === "slug") {
      item[field] = realSlug;
    }
    if (field === "content") {
      item[field] = content;
    }

    if (typeof data[field] !== "undefined") {
      item[field] = data[field];
    }
  });

  return item;
}

export async function getAllPosts(fields: string[] = []) {
  const slugs = await getPostSlugs();
  const posts = await Promise.all(
    slugs.map((slug) => getPostBySlug(slug, fields))
  );
  // sort posts by date in descending order
  posts.sort((post1, post2) => (post1.createdAt > post2.createdAt ? -1 : 1));
  return posts;
}

export default async function markdownToHtml(markdown: string) {
  const result = await remark().use(html).process(markdown);
  return result.toString();
}

export async function getRandomImage() {
  const randomImageUrl = [
    "/projects/task_manager/tasks_dim.png",
    "/projects/task_manager/tasks_logo.png",
    "/projects/task_manager/tasks.jpeg",
  ];
  return randomImageUrl[Math.floor(Math.random() * randomImageUrl.length)];
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const deleteBlog = async (slug: string) => {
  const deletedFile = join(process.cwd(), "src", "_blogs", `${slug}.md`);
  fsPromises.unlink(deletedFile);
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const upsertBlog = async (data: any) => {
  console.log(data);
  const postsfolder = join(process.cwd(), "src", "_blogs", `${data.slug}.md`);
  if (process.env.NODE_ENV === "development") {
    const dataToBeWritten = matter.stringify(data?.content, data.variables);
    await fsPromises.writeFile(postsfolder, dataToBeWritten, "utf-8");
  } else {
    return { name: "This route works in development mode only" };
  }
};
