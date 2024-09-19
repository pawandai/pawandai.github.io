"use client";

import { fetchApi } from "@/lib/fetchApi";
// import { getApiUrl } from "@/lib/utils";
import { Post } from "@/types";
import { useEffect, useState } from "react";

export const useGetAllPosts = () => {
  const [data, setData] = useState<Post[]>([]);

  // const url = getApiUrl();
  useEffect(() => {
    const fetchData = async () => {
      const response = (await fetchApi(`/api/blog`)) as Post[];
      setData(response);
    };
    fetchData();
  }, []);

  return data;
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
  });

  // const url = getApiUrl();
  useEffect(() => {
    const fetchData = async () => {
      const response = (await fetchApi(`/api/blog/${slug}`)) as Post;
      setData(response);
    };
    fetchData();
  }, [slug]);

  return data;
};
