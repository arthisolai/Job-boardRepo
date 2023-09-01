import PayParityCalculator from "@/Components/PayParityCalculator";
import TaxCalculator from "@/utils/salaryCalculatorsGermany";
import useSWR from "swr";
import styled from "styled-components";

const ContentContainer = styled.div`
  margin-top: 80px;
`;

export default function Home() {
  const { data } = useSWR("/api/parity", { fallbackData: [] });
  console.log("data in index frontend", data);
  return (
    <>
      <PayParityCalculator />
      <TaxCalculator />
    </>
  );
}
