"use client";

import { getAllPosts, getPostBySlug } from "@/actions/blog.action";
import ContentSection from "@/components/shared/blog/content";
import DoubleSidebar from "@/components/shared/doublesidebar";
import { Post } from "@/types";
import { useEffect, useState } from "react";

interface BlogDetailsPageProps {
  params: { slug: string };
}

const BlogDetailsPage = ({ params }: BlogDetailsPageProps) => {
  const [post, setPost] = useState<Post>({
    date: new Date(),
    slug: "",
    preview: "",
    title: "",
    tags: "",
    timeToRead: "",
    topics: "",
    image: "",
    content: "",
    category: "",
    createdAt: new Date(),
    id: "",
  });
  useEffect(() => {
    const fetchPost = async () => {
      const response = await getPostBySlug(params.slug, [
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
      setPost(response);
    };
    fetchPost();
  }, [params.slug]);

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
