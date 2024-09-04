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

dayjs.extend(utc);
dayjs.extend(relativeTime);
dayjs.extend(timezone);

function HistoryItem({
  ago,
  prompt,
  liked,
}: {
  ago: string;
  prompt: string;
  liked: boolean;
}) {
  return (
    <div className="history-item">
      <div className="top-section">
        <div className="ago">{ago}</div>
        {liked ? (
          <i className="fa-solid fa-heart liked"></i>
        ) : (
          <i className="fa-regular fa-heart"></i>
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

  function formattedAgo(created_time: any) {
    return dayjs(created_time).fromNow();
  }

  return (
    <div className={styles.history}>
      {currentItems.length > 0 ? (
        currentItems.map((item: any, index: any) => (
          <HistoryItem
            key={first + index}
            ago={formattedAgo(item.created_time)}
            prompt={item.prompt}
            liked={item.liked}
          />
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
