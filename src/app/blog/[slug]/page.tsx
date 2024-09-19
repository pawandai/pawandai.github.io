import ContentSection from "@/components/shared/blog/content";
import DoubleSidebar from "@/components/shared/doublesidebar";
import { useGetPostBySlug } from "@/hooks/useSelector";
// import { fetchApi } from "@/lib/fetchApi";
// import { getApiUrl } from "@/lib/utils";
// import { Post } from "@/types";

interface BlogDetailsPageProps {
  params: { slug: string };
}

// export async function generateMetadata({
//   params,
// }: {
//   params: { slug: string; post: Post };
// }) {
//   // const url = getApiUrl();
//   const post = await fetchApi(`/api/blog/${params.slug}`);

//   if (!post) {
//     return {
//       notFound: true,
//     };
//   }
//   return {
//     title: post.title,
//     props: {
//       post: post,
//     },
//   };
// }

// export async function generateStaticParams() {
//   // const url = getApiUrl();
//   const posts = await fetchApi(`/api/blog`);

//   return posts.map((post: Post) => ({
//     slug: post.slug,
//   }));
// }

const BlogDetailsPage = async ({ params }: BlogDetailsPageProps) => {
  const post = useGetPostBySlug(params.slug);
  return (
    <DoubleSidebar selectedPost={post}>
      <ContentSection content={post.content} />
    </DoubleSidebar>
  );
};

export default BlogDetailsPage;
