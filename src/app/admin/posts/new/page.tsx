"use client";

import Link from "next/link";
import { v4 as uuidv4 } from "uuid";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { ContentLayout } from "@/components/shared/admin/contentLayout";
import BlogEditor from "@/components/shared/blog/editor";

export default function NewPostPage() {
  return (
    <ContentLayout title="New Post">
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <Link href="/admin">Dashboard</Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <Link href="/posts">Posts</Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>New</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <BlogEditor
        type="new"
        post={{
          category: "",
          content: "",
          date: "",
          id: uuidv4(),
          image: "",
          preview: "",
          slug: "",
          tags: "",
          title: "",
          topics: "",
          createdAt: new Date(),
          timeToRead: "",
        }}
      />
    </ContentLayout>
  );
}
