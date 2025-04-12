"use client";
import { getSearch } from "@/app/api/services/gameServices";
import CardList from "@/app/components/card/game-card/cardList";
import { Button } from "@mui/material";
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
  if (data?.length === 0 || data === null) {
    return (
      <>
        <div className="flex h-full items-center justify-center">
          <h1>Oyun bulunamadı</h1>
        </div>
      </>
    );
  }
  return (
    <div className="px-5 mt-20 flex flex-col gap-5 md:px-28 sm:px-20 lg:px-32 xl:px-44">
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6  gap-5 mt-12">
        {data?.map((game: any, index: number) => (
          <CardList key={index} game={game} refetch={refetch} />
        ))}
      </div>
      <div className="flex justify-center  gap-4 mt-5">
        <Button
          variant="contained"
          color="primary"
          disabled={page === 1}
          onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
        >
          Geri
        </Button>
        <Button
          variant="contained"
          color="primary"
          onClick={() => setPage((prev) => prev + 1)}
        >
          İleri
        </Button>
      </div>
    </div>
  );
}
