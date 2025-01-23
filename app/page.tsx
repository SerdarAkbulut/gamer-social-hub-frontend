"use client";
import { useState, useEffect } from "react";
import axios from "axios";
import { Card, CardContent, CardHeader, CardMedia } from "@mui/material";

const GoogleBooks = () => {
  const [games, setGames] = useState([]);
  const apiKey = "d7e0fab152854451a388218c599cc5b2";

  const url2 = `https://api.rawg.io/api/games?`;
  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await axios.get(url2, {
          params: {
            key: apiKey,
            page: 1,
          },
        });
        setGames(response.data.results || []);
      } catch (error) {
        console.error("Kitaplar alınırken hata oluştu:", error);
      }
    };

    fetchBooks();
  }, []);
  console.log(games);
  return (
    <div>
      {games.map((game, index) => (
        <div key={index}>
          <p>{game.name}</p>
        </div>
      ))}
    </div>
  );
};

export default GoogleBooks;
