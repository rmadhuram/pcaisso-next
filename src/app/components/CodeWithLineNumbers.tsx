import React from "react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { prism } from "react-syntax-highlighter/dist/esm/styles/prism";

interface CodeWithLineNumbersProps {
  language: string;
  code: string;
}

const CodeWithLineNumbers: React.FC<CodeWithLineNumbersProps> = ({
  language,
  code,
}) => {
  return (
    <SyntaxHighlighter language={language} style={prism} showLineNumbers={true}>
      {code}
    </SyntaxHighlighter>
  );
};

export default CodeWithLineNumbers;
