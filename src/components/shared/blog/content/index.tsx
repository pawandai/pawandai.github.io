import { ReactNode } from "react";
import ReactMarkdown, { Components } from "react-markdown";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { dracula } from "react-syntax-highlighter/dist/cjs/styles/prism";

interface CodeProps {
  node: unknown;
  inline: boolean;
  className?: string;
  children: ReactNode;
  [key: string]: unknown;
}

const CodeBlock = ({ inline, className, children, ...props }: CodeProps) => {
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
    <code className={className} {...props}>
      {children}
    </code>
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
    >
      {content}
    </ReactMarkdown>
  );
};

export default ContentSection;
