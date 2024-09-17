import { getAllPosts, getPostBySlug } from "@/actions/blog.action";
import ContentSection from "@/components/shared/blog/content";
import DoubleSidebar from "@/components/shared/doublesidebar";
import { Post } from "@/types";

interface BlogDetailsPageProps {
  params: { slug: string };
}

const BlogDetailsPage = async ({ params }: BlogDetailsPageProps) => {
  const post = (await getPostBySlug(params.slug, ["content"])) as Post;

  return (
    <DoubleSidebar selectedPost={post}>
      <ContentSection content={post.content} />
    </DoubleSidebar>
  );
};

export async function generateStaticParams() {
  const posts = await getAllPosts(["slug"]);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export default BlogDetailsPage;
