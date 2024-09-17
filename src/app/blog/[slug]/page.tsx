import { getAllPosts, getPostBySlug } from "@/actions/blog.action";
import ContentSection from "@/components/shared/blog/content";
import DoubleSidebar from "@/components/shared/doublesidebar";
import { Post } from "@/types";

interface BlogDetailsPageProps {
  params: { slug: string };
}

const BlogDetailsPage = ({ params }: BlogDetailsPageProps) => {
  const post = getPostBySlug(params.slug, [
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
  ]) as Post;

  return (
    <DoubleSidebar selectedPost={post!}>
      <ContentSection content={post?.content as string} />
    </DoubleSidebar>
  );
};

export async function generateStaticParams() {
  const posts = getAllPosts();
  return posts.map((p) => ({
    slug: p.slug,
  }));
}

export default BlogDetailsPage;
