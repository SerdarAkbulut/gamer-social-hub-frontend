"use client";
import "./globals.css";
import Header from "./components/header/header";

import ClientProviders from "./providers";

const RootLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <html lang="en">
      <body className={`antialiased`}>
        <ClientProviders>
          <div className="fixed top-0 w-full z-50">
            <Header />
          </div>
          <main className=" ">{children}</main>
        </ClientProviders>
      </body>
    </html>
  );
};

export default RootLayout;
