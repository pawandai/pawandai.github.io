"use client";

import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { MoveRight } from "lucide-react";
import { ReactNode, useEffect, useMemo, useState } from "react";
import clsx from "clsx";

type Props = {
  defaultOpen?: boolean;
  children: ReactNode;
  className?: string;
};

const MenuOptions = ({ defaultOpen, children, className }: Props) => {
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
          "bg-white !z-[110] fixed top-0 border-r-[1px] p-6 shadow-none overflow-y-scroll thin-scrollbar",
          className,
          {
            "hidden md:inline-block z-0 w-[280px] xl:w-[300px] 2xl:w-[360px]":
              defaultOpen,
            "inline-block md:hidden z-[100] w-full": !defaultOpen,
          }
        )}
      >
        {children}
      </SheetContent>
    </Sheet>
  );
};

export default MenuOptions;
