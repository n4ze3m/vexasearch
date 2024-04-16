import remarkGfm from "remark-gfm";
import remarkMath from "remark-math";
import ReactMarkdown from "react-markdown";
import "property-information";
import React from "react";

export default function Markdown({ message }: { message: string }) {

  return (
    <React.Fragment>
      <ReactMarkdown
        className="prose break-words dark:prose-invert  prose-p:leading-relaxed prose-pre:p-0 dark:prose-dark"
        remarkPlugins={[remarkGfm, remarkMath]}
        components={{
         
          a({ node, ...props }) {
            return (
              <a
                target="_blank"
                rel="noreferrer"
                className="text-blue-500  hover:underline"
                {...props}
              >
                {props.children}
              </a>
            );
          },
          p({ children }) {
            return <p className="mb-2 last:mb-0">{children}</p>;
          },
        }}
      >
        {message}
      </ReactMarkdown>
    </React.Fragment>
  );
}
