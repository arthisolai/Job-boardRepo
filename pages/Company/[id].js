import { useRouter } from "next/router";
import useSWR from "swr";
import styled from "styled-components";
import Link from "next/link";

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

  const { data: jobs, error: jobsError } = useSWR(
    id ? `/api/Jobs?company=${id}` : null,
    fetcher
  );

  const filteredJobs =
    jobs && company
      ? jobs.filter((job) => job.Company === company.companyName)
      : [];

  if (error) return <div>Failed to load</div>;
  if (!company) return <div>Loading...</div>;
  // console.log(company);

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

      <h2>Jobs at {company.companyName}</h2>

      {jobs ? (
        Array.isArray(filteredJobs) && filteredJobs.length > 0 ? (
          filteredJobs.map((job) => (
            <div key={job._id}>
              <Link href={`/Jobs/${job._id}`}>
                <h2>{job.Position}</h2>
              </Link>
              <p>{job.Company}</p>
              <p>{job.Location}</p>
            </div>
          ))
        ) : (
          <div>No jobs available.</div>
        )
      ) : (
        <div>Loading jobs...</div>
      )}
    </ContentContainer>
  );
}
