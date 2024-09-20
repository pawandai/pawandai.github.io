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

export async function POST(req: Request) {
  const { data } = await req.json();
  const postsfolder = join(
    process.cwd(),
    "src",
    "_blogs",
    `${data.variables.slug}.md`
  );
  if (process.env.NODE_ENV === "development") {
    const dataToBeWritten = matter.stringify(data.content, data.variables);
    await fs.writeFile(postsfolder, dataToBeWritten);
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

export async function generateStaticParams() {
  const postsDirectory = join(process.cwd(), "src", "_blogs");
  const slugs = await fs.readdir(postsDirectory);
  return slugs.map((post: string) => ({
    slug: post.replace(/\.md$/, ""),
  }));
}
