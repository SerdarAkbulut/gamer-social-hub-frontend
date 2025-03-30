import { searchState, tokenState } from "@/app/state/atoms";
import { IconButton, InputBase, Paper } from "@mui/material";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useRecoilState } from "recoil";
import PersonIcon from "@mui/icons-material/Person";
import { useEffect, useState } from "react";
import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";
const Header: React.FC = () => {
  const [useToken, setUseToken] = useRecoilState(tokenState);
  const [searchTerm, setSearchTerm] = useRecoilState(searchState);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [isLogged, setIsLogged] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsLogged(!!token); // Boolean olarak kaydet
  }, [useToken]);
  const router = useRouter();

  const handleKeyDown = async (
    event: React.KeyboardEvent<HTMLInputElement>
  ) => {
    if (event.key === "Enter") {
      event.preventDefault();

      router.push(`/games/search?q=${searchTerm}`);
    }
  };
  const onClickSearch = async () => {
    router.push(`/games/search?q=${searchTerm}`);
  };

  const handleClickRemoveToken = () => {
    const removeToken = localStorage.removeItem("token");
    localStorage.removeItem("token_expiry");
    setUseToken(removeToken);
  };
  return (
    <>
      <header className="bg-gray-800 text-white px-6 py-4 flex items-center justify-between shadow-md">
        <div className="flex items-center gap-6">
          <Link
            href="/"
            onClick={(e) => {
              e.preventDefault();
              window.location.href = "/";
            }}
            className="hover:text-gray-300 transition"
          >
            Ana Sayfa
          </Link>
          <Link
            href="/games/1"
            onClick={(e) => {
              e.preventDefault();
              window.location.href = "/games/1";
            }}
            className="hover:text-gray-300 transition"
          >
            Popüler Oyunlar
          </Link>
          <Link
            href="/games/new/1"
            onClick={(e) => {
              e.preventDefault();
              window.location.href = "/games/new/1";
            }}
            className="hover:text-gray-300 transition"
          >
            Yeni Oyunlar
          </Link>
          <Link
            href="/games/upcoming/1"
            onClick={(e) => {
              e.preventDefault();
              window.location.href = "/games/upcoming/1";
            }}
            className="hover:text-gray-300 transition"
          >
            Gelecek Oyunlar
          </Link>
        </div>

        <div className="flex-1 max-w-lg h-full">
          <Paper
            component="form"
            sx={{
              p: "2px 4px",
              display: "flex",
              alignItems: "center",
              width: 400,
            }}
            className="ml-14"
          >
            <IconButton sx={{ p: "10px" }} aria-label="menu">
              <MenuIcon />
            </IconButton>
            <InputBase
              sx={{ ml: 1, flex: 1 }}
              placeholder="Ara"
              onChange={(e) => setSearchTerm(e.target.value)}
              onKeyDown={handleKeyDown}
            />
            <IconButton
              type="button"
              sx={{ p: "10px" }}
              aria-label="search"
              onClick={onClickSearch}
            >
              <SearchIcon />
            </IconButton>
          </Paper>
        </div>

        <div className="flex items-center gap-6">
          {isLogged ? (
            <div className="relative">
              <button
                onClick={() => setShowUserMenu(!showUserMenu)}
                className="hover:opacity-80"
              >
                <PersonIcon fontSize="large" />
              </button>
              <div
                className={`absolute right-0 mt-2 w-48 bg-white text-gray-800 rounded-md shadow-md overflow-hidden transform transition-all duration-300 ${
                  showUserMenu
                    ? "opacity-100 scale-100"
                    : "opacity-0 scale-95 pointer-events-none"
                }`}
              >
                <Link
                  href="/profile"
                  className="block px-4 py-2 hover:bg-gray-200"
                >
                  Ayarlar
                </Link>
                <Link
                  href="/favorited-games"
                  className="block px-4 py-2 hover:bg-gray-200"
                >
                  Takip Edilenler
                </Link>
                <Link
                  href="/liked-games"
                  className="block px-4 py-2 hover:bg-gray-200"
                >
                  Beğenilenler
                </Link>
                <button
                  className="block w-full text-left px-4 py-2 hover:bg-gray-200"
                  onClick={() => handleClickRemoveToken()}
                >
                  Çıkış Yap
                </button>
              </div>
            </div>
          ) : (
            <div className="flex gap-4">
              <Link href="/login" className="hover:text-gray-300 transition">
                Giriş Yap
              </Link>
              <Link href="/register" className="hover:text-gray-300 transition">
                Kayıt Ol
              </Link>
            </div>
          )}
        </div>
      </header>
    </>
  );
};

export default Header;
