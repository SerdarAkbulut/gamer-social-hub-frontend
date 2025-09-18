"use client";

import React, { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { getSearch } from "@/app/api/services/gameServices";
import CardList from "@/app/components/card/game-card/cardList";
import { Button } from "@mui/material";

interface GameProps {
  id: number;
  gameId?: number;
  name: string;
  cover_url: string;
  isLiked: boolean | null;
  isFavorited: boolean;
}

export default function SearchClient() {
  const searchParams = useSearchParams();
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [page, setPage] = useState<number>(1);

  useEffect(() => {
    const query = searchParams.get("q") ?? "";
    setSearchQuery(query);
    setPage(1);
  }, [searchParams]);

  const { data, isLoading, isError, refetch } = useQuery<GameProps[]>({
    queryKey: ["search", searchQuery, page],
    queryFn: () => getSearch(searchQuery, page),
    enabled: !!searchQuery,
  });

  if (isLoading) return <div>Yükleniyor...</div>;
  if (isError || !data || data.length === 0) return <div>Oyun bulunamadı</div>;

  return (
    <div className="px-5 mt-20 flex flex-col gap-5 md:px-28 sm:px-20 lg:px-32 xl:px-44">
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-5 mt-12">
        {data.map((game) => (
          <CardList key={game.id} game={game} refetch={refetch as () => void} />
        ))}
      </div>
      <div className="flex justify-center gap-4 mt-5">
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
