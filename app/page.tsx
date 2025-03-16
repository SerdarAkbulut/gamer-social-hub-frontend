"use client";
import { useQuery } from "@tanstack/react-query";
import UserContent from "./components/card/user-content/userContent";
import { getFavoritedGamesPosts } from "./api/services/postServices";

const Page = () => {
  const { data } = useQuery({
    queryKey: ["FavoritedGamesPosts"],
    queryFn: () => getFavoritedGamesPosts(),
  });
  console.log(data);
  return (
    <div className="px-52 mt-32 flex flex-col gap-5">
      {data?.map((items, index) => (
        <>
          <UserContent
            postId={items.id}
            gameId={items.gameId}
            userName={items.user.userName}
            gameName={items.gameName}
            key={index}
            postText={items.postText}
            postTitle={items.postTitle}
          />
        </>
      ))}
    </div>
  );
};

export default Page;
