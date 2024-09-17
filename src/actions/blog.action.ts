import matter from "gray-matter";
import { join } from "path";
import fs from "fs";
import { Post } from "@/types";

export function getPostSlugs() {
  const postsDirectory = join(process.cwd(), "src", "_blogs");
  return fs.readdirSync(postsDirectory);
}

export function getPostBySlug(slug: string, fields: string[] = []) {
  const postsDirectory = join(process.cwd(), "src", "_blogs");
  const realSlug = slug.replace(/\.md$/, "");
  const fullPath = join(postsDirectory, `${realSlug}.md`);
  const fileContents = fs.readFileSync(fullPath, "utf8");
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

export function getAllPosts(fields: string[] = []) {
  const slugs = getPostSlugs();
  const posts = slugs
    .map((slug) => getPostBySlug(slug, fields))
    // sort posts by date in descending order
    .sort((post1, post2) => (post1.date > post2.date ? -1 : 1));
  return posts;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const deleteBlog = (slug: string) => {
  const deletedFile = join(process.cwd(), "src", "_blogs", `${slug}.md`);
  fs.unlinkSync(deletedFile);
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const upsertBlog = (data: any) => {
  console.log(data);
  const postsfolder = join(process.cwd(), "src", "_blogs", `${data.slug}.md`);
  if (process.env.NODE_ENV === "development") {
    const dataToBeWritten = matter.stringify(data?.content, data.variables);
    fs.writeFile(postsfolder, dataToBeWritten, () => {});
  } else {
    return { name: "This route works in development mode only" };
  }
};
