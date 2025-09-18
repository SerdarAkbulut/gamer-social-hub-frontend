"use client";
import "./globals.css";
import Header from "./components/header/header";
import ClientProviders from "./providers";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Footer from "./components/footer/footer";
import { RecoilRoot } from "recoil";

const RootLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <html lang="en" className="h-full">
      <body className="h-full flex flex-col">
        <RecoilRoot>
          <ClientProviders>
            <ToastContainer />
            <div className="fixed top-0 w-full z-50">
              <Header />
            </div>
            <main className="flex-grow mt-[60px]">{children}</main>
            <Footer />
          </ClientProviders>
        </RecoilRoot>
      </body>
    </html>
  );
};

export default RootLayout;
