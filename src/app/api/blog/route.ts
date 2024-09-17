import { NextResponse } from "next/server";

export async function GET() {
  const slugs = await fetch(
    "https://pawandai-github.vercel.app/api/blog/slugs"
  ).then((res) => res.json());
  const response = slugs.map(
    async (slug: string) =>
      await fetch("https://pawandai-github.vercel.app/api/blog/" + slug).then(
        (res) => res.json()
      )
  );
  // sort posts by date in descending order
  const posts = await Promise.all(response);
  const sortedPosts = posts.sort((post1, post2) =>
    post1.createdAt > post2.createdAt ? -1 : 1
  );
  return NextResponse.json(sortedPosts);
}
