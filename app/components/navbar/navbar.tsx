import Link from "next/link";
import React from "react";

function Navbar() {
  return (
    <div className="mt-20 bg-gray-100 p-5 flex justify-center gap-5 border-b-2 border-white">
      <Link href="/games/pages">Games</Link>
      <Link href="">Populer Games</Link>
      <Link href="">Upcoming Games</Link>
      <Link href=""></Link>
    </div>
  );
}

export default Navbar;
