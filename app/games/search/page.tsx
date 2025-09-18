"use client";

import React, { Suspense } from "react";
import SearchClient from "./component/search";

export default function Page() {
  return (
    <Suspense fallback={<div>Yükleniyor...</div>}>
      <SearchClient />
    </Suspense>
  );
}
