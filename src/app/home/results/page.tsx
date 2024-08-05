"use client";

import { useState } from "react";
import { useSub } from "../../hooks/usePubSub";
import { TabView, TabPanel } from "primereact/tabview";
import styles from "./page.module.scss";
import CodeWithLineNumbers from "@/app/components/CodeWithLineNumbers";

export default function Results() {
  const [diagram, setDiagram] = useState<string>("");
  const [text, setText] = useState<string>("");
  const [timetaken, setTimeTaken] = useState(0);

  console.log('creating sub')
  useSub("CREATE_NEW", (payload: any) => {
    console.log("Received", payload);

    const fetchData = async () => {
      try {
        const response = await fetch("/api/chat", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            prompt: payload.prompt,
            type: payload.category,
            model: payload.model,
          }),
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        //console.log("API Response:", data);

        const diagram = data.code;
        const text = data.code;
        const timetaken = data.timeTakenInSec;

        setDiagram(diagram);
        setText(text);
        setTimeTaken(timetaken);
      } catch (error) {
        console.error("Error fetching reply:", error);
      }
    };
    fetchData();
  });

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
          <pre className="code-panel">
            <CodeWithLineNumbers language="html" code={text} />
          </pre>
        </TabPanel>
      </TabView>
    </div>
  );
}
