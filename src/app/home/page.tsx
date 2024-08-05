'use client';
import { Splitter, SplitterPanel } from "primereact/splitter";
import NoSsr from "../components/NoSSR";
import InputPanel from "./input-panel/input-panel";
import Results from "./results/page";
import Link from "next/link";
import styles from "./page.module.scss";
import "../../styles/animations.scss";
import { useState } from "react";

export function Intro() {
  return (
    <div className={styles["intro"]}>
      <h1 className="animated bounceInUp animate-delay-1s">
        Pc<span>ai</span>sso
      </h1>
      <h2>AI Art + Code</h2>
      <div className="cover-pages">
        <div className="cover-3 cover"></div>
        <div className="cover-1 cover"></div>
        <div className="cover-2 cover"></div>
      </div>
      <p className="footer animated bounceInUp animate-delay-2s">
        Made with 💖 by the{" "}
        <Link href="/home/contributions">students and friends</Link> of{" "}
        <Link target="_blank" href="https://gct.ac.in/">
          {" "}
          GCT, Coimbatore
        </Link>
      </p>
    </div>
  );
}

export default function HomePage() {
  const [diagram, setDiagram] = useState<string>("");
  const [text, setText] = useState<string>("");
  const [timetaken, setTimeTaken] = useState(0);
  const [displayState, setDisplayState] = useState<string>("intro");

  async function onSubmit(payload: any) {
    const fetchData = async () => {
      try {
        setDisplayState('loading') 
        console.log('fetch')
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
        setDisplayState('results') 
      } catch (error) {
        console.error("Error fetching reply:", error);
      }
    };
    fetchData();
  }

  return (
    <NoSsr>
      <div className={styles.splitter}>
        <Splitter layout="horizontal">
          <SplitterPanel className="panel" size={25}>
            <InputPanel handleSubmission={onSubmit}></InputPanel>
          </SplitterPanel>
          <SplitterPanel className="panel" size={75}>
            { displayState == 'intro' && <Intro></Intro>}
            { displayState == 'loading' && <div>Loading...</div>}
            { displayState == 'results' && <Results diagram={diagram} text={text} timetaken={timetaken}></Results>}
          </SplitterPanel>
        </Splitter>
      </div>
    </NoSsr>
  );
  

}
