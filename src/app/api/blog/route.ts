import matter from "gray-matter";
import { NextResponse } from "next/server";
import { join } from "path";
import fs from "fs/promises";
// import { getApiUrl } from "@/lib/utils";
import { fetchApi } from "@/lib/fetchApi";

export async function GET() {
  // const url = getApiUrl();
  const slugs = await fetchApi(`/api/slugs`);
  const response = slugs.map(async (slug: string) => {
    const postsDirectory = join(process.cwd(), "src", "_blogs");
    const realSlug = slug.replace(/\.md$/, "");
    const fullPath = join(postsDirectory, `${realSlug}.md`);
    const fileContents = await fs.readFile(fullPath, "utf8");
    const { data, content } = matter(fileContents);

    return { ...data, content };
  });
  // sort posts by date in descending order
  const posts = await Promise.all(response);
  const sortedPosts = posts.sort((post1, post2) =>
    post1.createdAt > post2.createdAt ? -1 : 1
  );
  return NextResponse.json(sortedPosts);
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function POST(req: any) {
  const postsfolder = join(
    process.cwd(),
    "src",
    "_blogs",
    `${req.body.data.slug}.md`
  );
  if (process.env.NODE_ENV === "development") {
    const dataToBeWritten = matter.stringify(
      req.body.data?.content,
      req.body.data.variables
    );
    fs.writeFile(postsfolder, dataToBeWritten);
    return NextResponse.json({ message: "Post saved successfully" });
  } else {
    return NextResponse.json({
      name: "This route works in development mode only",
    });
  }
}

export async function DELETE(req: Request) {
  const deletedFile = join(process.cwd(), "src", "_blogs", `${req.body}.md`);
  fs.unlink(deletedFile);
  return NextResponse.json({ message: "Post deleted successfully" });
}
