import { TabView, TabPanel } from "primereact/tabview";
import styles from "./results.module.scss";
import CodeWithLineNumbers from "@/app/components/CodeWithLineNumbers";
import { useState, useRef, useEffect } from "react";
import copy from "clipboard-copy";
import { Button } from "primereact/button";
import { DrawResult } from "../../models/draw-result";
import dayjs from "dayjs";
import LikeButton from "../components/likeButton/LikeButton";
import { useSession } from "next-auth/react";
import { ConfirmDialog, confirmDialog } from "primereact/confirmdialog";
import { Toast } from "primereact/toast";
import { useRouter } from "next/navigation";

export default function Results({
  result,
  created_time,
}: {
  result: DrawResult | undefined;
  created_time: any;
}) {
  const [isCopied, setIsCopied] = useState(false);
  const { data: session } = useSession();
  const browserTimeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
  const createdTimeLocal = dayjs.utc(created_time).tz(browserTimeZone);
  const formattedCreatedTime = createdTimeLocal.format("hh:mm A, DD MM YYYY");
  const [deletedState, setDeletedState] = useState(result?.status);
  const toast = useRef<Toast>(null);
  const id = result?.id;
  const owner_id = result?.user_id;
  const session_id = session?.user?.id;

  const router = useRouter();

  const handleCopyClick = async () => {
    try {
      await copy(result?.code || "");
      setIsCopied(true);
    } catch (error) {
      console.error("Failed to copy text to clipboard", error);
    }
  };

  const updateLike = async (likedStatus: boolean) => {
    if (id) {
      try {
        const response = await fetch("/api/liked", {
          method: "POST",
          headers: {
            "content-type": "application/json",
          },
          body: JSON.stringify({
            id,
            liked: likedStatus,
          }),
        });
        if (!response.ok) {
          throw new Error(`Error: ${response.status}`);
        }
      } catch (error) {
        console.error("Fetch error:", error);
      }
    }
  };

  const updateDeleted = async (id: number, deletedStatus: string) => {
    if (id) {
      try {
        const response = await fetch("/api/deleted", {
          method: "POST",
          headers: {
            "content-type": "application/json",
          },
          body: JSON.stringify({
            id,
            deleted: deletedStatus,
          }),
        });
        if (!response.ok) {
          throw new Error(`Error: ${response.status}`);
        }
      } catch (error) {
        console.error("Fetch error:", error);
      }
    }
  };

  const handleDelete = async () => {
    const newDeletedState = deletedState === "ACTIVE" ? "DELETED" : "ACTIVE";
    setDeletedState(newDeletedState);

    toast.current?.show({
      severity: "info",
      summary: "Deleted",
      detail: "Successfully Deleted",
      life: 3000,
    });

    await updateDeleted(id as number, newDeletedState);
    router.push(`/draw/new`);
  };

  const confirmDelete = () => {
    confirmDialog({
      message: "Do you want to delete this record?",
      header: "Delete Confirmation",
      icon: "pi pi-info-circle",
      defaultFocus: "reject",
      acceptClassName: "p-button-danger",
      accept: handleDelete,
      reject: () => {},
    });
  };

  return (
    <div className={styles["results"]}>
      <TabView>
        <TabPanel header="Output">
          <iframe className="output-frame" srcDoc={result?.code || ""} />
        </TabPanel>
        <TabPanel header="Code">
          <Button className="copyBtn" onClick={handleCopyClick}>
            {isCopied ? "Copied!" : "Copy to Clipboard"}
          </Button>
          <pre className="code-panel">
            <CodeWithLineNumbers language="html" code={result?.code || ""} />
          </pre>
        </TabPanel>
        <TabPanel header="Stats">
          <div className="stats-container">
            <div className="stats-item label">Created At</div>
            <div className="stats-item value">{formattedCreatedTime}</div>
            <div className="stats-item label">Time taken in secs</div>
            <div className="stats-item value">{result?.timeTakenInSec}</div>
            <div className="stats-item label">Prompt Tokens</div>
            <div className="stats-item value">
              {result?.usage.prompt_tokens}
            </div>
            <div className="stats-item label">Completion Tokens</div>
            <div className="stats-item value">
              {result?.usage.completion_tokens}
            </div>
          </div>
        </TabPanel>
      </TabView>
      <div className="buttons">
        {(((owner_id === 0) ||
          (session && session_id === owner_id)) && (
            <>
              <div className="like-btn">
                <LikeButton
                  liked={Boolean(+(result?.liked || 0))}
                  callback={updateLike}
                />
              </div>
              <div className="delete-btn" onClick={confirmDelete}>
                {deletedState ? (
                  <i className="fa-solid fa-trash-can"></i>
                ) : (
                  <p>DELETED</p>
                )}
              </div>
            </>
          ))}
        <Toast ref={toast} />
        <ConfirmDialog />
      </div>
    </div>
  );
}
