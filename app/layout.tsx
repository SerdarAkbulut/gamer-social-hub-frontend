"use client";
import "./globals.css";
import Header from "./components/header/header";
import ClientProviders from "./providers";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Footer from "./components/footer/footer";
import { useRecoilState } from "recoil";
import { profileBgImage } from "./state/atoms";
import { RecoilRoot } from "recoil"; // 🔹 RecoilRoot import edildi

const RootLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <html lang="en" className="h-full">
      <RecoilRoot>
        {" "}
        {/* 🔹 RecoilRoot ile sarmalandı */}
        <ClientProviders>
          <RecoilStateWrapper>
            {" "}
            {/* 🔹 useRecoilState'i destekleyen bir iç bileşen */}
            <ToastContainer />
            {children}
          </RecoilStateWrapper>
        </ClientProviders>
      </RecoilRoot>
    </html>
  );
};

// 🔹 useRecoilState yalnızca bir Client Component içinde kullanılabilir
const RecoilStateWrapper: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [bgImage] = useRecoilState(profileBgImage);

  return (
    <body className="h-full flex flex-col ">
      <div className="fixed top-0 w-full z-50">
        <Header />
      </div>
      <main className="flex-grow mt-[60px]">{children}</main>
      <Footer />
    </body>
  );
};

export default RootLayout;
