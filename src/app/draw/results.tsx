import { TabView, TabPanel } from "primereact/tabview";
import styles from "./results.module.scss";
import CodeWithLineNumbers from "@/app/components/CodeWithLineNumbers";
import { useState } from "react";
import copy from "clipboard-copy";
import { Button } from "primereact/button";
import { useSession } from "next-auth/react";
import { DrawResult } from "../../models/draw-result";

let userId: number;

export default function Results({
  result
}: {
  result: DrawResult | undefined;
}) {
  const { data: session } = useSession();
  const [isCopied, setIsCopied] = useState(false);
  /*const [isSaved, setIsSaved] = useState(false);

  if (session) {
    userId = session.user?.id as number;
  }*/

  const handleCopyClick = async () => {
    try {
      await copy(result?.code || "");
      setIsCopied(true);
    } catch (error) {
      console.error("Failed to copy text to clipboard", error);
    }
  };

  /* const handleSave = async () => {
    if (!session?.user?.email) {
      console.log("User email not found in session");
      return;
    }
    setIsSaved(true);
    try {
      const saveResponse = await fetch("/api/saveResults", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId,
          type,
          description: prompt,
          prompt,
          model,
          output: diagram,
          thumbnailUrl: prompt,
          timeTaken: timetaken,
        }),
      });

      if (saveResponse.ok) {
        console.log("Result saved successfully");
      } else {
        console.error("Failed to save result");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };
  */

  return (
    <div className={styles["results"]}>
      <TabView>
        <TabPanel header="Output">
          <iframe className="output-frame" srcDoc={result?.code || ""} />
        </TabPanel>
        <TabPanel header="Code">
          <Button className="copyBtn" onClick={handleCopyClick}>
            {isCopied ? "Copied!" : "Copy to Clipboard"}
          </Button>
          <pre className="code-panel">
            <CodeWithLineNumbers language="html" code={result?.code || ""} />
          </pre>
        </TabPanel>
        <TabPanel header="Stats">
          <div className="stats-container">
            <div className="stats-item label">Created At</div>
            <div className="stats-item value">10:34 AM, 12th June 2024</div>
            <div className="stats-item label">Time taken</div>
            <div className="stats-item value">{result?.timeTakenInSec} secs</div>
            <div className="stats-item label">Prompt Tokens</div>
            <div className="stats-item value">{result?.usage.prompt_tokens}</div>
            <div className="stats-item label">Completion Tokens</div>
            <div className="stats-item value">{result?.usage.completion_tokens}</div>
          </div>
        </TabPanel>
      </TabView>
      {/* <Button className="saveBtn" onClick={handleSave} disabled={false}>
        {isSaved ? "Saved!" : "Save to DB"}
      </Button>  */}
    </div>
  );
}
