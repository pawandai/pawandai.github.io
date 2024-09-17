import ContentSection from "@/components/shared/blog/content";
import DoubleSidebar from "@/components/shared/doublesidebar";
import { Post } from "@/types";

interface BlogDetailsPageProps {
  params: { slug: string };
}

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}) {
  const post = await fetch(
    `https://pawandai-github.vercel.app/blog/${params.slug}`,
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  ).then((res) => res.json());

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
  const response = await fetch("https://pawandai-github.vercel.app/blog", {
    headers: {
      "Content-Type": "application/json",
    },
  });
  const posts = await response.json();

  return posts.map((post: Post) => ({
    slug: post.slug,
  }));
}

const BlogDetailsPage = async ({ params }: BlogDetailsPageProps) => {
  const { slug } = params;
  let baseUrl;
  if (process.env.NODE_ENV === "development") baseUrl = "http://localhost:3000";
  else baseUrl = "https://pawandai-github.vercel.app";

  const response = await fetch(`${baseUrl}/api/blog/${slug}`, {
    headers: {
      "Content-Type": "application/json",
    },
  });
  const post: Post = await response.json();

  return (
    <DoubleSidebar selectedPost={post}>
      <ContentSection content={post.content} />
    </DoubleSidebar>
  );
};

export default BlogDetailsPage;
