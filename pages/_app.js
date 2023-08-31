import "@/styles/globals.css";
import Header from "@/Components/Header/Header.js";

export default function App({ Component, pageProps }) {
  return (
    <div>
      <Header />
      <Component {...pageProps} />
    </div>
  );
}
