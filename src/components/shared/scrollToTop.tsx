import { usePathname } from "next/navigation";
import type { PropsWithChildren } from "react";
import { useLayoutEffect } from "react";

function ScrollToTop({ children }: PropsWithChildren) {
  const pathname = usePathname();

  useLayoutEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return <>{children}</>;
}

export default ScrollToTop;
