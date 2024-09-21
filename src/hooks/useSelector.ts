"use client";

import { getApi } from "@/lib/api";
import { getApiUrl } from "@/lib/utils";
import { Post } from "@/types";
import { useEffect, useState } from "react";

export const useGetAllPosts = () => {
  const [data, setData] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const url = getApiUrl();
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = (await getApi(`${url}/api/blog`)) as Post[];
        setData(response);
        setLoading(false);
      } catch (error) {
        console.error(error);
        setLoading(false);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  return { data, loading };
};

export const useGetPostBySlug = (slug: string) => {
  const [data, setData] = useState<Post>({
    category: "",
    content: "",
    createdAt: "",
    id: "",
    slug: "",
    tags: "",
    timeToRead: "",
    title: "",
    topics: "",
    image: "",
  });

  useEffect(() => {
    const url = getApiUrl();
    const fetchData = async () => {
      const response = (await getApi(`${url}/api/blog/${slug}`)) as Post;
      setData(response);
    };
    fetchData();
  }, [slug]);

  return data;
};
