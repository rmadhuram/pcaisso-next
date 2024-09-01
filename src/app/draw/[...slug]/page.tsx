"use client";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { ResultDto } from "@/persistence/result.dto";

export default function HomePage() {
  const params = useParams();
  const uuid = params.slug?.[0];
  console.log("UUID:", uuid);

  const [data, setData] = useState<ResultDto | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    if (!uuid) return;

    const fetchData = async () => {
      try {
        const response = await fetch("/api/getResults", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            uuid,
          }),
        });

        if (!response.ok) {
          throw new Error(`Error: ${response.status}`);
        }

        const dataReceived = await response.json();
        console.log("data received :", dataReceived);
        setData(dataReceived);
      } catch (error) {
        console.error("Fetch error:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [uuid]);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (!data) {
    return <p>No data found</p>;
  }

  console.log("data", data);
  console.log(data.uuid);
  console.log(data.description);

  return (
    <div>
      <h1 style={{ color: "white" }}>{data.uuid}</h1>
      <p style={{ color: "white" }}>{data.description}</p>
    </div>
  );
}
