"use client";
import "./globals.css";
import Header from "./components/header/header";
import Navbar from "./components/navbar/navbar";

import ClientProviders from "./providers";

const RootLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <html lang="en">
      <body className={`antialiased`}>
        <ClientProviders>
          <Header />
          <div className="">
            <div className="flex fixed">
              <Navbar />
            </div>
            <main className="flex-grow ml-56 ">{children}</main>
          </div>
        </ClientProviders>
      </body>
    </html>
  );
};

export default RootLayout;
