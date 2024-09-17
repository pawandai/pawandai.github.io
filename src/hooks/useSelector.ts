"use client";

import { getAllPosts, getPostBySlug } from "@/actions/blog.action";
import { Post } from "@/types";
import { useEffect, useState } from "react";

export const useGetAllPosts = () => {
  const [data, setData] = useState<Post[]>();

  useEffect(() => {
    const fetchData = async () => {
      const response = (await getAllPosts([
        "createdAt",
        "slug",
        "preview",
        "title",
        "tags",
        "topics",
        "image",
        "content",
        "category",
        "timeToRead",
      ])) as Post[];
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
      const response = (await getPostBySlug(slug, [
        "createdAt",
        "slug",
        "preview",
        "title",
        "tags",
        "topics",
        "image",
        "content",
        "category",
        "timeToRead",
      ])) as Post;
      setData(response);
    };
    fetchData();
  }, [slug]);

  return data;
};
