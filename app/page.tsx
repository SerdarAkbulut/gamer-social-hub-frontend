"use client";
import { useState } from "react";
import { Button } from "@mui/material";
import CardList from "./components/card/cardList";

const Page = () => {
  const [page, setPage] = useState(1);

  return (
    <>
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
    </>
  );
};

export default Page;
