import matter from "gray-matter";
import fs from "fs/promises";
import { join } from "path";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const data = await req.json();
  const fileToBeWritten = join(
    process.cwd(),
    "src",
    "_blogs",
    `${data.slug}.md`
  );
  if (process.env.NODE_ENV === "development") {
    const dataToBeWritten = matter.stringify(data.content, data);
    try {
      await fs.writeFile(fileToBeWritten, dataToBeWritten);
      return NextResponse.json({ message: "Post saved successfully" });
    } catch (error) {
      console.error(error);
    }
  } else {
    return NextResponse.json({
      name: "This route works in development mode only",
    });
  }
}
