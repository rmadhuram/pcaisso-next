"use client";
import React, { useState, useEffect } from "react";
import { DataTable, DataTablePageEvent } from "primereact/datatable";
import { Column } from "primereact/column";
import { ResultDto } from "@/persistence/result.dto";
import styles from "./allLikes.module.scss";
import Link from "next/link";
import { formattedTime } from "../utils/format-time";

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
  const [loading, setLoading] = useState(true);

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

  useEffect(() => {
    fetchAllLikes();
  }, [lazyState]);

  const fetchAllLikes = async () => {
    setLoading(true);
    try {
      const response = await fetch(
        `/api/allLikes?offset=${lazyState.first}&limit=${lazyState.rows}`
      );

      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }
      const data = await response.json();
      console.log(data.results);
      setResults(data.results);
      setTotalRecords(data.totalRecords);
    } catch (error) {
      console.log("Fetch error: ", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div className={styles["spinner"]}></div>;
  }

  return (
    <div className={styles["likes-page"]}>
      <h3>
        <i className="fa-solid fa-heart liked"></i>&nbsp;&nbsp;All Liked Results
      </h3>
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
