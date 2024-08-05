'use client';
import { Splitter, SplitterPanel } from "primereact/splitter";
import NoSsr from "../components/NoSSR";
import InputPanel from "./input-panel/input-panel";
import styles from "./layout.module.scss";

export default function HomeLayout({
  children, // will be a page or nested layout
}: {
  children: React.ReactNode;
}) {

  async function onSubmit(props: any) {
    console.log('here', props)
  }

  return (
    <NoSsr>
      <div className={styles.splitter}>
        <Splitter layout="horizontal">
          <SplitterPanel className="panel" size={25}>
            <InputPanel handleSubmission={onSubmit}></InputPanel>
          </SplitterPanel>
          <SplitterPanel className="panel" size={75}>
            {children}
          </SplitterPanel>
        </Splitter>
      </div>
    </NoSsr>
  );
}
