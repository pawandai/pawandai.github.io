import { NextResponse } from "next/server";
import fs from "fs/promises";
import { join } from "path";

export async function GET() {
  const postsDirectory = join(process.cwd(), "src", "_blogs");
  const data = await fs.readdir(postsDirectory);

  return NextResponse.json(data);
}
