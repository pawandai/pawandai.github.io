"use client";

import { useSidebarToggle } from "@/hooks/useSidebarToggle";
import { useStore } from "@/hooks/useStore";
import { cn } from "@/lib/utils";
import { Sidebar } from "./sidebar";
import { ReactNode } from "react";

export default function AdminPanelLayout({
  children,
}: {
  children: ReactNode;
}) {
  const sidebar = useStore(useSidebarToggle, (state) => state);

  if (!sidebar) return null;

  return (
    <>
      <Sidebar />
      <main
        className={cn(
          "min-h-[calc(100vh_-_56px)] bg-zinc-50 dark:bg-zinc-900 transition-[margin-left] ease-in-out duration-300",
          sidebar?.isOpen === false ? "lg:ml-[90px]" : "lg:ml-72"
        )}
      >
        {children}
      </main>
    </>
  );
}
