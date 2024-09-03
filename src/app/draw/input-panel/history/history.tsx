import { useState, useEffect } from "react";
import styles from "./history.module.scss";
import { ResultDto } from "@/persistence/result.dto";
import { useSession } from "next-auth/react";

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
  const [loadedData, setLoadedData] = useState<any>(null);
  const userId = session?.user?.id as number;

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

  return (
    <div className={styles.history}>
      {loadedData ? (
        loadedData.map((item: any, index: any) => (
          <HistoryItem
            key={index}
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
