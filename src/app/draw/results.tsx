import { TabView, TabPanel } from "primereact/tabview";
import styles from "./results.module.scss";
import CodeWithLineNumbers from "@/app/components/CodeWithLineNumbers";

export default function Results({diagram, text, timetaken}: {diagram: string, text: string, timetaken: number}) {

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
            <CodeWithLineNumbers language="html" code={text}/>
          </pre>
        </TabPanel>
      </TabView>
    </div>
  );
}
