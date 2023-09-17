import { useRouter } from "next/router";
import useSWR from "swr";
import styled from "styled-components";
import GermanTaxCalculator from "@/utils/GermanyTaxCalculator";
import SpainTaxCalculator from "@/utils/SpainTaxCalculator";
import NetherlandsTaxCalculator from "@/utils/NetherlandsTaxCalculator";
import PortugalTaxCalculator from "@/utils/PortugalTaxCalculator";
import CzechTaxCalculator from "@/utils/CzechTaxCalculator";
import Image from "next/image";

const PageContainer = styled.div`
  margin: 30px; /* Reduced the margin for a cleaner look */
`;

const fetcher = async (url) => {
  try {
    const res = await fetch(url);
    if (res.status !== 200) {
      throw new Error("Response not OK");
    }
    const data = await res.json();
    console.log("Fetched data:", data);
    return data;
  } catch (error) {
    console.error("Fetch error:", error);
    throw error;
  }
};

const countryCalculators = {
  germany: <GermanTaxCalculator />,
  netherlands: <NetherlandsTaxCalculator />,
  portugal: <PortugalTaxCalculator />,
  spain: <SpainTaxCalculator />,
  czech: <CzechTaxCalculator />,
};

export default function CountryDetail() {
  const router = useRouter();
  const { id } = router.query;

  const { data: country, error } = useSWR(
    id ? `/api/Country/${id}` : null,
    fetcher
  );

  if (error) {
    console.error("Error fetching country data:", error);
    return <div>Failed to load countries</div>;
  }

  if (!country) return <div>Loading...</div>;

  // Extract the country name as a lowercase string
  const countryName = country.country.toLowerCase();

  // Check if the selected country has a corresponding calculator
  const selectedCalculator = countryCalculators[countryName];

  if (!selectedCalculator) {
    return <div>Calculator not found for {countryName}</div>;
  }

  return (
    <PageContainer>
      <div className="mt-4 mb-32 mx-8">
        <h1 className="text-2xl font-bold mb-4">Explore {country.country}</h1>
        <p className="text-lg mb-4">{country.intro}</p>
      </div>
      <div className="flex flex-col items-center mb-48">
        <div className="flex justify-center items-center h-48 w-full mb-40">
          <Image
            src={country.infoImage}
            alt={country.country}
            width={800} // Set a fixed width for the image
            height={400} // Set a fixed height for the image
            className="rounded-t-lg"
          />
        </div>
        <div className="flex justify-between w-10/12 p-4 space-x-8">
          {/* Left Container (Job Seeking Expats) */}
          <div className="flex-1 bg-gray-100 p-4 border border-gray-300">
            <h2 className="text-lg font-semibold mb-2">
              For Job Seeking Expats:
            </h2>
            <p>{country.jobSeekingInfo.overview}</p>
            <p className="mt-2">
              Expat Population: {country.jobSeekingInfo.expatPopulation}
            </p>
          </div>

          {/* Middle Container (Visa Conditions) */}
          <div className="flex-1 bg-gray-100 p-4 border border-gray-300">
            <h2 className="text-lg font-semibold mb-2">Visa Conditions:</h2>
            <p>{country.jobSeekingInfo.visaConditions}</p>
          </div>

          {/* Right Container (Housing and Jobs) */}
          <div className="flex-1 bg-gray-100 p-4 border border-gray-300">
            <h2 className="text-lg font-semibold mb-2">Housing and Jobs:</h2>
            <p>{country.jobSeekingInfo.accessibility.housingAndJobs}</p>
          </div>
        </div>
      </div>
      <div className="flex flex-col items-center mb-16">
        <div className="flex justify-center items-center h-40 w-full mb-40">
          {selectedCalculator}
        </div>
      </div>
    </PageContainer>
  );
}
