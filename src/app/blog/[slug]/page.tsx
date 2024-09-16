import { getPostBySlug, getPostSlugs } from "@/actions/blog.action";
import ContentSection from "@/components/shared/blog/content";
import DoubleSidebar from "@/components/shared/doublesidebar";

interface BlogDetailsPageProps {
  params: { slug: string };
}

const BlogDetailsPage = async ({ params }: BlogDetailsPageProps) => {
  const post = await getPostBySlug(params.slug, [
    "date",
    "slug",
    "preview",
    "title",
    "tags",
    "timeToRead",
    "topics",
    "preview",
    "image",
    "content",
  ]);

  return (
    <DoubleSidebar selectedPost={post}>
      <ContentSection content={post.content} />
    </DoubleSidebar>
  );
};

export async function generateStaticParams() {
  const posts = await getPostSlugs();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return posts.map((post: any) => ({
    slug: post.slug,
  }));
}

BlogDetailsPage.generateStaticParams = generateStaticParams;

export default BlogDetailsPage;
