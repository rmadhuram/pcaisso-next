import { TabView, TabPanel } from "primereact/tabview";
import styles from "./results.module.scss";
import CodeWithLineNumbers from "@/app/components/CodeWithLineNumbers";
import { useState } from "react";
import copy from "clipboard-copy";
import { Button } from "primereact/button";

export default function Results({
  diagram,
  text,
  timetaken,
}: {
  diagram: string;
  text: string;
  timetaken: number;
}) {
  const [isCopied, setIsCopied] = useState(false);

  const handleCopyClick = async () => {
    try {
      await copy(text);
      setIsCopied(true);
    } catch (error) {
      console.error("Failed to copy text to clipboard", error);
    }
  };

  return (
    <div className={styles["results"]}>
      <TabView>
        <TabPanel header="Output">
          <iframe className="output-frame" srcDoc={diagram} />
          <div className="display-time">
            <p>
              Image generated in <b>{timetaken}</b> secs.
            </p>
          </div>
        </TabPanel>
        <TabPanel header="Code">
            <Button className="copyBtn" onClick={handleCopyClick}>
              {isCopied ? "Copied!" : "Copy to Clipboard"}
            </Button>
          <pre className="code-panel">
            <CodeWithLineNumbers language="html" code={text} />
          </pre>
        </TabPanel>
      </TabView>
    </div>
  );
}
