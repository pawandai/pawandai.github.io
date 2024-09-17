"use server";

import { getAllPosts, getPostBySlug } from "@/actions/blog.action";
import ContentSection from "@/components/shared/blog/content";
import DoubleSidebar from "@/components/shared/doublesidebar";
import { Post } from "@/types";

interface BlogDetailsPageProps {
  params: { slug: string };
}

const BlogDetailsPage = async ({ params }: BlogDetailsPageProps) => {
  const post = (await getPostBySlug(params.slug, [
    "createdAt",
    "slug",
    "preview",
    "title",
    "tags",
    "topics",
    "image",
    "content",
    "category",
    "timeToRead",
  ])) as Post;

  return (
    <DoubleSidebar selectedPost={post!}>
      <ContentSection content={post?.content as string} />
    </DoubleSidebar>
  );
};

export function generateStaticParams() {
  const posts = getAllPosts();
  return posts.then((post) =>
    post.map((p) => ({
      slug: p.slug,
    }))
  );
}

export default BlogDetailsPage;
