import { Splitter, SplitterPanel } from "primereact/splitter";
import NoSsr from "../components/NoSSR";
import InputPanel from "./input-panel/input-panel";

export default function HomeLayout({
  children, // will be a page or nested layout
}: {
  children: React.ReactNode
}) {

  return (
    <NoSsr>
      <Splitter layout="horizontal" style={{ height: 'calc(100vh - 35px)' }}>
        <SplitterPanel>
          <InputPanel></InputPanel>
        </SplitterPanel>
        <SplitterPanel>
          {children}
        </SplitterPanel>
      </Splitter>
    </NoSsr>
  )
    
}