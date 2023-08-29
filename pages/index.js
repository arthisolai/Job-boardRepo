import PayParityCalculator from "@/Components/PayParityCalculator";
import useSWR from "swr";

export default function Home() {
  const { data } = useSWR("/api/parity", { fallbackData: [] });
  return (
    <>
      <PayParityCalculator />
    </>
  );
}
