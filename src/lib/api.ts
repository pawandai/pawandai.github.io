import { Post } from "@/types";

export const getApi = (url: string) => fetch(url).then((res) => res.json());

export const postApi = (url: string, data: Post) =>
  fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  }).then((res) => res.json());

export const deleteApi = async (url: string, id: string) => {
  return fetch(url, {
    method: "DELETE",
    body: JSON.stringify({ id }),
  }).then((res) => res.json());
};
