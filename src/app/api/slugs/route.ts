import { join } from "path";
import fs from "fs/promises";
import { NextResponse } from "next/server";

export async function GET() {
  const postsDirectory = join(process.cwd(), "src", "_blogs");
  const data = await fs.readdir(postsDirectory);
  return NextResponse.json(data);
}
