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
  const response = await fetch(`http://localhost:3000/api/blog/${slug}`);
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
