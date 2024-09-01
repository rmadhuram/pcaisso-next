import { getResults } from "../../../persistence/result";
import { ResultDto } from "@/persistence/result.dto";

export default async function DrawBySlugPage({
  params,
}: {
  params: { slug: string[] };
}) {
  console.log(params);
  let data: ResultDto | null = null;
  const uuid = params.slug?.[0];
  console.log(uuid, typeof uuid);

  try {
    data = await getResults(uuid);
    console.log(data);
  } catch (error) {
    console.log("couldnt fetch", error);
  }

  if (!data) {
    return <p>Data was not able to fetch</p>;
  }

  return (
    <div>
      Data for uuid: {params.slug?.[0]}
      <p>{data.description}</p>
      <p>{data.output}</p>
    </div>
  );
}

// "use client";
// import { getResults } from "../../../persistence/result";
// import { TabView, TabPanel } from "primereact/tabview";
// import styles from ".././results.module.scss";
// import CodeWithLineNumbers from "@/app/components/CodeWithLineNumbers";
// import { Button } from "primereact/button";
// import { useState } from "react";
// import copy from "clipboard-copy";
// import { ResultDto } from "@/persistence/result.dto";

// export default async function DrawBySlugPage({
//   params,
// }: {
//   params: { slug: string[] };
// }) {
//   console.log(params);
//   let data: ResultDto | null = null;
//   const uuid = params.slug?.[0];
//   console.log(uuid, typeof uuid);
//   const [isCopied, setIsCopied] = useState(false);

//   try {
//     data = await getResults(uuid);
//     console.log(data);
//   } catch (error) {
//     console.log("couldnt fetch", error);
//   }

//   if (!data) {
//     return <p>Data was not able to fetch</p>;
//   }

//   const handleCopyClick = async () => {
//     try {
//       await copy(data.output || "");
//       setIsCopied(true);
//     } catch (error) {
//       console.error("Failed to copy text to clipboard", error);
//     }
//   };

//   return (
//     <div className={styles["results"]}>
//       <TabView>
//         <TabPanel header="Output">
//           <iframe className="output-frame" srcDoc={data.output || ""} />
//         </TabPanel>
//         <TabPanel header="Code">
//           <Button className="copyBtn" onClick={handleCopyClick}>
//             {isCopied ? "Copied!" : "Copy to Clipboard"}
//           </Button>
//           <pre className="code-panel">
//             <CodeWithLineNumbers language="html" code={data.output || ""} />
//           </pre>
//         </TabPanel>
//         <TabPanel header="Stats">
//           <div className="stats-container">
//             <div className="stats-item label">Created At</div>
//             <div className="stats-item value">10:34 AM, 12th June 2024</div>
//             <div className="stats-item label">Time taken</div>
//             <div className="stats-item value">{data.time_taken} secs</div>
//             <div className="stats-item label">Prompt Tokens</div>
//             <div className="stats-item value">{data.prompt_tokens}</div>
//             <div className="stats-item label">Completion Tokens</div>
//             <div className="stats-item value">{data.completion_tokens}</div>
//           </div>
//         </TabPanel>
//       </TabView>
//     </div>
//   );
// }
