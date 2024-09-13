import BlogLayout from "@/components/shared/blog/blogLayout";
import Header from "@/components/shared/header";

const BlogPage = () => {
  return (
    <>
      <Header isBlog={true} />
      <div>
        <BlogLayout />
      </div>
    </>
  );
};

export default BlogPage;
