import { useState, useEffect } from "react";
import styles from "./history.module.scss";
import { useSession } from "next-auth/react";
import { Paginator, PaginatorPageChangeEvent } from "primereact/paginator";

function HistoryItem({
  key,
  ago,
  prompt,
  liked,
}: {
  key: number;
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
  const [loadedData, setLoadedData] = useState<any>([]);
  const userId = session?.user?.id as number;

  const [first, setFirst] = useState<number>(0);
  const rowsPerPage = 10;

  const onPageChange = (event: PaginatorPageChangeEvent) => {
    setFirst(event.first);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/api/prompts", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            userId,
          }),
        });

        if (!response.ok) {
          throw new Error(`Error : ${response.status}`);
        }

        const dataReceived = await response.json();
        console.log("data received: ", dataReceived);
        setLoadedData(dataReceived);
      } catch (error) {
        console.error("Error fetching reply:", error);
      }
    };
    fetchData();
  }, [userId]);

  const currentItems = loadedData.slice(first, first + rowsPerPage);

  return (
    <div className={styles.history}>
      <div className="card">
        <Paginator
          first={first}
          rows={10}
          totalRecords={loadedData.length}
          onPageChange={onPageChange}
          template={{ layout: "PrevPageLink CurrentPageReport NextPageLink" }}
        />
      </div>

      {currentItems.length > 0 ? (
        currentItems.map((item: any, index: any) => (
          <HistoryItem
            key={first + index}
            ago={item.ago}
            prompt={item.prompt}
            liked={item.liked}
          />
        ))
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}
