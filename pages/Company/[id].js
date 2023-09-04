import { useRouter } from "next/router";
import useSWR from "swr";
import styled from "styled-components";

const ContentContainer = styled.div`
  margin-top: 80px;
`;

const fetcher = (url) => fetch(url).then((r) => r.json());

export default function CompanyDetails() {
  const router = useRouter();
  const { id } = router.query;

  const { data: company, error } = useSWR(
    id ? `/api/Company/${id}` : null,
    fetcher
  );

  if (error) return <div>Failed to load</div>;
  if (!company) return <div>Loading...</div>;
  console.log(company);

  return (
    <ContentContainer>
      <h1>{company.companyName}</h1>
      <a href={company.companyURL}>Company Website</a>
      <br />
      <a href={company.careersURL}>Career Website</a>
      <p>About Company : {company.aboutCompany}</p>
      <p>Country: {company.country}</p>
      <p>City: {company.city}</p>
      <p>Company Size: {company.companySize}</p>
      <p>Industry: {company.industry}</p>
      <p>Founded In: {company.foundedIn}</p>
    </ContentContainer>
  );
}
