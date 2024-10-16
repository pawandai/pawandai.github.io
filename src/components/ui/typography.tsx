"use client";

import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const typographyVariants = cva("text-gray-600 dark:text-gray-200 text-normal", {
  variants: {
    variant: {
      h1: "text-4xl font-semibold tablet:font-bold tablet:text-5xl tablet:tracking-[-0.02em] lg:text-6xl lg:leading-[72px] text-gray-900",
      h2: "text-3xl tablet:text-4xl font-semibold tracking-[-0.02em] text-gray-900",
      h3: "text-2xl tablet:text-3xl font-semibold tracking-[-0.02em] text-gray-900",
      subtitle: "text-lg tablet:text-xl",
      body1: "text-base tablet:text-lg",
      body2: "text-base",
      body3: "text-sm",
    },
  },
  defaultVariants: {
    variant: "body2",
  },
});

interface TypographyProps
  extends React.DetailedHTMLProps<
      React.HTMLAttributes<HTMLHeadingElement>,
      HTMLHeadingElement
    >,
    VariantProps<typeof typographyVariants> {
  component?: React.ElementType;
}

const elementMapping = {
  h1: "h1",
  h2: "h2",
  h3: "h3",
  subtitle: "p",
  body1: "p",
  body2: "p",
  body3: "p",
};

type ComponentElement = "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "p" | "span";

const Typography = React.forwardRef<
  HTMLHeadingElement | HTMLParagraphElement,
  TypographyProps
>(
  (
    { component, className = "", variant, children, ...props }: TypographyProps,
    ref
  ) => {
    const Comp = (
      component ? component : variant ? elementMapping[variant] : "p"
    ) as ComponentElement;

    return (
      <Comp
        className={cn(typographyVariants({ variant }), className)}
        ref={ref}
        {...props}
      >
        {children}
      </Comp>
    );
  }
);

Typography.displayName = "Typography";

export default Typography;
