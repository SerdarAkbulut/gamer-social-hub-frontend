import { searchState, tokenState } from "@/app/state/atoms";
import {
  IconButton,
  InputBase,
  Paper,
  Drawer,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";
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
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsLogged(!!token);
  }, [useToken]);

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      event.preventDefault();
      router.push(`/games/search?q=${searchTerm}`);
    }
  };

  const onClickSearch = () => {
    router.push(`/games/search?q=${searchTerm}`);
  };

  const handleClickRemoveToken = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("token_expiry");
    setUseToken(null);
  };

  const toggleDrawer = (open: boolean) => () => {
    setIsDrawerOpen(open);
  };

  const drawerLinks = (
    <div className="w-64">
      <List>
        <ListItem component={Link} href="/" onClick={toggleDrawer(false)}>
          <ListItemText primary="Ana Sayfa" />
        </ListItem>
        <ListItem
          component={Link}
          href="/games/1"
          onClick={toggleDrawer(false)}
        >
          <ListItemText primary="Popüler Oyunlar" />
        </ListItem>
        <ListItem
          component={Link}
          href="/games/new/1"
          onClick={toggleDrawer(false)}
        >
          <ListItemText primary="Yeni Oyunlar" />
        </ListItem>
        <ListItem
          component={Link}
          href="/games/upcoming/1"
          onClick={toggleDrawer(false)}
        >
          <ListItemText primary="Gelecek Oyunlar" />
        </ListItem>
      </List>
    </div>
  );

  return (
    <>
      <header className="bg-gray-800 text-white px-4 py-4 flex items-center justify-between shadow-md xl:flex xl:gap-12 md:gap-12">
        {/* Sol - Menü (mobilde görünür) */}
        <div className="md:hidden">
          <IconButton onClick={toggleDrawer(true)} className="text-white">
            <MenuIcon />
          </IconButton>
          <Drawer
            anchor="left"
            open={isDrawerOpen}
            onClose={toggleDrawer(false)}
          >
            {drawerLinks}
          </Drawer>
        </div>

        {/* Sol - Menü (sadece masaüstü) */}
        <div className="hidden md:flex items-center gap-6 md:w-1/2">
          <Link href="/" className="hover:text-gray-300 transition">
            Ana Sayfa
          </Link>
          <Link href="/games/1" className="hover:text-gray-300 transition">
            Popüler Oyunlar
          </Link>
          <Link href="/games/new/1" className="hover:text-gray-300 transition">
            Yeni Oyunlar
          </Link>
          <Link
            href="/games/upcoming/1"
            className="hover:text-gray-300 transition"
          >
            Gelecek Oyunlar
          </Link>
        </div>

        {/* Orta - Arama */}
        <div className="flex w-full justify-center h-full  ">
          <Paper
            component="form"
            sx={{
              p: "2px 4px",
              display: "flex",
              alignItems: "center",
              width: "100%",
            }}
            className=" w-1/2 sm:w-1/2 xl:w-1/2 flex  "
          >
            <InputBase
              sx={{ ml: 1, flex: 1 }}
              placeholder="Ara"
              onChange={(e) => setSearchTerm(e.target.value)}
              onKeyDown={handleKeyDown}
            />
            <IconButton
              type="button"
              sx={{ p: "10px" }}
              onClick={onClickSearch}
            >
              <SearchIcon />
            </IconButton>
          </Paper>
        </div>

        {/* Sağ - Kullanıcı veya Giriş/Kayıt */}
        <div className="flex items-center gap-4">
          {isLogged ? (
            <div className="relative">
              <button
                onClick={() => setShowUserMenu(!showUserMenu)}
                className="hover:opacity-80"
              >
                <PersonIcon fontSize="large" />
              </button>
              <div
                className={`absolute right-0 mt-2 w-48 text-md bg-white text-gray-800 rounded-md shadow-md overflow-hidden transform transition-all duration-300 ${
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
                  href="/saved-posts"
                  className="block px-4 py-2 hover:bg-gray-200"
                >
                  Kaydedilenler
                </Link>
                <Link
                  href="/my-posts"
                  className="block px-4 py-2 hover:bg-gray-200"
                >
                  Gönderilerim
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
                  onClick={handleClickRemoveToken}
                >
                  Çıkış Yap
                </button>
              </div>
            </div>
          ) : (
            <div className="flex gap-2">
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
