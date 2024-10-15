import { ReactNode } from "react";
import ReactMarkdown, { Components } from "react-markdown";
import remarkGfm from "remark-gfm";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { dracula } from "react-syntax-highlighter/dist/cjs/styles/prism";
import rehypeKatex from "rehype-katex";
import remarkMath from "remark-math";
import remarkHeaderId from "remark-heading-id";
// import rehypeMathjax from "rehype-mathjax";
// import rehypeParse from 'rehype-parse'
// import rehypeStringify from 'rehype-stringify'
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
      {String(children)}
    </SyntaxHighlighter>
  ) : (
    <div className={`${className}`} {...props}>
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
      remarkPlugins={[remarkMath, remarkGfm, remarkHeaderId]}
      rehypePlugins={[rehypeRaw, rehypeKatex]}
    >
      {content}
    </ReactMarkdown>
  );
};

export default ContentSection;
