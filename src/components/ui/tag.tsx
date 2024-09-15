import { cn } from "@/lib/utils";
import Typography from "./typography";
import { forwardRef } from "react";

interface TagProps extends React.HTMLAttributes<HTMLDivElement> {
  label?: string;
}

const Tag = forwardRef<HTMLDivElement, TagProps>(
  ({ label, className, ...props }: TagProps) => {
    return (
      <div
        className={cn(
          "flex items-center justify-center rounded-xl bg-gray-200 px-5 py-1",
          className
        )}
        {...props}
      >
        <Typography variant="body3" className="font-medium">
          {label}
        </Typography>
      </div>
    );
  }
);

Tag.displayName = "Tag";

export default Tag;
