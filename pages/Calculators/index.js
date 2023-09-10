import PayParityCalculator from "@/Components/PayParityCalculator";
import GermanTaxCalculator from "@/utils/GermanyTaxCalculator";
import NetherlandsTaxCalculator from "@/utils/NetherlandsTaxCalculator";
import SpainTaxCalculator from "@/utils/SpainTaxCalculator";
import styled from "styled-components";

const ContentContainer = styled.div`
  margin-top: 80px;
`;

export default function Calculators() {
  return (
    <>
      <ContentContainer>
        <PayParityCalculator />
        <GermanTaxCalculator />
        <NetherlandsTaxCalculator />
        <SpainTaxCalculator />
      </ContentContainer>
    </>
  );
}
