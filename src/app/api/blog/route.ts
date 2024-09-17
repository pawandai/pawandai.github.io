import { getPostBySlug, getPostSlugs } from "@/actions/blog.action";

export async function GET() {
  const slugs = await getPostSlugs();
  const response = slugs.map(async (slug) => await getPostBySlug(slug));
  // sort posts by date in descending order
  const posts = await Promise.all(response);
  const sortedPosts = posts.sort((post1, post2) =>
    post1.createdAt > post2.createdAt ? -1 : 1
  );
  return JSON.stringify(sortedPosts);
}
