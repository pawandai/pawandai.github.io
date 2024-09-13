import DoubleSidebar from "@/components/shared/doublesidebar";

interface BlogDetailsPageProps {
  params: { subtitle: string };
}

const BlogDetailsPage = ({}: BlogDetailsPageProps) => {
  return <DoubleSidebar>Hello</DoubleSidebar>;
};

export async function generateStaticParams() {
  const posts = await fetch("https://.../posts").then((res) => res.json());

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return posts.map((post: any) => ({
    slug: post.slug,
  }));
}

export default BlogDetailsPage;
