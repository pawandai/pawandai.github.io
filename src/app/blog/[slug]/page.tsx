"use server";

import { getAllPosts, getPostBySlug } from "@/actions/blog.action";
import ContentSection from "@/components/shared/blog/content";
import DoubleSidebar from "@/components/shared/doublesidebar";

interface BlogDetailsPageProps {
  params: { slug: string };
}

const BlogDetailsPage = async ({ params }: BlogDetailsPageProps) => {
  const selectedPost = await getPostBySlug(params.slug);

  return (
    <DoubleSidebar selectedPost={selectedPost}>
      <ContentSection content={selectedPost.content} />
    </DoubleSidebar>
  );
};

// Static params generation for SSG (static site generation)
export async function generateStaticParams() {
  const posts = await getAllPosts();
  return posts.map((p) => ({
    slug: p.slug,
  }));
}

export default BlogDetailsPage;
