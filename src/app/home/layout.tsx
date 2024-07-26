import { Splitter, SplitterPanel } from "primereact/splitter";
import NoSsr from "../components/NoSSR";
import InputPanel from "./input-panel/input-panel";
import styles from './layout.module.scss';

export default function HomeLayout({
  children, // will be a page or nested layout
}: {
  children: React.ReactNode
}) {

  return (
    <NoSsr>
      <Splitter layout="horizontal">
        <SplitterPanel className="panel">
          <InputPanel></InputPanel>
        </SplitterPanel>
        <SplitterPanel className="panel">
          {children}
        </SplitterPanel>
      </Splitter>
    </NoSsr>
  )
    
}