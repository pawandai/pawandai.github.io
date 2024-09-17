"use client";

import { getAllPosts, getPostBySlug } from "@/actions/blog.action";
import { Post } from "@/types";
import { useEffect, useState } from "react";

export const useGetAllPosts = () => {
  const [data, setData] = useState<Post[]>();

  useEffect(() => {
    const fetchData = async () => {
      const response = (await getAllPosts()) as Post[];
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
      const response = (await getPostBySlug(slug)) as Post;
      setData(response);
    };
    fetchData();
  }, [slug]);

  return data;
};
