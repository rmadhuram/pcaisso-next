"use client";
import React, { useState, useEffect } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { ResultDto } from "@/persistence/result.dto";
import styles from "./page.module.scss";
// import { useRouter } from "next/router";
import Link from "next/link";

interface ColumnMeta {
  field: string;
  header: string;
}

export default function PaginatorBasicDemo() {
  const [results, setResults] = useState<ResultDto[]>([]);
  const [isMounted, setIsMounted] = useState(false);
  const columns: ColumnMeta[] = [
    { field: "id", header: "id" },
    { field: "uuid", header: "uuid" },
    { field: "user_id", header: "user_id" },
    { field: "type", header: "type" },
    { field: "description", header: "description" },
    { field: "prompt", header: "prompt" },
    { field: "model", header: "model" },
    { field: "output", header: "output" },
    { field: "thumbnail_url", header: "thumbnail_url" },
    { field: "created_time", header: "created_time" },
    { field: "time_taken", header: "time_taken" },
    { field: "prompt_tokens", header: "prompt_tokens" },
    { field: "completion_tokens", header: "type" },
    { field: "liked", header: "liked" },
    { field: "liked_time", header: "tliked_time" },
    { field: "status", header: "status" },
  ];

  // const router = useRouter();

  // useEffect(() => {
  //   setIsMounted(true);
  // }, []);

  // useEffect(() => {
  //   if (isMounted) {
  //     fetchResults();
  //   }
  // }, [isMounted]);

  useEffect(() => {
    fetchResults();
  }, []);

  const fetchResults = async () => {
    try {
      const response = await fetch(`/api/admin`);
      if (!response.ok) {
        throw new Error(`Error : ${response.status}`);
      }

      const resultsReceived = await response.json();
      console.log(resultsReceived);
      setResults(resultsReceived);
    } catch (error) {
      console.error("Error fetching results:", error);
    }
  };

  // const handleOnClick = (event: any) => {
  //   const rowData = event.data as ResultDto;
  //   if (isMounted) {
  //     router.push(`draw/${rowData.uuid}`);
  //   }
  // };

  return (
    <div className={styles["card"]}>
      <DataTable
        value={results}
        showGridlines
        stripedRows
        resizableColumns
        columnResizeMode="fit"
        paginator
        rows={10}
        // onRowClick={handleOnClick}
      >
        {columns.map((col) => (
          <Column
            key={col.field}
            field={col.field}
            header={col.header}
            body={(rowData) => (
              <Link
                style={{ textDecoration: "none", color: "inherit" }}
                href={`/draw/${rowData.uuid}`}
                passHref
              >
                <div style={{ cursor: "pointer" }}>{rowData[col.field]}</div>
              </Link>
            )}
          />
        ))}
      </DataTable>
    </div>
  );
}
