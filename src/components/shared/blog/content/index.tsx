import { ReactNode } from "react";
import ReactMarkdown, { Components } from "react-markdown";
import remarkGfm from "remark-gfm";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { dracula } from "react-syntax-highlighter/dist/cjs/styles/prism";
import rehypeKatex from "rehype-katex";
import remarkMath from "remark-math";
import remarkReferenceLinks from "remark-reference-links";
import rehypeRaw from "rehype-raw";

interface CodeProps {
  node: unknown;
  inline: boolean;
  className?: string;
  children: ReactNode;
  [key: string]: unknown;
}

export const CodeBlock = ({
  inline,
  className,
  children,
  ...props
}: CodeProps) => {
  const match = /language-(\w+)/.exec(className || "");
  return !inline && match ? (
    <SyntaxHighlighter
      style={dracula}
      language={match[1]}
      PreTag="div"
      {...props}
    >
      {String(children).replace(/\n$/, "")}
    </SyntaxHighlighter>
  ) : (
    <div className={className} {...props}>
      {children}
    </div>
  );
};

interface ContentSectionProps {
  content: string;
}

const ContentSection = ({ content }: ContentSectionProps) => {
  return (
    <ReactMarkdown
      components={CodeBlock as Partial<Components>}
      className="markdown-body"
      remarkPlugins={[remarkMath, remarkReferenceLinks, remarkGfm]}
      rehypePlugins={[rehypeKatex, rehypeRaw]}
      allowElement={(element) => element.tagName !== "script"}
    >
      {content}
    </ReactMarkdown>
  );
};

export default ContentSection;
