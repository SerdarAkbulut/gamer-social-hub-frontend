"use client";
import React, { useState } from "react";
import CardList from "../components/card/cardList";
import { Button } from "@mui/material";
import CategoryList from "../components/navbar/category";

function GameList() {
  const [page, setPage] = useState(1);

  return (
    <div className="flex justify-between mt-20">
      <div className="flex fixed ml-0 ">
        <CategoryList />
      </div>
      <div className="ml-60">
        <CardList page={page} />
        <div className="flex justify-center my-4 gap-4">
          {page === 1 ? (
            <Button
              variant="contained"
              disabled={true}
              color="primary"
              onClick={() => setPage(page > 1 ? page - 1 : 1)}
            >
              Prev
            </Button>
          ) : (
            <Button
              variant="contained"
              color="primary"
              onClick={() => setPage(page > 1 ? page - 1 : 1)}
            >
              Prev
            </Button>
          )}

          <Button
            variant="contained"
            color="primary"
            onClick={() => setPage(page + 1)}
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  );
}

export default GameList;
