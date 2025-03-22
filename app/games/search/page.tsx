"use client";
import { getSearch } from "@/app/api/services/gameServices";
import CardList from "@/app/components/card/game-card/cardList";
import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "next/navigation";
import React, { useState } from "react";

export default function Search() {
  const searchParams = useSearchParams();
  const searchQuery = searchParams.get("q");
  const [page, setPage] = useState(1);
  const { data, refetch } = useQuery({
    queryKey: ["search", searchQuery, page],
    queryFn: () => getSearch(searchQuery, page),
  });
  console.log(data);

  return (
    <div className="px-28">
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-5 mt-12">
        {data?.map((game: any, index: number) => (
          <CardList key={index} game={game} refetch={refetch} />
        ))}
      </div>
      <div className="flex">
        <button onClick={() => setPage(page + 1)}>Arttır</button>
      </div>
    </div>
  );
}
