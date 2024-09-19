import { getApiUrl } from "@/lib/utils";
import { Post } from "@/types";
import { useEffect, useState } from "react";

export const useGetAllPosts = () => {
  const [data, setData] = useState<Post[]>();

  const url = getApiUrl();
  useEffect(() => {
    const fetchData = async () => {
      const response = (await fetch(`${url}/api/blog`).then((res) =>
        res.json()
      )) as Post[];
      setData(response);
    };
    fetchData();
  }, []);

  return data;
};

export const useGetPostBySlug = (slug: string) => {
  const [data, setData] = useState<Post>();

  const url = getApiUrl();
  useEffect(() => {
    const fetchData = async () => {
      const response = (await fetch(`${url}/api/blog/${slug}`).then((res) =>
        res.json()
      )) as Post;
      setData(response);
    };
    fetchData();
  }, [slug]);

  return data;
};
