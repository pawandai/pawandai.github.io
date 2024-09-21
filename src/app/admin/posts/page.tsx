"use client";

import Link from "next/link";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { ContentLayout } from "@/components/shared/admin/contentLayout";
import { Glasses, SearchIcon } from "lucide-react";
import { BlogCard } from "@/components/shared/blog/card";
import { useMemo, useState } from "react";
import { Input } from "@/components/ui/input";
import Container from "@/components/ui/container";
import { useGetAllPosts } from "@/hooks/useSelector";
import { useRouter } from "next/navigation";

export default function PostsPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const blogPosts = useGetAllPosts();
  const router = useRouter();

  const filteredPosts = useMemo(
    () =>
      blogPosts.data.filter((post) => {
        return (
          post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          post.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
          post.createdAt
            .toLocaleString()
            .toLowerCase()
            .includes(searchTerm.toLowerCase())
        );
      }),
    [blogPosts, searchTerm]
  );

  const refresh = () => {
    router.refresh();
  };

  return (
    <ContentLayout title="All Posts">
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <Link href="/admin">Dashboard</Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>Posts</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <Container>
        <div className="relative mt-3">
          <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
          <Input
            type="text"
            placeholder="Search blog posts..."
            className="pl-12 pr-4 py-5 rounded-lg bg-muted w-full"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <section
          className={`grid grid-cols-1 md:grid-cols-2 ${
            filteredPosts.length > 1 ? "lg:grid-cols-2" : ""
          } gap-4 align-middle items-center`}
        >
          {filteredPosts.length > 0 ? (
            filteredPosts.map((post) => (
              <BlogCard
                post={post}
                key={post.slug}
                preview={post.preview as string}
                slug={post.slug}
                thumbnail={post.image as string}
                title={post.title}
                refresh={refresh}
              />
            ))
          ) : (
            <div className="text-muted-foreground flex flex-col gap-2 items-center justify-center h-[60vh] text-center">
              <Glasses className="h-12 w-12" />
              <span>No blog posts found.</span>
            </div>
          )}
        </section>
      </Container>
    </ContentLayout>
  );
}
