"use server";

import { Post } from "@/types";
import matter from "gray-matter";
import { join } from "path";
import fs from "fs/promises";

export const upsertBlog = async (post: Post) => {
  const fileToBeWritten = join(
    process.cwd(),
    "src",
    "_blogs",
    `${post.slug}.md`
  );
  if (process.env.NODE_ENV === "development") {
    const dataToBeWritten = matter.stringify(post.content, post);
    try {
      await fs.writeFile(fileToBeWritten, dataToBeWritten);
    } catch (error) {
      console.error(error);
    }
    return { message: "Post saved successfully" };
  } else {
    return {
      name: "This route works in development mode only",
    };
  }
};
