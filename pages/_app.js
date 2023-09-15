import "@/styles/globals.css";
import Header from "@/Components/Header/Header.js";
import { useState } from "react";

export default function App({ Component, pageProps }) {
  const [searchQuery, setSearchQuery] = useState("");
  console.log("App Search Query:", searchQuery);
  return (
    <div>
      <Header onSearch={(query) => setSearchQuery(query)} />
      <Component searchQuery={searchQuery} {...pageProps} />
    </div>
  );
}
