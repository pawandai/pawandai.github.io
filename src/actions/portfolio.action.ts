"use server";

import { join } from "path";
import fsPromises from "fs/promises";
import { remark } from "remark";
import html from "remark-html";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const saveDataToFile = async (data: any) => {
  const portfolioData = join(process.cwd(), "src", "data", "index.json");
  if (process.env.NODE_ENV === "development") {
    await fsPromises.writeFile(portfolioData, JSON.stringify(data), "utf-8");
    return "Data saved";
  }
};

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
