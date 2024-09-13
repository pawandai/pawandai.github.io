import DoubleSidebar from "@/components/shared/doublesidebar";
import { blogPosts, dummyPosts } from "@/constants";

interface BlogDetailsPageProps {
  params: { slug: string };
}

const BlogDetailsPage = ({ params }: BlogDetailsPageProps) => {
  return (
    <DoubleSidebar selectedPost={blogPosts[2]}>{params.slug}</DoubleSidebar>
  );
};

export async function generateStaticParams() {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return dummyPosts.map((post: any) => ({
    slug: post.slug,
  }));
}

export default BlogDetailsPage;
