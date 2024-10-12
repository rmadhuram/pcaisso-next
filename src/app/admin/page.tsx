"use client";
import React, { useState, useEffect } from "react";
import { DataTable, DataTablePageEvent } from "primereact/datatable";
import { Column } from "primereact/column";
import { ResultDto } from "@/persistence/result.dto";
import styles from "./page.module.scss";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { formattedTime } from "../utils/format-time";
import numeral from "numeral";

interface ColumnMeta {
  field: string;
  header: string;
}

interface LazyTableState {
  first: number;
  rows: number;
  page: number;
}

export default function AdminPage() {
  const [results, setResults] = useState<ResultDto[]>([]);
  const [totalRecords, setTotalRecords] = useState(0);
  const [totalTokensUsed, setTotalTokensUsed] = useState(0);
  const [totalUsers, setTotalUsers] = useState(0);
  const [totalCost, setTotalCost] = useState(0);

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
  const [role, setRole] = useState<string | null>(null);
  const router = useRouter();

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (session_email) {
      fetchUserRole(session_email);
    }
  }, [session_email]);

  useEffect(() => {
    if (role === "admin") {
      fetchResults();
      fetchTotalTokens();
    } else if (role !== null && role !== "admin") {
      router.push("/");
    }
  }, [role, lazyState]);

  // useEffect(() => {
  //   if (session_email) {
  //     fetchUserRole(session_email).then((fetchedRole: any) => {
  //       if (fetchedRole === "admin") {
  //         fetchResults();
  //         fetchTotalTokens();
  //       } else if (fetchedRole !== null && fetchedRole !== "admin") {
  //         router.push("/");
  //       }
  //     });
  //   }
  // }, [session_email, lazyState]);

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
        setRole(data[0]?.role);
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
      setTotalUsers(resultsReceived.totalUsers);
    } catch (error) {
      console.error("Error fetching results:", error);
    }
  };

  const fetchTotalTokens = async () => {
    try {
      const response = await fetch("/api/totalTokens");
      if (!response.ok) {
        throw new Error(`Error : ${response.status}`);
      }

      const resultsReceived = await response.json();

      setTotalTokensUsed(resultsReceived.tokens);
      setTotalCost(resultsReceived.cost);
    } catch (error) {
      console.error("Error fetching results:", error);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!role || role !== "admin") {
    return null;
  }

  return (
    <div className={styles["admin"]}>
      <div className="header">
        <section className="kpi">
          <div className="title">Creations</div>
          <div className="value">{numeral(totalRecords).format("0,0")}</div>
        </section>
        <section className="kpi">
          <div className="title">Users</div>
          <div className="value">{numeral(totalUsers).format("0,0")}</div>
        </section>
        <section className="kpi">
          <div className="title">Total Tokens</div>
          <div className="value">{numeral(totalTokensUsed).format("0,0")}</div>
        </section>
        <section className="kpi">
          <div className="title">Cost</div>
          <div className="value">${numeral(totalCost).format("0,0.00")}</div>
        </section>
      </div>
      <div className="table-container">
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
