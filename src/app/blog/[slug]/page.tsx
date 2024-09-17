import { getAllPosts, getPostBySlug } from "@/actions/blog.action";
import ContentSection from "@/components/shared/blog/content";
import DoubleSidebar from "@/components/shared/doublesidebar";

interface BlogDetailsPageProps {
  params: { slug: string };
}
export const dynamicParams = true;
export const revalidate = 60;

export async function generateStaticParams() {
  const posts = await getAllPosts();

  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export default async function BlogDetailsPage({
  params,
}: BlogDetailsPageProps) {
  const selectedPost = await getPostBySlug(params.slug);

  return (
    <DoubleSidebar selectedPost={selectedPost}>
      <ContentSection content={selectedPost.content} />
    </DoubleSidebar>
  );
}
