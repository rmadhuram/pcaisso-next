"use client";
import React, { useState, useEffect } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { ResultDto } from "@/persistence/result.dto";
import styles from "./page.module.scss";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

interface ColumnMeta {
  field: string;
  header: string;
}

export default function PaginatorBasicDemo() {
  const [results, setResults] = useState<ResultDto[]>([]);
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
    } else if (user !== null && user !== "admin") {
      router.push("/");
    }
  }, [user]);

  const fetchUserRole = async (email: string) => {
    if (email) {
      try {
        const response = await fetch("api/admin", {
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

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!user || user !== "admin") {
    return null;
  }

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
