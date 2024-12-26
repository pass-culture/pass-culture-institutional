import hljs from "highlight.js/lib/core";
import xml from "highlight.js/lib/languages/xml";
import "highlight.js/styles/default.css";
import React, { CSSProperties } from "react";
import DOMPurify from "dompurify";

hljs.registerLanguage("xml", xml);

const style: CSSProperties = {
  overflow: "auto",
  maxWidth: "100%",
  whiteSpace: "pre-wrap",
  wordWrap: "break-word" as const,
};
export default function CodeBlock({ content }: { content: string }) {
  const myCode = content;

  const myHtml = DOMPurify.sanitize(hljs.highlightAuto(myCode).value);

  return (
    <pre style={style}>
      <code className="xml" dangerouslySetInnerHTML={{ __html: myHtml }} />
    </pre>
  );
}
