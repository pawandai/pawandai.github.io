import ContentSection from "@/components/shared/blog/content";
import DoubleSidebar from "@/components/shared/doublesidebar";
import { getApi } from "@/lib/api";
import { getApiUrl } from "@/lib/utils";
import { Post } from "@/types";

interface BlogDetailsPageProps {
  params: { slug: string };
}

export async function generateMetadata({
  params,
}: {
  params: { slug: string; post: Post };
}) {
  const url = getApiUrl();
  const post = await getApi(`${url}/api/blog/${params.slug}`);

  if (!post) {
    return {
      notFound: true,
    };
  }
  return {
    title: post.title,
  };
}

export async function generateStaticParams() {
  const url = getApiUrl();
  const posts = await getApi(`${url}/api/blog`);

  return posts.map((post: Post) => ({
    slug: post.slug,
  }));
}

const BlogDetailsPage = async ({ params }: BlogDetailsPageProps) => {
  const url = getApiUrl();
  const post = await getApi(`${url}/api/blog/${params.slug}`);
  return (
    <DoubleSidebar selectedPost={post}>
      <ContentSection content={post.content} />
    </DoubleSidebar>
  );
};

export default BlogDetailsPage;
