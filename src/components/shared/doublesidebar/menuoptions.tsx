"use client";

import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { MoveRight } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import clsx from "clsx";
import Link from "next/link";

type Props = {
  defaultOpen?: boolean;
};

const MenuOptions = ({ defaultOpen }: Props) => {
  const [isMounted, setIsMounted] = useState<boolean>(false);
  const openState = useMemo(
    () => (defaultOpen ? { open: true } : {}),
    [defaultOpen]
  );

  useEffect(() => {
    setIsMounted(true);
  }, []);

  return (
    <Sheet modal={false} {...openState}>
      {isMounted && (
        <SheetTrigger
          asChild
          className="fixed left-0 top-28 z-[100] md:!hidden flex opacity-80 backdrop-blur-3xl"
        >
          <Button variant="secondary" className="rounded-full" size="icon">
            <MoveRight />
          </Button>
        </SheetTrigger>
      )}
      <SheetContent
        showX={!defaultOpen}
        side="left"
        className={clsx(
          "bg-white !z-[110] fixed top-0 border-r-[1px] p-6 shadow-none",
          {
            "hidden md:inline-block z-0 w-[280px]": defaultOpen,
            "inline-block md:hidden z-[100] w-full": !defaultOpen,
          }
        )}
      >
        <div className="sticky top-4 space-y-4">
          <div className="text-lg font-semibold">Blog Posts</div>
          <nav className="space-y-2">
            <Link
              href="#"
              className="block text-sm text-muted-foreground hover:text-foreground"
              prefetch={false}
            >
              The Future of Web Development
            </Link>
            <Link
              href="#"
              className="block text-sm text-muted-foreground hover:text-foreground"
              prefetch={false}
            >
              Mastering React Hooks
            </Link>
            <Link
              href="#"
              className="block text-sm text-muted-foreground hover:text-foreground"
              prefetch={false}
            >
              Serverless Architecture Explained
            </Link>
            <Link
              href="#"
              className="block text-sm text-muted-foreground hover:text-foreground"
              prefetch={false}
            >
              Accessibility in Web Design
            </Link>
            <Link
              href="#"
              className="block text-sm text-muted-foreground hover:text-foreground"
              prefetch={false}
            >
              The Rise of Headless CMS
            </Link>
          </nav>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default MenuOptions;
