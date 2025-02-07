import { getSearch } from "@/app/api/services/gameServices";
import { searchState } from "@/app/state/atoms";
import { TextField } from "@mui/material";
import Link from "next/link";
import { useRecoilState } from "recoil";

const Header: React.FC = () => {
  const [searchTerm, setSearchTerm] = useRecoilState(searchState);
  const handleKeyDown = async (
    event: React.KeyboardEvent<HTMLInputElement>
  ) => {
    if (event.key === "Enter") {
      event.preventDefault(); // Varsayılan form submit işlemini engeller
      try {
        const response = await getSearch(searchTerm);
        console.log("Sonuç:", response.data);
      } catch (error) {
        console.error("API isteği başarısız:", error);
      }
    }
  };
  return (
    <>
      <div className="bg-gray-500 text-white p-4 flex justify-between">
        <div>
          <Link href="/">Ana Sayfa</Link>
        </div>
        <div>
          <TextField
            id="standard-basic"
            label="Search"
            variant="standard"
            className="bg-white"
            onChange={(e) => setSearchTerm(e.target.value)}
            onKeyDown={handleKeyDown}
          />
        </div>
        <div className="flex justify-between gap-4">
          <div>
            <a href="">Login</a>
          </div>
          <div>
            <a href="">Register</a>
          </div>
        </div>
      </div>
    </>
  );
};

export default Header;
