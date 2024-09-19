"use client";

import { getApi } from "@/lib/api";
import { getApiUrl } from "@/lib/utils";
import { Post } from "@/types";
import { useEffect, useState } from "react";

export const useGetAllPosts = () => {
  const [data, setData] = useState<Post[]>([]);

  useEffect(() => {
    const url = getApiUrl();
    const fetchData = async () => {
      const response = (await getApi(`${url}/api/blog`)) as Post[];
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
