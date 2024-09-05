import { useState, useEffect } from "react";
import styles from "./history.module.scss";
import { useSession } from "next-auth/react";
import { Paginator, PaginatorPageChangeEvent } from "primereact/paginator";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";
import { ResultDto } from "@/persistence/result.dto";
import { Skeleton } from "primereact/skeleton";
import Link from "next/link";
import DeleteButton from "@/app/components/deleteButton/deleteButton";

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
  deleted: boolean;
  user_id: number;
  owner_id: number;
}) {
  const updateDeleted = async (id: number, deletedStatus: boolean) => {
    const idReceived = id;
    if (idReceived) {
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

  const { data: session } = useSession();
  const userId = session?.user?.id as number;

  return (
    <div className="history-item">
      <div className="top-section">
        <div className="ago">{ago}</div>
        {user_id === owner_id && (
          <>
            {liked ? (
              <i className="fa-solid fa-heart liked"></i>
            ) : (
              <i className="fa-regular fa-heart"></i>
            )}
            <div className="delete-btn">
              <DeleteButton
                deleted={deleted}
                callback={() => updateDeleted(id, deleted)}
              />
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

export default function History() {
  const { data: session } = useSession();
  const [loadedData, setLoadedData] = useState<ResultDto[]>([]);
  const userId = session?.user?.id as number;

  const [first, setFirst] = useState<number>(0);
  const rowsPerPage = 10;

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
          <i className="fa-solid fa-triangle-exclamation"></i> Please sign in to view the history!
        </p>
      </div>
    );
  }
  
  return (
    <div className={styles.history}>
      {currentItems.length > 0 ? (
        currentItems.map((item: any, index: any) => (
          <Link href={`/draw/${item.uuid}`} key={first + index}>
            <HistoryItem
              id={item.id}
              ago={formattedAgo(item.created_time)}
              prompt={item.prompt}
              liked={item.liked}
              deleted={item.status === "ACTIVE" ? true : false}
              user_id={userId}
              owner_id={item.user_id}
            />
          </Link>
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
