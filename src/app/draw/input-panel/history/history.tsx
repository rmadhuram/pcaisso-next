import { useState, useEffect, useRef } from "react";
import { ConfirmDialog, confirmDialog } from "primereact/confirmdialog";
import { Toast } from "primereact/toast";
import styles from "./history.module.scss";
import { useSession } from "next-auth/react";
import { Paginator, PaginatorPageChangeEvent } from "primereact/paginator";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";
import { ResultDto } from "@/persistence/result.dto";
import { Skeleton } from "primereact/skeleton";
import { useRouter } from "next/navigation";

dayjs.extend(utc);
dayjs.extend(relativeTime);
dayjs.extend(timezone);

type HistoryItemProps = {
  id: number;
  ago: string;
  prompt: string;
  liked: boolean;
  deleted: string;
  user_id: number;
  owner_id: number;
};

function HistoryItem({
  id,
  ago,
  prompt,
  liked,
  deleted,
  user_id,
  owner_id,
}: HistoryItemProps) {
  const router = useRouter();
  const [deletedState, setDeletedState] = useState(deleted);
  const toast = useRef<Toast>(null);

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
      life: 1000,
    });

    await updateDeleted(id, newDeletedState);
    router.push(`/draw/new`);
  };

  const confirmDelete = () => {
    confirmDialog({
      message: "Do you want to delete this record?",
      header: "Delete Confirmation",
      icon: "pi pi-info-circle",
      defaultFocus: "accept",
      acceptClassName: "p-button-danger",
      accept: handleDelete,
      reject: () => {},
    });
  };

  return (
    <div className="history-item">
      <Toast ref={toast} />
      <div className="top-section">
        <div className="ago">{ago}</div>
        {user_id === owner_id && (
          <>
            {liked ? (
              <i className="fa-solid fa-heart liked"></i>
            ) : (
              <i className="fa-regular fa-heart"></i>
            )}
            <div
              className="delete-btn"
              onClick={(event) => {
                event.stopPropagation();
                confirmDelete();
              }}
            >
              {deletedState ? (
                <i className="fa-solid fa-trash-can"></i>
              ) : (
                <p>DELETED</p>
              )}
            </div>
          </>
        )}
      </div>
      <div className="bottom-section">
        <div className="prompt">{prompt}</div>
      </div>
    </div>
  );
}

export default function History({
  handleHistoryClick,
}: {
  handleHistoryClick: any;
}) {
  const { data: session } = useSession();
  const userId = session?.user?.id as number;
  const [loadedData, setLoadedData] = useState<ResultDto[]>([]);
  const [totalRecords, setTotalRecords] = useState(0);
  const [first, setFirst] = useState(0);
  const [rows, setRows] = useState(10);

  const onPageChange = (event: PaginatorPageChangeEvent) => {
    console.log(`limit: ${event.rows}, offset: ${event.first}`);
    setFirst(event.first);
    setRows(event.rows);
  };

  useEffect(() => {
    fetchData(rows, first);
  }, [first, rows]);

  const fetchData = async (limit: number, offset: number) => {
    try {
      const response = await fetch(
        `/api/prompts/${userId}?limit=${limit}&offset=${offset}`
      );
      if (!response.ok) {
        throw new Error(`Error : ${response.status}`);
      }

      const dataReceived = await response.json();
      setLoadedData([]);
      setLoadedData(dataReceived.prompts);
      setTotalRecords(dataReceived.totalRecords);
    } catch (error) {
      console.error("Error fetching reply:", error);
    }
  };

  const currentItems = loadedData;

  function formattedAgo(created_time: string) {
    // const browserOffset = new Date().getTimezoneOffset();
    // const createdTimeUTC = dayjs.utc(created_time);
    // const createdTimeAdjusted = createdTimeUTC.add(-browserOffset, "minute");
    // const now = dayjs();
    // const timeDifference = createdTimeAdjusted.from(now);
    // return timeDifference;
    const createdTime = dayjs(created_time);
    const now = dayjs();
    const timeDifference = createdTime.from(now);
    return timeDifference;
  }

  function loadImage(uuid: string) {
    console.log(uuid);
  }

  if (!session) {
    return (
      <div className={styles.history}>
        <p className="sign-in-message">
          <i className="fa-solid fa-triangle-exclamation"></i> Your prompt
          history will be shown when you&apos;re logged in
        </p>
      </div>
    );
  }

  return (
    <div className={styles.history}>
      {currentItems.length > 0 ? (
        currentItems.map((item: any, index: any) => (
          <div
            key={first + index}
            onClick={() => handleHistoryClick(item.uuid)}
          >
            <HistoryItem
              id={item.id}
              ago={formattedAgo(item.created_time)}
              prompt={item.prompt}
              liked={item.liked}
              deleted={item.status}
              user_id={userId}
              owner_id={item.user_id}
            />
          </div>
        ))
      ) : (
        <>
          <Skeleton className="mb-2" height="50px"></Skeleton>
          <Skeleton className="mb-2" height="50px"></Skeleton>
        </>
      )}

      {currentItems.length > 0 && (
        <Paginator
          first={first}
          rows={rows}
          totalRecords={totalRecords}
          onPageChange={onPageChange}
          template={{ layout: "PrevPageLink CurrentPageReport NextPageLink" }}
        />
      )}
    </div>
  );
}
