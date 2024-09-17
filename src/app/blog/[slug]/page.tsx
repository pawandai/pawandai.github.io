import { getAllPosts, getPostBySlug } from "@/actions/blog.action";
import ContentSection from "@/components/shared/blog/content";
import DoubleSidebar from "@/components/shared/doublesidebar";
import { Post } from "@/types";

interface BlogDetailsPageProps {
  description: string;
  params: { slug: string };
}

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}) {
  const post = await getPostBySlug(params.slug);

  if (!post) {
    return {
      notFound: true,
    };
  }
  return {
    title: post.title,
  };
}

const BlogDetailsPage = async ({ params }: BlogDetailsPageProps) => {
  const { slug } = params;
  let baseUrl;
  if (process.env.NODE_ENV === "development") baseUrl = "http://localhost:3000";
  else baseUrl = "https://pawandai.com.np";

  const response = await fetch(`${baseUrl}/api/blog/${slug}`);
  const post: Post = await response.json();

  return (
    <DoubleSidebar selectedPost={post}>
      <ContentSection content={post.content} />
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
