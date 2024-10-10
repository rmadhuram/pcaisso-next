"use client";
import React, { useState, useEffect } from "react";
import { DataTable, DataTablePageEvent } from "primereact/datatable";
import { Column } from "primereact/column";
import { ResultDto } from "@/persistence/result.dto";
import styles from "./page.module.scss";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
// import dayjs from "dayjs";
// import utc from "dayjs/plugin/utc";
// import timezone from "dayjs/plugin/timezone";
import { formattedTime } from "../utils/formatTime";

// dayjs.extend(utc);
// dayjs.extend(timezone);

interface ColumnMeta {
  field: string;
  header: string;
}

interface LazyTableState {
  first: number;
  rows: number;
  page: number;
}

// function formattedDate(created_time: string) {
//   // console.log(created_time);
//   // const browserTimeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
//   // console.log(browserTimeZone);
//   // const createdTimeLocal = dayjs.utc(created_time).tz(browserTimeZone);
//   // console.log(createdTimeLocal);
//   // // return createdTimeLocal.format("hh:mm A, DD MM YYYY");
//   // const formattedCreatedTime = createdTimeLocal.format("hh:mm A, DD MM YYYY");
//   // console.log(formattedCreatedTime);
//   // return formattedCreatedTime;
//   const browserOffset = new Date().getTimezoneOffset();
//   const createdTimeUTC = dayjs.utc(created_time);
//   const createdTimeAdjusted = createdTimeUTC.add(-browserOffset, "minute");
//   return createdTimeAdjusted.format("hh:mm A, DD MM YYYY");
// }

export default function PaginatorBasicDemo() {
  const [results, setResults] = useState<ResultDto[]>([]);
  const [totalRecords, setTotalRecords] = useState(0);
  const [totalTokensUsed, setTotalTokensUsed] = useState(0);
  const columns: ColumnMeta[] = [
    { field: "id", header: "ID" },
    { field: "created_time", header: "Created Time" },
    { field: "description", header: "Description" },
    { field: "user_name", header: "User" },
    { field: "model", header: "Model" },
    { field: "tokens", header: "Tokens" },
  ];
  const [lazyState, setlazyState] = useState<LazyTableState>({
    first: 0,
    rows: 12,
    page: 1,
  });
  const onPage = (event: DataTablePageEvent) => {
    setlazyState({
      first: event.first,
      rows: event.rows,
      page: event.page ?? 1,
    });
  };

  const { data: session } = useSession();
  const session_email = session?.user?.email as string;
  const [user, setUser] = useState<string | null>(null);
  const router = useRouter();

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (session_email) {
      fetchUserRole(session_email);
    }
  }, [session_email]);

  useEffect(() => {
    if (user === "admin") {
      fetchResults();
      fetchTotalTokens();
    } else if (user !== null && user !== "admin") {
      router.push("/");
    }
  }, [user, lazyState]);

  const fetchUserRole = async (email: string) => {
    if (email) {
      setLoading(true);
      try {
        const response = await fetch(`api/admin`, {
          method: "POST",
          headers: {
            "content-type": "application/json",
          },
          body: JSON.stringify({
            email,
          }),
        });
        if (!response.ok) {
          throw new Error(`Error: ${response.status}`);
        }
        const data = await response.json();
        setUser(data[0]?.role);
      } catch (error) {
        console.log("Fetch error: ", error);
      } finally {
        setLoading(false);
      }
    }
  };

  const fetchResults = async () => {
    try {
      const response = await fetch(
        `/api/admin?offset=${lazyState.first}&limit=${lazyState.rows}`
      );
      if (!response.ok) {
        throw new Error(`Error : ${response.status}`);
      }

      const resultsReceived = await response.json();
      setTotalRecords(resultsReceived.totalRecords);
      setResults(resultsReceived.results);
    } catch (error) {
      console.error("Error fetching results:", error);
    }
  };

  const fetchTotalTokens = async () => {
    try {
      const response = await fetch(`/api/totalTokens`);
      if (!response.ok) {
        throw new Error(`Error : ${response.status}`);
      }

      const tokens = await response.json();
      console.log(tokens);
      setTotalTokensUsed(tokens);
    } catch (error) {
      console.error("Error fetching results:", error);
    }
  };

  // const fetchTotalTokens = async () => {
  //   try {
  //     const model = selectedModel.name;
  //     const response = await fetch(`/api/totalTokens/${model}`);
  //     if (!response.ok) {
  //       throw new Error(`Error : ${response.status}`);
  //     }

  //     const tokens = await response.json();
  //     console.log(tokens);
  //     setTotalTokensUsed(tokens.totalTokensUsed);
  //     setTotalInputTokens(tokens.totalInputTokens);
  //     setTotalOutputTokens(tokens.totalOutputTokens);
  //   } catch (error) {
  //     console.error("Error fetching results:", error);
  //   }
  // };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!user || user !== "admin") {
    return null;
  }

  return (
    <div className={styles["admin"]}>
      <div className="header">
        <section className="kpi">
          <div className="title">Creations</div>
          <div className="value">100</div>
        </section>
        <section className="kpi">
          <div className="title">Users</div>
          <div className="value">2</div>
        </section>
        <section className="kpi">
          <div className="title">Total Tokens</div>
          <div className="value">{tokens}</div>
        </section>
        <section className="kpi">
          <div className="title">Cost</div>
          <div className="value">$17.39</div>
        </section>
      </div>
      <div className='table-container'>
        <DataTable
          value={results}
          lazy
          dataKey="id"
          first={lazyState.first}
          rows={lazyState.rows}
          totalRecords={totalRecords}
          onPage={onPage}
          showGridlines
          stripedRows
          paginator
          sortMode="multiple"
        >
          {columns.map((col) => (
            <Column
              key={col.field}
              field={col.field}
              header={col.header}
              style={{
                width:
                  col.field === "description"
                    ? "40%"
                    : col.field === "id" ||
                      col.field === "model" ||
                      col.field === "tokens"
                    ? "5% "
                    : "15%",
              }}
              body={(rowData) => {
                if (col.field === "created_time") {
                  return formattedTime(rowData.created_time);
                }

                return (
                  <Link
                    style={{ textDecoration: "none", color: "inherit" }}
                    href={`/draw/${rowData.uuid}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    passHref
                  >
                    <div
                      style={{
                        height: col.field === "description" ? "30px" : "",
                      }}
                      className={col.field === "description" ? "ellipsis" : ""}
                    >
                      {rowData[col.field]}
                    </div>
                  </Link>
                );
              }}
            />
          ))}
        </DataTable>
      </div>
    </div>
  );
}
