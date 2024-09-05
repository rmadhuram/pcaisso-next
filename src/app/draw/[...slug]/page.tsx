"use client";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { ResultDto } from "@/persistence/result.dto";
import Results from "../results";
import InputPanel from "../input-panel/input-panel";
import { Splitter, SplitterPanel } from "primereact/splitter";
import NoSsr from "../../components/NoSSR";
import styles from "../page.module.scss";
import { DrawResult } from "@/models/draw-result";
import { facts } from "@/persistence/facts";

function Intro() {
  return (
    <div className={styles["intro"]}>
      <div className="circle circle-1"></div>
      <div className="circle circle-2"></div>
      <div className="circle circle-3"></div>
      <div className="circle circle-4"></div>
      <div className="description-box">
        <p>
          Welcome to the Pcaisso Drawing Studio! Here, you can harness the power
          of LLMs to create amazing 2D and 3D graphics, animations, and even
          simple games. Just describe what you want to draw in the input panel,
          and watch as the AI brings your ideas to life!
        </p>
        <ul>
          <li>🖌️ Create static 2D images</li>
          <li>🎬 Design animated graphics</li>
          <li>🧊 Explore 3D renderings</li>
          <li>🕹️ Develop simple interactive games</li>
        </ul>
        <p>
          Get started by typing your drawing request in the input panel on the
          left. Be creative and have fun!
        </p>
      </div>
    </div>
  );
}

// spinner attribution: <a href="https://www.svgbackgrounds.com/elements/animated-svg-preloaders/">Animated SVG Preloaders by SVGBackgrounds.com</a>
function Loading() {
  let n = Math.floor(Math.random() * facts.length);
  return (
    <div className={styles["loading"]}>
      <h3 className="generating">Generating AI Art + Code...</h3>
      <div className="spinner"></div>
      <h3>{facts[n].fact}</h3>
      <p>{facts[n].description}</p>
    </div>
  );
}

export default function HomePage() {
  const params = useParams();
  const uuid = params.slug?.[0];

  const [loadedData, setLoadedData] = useState<ResultDto | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  const [displayState, setDisplayState] = useState<string>("intro");
  const [result, setResult] = useState<DrawResult>();

  useEffect(() => {
    if (uuid === "new") {
      setLoading(false);
      setLoadedData(null);
      return;
    }

    const fetchData = async () => {
      try {
        const response = await fetch(`/api/getResults/${uuid}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (!response.ok) {
          throw new Error(`Error: ${response.status}`);
        }

        const dataReceived = await response.json();
        setLoadedData(dataReceived);

        let result: DrawResult = {
          id: dataReceived.id,
          uuid: dataReceived.uuid,
          liked: Boolean(+(dataReceived.liked || 0)),
          code: dataReceived.output,
          text: "",
          timeTakenInSec: dataReceived.time_taken,
          usage: {
            prompt_tokens: dataReceived.prompt_tokens,
            completion_tokens: dataReceived.completion_tokens,
            total_tokens: 0, // TODO: not needed.
          },
        };
        setResult(result);
        setDisplayState("results");
      } catch (error) {
        console.error("Fetch error:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [uuid]);

  async function onSubmit(payload: any) {
    const fetchData = async () => {
      try {
        setDisplayState("loading");
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

        const data: DrawResult = await response.json();
        setResult(data);
        setDisplayState("results");
        window.history.pushState(null, "", `/draw/${data.uuid}`);
      } catch (error) {
        console.error("Error fetching reply:", error);
      }
    };
    fetchData();
  }

  if (loading) {
    return (
      <div className={styles["loading"]}>
        <h3 className="generating">Loading AI Art + Code...</h3>
        <div className="spinner"></div>
      </div>
    );
  }

  return (
    <NoSsr>
      <div className={styles.splitter}>
        <Splitter layout="horizontal">
          <SplitterPanel className="panel" size={25}>
            <InputPanel
              handleSubmission={onSubmit}
              initialData={loadedData}
            ></InputPanel>
          </SplitterPanel>
          <SplitterPanel className="panel" size={75}>
            {displayState == "intro" && <Intro></Intro>}
            {displayState == "loading" && <Loading></Loading>}
            {displayState == "results" && (
              <Results
                result={result}
                created_time={loadedData?.created_time}
              ></Results>
            )}
          </SplitterPanel>
        </Splitter>
      </div>
    </NoSsr>
  );
}
