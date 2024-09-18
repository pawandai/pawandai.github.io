import { Post } from "@/types";
import { useEffect, useState } from "react";

export const useGetAllPosts = () => {
  const [data, setData] = useState<Post[]>();

  useEffect(() => {
    const fetchData = async () => {
      const response = (await fetch(
        "https://pawandai-github.vercel.app/api/blog"
      ).then((res) => res.json())) as Post[];
      setData(response);
    };
    fetchData();
  }, []);

  return data;
};

export const useGetPostBySlug = (slug: string) => {
  const [data, setData] = useState<Post>();

  useEffect(() => {
    const fetchData = async () => {
      const response = (await fetch(
        `https://pawandai-github.vercel.app/api/blog${slug}`
      ).then((res) => res.json())) as Post;
      setData(response);
    };
    fetchData();
  }, [slug]);

  return data;
};
