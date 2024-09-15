"use client";

import { useState } from "react";
import { useTheme } from "next-themes";
import TextareaAutosize from "react-textarea-autosize";

import "react-datepicker/dist/react-datepicker.css";
import { Button } from "@/components/ui/button";
import { editBlog } from "@/actions/blog.action";
import { Input } from "@/components/ui/input";

interface BlogEditorProps {
  post: { [key: string]: string };
  close: () => void;
  refresh: () => void;
}

const BlogEditor = ({ post, close, refresh }: BlogEditorProps) => {
  const { theme } = useTheme();
  const [currentTabs, setCurrentTabs] = useState("BLOGDETAILS");
  const [blogContent, setBlogContent] = useState(post.content);
  const [blogVariables, setBlogVariables] = useState({
    date: post.date,
    title: post.title,
    tagline: post.tagline,
    preview: post.preview,
    image: post.image,
  });

  const savePost = async () => {
    if (process.env.NODE_ENV === "development") {
      await editBlog({
        slug: post.slug,
        content: blogContent,
        variables: blogVariables,
      });
      close();
      refresh();
    } else {
      alert("This thing only works in development mode.");
    }
  };

  return (
    <div
      className={`fixed z-10 w-screen h-screen overflow-auto top-0 flex flex-col items-center ${
        theme === "dark" ? "bg-black" : "bg-white"
      }`}
    >
      <div className="container my-20">
        <div className="mt-10">
          <div className="z-10 sticky top-12">
            <div className="flex items-center justify-between">
              <h1 className="text-4xl">{blogVariables.title}</h1>
              <div className="flex items-center">
                <Button onClick={savePost}>Save</Button>
                <Button onClick={close}>Close</Button>
              </div>
            </div>
            <div className="flex items-center">
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
              <label className="w-full text-sx opacity-50">Title</label>
              <Input
                value={blogVariables.title}
                onChange={(e) =>
                  setBlogVariables({ ...blogVariables, title: e.target.value })
                }
                className="w-full mt-2 p-4 hover:border-blue-400 rounded-md shadow-lg border-2"
                type="text"
              />
            </div>

            <div className="mt-5 flex flex-col items-center">
              <label className="w-full text-sx opacity-50">Tagline</label>
              <Input
                value={blogVariables.tagline}
                onChange={(e) =>
                  setBlogVariables({
                    ...blogVariables,
                    tagline: e.target.value,
                  })
                }
                className="w-full mt-2 p-4 hover:border-blue-400 rounded-md shadow-lg border-2"
                type="text"
              />
            </div>
            <div className="mt-5 flex flex-col items-center">
              <label className="w-full text-sx opacity-50">preview (SEO)</label>
              <textarea
                value={blogVariables.preview}
                onChange={(e) =>
                  setBlogVariables({
                    ...blogVariables,
                    preview: e.target.value,
                  })
                }
                className="w-full mt-2 p-4 hover:border-blue-400 rounded-md shadow-lg border-2"
              ></textarea>
            </div>
            <div className="mt-5 flex flex-col items-center">
              <label className="w-full text-sx opacity-50">Image</label>
              <input
                value={blogVariables.image}
                onChange={(e) =>
                  setBlogVariables({
                    ...blogVariables,
                    image: e.target.value,
                  })
                }
                className="w-full mt-2 p-4 hover:border-blue-400 rounded-md shadow-lg border-2"
                type="text"
              ></input>
            </div>
          </div>
        )}

        {currentTabs === "CONTENT" && (
          <div className="mt-10">
            <div className="flex flex-col items-center">
              <label className="w-full text-sx opacity-50">Content</label>
              <TextareaAutosize
                className="w-full h-auto mt-5 p-4 border hover:border-blue-400 rounded-xl shadow-xl"
                value={blogContent}
                onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
                  setBlogContent(e.target.value)
                }
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default BlogEditor;
