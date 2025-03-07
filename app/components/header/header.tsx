import { searchState } from "@/app/state/atoms";
import { TextField } from "@mui/material";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useRecoilState } from "recoil";
import PersonIcon from "@mui/icons-material/Person";
import { useEffect, useState } from "react";
const Header: React.FC = () => {
  const [searchTerm, setSearchTerm] = useRecoilState(searchState);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [isLogged, setIsLogged] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsLogged(!!token); // Boolean olarak kaydet
  }, []);
  const router = useRouter();

  const handleKeyDown = async (
    event: React.KeyboardEvent<HTMLInputElement>
  ) => {
    if (event.key === "Enter") {
      event.preventDefault();

      router.push(`/games/search?q=${searchTerm}`);
    }
  };

  return (
    <>
      <div className="bg-gray-500 text-white p-4 flex w-full ">
        <div className="flex gap-2">
          <Link href="/">Logo</Link>
          <Link
            href="/games/1"
            className="ml-8"
            onClick={(e) => {
              e.preventDefault();
              window.location.href = "/games/1";
            }}
          >
            Popüler oyunlar
          </Link>
          <Link
            href="/games/new/1"
            onClick={(e) => {
              e.preventDefault();
              window.location.href = "/games/new/1";
            }}
          >
            Yeni Oyunlar
          </Link>

          <Link
            href="/games/upcoming/1"
            onClick={(e) => {
              e.preventDefault();
              window.location.href = "/games/upcoming/1";
            }}
          >
            Gelecek Oyunlar
          </Link>
        </div>
        <div className="inline-flex w-full justify-center h-full">
          <TextField
            id="standard-basic"
            label="Search"
            variant="filled"
            className=" bg-white h-full"
            onChange={(e) => setSearchTerm(e.target.value)}
            onKeyDown={handleKeyDown}
          />
        </div>
        <div className="flex  gap-4 justify-end ">
          {isLogged ? (
            <div className="flex-col justify-center self-center ">
              <a
                onClick={() => setShowUserMenu(!showUserMenu)}
                className="hover:cursor-pointer"
              >
                <PersonIcon fontSize="large" />
              </a>
              <div
                className={`absolute bg-white right-12 p-5 text-black rounded-b-md rounded-tl-md border-2 transition-all duration-500 ease-out 
        ${
          showUserMenu
            ? "opacity-100 scale-100"
            : "opacity-0 scale-95 pointer-events-none"
        }`}
              >
                <div className="flex flex-col">
                  <Link href="/favorited-games">Takip edilenler</Link>
                  <Link href="/liked-games" className="mt-1">
                    Beğenilenler
                  </Link>
                  <div className="mt-1">Çıkış</div>
                </div>
              </div>
            </div>
          ) : (
            <div>
              <a href="/login">Login</a>
            </div>
          )}
          {isLogged ? (
            ""
          ) : (
            <div>
              <Link href="/register">Register</Link>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Header;
