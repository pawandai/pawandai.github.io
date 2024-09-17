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

export function generateStaticParams() {
  const posts = getAllPosts();
  return posts.then((post) =>
    post.map((p) => ({
      slug: p.slug,
    }))
  );
}

export default BlogDetailsPage;
