"use client";

import { useMemo, useState } from "react";
import MenuOptions from "../doublesidebar/menuoptions";
import { blogPosts } from "@/constants";
import { SearchIcon } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { BlogCard } from "./card";
import Container from "@/components/ui/container";

interface BlogFilterProps {
  searchTerm: string;
  setSearchTerm: (searchTerm: string) => void;
  categories: string[];
  selectedCategory: string | null;
  setSelectedCategory: (category: string | null) => void;
  tags: string[];
  selectedTags: string[];
  setSelectedTags: (tags: string[]) => void;
}

const BlogFilter = ({
  searchTerm,
  setSearchTerm,
  categories,
  selectedCategory,
  setSelectedCategory,
  tags,
  selectedTags,
  setSelectedTags,
}: BlogFilterProps) => {
  return (
    <div className="bg-background p-2 pt-16 overflow-y-scroll">
      <div className="mb-6">
        <h2 className="text-2xl font-semibold mb-2">Filter Blogs</h2>
        {/* Search Filter */}
        <div className="relative">
          <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
          <Input
            type="text"
            placeholder="Search blog posts..."
            className="pl-10 pr-4 py-2 rounded-lg bg-muted w-full"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      <div className="mb-6">
        <h3 className="text-lg font-semibold mb-2">Categories</h3>
        {/* Category Filter */}
        <div className="flex flex-wrap gap-2">
          {categories.map((category) => (
            <Button
              key={category}
              variant={selectedCategory === category ? "default" : "outline"}
              onClick={() =>
                setSelectedCategory(
                  selectedCategory === category ? null : category
                )
              }
              className={`px-4 py-2 rounded-lg ${
                selectedCategory === category
                  ? "bg-primary text-primary-foreground"
                  : "text-muted-foreground hover:bg-muted/50"
              }`}
            >
              {category}
            </Button>
          ))}
        </div>
      </div>

      <div className="mb-6">
        <h3 className="text-lg font-semibold mb-2">Tags</h3>
        {/* Tags Filter */}
        <div className="flex flex-wrap gap-2">
          {tags.map((tag) => (
            <Button
              key={tag}
              variant={selectedTags.includes(tag) ? "default" : "outline"}
              onClick={() => {
                if (selectedTags.includes(tag)) {
                  setSelectedTags(selectedTags.filter((t) => t !== tag));
                } else {
                  setSelectedTags([...selectedTags, tag]);
                }
              }}
              className={`px-4 py-2 rounded-lg ${
                selectedTags.includes(tag)
                  ? "bg-primary text-primary-foreground"
                  : "text-muted-foreground hover:bg-muted/50"
              }`}
            >
              {tag}
            </Button>
          ))}
        </div>
      </div>
    </div>
  );
};

const BlogLayout = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);

  const filteredPosts = useMemo(
    () =>
      blogPosts.filter((post) => {
        if (selectedCategory && post.category !== selectedCategory) {
          return false;
        }
        if (
          selectedTags.length > 0 &&
          !selectedTags.every((tag) => post.tags.includes(tag))
        ) {
          return false;
        }
        return (
          post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          post.content.toLowerCase().includes(searchTerm.toLowerCase())
        );
      }),
    [searchTerm, selectedCategory, selectedTags]
  );

  const categories = useMemo(() => {
    return Array.from(new Set(blogPosts.map((post) => post.category)));
  }, []);

  const tags = useMemo(() => {
    return Array.from(new Set(blogPosts.flatMap((post) => post.tags)));
  }, []);

  return (
    <Container className="grid md:grid-cols-[240px_1fr] grid-cols-1 gap-8 p-4 sm:p-8">
      <aside>
        <MenuOptions defaultOpen={true}>
          <BlogFilter
            categories={categories}
            searchTerm={searchTerm}
            selectedCategory={selectedCategory}
            selectedTags={selectedTags}
            setSearchTerm={setSearchTerm}
            setSelectedCategory={setSelectedCategory}
            setSelectedTags={setSelectedTags}
            tags={tags}
          />
        </MenuOptions>
        <MenuOptions>
          <BlogFilter
            categories={categories}
            searchTerm={searchTerm}
            selectedCategory={selectedCategory}
            selectedTags={selectedTags}
            setSearchTerm={setSearchTerm}
            setSelectedCategory={setSelectedCategory}
            setSelectedTags={setSelectedTags}
            tags={tags}
          />
        </MenuOptions>
      </aside>
      <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-1 lg:grid-cols-2 gap-4 align-middle items-center">
        {filteredPosts.length > 0 ? (
          filteredPosts.map((post) => (
            <BlogCard
              key={post.id}
              preview="this is the preview"
              slug="first-post"
              thumbnail="/projects/task_manager/tasks.jpeg"
              title={post.title}
              tags={post.tags}
            />
          ))
        ) : (
          <p className="text-muted-foreground">No blog posts found.</p>
        )}
      </section>
    </Container>
  );
};

export default BlogLayout;
