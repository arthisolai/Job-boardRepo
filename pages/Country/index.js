import Link from "next/link";
import useSWR from "swr";
import styled from "styled-components";
import Image from "next/image";

const PageContainer = styled.div`
  display: flex;
  justify-content: center; /* Center content horizontally */
  align-items: flex-start; /* Align content to the top */
  min-height: 100vh; /* Ensure full viewport height */
  padding: 20px; /* Add some padding to the sides */
`;

const ContentContainer = styled.div`
  margin-top: 80px;
  display: flex;
  flex-wrap: wrap; /* Allow cards to wrap to the next line when the screen size is small */
`;

const Card = styled.div`
  flex-basis: calc(33.33% - 20px); /* Set the width for two cards in a row */
  margin: 10px 10px 20px 10px;
  border: 1px solid #ddd;
  /* padding: 20px; */
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  background-color: #fff;
  width: 32%;
  align-items: center;
`;

const ImageContainer = styled.div`
  flex-grow: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 30px;
`;

const CountryName = styled.div`
  text-align: center;
  padding: 10px;
`;

const fetcher = async (url) => {
  try {
    const res = await fetch(url);
    if (res.status !== 200) {
      throw new Error("Response not OK");
    }
    const data = await res.json();
    console.log("Fetched data:", data); // Add this line
    return data;
  } catch (error) {
    console.error("Fetch error:", error); // Add this line
    throw error;
  }
};

export default function Company() {
  const { data, error } = useSWR(`/api/Country`, fetcher);

  if (error) {
    console.error("Error fetching data:", error);
    return <div>Failed to load countries</div>;
  }

  if (!data) {
    console.log("Data is still loading...");
    return <div>Loading...</div>;
  }

  const countries = data;

  return (
    <PageContainer>
      <ContentContainer>
        {countries.map((country) => (
          <Card key={country._id}>
            <ImageContainer>
              <Link
                href={`/Country/${country._id}`}
                className="text-blue-600 hover:text-blue-800 transition duration-300"
              >
                <div className="relative w-64 h-80 rounded-t-lg overflow-hidden">
                  <Image
                    src={country.image}
                    alt={`${country.country} flag`}
                    layout="fill"
                    objectFit="cover"
                    className="rounded-t-lg"
                  />
                </div>
              </Link>
            </ImageContainer>
            <CountryName>
              <Link
                href={`/Country/${country._id}`}
                className="text-blue-600 hover:text-blue-800 transition duration-300"
              >
                <h1 className="text-xl font-bold mb-3">{country.country}</h1>
              </Link>
              {/* Display other country data here */}
            </CountryName>
          </Card>
        ))}
      </ContentContainer>
    </PageContainer>
  );
}
