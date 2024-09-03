import { useState, useEffect } from "react";
import styles from "./history.module.scss";
import { useSession } from "next-auth/react";
import { Paginator, PaginatorPageChangeEvent } from "primereact/paginator";
import dayjs from "dayjs";

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

  function displayAge(created_time: any) {
    const start = dayjs(created_time);
    const end = dayjs();
    console.log(start, end);

    const differenceInYears = end.diff(start, "year");
    const tempTimeAfterYears = start.add(differenceInYears, "year");

    const differenceInMonths = end.diff(tempTimeAfterYears, "month");
    const tempTimeAfterMonths = tempTimeAfterYears.add(
      differenceInMonths,
      "month"
    );

    const differenceInDays = end.diff(tempTimeAfterMonths, "day");
    const tempTimeAfterDays = tempTimeAfterMonths.add(differenceInDays, "day");

    const differenceInHours = end.diff(tempTimeAfterDays, "hour");
    const tempTimeAfterHours = tempTimeAfterDays.add(differenceInHours, "hour");

    const differenceInMinutes = end.diff(tempTimeAfterHours, "minute");

    return `${
      differenceInYears > 0
        ? `${differenceInYears} ${differenceInYears === 1 ? "year" : "years"}, `
        : ""
    }${
      differenceInMonths > 0
        ? `${differenceInMonths} ${
            differenceInMonths === 1 ? "month" : "months"
          }, `
        : ""
    }${
      differenceInDays > 0
        ? `${differenceInDays} ${differenceInDays === 1 ? "day" : "days"}, `
        : ""
    }${
      differenceInHours > 0
        ? `${differenceInHours} ${differenceInHours === 1 ? "hour" : "hours"}, `
        : ""
    }${
      differenceInMinutes > 0
        ? `${differenceInMinutes} ${
            differenceInMinutes === 1 ? "minute" : "minutes"
          }`
        : ""
    } ago`.trim();
  }

  return (
    <div className={styles.history}>
      {currentItems.length > 0 ? (
        currentItems.map((item: any, index: any) => (
          <HistoryItem
            key={first + index}
            ago={displayAge(item.created_time)}
            prompt={item.prompt}
            liked={item.liked}
          />
        ))
      ) : (
        <p>Loading...</p>
      )}
      <div className="card">
        <Paginator
          first={first}
          rows={10}
          totalRecords={loadedData.length}
          onPageChange={onPageChange}
          template={{ layout: "PrevPageLink CurrentPageReport NextPageLink" }}
        />
      </div>
    </div>
  );
}
