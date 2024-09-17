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

export async function generateStaticParams() {
  const posts = await getAllPosts();

  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export default BlogDetailsPage;
