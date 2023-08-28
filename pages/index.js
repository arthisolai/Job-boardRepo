import PayParityCalculator from "@/Components/PayParityCalculator";
import useSWR from "swr";

export default function Home({ payParityData }) {
  const { data } = useSWR("/api/parity", { fallbackData: [] });
  console.log("data in index frontend", data);
  return (
    <>
      <PayParityCalculator payParityData={payParityData} />
    </>
  );
}
