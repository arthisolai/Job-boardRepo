import PayParityCalculator from "@/Components/PayParityCalculator";
import useSWR from "swr";
import styled from "styled-components";
import NetherlandsTaxCalculator from "@/utils/NetherlandsTaxCalculator";
import GermanTaxCalculator from "@/utils/GermanyTaxCalculator";
import SpainTaxCalculator from "@/utils/SpainTaxCalculator";
import EmailForm from "../Components/EmailForm/EmailForm";

const ContentContainer = styled.div`
  margin-top: 80px;
`;

export default function Home() {
  const { data } = useSWR("/api/parity", { fallbackData: [] });
  console.log("data in index frontend", data);
  return (
    <>
      <ContentContainer>
        <PayParityCalculator />
        <GermanTaxCalculator />
        <NetherlandsTaxCalculator />
        <SpainTaxCalculator />
        <EmailForm />
      </ContentContainer>
    </>
  );
}
