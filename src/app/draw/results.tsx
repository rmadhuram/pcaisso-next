import { TabView, TabPanel } from "primereact/tabview";
import styles from "./results.module.scss";
import CodeWithLineNumbers from "@/app/components/CodeWithLineNumbers";
import { useState } from "react";
import copy from "clipboard-copy";
import { Button } from "primereact/button";
import { DrawResult } from "../../models/draw-result";
import dayjs from "dayjs";
import LikeButton from "../components/likeButton/LikeButton";

export default function Results({
  result,
  created_time,
}: {
  result: DrawResult | undefined;
  created_time: any;
}) {
  const [isCopied, setIsCopied] = useState(false);

  const handleCopyClick = async () => {
    try {
      await copy(result?.code || "");
      setIsCopied(true);
    } catch (error) {
      console.error("Failed to copy text to clipboard", error);
    }
  };

  const updateData = async (likedStatus: boolean) => {
    const id = result?.id as number;
    if (id) {
      try {
        console.log(id);
        const response = await fetch("/api/liked", {
          method: "POST",
          headers: {
            "content-type": "application/json",
          },
          body: JSON.stringify({
            id,
            liked: likedStatus,
          }),
        });
        if (!response.ok) {
          throw new Error(`Error: ${response.status}`);
        }
      } catch (error) {
        console.error("Fetch error:", error);
      }
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
            <div className="stats-item value">
              {dayjs
                .utc(created_time)
                .local()
                .tz("Asia/Kolkata")
                .format("hh: mm A, DD MM YYYY")}
            </div>
            <div className="stats-item label">Time taken in secs</div>
            <div className="stats-item value">{result?.timeTakenInSec}</div>
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
      <div className="like-btn">
        <LikeButton
          liked={Boolean(+(result?.liked || 0))}
          callback={updateData}
        />
      </div>
    </div>
  );
}
