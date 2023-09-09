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
  const { data, error } = useSWR("/api/parity", { fallbackData: [] });
  if (error) {
    console.error("Error fetching data:", error);
    // Handle the error, e.g., display an error message to the user
    return <div>Error fetching data</div>;
  }

  if (!data) {
    // Data is still loading
    return <div>Loading...</div>;
  }

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
