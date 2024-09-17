"use client";

import { useState } from "react";
import TextareaAutosize from "react-textarea-autosize";

import { Button } from "@/components/ui/button";
import { upsertBlog } from "@/actions/blog.action";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";
import { Post } from "@/types";

interface BlogEditorProps {
  post: Post;
}

const BlogEditor = ({ post }: BlogEditorProps) => {
  const router = useRouter();
  const [currentTabs, setCurrentTabs] = useState("BLOGDETAILS");
  const [blogContent, setBlogContent] = useState(post.content);
  const [blogVariables, setBlogVariables] = useState({
    date: post.date,
    category: post.category,
    title: post.title,
    slug: post.slug,
    tags: post.tags,
    timeToRead: post.timeToRead,
    topics: post.topics,
    preview: post.preview,
    image: post.image,
  });

  const savePost = () => {
    if (process.env.NODE_ENV === "development") {
      upsertBlog({
        slug: post.slug,
        content: blogContent,
        variables: blogVariables,
      });
      router.push(`/blog/${post.slug}`);
    } else {
      alert("This thing only works in development mode.");
    }
  };

  return (
    <div className="container overflow-x-hidden overflow-y-scroll p-2">
      <div className="mt-10">
        <div className="z-10 sticky top-12">
          <div className="flex items-center justify-between gap-2 mb-4">
            <h1 className="text-4xl">{blogVariables.title}</h1>
            <Button onClick={savePost}>Save</Button>
          </div>
          <div className="flex items-center gap-4">
            <Button
              onClick={() => setCurrentTabs("BLOGDETAILS")}
              variant={currentTabs === "BLOGDETAILS" ? "default" : "outline"}
            >
              Blog Details
            </Button>
            <Button
              onClick={() => setCurrentTabs("CONTENT")}
              variant={currentTabs === "CONTENT" ? "default" : "outline"}
            >
              Content
            </Button>
          </div>
        </div>
      </div>
      {currentTabs === "BLOGDETAILS" && (
        <div className="mt-10">
          <div className="mt-5 flex flex-col items-center">
            <label className="w-full text-sx opacity-50" htmlFor="title">
              Title
            </label>
            <Input
              id="title"
              value={blogVariables.title}
              onChange={(e) =>
                setBlogVariables({ ...blogVariables, title: e.target.value })
              }
              className="w-full mt-2 p-4 rounded-md border-2"
              type="text"
            />
          </div>
          <div className="mt-5 flex flex-col items-center">
            <label className="w-full text-sx opacity-50" htmlFor="slug">
              Slug
            </label>
            <Input
              id="slug"
              value={blogVariables.slug}
              onChange={(e) =>
                setBlogVariables({ ...blogVariables, slug: e.target.value })
              }
              disabled={blogVariables.slug.length > 0}
              className="w-full mt-2 p-4 rounded-md border-2"
              type="text"
            />
          </div>
          <div className="mt-5 flex flex-col items-center">
            <label className="w-full text-sx opacity-50" htmlFor="category">
              Category
            </label>
            <Input
              id="category"
              value={blogVariables.category}
              onChange={(e) =>
                setBlogVariables({ ...blogVariables, category: e.target.value })
              }
              className="w-full mt-2 p-4 rounded-md border-2"
              type="text"
            />
          </div>

          <div className="mt-5 flex flex-col items-center">
            <label className="w-full text-sx opacity-50" htmlFor="tags">
              Tags{" "}
              <span className="text-muted-foreground">
                (comma separated) (eg: travel, joke, programming)
              </span>
            </label>
            <Input
              id="tags"
              value={blogVariables.tags}
              onChange={(e) =>
                setBlogVariables({
                  ...blogVariables,
                  tags: e.target.value,
                })
              }
              className="w-full mt-2 p-4 rounded-md border-2"
              type="text"
            />
          </div>
          <div className="mt-5 flex flex-col items-center">
            <label className="w-full text-sx opacity-50" htmlFor="preview">
              Preview (SEO)
            </label>
            <TextareaAutosize
              id="preview"
              value={blogVariables.preview as string}
              onChange={(e) =>
                setBlogVariables({
                  ...blogVariables,
                  preview: e.target.value,
                })
              }
              className="w-full mt-2 p-4 rounded-md border-2"
            />
          </div>
          <div className="mt-5 flex flex-col items-center">
            <label className="w-full text-sx opacity-50" htmlFor="image">
              Image URL
            </label>
            <input
              id="image"
              value={blogVariables.image as string}
              onChange={(e) =>
                setBlogVariables({
                  ...blogVariables,
                  image: e.target.value,
                })
              }
              className="w-full mt-2 p-4 rounded-md border-2"
              type="text"
            />
          </div>
        </div>
      )}

      {currentTabs === "CONTENT" && (
        <>
          <div className="mt-10">
            <div className="flex flex-col items-center">
              <label className="w-full text-sx opacity-50" htmlFor="timeToRead">
                Time To Read{" "}
                <span className="text-muted-foreground">(in minutes)</span>
              </label>
              <Input
                id="timeToRead"
                value={blogVariables.timeToRead}
                onChange={(e) =>
                  setBlogVariables({
                    ...blogVariables,
                    timeToRead: e.target.value,
                  })
                }
                className="w-full mt-2 p-4 rounded-md border-2"
                type="text"
              />
            </div>
          </div>
          <div className="mt-5 flex flex-col items-center">
            <label className="w-full text-sx opacity-50" htmlFor="topics">
              Topics{" "}
              <span className="text-muted-foreground">
                (comma separated) (eg: Introduction, What is this?, How it
                works?, Usage, Conclusion)
              </span>
            </label>
            <TextareaAutosize
              id="topics"
              value={blogVariables.topics}
              onChange={(e) =>
                setBlogVariables({
                  ...blogVariables,
                  topics: e.target.value,
                })
              }
              className="w-full mt-2 p-4 rounded-md border-2"
            />
          </div>
          <div className="mt-10">
            <div className="flex flex-col items-center">
              <label className="w-full text-sx opacity-50" htmlFor="content">
                Content <span>(Markdown)</span>
              </label>
              <TextareaAutosize
                id="content"
                className="w-full h-auto mt-5 p-4 border rounded-xl"
                value={blogContent}
                onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
                  setBlogContent(e.target.value)
                }
              />
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default BlogEditor;
