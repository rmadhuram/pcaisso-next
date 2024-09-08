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

function HistoryItem({
  id,
  ago,
  prompt,
  liked,
  deleted,
  user_id,
  owner_id,
}: {
  id: number;
  ago: string;
  prompt: string;
  liked: boolean;
  deleted: string;
  user_id: number;
  owner_id: number;
}) {
  const router = useRouter();
  const [deletedState, setDeletedState] = useState(deleted);
  const toast = useRef<Toast>(null);

  const { data: session } = useSession();
  const userId = session?.user?.id as number;

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

  // useEffect(() => {
  //   if (deletedState) {
  //     console.log(deletedState);
  //     updateDeleted(id, deletedState as string);
  //   }
  // }, [deletedState]);

  const handleDelete = async () => {
    const newDeletedState = deletedState === "ACTIVE" ? "DELETED" : "ACTIVE";
    setDeletedState(newDeletedState);

    toast.current?.show({
      severity: "info",
      summary: "Deleted",
      detail: "Successfully Deleted",
      life: 3000,
    });

    await updateDeleted(id, newDeletedState);
    router.push(`/draw/new`);
  };

  // const accept = async () => {
  //   console.log(deletedState);
  //   setDeletedState(deletedState === "ACTIVE" ? "DELETED" : "ACTIVE");
  //   console.log(deletedState);
  //   toast.current?.show({
  //     severity: "info",
  //     summary: "Deleted",
  //     detail: "Successfully Deleted",
  //     life: 3000,
  //   });
  //   console.log(deletedState);
  //   // await updateDeleted(id, deletedState as string);
  //   router.push(`/draw/new`);
  // };

  // const reject = () => {};

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
    <div className="history-item">
      <div className="top-section">
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
        <Toast ref={toast} />
        <ConfirmDialog />
        <div className="ago">{ago}</div>
      </div>
      <div className="bottom-section">
        <div className="prompt">{prompt}</div>
      </div>
    </div>
  );
}

export default function History() {
  const { data: session } = useSession();
  const [loadedData, setLoadedData] = useState<ResultDto[]>([]);
  const userId = session?.user?.id as number;
  const [first, setFirst] = useState<number>(0);
  const rowsPerPage = 10;
  const router = useRouter();

  const onPageChange = (event: PaginatorPageChangeEvent) => {
    setFirst(event.first);
  };

  useEffect(() => {
    if (userId) {
      const fetchData = async () => {
        try {
          const response = await fetch(`/api/prompts/${userId}`);
          if (!response.ok) {
            throw new Error(`Error : ${response.status}`);
          }

          const dataReceived = await response.json();
          setLoadedData(dataReceived);
        } catch (error) {
          console.error("Error fetching reply:", error);
        }
      };
      fetchData();
    }
  }, [userId]);

  const currentItems = loadedData.slice(first, first + rowsPerPage);

  function formattedAgo(created_time: string) {
    const browserOffset = new Date().getTimezoneOffset();
    const createdTimeUTC = dayjs.utc(created_time);
    const createdTimeAdjusted = createdTimeUTC.add(-browserOffset, "minute");
    const now = dayjs();
    const timeDifference = createdTimeAdjusted.from(now);
    return timeDifference;
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
            onClick={() => router.push(`/draw/${item.uuid}`)}
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
          rows={10}
          totalRecords={loadedData.length}
          onPageChange={onPageChange}
          template={{ layout: "PrevPageLink CurrentPageReport NextPageLink" }}
        />
      )}
    </div>
  );
}
