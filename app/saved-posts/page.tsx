"use client";
import React from "react";
import { useQuery } from "@tanstack/react-query";
import { getUserSavedPosts } from "../api/services/userServices";

function SavedPosts() {
  const { data } = useQuery({
    queryKey: ["mainAllPosts"],
    queryFn: () => getUserSavedPosts(),
  });
  console.log(data);
  return <div>page</div>;
}

export default SavedPosts;
