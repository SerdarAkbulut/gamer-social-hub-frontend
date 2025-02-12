"use client";
import { getSearch } from "@/app/api/services/gameServices";
import CardList from "@/app/components/card/game-card/cardList";
import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "next/navigation";
import React, { useState } from "react";

export default function Search() {
  const searchParams = useSearchParams();
  const searchQuery = searchParams.get("q");
  const [page, setPage] = useState(0);
  const { data, refetch } = useQuery({
    queryKey: ["search", searchQuery, page],
    queryFn: () => getSearch(searchQuery, page),
  });
  console.log(data);

  return (
    <div>
      <CardList data={data}></CardList>
      <div className="flex">
        <button onClick={() => setPage(page + 1)}>Arttır</button>
      </div>
    </div>
  );
}
