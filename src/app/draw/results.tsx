import { TabView, TabPanel } from "primereact/tabview";
import styles from "./results.module.scss";
import CodeWithLineNumbers from "@/app/components/CodeWithLineNumbers";
import { useState } from "react";
import copy from "clipboard-copy";
import { Button } from "primereact/button";
import { useSession } from "next-auth/react";

export default function Results({
  diagram,
  text,
  timetaken,
  prompt,
  type,
  model,
}: {
  diagram: string;
  text: string;
  timetaken: number;
  prompt: string;
  type: string;
  model: string;
}) {
  const { data: session } = useSession();
  const [isCopied, setIsCopied] = useState(false);
  const [isSaved, setIsSaved] = useState(false);

  const handleCopyClick = async () => {
    try {
      await copy(text);
      setIsCopied(true);
    } catch (error) {
      console.error("Failed to copy text to clipboard", error);
    }
  };

  const handleSave = async () => {
    if (!session?.user?.email) {
      console.log("User email not found in session");
      return;
    }

    try {
      const response = await fetch("/api/getUserId", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: session.user.email }),
      });

      const data = await response.json();
      const userId = data.userId;

      if (!userId) {
        console.error("User ID not found");
        return;
      }

      setIsSaved(true);

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
      <Button className="saveBtn" onClick={handleSave} disabled={false}>
        {isSaved ? "Saved!" : "Save to DB"}
      </Button>
    </div>
  );
}
