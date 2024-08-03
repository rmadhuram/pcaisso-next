"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { useSub } from "../../hooks/usePubSub";
import { TabView, TabPanel } from "primereact/tabview";
import styles from "./page.module.scss";

export default function Results() {
  const searchParams = useSearchParams();
  const [code, setCode] = useState<string>("");
  const [text, setText] = useState<string>("");

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
          }),
        });
        const data = await response.json();
        console.log("set code: ", data.code);
        setCode(data.code || "");
      } catch (error) {
        console.error("Error fetching code:", error);
      }
    };
    fetchData();
  });

  return (
    <div className={styles["results"]}>
    <TabView>
      <TabPanel header="Output">
        <iframe className="output-frame" srcDoc={code} />
      </TabPanel>
      <TabPanel header="Code">
        <pre className="code-panel">{text}</pre>
      </TabPanel>
    </TabView>
    </div>
  );
  
}



        