import { Post } from "@/types";
import { getApiUrl } from "./utils";

export const getApi = (url: string) =>
  fetch(url, {
    method: "GET",
  }).then((res) => res.json());

export const postApi = (url: string, data: Post) =>
  fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  }).then((res) => res.json());

export const deleteApi = async (id: string) => {
  return fetch(getApiUrl(), {
    method: "DELETE",
    body: JSON.stringify({ id }),
  }).then((res) => res.json());
};
