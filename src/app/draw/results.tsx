import { TabView, TabPanel } from "primereact/tabview";
import styles from "./results.module.scss";
import CodeWithLineNumbers from "@/app/components/CodeWithLineNumbers";
import { useState } from "react";
import copy from "clipboard-copy";
import { Button } from "primereact/button";
import { DrawResult } from "../../models/draw-result";
import dayjs from "dayjs";

export default function Results({
  result,
}: {
  result: DrawResult | undefined;
}) {
  const now = dayjs();
  const formattedDate = now.format("hh:mm A, DD MMMM YYYY");

  const [isCopied, setIsCopied] = useState(false);
  const [liked, setLiked] = useState(false);

  const handleCopyClick = async () => {
    try {
      await copy(result?.code || "");
      setIsCopied(true);
    } catch (error) {
      console.error("Failed to copy text to clipboard", error);
    }
  };

  const updateData = async () => {
    const likedStatus = !liked;
    setLiked(likedStatus);

    const code = result?.code;

    try {
      const response = await fetch("/api/liked", {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({
          code,
          liked,
        }),
      });
      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }
    } catch (error) {
      console.error("Fetch error:", error);
    }
  };

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
            <div className="stats-item value">{formattedDate}</div>
            <div className="stats-item label">Time taken</div>
            <div className="stats-item value">
              {result?.timeTakenInSec} secs
            </div>
            <div className="stats-item label">Prompt Tokens</div>
            <div className="stats-item value">
              {result?.usage.prompt_tokens}
            </div>
            <div className="stats-item label">Completion Tokens</div>
            <div className="stats-item value">
              {result?.usage.completion_tokens}
            </div>
          </div>
        </TabPanel>
      </TabView>
      <div className="like-btn" onClick={updateData}>
        {liked ? (
          <i className="fa-solid fa-heart liked"></i>
        ) : (
          <i className="fa-regular fa-heart"></i>
        )}
      </div>
    </div>
  );
}
