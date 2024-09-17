import { getAllPosts } from "@/actions/blog.action";
import ContentSection from "@/components/shared/blog/content";
import DoubleSidebar from "@/components/shared/doublesidebar";
import { useGetPostBySlug } from "@/hooks/useSelector";
import { Post } from "@/types";

interface BlogDetailsPageProps {
  params: { slug: string };
}

const BlogDetailsPage = ({ params }: BlogDetailsPageProps) => {
  const post = useGetPostBySlug(params.slug) as Post;

  return (
    <DoubleSidebar selectedPost={post}>
      <ContentSection content={post.content} />
    </DoubleSidebar>
  );
};

export async function generateStaticParams() {
  const posts = await getAllPosts();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export default BlogDetailsPage;
