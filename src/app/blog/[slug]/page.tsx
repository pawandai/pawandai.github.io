import DoubleSidebar from "@/components/shared/doublesidebar";
import { dummyPosts } from "@/constants";

interface BlogDetailsPageProps {
  params: { slug: string };
}

const BlogDetailsPage = ({}: BlogDetailsPageProps) => {
  return <DoubleSidebar>Hello</DoubleSidebar>;
};

export async function generateStaticParams() {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return dummyPosts.map((post: any) => ({
    slug: post.slug,
  }));
}

export default BlogDetailsPage;
